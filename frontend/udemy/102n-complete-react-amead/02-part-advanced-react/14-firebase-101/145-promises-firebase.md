# Promises with firebase
## Two goals
1. Use promises with set()
    * So we can do something with the data when it either:
        - syncs
        - fails to sync
2. Review Firebase docs

## Our Promises vs Using Promises
* We won't be creating our own Promises
* Or calling resolve or reject
    - Firebase does that for us

```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('bad!');
    }, 5000);
});
```

## Our task
* We just attach `then()` and catch calls onto our set return value
* `set()` returns a Promise

`firebase.js`

```js
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

* Nothing comes back
* We'll just get the log letting us know our changes were successfully made

## Catch calls
* If something went wrong we need to know

```js
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
}).catch((e) => {
  console.log('This failed.', e);
})
```

* Run dev server
* `$ yarn run dev-server`
* View localhost:8080
* console shows **Data is saved**
    - Came back almost instantly

## Trigger errors
* In firebase Database > Rules
* Make this change:

```json
{
  "rules": {
    ".read": false,
    ".write": false
  }
}
```

* Publish your changes
* We say no one can read or write to our DB
* Make change in `firebase.js` code to trigger a refresh
* I just added a dummy comment
* After refresh there is a PERMISSION_DENIED error
    - at the top we have caught the error (not red)
    - the ones below are not caught (red)

## Docs
* [link to docs](https://firebase.google.com/docs/)
* [set](https://firebase.google.com/docs/reference/js/firebase.database.Reference#set)
    - It says "set(value, onComplete) returns firebase.Promise containing void" which lets us know we could attach `then` and `catch`
    - 'containing void' means it returns nothing when things go well
    - Writes data to this Database location
    - This will overwrite any data at this location and all child locations

## Challenge
`firebase.js`

* Setup then and catch
* make sure catch works
* switch rules to be open (on firebase)
* make sure `then()` runs 

```js
database.ref('attributes').set({
  height: 73,
  weight: 150,
});
```

* And here is how we make it work

```js
database
  .ref('attributes')
  .set({
    height: 73,
    weight: 150,
  })
  .then(() => {
    console.log('never see this');
  })
  .catch(e => {
    // bad things here
    console.log('houston we have a problem', e);
  });
```


