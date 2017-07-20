# Variable mustation and type coercion
```js
var name = 'John';
var age = 26;
console.log(name + age); // John26
```

## Why does JavaScript combine the string and number into a string?
* It is using `type coercion`
    - JavaScript converts some data on the fly when it needs it
    - It doesn't always happen
* JavaScript is trying to figure out automatically which of the variables it is trying to convert and then converts them all to the same data type

`console.log(age + age); // 52`

* Above JavaScript uses no coercion and instead just adds two numbers together and returns a number

### Chrome Dev Tool
* Black color are strings
* Blue colors are number 

## Create multiple variables without assigning them values
```js
var job, isMarried;

console.log(job); // undefined
```

* Undefined is what gets assigned to a variable before its value is actually declared

## Only use `var` keyword when we first declare the variable
```js
var job, isMarried;

console.log(job);

job = 'teacher';
isMarried = true;

console.log(`${name} ${age} ${job} ${isMarried}`); // John 26 teacher true
```

* All was coerced to a String

## Variable Mutation
```js
var name = 'John';
var age = 26;
// console.log(name + age);
// console.log(age + age);

var job, isMarried;

// console.log(job);

job = 'teacher';
isMarried = true;

console.log(`${name} is a ${age} year old ${job}. Is he married? ${isMarried}.`);

job = 'developer';
age = 'forty';

console.log(`${name} is a ${age} year old ${job}. Is he married? ${isMarried}.`);
```

* This shows our code is read as a sequence of instructions

### prompt()
#### How do we get data from the console
Instead of writing to the console we want to get data from the console

`var lastName = prompt('What is your last name?');`

![prompt](https://i.imgur.com/IITwZIz.png)

* We see the prompt pop up and we enter a last name and nothing happens
* Because we didn't tell it to do anything with the variable
* But if we do this:

```js
var lastName = prompt('What is your last name?');
console.log(lastName);
```

* We enter a last name
* Press return
* Whatever we typed into the prompt gets returned via the console

### alert()
``alert(`${name} is a ${age} year old ${job}. Is he married? ${isMarried}.`);``


