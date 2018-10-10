# Make our date pretty
* Working with Dates in JavaScript is not the easiest things to do and this makes sense because if you think about it, dates and times can get very complicated
* There are NPM packages that make working with time a whole lot easier but let's stick with **Vanilla JavaScript** for now

## Convert Date and Time
* Remember we are working with sessions so you will get lots of errors as you change the info
* I recommend when you get an error browse to `http://localhost` and then click the `/profile` route to get rid of the error
* Yes it's a pain but it'll work for now

`UserInfo.js`

```
// MORE CODE

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserInfo extends Component {
  formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
  };

  render() {

    // MORE CODE
    
        <p>Join Date: {this.formatDate(joinDate)}</p>
        <ul>

// MORE CODE
```

## We have a problem (Use this process each time we make changes as we are dealing with a session)
* After refreshing page
* We get an error
* Navigate to home page
* Navigate to Sigin
* Log in
* Click Profile
* You will see this problem:

`Join Date: Invalid Date at Invalid Date`

* The reason for the invalid date is found when we log out the type of data we are dealing with:

```
// MORE CODE

class UserInfo extends Component {
  formatDate = date => {
    console.log(date);
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
  };

// MORE CODE
```

* After refreshing page
* We get an error
* Navigate to home page
* Navigate to Sigin
* Log in
* Click Profile
* You will see the console shows a number but it is really a string
* It is supposed to be a number in the time of milliseconds since the epoch but it is really a string and we can tell that from using `typeof`:

```
// MORE CODE

class UserInfo extends Component {
  formatDate = date => {
    console.log(typeof date);
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');
    return `${newDate} at ${newTime}`;
  };

// MORE CODE
```

* After refreshing page
* We get an error
* Navigate to home page
* Navigate to Signin
* Log in
* Click Profile
* The console will show that it is a `string` data type and we need to pass our JavaScript `Date()` method a number of milliseconds

### Convert a string to a number
* And will pass the number of milliseconds to our `Date()` function

```
// MORE CODE

formatDate = date => {
  const numDate = parseInt(date, 10);
  // console.log(numDate);
  const newDate = new Date(numDate).toLocaleDateString('en-US');
  const newTime = new Date(numDate).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

// MORE CODE
```

* After refreshing page
* We get an error
* Navigate to home page
* Navigate to Signin
* Log in
* Click Profile
* That will make the date look similar to: `Join Date: 9/4/2018 at 12:25:23 PM`
* I commented out a way for you to check if the string is a number, feel free to comment that log in to see for yourself

## Reuse Code the DRY way
* If you are using your code in more than one place it is a good idea to use the DRY principle - Don't repeat yourself
* I'm going to create a `src/utilities/` folder and I'll add an `index.js` page that will hold all of my utility functions
* I'll make each function an export and use them where I need them

`src/utilities/index.js`

```
// repo of utility functions

// vanilla JavaScript date formatter
export const formatDate = date => {
  const numDate = parseInt(date, 10);
  // console.log(numDate);
  const newDate = new Date(numDate).toLocaleDateString('en-US');
  const newTime = new Date(numDate).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

// MORE CODE
```

* Now we'll use that in our code

`UserInfo.js`

```
// MORE CODE

// utility functions
import { formatDate } from '../../utilities';

class UserInfo extends Component {
 // MORE CODE

    return (
      <div>
        // MORE CODE
        <p>Join Date: {formatDate(joinDate)}</p>

// MORE CODE
```

* Notice we are no using `this` because the function is not part of the `class`
* Now our code is more modular so I can also easily reuse the same function inside `ColognePage.js`

`ColognePage.js`

```
// MORE CODE

// utilities
import { formatDate } from '../../utilities';

class ColognePage extends Component {
   // MORE CODE

    return (
      <Query query={GET_COLOGNE} variables={{ _id }}>

          // MORE CODE

          return (
            <div className="App">
              <h2>Scent Name: {scentName}</h2>
              <p>
                <strong>Created Date: </strong>
                {formatDate(createdDate)}
              </p>

// MORE CODE
```

* View the home page
* Click on a link to a single cologne page
* You will see the date and time are also formatted on this page
* Using the same code in two different place
* Our code is more DRY and reusable

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Make dates pretty`

## Push to github
`$ git push origin profile`

## Next - Add User Colognes

## Additional Resources
* Moment JS or `date fns` are other ways of formatting dates/times
* * [Reference](https://stackoverflow.com/questions/35184003/moment-js-convert-milliseconds-into-date-and-time)
* [Article on both](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43)
* [Is Vanilla JS worth learning](https://medium.freecodecamp.org/is-vanilla-javascript-worth-learning-absolutely-c2c67140ac34)
* [Converting strings to numbers with vanilla JavaScript](https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/)
* [What is the epoch](https://stackoverflow.com/questions/9575790/how-to-get-time-in-milliseconds-since-the-unix-epoch-in-javascript)
* [typeof JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
* [Date() JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [DRY code vs WET code](https://www.codementor.io/joshuaaroke/dry-code-vs-wet-code-89xjwv11w)
