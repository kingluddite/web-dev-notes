# Conditional Rendering
* Conditional Rendering and Conditional Logic is the very core of software development
  - If this, do that
  - If not, do something else

## Conditional Rendering is key for our React apps
* If user is logged in?
    - `Yes` --> show **LOGGED OUT** button
    - `No` --> show **LOGGED IN** button
* Has user submitted form with an error?
    - `Yes` --> show them the error and how they can fix it
    - `No` --> don't show any error message

### We will do this using our JavaScript expressions
* We will use the same conditional JavaScript features that we use in our regular programs
  - There is no strange new syntax or strange new behavior

#### JavaScript we'll use:
* `if` statements
* ternary operators
* logical `and` operator

## Comment out your exist `app.js` code
* And add this:

```
// const app = {
//   title: 'My First React App',
//   subtitle: 'Learning About Expressions',
// };

// const template = (
//   <div>
//     <h1>{app.title}</h1>
//     <p>{app.subtitle}</p>
//     <ol>
//       <li>Item one</li>
//       <li>Item two</li>
//     </ol>
//   </div>
// );
// const appRoot = document.getElementById('root');
// ReactDOM.render(template, appRoot);

const user = {
  name: 'John',
  age: 21,
  location: 'LA',
};

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {user.location}</p>
  </div>
);

const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

* We will use conditional logic
  - We first will check if the user location exists, if not we'll display the static string "unknown"
  - We can't put an `if` statement inside our JSX `{}`, as we can only put JavaScript expressions inside `{}`
    + We can still use `if` statements but we'll put them inside a separate function call
      * And then we'll call that function from inside our expression
        - This is super critical to meaningful JSX
  
**note** Inside `{}` in JSX you can only have expressions

```
const user = {
  name: 'John',
  age: 21,
  location: 'LA',
};

function locationExists(location) {
  if (location) {
    return location;
  }
  return 'unknown';
}

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {locationExists(user.location)}</p>
  </div>
);

const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

* That renders `unknown` to browser if there is no location
  - If there is no location it will be `undefined`
* We'll add conditional logic that shows:
    - The **location** if it exists
    - And **unknown** if it doesn't
* Since we can only use expressions in our `{}` inside JSX we instead call a function that can have the logic baked inside it
* If there is a `location` it will show and if not it will render `unknown`
  - **note** A String with a length greater than 0 is a `truthy` value so `if (location) if there is a location will be true`

## If you remove `location` property from user
```
const user = {
  name: 'John',
  age: 21,
};
```

* Now you will see `unknown` is rendered to browser

## What two tools did we learn?
1. We used the ability to call a function from our JavaScript expressions in JSX
2. We use the if statement inside our function to actually set up that conditional statement

## Let's improve on this
* If there is no `location` we want to hide the paragraph tag altogether
  - So if there is a location render this:

##
```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {locationExists(user.location)}</p>
  </div>
);
// MORE CODE
```

* And if there is not a `location` DO NOT RENDER paragraph tag like this:

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
  </div>
);
// MORE CODE
```

* To accomplish this we need to know that we can use other JSX expressions inside our JSX
  - So yes, we can nest JSX expressions!

## We can Nest JSX!
* We can include JSX nested inside of JSX

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
    <p>Location: {locationExists(user.location)}</p>
    {<p>This is nested JSX!</p>}
  </div>
);
// MORE CODE
```

* This is very useful because now we can set up getLocation to return a separate JSX expression
* Let's use nested JSX in our getLocation function:

```
function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>
  } else {
    return undefined;
  }
}
```

* Now if there is a location we return our JSX
* If not, we return `undefined`
  - `undefined` is returned if you don't explicitly return it
  - So we can simplify the above function to the below function:

```
function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>
  }
}
```

* Because if there is no `location` the function will implicitly return `undefined`
* Now we either:
  - Add a paragraph with a location
  - Or we add no paragraph at all

## undefined
* You can use `undefined` inside JSX
  - It is a very useful feature
  - If something has a value of `undefined` it will **NOT** be rendered
  - So if we remove the location in our object you'll see our code in the UI does NOT render the `p` tag at all!

```
const user = {
  name: 'John',
  age: 21,
  // location: 'LA',
};

function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>;
  }
}

const templateTwo = (
  <div>
    <h1>Name: {user.name}</h1>
    <p>Age: {user.age}</p>
    {getLocation(user.location)}
  </div>
);
// MORE CODE
```

![p tag not rendered at all](https://i.imgur.com/d8ChSRU.png)

## Ternary operator
* Benefit ---> more concise than an `if` statement
* Good for if else statement but if complex and multi-nested very hard to read

### Take it for a test drive
* Inside Chrome console

`> true ? 'Pip' : 'Anonymous'`

* Returns `Pip`
* `Pip` is a `truthy` value
  - true is the condition
    + If the condition passes use 'Pip'
    + If the condition fails use 'Anonymous'

### How the ternary operator works
`(if condition passes) ? DO THIS : ELSE DO THIS`

* Which means this:

`false ? 'Pip' : 'Anonymous'`

* Will return "Anonymous"
* **note** The ternary operator is an expression and not a statement
  - So we don't need to break it out inside a different function call
  - We can just add this expression right in line

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    <p>Age: {user.age}</p>
    {getLocation(user.location)}
  </div>
);
// MORE CODE
```

* If you have a user name it will render it
* If you comment out user's name property, you will see `Anonymous` rendered 

## The logical `and` operator (`(&&)`)

### Boolean values are ignored by JSX
* **true** and **false** are ignored by JSX
* This is obvious when you use this code and see that `false` is not rendered

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    <p>Age: {user.age}</p>
    {false}
    {getLocation(user.location)}
  </div>
);
// MORE CODE
```

* If you use `{null}` or `{true}` you will see they also do not render
* **undefined** is also ignored by JSX

### Let's mess with the `&&` (the logical "AND" operator)
* We will only show the age paragraph tag if the user is 18
  - If they are we will leave their personal info off of the profile
* **tip** Great shortcut to show or hide content
  - This is a very useful feature

## Let's try it in the Google Chrome console

`> true && 'some age'`

* Will render `'some age'`

`> false && 'some age'`

* Will return false (won't be rendered)

* With logical **&&** operators
    - If the first value is **truthy** it won't use that
    - Instead, it will use the second value if it is truthy
* With logical **&&** operators if the first value is **false**, that **false** value is used and since **false** and **booleans** are ignore by JSX we won't see it

```
const user = {
  name: 'John',
  age: 21,
  location: 'LA',
};

function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>;
  }
}

const templateTwo = (
  <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    {user.age >= 18 && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);

const appRoot = document.getElementById('root');

ReactDOM.render(templateTwo, appRoot);
```

* Since the user age is 21 you will see the age
* Change the age to something less than 18 and you will not see user age rendered

## When you should use the ternary operator
* Ternary is great if you want to do 1 of 2 things

## When should I use the logical && operator
* Logical `&&` operator is great if you just want to do one thing else you want to do nothing at all
* Currently our logical `&&` doesn't check if `age` exists at all
  - We can add a little complexity and and check for that

## Add complexity
* We can add some complexity but also showing that age exists

```
// We set our object to be empty
const user = {};

function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>;
  }
}

const templateTwo = (
  <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    {user.age && user.age >= 18 && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);

// MORE CODE
```

* **note** In JSX you have have curly braces nested inside curly braces (as seen above)
* Now since our object is empty we show no age and no location but and only show Anonymous since that was from our ternary operator
* But if populate the user object with name, age and location properties and values you will get those values rendered to the browser

```
// MORE CODE

const user = {
  name: 'Don',
  age: 22,
  location: 'Las Vegas',
};
// MORE CODE
```

## Challenge
* Only render subtitle and `p` tag surrounding **subtitle** if the **subtitle** exists (using logical && operator)
* Add an options `prop` to the `app` object (it will be an array with 2 string values)
    - `options: ['One', 'Two']`
* Render new `p` tag if items exist in that array
        + `if options.length > 0` ? 'here are your options' : 'no options'`
        + put that `p` below subtitle
            * **note** this `p` always shows up, just the text value changes (ternary operator)

## Challenge Solution
```
const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
  options: ['One', 'Two'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    {app.options.length > 0 ? <p>Here are your options</p> : <p>No options</p>}
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);
const appRoot = document.getElementById('root');
ReactDOM.render(template, appRoot);
```

* You will see the `subtitle` appear
* You will see you have options
* If you comment out the subtitle `prop` in the object it will be removed and it's surrounding `p` tags from the rendered page
* If you remove the items from the array you will see `no options` 
