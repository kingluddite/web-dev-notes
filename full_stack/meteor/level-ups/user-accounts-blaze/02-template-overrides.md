## Template Overides

[videos level up](https://www.youtube.com/watch?v=X6EodWQBDG8&list=PLLnpHn493BHFMTabI7UK28e0e_CwoiYv6&index=3)

customize `atForm`

overriding templates

add this package
aldeed:template-extension

[the meteor guide](https://guide.meteor.com/accounts.html)

[users and accounts](https://guide.meteor.com/accounts.html)

[customizing templates](https://guide.meteor.com/accounts.html#useraccounts-customizing-templates)

gives you every single template we have access to [here on github](https://github.com/meteor-useraccounts/unstyled/tree/master/lib)

you go online to the meteor guide and open the github with all the user account templates

find the one you want (in this example, we use the atPwdFormBtn template)

`client/accounts/override-atPwdFormBtn.html`

```html
<template name="override-atPwdFormBtn">
  <button type="submit" class="at-btn submit {{submitDisabled}} btn-primary" id="at-btn">
    {{buttonText}}
  </button>
</template>
```

we just add the class we want to use `btn-primary`. this is inside `styles.scss`

`client/accounts/override-atPwdFormBtn.js`

```js
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
```

**note** the [at_form template](https://github.com/meteor-useraccounts/unstyled/blob/master/lib/at_form.html) shows you all the stuff you have access to

## Custom Inputs & validation
[link to video](https://www.youtube.com/watch?v=ohB0nsm6DEE&index=4&list=PLLnpHn493BHFMTabI7UK28e0e_CwoiYv6)

meteor guide - [further customization](https://guide.meteor.com/accounts.html#useraccounts-further-customization)

[link to meteor-useraccounts core](https://www.youtube.com/watch?v=ohB0nsm6DEE&index=4&list=PLLnpHn493BHFMTabI7UK28e0e_CwoiYv6)

After reviewing the documentation you can add a select dropdown with code like this:

```js
AccountsTemplates.addFields([
  {
    _id: 'firstName',
    type: 'text',
    displayName: 'First Name',
    placeholder: 'First Name',
    required: true,
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: '1 lowercase and 1 uppercase letter required'
  },
  {
    _id: 'lastName',
    type: 'text',
    displayName: 'Last Name',
    placeholder: 'Last Name',
    required: true,
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: '1 lowercase and 1 uppercase letter required'
  },
  {
    _id: 'phone',
    type: 'text',
    displayName: 'Phone',
    placeholder: 'Phone',
    required: true,
  },
  {
    _id: 'rosterType',
    type: 'select',
    displayName: 'Roster Type',
    select: [
      {
        text: 'Game-By-Game',
        value: 'game-by-game'
      },
      {
        text: 'Full Season',
        value: 'full-season'
      },
      {
        text: 'Other',
        value: 'other'
      }
    ]
  }
]);
```

## Form Configuration & Form Action Hooks

[form field configuration](https://github.com/meteor-useraccounts/core/blob/master/Guide.md#form-fields-configuration)

`Meteor.logout()` vs `AccountsTemplates.logout()`

They do the same thing but the second one is what you would use if you were custom coding your Accounts template

add a hook on logout

`client/partials/MainNav.js`

```js
Template.MainNav.events({
  'click .login-toggle': ()=> {
    Session.set('nav-toggle', 'open');
  },

  'click .logout': ()=> {
    // Meteor method to logout
    // Meteor.logout();
    AccountsTemplates.logout();
  }
});
```

`client/accounts/Accounts.js`

```js
var myLogoutFunc = function() {
  /*console.log('hello');*/
  Flow
}

AccountsTemplates.configure({
  confirmPassword: false,
  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',
  onLogoutHook: myLogoutFunc
});
```

that will just show a console.log() when you log out but let's say we are on the dashboard page and we click logout, this code will reroute us to the home page

`client/accounts/Accounts.js`

```js
var myLogoutFunc = function() {
  FlowRouter.go('/');
}

AccountsTemplates.configure({
  confirmPassword: false,
  // Privacy Policy and Terms of Use
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',
  onLogoutHook: myLogoutFunc
});
```

here we also need to set our nav-toggle session variable to empty when we logout:

```js
var myLogoutFunc = function() {
  Session.set('nav-toggle', '');
  FlowRouter.go('/');
}
```

we have lots of hooks to choose from

**onLogoutHook** Called on AccountsTemplates.logout invocation: allows for custom redirects or whatever custom action to be taken on user logout.
**onSubmitHook**	Called when the pwdForm is being submitted: allows for custom actions to be taken on form submission. error contains possible errors occurred during the submission process, state specifies the atForm internal state from which the submission was triggered. A nice use case might be closing the modal or side-menu showing atForm
**preSignUpHook**	Called just before submitting the pwdForm for sign-up: allows for custom actions on the data being submitted. A nice use could be extending the user profile object accessing info.profile. to be taken on form submission. The plain text password is also provided for any reasonable use.
**postSignUpHook**

### postSignUpHook
this sends the user object after they sign up
needs to be done on the server

`server/Accounts.js`

```js
var postSignUp = function(userId, info) {
  console.log(userId);
  console.log(info);  
}

AccountsTemplates.configure({
  postSignUpHook: postSignUp
});
```

will output all the user info server side when they sign up

## Set roles in Meteor

[great meteor package](https://github.com/alanning/meteor-roles)

add this package to meteor

`alanning:roles`
verify on command line that it was properly installed

http://alanning.github.io/meteor-roles/classes/Roles.html

[addUsersToRoles](http://alanning.github.io/meteor-roles/classes/Roles.html#method_addUsersToRoles)

`server/Accounts.js`

```js
var postSignUp = function(userId, info) {
  console.log(userId);
  console.log(info.profile.rosterType);
  Roles.addUsersToRoles(userId, ['player', info.profile.rosterType]);
}

AccountsTemplates.configure({
  postSignUpHook: postSignUp
});
```

meteortoys shows us:

```js
{
  "_id": "DXBdQCFiNoed7vLPj",
  "roles": [
    "player",
    "full-season"
  ],
  "emails": [
    {
      "address": "bob@me.com",
      "verified": false
    }
  ],
  "profile": {
    "firstName": "Bob",
    "lastName": "Lee",
    "phone": "111222333",
    "rosterType": "full-season"
  }
}
```

limit functionality within these roles

### userIsInRole

[userIsInRole documentation](http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole)

`Roles.userIsInRole(user, 'admin')`

## UIHelpers

isInRole

[isInRole documentation](http://alanning.github.io/meteor-roles/classes/UIHelpers.html#method_isInRole)

We can add a helper to our Dashboard that checks if a user is a specific type of roles

`client/pages/Dashboard.js`

```js
Template.Dashboard.helpers({
  admin: function() {
    return Roles.userIsInRole(Meteor.userId(), 'admin');
  }
});
```

`client/pages/Dashboard.html`

```html
<template name="Dashboard">
    {{#if admin}}
    <h1 class="page-title">Dashboard</h1>
    {{else}}
    <h1>Not Authorized</h1>
    {{/if}}
</template>
```

will only show a user if admin is `true`

#### UI helper `isInRole`
but there is a UI helper that makes this even easier

```html
<template name="Dashboard">
    {{#if isInRole 'admin'}}
    <h1 class="page-title">Dashboard</h1>
    {{else}}
    <h1>Not Authorized</h1>
    {{/if}}
</template>
```

Now if we do not have a role of `admin` we will get `Not Authorized` but we still see the sidebar. We could hide that too with:

```html
<template name="AppLayout">
    {{> Header}}
    {{#if isInRole 'admin'}}
      {{> AppNav}}
    {{/if}}
    <main class="app-layout">
        {{> Template.dynamic template=main}}
    </main>
</template>
```

Now you can go into meteortoys and manually change the useraccount to have a role of `admin` and then you will see everything.

users collection

```js
{
  "_id": "DXBdQCFiNoed7vLPj",
  "emails": [
    {
      "address": "bob@me.com",
      "verified": false
    }
  ],
  "profile": {
    "firstName": "Bob",
    "lastName": "Lee",
    "phone": "111222333",
    "rosterType": "full-season"
  },
  "roles": [
    "player",
    "full-season",
    "admin"
  ]
}
```

## User Management Dashboard

because we removed autopublish, nothing is published unless we say so.

`server/publish.js`

```js
Meteor.publish('allUsers', function() {
    return Meteor.users.find({});
});
```

And we subscribe to it on the client with:

`client/pages/Users.js`

```js
Template.Users.onCreated(function() {
    this.autorun(() => {
      this.subscribe('allUsers');
    });
});
```

we use ES6 arrow function to bind the `this`. If we didn't we would have to do something like:

```js
Template.Users.onCreated(function() {
    var that = this;
    that.autorun(() => {
      that.subscribe('allUsers');
    });
});
```

this will publish all users. The bad thing about this is everyone can see all your users and all their data. Not good.

```js
Meteor.publish('allUsers', function() {
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({});
  }
});
```

we can't access Meteor.user() in publish() so we use `this.userId`

so now we only see all the users if we are logged in with a role of 'admin'

