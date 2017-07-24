# 'arguments' and spread
## arguments
* Special keyword that the JavaScript Engine sets up for you automatically when you execute a function

## spread
* In E6 we won't use arguments but instead will use `spread` which is the new approach to what arguments does currently
* But any code in current libraries and frameworks you will see the `arguments` variable
* So you should know what `arguments` is and how to use it

### Digging in
![diagram for Execution Context](https://i.imgur.com/ckvkjPd.png)

* When you execute a function a new Execution Context is created
    - Then the JavaScript Engine sets up things for us:
        + Variable Environment - to hold our variables
        + The Outer Environment with reference for the scope chain
        + The special keyword `this` which will point to different things depending on where the function lives or how it is called
        + Another special keyword is set up called `arguments`
            * `arguments` contains a list of all the values of all the parameters that you pass to whatever function you are calling

## Arguments
* The parameters you pass to a function
* JavaScript gives you a keyword of the same name which contains them all
* You could say:(same thing)
    - Your parameters
    - Your arguments
    - This is the case with really any programming language that has functions
* But JavaScript gives you a keyword of that same name which contains them all

### Wrap your head around this
* When we are talking about the **concept** of arguments we are just talking about the **parameters** you pass to your function
* But the special keyword `arguments` is something special that the JavaScript Engine sets up for you

## Code Example
```js
function greet(firstname, lastname, language) {
  console.log(firstname);
  console.log(lastname);
  console.log(language);
}

greet();
```

* We can run the above with no errors
* This is unique to JavaScript
* Most programming languages would throw an error because they expect the arguments values to be passed
    - But JavaScript doesn't care

### Test in browser
* If we run this in the browser
* View the console and you'll see three `undefined` returned

#### Why do we not get an error?
* Hoisting - the thing that happens when the function is executed, where it sets up the values, takes care of these parameters for us even though we haven't given them values
    - It executed the `greet()` function
    - First thing it did was set up memory space for
        + firstname, lastname and language
        + And set them all to `undefined`

### What if we pass arguments?
* They will be processed left to right

```js
function greet(firstname, lastname, language) {
  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log('---------------');
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'fr');
```

* The JavaScript Engine will assume `John` is the firstname
* And lastname and language will still be `undefined`
* Run and see how this works

## Takeaway
* You can skip passing of parameters
* You can partially pass parameters
* Without errors

## ES6 - Default parameters
`function greet(firstname, lastname, language = 'fr') {`

* So if someone doesn't pass a value, the default value of `fr` will be used for the language parameter

### Adding default pre-ES6 way
```
function greet(firstname, lastname, language) {

  language = language || 'en';
// more code
}
```

* If `language` is undefined it gets passed to the `||` operator
    - It is then **coerced** to false (undefined coerces to false)
        + Then 'en' gets passes to the equals operator `=` so `language` will end up equaling `en`

```
function greet(firstname, lastname, language) {

  language = language || 'en';

  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log('---------------');
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'fr');
```

* Now instead of `undefined` we get `en` for all except for when `fr` is passed to the `greet()` function

## The `arguments` keyword
* We don't have to declare it anywhere
* It is automatically made available to you by the Execution Context

```js
function greet(firstname, lastname, language) {

  language = language || 'en';

  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log(arguments);
  console.log('---------------');
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'fr');
```

* `arguments` contains a list of all the values that you passed to the greet() function

![list of arguments](https://i.imgur.com/i7GPzdI.png)

* It looks like an array because of the `[]` brackets
* But these are slightly italicized brackets
* `arguments` is not an array, it is "array like"
    - It acts like an array
    - It looks like an array
    - But it is not exactly a JavaScript array
        + Only in the sense that it does not have all the features of a JavaScript array
        + People are upset about this and think that arguments should be a regular array but that is what the JavaScript Engine does
        + Under most circumstances we can use it like an array

### How can we use `arguments`?
If no parameters are passed we can alert the user

```js
function greet(firstname, lastname, language) {

  language = language || 'en';

  if (arguments.length === 0) {
    console.log('Missing parameters!');
    console.log('---------------');
    return;
  }

  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log(arguments);
  console.log('---------------');
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'fr');
```

* The first call will make the console say `Missing parameters!`
* `arguments` doesn't contain the **names** of the arguments, just the values we could circumvent that behavior with:

```js
function greet(firstname, lastname, language) {

  language = language || 'en';

  if (arguments.length === 0) {
    console.log('Missing parameters!');
    console.log('---------------');
    return;
  }

  console.log(firstname);
  console.log(lastname);
  console.log(language);
  console.log(arguments);
  console.log('arg 0: ' + arguments[0]);
  console.log('arg 3: ' + arguments[2]);
  console.log('arg 10: ' + arguments[9]);
  console.log('---------------');
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'fr');
```

![aug[0]](https://i.imgur.com/mXmpoWg.png)

* In time `arguments` will be **deprecated**
* It will still be around but won't be the best way to do something anymore

## Spread
The new kid on the block

If I want to add a parameter I can do this:

```
function greet(firstname, lastname, language, ...other) {
  console.log(other);
}
greet('John', 'Doe', 'fr', '111 elm st', 'NY', 'new york');
```

* The `...other` means take all the extra arguments that were passed `'111 elm st', 'NY', 'new york'` and wrap them up into a an array named `other`
