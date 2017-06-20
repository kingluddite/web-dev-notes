# Framework Aside: Function Overloading
* This is something JavaScript does not have but other programming languages do
* Why it doesn't matter that JavaScript doesn't have function overloading

## Code Example
* In other programming languages like Java, C#, C++ there is **function overloading**

### What is function overloading?
* We can have a function with the same name that has different numbers of parameters
* This doesn't really work in JavaScript because functions are Objects
* But that's OK because having first class functions has a lot more options

### But can we have some alternatives to how we call the `greet()` method?
* Example

```js
function greet(firstname, lastname, language) {

}
```

* What if we didn't always want to pass the language?
    - We could default the `language` and then have all our logic inside this function decide what to do when the language is under different circumstances

```js
function greet(firstname, lastname, language) {
  langauge = language || 'en';

  if (langauge === 'en') {
    console.log('Hello ' + firstname + ' ' + lastname);
  }

  if (langauge === 'es') {
    console.log('Hola ' + firstname + ' ' + lastname);
  }
}

greet('John', 'Doe', 'en');
greet('John', 'Doe', 'es');
```

* If you run you'll see (console):

```
Hello John Doe
Hola John Doe
```

```js
function greet(firstname, lastname, language) {
  langauge = language || 'en';

  if (langauge === 'en') {
    console.log('Hello ' + firstname + ' ' + lastname);
  }

  if (langauge === 'es') {
    console.log('Hola ' + firstname + ' ' + lastname);
  }
}

function greetEnglish(firstname, lastname) {
  greet(firstname, lastname, 'en');
}

function greetSpanish(firstname, lastname) {
  greet(firstname, lastname, 'es');
}

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');
```
