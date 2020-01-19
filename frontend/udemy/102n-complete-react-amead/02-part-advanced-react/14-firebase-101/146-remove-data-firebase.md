# Removing Data from Firebase
* Remove our last challenge in Firebase, we don't need it
* Comment our our existing DB call
* This will be our starting code

```
// MORE CODE

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// database
//   .ref()
//   .set({
//     name: 'John Doe',
//     age: 40,
//     isSingle: false,
//     location: {
//       city: 'LA',
//       country: 'US',
//     },
//   })
//   .then(() => {
//     console.log('Data is saved');
//   })
//   .catch(error => {
//     console.log('This failed!!', error);
//   });
```

## Task - How would we remove isSingle from our FB Database?
* Not blow up the entire DB just a specific value
* Use code to get rid of `isSingle` and not the FB console `X` inside the Firebase console

## remove()
* Let's learn about a bran new method called
* Read the [docs](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#remove) to see how `remove()` works
  - **note** You will see `remove(onComplete?: function): Promise<any>` as the function signature
    + It means onComplete callback is optional `that is what the "?" means`
    + It returns a Promise

```
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

## Delete the entire database

```
const database = firebase.database();

database
  .ref()
  .remove()
  .then(() => {
    console.log('Database gone baby!');
  })
  .catch((e) => {
    console.log('oh no! mr. bill! ', e);
  });
```

* Now make your code look like this:

```
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
```

* Now our Database is rebuilt
* We will use `set()` to delete data as well

## set(null) is same as remove()
* So to do the same thing as before we do this:

```
// MORE CODE
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

database.ref('isSingle').set(null);
```

* If you dive back into the `set()` FB docs you will see this blurb
  - "Passing null for the new value is equivalent to calling `remove();` namely, all data at this location and all child locations will be deleted."
  - Reading docs is soooooo important for developers, get into the habit of reading and understanding documentation!

## best practice - use remove() over set(null)
* It is more explicit

## Next - Learn how to more efficiently update our data
* How could we update `name` and `age` with one call?
  - With `set()` it is not possible
  - But with the `update()` method we can!
