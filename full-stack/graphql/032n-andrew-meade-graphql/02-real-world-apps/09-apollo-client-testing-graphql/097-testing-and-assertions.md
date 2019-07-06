# Testing and Assertions
## We will just practice with jest and testing
* Create a sample file

`utils/user.js`

```
const getFirstName = fullName => fullName.split(' ')[0];
```

## Use export
* So other files can load this in
* We will make it a named export

`utils/user.js`

```
const getFirstName = fullName => fullName.split(' ')[0];

export { getFirstName };

```

## Write a test function for `getFirstName()`
* **tip** Naming function start with `should`

`tests/user.test.js`

```
test('Should determine first name when given full name', () => {
  //
});

```

### Make sure you are importing what you will be testing
`tests/user.test.js`

```
import { getFirstName } from '../src/utils/user';

test('Should determine first name when given full name', () => {
  const firstName = getFirstName('John Doe');

  throw new Error('This sould trigger a failure');
});

```

## Error - " TypeError: Cannot read property 'bindings' of null"
* bug - with version 24 of jest

### Temp Solution - downgrade to Jest 23
`$ npm i jest@23.0`

## Back to test
* After running `$ npm run test`
* You will get one failed test

![failed test with jest](https://i.imgur.com/IpH4WTG.png)

### Takeaway
* If we throw an error we get an error
* If we don't throw an error our test will pass
* If we use condtional logic we can get both to work together

`tests/user.test.js`

```
import { getFirstName } from '../src/utils/user';

test('Should determine first name when given full name', () => {
  const firstName = getFirstName('John Doe');

  if (firstName !== 'John') {
   throw new Error('Expected the string John');
  }
});

```

* Now our test passes because the conditional is true

## Changes break code
* So if a team member or you change the code

`src/utils/user.js`

```
const getFirstName = fullName => fullName.split('')[0];
export { getFirstName };

```

* The test will fail (we removed the space in the split search)
* Put the space back in and the test will pass again

## How can we make these tests easier?
* Jest gives us lots of tools
    - We can assert that one value equals another
    - We can assert that an array has a given item inside it
* With `Expect`

## Expect
* [Expect docs](https://jestjs.io/docs/en/expect)
* We use expect to make assertions
    - .toBe(value)
        + Expect one value to be another
    - .toHaveBeenCalled()
        + Expect that a given function has been called
    - .toHaveReturned()
        + Expect some value has been returned 
    - .toBeGreaterThan(number)
        + Expect a number is greater than another number

### .toBe(value)
* .toBe() is an equality assertion
* Checking that one value equals another

```
const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});
```

* We are checking that can.ounces = 12
    - If it does --> pass
    - If it doesnt' --> fail

## Let's use this in our test
* This means we can scrap our conditionals
* And manually throwing Errors

`tests/user.test.js`

```
import { getFirstName } from '../src/utils/user';

test('Should determine first name when given full name', () => {
  const firstName = getFirstName('John Doe');

  expect(firstName).toBe('John');

  // if (firstName !== 'John') {
  //   throw new Error('Expected the string John');
  // }
});
```

* Our new code is less lines
* Requires less maintenance 
* Is easier to read and deduce
* Better error messages
    - To test, remove the space again to fail the test

`src/utils/user.js`

```
const getFirstName = fullName => fullName.split('')[0];
export { getFirstName };

```

![way better error messages](https://i.imgur.com/Akb1khY.png)

* This makes it easier to write our test cases
* It makes it easier to troubleshoot and find our bugs

## Write another test
* We will write multiple test cases passing in different values
* Here we test to make sure that when I pass in the first name I get the first name back
* **remember** Put back in space in user.js

`user.test.js`

```
import { getFirstName } from '../src/utils/user';

test('Should determine first name when given full name', () => {
  const firstName = getFirstName('John Doe');

  expect(firstName).toBe('John');
});

test('Should return first name when given first name', () => {
  const firstName = getFirstName('Jen');

  expect(firstName).toBe('Jen');
});

```

* Two tests will pass
* Now we can assert that a first name is returned whether or not a full name or a first name is provided
    - In some databases users provide their full name or first name and we need to test that regardless we get their first name

## Challenge
* We have a function that will take in a password and return true if is matches and false if it doesn't

`user.js`

```
const getFirstName = fullName => fullName.split(' ')[0];

const isValidPassword = password => {
  return password.length >= 8 && !password.toLowerCase().includes('password');
};

export { getFirstName, getValidPassword };

```

* We use `!` to make sure that it doesn't contain the word `password`
* We make sure we first convert it to lowercase to check both cases

### Now create test case for this function
* Create test case "Should reject password shorter than 8 characters"
    - Import inValidPassword function
    - Pass in a value that is too short
    - Use the toBe() assertion to expect that the value you get back is false

`user.js`

```
const getFirstName = fullName => fullName.split(' ')[0];

const isValidPassword = password =>
  password.length >= 8 && !password.toLowerCase().includes('password');

export { getFirstName, isValidPassword };

```

`user.test.js`

```
// MORE CODE

import { getFirstName, isValidPassword } from '../src/utils/user';

// MORE CODE

test('Should reject password shorter than 8 characters', () => {
  const isValid = isValidPassword('123');

  expect(isValid).toBe(false);
});

// MORE CODE
```

* Should give you 3 passed tests
* If you changed our `user.js` code to be:

```
const getFirstName = fullName => fullName.split(' ')[0];

const isValidPassword = password =>
  password.length >= 2 && !password.toLowerCase().includes('password');

export { getFirstName, isValidPassword };

```

* It would fail

## Another Challenge
* Create another test case for the `isValidPassword` function
    - Name it "Should reject password that contains word password"

`user.test.js`

```
test('Should reject password that contains word password', () => {
  const isValid = isValidPassword('123Password');

  expect(isValid).toBe(false);
});

```

## Another Challenge
* Create test case "Should correctly validate a valid password"

`user.test.js`

```
test('Should correctly validate a valid password', () => {
  const isValid = isValidPassword('123wordpass');

  expect(isValid).toBe(true);
});

```

* We have 5 passing tests

![5 passing tests](https://i.imgur.com/S1gqIyL.png)


