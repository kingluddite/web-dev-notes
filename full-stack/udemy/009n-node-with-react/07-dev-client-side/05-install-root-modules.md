# Installing Root Modules
* **note** We named `index.js` because the `Create-react-app` is setup to assume there is a `index.js` file inside the `src` and that it is the **root** file of your app
* We will create our root Component
* We'll use `React` render() call to get that Component to show up on the screen
* Then we'll move on to `Redux`
* Then we'll move on to `React Router`

## Create components directory
`/client/src/components`

### Create App.js
`/client/src/components/App.js`

#### Naming Convention
* If a given file is exporting a class or a `React` Component of any type (functional Component or class based Component) we will label it with a Capital letter
* If the file returns just a function or just a series of functions, we will spell the file all lowercase
    - Good example - `index.js`
* Note that on the frontend we are making use of `import` instead of `require` because on the frontend we are making use of Webpack and babel which gives us easy access to ES2015 modules
* But on the backend we are using Node.js which only has support for commonJS modules right now
    - And commonJS modules use the `require` syntax instead

`/client/src/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />, document.querySelector('#root'));
```

* We get `#root` from inside `/client/public/index.html`

`index.html`

```html
// more code
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
// more code
```

## Test it out
* Make sure to be in `server` directory
* `$ npm run dev`
* You should see `Hi There!` on the screen
* Success!

## Troubleshoot
* If you are using `npm` to load dependencies (and not `yarn`), you will get an error. To fix the error delete `package-lock.json` inside `client` folder
* Then use `$ npm install` to regenerate
