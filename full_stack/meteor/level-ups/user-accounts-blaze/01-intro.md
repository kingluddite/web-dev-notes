[meteor topics blaze introduction](https://www.youtube.com/watch?v=T7T9y854uWw&list=PLLnpHn493BHFMTabI7UK28e0e_CwoiYv6)

# Blaze Base
Level ups uses the following repo to give us a nice starting point

## Custom User Accounts
add an unstyled user accounts

packages we added

```
meteortoys:allthings
kadira:flow-router
kadira:blaze-layout

fourseven:scss
fortawesome:fontawesome
standard-minifier-css
standard-minifier-js

accounts-base
accounts-password
useraccounts:unstyled
raix:handlebar-helpers
```
after saving in packages check terminal to make sure they were successfully installed

### start
client/accounts/LoginModal.html

```html
<template name="LoginModal">
  <div class="login-modal">
    <i class="fa fa-close close-login"></i>
    {{> atForm}}
  </div>
  <!-- /.login-modal -->
</template>
```

* atForm - adds a totally unstyled barebones login  

comment out all of `sass/accounts.scss`

add this `client/partials/Header.html`

## make our login a modal

`client/accounts/LoginModal.js`

```js
Template.LoginModal.events({
  'click .close-login': ()=> {
    Session.set('nav-toggle', '');
  }
});
```

`client/partials/MainNav.html`

we are just adding a LI of Login/Sign-up
```html
<template name="MainNav">
    <nav class="main-nav">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li class="login-toggle">Login/Sign-up</li>
        </ul>
    </nav>
</template>
```

add some .scss to style our modal

`sass/accounts.scss`

```scss
@import '_base.scss';

.login-modal {
    position: fixed;
    border: solid 4px $dblue;
    top: 20%;
    left: 50%;
    padding: 20px;
    width: 50%;
    transform: translate3d(25%, -80%, 0) scale(0.5);
    background: #FFF;
    opacity: 0;
    @include trans();
    @include card(4);
    &.open {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
    h3 {
        margin-top: 0;
    }
    .close-login {
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        cursor: pointer;
        font-size: 2em;
        padding: 10px 15px;
        opacity: 0.2;
    }
}

.at-input {
    margin-bottom: 10px;
}
```

this rule set's the opacity to 1

```scss
&.open {
        opacity  : 1;
        transform: translateX(-50%) scale(1);
    }
```

On MainNav.js we set an event that makes a click on `.login-toggle` set a Session variable called `nav-toggle` to open

```js
Template.LoginModal.events({
  'click .close-login': ()=> {
    Session.set('nav-toggle', '');
  }
});
```

and now that will fade in our login modal

and if someone clicks the `x` this event will set the session variable of `nav-toggle` to empty.

```js
Template.LoginModal.events({
  'click .close-login': ()=> {
    Session.set('nav-toggle', '');
  }
});
```

and then we use our helper package handlebar-helpers here:

```html
<template name="LoginModal">
  <div class="login-modal {{$.Session.get 'nav-toggle'}}">
    <i class="fa fa-close close-login"></i>
    {{> atForm}}
  </div>
  <!-- /.login-modal -->
</template>
```

and this checks if the class will be `open` or empty depending on the state of the nav-toggle Session.

We can also use the Meteortoys package to see what the current state of our session is

## create an account

click to register and create an account with
email and password

### we have a problem
when I create an account the modal doesn't disappear

```html
<template name="LoginModal">
  {{#if $not currentUser}}
    <div class="login-modal {{$.Session.get 'nav-toggle'}}">
      <i class="fa fa-close close-login"></i>
      {{> atForm}}
    </div>
  {{/if}}
  <!-- /.login-modal -->
</template>
```

so that if statement will use our handlebar-helpers package to not show the login if the person is logged in

we can add similar logic to also show/hide the Login/Sign-up button

`client/partials/MainNav.html`

```html
<template name="MainNav">
    <nav class="main-nav">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            {{#if currentUser}}
            <li class="logout">Logout</li>
            {{else}}
            <li class="login-toggle">Login/Sign-up</li>
            {{/if}}
        </ul>
    </nav>
</template>
```

and we need to add our event

`client/partials/MainNav.js`

```js
Template.MainNav.events({
  'click .login-toggle': ()=> {
    Session.set('nav-toggle', 'open');
  },

  'click .logout': ()=> {
    // Meteor method to logout
    Meteor.logout();
  }
});
```

Now we can use Meteor.logout() method to log the user out when they click the logout button

