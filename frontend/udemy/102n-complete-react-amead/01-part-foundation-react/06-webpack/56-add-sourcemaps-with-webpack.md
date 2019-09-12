# Add Sourcemaps with Webpack
* All our code is minified and this will make debugging almost impossible
* Adding sourcemaps will make debugging much easier

`AddOption.js`

* Let's cause an error by referencing a variable that doesn't exist

## Make use of a more appropriately named method
`AddOption.js`

```
import React from 'react';

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    this.setState(() => ({
      error,
    }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}
```

* First let's name our function better (I named this function `handleFormSubmit` which is too generic and I'll rename it to `handleAddOption`)

## Now add a bad reference (to a variable that does not exist)
```
handleAddOption(e) {
  e.preventDefault();
  console.log(badvariable);

  const option = e.target.elements.option.value.trim();
  const error = this.props.handleAddOption(option);

  this.setState(() => ({ error }));

  e.target.elements.option.value = '';
}
```

## No error until we try to add an option
* Add item and you will get an error `Uncaught ReferenceError: badvariable is not defined`
* But it tells you the error is on line 6 of `bundle.js` but my code is minified so this is super hard to debug
* Wouldn't it be great if the error pointed me to the actual `AddOption` component line number?
    - That would make my debugging so much easier
    - That is what sourcemaps can help you with

## devtool
* Add this option to `webpack.config.js`
* [documentation](https://webpack.js.org/configuration/devtool/)
* Lots of possible values for devtool
* We are only interested in development so let's try this option `cheap-module-eval-source-map`

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
    ],
  },
  devtool: 'cheap-module-eval-source-map',
};
```

* **note** You will need to restart webpack
* Why?
    - `--watch` isn't watching `webpack.config.js` it's watching for any changes inside `src/`

## Now you can see where your error was!
* After making that we see that it is now telling us the error is in `AddOption` line #16!
* Now we can go in and delete that line and our bug is fixed
* Added bonus if if you add `console.log()` statements in your code it will tell you where that log statement is located (filename and line number)
* **IMPORTANT** REMOVE THE ERROR or your code won't run

## Also React Dev Tools points to Component name and not minified names
![component names in React Dev Tools](https://i.imgur.com/BeTtpen.png)

## We'll learn about Production later
* This is all dev stuff

## Next
* Learn how to set up Webpack Dev Server
