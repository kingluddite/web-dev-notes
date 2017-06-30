# Closures and Callbacks
* You've probably used these concepts at least once
* When you used `setTimeout()` or jQuery events you were using closures all the time

```js
function sayHiLater() {

  var greeting = 'Hello';

  setTimeout(() => {

    console.log(greeting);

  }, 3000);

}

sayHiLater();
```

* Run and wait 3 seconds
* You will eventually see `Hello`
* We are using function expressions closures right now
* setTimeout() takes a function object because we are passing it at a parameter that is making use of first class objects in JavaScript
* We are creating the function on the fly
    - So we are taking advantage of a function expression
    - We are passing a function object and a second parameter (time) to setTimeout()
    - Then sayHiLater() finishes
    - async processes and the event loop
    - setTimeout goes off outside in the browser counts and waits and then drops an event when 3 seconds has passed and says my timeout has finished and then the JavaScript Engine says are there any functions listening? and it finds one and then it runs that function but `greeting` doesn't exist inside this function and sayHiLater has already finished running so what happens?
    - It goes up the scope chain and it has a closure for `greeting`, it knows the memory space where `greeting` was sitting when sayHiLater was running and it's Execution Context
    - Thanks to the closure it still has access to `greeting` 3 seconds later even though a long time ago sayHiLater finished running

## Same thing for jQuery
```js
// jQuery uses function expressions and first-class functions!
$('button').click(function() {

});
```

* You had a button and a event and you gave it a function!
* click() is a function and inside the code in jQuery it accepts another function to run when that event happens
    - So you used first class functions
    - You passed the function as a parameter
    - And you are using a function expression to declare/setup/define your function at that point

![function expression](https://i.imgur.com/ARFDq1G.png)

* All along if you worked with jQuery you took advantage of first class functions and function expressions and closures
* These functions that do something after you run another function is called a **callback** function
    * Here, take this function and when your done working, execute the function I just gave you
    * I executed you and you in turn will execute this function for me when you're done

## Callback Function
* A function you give to another function, to be run when the other function is finished
* So the function you call (i.e. invoke) 'calls back' by calling the function you gave when it finished

## Callback example
```js
function tellMeWhenDone(callback) {

  const a = 1000; // some work
  const b = 2000; // some work

  callback(); // the 'callback', it runs the function I give it;
}

tellMeWhenDone(function() {

  console.log('I am done!');

});

tellMeWhenDone(function() {

  console.log('I am done too!');

});
```

* I call you and then you call the function I gave you
