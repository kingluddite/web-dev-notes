# const and let
* Change the file we are watching with babel

`$ babel src/playground/es6-let-const.js --out-file=public/scripts/app.js --presets=env,react --watch`

```js
var nameVar = 'John';

console.log('nameVar', nameVar);
```

* Outputs: nameVar John

```js
var nameVar = 'John';
nameVar = 'Joe';
console.log('nameVar', nameVar);
```

* We can reassign variables
* But could also do this:

```
var nameVar = 'John';
var nameVar = 'Joe';
console.log('nameVar', nameVar);
```

* And it works with no errors
* This leads to problems because you can overwrite a variable very easily and many times you don't want to do this
* If a problem happens the bug can be hard to track down because of this

## let and const
* const doesn't let you redefine or reassign
* You can reassign with let but you can't redefine it

## No more var
* We won't define variable with `var` anymore
* We'll default to using `const` and only change it to `let` when we get an eslint error telling us to change to `let`

## Scoping changes with `let` and `const`
* `var` based variables are function scoped
    - each variable is specific to the variable that it was created inside
        + and it can't be accessed outside of that function

```js
function getPetName() {
    var petName = 'Peaches';
    return petName;
}

getPetName();
```

* if I try to access petName outside the function I can't because it was scoped to the function
* petName is not available to the global scope
* If you tried to you would get an error that petName is not defined
* if you changed the variable to use `let` or `const` you would get the exact same `not defined` error
* We could access it if we did this:

`const petName = getPetName();`

And that is because we changed the scope

## block level scope
* But `let` and `const` are also block level scope
* This is not true with `var`
* so let and const are function scoped and block level scope

```js
// block scoping
var fullName = 'John Wayne';

if (fullName) {
    var firstName = fullName.split(' ')[0];
    console.log(firstName);
}
```

* `var` is function scoped
* So `fullName` and `firstName` are scoped to same function (the global scope in this case)

```js
// block scoping
var fullName = 'John Wayne';

if (fullName) {
    const firstName = fullName.split(' ')[0];
    console.log(firstName);
}
```

* You'll get an error on `firstName` because you can't access the variables outside the code blocks
* Same thing is true for `let`

```js
var fullName = 'John Wayne';
let firstName;

if (fullName) {
  firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);
```

* But the use of `let` above will work because you can reassign with `let`

## Remove `var` from our project
* Stop watching the `es6-let-const.js` file
* Run this:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

* Run the server
* `$ live-server public`

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
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);

const user = {
  name: 'John',
  age: 100,
  location: 'Arizona',
};

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

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

## Next -----> The arrow function (ES6)
