# Removing Data from Firebase
* Remove our last challenge in firebase, we don't need it
* Comment our our existing DB call

```js
// MORE CODE
const database = firebase.database();
// database
//   .ref()
//   .set({
//     name: 'John Wayne',
//     age: 22,
//     isSingle: false,
//     location: {
//       city: 'LA',
//       country: 'United States',
//     },
//   })
//   .then(() => {
//     console.log('Data is saved');
//   })
//   .catch(e => {
//     console.log('This failed.', e);
//   });
```

## Task
* Not blow up all DB just a specific value
* Use code to get rid of `isSingle` and not the red X inside the Firebase console

## remove()
```js
const database = firebase.database();

database
  .ref('isSingle')
  .remove()
  .then(() => {
    console.log('gone baby!');
  })
  .catch(() => {
    console.log('oh no! mr. bill!');
  });
```

* Delete the entire database

```js
const database = firebase.database();

database
  .ref('isSingle')
  .remove()
  .then(() => {
    console.log('gone baby!');
  })
  .catch(() => {
    console.log('oh no! mr. bill!');
  });
```

## set(null) is same as remove()
`database.ref('isSingle').set(null);`
