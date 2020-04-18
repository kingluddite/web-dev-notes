# Strict Mode
* Strict mode is a different mode in which we can run our JavaScript
* When we "opt-in" to this new mode we are opting-in to a slightly better version of the JavaScript language
    - This will help us avoid weird JavaScript language traps because they are tweaked in strict mode
    - strict mode makes it easier for us to write cleaner, less error-prone JavaScript code

`notes-functions.js`

```
const processData = () => {
  data = '123423423';
};
processData();

// MORE CODE
```

* What happens?
    - What do we know about `scope` in JavaScript?
    - We know that if we call processData(), it will run the function
    - The function will try to assign the variable data to the string
        + It will first look for data in the local scope, it won't find it, so it will go to the parent scope (which is the global scope) and it won't find it there, so then it will create it (create a `data` variable in that global scope)
        + After we run process data we can access `data`

## Run the code
* You will see our string in the console
* This is called a "leaked" global
    - Because of a `typeo` in our code we are accidentally created a global variable
    - This code runs without letting us know that anything weird happened


### Let's enable strict mode
```
'use strict';

const processData = () => {
  data = '123423423';
};
processData();
console.log(data);

// MORE CODE
```

#### Now we get an error (ReferenceError)!
* Now we get an error in our console `Uncaught ReferenceError: data is not defined`
* When we enable strict mode the JavaScript processor will catch our bad code, making it way easier to fix our error before they become bugs, mess up the user experience or delete data or anything else that we don't want to happen with our app

### Why are we also getting another error about getSavedNotes?
* Because the first error, the getSavedNotes never gets set up/defined
* If you fix the first error, the second error will be also fixed

### How do you want to fix it
* Scope the variable globally

```
'use strict';

let data;
const processData = () => {
  data = '123423423';
};
processData();
console.log(data);

// MORE CODE
```

* Run and both errors are fixed

## strict mode also makes our code more "future proof"
* We turn off strict mode and use public as a variable
* No errors

```
let public;
let data;
const processData = () => {
  data = '123423423';
};
processData();
console.log(data);
```

* But if we add strict mode

```
'use strict'
let public;
let data;
const processData = () => {
  data = '123423423';
};
processData();
console.log(data);
```

* Now we get an error
```
Uncaught SyntaxError: Unexpected strict mode reserved word
```

* In the future `public` will be a reserved word

## Remove sample code but add `'use strict'` to all our notes and todo app files

* [reserved words in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)

## Next - Object Oriented Programming
* How JavaScript is different than classical OOP languages like Java
