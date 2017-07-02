# Function Constructors
`new` and the history of JavaScript

## object literal syntax
* One way to build objects

## There are other ways to build an object
* Especially when it comes to setting the prototype

## JavaScript history
* Built by Brandon Eich
* There were battles between programming languages
    - Netscape
    - Microsoft
    - Oracle
    - Sun
* Originally JavaScript wasn't meant soley for the browser but eventually that became its main purpose
    - It was called JavaScript to attract java developers because there were a lot of java developers and if you don't have developers using your language it dies
    - Microsoft called theirs VBScript to attack Visual Basic developers
    - JavaScript is nothing like Java the name JAVAscript was created purely for marketing reasons
* This line of code was used to market JavaScript

`var john = new Person();`

* Java developers were used to creating objects just like this
    - Using the `new` keyword and something called a **class**
    - A class in Java is NOT an object but it defines an object
    - You use the `new` keyword to create a new instance of an Object
    - JavaScript doesn't have classes but ES6 has a **class** keyword
        + But even then it is still not a class like in Java, C++ or C#
* But Java developers looked at code like the line above and they would say "Oh, JavaScript is just like Java!"

## Function constructors and the keyword `new`
`app.js`

```js
function Person() {

  this.firstName = 'John';
  this.lastName = 'Doe';

}

const john = new Person();
console.log(john);
```

* That will return an object named Person with a firstName 'John' and a lastName 'Doe'
* The `new` keyword is an **operator**

![new is operator](https://i.imgur.com/JCdTugp.png)

## What happens when we use `new`?
* An empty object is created
    - Just like if we did this `var a = {};`
* After it creates an empty object it invokes the function Person()
* When the function is called the Execution Context generates for us a variable called `this`
* In this case when you use the `new` keyword it changes the `this` to point to that new empty object
* So `this` now points to that empty object in memory that `new` created
* `this.firstName` and `this.lastName` is adding it to that empty object
* As long as the object doesn't return a value the JavaScript Engine will return that object that was created by the `new` operator

### Let's prove that this object is being invoked
```js
function Person() {

  
  this.firstName = 'John';
  this.lastName = 'Doe';
  console.log('This function is being invoked');
}

const john = new Person();
console.log(john);
```

* Run and you'll see the log runs which means the function was invoked
* **output** `This function is being invoked`

![function invoked and returned object](https://i.imgur.com/BAxO8fn.png)

* We see not only was the function invoked but the object was returned

## What if I did nothing
```js
function Person() {

  console.log(this);

}

const john = new Person();
```

* It would return an empty object

![empty object returned](https://i.imgur.com/TB90hUo.png)

### What if I return something else from this object
```js
function Person() {

  console.log(this);
  this.firstName = 'John';
  this.lastName = 'Doe';
  console.log('This function is being invoked');

  return { greeting: 'i got in way' };
}

const john = new Person();
console.log(john);
```

* It would return that and I would be getting in the way of the JavaScript process
* But if you don't return anything the JavaScript Engine will see you invoked the function using the `new` **operator** so I am going to give you back the object that was set as the `this` variable before the function starting executing when the execution context was created
* This is letting me construct an object via a function
* So we call an object that is used specifically to construct an object a **function constructor**

## What if I create another object?
```js
function Person() {

  console.log(this);
  this.firstName = 'John';
  this.lastName = 'Doe';
  console.log('This function is being invoked');

  return { greeting: 'i got in way' };
}

const john = new Person();
console.log(john);

const jane = new Person();
console.log(jane);
```

* Both invocations work
* The second time it is invoked again
* A new empty object is created, the function is run and the empty object is worked on inside the function and an empty object is returned

## One problem
* The first and last names always have the same values
* We can make this work better by remembering that **function constructors** are just `functions`
* To make firstName and lastName be whatever I want them to be, I just set **parameters**

### Setting Parameters
```js
function Person(firstName, lastName) {

  console.log(this);
  this.firstName = firstName;
  this.lastName = lastName;
  console.log('This function is being invoked');
}

const john = new Person('John', 'Doe');
console.log(john);

const jane = new Person('Jane', 'Doe');
console.log(jane);
```

* Now you'll see the first and last names are output for each object

## Steps to remember when using `new` operator
1. An empty object is created
2. The function is invoked
3. The object is returned
4. A common pattern is to pass the function constructor parameters to set the property values of the new returned object

* We are still just calling a function
* But we are changing what is created and what gets returned and what `this` points to

## Function Constructors
A normal function that is used to construct objects

* The `this` variable points a new empty object, and that object is returned from the function automatically

## Next - Setting the prototype with function constructors
