# Framework aside - Whitespce
## Whitespace
* Invisible characters that crate literal "space" in your written code
    - Carriage returns
    - tabs
    - spaces
* Makes your code more human readable
* But that is really now what is being executed on the computer system
* The JavaScript syntax parser is very liberal about what it allows when it comes to whitespace

```js
var firstname, lastname, language;

var person = {
  firstname: 'John',
  lastname: 'Doe'
}

console.log(person);
```

* Run code
* You see your object with variables

```js
var
    // first name of the person
    firstname,

    // last name of the person
    lastname,

    // the language
    // can be 'en' or 'es'
    language;

var person = {
  // the first name
  firstname: 'John',

  // the last name
  // (always required)
  lastname: 'Doe'
}

console.log(person);
```

* Above will still run the same
* Even with all the whitespace
* The syntax parser ignores all the whitespace
* Lots of frameworks and libraries use lots of whitespace and comments
* It can be offputting with the liberal use of whitespace
* The programmer is taking advantage of whitespace to teach us something
* You should use whitespace like this
* Comment up your code!
* Make your code readable
* Make your code understandable
