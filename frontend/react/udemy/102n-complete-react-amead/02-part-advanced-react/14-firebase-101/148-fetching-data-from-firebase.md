# Fetch data from Firebase
* We know the C UD but now we learn how to Read (fetch)

## There are 2 big ways to fetch data
1. Fetch a single time and get the object back
2. We could also fetch it but set up a subscription
  * And this let's us subscribe for any changes
  * So we say "Give me the values and let me know when any values change"

## Let's do it the easy way
* We will get all the data from the FB Database into the browser client so we can play around with it using JavaScript

## We will focus on just fetching the data
* The goal is to get all of the data in FB into the client browser so we can manipulate it with JavaScript
* We'll just log the data for now
* Later we'll render the data via React calls

### once()
* We'll use this to fetch all the data a single time and this is the purpose of `once()`
  - `once()` takes one and ONLY one argument (the event type)

#### once() function signature
```
once(eventType: EventType, successCallback?: function, failureCallbackOrContext?: function | Object | null, context?: Object | null): Promise<DataSnapshot>
```

* For now we'll use `value` as our event type
* **note** `once()` returns a Promise
  - And we use that Promise to do stuff if the data comes back (successful fetch) or it doesn't (failed Promise)

#
```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref().once('value').then(() => {
  // 
}).catch((e) => {
  console.log('failed fetch', e);
})
```

* Inside the Promise we are getting data back and we call this a `snapshot`
  - On the **snapshot** we have access to our data
  - **note** `snapshot` is an object
  - To extract the value from the object we use `snapshot().val()`
    + `val()` is a function and we call it with no arguments
    + And since we requested the root of our database it will give us all of it

# 
```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database
  .ref()
  .once('value')
  .then(snapshot => {
    console.log(snapshot.val());
  })
  .catch(e => {
    console.log('failed fetch', e);
  });
```

* Now you will see in the Chrome console all the data from our FB Database
* A cleaner way to log out the Database value

```
// MORE CODE
database
  .ref()
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log('failed fetch', e);
  });
```

## And if you just want to fetch the location object
```
// MORE CODE
database
  .ref('location')
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log('failed fetch', e);
  });
```

* Now you just see the location object and it's contents

## Just get the city property
```
// MORE CODE
database
  .ref('location/city')
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log('failed fetch', e);
  });
```

* And that will return `San Diego`

### Thinking about Redux for a moment
* Inside the then() after we have fetched data out of the Database we could dispatch an action to the Redux store

![where we would dispatch an action to the Redux store](https://i.imgur.com/PGx9XzF.png)

* The Redux store changes and then the React components update themselves

## And here's another way we can fetch the data
* `once()` lets us fetch the data a single time
  - Our functions never rerun, it either succeeds or it fails - end of story
  - If the data changes we will not get notified
  - The only way we would get notified is if we actually make anotherquery to the Database

### Can we have the server notify us of changes? Yes
* To this we won't use `once()` and instead we'll use `on()`

```
database.ref().on()
```

* That will let us listen for changes to our Database over and over again
* `on()` takes an event and we'll stick with `value` as our event as we did before
  - This once again, will give us the data for the entire database (we passed database.ref() no path so this is the root of the Database and that's how we get all of the Database data)
  - We will get the value back for the Database initially and EVERY SINGLE TIME IT CHANGES
  - But we need to run some code when the data changes and to do this we need to also pass a callback function

#### Adding a callback to on(event, callback)
* The callback is almost identical to what we did with the callback we passed to then
  - We pass the callback the snapshot object
  - And we can do something with that snapshot data
  - We will get the return value back and log the value of the snapshot to the screen

```
database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});

```

### Question: Why didn't we use Promises above?
* Good question but remember that the goal of this function is to run over and over every time the data changes
  - We want it to run once right away
  - We also want it to rerun any time the data changes
  - But remember that Promises can only be **resolved** or **rejected** a single time with a single value
  - So that's why we are not using Promises in this instance because there would be no to rerun the code for all the data changes
  - That is why we are switching back to the **callback pattern**

## Nothing looks different
* We are getting all our Database data back just like before
* But the one cool thing we don't see is by using this callback pattern with on() we have subscribed to our database to listen for any changes and run again

### REAL TIME DATA UPDATES! 
* Let's see our FB console and our app in the browser side-by-side
* I'm just going to change the age in FB from 40 to 50 and watch what happens
* After updating you will see the browser shows that `age` is not 44. We just got real time data updating!

### Let's change the data programmatically
* Instead of changing our data directly inside Firebase we'll change it inside our codebase
  - We'll use setTimeout to simulate a time delay
  - We show our first value setting the subscribe
  - 3000 later we will see our age is now 200

```
database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});

setTimeout(() => {
  database.ref('age').set(200);
}, 2000);

setTimeout(() => {
  database.ref('age').set(100);
}, 4000);
```

## We also need to know how to cancel subscriptions 
* Why?
  - If a user navigates away from a specific page we don't need it anymore and so why listen and waste valuable resources

### unsubscribe using the `off()` method
* Now we create 3 setTimeout methods and space them 3 seconds apart
* We set the age from 10 to 20 to 30
* We'll unsubscribe at 20 so we won't get notified about the change of age to 30
  - We place `.off()` on our `ref()` `database.ref().off()`
    + We pass off no arguments and this will cancel our subscription

```
// MORE CODE

const database = firebase.database();

database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});

setTimeout(() => {
  database.ref('age').set(10);
}, 3000);

setTimeout(() => {
  database.ref().off();
}, 6000);

setTimeout(() => {
  database.ref('age').set(30);
}, 9000);
```

* Now you will see the age update to 10 in 3 seconds but then the subscription is turned off so we are not notified when the FB Database age field value updates to `30`

## Can we remove just one of our subscriptions? Yes
* We remove a single subscription by passing a function
  - So if we did have multiple subscriptions and we wanted to keep some of them around we could remove a single one by passing in a function (That function has to be the exact same function)
  - There are 2 ways to do this:

### 1. Store the function in a variable and pass that variable to off like this:

```
// MORE CODE

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const onValueChange = snapshot => {
  console.log(snapshot.val());
};
database.ref().on('value', onValueChange);

setTimeout(() => {
  database.ref('age').set(10);
}, 3000);

setTimeout(() => {
  database.ref().off('value', onValueChange);
}, 6000);

setTimeout(() => {
  database.ref('age').set(30);
}, 9000);
```

* That will work but this function:

![function comes back](https://i.imgur.com/ssTZNxW.png)

* The same function highlighted above also comes back from `.on()` so we can restructure the above code

### Our code restructured and a little cleaner
* Same end result
* **note** `off()` docs say to pass in the event getting turned off as the first argument

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const onValueChange = database.ref().on('value', snapshot => {
  console.log(snapshot.val());
});

setTimeout(() => {
  database.ref('age').set(10);
}, 3000);

setTimeout(() => {
  database.ref().off('value', onValueChange);
}, 6000);

setTimeout(() => {
  database.ref('age').set(30);
}, 9000);
```

### And also we can catch errors without using a Promise .catch()
* Since we are not using a Promise we can't use `catch()` so we toss in a function as the second argument

```
// MORE CODE
const onValueChange = database.ref().on(
  'value',
  snapshot => {
    console.log(snapshot.val());
  },
  error => {
    console.log('Error with data fetching', error);
  }
);
```

* Above is the complete setup for subscription
  - We subscribe
  - We unsubscribe
  - We get notified of some data changes (the ones where we are still subscribed)
    + We don't get notified of other changes (the ones after the subscription was turned off)

## Challenge
* We'll wipe our last code and you will need to set up a new subscription from scratch
  - Setup a data subscription
  - Goal: print the following message to the screen
    + All of the data about our current user:
      * name
      * title
      * company
      * Final should be "John Doe is a CFO at Atari"
      * Set up a subscription and you should see data print to screen via a log
      * After you have that then change the data
      * When you change the data make sure it reprints (do it via calls to your code)

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// we get access to the database
// we get the root reference of the database (we need to grab name)
// we use .on() to set up a subscription (we only know the 'value' event so we use that)
//   the first function we pass as our second argument to on() is our success handler and when things go well we get access to the 'snapshot' - and that is good because we'll need to use snapshot to print our message to answer the challenge question
database.ref().on(
  'value',
  snapshot => {
    // we store val to grab values off of snapshot
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  },
  error => {
    console.log('Error with data fetching', error);
  }
);

setTimeout(() => {
  database
    .ref()
    .update({
      name: 'Jane Doe',
      'job/title': 'Janitor',
      'job/company': 'McDonalds',
    })
    .then(() => {
      console.log('User info successfully updated');
    })
    .catch(error => {
      console.log('Error updating user data', error);
    });
}, 3000);
```

## Recap
* We learned about
  - `once()`
    + Just lets you fetch the data on a specific reference a single time
* on() and off()
  - Go together to turn on and off subscriptions
  - `on()`
  - `off()`
* Read the docs and understand them
* We now know CRUD with Firebase

## Next - How to structure our database for a practical app
* Currently we have an object at the root
  - But what if we have a list of expenses
  - IMPORTANT QUESTION: How do we work with array data in Firebase?
    + Not at straightforward as you would think as there are some quirks in Firebase because we do have this object structure
