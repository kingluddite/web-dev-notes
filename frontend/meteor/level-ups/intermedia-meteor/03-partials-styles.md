# Styles

[link to styles](http://pastebin.com/5Xs9Z113)

Add `client/layouts/SideNav.html`

```html
<template name="SideNav">
  <nav class="side-nav">
    <ul>
      <li>
        <a href="/recipe-book"><i class="fa fa-list"></i> Recipe Book</a>
      </li>
      <li>
        <a href="/menu"><i class="fa fa-map-o"></i> Menu</a>
      </li>
      <li>
        <a href="/shopping-list"><i class="fa fa-shopping-cart"></i> Shopping List</a>
      </li>
    </ul>
  </nav>
  <!-- /.side-nav -->
</template>
```

we don't want our sidebar on the home page, we only want it accessible to users that are logged in

and we will add our side bar to the  `client/layouts/MainLayout.html`

```html
<template name="MainLayout">
  <header>
    <h1>My Recipe Book</h1>
    {{> loginButtons}}
  </header>
  {{> SideNav}}
  <main>
    {{> Template.dynamic template=main}}
  </main>
</template>
```

and now we have a nicely styled layout

we have a problem with the sidebar covering our submit button so add this class to `<main class="main-layout">`

but our routes don't work when we click on links (we'll add that later)

move SideNav.html into our partials folder

and meteor will automagically make sure the code works

create `client/partials/Header.html`

```html
<template name="Header">
  <header>
    <h1>My Recipe Book</h1>
    {{> loginButtons}}
  </header>
</template>
```

and update your `MainLayout.html`

```html
<template name="MainLayout">
  {{> Header}}
  {{> SideNav}}
  <main class="main-layout">
    {{> Template.dynamic template=main}}
  </main>
</template>
```

and `HomeLayout.html`

```html
<template name="HomeLayout">
  {{> Header}}
  <main>
    <div class="billboard">
      <h2>Organize Your Meals</h2>
    </div>
    <!-- /.billboard -->
  </main>
</template>
```

## create a recipe list
rename `client/recipes/Recipes.html` (capitalize spelling)

* also do it for `client/recipes/Recipes.js`

`client/recipes/Recipes.js`

we are using ES6 syntax here

```js
Template.Recipes.helpers({
  recipes: ()=> {
    return Recipes.find({});
  }
})
```

and now we want to list all our recipes

`client/recipes/Recipe.html`

```html
<template name="Recipes">
  {{> NewRecipe}}
  <section class="recipes">
    {{#each recipes}}
      {{name}}
    {{/each}}
  </section>
  <!-- /.recipes -->
</template>
```

![output our recipes](https://i.imgur.com/bMH0g3l.png)

update our `Recipes.html` so that it pulls in a singular Recipe template

```html
<template name="Recipes">
  {{> NewRecipe}}
  <section class="recipes">
    {{#each recipes}}
      {{> Recipe}}
    {{/each}}
  </section>
  <!-- /.recipes -->
</template>
```

and here is our new single `Recipe.html` template

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
  </article>
  <!-- /.recipe -->
</template>
```

## Template Level subscriptions

we want to have recipes subscribed at template level instead of the client level

`client/recipes/recipes.js`

comment out our client level subscription

`// Meteor.subscribe( "recipes" );`

all our recipes disappear

you only want to subscribe and publish what you need to be using at that given time

 you have a site with 100,000 recipes with 1000 different users, you would only want the current user's recipes, to ever make it to the front end code. so you would only want to publish the current users recipes
 so subscription management is important part of having a performanative application

 one optimization is to use template level subscriptions
 so our subscribe is pinned to the template itself
 once the template is loaded then we are going to subscribe to the correct data

`self.autorun`
* unsubscribes us from any old subscriptions, that way in the future whenever we are on some specific recipe with an ID we are getting from a URL, when we go to the next recipe, we're not still subscribed to the previous one

`client/recipes/Recipes.js`

```js
Template.Recipes.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('recipes');
  });
});
```

now our subscriptions are back but we have pinned this subscription only to this template

the subscription is not tied to the route or anything other than the template itself

## let's show our recipes are loading until they are loaded and then show them

### Template.subscriptionsReady

```html
<template name="Recipes">
  {{> NewRecipe}}
  <section class="recipes">
    {{#if Template.subscriptionsReady}}
      {{#each recipes}}
        {{> Recipe}}
      {{/each}}
    {{else}}
      <p>
        Loading
      </p>
    {{/if}}
  </section>

  <!-- /.recipes -->
</template>
```

our site will load fast because
* we are localhost
* we don't have a ton data

you could add a spinner or some other loading animation
common practice for sites loading a large amount of data

## Parameters in FlowRouter
take parameter our of router and get data
select an individual recipe and load it using the URL

click on one recipe and view the details of the recipe

`client/recipes/Recipe.html`

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
  </article>
  <!-- /.recipe -->
</template>
```

so now we have our link with a id parameter, now let's fix our route

add a new flow router

```js
FlowRouter.route('/recipe/:id', {
  name: 'recipe-book',
  action( ) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'RecipeSingle' });
  }
});
```

and now we will create our RecipeSingle template

```html
<template name="RecipeSingle">
  <h1>Hello</h1>
  {{recipe.name}}
</template>
```

on the main page click on one `View Details` link
and you will see `Hello` and that it is working

now we need to write our helper

`client/recipes/RecipeSingle.js`

```js
Template.RecipeSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('recipes');
  });
});

Template.RecipeSingle.helpers({
  recipe: ()=> {
    return Recipes.findOne({});
  }
});
```
we can save one template as another to save time
rename template
* we change to point to one single recipe
* use findOne() to pull up by ID of recipe

now we need to tie the recipe to the id in the URL

`var id = FlowRouter.getParam('id')`
* the `id` is from FlowRouter and everything after the colon `:`
in...

`FlowRouter.route('/recipe/:id', {`

you will see any random recipe appear but when you change the code in `client/recipes/RecipeSingle.js` to:

```js
Template.RecipeSingle.helpers({
  recipe: ()=> {
    var id = FlowRouter.getParam('id');
    return Recipes.findOne({});
  }
});
```

You now get the correct recipe based on it's id value in the URL!

now you can navigate to all the different recipes and you can add any other parameters you want to display in the RecipeSingle.js template

## Set up a publish and subscribe for our single recipe
right now we are getting all the current users recipes when we only need to get one recipe

we can make a new publish statement but just for one recipe

add our publish for the single recipe with:

`server/publish.js`

```js
Meteor.publish("singleRecipe", function(id){
  check(id, String);
  return Recipes.find({_id: id});
});
```

and then the subscribe will be:

`client/recipes/RecipeSingle.js`

```js
Template.RecipeSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleRecipe', id);
  });
});
```

we get a server error saying `check` is not defined

we need to add this to our packages with:

`check`

so now meteor will refresh and use meteortoys to see your collections

you'll see all our recipes when you are on the recipe book but as soon as you click on `View Detail` you will only see one recipe

you're subscriptions are working!