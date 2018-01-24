# Fetching data from Firebase
* Two ways
    - Fetch the object (once)
    - Subscribe to changes

## Fetch the object (once)
* It either succeeds or fails
* That's it

```js
const database = firebase.database();

database
  .ref()
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log('Error fetching data', e);
  });
```

* View the console log in chrome browser and you'll see the entire object from Firebase

## I just want to access the location
```js
database
  .ref('location')
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log('Error fetching data', e);
  });
```

* Or just the city

```js
database
  .ref('location/city')
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log('Error fetching data', e);
  });
```

## We want the server to notify us of changes
```js
const database = firebase.database();

database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});
```

* Promises can only be resolved one on a single value
* This is not a Promise
* We switch over to the callback patter for subscriptions to firebase data
* The cool thing about this data is when ever it changes in the database it updates
* Have browsers open side-by-side and change the firebase age field and watch it update instantly in the console

## Change over time
```js
const database = firebase.database();

database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});

setTimeout(() => {
  database.ref('age').set(28);
}, 3500);
```

* Aftr 3.5 seconds the age changes to 28

## Cancel a subscription
* user navigates away from page
* Don't want to waste resources

```js
const database = firebase.database();

database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});

setTimeout(() => {
  database.ref('age').set(28);
}, 3500);
setTimeout(() => {
  database.ref().off();
}, 7000);
setTimeout(() => {
  database.ref('age').set(23);
}, 10500);
```

* You will see age 23 then change to 28 then it stops
* We are not notified of the change
* But the age does change to 23
* We removed our one subscription
* We can have multiple subscriptions and remove them
