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

Our quick form is there all the time. That's annoying. We need a way of hiding it until we need it.



## Scoped Reactivity With Reactive Vars
[vid #24](https://www.youtube.com/watch?v=0MgFzsQujFw&index=25&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V)

## Wrapping up
[vd #25](https://www.youtube.com/watch?v=0MgFzsQujFw&index=25&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V)
