# New Feature Workflow
* We'll make changes to an existing component
* We'll go through process of making sure those changes work
* Test those changes
* Deploy those changes
* This is how you build out a feature

## ExpenseListItem Component
* Open this file and it's companion test file

`ExpenseListItem.js` and `ExpenseListItem.test.js`

`ExpenseListItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Desc: {description}</h3>
    </Link>

    <p>Amount: {amount} </p>
    <p>Created:{createdAt}</p>
  </div>
);

ExpenseListItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
  createdAt: PropTypes.number,
};

export default ExpenseListItem;
```

`ExpenseListItem.test.js`

* The test for this is very simple, it's just a simple snapshot test making sure things show up correctly

```
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

test('should render ExpenseListItem correctly', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
```

* We'll build this now

### What new feature will we add?
* We will output a human readable date and currency
* We don't care about **styles**
* Currently we just dump the number of cents and a machine readable date
* Once change added we'll test commit and deploy
* Our "Feature Request" will focus on formatting the data correctly

### Boot up dev server
`$ npm run dev-server` (one terminal tab)
    
* So we can view our app

### Boot up jest watching in new Terminal tab
`$ npm test -- --watch`

* We use `--` to pass some arguments down to jest
* We use `--watch` to make sure the test suite keeps running and updated automatically when changes are made

### Troubleshoot
* Because of HOC was getting an error so added this in `.eslintrc` to turn that error off

`.eslintrc`

```
// MORE CODE

"no-console": 0,
"import/no-named-as-default": 0,

// MORE CODE
```

* Code should run in browser

## Run test (in other terminal window)
* You will need to install `cross-env`
  - "`cross-env` makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform. Just set it like you would if it's running on a POSIX system, and cross-env will take care of setting it properly."

## Now that we are using Git our workflow will change with testing
* **note** If Jest says "No tests found related to files changed since last commit"
  - It may not rerun the test suite if we committed our code to Git

### How you can force Jest to re-run all test
* Follow the instructions on screen and type `a` to re-run all tests

### Problems connecting to Firebase with test environment
# Problem getting to `expenses` array
* This is because I imported it like a default export instead of a named export

`ExpenseListItem.test.js`

* Make this update:

```
import React from 'react';
import { shallow } from 'enzyme';
import { expenses } from '../fixtures/expenses'; // UPDATE THIS LINE!

// MORE CODE
```

## If you have questions about Environment variables see `138a-environment-variables.md`

## Format moment
* Import moment

### What does it take to make a moment instance when we have a timestamp?
* If we just call moment with no arguments `moment()` that will give us the current time
* If we have a timestamp, we pass that timestamp to moment `moment(createdAt)`

### How to format a timestamp with moment
* If you use this: `moment(createdAt).format()` (passing no arguments) we'll get a really long human readable date but it not the nicest look date
  - If we provide specific patterns to moment's `format()` method we can make our dates look much nicer
  - Let's show:
    + the month
    + the day of the month
    + the year
    + (We won't be concerned with minutes and seconds in this example as our end user won't need them in this app)
  - Impossible to memorize moment date patterns so just use the docs
    + Search `Display` section
      * [momentjs format display options docs](https://momentjs.com/docs/#/displaying/)

#
```
// MORE CODE

import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    // MORE CODE

    <p>Amount: {amount} </p>
    <p>Created:{moment(createdAt).format('MMMM Do, YYYY')}</p>
  </div>
);

// MORE CODE
```

### Generating a new snapshot
* After saving our test will fail because our new code doesn't match the old snapshot so we press `u` to **generate a new snapshot**
* Jest helps you in the Terminal by alerting you to:

```
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them.
```

![type 'u' for new snapshot](https://i.imgur.com/NbdrToT.png)

* After typing `u` a new snapshot will be taken and our test once again passes all tests

## Format amount
* We currently have a really long number and we need to format it to look like currency that we would see on any eccomerce site

### We'll use a library to make it easy to format currency
* We used `moment` to make time easier to manage
* We'll use `NumeralJs`

### NumeralJs
* [Website](http://numeraljs.com/)

## Install NumeralJS
`$ npm i numeral`

#### How do we use NumeralJS
* Reading the docs we see it is very similar to momentjs
  - We call `numeral()` and pass it a number as an argument
  - Then we have access to `methods` on that numeral instance to do stuff (just like we use `moment(createdAt).format()`)
  - And the method we will be using is `numeral(num).format()`
  - We want currency so we'll use the **"$0,0.00"** pattern under the `Currency` docs heading

```
// MORE CODE

var myNumeral = numeral(1000);

var value = myNumeral.value();
// 1000

var myNumeral2 = numeral('1,000');

var value2 = myNumeral2.value();
// 1000
// MORE CODE
```

## Import numeral and use it to format our currency
```
// MORE CODE

import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    // MORE CODE

    <p>Amount: {numeral(amount).format('$0,0.00')} </p>
    <p>Created:{moment(createdAt).format('MMMM Do, YYYY')}</p>
  </div>
);

// MORE CODE
```

* Our test fails again. So generate another snapshot to pass

## Test it out
* Generate a new expense and both the date and currency should be properly formatted

![incorrect money amount](https://i.imgur.com/Q3QZdgq.png)

### Houston we have a problem!
* I entered a new item with an amount of `195` but when formatted I see the value was `19,500.00`
* This is wrong so we need to divide that amount to get the amount I wanted `$195.00`

```
// MORE CODE

    <p>Amount: {numeral(amount / 100).format('$0,0.00')} </p>

// MORE CODE
```

![date and money formatted nicely](https://i.imgur.com/fBHzALF.png)

* Now our currency is formatted properly
* Type `u` again to create another snapshot and all our tests have passed

## What if you are in a different country?
* Use the `Locales` heading of the NumeralJS docs

```
// load a locale
numeral.register('locale', 'fr', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});

// switch between locales
numeral.locale('fr');
```

## Tips
* Use your Jest terminal window to make sure nothing broke
* But also check your dev-server output to make sure your app is working as expected for the end user

## Git
* Add and commit your changes
* Push to GH and Heroku

`$ git push heroku master`

## Test the production site
* Make sure date and currency is formatted correctly

## That is how the feature request workflow works
* Rinse and repeat

## Houston I have a problem
* After visiting the link I got this `Application error` page

![app error](https://i.imgur.com/fj3AEt9.png)

* Use the info it provide and type in `$ heroku logs --tail` into your terminal
  - This is a Heroku CLI command to give you the end of your server error logs
  - After reviewing it I saw that Heroku can't find `dotenv` this is because I added it to my `devDependencies` and that doesn't get installed in production
  - I just need to open my `package.json` file cut `dotenv` from the `devDependencies` and move it to the dependencies (make sure your JSON is formatted properly - add and/or remove commas when necessary)
  - **Best Practice** Keep your dependencies in alphabetical order

`package.json`

```
// MORE CODE

  "dependencies": {
    "@babel/cli": "^7.7.4",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@types/react": "^16.9.2",
    "@types/redux": "^3.6.0",
    "cross-env": "^6.0.3",
    "dotenv": "^8.2.0",

// MORE CODE
```

## Add to GH and Heroku again
* Git add and commint and Push to GH and Heroku one more time
* **note** To break out of the Heroku CLI log use `ctrl` + `c`
* That should fix the error and the production app should have no errors in the console

## Next - Coding More Feature Requests






