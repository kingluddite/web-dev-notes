# Installing development Dependencies and settings
* We are using Webpack 2 to build this project

## Install Webpack
`$ yarn add -D webpack webpack-merge angular2-template-loader awesome-typescript-loader del-cli html-loader typescript angular2-router-loader raw-loader`

* `webpack-merge` - Will merge multiple configuration files to be able to have different processes for the production and development workflow
* `angular2-template-loader` - This will enable us to outsource our templates into separate files and load them correctly
* `awesome-typescript-loader` - This is used to compile our TypeScript to JavaScript
* `del-cli` - Enables us to delete files/folders in the course of the build process
* `html-loader` - Enables us to load our templates correctly, the Angular2 template loader loads the connection correctly and the html loader to load the files correctly
* `typescript` - The `awesome-typescript-loader` ALWAYS needs this locally installed even if we have it globally installed on our machine
* `angular2-router-loader` - Let's us use lazy loading
* `raw-loader` - Just lets you simply copy a file without doing anything with it but just copy it

`package.json`

```json
{
  "name": "peh2-seed-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "@angular/common": "~4.3.1",
    "@angular/compiler": "~4.3.1",
    "@angular/core": "~4.3.1",
    "@angular/forms": "~4.3.1",
    "@angular/http": "~4.3.1",
    "@angular/platform-browser": "~4.3.1",
    "@angular/platform-browser-dynamic": "~4.3.1",
    "@angular/platform-server": "~4.3.1",
    "@angular/router": "~4.3.1",
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "core-js": "^2.5.0",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "hbs": "~4.0.1",
    "morgan": "~1.8.1",
    "rxjs": "^5.4.3",
    "serve-favicon": "~2.4.2",
    "zone.js": "^0.8.16"
  },
  "devDependencies": {
    "@types/core-js": "^0.9.42",
    "@types/node": "^8.0.20",
    "angular2-router-loader": "^0.3.5",
    "angular2-template-loader": "^0.6.2",
    "awesome-typescript-loader": "^3.2.2",
    "del-cli": "^1.1.0",
    "html-loader": "^0.5.1",
    "raw-loader": "^0.5.1",
    "typescript": "^2.4.2",
    "webpack": "^3.5.3",
    "webpack-merge": "^4.1.0"
  }
}
```

## Set up our Webpack workflow
`$ touch tsconfig.json`

* Place in project root
* This is required for the compilation of TypeScript and will be used by `awesome-typescript-loader`

`/tsconfig.json`

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "noImplicitAny": false,
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
    },
    "exclude": ["node_modules", "public/js"]
}
```

* Let's us use Angular2 Decorator and Metadata
* I also use exclude to make sure I don't recompile any third party packages or any code in the `public/js`

## Webpack Config
`webpack.config.common.js`

```js
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './assets/app/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      }
    ]
  }
};
```

* `assets/app/main.ts` - This is the file that bootstraps my Angular2 app (e.g. starts it)
* We add `.js` and `.ts` so it will add those extensions so I don't have to type them
* **Important** - When using Webpack Beta 26 or higher, you MUST ALWAYS append `-loader` after the loader name
    - Example:
        + So `loader: 'html'` becomes `loader: 'html-loader'`
* We use the `raw-loader` to simply copy our css over to the build folder

* This will hold a general setup we will use in both the development and the production workflow
* Also create the following two files
    - `webpack.config.dev.js`
    - `webpack.config.prod.js`

