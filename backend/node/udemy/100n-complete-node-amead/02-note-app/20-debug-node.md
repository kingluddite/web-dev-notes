# Debug Node
# Debug node apps from command line
 
`/playground/debugging.js`

```js
const person = {
  name: 'Kingluddite',
};

person.age = 25;

person.name = 'Joe';

console.log(person);
```

`$ node debuggin.js`

* Outputs object. All good

## Special debug mode
* Need to be in node v8 for this to work

`$ node inspect playground/debugging.js`

![output of debug mode](https://i.imgur.com/DGbaate.png)

### Analyze debug mode
* First 3 lines can be ignored
  - Just says debug is set up and you are ready to debug from the command line

`debug> list(10)` - Prints out 10 lines of code in terminal

* All our code is wrapped in a function

`n` ---> next

* Takes us to the next statement
* This will take us to the very beginning of our code

`n` - keep hitting `n` to step through your function
`c` - continue - to run the rest of the code

## We didn't do any debugging but that was the basic navigation commands

* Shut debugger down `ctrl + c` (twice)

`$ node inspect playground/debugging.js`

* Click `n` 3 times (It will pause you on line 7 `person.name = 'Kingluddite'`

## REPL (Read Evaluate Print Loop)
* To inside debugger
* Similar to what you can do in chrome dev tools
* you can explore variable values
* you can explore various javascript functions
* you can take values and manipulate them

### Leave debug mode and enter REPL
`debug> repl`

* Now you are in repl mode
* Leave with `ctrl` + `c`
* In repl we can access the app as it currently stands
* type `person` (our object)
* `> person.age + 100 `
* `>person.age = 100`
* ctrl + c (now we are back in debug mode)
* c (runs rest of program and you see how we change value of n to 100

## better way
* Use the `debugger` statement
* This is used most often instead of typing `n` to get line by line
* Shut down debugger and restart to trigger `debugger` line
* type `c`
* It will stop on line 7
  - We have a person age = 25
  - We have a person but it hasn't been updated to `Kingluddite` just yet
* Type `> person`
* Type c and it will take you to the debugger line


### Challenge
* In `notes.js`
* Make modification to logNote function
* Break on first line of logNote function
  - use repl to output note

`notes.js`

```js
// more code
const logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};
// more code
```

* Run `$ node inspect app.js read --title="secret santa"`
* Now type `c`
* Swith to `repl` by typing `repl`
* Now type `note` and you will see value of `note`

## Also run nodemon with `inspect`
`$ nodemon inspect app.js read title='secret santa'`

* Same as before but now you can can code while in debug mode an the coe will auto uptdate
