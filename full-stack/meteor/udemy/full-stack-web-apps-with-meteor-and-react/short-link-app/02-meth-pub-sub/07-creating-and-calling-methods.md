# Creating and Calling Methods
* `Publications` and `Subscriptions` allow us to securely fetch data
* Meteor Methods will allow us to securely create, update and delete Documents

## Meteor Methods
* More involved that `Publications` and `Subscriptions`
    - Have to validate arguments
    - Throw errors
    - Make Database requests

`links.js`

* Not inside our `isServer` conditional (_we also aren't adding it inside an `isClient` conditional_)
    - Why?
    - Because our **Meteor Methods** should be defines on both our `server` and the `client` and this is so that we can securely run these Database changes on the `server` but it also enables us to simulate those changes on the `client` so we can render things to the screen as quickly as possible

### Meteor.methods()

`links.js`

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

Meteor.methods({
  greetUser: function() {
    console.log(this.userId);
  }
});
```

* We are just experimenting with **Meteor Methods** to see how they work
* Call this **Meteor Method** from `LinksList`

### Meteor.call()
We use this to call our **Meteor Method** (_and we pass it the exact name of our Meteor Method_)

#### Meteor.call() syntax
`Meteor.call('METHOD_NAME_AS_STRING', CALLBACK_FUNCTION)`

#### Call from the server
We will first start working in `server/main.js`

* `Meteor.call()` first argument -> METHOD_NAME_AS_STRING
    - This is the only way **Meteor** knows what method to run so make sure it is spelled correctly
* `Meteor.call()` second argument -> callback function
    - Will allow us to do stuff depending on whether or not `greetUser` succeeds or fails
    - If it `fails` it will throw an error and we want to do something with that error
    - If it `succeeds` and we get a valid result we want to do something with that result
        + In this example we'll always succeed because we always return a string
        + But if we had validation in our method, there would be chance for a failure/error
        + To add the function we just provide an arrow function

```
`Meteor.call('greetUser', () => {

});
```

* We provide the callback function two arguments

```
Meteor.startup(() => {
  Meteor.call('greetUser', (err, res) => {

  });
});
```

1. `err` - The **error**
2. `res` - The **result**

* If there is an error, `err` will be populated and `res` won't be populated
* If all is well `err` will be empty and the `res` (result) (aka - the return result of the method is stored in `res`)

`server/main.js`

```
import { Meteor } from 'meteor/meteor';

import './../imports/api/users';
import './../imports/api/links';

Meteor.startup(() => {
  Meteor.call('greetUser', (err, res) => {
    console.log('Greet User Arguments', err, res);
  });
});
```

* We see in the server Terminal:

![testing Meteor Method](https://i.imgur.com/TYAHteZ.png)

* We see `greetUser is running`
    - Which means our method code is indeed running on the server
    - We see `err` is **undefined** (we expected that as we're just returning a string which will never be an error)
    - And we see `req` which is the **result** (the return value from our method) and that will be the string we returned `Hello user`

**note** Meteor Methods can be called from the `Server` or from the `Client`

This is a very important distinction becuase this is unlike most other frameworks you use

To test if Meteor Methods work on the `Client` also we will cut them from `server/main.js` and paste into `client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Meteor.call('greetUser', (err, res) => {
    console.log('Greet User Arguments', err, res);
  });
  ReactDOM.render(routes, document.getElementById('app'));
});
```

* If you check the `Server` Terminal you'll see `greetUser is running`
    - This lets us know that our **Client-side** method calls are pretty much remote procecure calls (_translation: - it tells some other computer to run some sort of method_)
        + In our case the client is telling the server to go ahead and run `greetUser` and that is why we are seeing the log on in the Server Terminal (_and this is how methods can be secure_)
* Check out the browser (_Client_) console

![client method call](https://i.imgur.com/tCkYw4i.png)

* We see `greetUser is running` so the **Meteor** method is running on the `client` and the `server` and `greetUser()` also gets executed on the `client` and the `server`. This lets us quickly simulate changes to the Database having things rendered to the screen before the `Server` actually responds
* We see we have no errors `err` and our `res` (_result_) returned is `Hello user` which is just our simple string

# Common Pattern that we'll be using
We'll be defining a method on the `server` and the `client` and we'll be calling that method from a `Client` (_but won't usually be inside `Meteor.startup()` call - usually it will be inside of one of our Components in some sort of **event listener** (i.e. click event listener or form event listener)_)

## Meteor Methods can take arguments
If they didn't they would be pretty useless

`Meteor.call('METHOD_NAME', ARGUMENTS, CALLBACK)`

### Example
I want to pass in the name `Joe` to my `Meteor.call()` method

```
Meteor.call('greetUser', 'Joe', (err, res) => {
 console.log('Greet User Arguments', err, res);
});
```

Now that we have that **argument** we just have to add that into our Meteor Method and do something with it:

```
Meteor.methods({
  greetUser(name = 'User') {
    console.log('greetUser is running');

    return `Hello ${name}`;
  }
});
```

* Now we'll see `Greet User Arguments undefined Hello Joe` on the **Client** and `greetUser is running` on the **Server** and the **Client**
* If we didn't pass a name argument, we would then see the default value of `User` used instead `Greet User Arguments undefined Hello User`
* Now we have a method that takes in dynamic information from the **client**, runs it on the **client** and the **server** and ends up with some sort of **result**

### What happens with the client side method call?
Is this data from the **server** side method call or from the client side method call?

* If we look at this from our client console `Greet User Arguments undefined Hello Joe`, this data is from the **server** side method call
* Your function that you pass into `Meteor.call()`

![highlighted code](https://i.imgur.com/ymnHLJc.png)

The highlighted code only gets called with the **server** responds (_whether it responds with an error or the data (`err` or `res`)_). This code will never be called by the **client**. The **client** side method, when it gets execute is only to simulate changes to the Database and currently our method doens't do anything like that so we will ignore this feature

* So now it is like our methods are never getting executed on the **client**. But as we start to create real world methods (_in a little bit_) we will change this and make our code more secure

## What is the whole pupose of a method?
To make sure that whatever gets inserted into the real MongoDB Database is inserted in some sort of secure way

This means:

* The user has access to do that action
* Or the data is valid
    - If the data is not valid we can throw an error from the method and this will cause the error to show up in our `Client` console

## Method Errors - And how to handle them
`links.js`

```
// more code
Meteor.methods({
  greetUser(name) {
    console.log('greetUser is running');

    if (!name) {
      throw new Meteor.Error('invalid-arguments', 'Name is required');
    }

    return `Hello ${name}`;
  }
});
```

* We remove the default value for name
* We update the `client/main.js` **Meteor.call()** and remove passing the 'Joe' name argument

```
// more code
Meteor.startup(() => {
  Meteor.call('greetUser', (err, res) => {
    console.log('Greet User Arguments', err, res);
  });
  ReactDOM.render(routes, document.getElementById('app'));
});
```

**note** The method gets called on the method and the server and it throws an error on both the `client` and the `server`

* We'll see on `client` console
    - `greetUser is running`
    - We have the [stack trace](https://i.imgur.com/3HumJRI.png) for when the `client` executes our method
        + The stack trace for the most part is not useful

We then see this:

![error](https://i.imgur.com/KNs5737.png)

* We `Greet User Arguments` printing to the screen
* The first argument is now defined `err` and the second argument id **undefined** `res` and that is because we have an error
* The errors are the same but the first one comes from the Client (when the client tried to simulate that method call) and the second one comes from the server (we know that because it is in our **callback** function)

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

Meteor.methods({
  greetUser() {
    console.log('greetUser is running');

    return 'Hello user';
  }
});
```

`LinksList`

```
componentDidMount() {
    Meteor.call('greetUser');
    
    console.log('componentsDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find().fetch();

      this.setState({
        links
      });
    });
  }
```

* You will see that we see in the `console` the userId of the currently logged in user (_which is what our simple Meteor Method is doing_)

## ES5 function for `this.userId`
* Just as before we use ES5 so that we have `this` bound to the function and we can access `this.userId` which gives us the `id` of the currently logged in user
* This is similar to what we did with our **Publication**

```
Meteor.methods({
  greetUser: function() {
    console.log(this.userId);
  }
});
```

### ES6 object method syntax
* We can make our Meteor Method look more compact by:
    - Removing the `function` keyword
    - Removing the `:` (_colon_)

```
Meteor.methods({
  greetUser() {
    console.log(this.userId);
  }
});
```

* After the code modification we still have access to the logged in user `id` which is what we want
* Even though we are using ES6 syntax, the above code snippet is still using the function keyword behind the scenes and that is how we have access to `this` because it is bound to the function (_even though we are using ES6 object syntax we are still using ES5 function behind the scenes_)

This was a fundamental look at:

* How methods work
* How we define them
* How we call them

## Exercise
* Define a method
    - It will be called `addNumbers()`
    - `addNumbers()` will take two numbers as arguments

**hint:** We called `greetUser` before and passed 'Joe'. This time we won't be passing one string argument, we'll be passing two number arguments

* in `links.js`
    - Write some validation code
    - Make sure the type of both of those arguments is a number (hint: JavaScript has a `typeof` )

**hint** - `if (typeof === 'number')` - use `typeof` on **number**, **object**, *array*, **string** or **boolean** and you get the type back (_as a string_)
if one or both are not numbers, throw an **error** (_using `Meteor.Error()` to throw a new error, make up your own values for the Error code and the reason message_)

* Call method with 2 numbers (_good data_)
* Call it with some bad data (_to see if your error is working properly_)
* Make a new method call and don't replace the other one
* Use `typeof` on both numbers, if they are valid numbers, return their sum
* Make sure two arguments are provided

<details>
  <summary>Solution</summary>
`links.js`

```
Meteor.methods({
  greetUser(name = 'User') {
    console.log('greetUser is running');

    if (!name) {
      throw new Meteor.Error('invalid-arguments', 'Name is required');
    }

    return `Hello ${name}`;
  },

  addNumbers(num1, num2) {
    console.log('addNumbers is running too!');

    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Meteor.Error('invalid-arguments', 'You must provide two valid numbers');
    }

    return num1 + num2;
  }

});
```

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Meteor.call('greetUser', 'Joe', (err, res) => {
    console.log('Greet User Arguments', err, res);
  });

  Meteor.call('addNumbers', 25, 75, (err, res) => {
    console.log('Add Numbers Arguments', err, res);
  });

  ReactDOM.render(routes, document.getElementById('app'));
});

```
</details>

## Next
We will create a real method that updates the Database and this will reveal the value of running the code on both the client and the server
