# The project

## Package management

Remove the following packages from Meteor

* autopublish
* insecure

```
autopublish@1.0.7             # Publish all data to the clients (for prototyping)
@1.0.7                # Allow all DB writes from clients (for prototyping)
```

Add these packages:

```
kadira:flow-router
kadira:blaze-layout
erasaur:meteor-lodash
stolinski:stylus-multi
fortawesome:fontawesome
spiderable
fastclick
raix:handlebar-helpers
aldeed:collection2
aldeed:autoform
accounts-ui
accounts-password
matb33:bootstrap-glyphicons
msavin:jetsetter
zimme:active-route
gwendall:auth-client-callbacks
```

* note `versions` is automatically generated with current version of all packages

* also add bcrypt but not to Meteor packages. Use npm to install it and add it to your packages.json file.

`$ meteor npm install --save bcrypt`

## Project Structure

**For atom**: If you'd like to permanently make all javascript default to the Javascript (Meteor) grammar, disable the language-javascript package!

* client
  + layouts
  + partials
  + recipes
  + init.js
  + main.styl

* collections
  + recipes.js
* lib
  + routes.js
* server
  + init.js
  + main.js

## Basic Layouts
Delete everything from `main.html` except `<HEAD>` stuff

Delete `index.js` and `main.js` 

`client/main.html`

```html
<head>
  <title>intermediate-recipes</title>
</head>
```

`client/layouts/MainLayout.html`

```html
<template name="MainLayout">
  <header>
    <h1>My Recipe Book</h1>
    {{> loginButtons}}
  </header>
  <main>
    {{> Template.dynamic template=main}}
  </main>
</template>
```

`client/layouts/HomeLayout.html`

```html
<template name="HomeLayout">
  <header>
    <h1>My Recipe Book</h1>
    {{> loginButtons}}
  </header>
  <main>
    <div class="billboard">
      <h2>Organize Your Meals</h2>
    </div>
    <!-- /.billboard -->
  </main>
</template>
```

We have no routes so we have a route error

## routes

`lib/routes.js`

```js
FlowRouter.route('/', {
  name: 'home',
  action( ) {
    BlazeLayout.render( 'HomeLayout' );
  },
});
```

You should now see your home page

Update our router with:

```js
FlowRouter.route('/', {
  name: 'home',
  action( ) {
    BlazeLayout.render( 'HomeLayout' );
  }
});

FlowRouter.route('/test', {
  name: 'test',
  action( ) {
    BlazeLayout.render('MainLayout', { main: 'Test' });
  }
});
```

And update our dynamic layout in `MainLayout` with:

```html
<template name="MainLayout">
  <header>
    <h1>My Recipe Book</h1>
    {{> loginButtons}}
  </header>
  <main>
    {{> Template.dynamic template=main}}
  </main>
</template>

<template name="Test">
    Yo
</template>
```

## Defining a Schema
we are using `collection2` and autoform installed as packages

we will be using `simpleschema` (part of `collection2`)

`collections/recipes.js`

```js
Recipes = new Mongo.Collection( 'recipes' );

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  desc: {
    type: String,
    label: "Description",
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function ( ) {
      return this.userId;
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function ( ) {
      return new Date( );
    }
  },
});

Recipes.attachSchema( RecipeSchema );
```

## Easy forms

Delete from `MainLayout.html`

```html
<template name="Test">
    Yo
</template>
```

Create `client/recipes/recipes.js`

```html
<template name="Recipes">
  Test  
</template>
```

Update `lib/routes.js`

```js
FlowRouter.route('/recipe-book', {
  name: 'recipe-book',
  action( ) {
    BlazeLayout.render('MainLayout', { main: 'Recipes' });
  }
});
```

# magic forms
`client/recipes/recipes.html`

```html
<template name="Recipes">
  {{> NewRecipe}}  
</template>
```

`client/recipes/NewRecipe.html`

```html
<template name="NewRecipe">
  <div class="new-recipe-container">
    {{> quickForm collection="Recipes" id="insertRecipeForm" type="insert" class="new-recipe-form"}}
  </div>
  <!-- /.new-recipe-container -->
</template>
```

Will give us an automatically generated form based on our schema

You just need to browse to the new route `http://localhost:3000/recipe-book`

![auto generated form](https://i.imgur.com/obcp40O.png)

We want to hide the author and createdAt fields

Update `collections/recipes.js`

```js
Recipes = new Mongo.Collection( 'recipes' );

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  desc: {
    type: String,
    label: 'Description',
  },
  author: {
    type: String,
    label: 'Author',
    autoValue: function ( ) {
      return this.userId;
    },
    autoform: {
      type: 'hidden'
    }
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    autoValue: function ( ) {
      return new Date( );
    },
    autoform: {
      type: 'hidden'
    }
  },
});

Recipes.attachSchema( RecipeSchema );
```

## Create publish.js

`server/publish.js`

```js
Meteor.publish("recipes", function(){
  return Recipes.find({author: this.userId});
});
```
sign in and create an account

remove `jetsetter` from packages and add `meteortoys:allthings`
highly recommend meteortoys on all apps

now try to enter some data by entering a name and description

you will get an access denied error
that is because we turned off `insecure` and we can't insert records from our client

### allow deny
who is allowed to insert into recipes
```js
Recipes.allow({
  insert: function(userId, doc) {
    // who is allowed to insert into the recipes function
    // if the userId exists, then you are signed in, and can insert
    // recipes
    return !!Meteor.userId;
  }
});
```

`$ meteor mongo`
`> show dbs`
`> show collections`
`> db.recipes.find()`

you will see the document was entered into mongo when we submitted it

```js
{
  "_id": "4utgwzTpe5jGcxxNu",
  "name": "Civitas United",
  "desc": "aaa",
  "author": "Qioc5s63uWNQrTqq8",
  "createdAt": ISODate("2016-10-31T03:05:15.978Z")
}
```
why can't we see them?
because we published our recipes but never subscribed to them

`client/recipes.js`

```js
Meteor.subscribe( "recipes" );
```

and now you will see your recipe!

