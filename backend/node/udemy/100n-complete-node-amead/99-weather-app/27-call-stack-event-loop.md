# Call Stack Event Loop
![how async code works](https://i.imgur.com/npW7Ha7.png)

```js
var x = 1;
var y = x + 9;
console.log(`y is ${y}`);
```

## Call Stack
* Call Stack is part of the V8 engine
* We're not using any APIs
* We're doing any asynchronous programming
* Call stack is very simple data structure that keeps track of program execution inside of V8
* You can add something on top of it
* You can remove the top item
* That is all it can do
* If you have 10 items inside the Call Stack you have to remove the top item 
* If you add something it has to go on the top
* Think about like
    - A can of Pringles
    - Or a tin of tennis balls


### Start executing Call Stack
* The `main()` function runs first
* This is the wrapper function that all our functions are inside
* line by line example

![line-by-line example](https://i.imgur.com/AZrYN2b.png)

### More complex example
```js
var add = (a, b) => {
    var total = a + b;

    return total;
};

var res = add(3, 8);

console.log(res);
```

1. Execute `main()` function
    * That starts program
2. We just define the variable `add` (we are not executing the function yet)
3. Jump to the line where we call add `var res = add(3, 8)`
    * When you `call` a function it gets added on top of the call stack
    * When you `return` from a function it gets removed from the call stack

![we stack up our call stack](https://i.imgur.com/4DSd6RQ.png)

* When we return total, `add()` gets removed
* Then the console.log() runs, prints 11 to the screen
* Then the `main()` gets removed from the stack when we implicitly `return`


**note** So far we have yet to use Node APIs, the Callback Queue, or the Event Loop

## Time for our async example
```js
console.log('starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('second setTimeout');
}, 0);

console.log('Finishing up');
```

1. Run `main()` function in call stack
2. This tells V8 to run the code
3. A console.log gets added to the stack, executed and removed
4. Now we call setTimeout() which is a Node API, it is not available inside of v8, it is something that Node gives us access to
5. When we call it we are registering the event/callback pair in Node API   The event is to wait 2 seconds and the callback is the function we provided in the first argument
6. The setTimeout gets removed from callstack but stays in Node API and starts counting down the 2 seconds
7. The call stack continues to do its job
8. The call stack can only run one thing at a time
9. The next setTimeout gets run in the call stack

![2nd setTimeout called](https://i.imgur.com/bOp7lWV.png)

10. The second setTimeout gets registered in Node API and the call stack removes the statement from the call stack

11. When the 2nd setTimeout executes after 0 seconds it does not get executed, instead it gets sent to the Callback queue (this is all the callback functions that are ready to get fired)

![callback queue](https://i.imgur.com/iy8FzCn.png)

* The callback queue is where our callbacks wait
* They need to wait for our call stack to be empty
* When call stack is empty we can run the first function, if there is another function it has to wait until the first function has completed running
* This is where the event loop compes into play
* The Event loop looks at the call stack, if the call stack is not empty the event loop does nothing
* If the call stack is empty the event loops looks to see if there is anything to run
* The call stack isn't empty
* So we run the last console.log() statement that says "Finishing Up"
* That executes is removed
* The main is complete and it gets removed() from the call stack
* Now the event loops sees the call stack is empty and there is a function in the callback queue, the event loop moves the callback to the call stack
* It will then run the console.log('second timeout')
* After it executes
* It implicitly returns and that removes the callback()
* 2 seconds later the setTimeout() runs in Node API and moves to callback queue
* The event loops sees the call stack is empty
* The event loop passes the first setTimeout() to the call stack
* The call stack runs the callback
* It runs and executes the console.log(inside of callback)
* It finished and is removed the implicit return removes the callback
