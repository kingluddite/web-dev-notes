# Troubleshoot

## scss not showing sourcemaps
* Took awhile and shut down and restarted and it worked

## Open browser with webpack
* Remove this code
* Was causing issues with not closing down port 8080

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "webpack",
    "dev-server": "webpack-dev-server & open http://localhost:8080/"
  },

// MORE CODE
```

* Update to:

```
// MORE CODE

  "scripts": {
    "build": "webpack",
    "dev-server": "webpack-dev-server"
  },

// MORE CODE
```

## can't compile CSS or SCSS
* Not sure how to fix this error
* Did a reboot and it went away
* Removed node_modules and package-lock.json and reinstalled still didn't work

`$ rm -rf node_modules && yarn cache clear --force && yarn install`
`$ rm -rf node_modules && npm cache clear --force && npm install`

### rebuild node-sass
`$ npm rebuild node-sass`

## Best solution find port 8080 and kill it (it wasn't properly shut down)
```
lsof -n -i4TCP:8080
```

* Then kill that port with something like `$ kill -9 2534`

## webpack-dev-server
* Was getting index.js not found in node_modules webpack-dev-server/client/index.js
    - The file was there, I just deleted it and crated another index.js and it worked

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
