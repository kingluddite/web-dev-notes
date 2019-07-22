# Debug your work

```
function reverse(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}
```

* Add a debugger statement


```
function reverse(str) {
  debugger;
  return str.split('').reduce((rev, char) => char + rev, '');
}
```

* Any time the JavaScript interpreter executes this line of code it will pause in execution
* And we can take that opportunity to insect some of the different variables floating around our program

## How do we "catch" this debugger?
* When dropping in "debugger" we have to manually call the function

```
function reverse(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}

module.exports = reverse;
```

* So above we are defining the function and immediately exporting it
* If you want to use a debugger, make sure that you call the function

```
function reverse(str) {
  debugger;
  return str.split('').reduce((rev, char) => char + rev, '');
}

reverse('hello');

module.exports = reverse;

```

## Execute file in debugger mode
`$ node inspect index.js`

* You will see something like this:

```
< Debugger listening on ws://127.0.0.1:9229/1370e00f-fbd3-4dba-a103-bc7ee28e1989
< For help, see: https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in file:///Users/philiphowley/Documents/dev/javascript-stuff/algos/033e-algo-casts/exercises/reversestring/index.js:14
 12 }
 13
>14 reverse('hello');
 15
 16 module.exports = reverse;
debug>
```

* We see there is a debugger listening and it is attached to our running process
* As soon as it started up it paused in execution on the first line of our file
* And at this point nothing is running and the debugger is ready to inspect our code

## continue
* Type `continue`, `cont` or just `c` to tell this inspector to continue executing our code

`> c`

* Now the interpreter executed our file line by line until it found a debugger statement and once it hit the debugger statement it paused in execution
    - And now you can inspect some of the variables that are floating around inside this function

## Can we inspect the `str` in our example?
* No you can not!

## How can we inspect `str`?
* You have to enter a `repl` mode (read-eval-print loop)

## How to enter `repl` mode
`$ repl`

## What does `repl` do?
* It kicks us into a JavaScript console where we can inspect variables that exist inside our codebase

### Now we'll examine `str`
`$ str`

* You will see `hello` (the value of that variable)

### Copy code and see what it does
`> str.split('').reduce((rev, char) => char + rev, '')`

* And you will see `olleh` (shows you the reverse function is working as we expect)

## How to exit the repl?
`ctrl` + `c`

* That takes you back to debug mode

## How to continue execution of my file?
`> c` and `enter` again

* If there is no other debugger statement it will just quit

## How to completely exit the debugger?
`ctrl` + `c`

### Another example:
```
function reverse(str) {
  let reversed = '';

  for (let character of str) {
    reversed = character + reversed;
    debugger;
  }

  return reversed;
}
```

## Enter debug mode

`$ node inspect index.js`

* That will kick us into debug mode
* We are pausing execution on the first line of the file

## Continue execution of our file
`cont`

* That will continue execution of our code until we get to the debugger statement

## Enter the repl
`repl`

* Use this to start to inspect some of the variables at this time

### What are some variables I want to inspect?
```
function reverse(str) {
  let reversed = '';

  for (let character of str) {
    reversed = character + reversed;
    debugger;
  }

  return reversed;
}

```

* character (`'h'`)
* str (`'hello'`)
* reversed (`'h'`)

* **note** The debugger is inside a for loop which will be executed many times in a row

## Next loop
`ctrl` + `c` to leave the repl

## Continue execution again
`cont`

## Enter repl again
* Now you can examine the variables again but now they will have values from the 2nd iteration of the for loop

* character (`'e'`)
* str (`'hello'`)
* reversed (`'eh'`)

## Rinse and repeat until you get to the end of the for loop
* You will see `waiting for the debugger to disconnect`
* `ctrl` + `c` twice to exit

## Clean up when you are finished with the debugger
* Make sure to remove the `debugger` statement
* Also remove the manual function call
    - We only add that manual function call because if we don't call it, and we start to inspect our file there will be nothing that invokes the `reverse` function we want to inspect
    - If we ran the debugger on this file as it is (see below) nothing actually invokes the function (so even with our debugger inside like below it would never get "caught" because we are never executing the function):

```
function reverse(str) {
  let reversed = '';

  for (let character of str) {
    reversed = character + reversed;
    debugger;
  }

  return reversed;
}

// reverse('hello'); // WE ARE NOT INVOKING OUR FUNCTION!
```

## Steps to run the debugger
1. Add a `debugger` statement in your function
2. Call the function manually
3. At the terminal, run `$ node inspect index.js`
4. To continue execution of the file, press 'c' (or `cont` or `continue`)
5. To launch a 'repl' session, type `repl` then `enter`
6. To exit the 'repl', press `ctrl` + `c`

![steps to use JavaScript debugger](https://i.imgur.com/ATM9N5e.png)





