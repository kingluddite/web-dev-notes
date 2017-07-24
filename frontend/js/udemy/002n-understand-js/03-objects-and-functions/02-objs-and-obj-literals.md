# Objects and Object Literals
* `new Object()` not best way to create new object

## Object Literal
`var person = {};`

That is the same as `var person = new Object();`

```
var person = {};
console.log(person);
```

* Will output an empty object
* This is shorthand
* This is NOT an operator
* When JavaScript Engine comes across `{` curly brace and it is free (not part of an if statement or a for loop..), it assumes you are creating an object

## We also can intialize the object
* With properties and methods all inside the curly braces
* `var person = { firstname: 'John', lastname: 'Doe' };`

```js
var person = { firstname: 'John', lastname: 'Doe' };
console.log(person);
```

* Will output object with two properties

## JavaScript is liberal with use of white space
* Use it to make your code still readable

```
var person = {
  firstname: 'John',
  lastname: 'Doe'
};
```

* Above is still treated as if it is one line of code

## Object inside objects in object literals
```
var person = {
  firstname: 'John',
  lastname: 'Doe',
  address: {
    street: '123 Elm Street',
    city: 'New York',
    state: 'NY'
  }
};

console.log(person);
```

* The object literal is treated as one line of code
* So much faster than using `var person = new Object();`
* This is the **preferred** way to quickly create an object
* I can create an object anywhere that I can create any other variable on the fly
    - Just like we can pass a number to a function or a string and create it on the fly
    - We can create an object on the fly and pass it to a function

```
var John = {
  firstname: 'John',
  lastname: 'Doe',
  address: {
    street: '123 Elm Street',
    city: 'New York',
    state: 'NY'
  }
};

function greet(person) {
  console.log('Hello' + person.firstname);
}

greet(John);
```

## Can call a function and create an object on the fly
```js
var John = {
  firstname: 'John',
  lastname: 'Doe',
  address: {
    street: '123 Elm Street',
    city: 'New York',
    state: 'NY'
  }
};

function greet(person) {
  console.log('Hello' + person.firstname);
}

greet(John);

greet({ 
  firstname: 'Tom', 
  lastname: 'Doe' 
});
```

Will output

```
Hello John
Hello Tom
```

* We are calling a function
* And not only are we passing an object
* But we are passing and creating it at the same time and the JavaScript Engine is totally cool with it
* It is no different to passing a number or a string on the fly

### Mix and match your methodologies
```js
John.address2 = {
    street: '456 Easy Stree'
}
```

### Why does this work?
* The code your write is being translated by the JavaScript Engine into something the computer can understand 
* The syntax (object literals, the dot operator, new object), it is all doing the exact same thing under the hood
    - It is creating a new object in memory and its properties and methods in memory and that's it
    - So the syntax doesn't matter because in the end you are creating the same thing   
    
### Takeaway
That is why object literal syntax is preferred because it makes clean looking easy to understand code
