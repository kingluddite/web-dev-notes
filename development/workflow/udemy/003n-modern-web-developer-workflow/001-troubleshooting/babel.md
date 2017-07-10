## Get error

Uncaught Error: Module build failed: Error: The node API for `babel` has been moved to `babel-core`

### Solution
* Update your `webpack.config.js` by changing this:

```
// more code
module: {
  loaders: [
    {
      loader: 'babel',
      query: {
        presets: ['es2015'],
      },
      test: /\.js$/,
      exclude: /node_modules/,
    },
  ],
},
// more code
```

To this:

```
// more code
module: {
  loaders: [
    {
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
      test: /\.js$/,
      exclude: /node_modules/,
    },
  ],
},
// more code
```

* That didn't work for me one time
* Removed and reinstalled node_modules
* That didn't work either
* I reran the scripts task `$ gulp scripts` then ran `$ gulp watch` and that worked
