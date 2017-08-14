# Setting up the Production Workflow
* Use AOT Ahead of Time Offline Compilation

`tsconfig.aot.json`

```
{
  "compilerOptions": {
    "module": "es2015",
    "target": "es6",
    "moduleResolution": "node",
    "noImplicitAny": false,
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "outDir": "./public/js/app"
  },
  "exclude": ["node_modules", "public/js", "assets/app/polyfills.ts"],
  "angularCompilerOptions": {
    "skipMetadataEmit": true
  }
}
```

* This will setup a specific configuration for the typescript compilation
* We will use the Angular2 compiler for that and it needs some specific options
* The module will be changed from common to es2015 to use ES6 modules
* Copy the `tsconfig.json` to the `tsconfig.aot.json`

`webpack.config.prod.js`

```js
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');

module.exports = webpackMerge.smart(commonConfig, {
  entry: {
    app: './assets/app/main.aot.ts'
  },

  output: {
    path: path.resolve(__dirname + '/public/js/app'),
    filename: 'bundle.js',
    publicPath: '/js/app/',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'babel-loader?presets[]=es2015',
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?aot=true&genDir=public/js/app'
        ]
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ]
});
```

## main.aot.ts
* Create this file in `/assets/app/main.aot.ts`
* Copy `main.ts` into `main.aot.ts`

`main.aot.ts`

```js
import './polyfills';

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

## final package.json
```
{
  "name": "peh2-seed-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "build": "del-cli public/js/app && webpack --config webpack.config.dev.js --progress --profile --watch",
    "build:prod": "del-cli public/js/app && ngc -p tsconfig.aot.json && ngc -p tsconfig.aot.json && webpack --config webpack.config.prod.js --progress --profile --bail && del-cli 'public/js/app/**/*.js' 'public/js/app/**/*.js.map' '!public/js/app/bundle.js' '!public/js/app/*.chunk.js' 'assets/app/**/*.ngfactory.ts' 'assets/app/**/*.shim.ts'"
  },
  "dependencies": {
    "@angular/animations": "4.3.4",
    "@angular/common": "~4.3.1",
    "@angular/compiler": "~4.3.1",
    "@angular/compiler-cli": "^4.3.4",
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
    "path": "^0.12.7",
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
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
    "del-cli": "^1.1.0",
    "html-loader": "^0.5.1",
    "raw-loader": "^0.5.1",
    "typescript": "^2.4.2",
    "webpack": "^3.5.3",
    "webpack-merge": "^4.1.0"
  }
}
```

`$ npm run build`
`$ npm run build:prod`
`$ npm start`

* Check the network after build:prod and you should see the file size is a lot small
* If we gzip it too it will be even smaller
