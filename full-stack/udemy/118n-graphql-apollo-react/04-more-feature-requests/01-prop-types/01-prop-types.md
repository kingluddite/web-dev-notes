# Prop Types
* As your app grows, you can catch a lot of bugs with typechecking
* For some applications, you can use JavaScript extensions like `Flow` or `TypeScript` to typecheck your whole application
* But even if you don’t use those, React has some built-in typechecking abilities
* To run typechecking on the props for a component you can use PropTypes
* This doesn't have to do with CSS or styles
* static, defaultProps & propTypes help when troubleshooting

### Look at the naming conventions used here
* `PropTypes`, `prop-types` and `propTypes`
* They are each used when defining prop types so take care not to misspell them

## Why use prop types?
1. Prop Types help make your code bullet proof
2. They save you time
3. You should always **use them in every react project**

### Install all the stuff you need from eslint
* Add `-D` to add the following as `devDependences`
* Add these inside your `package.json`

`$ npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-config-prettier eslint-plugin-react react-testing-library prettier eslint-plugin-prettier husky pretty-quick`

## You can have multiple `.eslintrc` files but they will cascade
* To start off put `.eslintrc` in the root of your app
* Once you add these you will have much more strict React rules
  - (One example of what you'll have to add) You'll need to add PropTypes

## More on eslint
* We have an `.eslintrc` in our app's root

## Run eslint from the terminal
`$ eslint .`

* You should see the terminal tells you errors you need to fix

* After a few moments you'll see you need to destructure `/models/Cologne.js`

`Cologne.js`

```
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// MORE CODE
```

* Change it to:

```
const mongoose = require('mongoose');

const { Schema } = mongoose;

// MORE CODE
```

* If you run it `$ eslint .` again you'll see you have 1 less error
* Do the exact same thing for `User.js`
* We also see warnings where we are not using `email` in `resolvers.js`

`resolvers.js`

```
// MORE CODE

signinUser: async (root, { username, email, password }, { User }) => {

// MORE CODE
```

* Change it to:

```
// MORE CODE

signinUser: async (root, { username, password }, { User }) => {

// MORE CODE
```

* Run eslint again

`$ eslint .`

* All our server errors from eslint are gone

## eslint on client
* We will add a new file `.eslintrc` in the `client` folder
* We will use Wes Bos' `.eslintrc`

### Wes Bos (Thanks Wes!)
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
    "prettier"
  ]
}
```

## No new `.prettierrc`
* Now our prettier is baked inside our `.eslintrc` so we don't' need a separate file

## Take it for a test drive
* I like to shut down my text editor `Vim`, `Sublime Text` or `VS Code` and open them again
  - I do this because sometimes you need to "jump start" eslint into working

## Create a new branch feature request
`$ git checkout -b proptypes`

## Better code
* We now are using a way more powerful eslint file
* It will help us write better code and alert us if we are not writing React, JavaScript properly

## Install the prop-types package
`$ cd client && npm i prop-types`

### Using prop types
1. import them

`import PropTypes from 'prop-types`

2. We write prop types differently when they are SFC or CBC
  * Let's deal with SFC prop types

### SFP prop type Example
* Let's show an example of how we can implement prop types
* Open `client/src/index.js`

`index.js`

```
// MORE CODE

const Root = ({ refetch, session }) => (
  <Router>

// MORE CODE
```

* We get this prop now:

`react/prop-types: 'refetch' is missing in props validation`

* This is how we fix the warning
* **note** missing prop types don't break code they are just warning

## Add prop types
`index.js`

```
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types'; // add this line


const Root = ({ refetch, session }) => (
  <Router>

// MORE CODE

Root.propTypes = {
  refetch: PropTypes.func,
  session: PropTypes.object,
};

Root.defaultProps = {
  refetch: undefined,
  session: null,
};

const RootWithSession = withSession(Root);

// MORE CODE
```

## And we'll look at a class based use of prop types (CBC)

`Error.js`

```
import React from 'react';

const Error = ({ error }) => {
  return <p>{error.message}</p>;
};

export default Error;
```

* And we'll add prop types (We'll also convert from a SFC to a CBC):

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component {
  static propTypes = {
    error: PropTypes.object,
  };

  static defaultProps = {
    error: {},
  };

  render() {
    const { error } = this.props;
    return <p>{error.message}</p>;
  }
}

export default Error;
```

## Homework
* Go through all react files and add the necessary Prop Types
* I've added prop-types to all the following files (use github repo to compare)

### Prop Types added to:
* /client/src/index.js
* Error.js
* Navbar.js
* NavbarAuth.js
* Signin.js
* Signout.js
* Signup.js
* CologoneItem.js
* Profile.js
* UserColognes.js
* UserInfo.js

### Other fixes
`Signin.js`

```
// MORE CODE

<button
  className="button-primary"
  disabled={loading || this.validateForm()}
>

// MORE CODE
```

* warning: `react/button-has-type: Missing an explicit type attribute for button`
* Fix with:

```
// MORE CODE

<button
  type="submit"
  className="button-primary"
  disabled={loading || this.validateForm()}
>

// MORE CODE
```

## Wrap inputs in label tags
* Warning `jsx-a11y/label-has-for: Form label must have ALL ...following types of associated control: nesting, id`
* This is for accessibility

`Signin.js`

```
// MORE CODE

<form
  className="form"
  onSubmit={event => this.handleSubmit(event, signinUser)}
>
  <label htmlFor="username">
    <input
      type="text"
      name="username"
      id="username"
      placeholder="Username"
      onChange={this.handleChange}
      value={username}
    />
    Username
  </label>
  <label htmlFor="password">
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      onChange={this.handleChange}
      value={password}
    />
    Password
  </label>
  <div>
    <button
      type="button"
      className="button-primary"
      disabled={loading || this.validateForm()}
    >
      Signin
    </button>
    {error && <Error error={error} />}
  </div>
</form>

// MORE CODE
```

### Problems with eslint
* Sometimes you will get an error that you don't know what it is or why it is used
* You usually find an answer using the eslint documentation or doing a google search
* But sometimes you can't figure it out
* Example

`Signin.js`

* I get this error: `no-shadow: 'signinUser' is already declared in the upper scope.`

```
// MORE CODE

handleSubmit = (event, signinUser) => {
  const { history, refetch } = this.props;
  event.preventDefault();
  signinUser().then(async ({ data: { signinUser } }) => {

// MORE CODE
```

* And this would turn the rule off for the whole page:

```
// MORE CODE

signinUser().then(async ({ data: { signinUser } }) => {
  /* eslint no-shadow: 0 */

// MORE CODE
```

* So if you can't figure it out you can use one of the solutions below to turn off the rule if you think it is ok to do:

### Ways to manipulate eslint
#### Eslint is bothering you
* You may need to overwrite some `eslint` rules and here's how you do that:

#### Eslint disable one line
`// eslint-disable-line`

#### Eslint more specific disable line
`// eslint-disable-line react/no-did-mount-set-state`

#### Eslint turn off for entire page
`/* eslint react/no-did-mount-set-state: 0 */`


### Other ways to use PropTypes
* Here are just a few other examples to explain the finer points of using prop types
* I'll use a fictitious code base to give examples

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
* The code doesn't' break but it warns you that you are passing data that could break your app

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

* But we can't set this to required as it will throw warning error

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

* This let's you populate data that is missing

## Rules for prop types and props
* You should have a rule for every single prop type that is used in your components
* You must have either `isRequired` or a default prop
    - This will alert you anytime something is passed that shouldn't be
    - Saves you a ton of time debugging
    - This will make your components bulletproof
        + You will know what is going in and what is going out
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
* I am not not using redux so I think I can turn no-shadow off
    - [stackoverflow answer on this](https://stackoverflow.com/questions/37682705/avoid-no-shadow-eslint-error-with-mapdispatchtoprops)

### Homework/Practice
* You need to work with all the eslint errors
* There are many
* Start at `client/index.js` and go into each file one by one to fix all the errors
* If eslint gives you a strange error you never heard of before, google it and look for solutions on the eslint documentation and stackoverflow
* If you get in trouble, here is a super similar site that will show you how I implemented PropTypes and other eslint fixes
* [Use this to see what prop-types I added](https://github.com/kingluddite/118e-five-star-cologne/commit/7e82fe85f20b3d36a528ef23a467db51ce816d2c)

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add proptypes feature`

### Push the branch to origin
`$ git push origin proptypes`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add proptypes feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
        - Green is code added
        - Red is code removed
        - All other code has not been modified
* Review all your changes
* If all looks good hit the `back` button in the browser
* Create a PR
* And click `Merge pull request` button
* Click `Confirm merge` button
* Then click Delete branch (You will see the color purple and that `Pull request successfully merged and closed`)

![PR successful](https://i.imgur.com/ota3hx1.png)

* Click `Delete branch` button to delete the remote branch
   - You don't need it anymore
   - Get in the habit of `pruning` your branches so they don't grow uncontrollably

## Time to sync up
* Right now your master branch on your remote GitHub is different than your master branch locally
* Locally your master branch doesn't have the new feature `proptypes` added
* To prove this checkout of your `proptypes` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `proptypes` are gone!
* View your app in the browser and it also shows now sign of your `proptypes` feature!
* If you stop your server `ctrl` + `c`

## Check the status
`$ git status`

* You will see this:

```
On branch master
nothing to commit, working tree clean
```

## But this doesn't make sense?
* Your remote master branch and your local master branch are different

## Time to fetch
* You need to do a fetch

`$ git fetch`

## Compare local with remote
`$ git diff master origin/master`

* That will compare the local branch `master` with the github remote branch `origin/master`
* Now just press `spacebar` to navigate through all the changes
   - Red is removed
   - Green is added
   - No color is unchanged
* Press `q` to quit out of git `diff`

## Show local branches
`$ git branch`

* The asterisk is the currently selected branch
* Type `q` to exit out of list of branch pages

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* You now see that our `proptypes` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d proptypes`

* That will let you know the branch was deleted with something like:

`Deleted branch proptypes (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

## Next - Add like/unlike cologne functionality

## Additional Resources
* [What are prop types in react](https://reactjs.org/docs/typechecking-with-proptypes.html)
* [What is react Flow](https://www.youtube.com/watch?v=L0nJTyHBTtE)
* [What is TypeScript and why should I use it](https://www.youtube.com/watch?v=4mRsiFoDO6k)
* [Use TypeScript with React](https://www.youtube.com/watch?v=tS6czSZW2oo)
* [Install eslint with vscode and prettier](https://www.youtube.com/watch?v=YIvjKId9m2c)
* [static propTypes vs react.PropTypes](https://stackoverflow.com/questions/39587496/static-proptypes-vs-react-proptypes/39683633)
* [default props in React](https://blog.logrocket.com/a-complete-guide-to-default-props-in-react-984ea8e6972d)
* [How to structure an HTML form](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/How_to_structure_an_HTML_form)
* [Button type is important](https://dev.to/claireparker/why-its-important-to-give-your-html-button-a-type-58k9)
