# Setting up Development Workflow with Webpack
* We use `webpack-merge` to merge our config files and not overwrite them but merge the differences
* We need to tell our publicPath `/js/app` otherwise it will look in our root folder and that will make our app not work

`webpack.config.dev.js`

```js
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.resolve(__dirname + '/public/js/app'),
    filename: 'bundle.js',
    publicPath: '/js/app/',
    chunkFilename: '[id].chunk.js'
  }
});
```

## Next - Create Angular2 app to see if all this works
