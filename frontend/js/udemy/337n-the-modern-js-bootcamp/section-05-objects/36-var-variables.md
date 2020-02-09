# Variables with var
* We can reassign with `var` just like we can with `let`

```
var firstName = 'John';

firstName = 'Jill';
console.log(firstName);

```

# Difference between var and const and let and why const and let should be preferred
## var lets us recreate a variable that was already created (declared)

```
var firstName = 'John';

firstName = 'Jill';

var firstName = 'Tom';
console.log(firstName);
```

* const or let wouldn't let us declare a variable already declared
* This is a big problem with var and if we use var is could cause problems for our code
    - const and let help prevent us from overiding a variable we already declared

## Another con of `var`
* `var` is function scoped not block scoped
* if statements don't create a new scope when working with var

```
if (true) {
  var firstName = 'Jen';
}

console.log(firstName); // Jen
```

* Using var `if` statements are function scoped so we have access to firstName
* But if we used `let` or `const` they are block scoped and `firstName` would not be accessible in the global scope because it is inside the block

```
if (true) {
  const firstName = 'Jen';
}

console.log(firstName); // error ---> firstName is not defined
```

## Block scope gives you more flexibility than function scoped
* I can create local variables in if statements using const and let 
    - If I used var those variables would be exposed outside the if statement

## var is function scoped
```
function test() {
  var firstName = 'John';
}

console.log(firstName); // will give you an error that firstName is not defined because it is function scoped
```

## Other problem is accessing a variable before it is declared
### JavaScript will implicitly set declared variables but unassigned to `undefined`
* This is true for `var`, `let` and `const`

```
var myName;
// const myOtherName;
let myOtherOtherName;
console.log(myName);
// console.log(myOtherName);
console.log(myOtherOtherName);
```

* Note that `const` is commented out because you will get an error if you do not assign a value to const variables

## Try to access a variable before it is defined
```
console.log(myName);
var myName;
```

* You will get `undefined`
    - This is because when you declare a variable with `var` it's declaration gets "hoisted" to the top of the scope
    - **remember** It is only the declaration of the variable that gets hoisted

```
// if we assign a value to our var variable, we'll still get undefined
console.log(myName); // still undefined
var myName = 'Joe';
```

* The above because of hoisting really looks like this:

```
var myName;
console.log(myName);
myName = 'Joe';
```

* One more weird example of var

```
firstName = 'Joe';
console.log(firstName); // Joe
var firstName
```

* We get `Joe` from our log because once again the var declaration gets **hoisted** to the top of the program

* But if you do this:

```
console.log(myName);
let myName;
```

* You will get a `ReferenceError: Cannot access 'myName' before initialization`

## Bottom line
* let and const should be used
* var should not be used as let and const are better tools that help our code be cleaner and have less strange old school strange JavaScript bugs
