# Stuff you need (setup)
**note** we are using yarn for installs but if you ever get an error installing with yarn just revert to installing with `npm`
* `yarn` and `npm` supposed to be the same but sometimes there are glitches -- currently I prefer to use yarn as it is faster

* `node.js`
    - webpack needs this
    - > v8
    - Install with `homebrew`
    - `$ node -v`
    - Comes with `npm` (node package manager)
* `npm`
    - Enables us to install project dependencies
* `yarn`
    - `npm` and `yarn` do same thing
    - `$ brew install yarn`

## Run the app
* [run the app](http://indecision.mead.io)
* [checkout the final code](https://github.com/andrewjmead/react-course-2-indecision-app)

## Quickly add eslint using my dotfiles
* My [dotfiles](https://github.com/kingluddite/dotfiles) have an alias tied to a function
* Go into the project you want to add `eslint`
* `$ take eslint`
* Type: `$ e-bp` + `return` and you will have a folder with all the `eslint` stuff 
```
$ mv node_modules ../
$ mv package.json ../
$ mv .eslintignore ../
$ mv .gitignore ../
$ mv .eslintrc ../
$ b
$ rm -rf eslint
```

* `b` moves up a directory
* Be careful when using `rm` as it is destructive to your files/folders

## Install all those packages
`$ yarn install`

* `$ yarn install`
* You moved `node_modules` so they are already installed
    - If they are already installed this command won't reinstall them so it's safe to use

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

* And we remove `.babelrc `and just add babel to transpile (_based on the browser list what needs to be transpiled and what doesn't_)
* This may cause errors because you will need to install babel and I walk through that later
* If it causes errors just comment out the babel part until my notes talk about `.babelrc` and use this instead of the `.babelrc` file
