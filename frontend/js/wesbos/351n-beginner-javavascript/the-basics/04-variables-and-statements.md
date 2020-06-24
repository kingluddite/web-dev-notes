# Variables and Statements
## Declare a variable
```
var first = 'wes'; // variable declaration statement
let age = 300;
const cool = true;
console.log(first); // function call statement
```

## semi-colon
* Used to end a `statement`
* semi-colon go at end of statement

## Why don't I have a semi-colon on first line?
```
if (age > 10) {;
    console.log('you are old');
}
```

* Because that is referred to as a "code block"
* We could use ASI (Automatic Semi-colon insertion)

## You only need to declare a variable with `var` keyword once

## strict mode
```
'use strict'
```

* If you use this and try this:

```
'use strict'
dog = 'peaches';
```

* You will get an error that `dog` is not defined
* If you don't use `'strict'` you won't get that error

## It is enabled by default when writing JavaScript modules
* You will just be writing JavaScript modules

##Scoping
* Answers the question: "Where are my variables available to me?"
* var variables are scoped differently than `const` and `let`
* `var` variables are **function** scoped
* `let` and `const` variables are  **block** scoped

### Good tips with declaring variables
* `const` by default
* change to `let` when you need it
* rarely (if ever) use `var`

## Naming conventions for variables
* Don't start with capital letter
* Variables should not start with a capital letter unless they are a "class"
* Variables must start with `a-z`
* They also can start with or contain `$` or `_`
* `_` is synonymous with lodash library
* `$` is synonymous with jQuery library
* Use camelCaseNotation for variable names
* Upper CamelCaseNotation for class based names
* You can not use kebab case in JavaScript (dashes are also substraction operator) this-is-kebab-case
* `this_is_snake_case`


