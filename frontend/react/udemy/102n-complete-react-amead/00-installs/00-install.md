# Stuff you need (setup)
## npm vs yarn
* Both do same thing, think ketchup vs mustard
* I will use `npm` 

## Node
* Webpack needs this
* V8 engine
* Install Node with `homebrew` using `$ brew install node`

### What version of Node did you install?

`$ node -v`

* Comes with `npm` built in (node package manager)

### What is npm?
* Enables us to install project dependencies

### What is yarn?
* `npm` and `yarn` do same thing
* You could install yarn with: `$ brew install yarn`

## Run the app
* [run the app](http://indecision.mead.io)
* [app repo](https://github.com/andrewjmead/react-course-2-indecision-app)

## Quickly add `eslint` using my `dotfiles`
### What is eslint?
* ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code
  - Rules in ESLint are configurable, and customized rules can be defined and loaded
  - ESLint covers both code quality and coding style issues

### My dotfiles
#### What are dotfiles?
* [article on what are dotfiles](https://www.freecodecamp.org/news/dive-into-dotfiles-part-1-e4eb1003cff6/)
* My [dotfiles](https://github.com/kingluddite/dotfiles) have an alias tied to a function that will do all of the following:
  - Install eslint node_modules needed
  - Create a `package.json`
  - Create an `.eslintignore` file
  - Create a `.gitignore` file
  - Create your main `.eslintrc` config file
* Go into the project you want to add `eslint`

* Type: `$ e-bp` + `return` and presto, you'll have all of the above

## package.json
* [The package.json guide](https://flaviocopes.com/package-json)

### A better .eslint
* Using[ Wes Bos eslint](https://github.com/wesbos/dotfiles/blob/master/.eslintrc) will add a lot of great React eslint rules
* This is included to show how easy it is to upgrade and alter your eslint rules to fit how you are coding
  - Replace the contents of your `.eslintrc` file with:

```
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "impliedStrict": true,
      "classes": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
  },
  "rules": {
    "no-debugger": 0,
    "no-alert": 0,
    "no-await-in-loop": 0,
    "no-return-assign": [
      "error",
      "except-parens"
    ],
    "no-restricted-syntax": [
      2,
      "ForInStatement",
      "LabeledStatement",
      "WithStatement"
    ],
    "no-unused-vars": [
      1,
      {
        "ignoreSiblings": true,
        "argsIgnorePattern": "res|next|^err"
      }
    ],
    "prefer-const": [
      "error",
      {
        "destructuring": "all",
      }
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "no-unused-expressions": [
      2,
      {
        "allowTaggedTemplates": true
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-console": 0,
    "import/prefer-default-export": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/display-name": 1,
    "react/no-array-index-key": 0,
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/accessible-emoji": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "radix": 0,
    "no-shadow": [
      2,
      {
        "hoist": "all",
        "allow": [
          "resolve",
          "reject",
          "done",
          "next",
          "err",
          "error"
        ]
      }
    ],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 80,
      }
    ],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "aspects": [
          "invalidHref"
        ]
      }
    ]
  },
  "plugins": [
    // "html",
    "prettier"
  ]
}
```

## Or you could install these packages if you don't use dotfiles

`package.json`

```json
// MORE CODE

"devDependencies": {
    "babel-eslint": "^10.0.2",
    "eslint": "4.10.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "2.7.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-prettier": "2.3.1",
    "eslint-plugin-react": "^7.4.0",
    "prettier": "1.8.2",
    "prettier-eslint-cli": "^4.4.0"
  }
// MORE CODE
```

`$ npm install` or just `$ npm i`

* **note** If `node_modules` are already installed this command won't reinstall them so it's safe to use again

## Global Installs and brew versus direct install
* On a mac you can use homebrew to install node (comes built-in with `npm`) and yarn
* You could also install `yarn` globally and directly with `$ npm i -g yarn`
* I prefer installing on Macs using homebrew but the choice up to you

## Take it for a test drive
* Create `junk.js` in site root
* Add

`junk.js`

```
console.log("yo");
```

* Save the file
* If the double quotes change to single quotes you know `prettier` and `eslint` is set up properly

## If you are using the `vim` editor
* Close `vim` and reopen and now **prettier** and **eslint** should be working in your project like a charm
* **note** Other editors will require different steps to make `eslint` work with `prettier`
  - A quick online search and in minutes you will be up in running in Sublime or VSCode

* Delete `junk.js` 
  - You don't need it

## Errors
### babel
`zsh: command not found: babel`

* Install this:

`$ npm i -g babel-cli`

### live-server
`zsh: command not found: live-server`

* Install this:

`$ npm i -g live-server`

## browserslist
* Is used to tell which browsers (and their versions) you want to support 
* It’s referenced by Babel, Autoprefixer, and other tools, to only add the polyfills and fallbacks needed to the browsers you target

`package.json`

* This configuration means you want to support the last 2 major versions of all browsers with at least 1% of usage (from the CanIUse.com stats), except IE8 and lower

```json
// MORE CODE
"babel": {
    "presets": [
      "env"
    ]
},
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 9"
],
"keywords": [],
// MORE CODE
```

* Install as dev dependencies
  - autoprefixer
  - postcss_loader

`$ npm i autoprefixer postcss-loader -D`

* And we remove `.babelrc` and just add babel to transpile (_based on the browser list what needs to be transpiled and what doesn't_)
* This may cause errors because you will need to install babel and I walk through that later
* If it causes errors just comment out the babel part until my notes talk about `.babelrc` and use this instead of the `.babelrc` file
