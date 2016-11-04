# #ach:else for no results

### rule
one template per file
but sometimes if something is so small, an exception is allowed
`know the rules before you break the rules`

### let's make our Menu Items look nicer
update `Menu.html`

* we have 2 templates in our Menu.html because the code is simple

```html
<template name="Menu">
  <h1 class="page-title">My Current Menu</h1>
  {{#each recipes}}
    {{> MenuItem}}
  {{/each}}
  <!-- /.page-title -->
</template>

<template name="MenuItem">
  <div class="menu-item">
    <h3>{{name}}</h3>
    <p>
      {{desc}}
    </p>
  </div>
  <!-- /.menu-item -->
</template>
```

View in browser and see how our menu items looks similar to our other components

but if we remove all items we just see the heading
we should have our template ui update with 'you have no items in your menu, please add them'

```html
<template name="Menu">
  <h1 class="page-title">My Current Menu</h1>
  {{#each recipes}}
    {{> MenuItem}}
  {{else}}
  <p>
    You have no items in your menu. Please <a href="/recipe-book">recipes</a> to your menu.
  </p>
  {{/each}}
  <!-- /.page-title -->
</template>

<template name="MenuItem">
  <div class="menu-item">
    <h3>{{name}}</h3>
    <p>
      {{desc}}
    </p>
  </div>
  <!-- /.menu-item -->
</template>
```

### update our styles

change this

```stylus
.btn-primary
            display none
        .btn-deny
            display block
```

to this

```stylus
.btn-primary, .btn-deny
            display none
```

and you can delete other nested styles inside `.recipe` where `.btn-primary` and `.btn-deny` are mentioned

these changes will help prevent problems if we add buttons in the future, they are both showing up now.

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
    {{#if inMenu}}
      <button class="btn-deny toggle-menu">Remove From Menu</button>
    {{else}}
      <button class="btn-primary toggle-menu">Add To Menu</button>
    {{/if}}
  </article>
  <!-- /.recipe -->
</template>
```

now our remove from menu only appears if it is in the menu and add to menu appears if it is not in menu

## Building the shopping list

Add our shopping list route

`lib/routes.js`

```js
FlowRouter.route('/shopping-list', {
  name: 'shopping-list',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'ShoppingList'});
  }
});
```

add our `client/ShoppingList.js` template

```html
<template name="ShoppingList">
  <h1 class="page-title">Shopping List</h1>
</template>
```

create a new file `client/ShoppingList.js`

save Menu.js code into ShoppingList.js code to save time

`client/ShoppingList.js`

```js
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

rework that file to fit what we need

```js
Template.ShoppingList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('recipes');
  });
});

Template.ShoppingList.helpers({
  shoppingList: ()=> {
    return Recipes.find({ inMenu: true });
  }
});
```

We rename to the template we are using `ShoppingList`

and we rename the variable we will use in our template so that it makes more sense (even thought it is pulling the same data)

So we renamed `recipes` to `shoppingList`

```html
<template name="ShoppingList">
    <h1 class="page-title">Shopping List</h1>
    <ul class=shopping-list>
        {{#each shoppingList}}
            {{#each ingredients}}
                <li>{{name}}
                    -
                    <span class="amount">{{amount}}</span>
                </li>
            {{/each}}
        {{else}}
        {{/each}}
    </ul>
</template>
```

check it and you'll see items you need are added to shopping list
but if all items are remove, your shopping list is empty

show a message if shopping list is empty

```html
<template name="ShoppingList">
    <h1 class="page-title">Shopping List</h1>
    <ul class=shopping-list>
        {{#each shoppingList}}
            {{#each ingredients}}
                <li>{{name}}
                    -
                    <span class="amount">{{amount}}</span>
                </li>
            {{/each}}
        {{else}}
            <li>
                <h3>Please
                    <a href="/recipe-book">recipes</a>
                    to your menu.</h3>
            </li>
        {{/each}}
    </ul>
</template>
```
## Updating With A QuickForm

we need the ability to edit and delete our recipe book

check out documentation on [meteor autoform github documentation](https://github.com/aldeed/meteor-autoform)

`{> quickForm collection="Recipes" id="updateRecipe" type="update" doc=this}}`

* doc - what data you are passing into the form
** we have access to `this` and that refers to `this particular recipe`

when we add this `client/recipes/Recipe.html` we have a problem

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
    {{#if inMenu}}
      <button class="btn-deny toggle-menu">Remove From Menu</button>
    {{else}}
      <button class="btn-primary toggle-menu">Add To Menu</button>
    {{/if}}
    {{> quickForm collection="Recipes" id=updateRecipeId type="update" doc=this}}
  </article>
  <!-- /.recipe -->
</template>
```

me need to make `updateRecipe` a helper

change it to this

`  {{> quickForm collection="Recipes" id=updateRecipeId type="update" doc=this}}`

add this helper in `client/recipes/Recipe.js`

```js
Template.Recipe.helpers({
  updateRecipeId: function() {
    return this._id;
  }
});
```

now we have all the forms with the correct id

### add autosave to auto form
autosave on blur, tab, enter

## Deleting Recipes and Session Helpers
[vid #23 ](https://www.youtube.com/watch?v=qRzMkj1L6z0&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V&index=24)

How do we delete items?

we have font-awesome installed
svg icons are great too if you want to use them

add this html to add delete font-awesome icon

`client/recipes/Recipe.html`

```html
<i class="fa fa-trash"></i>
    {{#if inMenu}}
```

here is the stylus to style the delete icon

```stylus
.fa-trash
        opacity 0.3
        cursor pointer
        position absolute
        top 0
        right 0
        font-size 1.6em
        display block
        padding 20px
        color black
        trans()
        &:hover
            color red
            opacity 0.6
```

but when we click it is does nothing because we don't have it rigged up yet

```js
Template.Recipe.events({
  'click .toggle-menu': function() {
    // console.log('works!');
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  },
  'click .fa-trash': () => {
    // gives us the Window object, which is not what we want
    // we want the object clicked (this)
    // the arrow function does not work for us here so we need to
    // use the old ES syntax with function  
    console.log(this);
  }
});
```

But this works and `this` gives us the object clicked

```js
'click .fa-trash': function() {
    console.log(this);
  }
```

we add our meteor method in `collections/Recipes.js`

```js
Meteor.methods({
  toggleMenuItem: function(id, currentState) {
    Recipes.update(id, {
      $set: {
        inMenu: !currentState
      }
    });
  },
  deleteRecipe: function(id) {
    Recipes.remove(id);
  }
});
```

and we update our `client/recipes/Recipe.html` to call that method

```js
Template.Recipe.events({
  'click .toggle-menu': function() {
    // console.log('works!');
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  },
  'click .fa-trash': function() {
    // we add this line
    Meteor.call('deleteRecipe', this._id);
  }
});
```

And now we can delete recipes

## edit our recipe

use the font-awesome pencil with `fa fa-pencil`

`client/recipes/Recipe.html`

```html
<a href="/recipe/{{_id}}">View Details</a>
    <i class="fa fa-pencil"></i>
    <i class="fa fa-trash"></i>
```

we want to style the pencil exactly like the trash icon but we want the hover color to be teal

```styl
.fa-trash, .fa-pencil
    opacity 0.3
    cursor pointer
    position absolute
    top 0
    right 0
    font-size 1.6em
    display block
    padding 20px
    color black
    trans()
    &:hover
        color red
        opacity 0.6
.fa-pencil
    right 40px
    &:hover
      color teal
```

## hide recipe form by default unless you are in editMode

handlebars-helpers package

ability to grab session variables without defining your own helper

Our quick form is there all the time. That's annoying. We need a way of hiding it until we need it.

`client/recipes/Recipe.html`

```html
{{#if $.Session.get 'editMode'}}
      {{> quickForm collection="Recipes" id=updateRecipeId type="update" doc=this autosave=true}}
{{/if}}
```

and we will toggle editMode to true or false using a Session variable

```js
Template.Recipe.events({
  'click .toggle-menu': function() {
    // console.log('works!');
    Meteor.call('toggleMenuItem', this._id, this.inMenu);
  },
  'click .fa-trash': function() {
    // console.log(this);
    Meteor.call('deleteRecipe', this._id);
  },
  // add this line
  'click .fa-pencil': function() {
    Session.set('editMode', !Session.get('editMode'));
  }
});
```

Use meteortoys package to see the Session toggle

now when the recipe book first loads the edit forms of the recipe items is hidden unless you click the edit icon

one fix is our teal pencil icon doesn't work because it disappears when the item is added to the menu (both background are teal) let's change it to purple

```stylus
.fa-pencil
        right 40px
        &:hover
          color orange
```

and we can make our form better but hiding fields we don't need in edit mode

```html
<template name="Recipe">
  <article class="recipe {{#if inMenu}}in-menu{{/if}}">
    <h3>{{name}}</h3>
    {{#if $.Session.get 'editMode'}}
      {{> quickForm collection="Recipes" id=updateRecipeId type="update" doc=this autosave=true}}
    {{else}}
      <p>
        {{desc}}
      </p>
      <p>
        {{#each ingredients}}
        <span class="ingredient">{{name}} - {{amount}}</span>
        {{/each}}
      </p>
      <a href="/recipe/{{_id}}">View Details</a>
      {{#if inMenu}}
        <button class="btn-deny toggle-menu">Remove From Menu</button>
      {{else}}
        <button class="btn-primary toggle-menu">Add To Menu</button>
      {{/if}}
    {{/if}}
    <i class="fa fa-pencil"></i>
    <i class="fa fa-trash"></i>
  </article>
  <!-- /.recipe -->
</template>
```
## Scoped Reactivity With Reactive Vars
[vid #24](https://www.youtube.com/watch?v=0MgFzsQujFw&index=25&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V)

like session variables but can be scoped to a specific template

toggle editMode turns on all our recipes
the reason is sessions are global to the entire application

we need to scope it to just the template being edited

### add package - `reactive-var`
**note** reactive-var is now bundle with meteor, no need to add it (in fact if you add it you will get an error for a duplicate package)
how to use

`client/recipes/Recipe.js`

either one works to set the reactive-var to false
* first one reads better than the commented out one
```js
Template.Recipe.onCreated(function() {
  this.editMode = new ReactiveVar(false);  
  // this.editMode.set(false);
});
```

so now when the template is created we create a reactive var on it

we update our event on `client/recipes/Recipe.js`

old code

```js
'click .fa-pencil': function() {
    Session.set('editMode', !Session.get('editMode'));
  }
```
new code

```js
'click .fa-pencil': function(event, template) {
  Template.editMode.set(!template.editMode.get());
}
```

now we need to update our `client/recipes/Recipe.html`

old code

```html
{{#if $.Session.get 'editMode'}}
  {{> quickForm collection="Recipes" id=updateRecipeId type="update" doc=this autosave=true}}
{{else}}
```

new code

```html
{{#if editMode}}
  {{> quickForm collection="Recipes" id=updateRecipeId type="update" doc=this autosave=true}}
{{else}}
```

And we can add a helper

```js
Template.Recipe.helpers({
  updateRecipeId: function() {
    return this._id;
  },
  /*add this helper*/
  editMode: function() {
    return Template.instance().editMode.get();
  }
});
```

We grab this particular instance of the template and grab it's only the specific template instance editMode (not globally like a session would)

## Wrapping up
[vd #25](https://www.youtube.com/watch?v=0MgFzsQujFw&index=25&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V)

`client/recipes/Recipes.html`

```html
<template name="Recipes">
  <button class="new-recipe">New Recipe</button>
```

`client/recipes/NewRecipe.html`

add an `x` to top right of new recipe form

```html
<template name="NewRecipe">
  <div class="new-recipe-container">
    <i class="fa fa-close"></i>
    {{> quickForm collection="Recipes" id="insertRecipeForm" type="insert" class="new-recipe-form"}}
  </div>
  <!-- /.new-recipe-container -->
</template>
```

we want to click on `x` and close new recipe

style of close button

```stylus
.new-recipe-container
    position relative
    background #FFF
    padding 20px
    margin-bottom 20px
    shadow-level(2)
    .fa-close
        position absolute
        top 0
        right 0
        padding 20px
```

we are going to use a session variable and not a reactive var to close the form, because we want it to happen between template and not on each one

when close is clicked we want to hide form (using session variable)
when new recipe is clicked we want to show form (using session variable)

create a new file `client/recipes/NewRecipe.js`

```js
Template.NewRecipe.events({
  'click .fa-close' : function() {
    Session.set('newRecipe', false);
  }
});
```

update the events on `client/recipes/Recipes.js`

```js
Template.Recipes.events({
  'click .new-recipe' : () => {
    Session.set('newRecipe', true);  
  }
});
```

test session using meteortoys package `ctrl + m`

and simple show on new recipe click or hide on close x click

```html
template name="NewRecipe">
  {{#if $.Session.get 'newRecipe'}}
  <div class="new-recipe-container">
    <i class="fa fa-close"></i>
    {{> quickForm collection="Recipes" id="insertRecipeForm" type="insert" class="new-recipe-form"}}
  </div>
  {{/if}}
  <!-- /.new-recipe-container -->
</template>
```

improvements
animate form in using session varialbe on css transformation class
add form details on ingredient
* could have an edit feature

# User Accounts in Meteor
https://www.youtube.com/watch?v=T7T9y854uWw&list=PLLnpHn493BHFMTabI7UK28e0e_CwoiYv6



