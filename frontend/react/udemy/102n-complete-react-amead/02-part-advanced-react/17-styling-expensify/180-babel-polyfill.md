# Babel Polyfill
* Setup and configure Babel Polyfill

## Why?
* Babel Polyfill will enable your app to:
    - Run in a wider range of browsers and versions
* We work in Chrome but what about IE11? Will it work? Can we be sure?

## BrowserStack
* Will simulate any browser on any OS
* [Expensive](https://www.browserstack.com/pricing?tab=browser-plans-tab)
* Not simulating
    - It is really running our app on a virtual machine that browserstack has

### Babel doesn't convert some code
* `[].includes('hello')]`
    - Will not be converted by Babel
    - Test on live demo `babeljs.io`
* We can fix this by using Babel Polyfill

## Install babel-polyfill
* Babel Polyfill will add in all those methods that older browsers don't have (fantastic tool!)
* [babel-polyfill docs](https://babeljs.io/docs/en/babel-polyfill)

## I am now using the Babel v7 API (so this has changed to what I have below)

`$ npm install --save @babel/polyfill`

### Update webpack.config.js
`webpack.config.js`

```
// MORE CODE
return {
  entry: './src/app.js',

  // MORE CODE
```

* Entry can be a string
    - But it also can be an array of strings
    - We need to put our `@babel/polyfill` first in the array of strings

```
// MORE CODE

return {
  entry: ['@babel/polyfill', './src/app.js'],

// MORE CODE
```

* This will now setup `babel-polyfill` first and then it include our app
* It will now work
    - To test this you would need to try an older version of a different browser (IE11) on browser stack
* **IMPORTANT** This is a no-brainer and should be setup on every app
    - Just "set it and forget it"
    - It gives you access to a wider range of browsers in terms of what your application supports

## Run server and test
`$ npm run dev-server`
