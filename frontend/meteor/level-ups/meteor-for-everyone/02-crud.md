# CRUD

## Deleting records

main.html

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
      {{#each resolutions}} {{> resolution}} {{/each}}
    </ul>
  </div>
  <!-- /.container -->

</body>

<template name="resolution">
  <li>{{title}} <button class="delete">Remove</button></li>
</template>
```

main.js

```js
Template.body.helpers({
  resolutions: function ( ) {
    return Resolutions.find( );
  }
});

Template.body.events({
  'submit .new-resolution': function ( event ) {
    var title = event.target.title.value;

    Resolutions.insert({title: title, createdAt: new Date( )});
    // clear form
    event.target.title.value = '';
    // stop page from submitting
    return false;
  }
});

// we added this here
Template.resolution.events({
  'click .delete': function ( ) {
    console.log( 'yo' );
    Resolutions.remove( this._id );
  }
});
```

that deletes it from the database (try to refresh browser)

## Update

### Add a checkbox
hava a status of checked or not checked

inside template are list of objects, you need a comma in-between each one


'main.html'

```html
<template name="resolution">
  <li>
    <input type="checkbox" checked="{{checked}}" class="toggle-checked" />
    <span class="text">{{title}}</span>
    <button class="delete">Remove</button></li>
</template>
```

main.js

```js
Template.resolution.events({
  'click .toggle-checked': function ( ) {
    Resolutions.update(this._id, {
      $set: {
        checked: !this.checked
      }
    })
  },
  'click .delete': function ( ) {
    Resolutions.remove( this._id );
  },
});
```

now you can check items and they stay checked even after a page refresh because you have updated the database

### update html with conditional class

```html
<template name="resolution">
  <li class="{{#if checked}}checked{{/if}}">
    <input type="checkbox" checked="{{checked}}" class="toggle-checked" />
    <span class="text">{{title}}</span>
    <button class="delete">Remove</button></li>
</template>
```

## Temporary Session Data in Meteor
All your current changes are available to everyone who is using the site

What if we just want to add stuff to our app that only we see?

We only want to see resolutions we have yet to complete
* you don't want every user to see this data
* you don't want this data to be persistant in the db

### Session Variable
Just a temporary variable that is only be affected to the person using the application

you need to add `session` to `.meteor/packages`

* if not you will get a Session is not defined
* session used to be bundled with Meteor and now it is not

let's add a checkbox to our body

`main.html`

```html
<head>
    <title>resolutions</title>
</head>

<body>
    <div class="container">
        <header>
            <h1>Monthly Resolutions</h1>

            <label class="hide-finished">
              <input type="checkbox" checked="{{hideFinished}}" />
              Hide Finished Resolutions
            </label>

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
```

and then in `main.js`

* update our code so that we first search for only those items that are checked in our database if our hideFinished Session has been set otherwise show all resolutions

```js
Template.body.helpers({
  resolutions: function ( ) {
    if (Session.get( 'hideFinished' )) {
      return Resolutions.find({
        checked: {
          $ne: true
        }
      });
    } else {
      return Resolutions.find( );
    }
  }
});
```

but currently in our main.html we are not using checked={{hideFinished}}

why?

You can not use anything in your templates without defining them first

we just have to define a session variable

`main.js`

```
Template.body.helpers({
  resolutions: function ( ) {
    if (Session.get( 'hideFinished' )) {
      return Resolutions.find({
        checked: {
          $ne: true
        }
      });
    } else {
      return Resolutions.find( );
    }
  },
  hideFinished: function ( ) {
    return Session.get( 'hideFinished' );
  },
});
```

## Meteor Packages
great way to add advanced stuff to your site without having to build it from scratch

[atmouspherejs.com](https://atmospherejs.com/)

stolinski:stylus-multi

add the above packages

long way to add is `$ meteor add stolinski:stylus-multi`

make the following change to main.css
rename to main.styl

change the top of the code to this:

```stylus
html
  box-sizing border-box

*,
*:before,
*:after {
    box-sizing: inherit;
}

body
  font-family sans-serif
  font-size 16px
  background blue
```

you will see the background changes to blue

we don't have to worry about the build step
of using gulp to concatenate and minify
we don't need sass watch
we don't need browser-sync

you can import files with sass add folder structure

how to add nib to stylus with meteor

add to top of main.styl

`@import 'nib'`

[what is nib?](https://tj.github.io/nib/)

## Easy User Accounts With Meteor Accounts UI

[learn stylus ](https://www.youtube.com/watch?v=eJahtnmywMI&list=PLLnpHn493BHFWQGA1PcyQZWAfR96a4CkH)

[how to style react](http://andrewhfarmer.com/how-to-style-react/)

add these 2 packages

```
accounts-password
accounts-ui
```

all this stuff gets added

![after adding accounts](https://i.imgur.com/iIcNX31.png)

we should install bcrypt (we get an error)

`meteor npm install --save bcrypt`

now we have a `Sign in` on our page. it has a drop down with username and password

update html with:

main.html

```html
<div class="container">
    <header>
        <h1>Monthly Resolutions</h1>

        <label class="hide-finished">
          <input type="checkbox" checked="{{hideFinished}}" />
          Hide Finished Resolutions
        </label>

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
    {{> loginButtons }}
</div>
<!-- /.container -->
```

## allow users to log in with username and not email

just add this to bottom of `main.js`

```js
Accounts.ui.config({ passwordSignupFields: "USERNAME_ONLY" });
```

create an account
username: admin
passwrod: 1

you will see error and validation working (need 6 characters in password)

username: admin
password: password

create that user and you will be logged in

only show form if logged in

```html
{{#if currentUser }}
<form class="new-resolution">
    <input type="text" name="title" placeholder="a new resolution">
    <input type="submit" value="Submit">
</form>
{{/if}}
```

log out and form disappears, log in and form returns
the code is working!



