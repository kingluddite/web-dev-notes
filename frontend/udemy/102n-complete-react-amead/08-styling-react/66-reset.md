# reset
* Make all the browsers play nice
* A reset sets the defaults for all browsers to be the same
* This is a simple task and should be done for every project to ensure you site looks the same on all browsers

## normalize.css
* This is a very popular reset library
* There are lots of edge cases to coding a reset and normalize tackles a great many of these cases and using it will save us time and we can trust it as many developers use it all the time for most if not all of their projects

### Install normalize.css
`$ yarn add normalize.css`

### Use normalize.css
`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css'; // add this line
import './styles/styles.scss';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

* We point it to our a file inside the `normalize.css` folder inside `node_modules` named `normalize.css`

## Houston we have a problem!
* That import breaks our site
* The reason is our loader is only looking for `.scss` files and we are importing a `.css` file

### Solution
* One small change to our file

`webpack.config.js`

* Change this line:

```js
// MORE CODE
test: /\.scss$/,
// MORE CODE
```

* To this line:

```js
// MORE CODE
test: /\.s?css$/,
// MORE CODE
```

* Adding that `?` means `scss` is optional but all files must have css in the end of their name
* So we are looking at both `css` files and `scss` files

## That's it
* We just added normalize.css to our site
* Check it out in the browser
* The change won't be drastic but rest assured, we just made a change that ensures the sites we build will be build on a foundation of cross-browser consistency

### Cool tip - Ways to Add Google fonts to React apps
* [link to article](https://scotch.io/@micwanyoike/how-to-add-fonts-to-a-react-project)

