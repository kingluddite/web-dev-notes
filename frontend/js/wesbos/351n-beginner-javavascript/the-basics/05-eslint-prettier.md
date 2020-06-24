# Code Quality Tooling with Prettier and ESLint
## Eslint
* [Try eslint](https://eslint.org/demo)
    - Change ECMA Version to 2020 (from dropdown)
* Add this code in demo

```
const age = 21;
```

* And you will see eslint error:

```
1:7 - 'age' is assigned a value but never used. (no-unused-vars)
```

* If you use log out the variable you will get rid of one error
* But you will also get additional console errors because by default you should not leave console.log function calls in production
* You can check:
    - Environments
    - Rules
* You can click on error and it will take you to documentation of that rule

## Prettier
* Entirely for formatting of your code
* [demo](https://prettier.io/playground/)

### Set up eslint and prettier
`$ npm init -y`

#### Wes Bos preconfig for eslint and prettier
* [Use Web Bos Eslint and Prettier setup](https://github.com/wesbos/eslint-config-wesbos)
* Run the following line in the Terminal

`$ npx install-peerdeps --dev eslint-config-wesbos`

## create a "dot" file
* Called "dot" because it begins with a "."
* Sometimes computers (like Mac) hide dot files from you
    - They are invisible files primarily used by developers

### dot file needs to be created in root `.eslintrc`
* You may need to show hidden files on mac or pc

```
{
  "extends": [
    "wesbos"
  ]
}
```

* This is an object that extends all stuff wesbos packed into his eslint config

### VS Code
* You need to install ESLint package
    - cmd + shift + x (opens extensions)
* `cmd` + `,` opens settings
* Click on this icon and that will `open settings.json`

![settings icon](https://i.imgur.com/6q64qfz.png)

`settings.json`

```
// MORE CODE

// Place your settings in this file to overwrite the default settings
{
    "editor.formatOnSave": true,
    // turn it off for JS and JSX, we will do this via eslint
    "[javascript]": {
        "editor.formatOnSave": true
    },
    "[markdown]": {
        "editor.formatOnSave": false
    },
    "[javascriptreact]": {
        "editor.formatOnSave": false
    },
    // tell the ESLint plugin to run on save
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    // Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
    "prettier.disableLanguages": [
        "javascript",
        "javascriptreact"
    ],
// MORE CODE
```

* Built-in formatter for VS Code is "beautifier" and it doesn't do as good as job as eslint and prettier

## Important! - We are disabling prettier plugin for VS Code
* Why?
    - Because we are using prettier through the ESLint plugin

## Test
* Save and see that your code is formatting 
