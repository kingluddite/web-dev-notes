# JavaScript Aside
## By Reference and By Value
* We are talking about how JavaScript behaves when you pass a value to a function
    - Whether you pass an object or a primitive

## Primitive
A type of data that represents a single value

* Like a number or a string... In other words, **not an object** 

![prim value](https://i.imgur.com/VSJ8q9S.png)

* We have a number or a string (primitive value)
* We point our variable a to that value and it creates a spot in memory that points to that primitive value

### We then pass `a` to a function
* We call the function and pass it `a`
* What happens with primitives being passed to a function is there is a copy of that primitive value that is created so `b` points to a new location in memory (this is a different location in memory) that holds a copy of the original primitive value

This is called `by value` (we are passing by value)
* This happens naturally in JavaScript

## Pass By Reference
![pass by reference](https://i.imgur.com/NopLKnR.png)

* When we pass an object to a function something very different happens
* `a` might point to an object
    - remember that an object is just a collection of name/value pairs
    - It also will be sitting in a particular spot in memory
    - But when we call a function and pass the object to a function
    - That variable, that paramter inside the function points to the SAME spot in memory as `a`

This is called `by reference`

* No new copy of the object is made but just two variables pointing to the same memory location
* So when you change one, you change the other
    - Because it is the exact same value

### Pass by value example
```js
// pass by value
function change(b) {
  b = 2;
}

const a = 1;
change(a);
console.log(a);
```

* What would you expect the value of `a` be?
* 1
* Why?
    - `a` is a primitive value
    - I passed `a` to the function and because I am passing a primitive value to a function it makes a copy of `a` and points to a new location in memory
    - when we then log `a` it is pointing to the original memory spot value of `1`

## Pass by reference example
```js
// pass by reference
function changeObj(d) {
  d.prop1 = function() {};
  d.prop2 = {};
}

const c = {};
c.prop1 = {};
changeObj(c);
console.log(c);
```

* What do you think will happen?
* c will now have a function for prop1 and an empty object for prop2
* Why?
    - When you pass an object to a function you are passing by reference
    - Which means both objects will be pointing to the same memory location
    - So when you change one object, the other object changes also
    - So when I pass c to d, d changes and so will c
* Node.js takes advantage of this `pass by reference` when it comes to objects in regards to how `require` and `module` works
* Remember, when i pass an object to a function the changes to the different object inside the function will be reflected outside the function because of pass by reference
