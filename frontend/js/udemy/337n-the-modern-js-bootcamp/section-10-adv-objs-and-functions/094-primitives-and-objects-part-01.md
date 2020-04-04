# Primitives and Objects: Part 1
* Create a new folder called `hangman` with
    - `index.html` inside it
    - Create a file call `app.js` and reference that file from the html

##
`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hangman</title>
  <script src="./app.js"></script>
</head>
<body>
  <h1>Hangman</h1> 
</body>
</html>
```

## Run server
`$ live-server hangman`

## hasOwnProperty
* Returns true or false
* We can check if an object has a property by providing that property name as an argument
    - If that property exists on the object it returns true
    - If that property doesn't exist on the object it returns false

`app.js`

```
const product = {
  name: 'Bulletproof Coffee',
};

console.log(product.hasOwnProperty('name')); // true
console.log(product.hasOwnProperty('junk')); // false
```

## Why is it called has OWN property and not just hasProperty?
```
const product = {
  name: 'Bulletproof Coffee',
};

console.log(product.hasOwnProperty('hasOwnProperty')); // false
```

* Why is it false?
    - We know it exists because it is working

## To find the answer we need to look at the docs
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
* You'll see Object.prototype.hasOwnProperty()
    - This is because internally when we've been accessing a string internally we've actually been using those shared methods because we were always using `.prototype` (prototypal inheritance)

## up the tree
* Now we look for hasOwnProperty on our product does it exist
    - Nope - so go up the tree but the next thing we have access to is `Object.prototype` (and this is where methods like `hasOwnProperty()` live) and that is how we are able to access them on our object even though the only property we have set up is `name`

### Note:
* Technically `Object.prototype` also has a prototype value and this prototype value is `null` (this just means the chain ends)
    - This means if we search our object and don't find what we're looking for, then we'll look on the Object.prototype and if we don't find it we'll return `null` (and we stop looking for more stuff)

## hasOwnProperty
* Now we know product.hasOwnProperty('hasOwnProperty') was false
    - Because it was looking for that property on product which it doesn't exist... hence the false

## Why are we using the browser?
* Using the browser we can visually explore the prototype chain for anything by dumping it to the console (that's why we switched to HTML)

```
const product = {
  name: 'Bulletproof Coffee',
};

console.log(product.hasOwnProperty('hasOwnProperty')); // false
console.log(product);
```

* We see this in the client console:

```
> Object { name: 'Bulletproof Coffe'}
```

* We get an object but it looks similar to when we outputted an instance of Person or Hangman
  - It first started with the constructor name Hangman (or Person)
  - Then we had our curley braces
    + And inside there we had our `instance properties` that we set up
  - The same thing is true with `Object`
    + Because by using this notation we successfully created a new instance of Object

## __proto__
* Expand Object
![Object expaned](https://i.imgur.com/0pMdSMF.png)

* You will see `name`
* But you'll also see `__proto__`

### [[Prototype]]
* Earlier we saw that thing that links your instance to the Prototype property is `[[Prototype]]` and that is true but it is only for internal use only
* The browser exposes this property `__proto__` so you can view the Prototype chain
  - We will never manually manipulate it
  - We will never use it in our code
  - But it does serve a great purpose by letting us explore how things work

#### Expand __proto__
* You will see lots of methods

![__proto__ expanded](https://i.imgur.com/vjBvtEh.png)

* You will see `hasOwnProperty`
* This is showing you everything defined on Object.prototype
  - `product --> Object.prototype --> null`

## Let's take this one step further
* Question: Does this thing (the thing that starts at __defineGetter__) __proto__?
  - No
  - We can prove this in the client console

### This is the Prototype chain in action!
```
> product
< {name: "Bulletproof Coffee"}
> product.__proto__
< {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
> product.__proto__.__proto
< null
```

## Just as we could change Person or Hangman we can change Object
* We can add new methods or override existing ones
* **IMPORANT** This is generally a BAD IDEA!

### We'll never do this in the real world
* But we can experiment to see how this works

#### Let's change our Object prototype's `hasOwnProperty`
* It will have a function that returns a simple string

```
const product = {
  name: 'Bulletproof Coffee',
};

Object.prototype.hasOwnProperty = () => 'I am something new'; // NEW!

console.log(product.hasOwnProperty('hasOwnProperty')); // false
console.log(product);
```

* Now our client console will output `I am something new`

## Add a brand new method on our Object
```
const product = {
  name: 'Bulletproof Coffee',
};

Object.prototype.iAmANewMethod = () => 'I am something new';

console.log(product.iAmANewMethod()); // false
console.log(product);
```

* That will print our new string "I am something new"

## Why are we not using `new`
* Typically when we want to use prototypical inheritance we had to use the `new` operator with our Constructor function
  - We saw this for Person

#
`person.js`

```
const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes;
};

Person.prototype.getBio = function() {
  let bio = `${this.firstName} is ${this.age}.`;

  this.likes.forEach(function(like) {
    bio += ` ${this.firstName} likes ${like}.`;
  });
  return bio;
};

Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
};

// "new" being used here!
const john = new Person('John', 'Doe', 30, ['Teaching', 'Soccer']);
const jane = new Person('Jane', 'Doe', 25);

john.getBio = function() {
  return 'This is fake!';
};

john.setName('Gary Coleman');
console.log(john.getBio());
console.log(jane.getBio());
```

* And also for `hangman.js`

```
const Hangman = function(word, numGuess) {
  // make word argument lowercase and split each character into an array of strings
  this.word = word.toLowerCase().split('');
  // store guessed letters (we simulate a guessed letter)
  this.guessedLetters = ['c'];
  this.numGuess = numGuess;
};

// return '*' for each letter and ' ' for each space
Hangman.prototype.getWordPuzzle = function() {
  // new array to store puzzle letters
  let puzzleArr = [];
  // loop through each letter in word array
  this.word.forEach(letter => {
    // check for spaces
    if (letter === ' ') {
      puzzleArr.push(' ');
      // check for guess letters
    } else if (this.guessedLetters.includes(letter)) {
      // push the guessed letter into puzzle
      puzzleArr.push(letter);
    } else {
      // not guessed yet so push an asterisk
      puzzleArr.push('*');
    }
  });
  // take array of string characters and join them as one string
  return puzzleArr.join('');
};

// "new" operator being used here too!
const gameOne = new Hangman('CAT', 10);
const gameOnePuzzle = gameOne.getWordPuzzle();
console.log(gameOnePuzzle);
const gameTwo = new Hangman('dog catcher', 5);
const gameTwoPuzzle = gameTwo.getWordPuzzle();
console.log(gameTwoPuzzle);
// console.log(gameOne.getWordPuzzle());
console.log(gameTwo);
```

* If I wanted to create a new version of the `Hangman` game
  - I would use the keyword `new` with the constructor function `Hangman()`, and I would get back my initial object and that object would have access via inheritance to things from Hangman.prototype (example: getPuzzle())

## But in the below example
* We are seeing the same behavior but we are not using the "new" keyword

```
const product = {
  name: 'Bulletproof Coffee',
};

Object.prototype.iAmANewMethod = () => 'I am something new';

console.log(product.iAmANewMethod()); // false
console.log(product);
```

* Our object (product) has access to things off of `Object.prototype` (like hasOwnProperty) but at no point have we used the "new" operator with the constructor function and the reason why is the we constructed our object above using a `literal syntax`

## literal syntax
```
const product = {
  name: 'Bulletproof Coffee',
};
```

* `literal syntax` - when the syntax of the language allows us to define a value of a specific type using a series of characters
  - These series of charactars would be curly braces (opening and closing) and our `name` on the left, a `colon` and the `value` on the right
  - The language is able to see the syntax and interpret knowing that what we are really trying to do is create a "new" object (so it handles that for us behind the scenes)
    + We do not need to use the `new` operator
    + We do not need to use the object constructor function

## Does that mean there is no object constructor function?
* No, there is and we can show that here

```
// const product = {
//   name: 'Bulletproof Coffee',
// };
const product = new Object();

product.name = 'Rest';
```

* It works exactly the same but it is created using an entirely different syntax
  - Here we are explicitly using "new" with the constructor function as opposed to having that implicitly done behind the scenes when we use the "literal syntax"

## How to we initialize objects using the constructor function?
* All we do is provide the object as the first and only argument

```
// const product = {
//   name: 'Bulletproof Coffee',
// };
const product = new Object({
  name: 'The War of Art'
});

Object.prototype.iAmANewMethod = () => 'I am something new';

console.log(product.iAmANewMethod()); // false
console.log(product);
```

## No need to use "new" or the constructor function any more!
* Above is 3 different ways we can create objects in JavaScript
  - But we'll never use the "new" operator or the constructor function and we'll only use the literal syntax since it is a built in type

## Recap
* We learned that when we make an object we are still taking advantage of Prototypal inheritance
  - That is why on our objects we are able to access things like `hasOwnProperty` (something we never set up)
    + That is because all of our objects are linked to Object.prototype which is linked to `null`

## Next
* Here we saw the Prototype chain for objects

```
product --> Object.prototype --> null
```

* Next we'll see the prototype chain for everything else
  - Example: on arrays we have access to `filter`, how does that work?

