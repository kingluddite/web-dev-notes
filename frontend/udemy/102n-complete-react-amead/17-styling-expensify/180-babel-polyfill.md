# Babel Polyfill
* Setup and configure Babel Polyfill

## Why?
* Babel Polyfill will enable your app to run in a wider range of browsers and versions
* We work in Chrome but what about IE11? Will it work? Can we be sure?

## BrowserStack
* Will simulate any browser on any OS
* [Expensive](https://www.browserstack.com/pricing?tab=browser-plans-tab)
* Not simulating
    - It is really running our app on a virtual machine that browserstack has

### Babel doesn't convert some code
* [].includes('hello')]
    - Will not be converted by Babel
    - Test on live demo `babeljs.io`
* We can fix this by using Babel Polyfill

## Install babel-polyfill
`$ yarn add babel-polyfill`

### Update webpack.config.js
`webpack.config.js`

```
// MORE CODE
return {
  entry: './src/app.js',

  // MORE CODE
```

* entry can be a string
    - But it also can be an array of strings

```
// MORE CODE
return {
  entry: ['babel-polyfill', './src/app.js'],
// MORE CODE
```

* This will now setup babel-polyfill and then it will setup our app
* It will now work
    - To test this you would need to try an older version of a different browser (IE11) on browser stack
* This is a no-brainer and should be setup on every app
