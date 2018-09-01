# Install React Developer tools
* ![move to make it look like this](https://i.imgur.com/71BSHhM.png)
    - Move the React tab to the left, you'll use it a lot
    - change chrome theme (use gear to selec it)
* Select component in react tab, switch to console and type `$r`
    - and you will see that entire component
    - great way to underand they are objects and what's inside them

## You can set inputs and other values
$r.input = 'hello'
Then type $r and you'll see that you set the input inside React's component
so you have access to your live JavaScript components to play around with

## Linting in VS Code for react
* Add Eslint to VS code
* Add these dependencies

`$ npm i -D eslint eslint-config-airbnb eslint-plugin-react`

* After installing them you will get an error from VS code and the reason for the error is you are missing an `.eslintrc` file
* Create this file using

`$ eslint --init`

* If you get an error then install eslint globally

`$ npm i -g eslint`

## Answer these questions like this:
* How do you want to configure ESLint? Use popular style guide, Airbnb
* Do you use React? Yes
* What format? Javascript
* Do yo want to upgrade: yes

**note** You should see it did this:

* created `.eslintrc`

```
module.exports = {
    "extends": "airbnb"
};
```

* Swap that info with this:

```
module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
        "ecmascript": 6,
        "jsx": true
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "experimentalDecorators": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react",
  ],
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] } ]
  }
};
```

## vs code settings
* eslint - set eslint.autoFixOnSave: true
* f8 to show errors

## turn off eslint rules you don't want
* use f8 to find rule name
* open `.eslintrc.js` file and add rules

```
// MORE CODE
 rules: {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0
  }
};
```

## disable for just one line
`this.setState({ // eslint-disable-line`

* or be specific with what you want to turn off

`this.setState({ // eslint-disable-line react/no-did/mount-set-state`

* turn off rule for entire file

`/* eslint-disable-line react/no-did-mount-set-state: 0 */`
