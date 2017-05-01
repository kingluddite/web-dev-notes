# Creating User Accounts
* An account system is built into **Meteor**
* We can use simple functions to build authentication
* We'll call one **Meteor Method** passing in the email and password and it will do everything for us
    - It will [hash that password](https://www.wired.com/2016/06/hacker-lexicon-password-hashing/)
    - It will communicate back and forth with the server
    - It will store the user in a new users Collection, which we don't have to manage
    - It will manage the [authentication token](https://stormpath.com/blog/token-authentication-scalable-user-mgmt) making sure to send a **token** from the `server` to the `client` so the `client` is automatically logged in the next time they visit the Application

In other frameworks you used to have to write and manage all of that stuff and when using **Meteor** it is managed by **Meteor**

* We can focus on core functionality
* We save time because be don't have to write a brand new authentication system every time we create a **Meteor** Application

## Still need to install the package
It is built into **Meteor** but the package doesn't come installed by default

## Enable password-based authentication
`$ meteor add accounts-password`

* This will enable password-based `sign ups` and `logins`
* It will also add a dependency `accounts-base` which is necessary for having things like our user Collection and various methods that enable us to check if someone is authenticated

### You may see this error
![error](https://i.imgur.com/jtsxbQ2.png)

* What it is saying is that we are using a JavaScript implementation of the **bcrypt** algorithm (_that is a hashing algorithm that secures your password_) and this will work but it is slower than a native implementation
* You could run that command to switch but it is recommended to keep a pure JavaScript version as it tends to be more stable in cross-operating environments

**note** Even though we install `accounts-password` we never import it

* This package installs dependencies and makes changes to some of those modules adding new password related functionality

### accounts-base
We will be importing `accounts-base`. This is a method where signing up for a new user lives

### [Meteor Documentation](http://docs.meteor.com/#/full/)
![accounts](https://i.imgur.com/abZtUKh.png)

* [Accounts](http://docs.meteor.com/api/accounts.html)
* [Accounts (multi-server)](http://docs.meteor.com/api/accounts-multi.html)
* [Passwords](http://docs.meteor.com/api/passwords.html)

#### [Accounts.createUser()](http://docs.meteor.com/api/passwords.html#Accounts-createUser)

**note** Click in documentation to link to exact code used to create this method located on Github

Let's start coding!

##### import accounts-base

`Signup.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base'; add this line
// more code
```

**note** In the beginning we will ignore all password validation (_if email is an email, email length_)

* We'll comment out our call to `setState()`

* `createUser(object, callback function)`
    - The **object** takes and **email** and **password** key with their respective values
    - The **callback** gets called when there are any errors if no errors it gets called with no arguments and we can use that to determine whether or not we should set the `state`

```
onSubmit(e) {
    e.preventDefault();

    Accounts.createUser({email: '', password: ''}, (err) => {
        
    });

    // this.setState({
    //   error: 'Oops. You broke something.'
    // });
  }
```

### How do we grab the values in our login form?
We could use what we used before `e.target.email.value`

```
onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value; // we could use this line
    Accounts.createUser({email: '', password: ''}, (err) => {
        
    });

    // this.setState({
    //   error: 'Oops. You broke something.'
    // });
  }
```

Or we could grab those values using the **React** way to target a specific element

We are in a form and using `e.target.email.value` is perfectly valid but what if we are outside a form like we want to get the value inside an `H1` element. We want a way to do that without having to write a DOM selector

### Refs
Short for **references**

* It is a way to give a name to an element and access that element inside of the JavaScript up above
* This is built-in to React and it is called `refs`

#### Adding Refs
`Signup.js`

```
// more code
<form onSubmit={this.onSubmit.bind(this)}>
  <input type="email" ref="email" name="email" placeholder="Email" />
  <input type="password" ref="password" name="password" placeholder="Password"/>
  <button type="submit">Create Account</button>
</form>
// more code
```

### Targeting ref values
`Signup.js`

```
onSubmit(e) {
    e.preventDefault();
    
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Accounts.createUser({email: '', password: ''}, (err) => {

    });

    // this.setState({
    //   error: 'Oops. You broke something.'
    // });
  }
```

### Plugging in variables
```
Accounts.createUser({email: email, password: password}, (err) => {

    });
```

With ES6 this can be shortened (_using ES6 Property Shorthand_) to:

```
Accounts.createUser({email, password}, (err) => {

});
```

## Add a log to test what is happening
```
Accounts.createUser({email: email, password: password}, (err) => {
       console.log('Signup callback', err);
    });
```

### Testing in browser
* Use the `Meteor dev tools` in Chrome and select the **DDP tab**
* This will give us a good idea of what the `createUser()` method is doing

**note** 

* `createUser()` will create a user and automatically sign them in with the new account
    - This is great!
    - You sign up on the form and then you go right into the app
            1. There is no need to signup
            2. And then go back to the login screen
            3. And then type the same login information again (_which is a bad user experience_)

#### Enter a valid email and password

* There is no re-direct
* Open the first DDP item

### Our first DDP
![first DDP](https://i.imgur.com/p777V9Y.png)

* You will see [salted and hashed password](https://crackstation.net/hashing-security.htm) 
* Which means we are never revealing the plain text password
* Which is important for good security

### Our next DDP - response
The next DDP item is a response letting us know the user was added to the Collection and we have the id of that user

![user added](https://i.imgur.com/iw1sM42.png)

### Our next DDP
Next we see an item was changed and we can see our brand new email

![item changed](https://i.imgur.com/0YKWEA0.png)

### Next DDP - subscriptions
The next item talks about **subscriptions** which we haven't dealt with yet so we'll ignore it

### Next DDP - result
* Finally we get the `result`
* Lets us know all is great and we get back some user information like **tokens** (_our authentication token_)
* And we have info when that **token** expires

![token info](https://i.imgur.com/cmBBW6e.png)

### We now just took a peek at what Meteor is doing behind the scenes
We are logged in right now but we just don't know it because we haven't wired that up but we can prove we are logged in

#### Playing around with Meteor Methods
They are available on the Meteor object

But first we need to talk about the **require function** and the **import statement**

## Require is the old way
* `require` was the precursor to the `import` statement
* `require` was popularized by **node** and `import` is part of **ES6**
* Both were designed to load in files and **npm** module
* If you know `node`, you know `require`

![require vs import](https://i.imgur.com/Qd32PwB.png)

With `import` we can load in **defaults** or **named exports** but with `require` we **load in a file** and it <u>returns an object</u> with everything inside it

**note** We will use import in our code but we will use require in the console

### Let's use the console to test this out
`> require('meteor/meteor')`

`Object {Meteor: Object, global: Window, meteorEnv: Object}`

You'll see the uppercase `Meteor` object which we have used

### userId()
We can get the `userId` with:

`> require('meteor/meteor').Meteor.userId()`

Will return our string `id` (_something like "C3EeHuFS55Wz32Mrp"_)

**Rule** 

* When there is a `userId` we are logged in
* When there is not a `userId`, we are not logged in

### Login Check
1. So if a user visits our app and they have an `id` we can redirect them to a private page
2. If no `id` we'll leave them on the login page, forcing them log in

### user()
Will return the user object with more info about the user

![user()](https://i.imgur.com/NkeVDI5.png)

#### Notice we don't see a password
We don't need to pass that back and forth between the client and the server, for obvious security reasons

### Logging out
Let's see what values we get when we are logged out

Log out is available via `import { Accounts } from 'meteor/accounts-base';`

#### Type this in the console

`> require('meteor/accounts-base').Accounts`

This gives us everything we have access to in Accounts:

![all Accounts stuff](https://i.imgur.com/MGZ8AEA.png)

### Let's Log out

`> require('meteor/accounts-base').Accounts.logout()`

* Now `> require('meteor/meteor').Meteor.userId()` returns **null**
* Which lets us know there is no logged in user
* And `> require('meteor/meteor').Meteor.user()` also returns **null**

## Server side
We did have a user created in MongoDB on the server

`$ meteor mongo` (in a separate tab)

### The `users` Collection
* We did not create the `users` collection nor will we directly manage it
* Meteor created it and will maintain it for us
* All the updates and deletions happen behind the scenes
* We just call the methods provided and Meteor takes care of that stuff for us

`> db.users.find()`

You can see the user that was created




