# SCSS source maps

## Add sass sourcemaps
* We need to know where our code is when we view it in the browser
* Checking now will show you only CSS is injected into style tags
* When we add sourcemaps we can see the exact `.scss` file and line number our styles are located inside
* Sourcemaps are essential for development but should not exist in production

### Adding sourcemaps is easy with webpack
`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }]
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

* TODO - sourcemaps are not working - all are inline
