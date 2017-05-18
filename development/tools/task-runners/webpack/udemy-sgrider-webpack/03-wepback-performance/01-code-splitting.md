# Code Splitting
## What is code splitting?

![diagram](https://i.imgur.com/xf2IUlJ.png)

The login form won't have as much JavaScript

![js code amount](https://i.imgur.com/htmIQLG.png)

![when loading js](https://i.imgur.com/ApoydeG.png)

* We want to serve less JavaScript when it is needed
* We only so far had one JavaScript bundled file
* webpack will let us split that up into separate files for separate occassions
* This will slow down some parts but the key is we want to minimize that first hit when a user comes to our site

## App wireframe
![wireframe](https://i.imgur.com/qPHqFg3.png)

* site loads with one button
* click it and an image appear
* simplistic, yes but great example of code splitting

`index.js`

* entry point
* render a button with click handler
* imports 'image-viewer' after button gets clicks

`image-viewer.js`
* renders image

The button is responsible for loading up additional file


* note `vanilla JavaScript` doesn't use capital letters in `onclick`

## Update our `index.js`

```
const button = document.createElement('button');
button.innerText = 'click me';
button.onclick = () => {
    
};

document.body.appendChild(button);
```

## On Demand Code Loading
```
const button = document.createElement('button');
button.innerText = 'click me';
button.onclick = () => {
    System.import('./image-viewer');
};

document.body.appendChild(button);
```

![diagram System](https://i.imgur.com/kJs1Mqy.png)

* System is a global variable inside of JavaScript
* System.import()
    - Special function of ES6 (ES2015) spec
    - takes an argument (name of module) we want to import
    - If the module we are pulling in has its own imports, those would be pulled in as well

1. After clicking button, the browser will reach out to our server and try to find this module
2. The server (if it finds it) will reply with that module and return it to the Client and the client will execute it

## Async with a Promise

```
const button = document.createElement('button');
button.innerText = 'click me';
button.onclick = () => {
    System.import('./image-viewer').then(module => {
      console.log(module);
    });
};

document.body.appendChild(button);
```

- This is an asynchronous call, so this `System.import()` returns a **Promise** so to get access to that module we need to append `.then()` and pass that a arrow function to execute after the module has loaded

### Let's alter our `image-viewer.js`
Just to make how code-splitting works more obvious

`image-viewer.js`

```
import small from './assets/small.jpg';
import './styles/image-viewer.css';

export default () => {
  const image = document.createElement('img');
  image.src = small;

  document.body.appendChild(image);
};
```

### Run the build
`$ yarn build` and `$ open index.html`

* Open console
* click button
* you'll see an object

![with a default object](https://i.imgur.com/73TUWi6.png)

#### Click `Network` tab of Chrome dev tool
* Refresh browser
* Filter for only javascript
* you will only see `bundle.js`
* click button and you'll see another JavaScript file

![two bundles](https://i.imgur.com/vEeVBwq.png)

The code is getting split.

## module.default()
We call that function to get it to execute our module on the client

```
const button = document.createElement('button');
button.innerText = 'click me';
button.onclick = () => {
    System.import('./image-viewer').then(module => {
      module.default();
    });
};

document.body.appendChild(button);
```

1. `$ yarn build`
2. Refresh `index.html` in the browser
3. You will see the image appear




