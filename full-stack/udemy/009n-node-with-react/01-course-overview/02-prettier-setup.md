# Prettier Setup
* Will automatically format and standarize the JavaScript code you write

## What is it?
* [video](https://www.youtube.com/watch?v=hkfBvpEfWdA)

## Install
* Globally

`$ yarn global add prettier`

* Sublime Text 3
    - Install the JsPrettier through Package Control

![settings](https://i.imgur.com/velNSec.png)

`jsPrettier.sublime-settings`

```json
{
  // Turns on/off autoformatting on save
  "auto_format_on_save": true,

  // Fit code within this line limit
  "printWidth": 80,

  // Number of spaces it should use per tab
  "tabWidth": 2,

  // Use the flow parser instead of babylon
  "useFlowParser": false,

  // If true, will use single instead of double quotes
  "singleQuote": true,

  // Controls the printing of trailing commas wherever possible
  "trailingComma": false,

  // Controls the printing of spaces inside array and objects
  "bracketSpacing": true
}
```

## ESLint
### Install ESLint with sublime Text 3
[watch video tutorial](https://www.youtube.com/watch?v=lEtWF3_FR2w)

* Install ESLint globally

`$ npm i -g eslint`

* Install Package Control 3 (copy the code and paste into Sublime Text 3's console)

* `.eslintrc`

### Install eslint plugin for prettier
`$ yarn add -D prettier eslint-plugin-prettier`

### Use eslint-config-prettier to disable all the existing formatting rules
`$ yarn add --dev eslint-config-prettier`

## Create .eslintrc.json
`$ touch .eslintrc`

`.eslintrc`

```
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "comma-dangle": ["error", "never"]
  }
}
```

### What is my first step to find out what trouble I have?

Use SublimeText console and SublimeLinter debug mode

1. Check `Tools` -> `SublimeLinter` -> `Debug Mode`
2. Open console `View` -> `Show Console`
3. Then open any JS file and run `Tools` -> `SublimeLinter` -> `Lint This View`

* You know it's working when you see red borders like this:

![red borders](https://i.imgur.com/lQaMe1D.png)

* And the bottom of the window will show the error

![eslint errors](https://i.imgur.com/fqlD99m.png)
