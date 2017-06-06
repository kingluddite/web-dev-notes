# Conceptual Aside
## JavaScript and `Undefined`

![creation phase diagram](https://i.imgur.com/UhrlnXy.png)

### Dig into what happens when variables are intially set to `undefined` in the creation phase

`app.js`

```
var a;
console.log(a);
```

* Run it and you will see `undefined`
* But if we don't declare it we get this error:

![ref error](https://i.imgur.com/BfJDNZQ.png)

## WTF?
Isn't `not defined` and `undefined` the same thing?

No.

`undefined` is a special value in JavaScript internally, which means the variable hasn't been set

* undefined is not a string like this **'undefined'**
* We don't wrap it in a string
* It is a special keyword

## Proving `undefined`
```
var a;
console.log(a);

if (a === undefined) {
  console.log('a is undefined');
} else {
  console.log('a is defined');
}
```

* This will say `a is undefined`
* `a === undefined` ===> **true**
* If we set `a` to a value like:

```
var a = 'Hello World';
console.log(a);

if (a === undefined) {
  console.log('a is undefined');
} else {
  console.log('a is defined');
}
```

* We now, this time, get `a is defined`
* `a === undefined` ===> **false**

### The intial phase sets all variables to `undefined`
If you don't set variables values they will all have a value of `undefined`

## Undeclared variables
* If you try to reference them you will get an error
* This happens because the intial phase (creation phase), it never saw the variable and so it didn't allocate memory for the variable and assign it to `undefined`
* The browser is telling you `Hey, I don't have that variable in memory anywhere`
* **undefined** is a value
* **undefined** is taking up memory space
* **undefined** is a special keyword
* **undefined** means, this is the value that was initially set by JavaScript

## Best Practice
Never do this:

`a = undefined;`

* Never set yourself a variable equal to `undefined`
* It can be dangerous
* It is better to only let the JavaScript engine in phase one of the execution context to set all variables to `undefined`
* This will help you when debugging code
* If you set variables to undefined, it is almost impossible to determine if you set it to `undefined` or the JavaScript engine set it to undefined
* It is ALWAYS better to let `undefined` mean, I've never set this value
