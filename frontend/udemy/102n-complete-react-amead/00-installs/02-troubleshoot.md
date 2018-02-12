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
