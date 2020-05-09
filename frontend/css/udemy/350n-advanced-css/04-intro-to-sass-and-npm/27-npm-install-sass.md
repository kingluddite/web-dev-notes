# Install Sass with Npm
* Node
* npm is a simple CLI to install packages
* npm comes bundled with node

## Install Node
nodejs.org

* Install installer or use homebrew

## In CLI
* node -v (do you have node?)
* Or use VSC integrated terminal

## Open project folder
* Inside your editor
* Install package.json with `$ npm init -y`
* Install Sass as an npm package

`$ npm install node-sass --save-dev`

Or the short way

`$ npm i node-sass -D`

* **note** `node-sass` is a module we only need for development (not production)
    - So we save it inside `package.json` as a dev-dependency instead of a dependency

`package.json`

```
// MORE CODE

  "devDependencies": {
    "node-sass": "^4.14.0"
  }
}
```

* We could install jquery too with `$ npm i jquery`
    - We do not need to use `-D` because jquery is not a tool for development but something our app needs in production

`package.json`

```
// MORE CODE

  "devDependencies": {
    "node-sass": "^4.14.0"
  },
  "dependencies": {
    "jquery": "^3.5.0"
  }
}
```

* If you want to remove jquery from dependencies
    - `$ npm uninstall jquery --save` or `$ npm uninstall jquery -S`


