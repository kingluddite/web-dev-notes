# JSX Fun
`app.js`

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = <p>hello</p>;
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
console.log('yo');
```

## Tips
* Add Syntax JSX syntax highlighting to VS Code
* Type this:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react`

## Run `live-server`

`$ live-reload public`

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = <h1>Indecision App</h1><p>this is a test</p>
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

### Houston we have a problem
* You will see we have an error in the browser

#### Why?
* You have to have two sibling nodes

### Solution - One Parent 

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = (
  <div>
    <h1>Indecision App</h1>
    <p>this is a test</p>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* We wrap the elements in one parent `div` and all is good
* We are running both the `live-server` with:

`$ live-server public`

* And we are running:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

## The wrapper div
* All our elements will be inside the single `wrapper` div

## Prettier will make your life so much easier
* `Prettier` auto indents your code
  - Make sure it is installed

```
const template = (
  <div>
    <h1>Indecision App</h1>
    <p>this is a test</p>
  </div>
);
```

### Vim notes
* I am use `vim` and with `vim` I have **ale** and **prettier** setup together and in my `.vimrc` file I have it auto fix/format on save (major time saver!)
* You can do the same with Atom/Sublime/Visual Code but you'll have to Google it yourself to get them working

## Complex code
```
console.log('App.js is running');

// JSX - JavaScript XML
const template = (
  <div>
    <h1>Indecision App</h1>
    <p>this is a test</p>
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* If you view `scripts/app.js` you'll see how `babel` translates it all

## Challenge
* Create a `templateTwo` var JSX expression
* root div (root wrapper)
*   h1 --> your name
    -   p ---> age
    -   p ---> location
*   render `templateTwo` instead of template

```
// old code
console.log('App.js is running');

// JSX - JavaScript XML
// const template = (
//   <div>
//     <h1>Indecision App</h1>
//     <p>this is a test</p>
//     <ul>
//       <li>one</li>
//       <li>two</li>
//       <li>three</li>
//     </ul>
//   </div>
// );
//

// challenge code solution
const templateTwo = (
  <div>
    <h1>Phil</h1>
    <p>47</p>
    <p>LA</p>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```




