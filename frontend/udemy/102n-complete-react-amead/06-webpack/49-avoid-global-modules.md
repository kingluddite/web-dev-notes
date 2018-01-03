# Avoid Global Modules
* We installed 2 global modules
    - `babel cli`
    - `live-server`
* Our `package.json` no longer defines all the dependencies someone needs to run this app
    - They have no idea they need `babel-cli` and `live-server`
    - This causes team problems
    - On open source same thing because we are NOT giving them all the tools they need
* All apps are stuck using the same global version and that's not a good idea

## BEST PRACTICE
* Define all dependencies and dev-dependencies in your project
* Having to type out the full name is a pain
* It would be nice if we had a an alias to make us type less

## Step 1 - Uninstall global dependencies
`$ yarn global remove babel-cli live-server`

* **note** If you installed with npm use this:

`$ npm uninstall -g babel-cli live-server`

* Try to run eiter one

`$ babel` or `$ live-server`

* You will get `command not found:`

## Now install both modules locally
`$ yarn add live-server babel-cli`

* But if you run `$ babel` it will give you same error

`package.json`

```
"scripts": {
    "serve": "live-server public/",
    "build": 'babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch'
  },
```

* Run with yarn (in two separate tabs of terminal)

`$ yarn run serve`

`$ yarn run build`
