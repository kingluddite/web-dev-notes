# The Class Syntax
* Doesn't change functionality
* An alternative way to create a constructor function with it's methods like this:

## The Constructor way
`hangman.js`

```
class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }

Hangman.prototype.calculateStatus = function () {
    const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

    if (this.remainingGuesses === 0) {
        this.status = 'failed'
    } else if (finished) {
        this.status = 'finished'
    } else {
        this.status = 'playing'
    }
}

// MORE CODE
```

## First we'll convert the oop of person.js to using the class based syntax
* This is known as "syntactical sugar"

### What is syntactical sugar?
* It still does the exact same things behind the scene but the new syntax just makes writing it a bit nicer
* At the end of the day we still have a constructor function and still have methods onto its prototype property
* But the new syntax looks a bit different

#### Let's see person before using "class based" syntax
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

const john = new Person('John', 'Doe', 30, ['Teaching', 'Soccer']);
const jane = new Person('Jane', 'Doe', 25);

john.getBio = function() {
  return 'This is fake!';
};

john.setName('Gary Coleman');
console.log(john.getBio());
console.log(jane.getBio());
```

### Let's create a valid class definition
* To avoid a conflict we'll call it `PersonClass`

```
class PersonClass {
    //
}
```

* Above is a valid class definition but it does nothing yet

### Now let's create an instance of the PersonClass
* This is the same way as before

`person.js`

```
class PersonClass {

}

// create an instance of PersonClass
const myPerson = new PersonClass()
console.log(myPerson)

// MORE CODE
```

## Run it
`$ node person.js` (make sure you are in the app's directory)

### Output
`PersonClass {}`

* You see the PersonClass with no instance properties

### writing the constructor (old way)
`person.js`

```
// MORE CODE

const Person = function(firstName, lastName, age, likes = []) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes;
};

// MORE CODE
```

* New way

```
// MORE CODE

class PersonClass {
  constructor() {

  }
}

// MORE CODE
```

* You'll see the above syntax looks similar to the method syntax we described earlier

### We have seem a couple of different ways to create methods
#### Long form

```
{
    myMethod: function() {
        // do stuff
    }
}
```

#### Shorthand syntax
* We just remove the colon (:) and function keyword but we get the exact same functionality (with less typing)

```
{
    myMethod() {
        // do stuff
    }
}
```

## Important
* We have to use the shorthand syntax for JavaScript classes

### This would be invalid
```
class PersonClass {
  constructor:() function {

  }
}
```

* What goes inside the class `{}` is not an object it is the class definition which follows its own set of rules

## Let's convert and run our class
```
class PersonClass {
  constructor(firstName, lastName, age, likes = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.likes = likes;
  }
}

// create an instance of PersonClass
const myPerson = new PersonClass('John', 'Doe', 33, ['Developer', 'Soccer']);
console.log(myPerson);
```

* Will give you this output in the Terminal

```
PersonClass {
  firstName: 'John',
  lastName: 'Doe',
  age: 33,
  likes: [ 'Developer', 'Soccer' ]
}
```

* With the new class syntax we never need to **manually** call `constructor`, it gets called automatically when we use the `new` operator with the class name we picked out

## Defining methods inside a class
* Methods are defined inside the curly braces of our class
    - After the closing curly brace of the class constructor
    - But before the closing curly brace of the class itself

### No comma
* One important difference between the class definition and the standard object definition is there are no commas between the constructor and method name
    - **note** It is not supported (adding comma) and if you try you'll get an error

### Add getBio method inside our class syntax
```
class PersonClass {
  constructor(firstName, lastName, age, likes = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.likes = likes;
  }

  getBio() {
    let bio = `${this.firstName} is ${this.age}.`;
    this.likes.forEach(like => {
      bio += ` ${this.firstName} likes ${like}.`;
    });
    return bio;
  }
}

// create an instance of PersonClass
const myPerson = new PersonClass('John', 'Doe', 33, ['Developer', 'Soccer']);
console.log(myPerson.getBio());
```

* Output in terminal

`John is 33. John likes Developer. John likes Soccer.`

## Now we'll add a method that takes an argument
```
class PersonClass {
  constructor(firstName, lastName, age, likes = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.likes = likes;
  }

  getBio() {
    let bio = `${this.firstName} is ${this.age}.`;
    this.likes.forEach(like => {
      bio += ` ${this.firstName} likes ${like}.`;
    });
    return bio;
  }

  setName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

// create an instance of PersonClass
const myPerson = new PersonClass('John', 'Doe', 33, ['Developer', 'Soccer']);
console.log(myPerson.getBio());
console.log(myPerson.setName('Jane Doe'));
console.log(myPerson.getBio());
```

* That will return (we can see we changed the name inside our class)

`Jane is 33. Jane likes Developer. Jane likes Soccer.`

## Takeaway
* The functionality is the same for both object and classes but classes are easier to write and read

## Final conversion
* We'll remove the old Person and replace with our new class based syntax

`person.js`

```
class Person {
  constructor(firstName, lastName, age, likes = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.likes = likes;
  }

  getBio() {
    let bio = `${this.firstName} is ${this.age}.`;
    this.likes.forEach(like => {
      bio += ` ${this.firstName} likes ${like}.`;
    });
    return bio;
  }

  setName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

// create an instance of PersonClass
const myPerson = new Person('John', 'Doe', 33, ['Developer', 'Soccer']);
console.log(myPerson.getBio());
console.log(myPerson.setName('Jane Doe'));
console.log(myPerson.getBio());
```

## Challenge
* Convert Hangman from oop to class based syntax

### Object based syntax
```
const Hangman = function(word, remainingGuesses) {
  this.word = word.toLowerCase().split('');
  this.remainingGuesses = remainingGuesses;
  this.guessedLetters = [];
  this.status = 'playing';
};

Hangman.proptotype.calculateStatus = function() {
  const finished = this.word.every(letter =>
    this.guessedletters.includes(letter)
  );

  if (this.remainingguess === 0) {
    this.status = 'failed';
  } else if (finished) {
    this.status = 'finished';
  } else {
    this.status = 'playing';
  }
};

Hangman.prototype.getStatusMessage = function() {
  if (this.status === 'playing') {
    return `Guesses left: ${this.remainingGuesses}`;
  } else if (this.status === 'failed') {
    return `Nice try! The word was "${this.word.join('')}".`;
  } else {
    return `Great work! You guess the word.`;
  }
};

Hangman.prototype.getPuzzle = function() {
  let puzzle = '';

  this.word.forEach(letter => {
    if (this.guessedLetters.includes(letter) || letter === ' ') {
      puzzle += letter;
    } else {
      puzzle += '*';
    }
  });

  return puzzle;
};

Hangman.prototype.makeGuess = function(guess) {
  guess = guess.toLowerCase();
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  if (this.status !== 'playing') {
    return;
  }

  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isUnique && isBadGuess) {
    this.remainingGuesses--;
  }

  this.calculateStatus();
};
```

* Now convert to class based syntax

```
class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('');
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = 'playing';
  }

  calculateStatus() {
    const finished = this.word.every(letter =>
      this.guessedLetters.includes(letter)
    );

    if (this.remainingGuesses === 0) {
      this.status = 'failed';
    } else if (finished) {
      this.status = 'finished';
    } else {
      this.status = 'playing';
    }
  }

  getStatusMessage() {
    if (this.status === 'playing') {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === 'failed') {
      return `Nice try! The word was "${this.word.join('')}".`;
    } else {
      return `Great work! You guess the word.`;
    }
  }

  getPuzzle() {
    let puzzle = '';

    this.word.forEach(letter => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter;
      } else {
        puzzle += '*';
      }
    });

    return puzzle;
  }

  makeGuess(guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);

    if (this.status !== 'playing') {
      return;
    }

    if (isUnique) {
      this.guessedLetters.push(guess);
    }

    if (isUnique && isBadGuess) {
      this.remainingGuesses--;
    }

    this.calculateStatus();
  }
}
```

* And your `index.html` will look like:

`index.html`

```
<!DOCTYPE html>

<html>
    <head></head>
    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <script src="hangman.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```

* App.js will look like

`app.js`

```
const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
const game1 = new Hangman('Cat', 2)

puzzleEl.textContent = game1.getPuzzle()
guessesEl.textContent = game1.getStatusMessage()

window.addEventListener('keypress', function (e) {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    puzzleEl.textContent = game1.getPuzzle()
    guessesEl.textContent = game1.getStatusMessage()
})
```

## Run the app
* Using live-server

`$ live-server hangman`

* Should function just as it did before
