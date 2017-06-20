# Arrays - Collections of Anything
* An array is a collection
* It can hold many things inside of it

## Ways to create an array
`var arr = new Array();` - too much to type

Or we can use the `array literal` syntax

`var arr = [];`

We can put values inside it

`var arr = [1, 2, 3];`

* They are zero bases
* So arr[0] selects the first item

## JavaScript arrays are a bit different
* Because JavaScript is dynamically typed
* In most languages an array can hold a list of items of a particular type
    - An array of numbers
    - An array of strings
    - An array of objects
* In JavaScript you can put whatever you want in an array
    - Each item in an array can be a different type

```
var arr = [
  1,
  false,
  {
    name: 'John',
    address: '123 Elm St.'
  },
  function(name) {
    var greeting = 'Yo ';
    console.log(greeting + name);
  },
  'I am a string'
];

console.log(arr); // (5) [1, false, Object, function, "I am a string"]
```

* Note that the highlighted portion of code below is an expression because it is not by itself
* It is inside the array declaration so the JavaScript Engine understands that it is creating a function on the fly it is not a function statement, it is a function expression

![expression](https://i.imgur.com/lW5MSVc.png)

### How would we run the function inside our array?
`arr[3](arr[2].name)` ----> `Yo John`
