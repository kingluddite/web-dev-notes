# Writing to Firebase
`firebase.js`

```js
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDYG7aalHm2evdm0-bqfV_9QJNAmhwtuaI',
  authDomain: 'expensify-ca9db.firebaseapp.com',
  databaseURL: 'https://expensify-ca9db.firebaseio.com',
  projectId: 'expensify-ca9db',
  storageBucket: 'expensify-ca9db.appspot.com',
  messagingSenderId: '447434791238',
};

firebase.initializeApp(config);

firebase
  .database()
  .ref()
  .set({
    name: 'John Wayne',
    age: 22,
    isSingle: false,
    location: {
      city: 'LA',
      country: 'United States',
    },
  });
```

* Run dev server
* `$ yarn run dev-server`
* View localhost:8080
* View Database tab in firebase project
    - You will see this:

![complex firebase](https://i.imgur.com/BNidTUL.png)

* color at beginning
* orange - something was updated
* green - fresh properties added (like age)
* white - no change at all (name)

## Database features
`firebase.database()`

```js
const database = firebase.database();

database.ref().set({
  name: 'John Wayne',
  age: 22,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'United States',
  },
});
```

* This is a little easier to digest

### what is ref()
* Reference
* It gives us a reference to a specific part of our DB
    - mysql has tables
    - mongodb has collections
    - firebase has ability to setup basic references (ref())
* If we don't provide any arguments all properties show up on root of firebase DB

### what is set()
* You do not have to pass a object to set()
* Can take any of the objects we can store inside a DB
* Set will always take new value and overwrite the old value

### override
```js
database.ref().set({
  name: 'John Wayne',
  age: 22,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'United States',
  },
});

database.ref().set('hello data!');
```

This will overwrite our object with the string `hello data!`
## authentication features
`firebase.auth()`

## Look at this
* Watch out
* You might think you are just changing the age but you are overwriting the entire object

```js
database.ref().set({
  name: 'John Wayne',
  age: 22,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'United States',
  },
});

database.ref().set({ age: 27 });
```

**output** age: 27

## So how can I update age without overwriting the entire object?
```
database.ref('age').set(27);
```

### More than one level deep
* Age was top level prop in our DB
* What if I wanted to change city or country?

`database.ref('location/city').set('Colorado');`

## Challenge
* Add attributes object
    - height
    - width

```js
// MORE CODE
// database.ref().set({
  name: 'John Wayne',
  age: 22,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'United States',
  },
});

database.ref('location/city').set('Colorado');
database.ref('attributes').set({
  height: 73,
  weight: 150,
});
```

* All changes we made to firebase DB is asynchronous
* We need to know when the data has changed or failed to change for some reason
* To know when data changed we need to integrate Promises

## Next - ES6 Promises
