# Introduction to React Testing
* Project to work with

```
git clone https://github.com/leveluptuts/React-Testing-For-Beginners.git
cd React-Testing-For-Beginners
yarn
```

* We clone a repo
* We cd into that repo
* We install all dependencies with `yarn`

## We don't see jest anywhere inside the `"script"` of package.json
* But `jest` is a part of create react app
* We don't have to configure `jest` when we use create react app which is a great thing that will save us time

## So how do we test
`$ yarn test` or `$ npm test`

## How do we run all of our tests?
`$ a`

* **note**Did not get Network error failed

## Mocha and Chai
* They used `describe` and `it`
* You can use them if you want
* But create react app switched to `jest`
* `test` makes a lot of sense as that is what we are doing

`App.test.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('renders without crashing', () => {
  expect(true).toBeTruthy();
});
```

* Default test
* It passes (obviously because the test is saying that we expect true to be truthy... which it always is)
* This is a useless test

## Let's run our app
`$ npm start`

* The code breaks because the API key doens't exist
* We will be mocking the API key
* Try to start thinking in `test mode` rather than `code mode`
