# Promises with firebase
## Two goals
1. Use promises with `set()`
  * So we can do something with the data when it either:
        - syncs
        - fails to sync
2. Review Firebase docs
  * Can be a little confusing if you don't know what you're looking for
    - We will dig into:
      + `ref()`
      + `set()`

## Our Promises vs Using Promises
* We won't be creating our own Promises
* We won't be calling `resolve` or `reject`
    - Firebase does that for us
    - So below is code we won't be using

```
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('bad!');
    }, 5000);
});
```

## All we need to do is attach `then()` and `catch()`
* We just attach `then()` and `catch()` calls onto our `set()` return value
* `set()` returns a Promise
  - This means we can continue **chaining**

`firebase.js`

```
database.ref().set({
  name: 'John Wayne',
  age: 22,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'United States',
  },
}).then(() => {
  console.log('Data is saved');
})
```

* We pass in our first argument (which is just a function)
  - The function will run when the syncing was successful
  - We'll just output a log stating `Data is saved`
* Nothing comes back
  - When we dive into the docs you'll be able to ascertain what comes back for all of them
  - We'll just get the log letting us know our changes were successfully made

## Let's add an error handler
* `catch()` calls
* If something went wrong we need to know
* We could pass the error in as a second argument to then
  - But it is recommended to keep things a little more explicit and use `catch()` instead
  - Our `catch()` calls will always have the `catch()` called with some sort of error
    + `catch(error)`
    + You may also see people use `catch(e)`

```
database.ref().set({
  name: 'John Wayne',
  age: 22,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'United States',
  },
}).then(() => {
  console.log('Data is saved');
}).catch((error) => {
  console.log('This failed.', error);
})
```

## Run dev server

`$ yarn run dev-server`

### View localhost:8080
* console shows **Data is saved**
    - Came back almost instantly
    - This is expected as the data should sync correctly
    - The time it takes to sync data is not long (just milliseconds not seconds) but it is still essential to to set our code up like this and use asynchronous programming
      + **note** If JavaScript didn't support asynchronous programming we would be locking up the browser every time we try to sync our FB Database
        * This would prevent people from interacting with form fields or switch pages... which is obviously not what we want
      + By using this asynchronous behavior we can still do something meaningful and allow the user to interact with the UI

## Trigger errors - How can we trigger an error?
* We have a few different options

### Let's add some rules to the Database
* We will block anyone from reading or writing:
* In firebase console `Database` > `Rules`
* Make this change:

```
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

### Make sure to `Publish` your changes
* We say no one can read or write to our Database
* **IMPORTANT** Now make change in `firebase.js` code to trigger a refresh
  - Just change the `.` to a `!` in one of the comments and this will trigger a refresh
* After refresh there is a `PERMISSION_DENIED` error
    - At the top we have caught the error (not red) (we caught the error and successfully printed it to the screen)
    - The ones below are Uncaught (red)
    - **note** We don't expose a ton of information about why it failed (this is a good thing because for security reasons we like to be tight lipped about why we have an error - we just let them know they don't have permissions)
      + We never want to expose the contents of our Database or hackers can take advantage of us (if we say you can't make changes to user44, then the hacker will know there is a user44 and there might be a way to change user44 under the right circumstances)

## How do we know what functions do what?
* How do we know `set()` gets called on `ref()` and anything else about the Firebase codebase?
* How do we know `ref()` gets called on database?
* How do we know that `set()` returns a Promise?
* We learn this and more from the Firebase docs

## Docs
* [link to docs](https://firebase.google.com/docs/)
  - We then point to the part we are using Firebase which is the web

### Guides
* There is a [Guides](https://firebase.google.com/docs/guides) page (walks you through tutorials)

### Reference
* The part you will come back to over and over is the `Reference` [tab](https://firebase.google.com/docs/reference)
* It includes every single thing that your various objects can use
  - Example: How do we know that `set()` returns a Promise?
    + We can explore that in the docs (We point it to JavaScript)
      * We are just using Database so we open that link
      * We have looked at Database and Reference inside `firebase.database`
      * Let's look at the [Database docs](https://firebase.google.com/docs/reference/js/firebase.database.Database)
        - That shows us the properties and methods available to us
        - Click on `ref` and [that is something](https://firebase.google.com/docs/reference/js/firebase.database.Database#ref) we used in our code

#### firebase.database.Reference
* This has [a lot more stuff](https://firebase.google.com/docs/reference/js/firebase.database.Reference) to explore
* Expand the table of contents and you will see a ton of stuff (20+ items)

##### set()
* We've used `set()` in our code
* [set](https://firebase.google.com/docs/reference/js/firebase.database.Reference#set)

```
set(value: any, onComplete?: function): Promise<any>
```

* Now you can see that `set()` returns a Promise
  - This lets us know we could attach `then` and `catch`
  - Writes data to this Database location
    + This will overwrite any data at this location and all child locations
* You can view some examples
  - Shows you setting things equal to a String and also and Object

## Challenge
* Here is our starting code for this challenge:

`firebase.js`

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database
  .ref()
  .set({
    name: 'John Doe',
    age: 40,
    isSingle: false,
    location: {
      city: 'LA',
      country: 'US',
    },
  })
  .then(() => {
    console.log('Data is saved');
  })
  .catch(error => {
    console.log('This failed!!', error);
  });

// database.ref('age').set(30);
// database.ref('location/city').set('Phila');
// database.ref('attributes/height').set('100');
// database.ref('attributes/weight').set('220');
database.ref('attributes').set({
  height: 73,
  weight: 150,
});
```

### Challenge Instructions
* Setup `then()` and `catch()`
* Make sure `catch()` works
* Our rules are both set to false - so this should trigger the `catch()`

#### Second Challenge
* Switch rules to be open (on firebase console Rules tab)
* Then Confirm that your `then()` code runs 

```
database
  .ref('attributes')
  .set({
    height: 73,
    weight: 150,
  })
  .then(() => {
    console.log('then() is running!!');
  })
  .catch(error => {
    console.log('the catch() is running and here is the error ', error);
  });

```

* We can use the same code as above for the second Challenge
* Just turn on the rules to make the Database public to the world
* **note** Don't forget to click `Publish` after making the changes

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

* **remember** Alter one of the comments to trigger a refresh
* Now you should see your `then()` comment

## Next - We learn how to remove data from the Database
