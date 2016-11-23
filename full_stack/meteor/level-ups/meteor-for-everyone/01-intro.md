# Intro to Meteor

## Meteor Packages for atom

* Atom Lint
* Atom Beautify
* Atom Handlebars
* Atom Jshint
* Atom Prettify
* Angularjs
* Atom Angular
* Atom Bootstrap
* Autocomplete
* Autocomplete +
* Bracket Matcher
* File Types
* Filetype Color
* Grammar Selector
* Language Spacebars
* Meteor Api
* Meteor Helper
* Wrap Guide

## What we are building

Simple resolutions (todo app)

1. install
2. meteor.com
3. node.js

`$ meteor create resolutions`

`$ cd resolutions`

## run meteor
`$ meteor`

That creates first project, view <http://localhost:3000>

## Default meteor files

.meteor

- contains meteor stuff
- versions of dependencies
- blaze (views)
- underscore

### css in meteor

```css
body { background-color: red; }
```

Meteor autoupdates so you can work in css or css preprocessors and meteor takes care of the rest

helpers, events,

## Meteor Templates with blaze

`{{> hello}}` calls that template

### basic example

`client/main.html`

```html
<head>
  <title>resolutions</title>
</head>

<body>
  {{> resolution}}
</body>

<template name="resolution">
Hello
</template>
```

`client/main.html`

```html
<head>
  <title>resolutions</title>
</head>

<body>
  {{ resolutions }}
  <ul>
    {{> resolution}}
  </ul>
</body>

<template name="resolution">
  <li>Title</li>
</template>
```

### helpers

`client/main.html`

````html
```html
<head>
  <title>resolutions</title>
</head>

<body>
  {{ resolutions }}
  <ul>
    {{> resolution}}
  </ul>
</body>

<template name="resolution">
  <li>Title</li>
</template>
````

`client/main.js`

```javascript
Template.body.helpers({
  resolutions: [
    {
      title: "Buy Gas"
    }
  ]
});
```

you will see [Object Object] on page
you can't display an object because he has a bunch of stuff inside it

we need to iterate through it using this:

`client/main.js`

```javascript
Template.body.helpers({
  resolutions: [
    {
      title: "Buy Gas"
    }, {
      title: "Buy Milk"
    },
  ]
});
```

`client/main.html`

```html
<head>
    <title>resolutions</title>
</head>

<body>

    <ul>
        {{#each resolutions}}
            {{> resolution}}
        {{/each}}
    </ul>
</body>

<template name="resolution">
  <li>{{title}}</li>
</template>
```

No you will see your list of 2 items

inspect element in chrome console

![list of items](https://i.imgur.com/FrVjzFt.png)

differences between
`{{resolutions}}` and `{{> resolution}}`

first one is an Object
second one is a template

## Storing Data in Collections
collections updates everywhere

db is mongodb
similar to working with JSON

`collections/resolutions.js`

```js
Resolutions = new Mongo.Collection( 'resolutions' );
```

`client/main.js`

```Template.body.helpers({
  resolutions: function ( ) {
    return Resolutions.find( );
  }
});
```

HTML stays the same and then when we view in the browser, we see no resolutions because our collection is empty

## Let's add some resolutions

### Add Client side?
We could add these resolutions client side using the console with:

### Add via MongoDB?
Via mongo with the terminal

`$ meteor mongo`

And we should see something like:

```
MongoDB shell version: 3.2.6
connecting to: 127.0.0.1:3001/meteor
Mongo-Hacker 0.0.13
philips-iMac(mongod-3.2.6)[PRIMARY:meteor] meteor>
```

### Insert records using MongoDB
Now we are in `mongod`. So let's insert a record

`> db.resolutions.insert({ title: "Buy Eggs"});`

Let's insert a record with a the current date

`> db.resolutions.insert({ title: "Buy Pencils", createdAt: new Date() });`

cool, both records are inserted in browser at real time

let's try this in the chrome console

`db.resolutions.insert({ title: "Buy Pencils", createdAt: new Date() });`

we get an error that `db is not defined`

if we do this:

`resolutions.insert({ title: "Buy Pencils", createdAt: new Date() });`

we get an error that `resolutions` is not defined

but if we use this

`Resolutions.insert({ title: "Buy Pens", createdAt: new Date() });`

we see the record was inserted and a strange number was returned
something like `dWCt8C3YiJMwjbGoE`

this is the `id` of the `document`. anytime you create a record in mongo it creates a unique id automatically

we have access to our collection via the client. this is cool but also a major security risk. thankfully, meteor gives us ways to make sure our app is secure. But we'll talk about that in a later lesson

## Adding forms
`client/main.css`
* [copy and paste this css](http://pastebin.com/raw/erLEbdaK)

`client/main.html`

```html
<head>
    <title>resolutions</title>
</head>

<body>
    <div class="container">
        <header>
            <h1>Monthly Resolutions</h1>
            <form class="new-resolution">
                <input type="text" name="title" placeholder="a new resolution">
                <input type="submit" value="Submit">
            </form>
            <!-- /.new-resolution -->
        </header>
        <ul>
            {{#each resolutions}}
                {{> resolution}}
            {{/each}}
        </ul>
    </div>
    <!-- /.container -->

</body>

<template name="resolution">
  <li>{{title}}</li>
</template>
```

**note** why are we using `Template.body` and not `Template.resolution`?

Because we are not inside our template of resolution. All our code is currently inside `body`

Spacebars (like Handlebars in our HTML)
Blaze (allows us to interact with the front end of our website)

```js
Template.body.helpers({
  resolutions: function ( ) {
    return Resolutions.find( );
  }
});

Template.body.events({
  'submit .new-resolution': function ( event ) {
    var title = event.target.title.value;

    Resolutions.insert({ title: title, createdAt: new Date( ), });
    // clear form
    event.target.title.value = '';
    // stop page from submitting
    return false;
  }
});
```

Now you can add resolutions using a form

