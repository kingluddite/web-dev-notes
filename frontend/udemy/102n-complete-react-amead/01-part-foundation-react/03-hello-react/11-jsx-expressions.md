# JSX Expressions
* Use variables to create dynamic strings and numbers

## Static data
```
const templateTwo = (
  <div>
    <h1>Name: John Doe</h1>
    <p>Age: 21</p>
    <p>Location: LA</p>
  </div>
);
const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

* We should not define data in our JSX we should could from variables that we reference
  - That will allow us to reuse this - like for multiple users as an example
  - Currently our JSX is not reusable

## Create variables to represent our data

```
const username = 'John Doe';
const userAge = 21;
const userLocation = 'LA';

const templateTwo = (
  <div>
    <h1>Name: {username}</h1>
    <p>Age: {userAge}</p>
    <p>Location: {userLocation}</p>
  </div>
);
const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

## What goes inside JSX `{}`?
* Any JavaScript expression
  - When we reference a variable `username` whose value resolves to a String `John Doe`, that String shows up wherever we place the `{}`
  - If I change the string value to `Jane Doe` like:

```
const username = 'Jane Doe';
const userAge = 21;
const userLocation = 'LA';

const templateTwo = (
  <div>
    <h1>Name: {username}</h1>
    <p>Age: {userAge}</p>
    <p>Location: {userLocation}</p>
  </div>
);
const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

* Now `Jane Doe` shows up in the browser and our JSX is truly dynamic

## Use any expression as you want
* `{username + '!'}` will render `Jane Doe!`
  - But with our Eslint it will convert it to ES6 on save and change it to:
  - {`${username}!`}
    + Above is a JS **template string**
* Make it uppercase with:

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Name: {`${username.toUpperCase()}!`}</h1>
    <p>Age: {userAge}</p>
    <p>Location: {userLocation}</p>
  </div>
);
// MORE CODE
```

* This technique is essential if we want to build any type of web app

## What if we had all of this data defined on an object?
* Dynamic objects

```
const user = {
  name: 'John Doe',
  Age: 22,
  location: 'New Orleans',
};

const templateTwo = (
  <div>
    <h1>Name: {user}</h1>
    <p>Age:</p>
    <p>Location: </p>
  </div>
);
const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

## Houston we have a problem!
* We get this error: `Uncaught Invariant Violation: Objects are not valid as a React child (found: object with keys {name, age, location}). If you meant to render a collection of children, use an array instead.`
  - This is telling you that you cannot render an object because React has no idea what you want to do with that
    + Do you want to display all the property values?
    + Do you want to display all the properties with the values side-by-side?
    + There is no behavior for rendering an object like there is for a String and a Number
    + **Important Note** Grabbing data off of an object is very similar to what we would do when we grab info about a user from a Database

### Solution - We can still use the object properties
* So instead of just `user` we use `user.name`

```
const user = {
  name: 'John Doe',
  Age: 22,
  location: 'New Orleans',
};

const templateTwo = (
  <div>
    <h1>Name: {`${user.name.toUpperCase()}!`}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {user.location}</p>
  </div>
);
const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

* **note** Remember! - You can not have objects as a child

```
const templateTwo = (
  <div>
    <h1>{user}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {user.location}</p>
  </div>
);
```

## Review
* We've covered Expressions with Strings, Numbers and Objects

## Challenge
* Create `app` object
  - `app` obj has 2 props `title` and `subtitle`
  - Both are Strings
    - Choose any string values you want
* Use `title` and `subtitle` in template
* Render the template
* **note**: Use this structure:

```
const template = (
  <div>
    <h1>TITLE HERE</h1>
    <p>SUBTITLE HERE</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);
const appRoot = document.getElementById('root');
ReactDOM.render(template, appRoot);
```

## Challenge Solution
```
const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
};

const template = (
  <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);
const appRoot = document.getElementById('root');
ReactDOM.render(template, appRoot);
```



