# const and let
* In legacy code you will see `var` used to define variables
* New JavaScript uses `const` and `let`
* Let's explore why this is the case

## Create a new `src/playground` folder
* Create a file inside playground called `es6-let-const.js`

## Temporarily change babel from processing `app.js` to processing `es6-let-const.js`
* Type this new command to have babel watch our new file

`$ babel src/playground/es6-let-const.js --out-file=public/scripts/app.js --presets=env,react --watch`

## Temporarily turn off eslint
* Just rename `.eslintrc` to `OFF.eslintrc`

```
var nameVar = 'John';

console.log('nameVar', nameVar);
```

* Outputs: nameVar John (Chrome console)

```
var nameVar = 'John';
nameVar = 'Joe';
console.log('nameVar', nameVar);
```

* We can **reassign** variables
* But could also do **redefine** variables:

```
var nameVar = 'John';
var nameVar = 'Joe';
console.log('nameVar', nameVar);
```

* And it works with no errors

## Problem with `var` - You can overwrite variables too easily
* This leads to problems because you can overwrite a variable very easily and many times you don't want to do this
* Many times developers create a new variable not knowing they already used it somewhere else
  - If a problem happens the bug can be hard to track down because of this

## const
* `const` doesn't let you **redefine** or **reassign**

## let
* You can **reassign** with let but you can't **redefine** it

```
let team = 'Man U';
team = 'Chelsea';
let team = 'Man City';
console.log('team', team);
```

* You see that you could reassign from Manu to Chelsea but you can't redefine
* You will see errors from babel in Terminal `Duplicate declaration "team"`
* So in ES6 it is no longer valid to define `let` variables

```
const player = 'Kobe';
player = 'Magic';
const player = 'Luke Walton';
console.log('player', player);
```

* You can't reassign or redefine with `const`
* You will see errors from babel in Terminal `Duplicate declaration "player"`

## No more var
* We won't define variable with `var` anymore
* We'll default to using `const` and only change it to `let` when we get an eslint error telling us to change to `let`

## Scoping changes with `let` and `const`
* `var` based variables are **function** scoped
    - Each variable is specific to the function that it was created inside
        + And it can't be accessed outside of that function

```
function getPetName() {
    var petName = 'Peaches';
    return petName;
}

getPetName();
console.log(petName);
```

* If I try to access `petName` outside the function I can't because it was scoped to the function
  - `petName` is not available to the global scope
  - If you tried to you would get `Uncaught ReferenceError: petName is not defined`
  - If you changed the variable to use `let` or `const` you would get the exact same `not defined` error
* **note** We could access it if we did this:

`var petName = getPetName();`

```
function getPetName() {
  var petName = 'Peaches';
  return petName;
}

var petName = getPetName();
console.log(petName); // will show "Peaches" in console
```

* Why? Because we changed the scope
  - But this is the same whether we use `var`, `const` or `let`
    + Because `let` and `const` are also **function scoped**
    + It works because we are trying to access petName in the global scope and when we define a variable in the global scope it is accessible

## block scoping
* But `let` and `const` are also **block level scope**
  - This is not true with `var`
  - So `let` and `const` are both function scoped and block level scope
  - When something is block level scoped not only is it bound to functions but it is also bound to code blocks (thinks like code blocks for `for` loops or code blocks for `if` statement - and this is NOT true for `var`)

```
// block scoping
var fullName = 'John Wayne';

if (fullName) {
    var firstName = fullName.split(' ')[0];
    console.log(firstName);
}
// Will output `John` in the console
```

* `var` is function scoped
* So `fullName` and `firstName` are scoped to same function (the global scope in this case)
* But this will also work because `var` is block scoped

```
var fullName = 'John Wayne';

if (fullName) {
  var firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName); // will also show `John` in console
```

## But if you use `const` inside our if statement
```
var fullName = 'John Wayne';

if (fullName) {
  const firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);
```

* You'll get an error on `firstName` because you can't access the variables outside the code blocks
  - The log inside our if statement does work, but the log outside the block statement is not defined

## Same thing is true for `let` defined variables
```
var fullName = 'John Wayne';

if (fullName) {
  const firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);
```

## If you want to use `let` outside scopes do this:
```
var fullName = 'John Wayne';
let firstName;

if (fullName) {
  firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);
```

* Block level helps us as programmers as it prevents our variables from bleeding out of scopes where they shouldn't be accessible

## Use `let` and `const`
```
const fullName = 'John Wayne';
let firstName;

if (fullName) {
  firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);
```

## Remove `var` from our project
* Stop watching the `es6-let-const.js` file
* Run our previous babel command:

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

### Run the server again
* `$ live-server public`

### Rename `OFF.eslintrc` to `.eslintrc`

## Our code without `var` (we won't use var ever again!)
`app.js`

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
