# Avoid Global Modules
* We installed 2 global modules
    - `babel cli`
        + Allows us to run the `babel` command from the command line
    - `live-server`
        + Allows us to run `live server`

## Both are great but not ideal for a few reasons
### Not giving all the tools developers will need
* Our `package.json` no longer defines all the dependencies someone needs to run this app
    - They have no idea they need `babel-cli` and `live-server`
    - This causes team problems (aka causes collaboration issues)
    - On an open source project people clone the repo but the don't have all the tools they need

### Global installs
* All apps are stuck using the same version using these global modules - Bad idea!!!
    - It is a **BEST PRACTICE** to define all the various dependencies and their exact version number in `package.json`

### A Pain to always type out full command in the terminal
* It would be nice if we had a an alias to make us type less
    - Like `babel script`

## Step 1 - Uninstall global dependencies (yarn or npm)
`$ yarn global remove babel-cli live-server`
`$ npm uninstall global babel-cli live-server`

* Try to run either one

`$ babel` or `$ live-server`

* You will get `command not found:`

## Now install both modules locally (yarn or npm)
`$ yarn add live-server babel-cli`

`$ npm i live-server babel-cli`

* Both now will not install globally on your computer but locally to your project
    - So both modules will be installed inside your app's `node_modules/`

`package.json`

```
// MORE CODE

"dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "live-server": "^1.2.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0"
  }
// MORE CODE
```

## Houston we now have a problem!
* But if you run `$ babel` it will an error 'No such file in directory'

## package.json scripts to the rescue!
* Instead of running our commands through the Terminal we will set up scripts to execute inside our `package.json` **scripts** property
    - Double quotes in json are imperative!
    - Inside our `scripts` property we have an object with all the scripts we want to run
        + We give key/value pairs
            * The key is what we use to run the script (`serve`)
            * The value is what will run when the key is called (`live-server public/`)
                - So to run that script `$ npm run serve`
            * It won't use the globally installed `live-server` but instead will use the locally installed `live-server` residing in `node_modules/`

## How again to we run the live-server script now?
`$ npm run serve`

* And the browser will open using live-server!

## Add babel now
* We just take the babel command we used globally and put it as the value and we'll use the term `build` to run the command

`package.json`

```
// MORE CODE

"scripts": {
    "serve": "live-server public/",
    "build": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
// MORE CODE
```

* Run with yarn (in two separate tabs of terminal)

`$ npm run serve`

`$ npm run build`

## Now our app is running as it did before!
* Using local live-server and babel-cli
* Now forever more we never need to type that super long babel command (time saver!)

## Recap the advantages
* All our dependencies are now inside package.json
    - Anyone that wants to start running our app they can clone and then begin coding
    - All the versions are defined so we can use the same version of these tools across all of our applications
* We created scripts to save us time and make it easier to get our app running
* We should use local modules going forward (BEST PRACTICE)

## Next
* Install Webpack as a local module
