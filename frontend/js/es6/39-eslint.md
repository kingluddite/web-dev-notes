# ESLint
Indespensible code quality tool

* You may have used `jshint` or `jslint`
* But now everyone is moving over to ESLint
    - Why?
        + They have support for all of the new ES6 features

## What is [ESLint](http://eslint.org/demo/)?
It looks at your code and tells you what is wrong with it
* Get it configured properly to match your coding style
* Understand why the errors are happening
    - It the long run it will make you a much better developer

### What you need
* node.js and npm (install node and you get npm)
    - `$ node -v` (need version >= 4)
    - `$ npm -v` (need version >= 3)

### How to install ESLint
`$ npm install -g eslint`

### What version of ESLint?
`$ eslint --version`

Create a directory and add `bad-code.js`

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

### Add configuration file
`$ eslint --init`

### Run ESLint
`$ eslint bad-code.js`

Error on line 1, column 38

* ESLint by default doesn't know about arrow functions

## Add Settings to ESLint
* You can do this project by project or globally
* Many people prefer to do it project by project
    - Because there are different coding styles depending which team you are working on

### Create `.eslintrc` file

#### My current `.eslintrc` file

```json
{
  "extends": "airbnb",
  "env": {
    "browser": "true",
    "node": "true",
    "jquery": "true"
  },
  "rules": {
      "space-in-parens": ["error", "always"]
    },
  "plugins": ["html", "markdown"]
}
```

**Important**

`.eslintrc` is a JSON file so it must validate. [Use this site](http://jsonlint.com/) to make sure your JSON file validates.

* This is the config file for ESLint
* Files that begin with `.` are hidden files and by default are not visible

A ton of options
* All options are defined on website options and what they mean
* Environment (node, browser, es6, mongo...)
* rules (off(0), warn(1), error(2))

```json
{
  "env": {
    "es6": true,
    "browser": true,
    },
    "extends": "eslint:recommended",
    "rules": {
      "no-console": 0
      }
}
```

* We set our environments (ES6 and browser)
* We use `extends` to grab the recommended settings
* We overwrite our extends with our own rules

# Airbnb ESLint Settings

[Airbnb Style Guide](https://github.com/airbnb/javascript)

[config for ESList](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

We could air airbnb on project-by-project or globally, let's install it globally so we can use this on all our projects

```js
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install -g "$PKG@latest"
)
```

### Now run ESLint

`$ eslint bad-code.js`

Output is all of the errors following Airbnb guidelines.

`$ eslint bad-code.js --fix`

That cleans up most errors. Fix the others yourself. Read their documentation for reasons why the code is bad and needs to be fixed.

suggested `.eslintrc` file

`~/.eslintrc`

```json
{
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jquery": true
  },
  rules": {
    "no-unused-vars": [1, { "argsIgnorePattern": "res|next|^err" }],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [2, { "props": false }],
    "no-console": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/prefer-es6-class": 0,
    "radix": 0
  },
  "plugins": ["html", "markdown"]
}
```

## Line and File Specific Settings
If you use third party global objects like `ga` (Google Analytics) and `twttr` (Twitter). You will get `ga` or `twttr` not defined.

We can set globals inside this specific file

* Add this to the top of your js file

`/* globals twttr ga`

And now the `not defined` errors will go away for those 3rd party globals

* could do it as a global setting but probably better to do it file by file and just turn them off exactly where you need them

`Array.includes()` - part of ES2016 or ES7
* to use this, you'll have to polyfill it
* if Array.prototype does not have an includes() method, we will just add it to the prototype
    + in generally it is considered bad practice to modifly your prototype of the built ins like Array, Number and String
    + But if you are trying to be future friendly then you have to polyfill it so that it will work in all of the current browsers and older browsers and then when the browser does include `includes()`, we will be ahead of the game

[link to Array includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

Add the polyfill

```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}
```

run Eslint and you will see a ton of new errors

So if we add this line to the top of our file

`/* eslint-disable no-extend-native */`

It will turn off that error for the entire file. No we have 1 less error.

But just to disable and enable a rule per line do this:

```js
if (!Array.prototype.includes) {
  /* eslint-disable no-extend-native */
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    /* eslint-enable no-extend-native */
    more code...
    }
}
```

but if we fix 1 line we still have a ton of other errors in that polyfill. do I have to fix all of them?

No. You can disable a block of code like this.

```js
/* eslint-disable */
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {

    more code...
    }
}
/* eslint-enable */
```

## [ESLint Plugins](https://github.com/dustinspecker/awesome-eslint)
You can't lint directly from HTML or markdown. We need something that will scrape the JavaScript, lint it and tell you what is wrong with it.

We need to find it and it will show how to add it to `.eslintrc`

```json
{
  "env": {
    "es6": true,
    "browser": true,
    },
    "extends": "airbnb",
    "rules": {
      "no-console": 0
      },
      {
      "plugins": [
        "html"
      ]
    }
}
```

## eslint-plugin-html

* install `eslint-plugin-html` globally

`npm install -g eslint eslint-plugin-html`

`code-in-html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Linting code inside of HTML</title>
</head>

<body>
  <script>
    let age = 100;
    alert(age);
  </script>
</body>

</html>
```

I removed `.eslintrc` and that was using the global eslint file `~/.eslintrc`

Do the same for markdown

`$ npm install --save-dev eslint eslint-plugin-markdown`

but install it globally

`npm install -g eslint eslint-plugin-markdown`

Create a sample markdown file

```md
# Sample JavaScript file

var x = 100;
```

* use the markdown syntax

```json
{
  "extends": "airbnb",
  "env": {
    "browser": "true",
    "node": "true",
    "jquery": "true"
  },
  "rules": {
    "no-unused-vars": [1, { "argsIgnorePattern": "res|next|^err" }],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [2, { "props": false }],
    "no-console": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/prefer-es6-class": 0,
    "radix": 0
  },
  "plugins": ["html", "markdown"]
}
```

Now we can check our markdown file too

`$ eslint sample-markdown.md`

and it will tell us our JavaScript errors in markdown

### glob pattern

`$ eslint *.md`

All markdown files

Find all eslint options

`$ eslint --help`

**note** `--fix` option only works on pure JavaScript files (not markdown or html)

## Setting up Atom with ESLint
Just make sure you have a local .eslintrc file with the settings you want for your project or use (and set in preferences) to use your global file

## ESLint Passing code into your git repos
Use a hook to prevent people from pushing code that does not pass the eslintrc rules.

## Create a git folder using git
`$ git init es6-git`

## Change into the folder
`$ cd es6-git`

## Create a file
`$ touch code.js`

`code.js`

```js
var x= 100
```

## ESLint your code
`eslint code.js`

If you do not have an `.eslintrc` file in the root of your project it will look in the parent. If not there, it will continually check the parents until it finds one.

## Add a hook
This hook will prevent people from committing code that does not pass the rules inside the `.eslintrc` file.

## Examine the inside of the `.git/hooks` directory
These are premade hooks. Hooks is code that runs before things happen. You can stop those things from happening unless they pass a specific use case.

## Wait. .git is hidden?
If you have the `Tree View` package make sure `Hide Ignored Names` is not checked.

## Duplicate file and rename it
Duplicate `.git/hooks/commit-msg.sample` and rename duplicate to `commit-msg`

[Grab this gist](https://gist.github.com/wesbos/8aec9d2ff7f7cf9dd65ca2c20d5dfc23)

```
#!/bin/bash
files=$(git diff --cached --name-only | grep '\.jsx\?$')

# Prevent ESLint help message if no files matched
if [[ $files = "" ]] ; then
  exit 0
fi

failed=0
for file in ${files}; do
  git show :$file | eslint $file
  if [[ $? != 0 ]] ; then
    failed=1
  fi
done;

if [[ $failed != 0 ]] ; then
  echo "🚫🚫🚫 ESLint failed, git commit denied!"
  exit $failed
fi
```

### Troubleshoot hook
If your hook is not running, fix it's permissions

In the root of your project:

`$ chmod +x .git/hooks/commit-msg`

## had problems installing it

Addded a `package.json`

`$ npm init -y`

I installed

```
$ (
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

Added airbnb, 

`npm install --save eslint-config-airbnb`

and also add 

`$ npm install --save-dev eslint eslint-plugin-markdown, eslint-plugin-html`

and then add it to `~/.eslintrc`

```js
{
  "extends": "airbnb",
  "env": {
    "browser": "true",
    "node": "true",
    "jquery": "true"
  },
  "rules": {
    "no-unused-vars": [1, { "argsIgnorePattern": "res|next|^err" }],
    "arrow-body-style": [2, "as-needed"],
    "no-param-reassign": [2, { "props": false }],
    "no-console": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/prefer-es6-class": 0,
    "radix": 0
  },
  "plugins": ["html", "markdown"]
}
```

