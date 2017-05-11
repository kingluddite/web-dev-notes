# New User Validation
* Using Simpl Schema with our Meteor app
* We need to validate our user object just before it is created
* We will do this on the Server
* Meteor provides a `hook` (_a method we can call_)
    - We give that hook a **callback** and that method calls our **callback** every time someone tries to make a new account
    - And that's where we will perform our validation
* This method we need to call in order to attach our **callback** function is available on the `Accounts` object
    - Yes, this is the same Accounts object we used in `Signup`

### Import Accounts
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base'; // add this line
```

### Disable built-in validation
![email validation](https://i.imgur.com/i9nwYDK.png)

* We want to turn this off
* It may work on some browsers but we want to take over this and use our own validation

#### If we were using HTML
Just add this:

`<form onSubmit={this.onSubmit.bind(this)} novalidate>`

But in our JSX we use this instead

##### Add it to `Signup` form

`<form onSubmit={this.onSubmit.bind(this)} noValidate>`

##### Add it to `Login` form

`<form onSubmit={this.onSubmit.bind(this)} noValidate>`

##### Test it out
You'll know longer see the built-in validation on those two forms

## Our `user` object
Let's dissect the structure of it

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.validateNewUser((user) => {
    console.log('this is the user', user);
    return true;
  });
});
```

## Create a new user
* Go to sign up page
* Enter `joe` for **email** and `123` for **password**
* We get no errors even if we entered a bad email. This is bad!
* View the Terminal and you'll see our server shows us the user object

![user object](https://i.imgur.com/33rUoZW.png)

### Fields we have access to in a meteor user
Meteor creates these fields for us:

* `createdAt`
* `_id`
* `services`
    - Stores our **hashed password**
    - We never get the pure `password` on the **server**
    - This will be a problem when it comes to storing the `password` **length**
    - You will see an `emails` **array** with your `email` and verified
        + We need to get the **email** out of this object and pass it into Simpl Schema `user.emails[0].address`
* `emails`

### Add our schema

```
// more code

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    const userSchema = new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    });

    userSchema.validate({
      email: email
    });
    
    return true;
  });
});
```

### Refactor
We can combine two steps into one and use **object short code**

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({
      email
    });

    return true;
  });
});
```

### Test with a Bad Email
* Either way you should see an unfriendly `Internal server error` message when you try to enter a bogus **email** when trying to create a user account
* And on the server we see the same error

![server email error](https://i.imgur.com/fQGJCRg.png)

* There are generic errors and there are **Meteor** errors
* We need our app to throw a **Meteor-based error**

## Try catch block
Great way to debug and deal with errors

### Let's view a generic error
```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({
      email
    });

    return true;
  });

  try {
    throw new Error('Some message here');
  } catch(e) {
    console.log(e);
  }
});
```

## Server Error
You will see on the **server** `[Error: Some message here]`

### Now we want to throw a Meteor error
`throw new Meteor.Error(SOME SORT OF CODE, REASON IT WAS INVALID)`

* Now we get a real **Meteor error**
    - We saw this before in a previous exercise
    - And we saw the Meteor error in the console

![real Meteor error](https://i.imgur.com/Csgv6pw.png)

That is the kind of error we want to throw in **Meteor**

### Wrap our schema in a `try/catch` block
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup

  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    try {
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email
        }
      }).validate({
        email
      });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    return true;
  });

});
```

### e.message
We are just taking the message that was thrown with the generic error and we are passing it through a **Meteor** error allow the correct message to show up inside the browser

### Test
It should now make sure our email is valid and alert us with the proper error if it is not

### Houston We Have A Problem!
* Time to validate the password
* It is a **hashed password** and this is a problem
* This is a hash - Not encryption
* We do not have a way to get back the **plain text value**

#### Possible Solution?
Why don't we just send the password length from the client to the server and we can validate that integer in `server/main.js`?

* The problem with that is it still leaves room for the client to send false data across [`the wire`](https://en.wikipedia.org/wiki/Wire_data)

Our solution will be to add a little validation in `onSubmit` of **Signup**

`Signup`

```
// more code
onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    if (password.length < 9 ) {
      return this.setState({ error: 'Password must be more than 8 characters long.'});
    }
// more code
```

* Test with entering a **password** `less than 8 characters` and you will see that error
* Now we can make sure we have a `valid email and password` before we write to the database

### Next Up - Refactor our Router code
All of it is sitting in `client/main.js` which is a bad idea


