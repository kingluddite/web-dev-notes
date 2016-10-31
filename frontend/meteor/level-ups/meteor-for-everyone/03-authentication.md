# Authentication
log in to our app with twitter

## Twitter
video #10
[twitter auth](https://www.youtube.com/watch?v=5xbpfTirLxw&index=12&list=PLLnpHn493BHECNl9I8gwos-hEfFrer7TV)

if you are logged into your meteor app, log out

add this to packages

accounts-twitter

click `configure Twitter login` button

![twitter configure](https://i.imgur.com/mqKRykg.png)

[visit the twitter dev link](https://apps.twitter.com/)

* name: KL-Resolutions
* description: our monthly resolution tracker
* website: http://127.0.0.1:3000
* callback url: http://127.0.0.1:3000/_oauth/twitter
* check agree and create twitter app
* create app
check allow this application to sign into twitter
update setting
enter API key (keep safe and remember)
enter API secret (keep safe and remember)

enter API key and API secret in your meteor app popup window
select the recommended Popup-based login
click the `Save configuration` button
click `Sign in With Twitter`
click authorize app

now you should be logged in and you should see your Twitter username

in console
`> Meteor.users.find()`
gives us a whole bunch of meteor info
if we just want the users object use:
`> Meteor.users.find().fetch()`

you will see both users
1 user is admin
2nd user is new user, more objects inside
we have a profile objects
* that gives us access to new objects like `profile` and `services`
profile gives us a user name
services > twitter gives us id, profile img, and our screen name

now our users don't have to create a special account for you app and can use something they already signed up for

## Log in with Facebook
sign out of twitter

now add to packages:
accounts-facebook

log into Facebook developer page
create a new app

display name: my resolution maker
email: your email
category: choose one

click create app ID
enter captcha
app id and app secret save and enter into meteor app
in settings put your site url: http://localhost:3000
(less steps than twitter)

you accept the authorization window and you should see you are now logged in and you have your facebook username

login with google

add pacakge
accounts-google

after it is installed click on configure google
click on link to google dev page
create a new project
wait until it is created
generate your API key
follow similar steps as other oath examples

github is easiest of them all

## Make our site more secure
insecure package

remove insecure (it was a default install for quicker prototype development)

login and:
* checking checkboxes don't persist
* try to insert a record

you will get denied with 'updated failed and insert failed'

this is because we uninstalled insecure

we shut down people using client side console and manipulating code

create a new file `server/methods.js`

```js
Meteor.methods({
  addResolution: function ( title ) {
    Resolutions.insert({title: title, createdAt: new Date( )});
  }
});
```

and then on our client side code we use Meteor.call() method

```js
Template.body.events({
  'submit .new-resolution': function ( event ) {
    var title = event.target.title.value;

    //Resolutions.insert({title: title, createdAt: new Date( )});
    Meteor.call( 'addResolution', title );

    // clear form
    event.target.title.value = '';
    // stop page from submitting
    return false;
  },
  'change .hide-finished': function ( event ) {
    Session.set( 'hideFinished', event.target.checked );
  },
});
```

## Update and Delete using the call() client side method

`server/methods.js`

```js
Meteor.methods({
  addResolution: function ( title ) {
    Resolutions.insert({ title: title, createdAt: new Date( ), });
  },
  deleteResolution: function ( id ) {
    /*console.log( id );*/
    Resolutions.remove( id );
  },
  updateResolutionCheck: function ( id, checked ) {
    Resolutions.update(id, {
      $set: {
        checked: checked
      }
    });
  }
});
```

and on the client side we update these methods

```js
Template.resolution.events({
  'click .toggle-checked': function ( ) {
    Meteor.call( 'updateResolutionCheck', this._id, !this.checked );
    // Resolutions.update(this._id, {
    //   $set: {
    //     checked: !this.checked
    //   }
    // });
  },
  'click .delete': function ( ) {
    // Resolutions.remove( this._id );
    // console.log(this._id);
    Meteor.call( 'deleteResolution', this._id );
  },
});
```

Now our app is more secure

## Removing auto publish
great for getting started.

find me some resolutions is returning all of them
when we remove autopublish we then have to explicitly set up publish and subscribe

remove the `autopublish` line from Meteor packages
uh oh! our collection is now gone!
how do we get our content back?

create a file called `server/publish.js`

```js
Meteor.publish( 'resolutions', function ( ) {
  return Resolutions.find( );
});
```

and now we subscribe to that publish on the client

`client/main.js`

put this at the top of your existing code

```js
Meteor.subscribe( 'resolutions' );
```
## set a public or private resolution

`client/main.html`

```html
<template name="resolution">
  <li class="{{#if checked}}checked{{/if}}">
    <input type="checkbox" checked="{{checked}}" class="toggle-checked" />
      {{#if isOwner}}
      <button class="toggle-private">
        {{#if private}}
          Private
        {{else}}
          Public
        {{/if}}
      </button>
      {{/if}}
    <span class="text">{{title}}</span>
    <button class="delete">Remove</button></li>
</template>
```

Nothing happens because we haven't set `isOwner` yet so that entire code block doesn't show

we need to attach an owner to each of the content

update `server/methods.js` with:

```js
addResolution: function ( title ) {
    Resolutions.insert({title: title, createdAt: new Date( ), owner: Meteor.userId( )});
  },
```

delete all current resolutions because we need to make sure all the new documents we add have an owner associated with them

update the html template so we can see who owns the resolution after we insert some new ones

```html
<template name="resolution">
  <li class="{{#if checked}}checked{{/if}}">
    {{owner}}
    <input type="checkbox" checked="{{checked}}" class="toggle-checked" />
      {{#if isOwner}}
      <button class="toggle-private">
        {{#if private}}
          Private
        {{else}}
          Public
        {{/if}}
      </button>
      {{/if}}
    <span class="text">{{title}}</span>
    <button class="delete">Remove</button></li>
</template>
```

* we added `{owner}`

now add a couple records using the insert form

you will see the owner id beside the resolution

`client/main.js`

add a helper

this will show a button that shows public if logged in

```js
Template.resolution.helpers({
  isOwner: function ( ) {
    return this.owner === Meteor.userId( );
  }
});
```

here is our setPrivate method in `server/methods.js`

```js
setPrivate: function ( id, private ) {
  var res = Resolutions.findOne( id );

  if (res.owner !== Meteor.userId( )) {
    throw new Meteor.Error( 'not-authorized' );
  }
  Resolutions.update(id, {
    $set: {
      private: private
    }
  });
},
```

i used preventDefault in our submit event of our form so the page would not refresh the page

```js
'submit .new-resolution': function ( event ) {
    event.preventDefault( );
    var title = event.target.title.value;

    //Resolutions.insert({title: title, createdAt: new Date( )});
    Meteor.call( 'addResolution', title );

    // clear form
    event.target.title.value = '';
    // stop page from submitting
    /*return false;*/
  },
```

and here is where we add our setPrivate event

`client/main.js`

```js
'submit .new-resolution': function ( event ) {
    event.preventDefault( );
    var title = event.target.title.value;

    //Resolutions.insert({title: title, createdAt: new Date( )});
    Meteor.call( 'addResolution', title );

    // clear form
    event.target.title.value = '';
    // stop page from submitting
    /*return false;*/
  },
```

and we restrict our publication to only show resolutions if we are the current owner or the the resolution if marked private

remove all resolutions
log in and create 3 resolutions
simultaneously open an incognito chrome browser to localhost:3000

mark two resolutions as private an watch them disappear from the incogito browser

delete and update should only be able to be done by
so if you are not the owner you can not delete or update the resolution

update `server/methods.js`

```js
Meteor.methods({
  addResolution: function ( title ) {
    Resolutions.insert({ title: title, private: false, createdAt: new Date( ), owner: Meteor.userId( ), });
  },
  deleteResolution: function ( id ) {
    var res = Resolutions.findOne( id );

    if (res.owner !== Meteor.userId( )) {
      throw new Meteor.Error( 'not-authorized' );
    }

    Resolutions.remove( id );
  },
  updateResolutionCheck: function ( id, checked ) {
    var res = Resolutions.findOne( id );

    if (res.owner !== Meteor.userId( )) {
      throw new Meteor.Error( 'not-authorized' );
    }

    Resolutions.update(id, {
      $set: {
        checked: checked
      }
    });
  },
  setPrivate: function ( id, private ) {
    var res = Resolutions.findOne( id );

    if (res.owner !== Meteor.userId( )) {
      throw new Meteor.Error( 'not-authorized' );
    }
    Resolutions.update(id, {
      $set: {
        private: private
      }
    });
  }
});
```

now in the incognito window (you're not logged in) you will get the following errors

![update delete errors](https://i.imgur.com/t8e2GsM.png)

now we'll hide the remove and checkbox if you are not logged in

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
            </label> {{#if currentUser }}
      <form class="new-resolution">
        <input type="text" name="title" placeholder="a new resolution">
        <input type="submit" value="Submit">
      </form>
      {{/if}}
      <!-- /.new-resolution -->
    </header>
    <ul>
      {{#each resolutions}} {{> resolution}} {{/each}}
    </ul>
    {{> loginButtons }}
  </div>
  <!-- /.container -->

</body>

<template name="resolution">
  <li class="{{#if checked}}checked{{/if}}">
    {{#if isOwner}}
    <input type="checkbox" checked="{{checked}}" class="toggle-checked" />
      <button class="toggle-private">
        {{#if private}}
          Private
        {{else}}
          Public
        {{/if}}
      </button>
    {{/if}}
    <span class="text">{{title}}</span>
    {{#if isOwner}}
      <button class="delete">Remove</button>
    {{/if}}  
    </li>
</template>
```

## deploy

meteor deploy somethign.meteor.com

used to work, ended on march 25th, 2016 :(
  







