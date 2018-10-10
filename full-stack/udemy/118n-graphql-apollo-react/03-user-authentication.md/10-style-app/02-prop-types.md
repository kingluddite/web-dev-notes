# Prop Types

## Update Eslint for our current project
* We need to use a new `.eslintrc`
* We can delete the one in our client folder and overwrite the one in our server app root
* We will use Wes Bos' `.eslintrc`

### Add rules to `.eslintrc`
```
// MORE CODE

"extends": "airbnb",
"rules": {
  "react/jsx-filename-extension": 0
}

// MORE CODE
```

#### Wes Bos
`.eslintrc`

```
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
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
    "no-unused-vars": [
      1,
      {
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
        "printWidth": 100,
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

* You may need to overwrite some `eslint` rules and here's how you do that:

## Eslint disable one line
`// eslint-disable-line`

## Eslint more specific disable line
`// eslint-disable-line react/no-did-mount-set-state`

## Eslint turn off for entire page
`/* eslint react/no-did-mount-set-state: 0 */`

* This doesn't have to do with CSS or style
* Prop Types make your code bullet proof
* They save you time
* You should always use them in every react project

## static, defaultProps & propTypes
* Use this to help troubleshoot

### install PropTypes
`$ npm i prop-types`

### import prop-types
`import PropTypes from 'prop-types`

### Static definition to define our prop types
* **note** Look at the naming conventions used here
    - `PropTypes`, `prop-types` and `propTypes`

`President.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class President extends Component {
  static propTypes = {
    president: PropTypes.object,
  };

  render() {
    const { lastName } = this.props.president;
    return <div>{lastName}</div>;
  }
}

export default President;
```

* This is good but how do we validate an object with stuff in it?

### PropTypes.shape
* This allows us to pass in another object and we can define the props that are actually coming in

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class President extends Component {
  static propTypes = {
    president: PropTypes.shape({
      lastName: PropTypes.string,
    }),
  };

// MORE CODE
```

## We need our president lastName always to appear... (isRequired)
```
 // MORE CODE

export class President extends Component {
  static propTypes = {
    president: PropTypes.shape({
      lastName: PropTypes.string.isRequired,
    }),
  };

  // MORE CODE
```

* Now remove `lastName` of Washington from the `presidents` array of objects in `App.js` and you will see the prop type warning
* The code doesnt' break but it warns you that you are passing data that could break your app

```
const presidents = [
  { id: 1, lastName: 'Washington' },
  { id: 2, lastName: 'Adams', desc: '2nd President of U.S.' },
  { id: 3, lastName: 'Jeffereson' },
];
```

* We want some presidents to have a description

```
static propTypes = {
  president: PropTypes.shape({
    lastName: PropTypes.string.isRequired,
  }),
  desc: PropTypes.string.isRequired,
};
```

But we can't set this to required as it will throw warning error

* **note** we can't set `defaultProps` on a nested property

```
export class President extends Component {
  static propTypes = {
    president: PropTypes.shape({
      lastName: PropTypes.string.isRequired,
    }),
    desc: PropTypes.string,
  };

  static defaultProps = {
    desc: 'Description not available',
  };

  render() {
    const { lastName } = this.props.president;
    return (
      <div>
        <h3>{lastName}</h3>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}
```

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Presidents</h1>
        </header>
        {presidents.map(president => (
          <President key={president.id} president={president} desc={president.desc} />
        ))}
      </div>
    );
  }
}

// MORE CODE
```

![default props](https://i.imgur.com/mjFixTa.png)

* This let's you populate data that is missing

## Rules for prop types and props
* You should have a rule for every single prop type that is used in your components
* You must have either `isRequired` or a default prop
    - This will alert you anytime something is passed that shouldn't be
    - Saves you a ton of time debugging
    - This will make your components bulletproof
        + you will know what is going in and what is going out
        + Code reviewers, job interviews will be looking at your code to make sure you are using these
        + ESlint will complain to you to use them
    - You will be loved by your teammates

## Now you will see lots of eslint messages to update your code
* Absolute imports come before relative imports
    - This is an easy fix
    - Rearrange all your code to remove these errors
* `export class Signin extends Component {`
    - You already have an export at the bottom of the file so you need to remove the work `export` before `class`
* Add this rule to `.eslintrc`: `"import/no-extraneous-dependencies": 0,`
* I am not using redux so I think I can turn no-shadow off (Error from shadowing `genealogy` on line 70 of `UserGenealogies.js`)
    - [stackoverflow answer on this](https://stackoverflow.com/questions/37682705/avoid-no-shadow-eslint-error-with-mapdispatchtoprops)

## Fix all the prop types

* Install Prop Types in `client` folder

`$ npm i prop-types`

### Homework
* You need to work with all the eslint errors
* There are many
* Start at `client/index.js` and go into each file one by one to fix all the errors
* If eslint gives you a strange error you never heard of before, google it and look for solutions on the eslint documentation and stackoverflow
* If you get in trouble, here is a super similar site that will show you how I implemented PropTypes and other eslint fixes
    - `https://github.com/kingluddite/five-star-music`

