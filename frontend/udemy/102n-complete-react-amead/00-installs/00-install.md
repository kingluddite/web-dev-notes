# Troubleshoot

## Uninstall jshint
* If you installed jshint globally time to delete it. You'll never need to use that again now that eslint is around.
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
* My dotfiles have an alias tied to a function
* Go into the project you want to add eslint
* Just type: `$ e-bp` + return and you will have a folder with all the eslint stuff added
* cd into `eslint-boilerplate` with `$ cd eslint-boilerplate`
* `$ mv .eslintignore ../`
* `$ mv .eslintrc ../`
* Manually copy and paste the dev dependencies of `package.json`

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

* And finall `$ yarn install`
* Close vim and reopen and now prettier and eslint should be working in your project like a charm

## Errors
### babel
`zsh: command not found: babel`

* Install this:

`$ yarn global add babel-cli`

### live-server
`zsh: command not found: live-server`

* Install this:

`$ yarn global add live-server`
