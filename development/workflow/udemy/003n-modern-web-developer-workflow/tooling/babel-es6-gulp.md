# Gulp and ES6 Imports
* Instead of require use import like this:

```js
/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssvars from 'postcss-simple-vars';
```

* The comment at the top prevents an annoying eslint error from popping up

## rename gulpfile.js to gulpfile.babel.js

## install the following dev dependencies
`$ npm i babel babel-core babel-preset-es2015 babel-register`

### You need a .babelrc file or you can add this to the end of `package.json`
```
// more code
,
  "babel": {
     "presets": ["es2015"]
  }
}
```

## browser-sync
You can use this and browser-sync will work

`import browserSync from 'browser-sync';`

* You don't need to add .create() at the end like we did when we required it
