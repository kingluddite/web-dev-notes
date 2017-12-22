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
* syntax jsx syntax highlighting
    - Atom (Babel ES6/ES7)
    - Atom (Path Intellisense - add nice autocompletion features)
    - After installing (if using atom you should see Babel ES6/7 on bottom right)

* Type this:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react`

* Then to run live-server

`$ live-reload public`

```
console.log('App.js is running');

// JSX - JavaScript XML
const template = <h1>Indecision App</h1><p>this is a test</p>
const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* Test and you will see we have an error
* You have to have nodes inside one parent

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
* We are running both the live-server with:

`$ live-server public`

* And we are running:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

## The wrapper div
* All our elements will be inside the single `wrapper` div

## Indent for sanity
* It just looks better this way

```
const template = (
  <div>
    <h1>Indecision App</h1>
    <p>this is a test</p>
  </div>
);
```

* Using `prettier` it does this for you
* I am use vim and with vim I have ale and prettier setup together and in my `.vimrc` file I have it auto fix/format on save (major time saver!)
* You can do the same with Atom/Sublime/Visual Code but you'll have to google it yourself to get them working

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

* If you view `scripts/app.js` you'll see how babel translates it all

## Challenge
* Create a templateTwo var JSX expression
* root div (root wrapper)
*   h1 --> your name
    -   p ---> age
    -   p ---> location
*   render templateTwo instead of template

```
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




