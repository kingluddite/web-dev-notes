# Configure Jest for Testing JS apps
`$ npm run test`
`$ npm test`
`$ npm t`

* You could name your test file `something.test.js`
* **RECOMMEND** Saving `__tests__`
    - Separate tests from src folder

## Jest simulates a browser environment in Node
* It does this using a module called `jsdom`
* We can prove this:

`utils.js`

```
import {getFormattedValue} from '../utils'

test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})

console.log(window)
```

* Run Jest

`$ npm t`

* You will see the window object in the terminal
* There is a performance hit to setup jsdom so if you don't need the browser window to test you will save processing power and time

### Run just in node
* We can use just the node environment with this command

`$ npm t -- --env=node`

* Run jest again

`$ npm t`

* Now you will see an error that `window is not defined`

## Save time with a jest config file
* We don't want to have to type `npm t -- --env=node`
* And to do this we set up a jest config file and add the setting inside it
* Add this file in root of project

`jest.config.js`

```
module.exports = {
  testEnvironment: 'jest-environment-node',
}
```

* Run jest `$ npm t` the jest configuration will be read automatically and you'll see jest does not run jsdom 

### If you want to run js-dom
`jest.config.js`

```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
}
```

* Run jest `$ npm t` the jest configuration will be read automatically and you'll see jest runs jsdom (you'll see the window object logged to the terminal)
* Since we will mostly be relying on browser APIs we'll keep the jsdom jest setting
    - So we will simulate a global browser environment

## Search node_modules
* [Search node_modules](https://marketplace.visualstudio.com/items?itemName=jasonnutter.search-node-modules)
    - Install and search for `jsdom`
    - You'll see it was installed by default by jest
    - **note** And right below it is a `jest-environment-node` that was also installed by default by jest
    - **note** There are other 3rd party environments that you could install from npm but we'll use the built in jest environment jsdom and that ensures that all our tests are running in a browser simulate environment, thanks to jsdom

## Test auto-scaling-text.js
* Create `__tests__/auto-scaling-text.js`

```
import React from 'react'
import {render} from '@testing-library/react'
import AutoScalingText from '../auto-scaling-text'

test('renders', () => {
  render(<AutoScalingText />)
})
```

* Run test (comment out `console.log(window)` in previous test)

`$ npm t`

* We are getting a css error in AutoScalingText

### The Problem
* Jest is trying to require the CSS file like it is a commonjs file
* We will use the `moduleNameMapper` jest suggestion (in the terminal error)
    - This will enable us to map files that end in `.css` to a different module (that is a mocked version of the module) so it can be stubbed out and we can require this file in our tests

### Add our moduleNameMapper
* It will use a regex pattern to map "anything that ends in css" require a different mocked module instead (see below file)

`test/style-mock.js`

```
module.exports = {}
```

`jest.config.js`

```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

`$ npm t`

* And our test now passes

## Log out styles
`auto-scaling.js`

```
// MORE CODE

import React from 'react'
import PropTypes from 'prop-types'
import styles from './auto-scaling-text.module.css'

console.log(styles)
// MORE CODE
```

`$ npm t`

* And you'll see we log out styles (which is just an empty object)
* So when jest comes across a file with the pattern `.css` it won't require that file it will require the file we mapped to it

`test/style-mock.js`

```
module.exports = {test: 'this has been re-mapped'}
```

`$ npm t`

* And you'll see in the terminal

```
  { test: 'this has been re-mapped' }
```

## It is uncommon to test css
* So it is fine to do this
* **note** If you want to test CSS try [visual regression testing](edium.com/loftbr/visual-regression-testing-eb74050f3366)

## How can this work in our app?
* Because this app is being bundled with webpack
* And we have webpack configured to handle CSS files

`webpack.config.js`

* Using the `css-loader` and the `style-loader`
* So webpack is managing our app
* We just needed to make jest manage the same thing for our tests

```
// MORE CODE

 module: {
     rules: [
       {
         test: /\.css$/,
         exclude: /\.module\.css$/,
         use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
       },
       {
         test: /\.module\.css$/,
         use: [
           {loader: 'style-loader'},
           {loader: 'css-loader', options: {modules: true, camelCase: true}},
         ],
       },
// MORE CODE
```

## Support using Webpack CSS Modules with Jest
* How can I get the output of what I'm rendering?
    - User the `debug` method

`__tests__/auto-scaling-test.js`

```
import React from 'react'
import {render} from '@testing-library/react'
import AutoScalingText from '../auto-scaling-text'

test('renders', () => {
  const {debug} = render(<AutoScalingText />)
  debug()
})
```

* And the test output after `$ npm t`

TERMINAL

```
console.log
      <body>
        <div>
          <div
            style="transform: scale(1,1);"
          />
        </div>
      </body>
```

* `ref` does not show because it does not get added to the DOM
* `className` should but `styles` it's not because we mapped it to an empty object so the property on an empty object is

`auto-scaling-text.js`

```
// MORE CODE

return (
      <div
        className={styles.autoScalingText}
// MORE CODE
```

* And so when we try to get `autoScalingText` off an empty object it will be `undefined`, therefor className will be `undefined` and undefined won't show in react output
* We want it to show up because we could be dealing with an assertion based on logic

`auto-scaling-text.js`

```
// MORE CODE

return (
      <div
        className={styles.autoScalingText ? 'thing' : ''}
// MORE CODE
```

## npm module - identity-obj-proxy
`$ npm i -D identity-obj-proxy`

* With that installed I want to match this pattern `.module.css` because those will have an object with those styles applied
* Somehow I want to convert `className={styles.autoScalingText}` to:

`className={autoScalingText}`

* And accomplishing that is what `identity-obj-proxy` will do for us
* So when we find modules with `.modules.css` then we want to use `identity-obj-proxy` as our mock module for that particular dependency
* There is a cache so when running tests you may need to change an attribute to get a fresh test to run again
* I updated the rendered component to this:

`auto-scaling-text.js`

```
// MORE CODE

 return (
      <div
        className={styles.autoScalingText}
        id="test"
        style={{transform: `scale(${scale},${scale})`}}
        ref={this.node}
        data-testid="total"
      >
        {this.props.children}
      </div>
    )
// MORE CODE
```

* And our jest config

`jest.config.js`

* Triple check your regular expressions!!!

```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

## Run the test
`$ npm t`

TERMINAL

```
    console.log
      <body>
        <div>
          <div
            class="autoScalingText"
            data-testid="total"
            id="test"
            style="transform: scale(1,1);"
          />
        </div>
      </body>
```

* Even though we are not rendering the styles into jsdom we can still make assertions on the class name that is being applied for our css modules
* Even though this className is generated at runtime we can still make assertions on it

## Order is very import below!!
```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

* We want to look for .module.css before .css
* If we reversed the order it would not work

```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
    '\\.module\\.css$': 'identity-obj-proxy',
  },
}
```

* And running `$ npm t`
* Would NOT give us the string className

* THIS IS BAD!

```
console.log
      <body>
        <div>
          <div
            data-testid="total"
            id="test"
            style="transform: scale(1,1);"
          />
        </div>
      </body>
```

* So we use this order:

```
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
}
```

* We have a search FIRST for `.module.css` and for any other `.css` file we point to the `style-mock.js` (the regular style mock)

## Generate a Serializable Value with Jest Snapshots
