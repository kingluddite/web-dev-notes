# Functions are Objects
* Most fundamental Concept
* This is the difference between someone that uses JavaScript to someone that deeply understands it
* This is where we can learn to use JavaScript in ways that other popular programming languages can't match

## First Class Functions
In JavaScript, functions are Objects

### What are First Class Functions
Everything you can do with other types you can do with functions

* Assign them to variables, pass them around, create them on the fly
* First Class functions change the way you can program
* They can open up the horizons to completely different approaches to solving problems

### What does the function object look like?
* Just like all other objects, it resides in memory
* But it is a special type of object
    - Because it has all the features of a normal object
    - But it has some other special properties

#### You can attach properties and methods to a function
* This surprises people
* Why?
    - Because the function is just an object
    - I can attach to functions
        + Primitive
        + Object
        + Other functions
            * This can come in handy as we'll find out later

### Hidden Special Properties of Function JavaScript Objects
![function object model](https://i.imgur.com/S3nL8fx.png)

* Name - optional, can be anonymous
* Code - where the actual lines of code written sit
    - The code that you write is just one of the other properties on the function object
    - The special part of the `CODE` property is that it is `Invocable` ()
        + Meaning that you can say "RUN THIS CODE" and that is when the entire execution contect creation and execution and all of that happens
* You have to think of the function as an object who's code just happens to be one of the properties of that object
* You can pass functions around just like variables, this leads to fascinating programming approaches
    - It allows for interesting syntax
    - That looks weird if you don't understand this fundamental concept

## Example
```
function greet() {
  console.log('hi');
}

greet.language = 'english';
```

* We just added a property to a function
* Take a moment to digest what I just said
* In other programming languages what we just did is not possible
* But becuase in JavaScript functions are objects and since we can attach properties to objects, this is possible

#### What if we log greet?
```
function greet() {
  console.log('hi');
}

greet.language = 'english';
console.log(greet);
```

Our output is:

```
function greet() {
  console.log('hi');
}
```

* We getting the text of the function we wrote (not too useful)
* But if we `console.log(greet.language);` we will get `english`
    - The value is there
    - It is in memory
    - It is attached to the function
    - Just like you can attach a property to any object
    - Because in JavaScript, functions are objects

### Analyis
When we created this function

![function diagram](https://i.imgur.com/cje9cpu.png)

What did it look like?

![function](https://i.imgur.com/zalKaEg.png)

When it was created this function object was put into memory (in our case, onto the Global Object)

* The function had a name - the `name` property is **greet**
* It has a CODE property `console.log('hi')`
    - It contains the body of the code we wrote in the function 
    - If we call `greet()` it invokes the code to be run, it causes the execution context to be created, etc... etc..
* You have to think of a function as more then just a container of code
* It is an object and as such you can pass it around, it sits in memory in a specific location, it has properties, methods because
* In JavaScript FUNCTIONS ARE OBJECTS!

