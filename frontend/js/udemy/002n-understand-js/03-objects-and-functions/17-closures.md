# Understanding Closures
* Closures is topic that is vital to understand if you are going to advance at all at understanding and writing the language
* This is a notorious topic
* This is difficult to understand

## Sample Code
* Shows the power of closures

```
function greet(whatToSay) {

  return function(name) {
    console.log(whatToSay + ' ' + name);
  }

}
```

* Take a close look at this
* We have a function that **returns** a function
* When we call `greet()`, we'll get a value back
    - But instead of a string, number, Boolean, we are going to get a function that we can then, invoke again
    - Because functions are objects, we can return them as a value

```js
function greet(whatToSay) {

  return function(name) {
    console.log(whatToSay + ' ' + name);
  }

}

greet('Hi');
```

* That won't work
* You have to invoke the function

```js
function greet(whatToSay) {

  return function(name) {
    console.log(whatToSay + ' ' + name);
  }

}

greet('Hi')('Tony'); // Hi Bob
```

* Something strange happened
* To explain

```js
function greet(whatToSay) {

  return function(name) {
    console.log(whatToSay + ' ' + name);
  }

}

var sayHi = greet('Hi');
sayHi('Tony'); // Hi Bob
```

* It still works
* Think about this
    - How does the `sayHi` variable still know the `whatToSay` variable?
    - Because the `whatToSay` variable was created with `greet('Hi')`
        + But it ran and was done and it was over
        + It ran it's execution and it popped off the execution stack
        + But yet when you call `sayHi('Bob')` it still has the proper value of `whatToSay`
        + How is that possible?
        + It is possible because of **Closures**

## Looking under the hood
* We have our code

![our code](https://i.imgur.com/TlFf5ZN.png)

* This seems unusual because the `greet()` function ends and when we invoke the function that is returned it seems like the `greet()` function is still hanging around somehow because the `whatToSay` variable is still there

### What is happening
* When the code starts we have our Global Execution Context
* When we hit `var sayHi = greet('Hi');`

![sayHi](https://i.imgur.com/2lK03Wp.png)

* That invokes the `greet()` function and a new Execution Context is created
    - And the `whatToSay` variable sits inside its **variable environment**
    - It returns a new function object
        + It creates a new function on the fly and returns it
        + After that return the `greet` Execution Context is **popped off the stack** 
        + Every Execution Context has this space in memory where the variables and functions inside of it live
        + What happens to that memory space when the Execution Context goes away?
            * Under normal circumstances the JavaScript Engine would eventually clear it out using a process called **garbage collection**
            * But at the moment that Execution Context finishes that memory space is still there

![memory space still there](https://i.imgur.com/Pzxi22O.png)

* OK, so we move on and now we are in the Global Execution Context again
* Then we invoke the function that `sayHi()` is pointing at

![sayHi](https://i.imgur.com/NcF6NVp.png)

* It is an anonymous function because we didn't give our function a name when we returned it

![anonymous function](https://i.imgur.com/zBv1hkK.png)

* And then that creates a new Execution Context

1[new Execution Context](https://i.imgur.com/ExNwHG3.png)

* And we pass the name variable `Tony` so that will end up in its memory
* But when we hit `console.log(whattosay + ' ' + name);`

![what to say](https://i.imgur.com/9Tz0npv.png)

* When its code is invoked and JavaScript sees the `whattosay` variable
    - What does the JavaScript Engine do?
    - It goes up the **scope chain**
    - There is an outer Lexical environment reference
        + It goes to the next point outside where the function was created to look for that variable since it couldn't find it inside the function itself
        + Even though the Execution Context `greet()` is gone and popped off the stack, the whattosay 'Hi' still has a reference to a memory space of its outer environment

![outer environment reference](https://i.imgur.com/2BQNLRy.png)

* In other words, even though the `greet()` function ended/finished, any function created inside of it when they are called, will still have a reference to the `greet()` functions memory
    - greet() is gone but what's in memory for the Execution Context isn't and the JavaScript Engine makes sure that our function can still go down the scope chain and find it even though its not on the Execution Context stack anymore
* So this is where we say the Execution Context has closed in its outer variables

![Execution Context outer variables](https://i.imgur.com/9duBUDR.png)

* The variables that it would normally have reference to anyway even though those Execution Contexts are gone
* This phenomenon of it closing in all the variables that it is supposed to have access to is called a **Closure**

![Closure](https://i.imgur.com/r2LbqzG.png)

* This is not something that you create or tell the JavaScript Engine to do
* Closures are just a feature of the JavaScript programming language, they just happen
* It doesn't matter when we invoke a function
    - We don't have to worry if its outer environments are still running
    - The JavaScript Engine always makes sure that whatever function I'm running that it will have access to the variables that its supposed to have access to
    - That its **scope** is intact
* This is a feature of the language that is extraordinary and powerful and we rely on it a lot
* It enables us to make interesting coding patterns
* If we understand what is happening under the hood, **closures** aren't all that complicated
* Closures are just a feature to make sure that when you run a function it works the way its supposed to, that it has access to those outer variables, it doesn't matter whether the outer functions have finished running or not
* You don't create a closure, the JavaScript Engine creates the closure, we just take advantage of it
