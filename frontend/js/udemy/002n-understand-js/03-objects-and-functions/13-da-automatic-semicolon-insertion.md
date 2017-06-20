# Dangerous Aside - Automatic Semicolon Insertion
* This mistake is so costly, you need to always avoid it
* This mistake is almost impossible to track down

## Has to do with syntax parsers in JavaScript
* The syntax parser does something in JavaScript and tries to be helpful
* Semicolons are optional in **core** JavaScript
* The parser sees one character at a time
* It knows what the language should expect

```
return(carriage return)
```

* The carriage return is an invisible character but it is a character
* The syntax parser sees the return character and knows what it is
* It sees your return with a carriage return and no semicolon and says "You are not allowed to go to the next line so I will inject a semicolon here"
    - Anywhere the JavaScript parser expects a semicolon to be it will inject it
    - That is why semicolons are **optional**
    - Not because it is truly optional but that the JavaScript Engine is putting semicolons where it thinks they should be if they are missing

## Rule
* Always put your own semicolons
* Automatic semicolons can cause a big problem in your code

## Example
```
function getPerson() {

  return
  {
    firstname: 'John'
  }

}

console.log(getPerson());
```

* We have a function that will return a simple object
* We are using object literal syntax here
* We think we should get an object with a firstname key and a value of 'John'
    - Instead we get `undefined`

### Why did that happen?
Because of automatic semicolon insertion

* This is what JavaScript ran
* Notice the `return;` line

```js
function getPerson() {

  return;
  {
    firstname: 'John'
  }

}

console.log(getPerson());
```

### Rule
Write code like this:

```js
function getPerson() {

  return {
    firstname: 'John'
  }

}

console.log(getPerson());
```

### Rule
* Always put your curly brace `{}`, on the same line as your for loops, if statements
* The reason is so you never make this mistake:

```js
return
{
    firstname: 'John'
}

