# Constructor Functions
* How we can write a function with the `new` operator

```
const person = function() {};

const me = person();

console.log(me); // undefined
```

* What happens when we call the `me` function?
    - `undefined` will be returned
        + Why?
            * We call a function
            * The function doesn't explicitly return anything so JavaScript `undefined` gets implicitly returned

## Let's shake things up
* We'll slightly change our code by using `new`

`person.js`

```
const person = function() {};

const me = new person();

console.log(me); // person {}
```

## Custom object type
* We no longer get `undefined` and now we get `person {}`
* The custom object type gets its name from the function 
* Currently we haven't set up any values that why nothing is showing up inside the person custom object type
* We have just created what is known as a `constructor function`

### Functions that get used with the `new` operator are constructor functions
* The constructor function itself is where we can initialize our data

## Let's talk about the `new` operator
* The `new` operator does a few very important things:

1. It generates a new empty object for this new instance
2. Then it gives us access to that empty object in the constructor function via the `this` value

```
const person = function() {
  console.log(this);
};

const me = new person();

console.log(me);
```

* Will show us that we have access to our new empty object

```
person {}
person {}
```

* The only reason we have access to this new empty object in the constructor function is to start customizing it
    - We can now define the individual pieces of data that a person should have

#
```
const person = function() {
  this.firstName = 'John';
};

const me = new person();

console.log(me); // person { firstName: 'John' }
```

* But we don't want to pass the values for custom object properties from inside but from arguments

```
const person = function(firstName) {
  this.firstName = firstName;
};

const john = new person('John');
const jane = new person('Jane');

console.log(john); // person { firstName: 'John' }
console.log(jane); // person { firstName: 'Jane' }
```

## Naming convention (spell with Capital letter)
* We spelled our constructor function (and function built with `new` operator) will be spelled with a capital letter (not required but very common and recommend to spell like this)

```
const Person = function(firstName) {
  this.firstName = firstName;
};

const john = new Person('John');
const jane = new Person('Jane');

console.log(john);
console.log(jane);
```

* Above is same result but we are capitalizing the constructor
* You will see this naming convention in 99.999999% JavaScript
* When you see the `Capital` letter you know you should use the `new` operator when calling it

## We don't need to return anything from a constructor function
* The new object is used and store on a variable without us having to use return inside the function
    - This is another thing that the `new` operator does
        + It creates that new object
        + And it also uses it as the return value implicitly
        + **note** We could override that and return something

```
const Person = function(firstName) {
  this.firstName = firstName;
  return {}
};

// MORE CODE
```

* There is never a point to return anything from a constructor function
* If you run the code you'll see an empty object is returned but that is never what we want
    - The whole point of a constructor function is to set up our unique object
    - And then get access to it (so leave return off from our constructor functions)

## Multiple properties in a constructor function
```
const Person = function(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};

const john = new Person('John', 'Doe', 30);
const jane = new Person('Jane', 'Doe', 25);

console.log(john); // Person { firstName: 'John', lastName: 'Doe', age: 30 }
console.log(jane); // Person { firstName: 'Jane', lastName: 'Doe', age: 25 }
```

## Get specific values
`john.age` gives us `30`

## Set specific values
```
const Person = function(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
};

const john = new Person('John', 'Doe', 30);
const jane = new Person('Jane', 'Doe', 25);

john.age = 36; // setting age to 36 
console.log(john);
console.log(jane);
```

## Challenge
1. Create a constructor function for the hangman game
2. Setup 2 attributes. One for the word itself. Another for the number of guesses allowed
3. Create 2 instances of it and print both to the console

### Solution
```
const Hangman = function(word, numGuess) {
  this.word = word;
  this.numGuess = numGuess;
};

const gameOne = new Hangman('cat', 10);
const gameTwo = new Hangman('dog', 5);

console.log(gameOne); // Hangman { word: 'cat', numGuess: 10 }
console.log(gameTwo); // Hangman { word: 'dog', numGuess: 5 }
```

## Don't use an Arrow function!
* **IMPORTANT** We don't use an arrow function for custom object functions because arrow functions don't bind this

## Next - Create methods available for every instance
