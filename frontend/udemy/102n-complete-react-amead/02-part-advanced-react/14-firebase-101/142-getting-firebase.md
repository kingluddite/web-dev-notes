# Getting Firebase
* [URL to firebase](https://firebase.google.com)

## How do I sign up with Firebase?
1. Sign in with existing google account
2. Create a new google account

## I have a google account that I will use
* Since I am logged into gmail, I am already logged into Firebase

### Click `Go to console`

### How to add a new firebase project?
1. Click `Add Project`
2. Name the Project
3. Add Google Analytics if you want (choose settings you wish for it)
4. Click Create Project
5. Watch the GUI showing you it is updating project
6. Click Continue to move to the Dashboard

## What are we using Firebase for?
* It has a ton of features
* We only care about 2

1. Realtime Database
2. Authentication System

### Our Focus
* We will focus on the Database for Web and Authentication for web which you can see in the sidebar
* If we can integrate both of these we will have a completely production ready expensify app

## What is Firebase?
* At its core Firebase the Firebase Database is a NoSQL Database that resembles an object
  - A JavaScript object
    + We have various key/value pairs where the data is stored
    + The key is a string and the value is something like:
      * String
      * Number
      * Boolean
      * Array
      * Another Object
    + This will enable us to easily structure our data

### What is Firestore
* Firestore is definitely the improved version of Firebase so you'll want to use that in your future projects
  - However, they share pretty much all the same concepts so once you know Firebase, it's quite trivial to learn Firestore

## Other stuff Firebase has
* Hosting
* Functions
* Test Lab
* Crash Reporting
* We also won't be using any mobile integrations

## Click on the `Database` tab in the sidebar
* We will create a real time database
* **IMPORTANT!** DO NOT Click `Create database` button

1. Instead, scroll down to the `Or choose Realtime Database` section and click `Create database`
2. Click `Start in test mode` radio button (_Get set up quickly by allowing all reads and writes to your Database_)
3. Click `Enable` button

## What the heck is this?
![blank real time Database](https://i.imgur.com/KjyXKek.png)

### This is your Database
* It is an empty real time Firebase Database
* We will be able to view all our data from inside this Object
* The name of our Database is the name we gave it plus a randomly generated string `id` appended
* You will also see the same Database `id` in the URL

![url in browser](https://i.imgur.com/qPN9JxN.png)

* Click on the `Rules` tab

### What are Rules for?
* They establish who can read and write to the Database
* This is an extremely IMPORTANT part of locking down your data
* In a production app we will lock down those rules
* But for now we will remove all security from our Database
  - We do this to easily cover the basics of Firebase without adding the confusing and complex topic of Authentication at the same time

#### Current Rules
```
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

* We will set read and write to `true`

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

* Click `Publish`
* You will get a warning: `Your security rules are defined as public, so anyone can steal, modify, or delete data in your database`

![warning from firebase with all access on](https://i.imgur.com/58oq72j.png)

* Ignore that warning as we want our Database to be public to the world (for the time being but we will lock it down later)

## Add firebase to your website
1. Go back to home page (click home icon in sidebar)
2. Click on this icon

![web icon](https://i.imgur.com/jOkrsp4.png)

3. Register the app by naming it
4. Add Firebase SDK
5. The code they give uses a script tag to access firebase but we can also use npm to install it
6. Copy the code or install firebase with `$ npm i firebase`

## Let's work with Firebase on it's own
* Create a folder that holds you simple app
* Inside just create a file named `my-app.html`
* Paste the code from Firebase before the closing `</body>` but make sure this code comes before you use any Firebase services

## Our app
* Let's install firebase

`$ npm i firebase`

### Create a folder to hold our firebase configuration settings
* This is where we'll connect to the firebase Database

`src/firebase/firebase.js`

```
import * as firebase from 'firebase';
```

* Above is some new code we haven't seen yet
  - It takes all the `named exports` from Firebase and **aliases** them to a variable called `firebase`
  - This is **required** because `Firebase` doesn't have a default export where we could use this:

```
import firebase from 'firebase'
```

* It would be nice to be able to use the above syntax but it is not how Firebase is set up
* So when we use this:


```
import * as firebase from 'firebase';
```

* We take all of those `named exports` and we create a new variable for them
* **note** We could do this with our own files as well

`src/actions/expenses.js`

* I could set up an import statement to grab all the exports and dump them onto some object
  - It would look like this:

`src/firebase/firebase.js`

```
import * as firebase from 'firebase';
import * as expensesActions from '../actions/expenses';

// then I could use the functions like this
expensesActions.addExpense();
```

* We can remove the expensesActions import as we won't use it in this app but now we know a new technique
* We need to use it like this because Firebase recommends doing it like this and code examples out there are using it too

## Let's test to make sure firebase is working
`src/firebase/firebase.js`

```
import * as firebase from 'firebase';

// copy and paste this info from your real time firebase on firebase
var firebaseConfig = {
    apiKey: "xIzaSyDUpPr5pG87V3PRpsX2VF-7QOTDsA77sv4",
    authDomain: "expensify-4fd55.firebaseapp.com",
    databaseURL: "https://expensify-4fd55.firebaseio.com",
    projectId: "expensify-4fd55",
    storageBucket: "expensify-4fd55.appspot.com",
    messagingSenderId: "369625927386",
    appId: "1:369625827386:web:2558d708af1aeeae958d03",
    measurementId: "G-GB5GZ9SYXA"
};

// this will give us a valid connection to the Firebase Database
firebase.initializeApp(firebaseConfig);

// Let's test our connection
firebase.database().ref().set({
  name: 'John Doe'
})
```

* firebase.database() - gives us access to all the Firebase Database features

### We need to get a reference to our Database
* We can get a reference to the area where we store:
  - expenses
  - todos
  - notes
  - journal entries
  - whatever our app needs to store
  - if we just call `.ref()` we get a reference to the root of our database

`firebase.database().ref()`

### How can we provide the data we want to set?
`firebase.database().ref().set()`

* We pass an object to set() and provide the various key/value pairs

## Why is our firebase test code not working?
* The firebase file currently never gets imported by our application so it will never run
* We'll just import it to `app.js` 

`app.js`

```
// MORE CODE

// temp import firbase for testing
import './firebase/firebase';

const store = configureStore();

// MORE CODE
```

* Now firebase is imported and we can test if it is actually working

## Make sure to start the dev server
`$ npm run dev-server`

## Annoying warning
* As our code is written you will get this warning:

```
It looks like you're using the development build of the Firebase JS SDK
```

* To get rid of it just use this:
  - We'll include `auth` and `database` as we will be using both of them

### The test should work
* You look at the browser and nothing is updated
* But if you open Firebase Database dashboard

![Realtime Database in Firebase](https://i.imgur.com/EaNHsvJ.png)

* We can see that our name value pair has made it into our Firebase Database!

## Recap
1. Create a project on the Firebase dashboard
2. We had to connect to the project using the Firebase module
3. We grab the configuration object that Firebase gives us (think of it as the equivalent to our password to the Database)
4. We pass that config object into our firebase.initializeApp() and the we use
  * database() to access our Firebase database methods
  * ref() to reference a part of our database where we are storing things (if we don't pass a value, we are pointing to the root of our Database)
  * set() this is where we set data on our database (Create of CRUD)


