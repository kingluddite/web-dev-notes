# Truthy/falsy
* Not true/false

* **note** If we try to access an item that does not exist we get back `undefined` 

```
const products = [];
const product = products[0];

if (product !== undefined) {
  console.log('Product found');
} else {
  console.log('Product Not Found');
}
// Product Not Found
```

* If we add an item

```
const products = ['some item'];
const product = products[0];

if (product !== undefined) {
  console.log('Product found');
} else {
  console.log('Product Not Found');
}
// Product Found
```

## Our simple example just checks for a Boolean true or false

### In JavaScript there are several "Truthy" values
* Every single value in JavaScript will always evaluate to "truthy" or "falsy"
    - This means when evaluated in a Boolean context that value will either be **true** or **false**

### What is a Boolean context?
* Any place in our code where we expect a Boolean (like in our if condition above)

## Truthy - Values that resolve to true in boolean context
* String
    - When JavaScript sees a string it will not crash, instead it will see that we have a non-boolean value in a place where it usually expects a boolean and it will do its best to convert this string into a boolean (and this is where the truthy/falsy definitions come into play)

```
const products = ['some item'];
const product = products[0];

if ('hello') {
  console.log('Product found');
} else {
  console.log('Product Not Found');
}
// hello
```

* Objects (empty or not) will always be truthy

```
const products = ['some item'];
const product = products[0];

if ({}) {
  console.log('Product found');
} else {
  console.log('Product Not Found');
}
// Product found
```

## Falsy - Values that resolve to false in boolean context
* It's easy to define what's falsy because everything else is truthy

### 5 Falsy Values
* false
* 0
* empty string ('')
* null
* undefined
* NaN

#### Let's try our code with `undefined`
```
const products = ['some item'];
const product = products[0];

if (undefined) {
  console.log('Product found');
} else {
  console.log('Product Not Found');
}
// undefined
```

## Challenge
* Using our code at the beginning but using truthy falsy to determine if there is a product or not
    - Remember if the product is undefined that is falsy

```
const products = [];
const product = products[0];

if (product) {
  console.log('Product found');
} else {
  console.log('Product Not Found');
}
// Product Not Found
```

## NaN
* You get this type when you try to perform a Math operation that is not valid
    - example: Divide 1 by 0 (Infinity and that is falsy)
    - [great article](https://www.sitepoint.com/javascript-truthy-falsy/)

## Challenge
* Convert notes to use truthy/falsy where applicable

`notes-edit.js`

```
// MORE CODE

if (note === undefined) {
  location.assign('/index.html');
}

// MORE CODE
```

* Becomes
    - We use the `!` to get the opposite value
    - So if note is false (if it is undefined it will be false)

```
if (!note) {
  location.assign('/index.html');
}
```

* We also update

```
    if (!note) {
      location.assign('/index.html');
    }

```

* We can also update this:

```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  return notesJSON !== null ? JSON.parse(notesJSON) : [];
};
```

* To this:

```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  return notesJSON ? JSON.parse(notesJSON) : []; // update this line
};

// MORE CODE
```

## Update todo app
`todos-functions.js`

```
// fetch existing todos from localStorage
const getSavedTodos = () => {
  // Grab any todos from localStorage
  const todosJSON = localStorage.getItem('todos');

  return todosJSON ? JSON.parse(todosJSON) : [];
};
// MORE CODE
```

```
// MORE CODE

// toggle the completed value for a given todo
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) { // update this line
    todo.completed = !todo.completed;
  }
};

// MORE CODE
```

## These are truthy
* '0' (a string containing a single zero)
* 'false' (a string containing the text “false”)
* [] (an empty array)
* {} (an empty object)
* function(){} (an “empty” function)
