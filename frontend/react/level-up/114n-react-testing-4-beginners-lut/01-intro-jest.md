# Introduction to Testing with Jest
```
git clone https://github.com/leveluptuts/Level-Up-JavaScript-Testing-101.git
cd Level-Up-JavaScript-Testing-101
npm install
npm test
```

## The above repo uses `parcel`
* [parcel repo](https://github.com/parcel-bundler/parcel)

### What is parcel?
* Excellent way to bundle up your code and get it working in a development environment
* Works easily
* Don't have to write config files

`package.json` and scripts

```
"scripts": {
  "start": "parcel index.html",
  "test": "jest --watchAll"
},
```

### Current packages are:
* babel-present-env
* jest
* parcel-bundler

`index.html`

```html
<html>

<body>
  <h1>
    Testing 101
  </h1>
  <script src="./src/index.js"></script>
</body>

</html>
```

`index.js`

```
import './App';
```

`App.js`

```
// Empty file
```

`App.test.js`

```
// Empty file
```

## Run this app
* **note**  I was getting a **fsevents error** and [this helped get rid of it](https://github.com/expo/expo/issues/854):  (thanks Meekohi!)﻿
`$ npm run start`

## Open browser in `localhost:1234`
* You will see basic page `Testing 101`

`package.json`

```
// MORE CODE
"test": "jest --watchAll"
// MORE CODE
```

## What is a Testing Runner?
* It goes and runs your tests
* Jest does that for us
* We need to tell it whether or not we want it to watch our files continuously for when they update (like a Sass compiler) or if we want it to run our tests once
    - Shouldn't you always watch your code?
    - You could have a checker that checks to make sure all your tests pass before your code is deployed (lots of services that do this for you)
    - If this is what you are doing then you will only want to run your tests once
    - Jest gives you the option of configuring once or watch always

## Our first test
`$ npm test` 

* Our first test fails
* We need to have at least one test

`App.test.js`

```
test('Fake Test', () => {
  expect(true).toBeTruthy();
});
```

* expects are called **assertions**
