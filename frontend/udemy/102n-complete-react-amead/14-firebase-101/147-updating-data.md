# Updating data in Firebase
* We could update with set() and remove() but this is more efficient because we do it with one call

```
database.ref().update({
  name: 'Jo',
  age: 20,
  job: 'Clown'
  isSingle: null,
});
```

* We also add a new field as well as update 2 existing fields and deleting 1 prop

## root level (update)
The update only updates at the root level

```js
database.ref().update({
  name: 'Jo',
  age: 20,
  job: 'Clown',
  isSingle: null,
  location: {
    city: 'Miami',
  },
});
```

* We lose country... because update only updates at root level
* We can't update nested objects unless we use this syntax

```js
database.ref().update({
  name: 'Jo',
  age: 20,
  job: 'Clown',
  isSingle: null,
  'location/city': 'Boston',
});
```

* Rarely used
* Syntax is ugly
* That `/` is not allowed in JavaScript and that is why we surround it in `''`

## Challenge
```js
const database = firebase.database();

database
  .ref()
  .set({
    name: 'John Wayne',
    age: 22,
    stressLevel: 3,
    job: {
      title: 'Stunt driver',
      company: 'MGM'
    },
    location: {
      city: 'LA',
      country: 'United States',
    },
  })
  .then(() => {
    console.log('Data is saved');
  })
  .catch(e => {
    console.log('This failed.', e);
  });
```

* Change the stressLevel to a 9
* Change job.company to Amazon
* Change location.city to Seattle

```js
database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seattle',
});
```

## Read data from database
