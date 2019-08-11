# Conditional Rendering
* If user is logged in?
    - `Yes` --> show logged out button
    - `No` --> show logged in button
* Has user submitted form with an error?
    - `Yes` --> show them the error and how they can fix it
    - `No` --> don't show any error message

## Stuff we'll use
* `if` statements
* ternary operators
* logical `and` operator

**note** Inside `{}` in JSX you can only have expressions

```
function getLocation() {
  return 'Unknown';
}
```

```
const templateTwo = (
  <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
    <p>location: {getLocation()}</p>
  </div>
);
```

* That renders `unknown` to browser
* We'll add conditional logic that shows:
    - The **location** if it exists
    - And **unknown** if it doesn't
* Although we can only use expressions in our `{}` inside JSX we can call a function that can have the logic baked inside it

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  location: 'LA',
};

const template = (
  <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
  </div>
);

function getLocation(location) {
  if (location) {
    return location;
  }

  return 'Unknown';
}

const templateTwo = (
  <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
    <p>location: {getLocation(app.location)}</p>
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```

* Now if there is a `location` it will show and if not it will render `unknown`

## We can Nest JSX!
* We can include JSX nested inside of JSX

```
const templateTwo = (
  <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
    <p>location: {getLocation(app.location)}</p>
    {<h3>My h3</h3>}
  </div>
);
```

* That will render `My h3` to the browser 
* Being able to add a JSX expressing inside `{}` is very useful because now we can get our `getLocation()` function to return a separate JSX expression

```
function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>
  } else {
    return undefined;
  }
}
```

* We can simply this with:

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
  - If something has a value of `undefined` it will not be rendered

## Ternary operator
* Benefit ---> more concise than an `if` statement
* Good for if else statement but if complex and multi-nested very hard to read

### Take it for a test drive
* Inside Chrome console

`true ? 'Pip' : 'Anonymous'`

* returns `Pip`

### How the ternary operator works
`(if condition passes) ? DO THIS : ELSE DO THIS`

* Which means this:

`false ? 'Pip' : 'Anonymous'`

* Will return "Anonymous"
* The ternary operator is an expression and not a statement
* So we don't need to break it out inside a different function call
* We can just add this expression right in line

```
const app = {
  // title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  location: 'LA',
};

const template = (
  <div>
    <h1>{app.title}</h1>
    <p>{app.subtitle}</p>
  </div>
);

function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>;
  }
}

const templateTwo = (
  <div>
    <h1>{app.title ? app.title : 'No title'}</h1>
    <p>{app.subtitle}</p>
    {getLocation(app.location)}
  </div>
);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```

* Now we see the `ternary operator` is working and showing `No title`
* Great tool to use and you will use this tool often

## The logical `and` operator `(&&)`

### ignored by JSX
* Boolean values **true** and **false** are ignored by JSX
* **undefined** is ignored by JSX

#### Great shortcut to show or hide content
* This is a very useful feature
* Add `age` and only show it if user is 18 or older

`> true && 'some age'`

* With logical **&&** operators
    - If the first value is **truthy** it won't use that
    - Instead, it will use the second value if it is truthy
* With logical **&&** operators if the first value is **false**, that **false** value is used and since **false** and **booleans** are ignore by JSX we won't see it

```
const templateTwo = (
  <div>
    <h1>{app.title ? app.title : 'No title'}</h1>
    <p>{app.subtitle}</p>
    {getLocation(app.location)}
    {app.age >= 18 && <p>Age: {app.age}</p>}
  </div>
);
```

* Now we'll see the age if it `>=` 18

## When you should use the ternary operator
* Ternary is great if you want to do 1 of 2 things

## When should I use the logical && operator
* Logical && operator is great if you just want to do one thing

## Add complexity
* We can add some complexity but also showing that age exists

```
const templateTwo = (
  <div>
    <h1>{app.title ? app.title : 'No title'}</h1>
    <p>{app.subtitle}</p>
    {getLocation(app.location)}
    {if app.age && app.age >= 18 && <p>Age: {app.age}</p>}
  </div>
);
```

## Challenge
* Only render subtitle and `p` tag surrounding **subtitle** if the **subtitle** exists (using logical && operator)
* Add an options `prop` to `app`
    - options: ['One', 'Two']
    - render new `p` tag if items exist in that array
        + `if options.length > 0` ? 'here are your options' : 'no options'`
        + put that `p` below subtitle
            * this `p` always shows up, just the text value changes (ternary operator)

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* You will see the `subtitle` appear
* You will see you have options
* If you comment out the subtitle `prop` in the object it will be removed and it's surrounding `p` tags from the rendered page
* If you remove the items from the array you will see `no options` 
