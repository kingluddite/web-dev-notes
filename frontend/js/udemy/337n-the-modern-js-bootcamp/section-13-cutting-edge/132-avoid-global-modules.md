# Avoiding Global Modules
* When sharing projects you want everything available to your team member
* If we share our boilerplate code your team won't have `babel-cli` or live-server and we need them to have this
* So don't install modules globally but have them all local to your project so everyone can just `$ npm i` and start working on your app

## Uninstall global npm modules
`$ npm uninstall -g babel-cli live-server`

## Now installl those modules locally
`$ npm i -D babel-cli live-server`

## Houston we have a problem
* By installing these modules locally, we no longer have access to them locally

`$ live-server public`

* The above command no longer works because `live-server` is no longer installed

### But why does our build command still work?
`$ npm run build`

* The reason this command is working is that it is running from a **script**
* **note** When you run commands from a script in `package.json` we get access to all of our dependencies "as if they were installed globally!"
    - This is why I can still access `babel` from inside of the build script

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env --watch"
  },

// MORE CODE
```

* But if you try to access `babel` from terminal it would fail

`$ babel --help`

* Should not work (`TODO` I uninstalled globally but babel command in terminal still works)

## To get live-server working
* We just need to add another script in `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public",
    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env --watch"
  },

// MORE CODE
```

## Now run with
* Make sure you have babel running (and watching) in other tab with `$ npm run build`

### And run live-server

`$ npm run serve`

* And live-server works again!

## Bottom line
* Now all our app's dependencies are self-contained
* You push to github and all team members can pull and run everything they need

