# Stuff you need (setup)
**note** we are using yarn for installs but if you ever get an error installing with yarn just revert to installing with `npm` (the two are supposed to be the same but sometimes there are glitches -- currently I prefer to use yarn as it is faster)

* `node.js`
    - webpack needs this
    - > v8
    - install with brew
    - `$ node -v`
    - comes with npm (node package manager)
* npm
    - enables us to install project dependencies
* yarn
    - npm and yarn do same thing
    - `$ brew install yarn`

## Run the app
* [run the app](http://indecision.mead.io)
* [checkout the final code](https://github.com/andrewjmead/react-course-2-indecision-app)
* 
# Troubleshoot

## ESLint replaces jshint/jslint
* If you don't know what jshint or lint is, skip this section

### Uninstall jshint
* If you installed `jshint` globally time to delete it. You'll never need to use that again now that eslint is around.
* You may see warnings to set this `"esversion": 6` if you see that warning it is a jshint warning
    - I use eslint but never get eslint errors because jshint overrides eslint
    - Delete jslint with this:

`$ npm uninstall -g jshint`

* Close your vim files and reopen this and if you have eslint setup, you should see it working and that with prettier should be checking for errors and prettier should autoformat your JavasScript every time you save (This is a huge time saver and helper)

* If you load up server and babel in 2 terminal tabs but don't see sight make sure both were loaded in correct folders
* Many times I have my notes tab open and that is where I try to start the server in

## Why are my new aliases not working?
* With my dotfiles you just need to refesh your zshrc with `$ source ~/.zshrc`

## Add eslint
* [This is a great article](https://medium.com/@eliotjunior/prettier-eslint-facebook-code-quality-the-auto-magical-react-styling-tutorial-19481acb10dd) to get React, eslint, prettier set up

`$ ./node_modules/.bin/eslint --init`

* That will ask you a bunch of questions to help create a file that looks like this:

`eslintrc.json`

```js

{   "globals": {
        "document": true,
        "window": true,
        "localStorage": true
    },
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "arrowFunctions": true,
        "binaryLiterals": false,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "forOf": true,
        "generators": true,
        "modules": false,
        "objectLiteralComputedProperties": true,
        "objectLiteralDuplicateProperties": false,
        "objectLiteralShorthandMethods": true,
        "objectLiteralShorthandProperties": true,
        "octalLiterals": false,
        "regexUFlag": false,
        "regexYFlag": false,
        "restParams": true,
        "spread": true,
        "superInFunctions": true,
        "templateStrings": true,
        "unicodePointEscapes": true,
        "globalReturn": false
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prop-types": 0,
        "semi": ["error", "never"],
        "no-console": "off",
        "arrow-parens": [2, "as-needed", { "requireForBlockBody": false }],
        "max-len": ["error", 500],
        "no-param-reassign": "off",
        "no-undef": "off",
        "arrow-body-style": "off",
        "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
        "linebreak-style": "off",
        "newline-per-chained-call": "off",
        "prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "no-unneeded-ternary": "off",
        "no-plusplus": "off",
        "react/jsx-no-bind": [0, {"allowBind": true}],
        "class-methods-use-this": ["error", { "exceptMethods": ["setToken", "getProfile", "getToken", "logout"] }] 
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
}
```

### My dotfiles
* My dotfiles have an alias tied to a function
* Go into the project you want to add eslint
* `$ take eslint`
* type: `$ e-bp` + `return` and you will have a folder with all the eslint stuff 
* `$ mv node_modules ../`
* `$ mv package.json ../`
* `$ mv .eslintignore ../`
* `$ mv .gitignore ../`
* `$ mv .eslintrc ../`
* `$ b (moves back a directory`
* `$ rm -rf eslint`

## Install all those packages
`$ yarn install`

* `$ yarn install`
* You moved `node_modules` so they are already installed but it doens't hurt to make sure they are all there

```json
// more code
"devDependencies": {
   "eslint": "4.10.0",
   "eslint-config-airbnb": "^16.1.0",
   "eslint-config-prettier": "2.7.0",
   "eslint-plugin-import": "^2.7.0",
   "eslint-plugin-jsx-a11y": "^6.0.1",
   "eslint-plugin-prettier": "2.3.1",
   "eslint-plugin-react": "^7.4.0",
   "prettier": "1.8.2",
   "prettier-eslint-cli": "^4.4.0"
 },
// more code
```

## Take it for a test drive
* create `junk.js` in site root
* Add

`junk.js`

```
console.log("yo");
```

* Save the file
* If the double quotes change to single quotes you know prettier and eslint is set up properly

## If you are using the vim editor
* Close `vim` and reopen and now **prettier** and **eslint** should be working in your project like a charm
* **note** Other editors will require different steps to make eslint work with prettier
  - The good news is a quick online search and in minutes you will be up in running in Sublime or VSCode

* Delete `junk.js` 
  - You don't need it

## Errors
### babel
`zsh: command not found: babel`

* Install this:

`$ yarn global add babel-cli`

### live-server
`zsh: command not found: live-server`

* Install this:

`$ yarn global add live-server`

`package.json`

```json
// MORE CODE
"babel": {
    "presets": [
      "env"
    ]
},
"browserslist": [
  "> 1%",
  "ie > 9"
],
"keywords": [],
// MORE CODE
```

* I'm only supporting browsers that more than 1% of people use
* And I'm supporting IE > 9

* Install as dev dependencies
  - autoprefixer
  - postcss_loader

`$ yarn add autoprefixer postcss_loader -D`

* And we remove `.babelrc `and just add babel to transpile (based on the browser list what needs to be transpiled and what doesn't)
* This may cause errors because you will need to install babel and I walk through that later
* If it causes errors just comment out the babel part until my notes talk about `.babelrc` and use this instead of the .babelrc file
* **takeaway** I like less files so if I can put babel code inside `
