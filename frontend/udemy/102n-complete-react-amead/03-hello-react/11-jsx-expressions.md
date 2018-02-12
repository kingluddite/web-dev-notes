# JSX Expressions
* User variables to create dynamic strings and numbers

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
const username = 'Joe';
const userAge = 44;
const userLocation = 'LA';

const templateTwo = (
  <div>
    <h1>{username.toUpperCase() + '!'}</h1>
    <p>Age: {userAge}</p>
    <p>Location: {userLocation}</p>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```

## Dynamic objects
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
const user = {
  name: 'Joe',
  age: 44,
  location: 'LA',
};

const username = 'Joe';
const userAge = 44;
const userLocation = 'LA';

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {user.location}</p>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```

* **note** You can not have objects as a child

```
const templateTwo = (
  <div>
    <h1>{user}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {user.location}</p>
  </div>
);
```

## Challenge
* Create `app` object
  - `app` obj has 2 props `title` and `subtitle`
  - Both are strings
    - Choose any string values you want
* Use `title` and `subtitle` in template
* Render the template that will generate an error `{user}` as an object
