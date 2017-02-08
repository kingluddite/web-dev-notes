# Getting Started With [ESLint](http://eslint.org/)
Must have code quality tool when writing JavaScript

## JSHint? JSLint?
Developers have now moved onto ESLint. Specifically because they have support for all the new ES6 features

## What is ESLint?
Hurts your feelings. Looks at your code and tells you what you are doing wrong

1. Configure it Properly based on your coding style
2. Understanding why are these errors happening

Doing both of those will make you a much better developer

You can manually take your code, go to the ESLINT webpage and it will tell you all the things you did wrong

The first time you use it will take you an hour or two to get it where you like it.

## Requirements for ESLint
* Node.js and npm

### Check if you have Node
`$ node -v`

Should have version 4 or up

### Check if you have npm
`$ npm -v`

Should have version 3 or up

## Using eslint on your machine

### Install eslint globally
`$ npm i -g eslint`

If you get a permission problem type:

`$ sudo npm i -g eslint`

### Checking eslint version
`$ eslint --version`

You need version 2 or up

## How do we use eslint
We want eslint to run either:

* On our command line
* In our Text Editor (Atom or Sublime or any other)
* As a Git hook before you commit your actual code

Here is the file we will use to test

`bad-code.js`

```js
var weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds' });
  }, 2000);
});

const tweets = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(['I like cake', 'BBQ is good too!']);
  }, 500);
});

Promise
  .all([weather, tweets])
  .then(responses => {
    const [weatherInfo, tweetInfo] = responses;
    console.log(weatherInfo, tweetInfo);
  });

const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()));
  })
  .then(responses => {
    console.log(responses);
  });
```

### Using the Command line with eslint
`$ eslint bad-code.js`

You will get an error. You need to create a `.eslintrc` config file

`$ eslint init`

For the following questions answer:
Answer the questions - press enter
Are you using ECMAScript 6 features y enter
Are you using ES6 modules N enter
Browser radio button selector and press enter
Do you use CommonJS - N enter
Do you use JSX? N enter
What style of indentation do you use?
Use downarrow on keyboard to select Spaces and press enter
What quotes do you use for strings?
Use downarrow on keyboard to select Single and press enter
What line ending do you use? Press enter on Unix
Do you require semicolons? Y enter
What format do you want your config file to be in?
Highlight JavaScript and press enter

Congrats. You just created your `.eslint` config file

Now type `eslint bad-file.js` and you will see all your errors

![all your eslint errors](https://i.imgur.com/K2Yydkx.png)

Now delete your `eslintrc.js` file and run `$ eslint init` again

This time answer:

[answer to eslint questions](https://i.imgur.com/vQ60nw2.png)

Run eslint with `$ eslint bad-code.js`

You will get 1 parsing error on line 1 column 38. `Unexpected >`

Eslint by default doesn't know ES6 so when it sees the fat arrow it can't process it and errors out

## Settings for eslint
You set them how you code and it will use that to tell you how you are coding

You can do it globally on your computer or you can do it project by project

I like project by project because you have different coding styles depending on what project you are working on

## Manually create .eslintrc
`$ touch .eslintrc`

**note** Macs hide files that begin with `.` by default

But if you open Atom you should see `.eslintrc`

Look at eslint [documentation](http://eslint.org/)

Environments - es6
Rules - lots

eslint is in JSON so you must use double quotes `""`

`.eslintrc`

```json
{
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true
  },
  "extends": "eslint:recommended"
}
```

Now run in terminal again:

`$ eslint bad-code.js`

![eslint manual errors](https://i.imgur.com/FBLYcKD.png)

You have console errors. How can you turn them off?

Add a rule

## 3 stages of rules
* Off - or use 0
* Warning or use 1 
* Error or use 2

Sometimes it helps to turn things on to warning to let you know they should not be there. Warnings are yellow. Errors are red.

Our run in 'extends' is a base rule with lots of recommendations
and we override that rule (kind of like css) with the 'rules'

Run eslint now with our new `.eslintrc`

1 error reject is defined but never used. Remove it from our code and run eslint again and we get no errors

But we have lots of errors it is not catching like:

* Why are we using var instead of let and const
* Stylistic errors with spacing

Let's look at the [AirBnB default](https://github.com/airbnb/javascript) which will give us a better place to start when we want to write cleaner, more consistent JavaScript






