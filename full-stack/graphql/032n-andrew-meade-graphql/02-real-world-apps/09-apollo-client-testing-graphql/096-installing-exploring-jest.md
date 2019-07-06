# Installing and Exploring Jest
* Jest is the test framework we will be using to write our test code
* This will give us all of the tools we need to make it real easy to write test cases

## What is jest?
* [homepage](https://jestjs.io/)
* [jest docs](https://jestjs.io/docs/en/getting-started)
    - Has guides showing you how to do specific things with jest
* [jest api](https://jestjs.io/docs/en/api)
    - Contains all various methods/tools jest provides

## Install jest
* Jest installs as a npm module
* Be in root of project
* `$ npm i jest -D`
    - Jest will be a "Local Module Only" it will not be needed in production

`package.json`

```
// MORE CODE

  "devDependencies": {
    // MORE CODE

    "jest": "^24.8.0",
    // MORE CODE

  }

// MORE CODE
```

## Create a test script
* By default `package.json` gives us a test script that just dumps a message to the terminal when you run it saying "there is no test specified"

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "test": "echo \"Error: no test specified\" && exit 1",
    
    // MORE CODE
  },

// MORE CODE
```

* We will add jest as our test suite by updating our test script

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "test": "jest",
    // MORE CODE
  },

// MORE CODE
```

## Run jest
`$ npm run test`

* We get an error "no tests found"
    - Jest uses a specific pattern to look for test files in our app and as of yet we haven't created any

## Create our first test file
* So that jest can detect it
* We need to create a folder called `/tests`
    - **note** Jest is specifically looking for a folder called `tests` in the root of your app

### Naming convention for jest test files
* Must use this naming convention so jest can detect the test file
    - `some-name.test.js`

## First test file
* Create `/tests/user.test.js`

`user.test.js`

* This will be the test file that contains individual test cases for user related functionality
    - examples
        + signing up
        + logging in
        + fetching your profile
        + updating your email
* Now we have a single test suite in place
    - A "test suite" is nothing more than a file with the `.test.js` extension in the correct directory (/tests directory)
    - A "test suite" is a file that Jest is going to detect

## Run test again
`$ npm run test`

* Our test fails again but we now know jest knows about our file
    - `tests/user.test.js`
* The error: "Your test suite must contain at least one test."

## Add our first test case inside our test file
* When jest detects and executes our test file it is injecting a whole bunch of "Jest specific stuff" we can use to build up our test suite
    - One of them is a function called `test()`

## test()
* Allows us to define individual test cases (we will use this often)
* It is injected like a global so we will call it like `test()`

### test() syntax
`text("NAME", () => {}`

* NAME - It is the name for our test cases (It describes exactly what we are trying to test)
    - We will right dozens of test cases and this name helps us stay organized
* function - This function that runs some code that makes sure that code works as expected
    - Example
        + We could try to fetch all our draft posts and make sure we got the correct number back

### Create first dummy test case
`tests/user.test.js`

```
test('This is my first test case', () => {

})
```

* Run test one more time

`$ npm run test`

* Our one test passes

![first dummy test passes](https://i.imgur.com/WVwfZyN.png)

* It tells us that our one test "This is my first test case" passed
* It tells us it tool 1ms to run the test
* We won't be testing snapshops (that is more for frontend UI testing)
* Total time is 1.5 seconds

## Automate the test command as our files change
`package.json`

```
// MORE CODE

    "test": "jest --watch",
    "get-schema": "graphql get-schema -p prisma --dotenv config/dev.env"
  },

// MORE CODE
```

* Now when our test files change, or the code we are testing changes that everything restarts

## Jest CLI Options
* A lot of options
* [Jest CLI docs](https://jestjs.io/docs/en/cli)

### --watch
* Watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed, use the `--watchAll` option instead.

### Rerun jest
`$ npm run test`

* Now the terminal will sit and wait
* Now we have a bunch of options

![watch options](https://i.imgur.com/44mFTyh.png)

`a` - run all test cases again
`w` - to show more options

* Make a change to the test case

`user.test.js`

```
// MORE CODE

test('This is my first test case', () => {
  1 + 2;
});

// MORE CODE
```

* You will see our test runs again and it still passes

## Challenge - Goal: Create a second test case
1. Use the test function to create a second test case
2. Save the test file and ensure the new test case shows up

`user.test.js`

```
test('This is my first test case', () => {
  1 + 2;
});

test('Do nothing and smile silently', () => {
  // empty test
});
```

* You will see 1 test suite and 2 passing tests

* Run the tests





