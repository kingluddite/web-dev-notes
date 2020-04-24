# Getters and Setters in JavaScript
* They all us to customize what happens when someone sets an object property or reads its value
* This is a "new" feature of the JavaScript language

## Practice
* Create new file `oop/get-set.js`

### Create simple object
* One property set to an empty string
* We set the property value
* We log the value

`get-set.js`

```
const data = {
  firstName: '',
};

// code that uses the data object
data.firstName = 'Diego';
console.log(data.firstName); // Diego
```

* All we are doing is using a regular object property
    - Whatever value we set on firstName is the value that actually gets stored
    - And we read that value verbatim when we read that property value
* With `getters` and `setters` we can define logic to override that so we can do something behind the scenes to set a value or get a value

## get and set values on an object can be useful
* What if there is empty strings before and after our string
* We can perform some "data sanitization" before we store our value
    - Maybe we need to use `trim()`
    - Maybe we need to use `toLowerCase()`
    - Lots of stuff we can do

```
const data = {
  firstName: '',
};

data.firstName = '    Diego    ';
console.log(data.firstName); // Diego
```

## We can get that data sensitization right now
There are 2 main ways:

1. In the code that uses the object I could write some code to make sure the data does indeed match what I expect:
    * I could write code that uses `trim()`
        - I could write a function on the `data` object like `setLocation` and that function could take the value and use trim() to clean up the string and then it could correctly set location
            + All of that works but it actually relies on the person using the object to do something special
                * They either have to:
                    - Manually use trim()
                    - Or they have to call the function
                    - They can't just stick with a simple setup of just setting and reading property values
                    - But with **getters** and **setters** we can!

## Let's try it out
```
const data = {
  firstName() {

  }
};
```

* This is just a standard method and one we've used many time

### How do we make this a custom getter or setter?
* Which will allow us to intercept when we set property values or get property values we have to use either `set` or `get` right before the function name

```
const data = {
  get firstName() {

  }
};
```

* So we drop `get` in front of our method
* This allows us to override what happens when someone tries to fetch a value
    - And that's exactly what we are doing below when we try to "fetch" stuff off of data

```
data.firstName = '    Diego    ';
```

## What value goes inside here?

```
const data = {
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)  
  }
};
```

### Let's test it out
```
const data = {
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)
    return `This is a test`;
  },
};

data.firstName = '    Diego    ';
console.log(data.firstName); // This is a test
```

* So now we are getting `This is a test` instead of `Diego`

### Takeaway
* By setting up a custom `getter` we can override what happens when someone `reads` a value

### Let's set up a custom setter
* **note** The set gets called with an argument
    - It get's called with the value the user tried to set `'    Diego   '` in this case
    - It will be whatever is on the right hand side of the **assignment operator**

```
const data = {
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)
    return `This is a test`;
  },
  set first(value) {
    //
  }
};

data.firstName = '    Diego    ';
console.log(data.firstName); // Diego
```

* Now that we have the value we need to do something with the value
* Let's trim it and make it uppercase

```
const data = {
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)
    return `This is a test`;
  },
  set firstName(value) {
    value = value.trim().toUppercase();
  },
};

data.firstName = '    Diego    ';
console.log(data);
```

* We take our value and trim it and make it upper case

## But where do we store it?
* We can't store it on `firstName` because when we run the app we see that the `firstName` property has this on it:

```
{ firstName: [Getter/Setter] }
```

* So since our `firstName` is already set to our `Getter/Setter` so if we want to store our data we just have to pick a different name
* Our naming convention will be to use the property name prefixed with an underscore like:

```
const data = {
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)
    return `This is a test`;
  },
  set firstName(value) {
    value = value.trim().toUpperCase();
    this._firstName = value.trim().toUpperCase();
  },
};

data.firstName = '    Diego    ';
console.log(data);
```

* And now we see this in out output for our object
    - Notes:
        + The leading and trailing spaces were removed
        + The name is uppercase

```
{ firstName: [Getter/Setter], _firstName: 'DIEGO' }
```

## Now we need to return `_firstName` instead of `firstName`
* Now we get the trimmed and uppercase value we wanted

```
const data = {
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)
    return this._firstName;
  },
  set firstName(value) {
    value = value.trim().toUpperCase();
    this._firstName = value.trim().toUpperCase();
  },
};

data.firstName = '    Diego    ';
console.log(data.firstName); // DIEGO
```

* This is great because we now can perform stuff like:
    - validation
    - sanitization

## Print a list of all of the names we had before
* Let's say Diego changes to Pele and then to Ronaldo
* Currently we can't do that because there's no way to store all that information, we just override the old data with the new data

## But with a custom setter
* We don't have to store a single property
* We can do anything else we might want to do   
    - example
        + We could create a names array, set it to an empty array and add names into it as they are being set

#
```
const data = {
  locations: [],
  get firstName() {
    // What goes inside here?
    //   Us returning the value we actually want to send back (that value the user should get when they try to read the property)
    return this._firstName;
  },
  set firstName(value) {
    value = value.trim().toUpperCase();
    this._firstName = value.trim().toUpperCase();
    this.locations.push(this._firstName);
  },
};

data.firstName = '    Diego    '; 
console.log(data.locations);  // [ 'DIEGO' ]
data.firstName = '    Pele    ';
console.log(data.locations);  // [ 'DIEGO', 'PELE' ]
data.firstName = '    Ronaldo    ';
console.log(data.locations); // [ 'DIEGO', 'PELE', 'RONALDO' ]
```

* Now we are storing all the names

## Now we'll use getters and setters with our 2 classes
* The Hangman class
* The Person class

### Person class
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
```

### the setName method
```
setName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
```

* We pass in the fullName, we break it up into it's individual pieces and we set firstName and lastName
* This works because we call the method and pass in the data
* We could create a custom setter to do this for us
    - And the we could call this `myPerson.fullName = 'John Doe'` an this would behind the scenes store firstName and lastName allowing me to use that information in other places

## Let's add our setter
* We just add `set` before setName
* Then we'll replace `setName` with the property that we are trying to custom setter for

### So this:
```
  setName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }

```

### Becomes this:
```
  set fullName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
```

## Test it out
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

  set fullName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}
const myStudent = new Student('Bobby', 'Adams', 21, 70, ['Chess']);
myStudent.fullName = 'George Washington'
console.log(myStudent.getBio()); // George is failing
myStudent.updatedGrade(1);
console.log(myStudent.getBio()); // George is passing
```

* Now we are able to correctly set `firstName` and `lastName` by setting `fullName`

## We don't need a getter and setter for each property
* We just proved that
* Although they are not required, it is common

### Example
* For Employee subclass we are using their firstName and lastName
    - What if we wanted to switch this up and use a custom getter instead?

#### Let's try that out
* We'll create an instance of an Employee with `myEmployee`

```
const myEmployee = new Employee('Bobby', 'Fischer', 21, 'Chess Master', [
  'Chess',
]);
myEmployee.fullName = 'George Washington';
console.log(myEmployee.getBio());
```

* We change `firstName` and `lastName` to **fullName**

```
class Employee extends Person {
  constructor(firstName, lastName, age, position, company, likes) {
    super(firstName, lastName, age, likes);
    this.position = position;
    this.company = company;
  }
  getBio() {
    return `${this.fullName} in the ${this.position} department  at ${this.company}`;
  }
  getYearsLeft() {
    return 65 - this.age;
  }
}
```

* It won't work yet until we create a getter for fullName in the Person class

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

  set fullName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

* And now we run our code `$ node person.js`

### Output
`George Washington in the Chess Master department  at Chess`

* Now our code works event though fullName doesn't actually exist but it works because it is a computed property (we compute the full name based off of the first name and last name)

## Challenge
* In `hangman.js`

```
class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter))

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    getStatusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else {
            return 'Great work! You guessed the work.'
        }
    }
    getPuzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })

        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (this.status !== 'playing') {
            return
        }

        if (isUnique) {
            this.guessedLetters.push(guess)
        }

        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }

        this.calculateStatus()
    }
}
```

1. Convert `getStatusMessage` to a custom getter for `statusMessage`
2. Convert `getPuzzle` to a custom getter for `puzzle`
3. Change usage in `app.js`

## Solution:
```
// MORE CODE

  // getStatusMessage() {
  //   if (this.status === 'playing') {
  //     return `Guesses left: ${this.remainingGuesses}`;
  //   } else if (this.status === 'failed') {
  //     return `Nice try! The word was "${this.word.join('')}".`;
  //   } else {
  //     return 'Great work! You guessed the work.';
  //   }
  // }
  get statusMessage() {
    if (this.status === 'playing') {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === 'failed') {
      return `Nice try! The word was "${this.word.join('')}".`;
    } else {
      return 'Great work! You guessed the work.';
    }
  }
  // getPuzzle() {
  //   let puzzle = '';
  //
  //   this.word.forEach(letter => {
  //     if (this.guessedLetters.includes(letter) || letter === ' ') {
  //       puzzle += letter;
  //     } else {
  //       puzzle += '*';
  //     }
  //   });
  //
  //   return puzzle;
  // }
  get puzzle() {
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

// MORE CODE
```

* Note: We converted from a method to a custom property

* And update `app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat', 2);
console.log(game1);
puzzleEl.textContent = game1.puzzle;
guessesEl.textContent = game1.statusMessage;

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});
```

