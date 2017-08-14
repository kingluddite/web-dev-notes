# Update to Angular 4

* Since Angular 4 doesn't break Angular 2 code
* We only need to change our build process and the respective config files
* You don't need to change any of your Angular 2 application code.

1) Let's start by updating the `package.json` :

First of all, we need to install Angular 4 and you can do this by running:

yarn add @angular/core @angular/common @angular/animations @angular/platform-browser @angular/platform-browser-dynamic @angular/forms @angular/http @angular/router @angular/compiler @angular/compiler-cli 

and possibly (but not required) also

yarn add @angular/platform-server @angular/upgrade 

Of course we should also update the polyfills and dependencies of Angular:

yarn add core-js zone.js rxjs 

After running all these commands, your `package.json` file should hold the following dependencies  (version numbers may vary):

"dependencies": {
  "@angular/animations": "^4.0.0",
  "@angular/common": "^4.0.0",
  "@angular/compiler": "^4.0.0",
  "@angular/compiler-cli": "^4.0.0",
  "@angular/core": "^4.0.0",
  "@angular/forms": "^4.0.0",
  "@angular/http": "^4.0.0",
  "@angular/platform-browser": "^4.0.0",
  "@angular/platform-browser-dynamic": "^4.0.0",
  "@angular/platform-server": "^4.0.0",
  "@angular/router": "^4.0.0",
  "@angular/upgrade": "^4.0.0",
  "body-parser": "~1.15.2",
  "cookie-parser": "~1.4.3",
  "debug": "~2.2.0",
  "express": "~4.14.0",
  "hbs": "~3.1.0",
  "morgan": "~1.6.1",
  "reflect-metadata": "^0.1.3",
  "core-js": "^2.4.1",
  "rxjs": "^5.2.0",
  "zone.js": "^0.8.5",
  "serve-favicon": "~2.3.0"
},
Let's now work on the devDependencies :

You may replace the section in the `package.json`  (as we created it in this module) with the following versions:

"devDependencies": {
  "@types/core-js": "0.9.36",
  "@types/node": "^6.0.45",
  "angular-router-loader": "^0.5.0",
  "angular2-template-loader": "^0.5.0",
  "awesome-typescript-loader": "^3.1.2",
  "del-cli": "^0.2.0",
  "html-loader": "^0.4.4",
  "raw-loader": "^0.5.1",
  "ts-loader": "^2.0.3",
  "typescript": "^2.1.4",
  "webpack": "^2.2.1",
  "webpack-merge": "^4.1.0"
}
With that, we should have all the packages and versions we need.

2) Time to use these new packages to tweak our webpack configs:

In the `webpack.common.config.js`  file, we'll remove the .ts  loaders and the ContextReplacementPlugin . 

Since we use Webpack 2 (final) now, we also should switch to the new module.rules  syntax (learn more).

Your file should look like this thereafter:

```
var webpack = require('webpack');
 
module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },
 
    resolve: {
        extensions: ['.js', '.ts']
    },
 
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            }
        ],
        exprContextCritical: false
 
    }
};
```

Since we removed the `.ts` loaders here, we of course need to add them to the other two files (`webpack.config.dev.js`  and `webpack.config.prod.js` ).

Let's do this - starting with `webpack.config.dev.js` :

```
var path = require('path');
 
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
 
module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
 
    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        publicPath: "/js/app/",
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader', options: {
                        transpileOnly: true
                    }},
                    {loader: 'angular2-template-loader'},
                    {loader: 'angular-router-loader'}
                ]
            }
        ]
 
    }
});
```
What changed? 

a) The output path got changed to an absolute one, using Node's path helper

b) The rules for `.ts`  files were added. Here, we also changed the name of `angular2-router-loader`  to `angular-router-loader` . That's the current name of this package.

Notice the `transpileOnly: true`  option on the `awesome-typescript-loader` . We need that option, otherwise we'll get an error that it doesn't find the `AppModuleNgFactory` . This `module/` file indeed isn't there but it will be during a`ot-compilation`. So to prevent this error, we tell `awesome-typescript-loader` , that it shouldn't analyze our whole directory (which it would do by default) but that it should only transpile the given TypeScript code.

With that, we can move on to the `webpack.config.prod.js`  file. 

We need to adjust the `.ts` rules there, too (and move to the new webpack syntax of using rules  to begin with). 

The file should then look like this:

```
var path = require('path');
 
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
 
module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': './assets/app/main.aot.ts'
    },
 
    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js'
    },
 
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'babel-loader?presets[]=es2015',
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular-router-loader?aot=true'
                ]
            }
        ]
    },
 
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ]
});
```

What changed?

a) The `output.path`  was updated (just as it was in the `webpack.config.dev.js`  file).

b)  `angular-router-loader`  was renamed in this file, too. And we removed the `genDir`  option - it's not required anymore in the updated setup.

c) The `webpack.NoErrorsPlugin()`  was removed

3) Adjust the `tsconfig` files

Almost done! Let's now update the `tsconfig.json`  and the `tsconfig.aot.json`  files!

Since we now use TypeScript 2 in this setup, we can take advantage of some new features. 

The `tsconfig.json`  file should therefore look like this:

{
  "compilerOptions": {
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es6",
      "dom"
    ]
  }
}
What changed?

a) `typeRoots`  was added to inform TypeScript about where to find out @types  definitions we installed (check `package.json`)

b) `lib`  was added to inform TypeScript about some of the features we're about to use. If we omit this, we would get some issues between TS and our @types  packages (having duplicate definitions).

We basically do the same in the `tsconfig.aot.json`  file:

{
  "compilerOptions": {
    "target": "es6",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "outDir": "./public/js/app"
  },
  "typeRoots": [
    "node_modules/@types"
  ],
  "lib": [
    "es6",
    "dom"
  ],
  "angularCompilerOptions": {
    "skipMetadataEmit": true
  }
}
But here we also may now remove exclude , it shouldn't be required anymore.

And that's it - you can find the updated seed project attached to this lecture!

## Test in browser
* `$ npm run build`
* `$ npm run build:prod`
* `$ npm start`

Should work just like it did before
