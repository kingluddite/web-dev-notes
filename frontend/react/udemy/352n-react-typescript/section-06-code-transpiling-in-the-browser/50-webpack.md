# Webpack
* bundler app
* `$ npm i --save-exact webpack@5.11.1 webpack-cli@4.3.0`

`src/index.js`

```js
const mesage = require('./message')

console.log(message);
```

`src/message.js`

```js
module.exports = 'Yo!';
```

`package.json`

```
// MORE CODE

 "scripts": {
    "build": "webpack --mode=development"
  },
// MORE CODE
```

## Run our build
`$ npm run build`

* Webapack Creates everything inside `dist` folder

## Now we'll use ES Modules syntax
`message.js`

```
export default 'Yo!';
```

```js
import message from './message';

console.log(message);
```

## Run another build
`$ npm run build`

## Summary
* Regardless of the module system being used webpack took these two different files joined them together inside of one file and then somehow resolved all these import or require export statements to make sure all these different values are being shared between these different files correctly
* Webpack can work with `common js` or `ES module` system as well
* The output is slightly different

## What the Bundler does - step-by-step
1. Read the contents of the entry file (index.js)
2. Automatically found all the different require/import/export statements
3. Automatically found all the modules on our hard drives
4. Linked these files together into a single output file with all values being correctly communicated around

### But this doesn't solve our big challenge #3
* The code might have import statements for other JS files or CSS
* We have to deal with those import statements before executing the code

### We just need to make one small change to our step-by-step #3 above
* Instead of automatically finding all the modules on our hard drives if we could automatically find all the modules the user has imported form npm

#### Goal
* We want a bundler that works slightly differently

## Our Bundling options
* Webpack will throw an error if we try to import something that is not local
  - But if we override that behavior we should be ok
  - How can we override that behavior?
    + By using a plugin called the `NpmInstallWebpackPlugin`
      * [docs](https://v4.webpack.js.org/plugins/npm-install-webpack-plugin/)
      * Now when it encounters a external module it will now not throw an error but now install this module directly from npm onto your local machine (our API server) and then allow webpack to continue on with the bundling process as usual
      * **PROBLEM** with this approach, we are going to be installing tons and tons of modules
      * We will come up with two other solutions that will get around this limitation of saving these dependencies locally

## Option #2
* We'll write our own custom plugin to intercept external modules that will say, anytime someone tries to import something (like React, lodash, something else), we ourselves can make a request off to the npm registry - same solution as before but we are not actively saving the dependency onto our local machine

## Option #3
* Same as before with custom plugin to fetch an individual file from npm but in this option we'll implement all this webpack processing stuff directly into our React app
  - This means we don't have to make some kind of outside request to our API (this should speed up the process of running our user's code because now we don't have to make that entire additional request)
  - Another plus it will be up to the user's machine to reach out to npm and download the individual file (as opposed to having tons and tons of requests coming from our API server)

## Transpiling/Bundling Remotely or Locally Pros/Cons
### Remote
* We can cache downloaded NPM modules to bundle code faster
* Will work better for users with slow devices or limited internet connections

### Local
* Remove an extra request to the API server
  - faster code execution
* We don't have to maintain an API server!
* Less complexity - no moving code back and forth

### Our choice
* We'll use the local verison
* **BIG PROBLEM** Webpack doesn't work in the browser

## Our task
1. We get raw user code
2. We transpile with Babel because it works in the browser
3. We bundle with Webpack (which doesn't work in the browser)
4. Code Ready to execute

### To solve this we will throw away webpack and babel
* And instead we'll use a different bundling tool called ESBuild

## ESBuild
* Can transpile and bundle our code all in the browser
* [docs](https://github.com/evanw/esbuild)
* [main doc page](https://esbuild.github.io/)
