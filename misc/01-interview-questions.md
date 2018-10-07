# Interview Questions

## Coding
* last item in string

```js
var myString="JavascriptQuestions";
console.log(myString.length-1);
```

* Palidrome

```js
function palidrome(str) {
  const stringToArray = str.split('')
  const reverseArray = stringToArray.reverse();
  const arrayToString = reverseArray.join('');
  if (str === arrayToString) {
    return true
  }
  return false;
}
```

* Better Palidrome

```js
function palidrome(str) {
  const newString = str.split('').reverse().join('');
  return str === newString;
}
```

* Questions to ask
    - Is it case sensitive? toLowerCase()
    - What if a number is passed? (typeof string)

* Count number of letters

```
function count(str) {
  const lowerCaseString = str.toLowerCase();
  const onlyLettersString = lowerCaseString.replace(/[^a-zA-Z]/g, '');
  const obj = {};
  for (let i = 0; i < str.length; i++) {
    if(obj[str[i]]) {
      obj[str[i]] = obj[str[i]] + 1;
    } else {
      obj[str[i]] = 1;
    }
   }
   return obj;
 }
```

* nth number in a Fibonacci sequence
* draw n numbers    1,2,3,4,5,6,7
* draw fib numbers  1,1,2,3,5,8,18

```
fib(n) = fib(n-1) + fib(n-2)
fib(4) = fib(4-1) + fib(4-2)
fib(4) = fib(3) + fib(2)
fib(4) = 2 + 1
fib(4) = 3
```

**note** the first number in fib is 1 and second number is 1 but then on you add the last 2 fib numbers to get the new number

## Get primitive value of a string in JavaScript
```js
var myVar= "Hi!"
console.log(myVar.valueOf())
```

## React HOC
* Higher order components (HOC) is a function that takes component as well as returns a component

## typecasting
* convert a variable from one data type to another
    - Boolean(value)
    - Number(value)
    - String(value) 

## remove add properties to object dynamically in JavaScript
```js
let user = new Object();
    // adding a property
    user.name='Anil';
    user.age  =25;
    console.log(user);
    delete user.age;
    console.log(user);
```

## Primitive data types in JavaScript
* undefined, null, boolean, string, number

# JavaScript is?
* client-side and with the help of `Node.js` server-side scripting language
* JavaScript is an Object based Programming language
* Data types
    - Number
    - String
    - Boolean
    - Function
    - Object
    - Undefined
    - Symbol

## JavaScript comparison operators
```
>, < , >=, <=, ===, !==
```

## HTMl DOM mouse events
* onclick
* ondblclick
* mousemove
* mousedown
* mouseup
* mouseover
* mouseout

## variables names
* letter, $, _

## isNaN
* returns true if argument is not a number (else it is false)

## undefined variables
```
var a;
typeof a; // "undefined"
```

## function to add elements dynamically to the DOM
```
function addNode() { 
    var newP = document.createElement("p"); 
    var textNode = document.createTextNode(" This is a new text node"); 
    newP.appendChild(textNode);
    document.getElementById("firstP").appendChild(newP); 
} 
```

## global variables
* If you don't declare variables without `var` they will be defined in the global scope and this is not a good thing

## this
* keyword that refers to the object from where it was called

## View state vs session state
* Session state is available to users across pages in a web app
* ViewState is specific to a page in a session

## === vs ==
* first one === is strict equality, returns true when 2 operands have same value without type conversion

## null
* denotes no value or no object

## pop() vs shift()
* work on array, pop() pops off last item, shift() works on first item

## 2 groups of data types
* Primitive
    - Number
    - Boolean
* Reference types
    - Strings
    - Dates

## "use strict"
* Add at top of file and this helps you write cleaner bug free code

## onDocumentReady vs window.onload

## closure
* Locally declared variable related to a function which stays in memory when the function is returned

## for-in
* loops through the properties of an object

```
for (variable name in object) {
    // code here
}
```

## Boolean operators
* &&
* ||
* !

## JavaScript using Prototypical Inheritance
* an object inherits from another object

## difference between function call and apply
* mnemonic - "A is for array and C for comma"
    - apply() - invoke the function with arguments as an array
    - call() - requires the parameters listed explicitly

## slice() vs splice()
* splice is mutating, modifies the array itself
* slice is non-mutating and it creates a new array and returns that

## es6
### filter()
* returns subset of original array

```js
// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const fifteen = inventors.filter(inventor => {
  if (inventor.year >= 1500 && inventor.year < 1600) {
    return true; // keep it
  }
})
```

### `map()`
    - takes in an array, does something with that array and returns a new array (but of same length - map will always return the same amount of things that you give it)

```js
// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
const fullName = inventors.map(inventor => {
  return `${inventor.first} ${inventor.last}`;
});
console.table(fullName);
```
### sort()
```js
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const ordered = inventors.sort((a,b) => {
  if (a.year > b.year) {
    return -1;
  } else {
    return 1;
  }
});
console.table(ordered);
```

* refactor with ternary

```js
const sortedByBirth = inventors.sort((a,b) => a.year > b.year ? -1 : 1);
console.table(sortedByBirth);
```

* Another sort
```js
// 5. Sort the inventors by years lived
const yearsLived = inventors.sort((a, b) => {
  const lastDude = a.passed - a.year;
  const nextDude = a.passed - b.year;
  return lastDude > nextDude ? -1 : 1;
});
console.table(yearsLived);
```

## reduce
* Build something on every single one

### old way
```js
// Array.prototype.reduce()
// 4. How many years did all the inventors live?
var totalYears = 0;

for (var i = 0; i < inventors.length; i++) {
  totalYears += inventors[i].year;
}
console.log(totalYears);
```

### using reduce
```js
// Array.prototype.reduce()
// 4. How many years did all the inventors live?
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
console.log(totalYears); // 861
```
* Don't forget zero because total is undefined at start so we will get an Object Object but when we set the starting point to 0, we get the total years

```js
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
   .map(link => link.textContent)
   .filter(streetName => streetName.includes('de'));
```
