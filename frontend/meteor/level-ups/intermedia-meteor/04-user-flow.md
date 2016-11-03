# Working with user flow
* prevent users from accessing certain pages
* logging out and loggin in right now the user isn't directed to the correct page
* when user is logged out they see the home page when the user is logged in they see their own recipe book

### when logged in, transfer user to recipe page

we will set a trigger in our routing page to check if they are logged in and if so, redirect them to the recipe page

we currently have an error: `no route for path: /recipe`

problem is we had the name of `recipe-book` listed twice

```js
FlowRouter.route('/recipe-book', {
  name: 'recipe-book',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Recipes' });
  }
});

FlowRouter.route('/recipe/:id', {
  name: 'recipe',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'RecipeSingle' });
  }
});
```

* each route needs to have a unique name

so we change it to this:

```js
FlowRouter.route('/recipe-book', {
  name: 'recipe-book',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Recipes' });
  }
});

FlowRouter.route('/recipe/:id', {
  name: 'recipe',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'RecipeSingle' });
  }
});
```

So that they each have a unique name and above them we modify this route to:

```js
FlowRouter.route('/', {
  name: 'home',
  action( ) {
    if(Meteor.userId()) {
      FlowRouter.go('recipe-book');
    }
    GAnalytics.pageview();
    BlazeLayout.render( 'HomeLayout' );
  }
});
```

* so now we check if they user has an id, and if they do, we know they are logged in, so we then send them to the recipe-book route

## Not logged in has access to recipe book
log and and visit `http://localhost:3000/recipe-book`

so you can see this page and we don't want this to be possible
we need to block users not logged in from the recipe book

### FlowRouter triggers

```js
FlowRouter.triggers.enter([function(context, redirect) {
  if(!Meteor.userId()) {
    FlowRouter.go('home');
  }
}]);
```

So now if you are not logged in, you get sent to the home page. And if you try to manually type in /recipe-book, when you are not logged in, you will be rerouted to the home page

## When user logged in on home page, we need to be automatically redirected to recipe-book.

we will use this package to enable this to be possible

`gwendall:auth-client-callbacks`

* this package gives you access to `Accounts.onLogin()` and `Accounts.onLogout()` methods

Add this to `lib/routes.js`

```js
Accounts.onLogin(function() {
  FlowRouter.go('recipe-book');
});
```

Now when you are on the home page and you log in, you will be taken instantaneously to the recipe-page

**note** in video, scott had to wrap Accounts.onLogin and Accounts.onLogout inside `if (Meteor.isClient) {}` because the onLogout only worked on the client side. This is no longer necessary with the `gwendall:auth-client-callbacks` package

**other note** meteor suggests putting this code in the template but scott likes to group all this code inside his `router.js` because it makes more sense to him.

## Update Methods and Adding to Menu

### Steps to make this work
1. Add markup to create your buttons to the template
2. In your collection, make sure to give users permission for update
3. In you collection, you can add a method that will set the current value of inMenu to true or false, and this value will take `id` and `currentState` as arguments that will be passed from the client method call.
4. On the client, you will create an event on your template that will call the server method and pass it the `id` and the current state of `inMenu`

Let's add an Add to Menu and Remove From Menu next to our `View Details` link on the `Recipe.html` template.

```html
<template name="Recipe">
  <article class="recipe">
    <h3>{{name}}</h3>
    <p>
      {{desc}}
    </p>
    <p>
      {{#each ingredients}}
        <span class="ingredient">{{name}} - {{amount}}</span>
      {{/each}}
    </p>
    <a href="/recipe/{{_id}}">View Details</a>
    <button class="btn-primary toggle-menu">Add To Menu</button>
    <button class="btn-deny toggle-menu">Remove From Menu</button>
  </article>
  <!-- /.recipe -->
</template>
```

create `client/recipes/Recipe.js`

```js
Template.Recipe.events({
  'click .toggle-menu': function() {
    console.log('works!');
  }
});
```

Add this code and test if the buttons generate `works` in the chrome inspector. If it does, your event is working.

### Create the collection permissions for update
`collections/Recipes.js`

```js
Recipes.allow({
  // this will allow us to make inserts
  insert: function(userId, doc) {
    return !!Meteor.userId;
  },
  // this will allow us to make updates
  update: function(userId, doc) {
    return !!Meteor.userId;
  }
});
```

### Create the server method to allow the update

`collections/Recipes.js`

```js
Meteor.methods({
  toggleMenuItem: function(id, currentState) {
    Recipes.update(id, {
      $set: {
        inMenu: !currentState
      }
    });
  }
});
```

`client/recipes/Recipe.js`

```js
Template.Recipe.events({
  'click .toggle-menu': function() {
    // console.log('works!');
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  }
});
```

if you use Meteortoys, you will see that both buttons when click set the `inMenu` to the opposite of the current value. If the property doesn't exist, it will add it and set it to `true`.

But we need to show and hide them or else both buttons will just toggle the `inMenu` value which is not what we want.

## Filtering our menu

How do we create a conditional to only show items in the menu if they are listed as `inMenu` set to `true`?

```html
<template name="Recipe">
  <article class="recipe {{#if inMenu}}in-menu{{/if}}">
    <h3>{{name}}</h3>
    <p>
      {{desc}}
    </p>
    <p>
      {{#each ingredients}}
        <span class="ingredient">{{name}} - {{amount}}</span>
      {{/each}}
    </p>
    <a href="/recipe/{{_id}}">View Details</a>
    <button class="btn-primary toggle-menu">Add To Menu</button>
    <button class="btn-deny toggle-menu">Remove From Menu</button>
  </article>
  <!-- /.recipe -->
</template>
```

so we just add this:

`<article class="recipe {{#if inMenu}}in-menu{{/if}}">`

it's that easy

### change our styles

```stylus
.remove-from-menu
        display none
    &.in-menu
        background teal
        color #FFF
        h3
            border-bottom: rgba(255,255,255, 0.6) solid 3px
        .add-to-menu
            display none
        .remove-from-menu
            display block
```

to this

```stylus
.btn-deny
    display none
&.in-menu
    background teal
    color #FFF
    h3
        border-bottom: rgba(255,255,255, 0.6) solid 3px
    .btn-primary
        display none
    .btn-deny
        display block
```

by default, the `deny` button will be display none
and btn primary will be displayed block

and when we have in-menu, we will have btn-primary display none and deny as display block

now when you click 'add to menu' the box turns teal, and when you click, remove from menu the box turns back to white. super cool!

add this to router.js

```js
FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Menu'});
  }
});
```

and create that template `client/Menu.html`

```html
<template name="Menu">
  <h1 class="page-title">My Current Menu</h1>
  <!-- /.page-title -->
</template>
```

we create this in our template just to make sure our route is working properly

make Menu.js

```js
// Meteor.subscribe( "recipes" );

Template.Menu.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('recipes');
  });
});

Template.Menu.helpers({
  recipes: ()=> {
    return Recipes.find({ inMenu: true });
  }
});
```

update our Menu.html with

```html
<template name="Menu">
  <h1 class="page-title">My Current Menu</h1>
  {{#each recipes}}
    <h3>{{name}}</h3>
    <p>
      {{desc}}
    </p>
  {{/each}}
  <!-- /.page-title -->
</template>
```

now you can open two tabs and see your app working. Add and remove menu items and you will see them add and removed from your menu

