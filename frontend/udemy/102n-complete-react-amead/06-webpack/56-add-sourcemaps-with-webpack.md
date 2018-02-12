# Add Sourcemaps with Webpack
`AddOption.js`

```js
handleAddOption(e) {
  e.preventDefault();
  console.log(badvariable);

  const option = e.target.elements.option.value.trim();
  const error = this.props.handleAddOption(option);

  this.setState(() => ({ error }));

  e.target.elements.option.value = '';
}
```

* Add item and you will get an error
* But it tells you the error is on line 18471 of bundle.js
* Wouldn't it be great if the error pointed me to the actual AddOption component line number?
    - That would make my debugging so much easier

## devtool
* Add this option to `webpack.config.js`
* [documentation](https://webpack.js.org/configuration/devtool/)
* Lots of possible values for devtool
* We are only interested in development so let's try this option `cheap-module-eval-source-map`

`webpack.config.js`

```js
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
    ],
  },
  devtool: 'cheap-module-eval-source-map',
};
```

* **note** You will need to restart webpack
* Why?
    - `--watch` isn't watching `webpack.config.js` it's watching for any changes inside `src/`
* After making that we see that it is now telling us the error is in `AddOption` line #16!
* Now we can go in and delete that line and our bug is fixed
* Added bonus if if you add `console.log()` statements in your code it will tell you where that log statement is located (filename and line number)
