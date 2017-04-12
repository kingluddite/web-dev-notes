# ES6 Classes
Great way to reuse code

We can define the class once, giving it a set of methods and properties and then we can create instances of that class and customizing them as we go

We could have a skateboard class
* Skateboards all have wheels but they each can be customized with different colors, lengths, accessories...

* Capitalize your class names
    - Not enforced or required, just a common naming convention
    - This lets the user of the class know it was designed to be used with the `new` keyword

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  class Person {
    
  }

  const me = new Person();
});
```

* We have our class Person and our first instance of the class Person `me`
* Our log outputs to the Terminal just `Person {}` and that is because our Person doesn't output any unique data

## constructor() function
Gets called automatically

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  class Person {
    constructor(name) {
      this.name = name;
    }

  }

  const me = new Person('KingLuddite');
  console.log(me);
});
```

### Output in Terminal 
`Person { name: 'KingLuddite' }`

* We have to specifically call all other methods inside the class but the `constructor()` function is unique and whenever we create a new instance, the `constructor()` function is automatically called and any arguments passed to the `constructor()` get applied immediately
* `this` inside of your Person class refers to the individual instance

## Give default argument value for constructor()
When you create an instance of the class and don't provide a name, the default value will be used

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  class Person {
    constructor(name = 'Anonymous') {
      this.name = name;
    }

  }

  const me = new Person('KingLuddite');
  const unknownComic = new Person();
  console.log(me);
  console.log(unknownComic);
});
```

## Creating methods
```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  class Person {
    constructor(name = 'Anonymous') {
      this.name = name;
    }

    getGreeting() {
      return 'Hello. My name is ' + this.name + '.';
    }

  }

  const me = new Person('KingLuddite');
  console.log(me.getGreeting());
});
```


* **note** Methods are not separated with commas
    - This is the syntax for the class definition
* We are using ES6 template strings inside this method
    - They make it easy to inject strings

### Old way to concatenate strings
```
getGreeting() {
      return 'Hello. My name is ' + this.name + '.';
}
```

### New way to inject strings with ES6 template strings
```
getGreeting() {
      return `Hello. My name is ${this.name}.`;
}
```

## Exercise
When you use this code to create an instance of the Person class `const me = new Person('Bob', 40);` you should have a new method in your Person class that when called will output to the Terminal `Bob is 25 year(s) old`. Both `Bob` and `25` should be dynamic data pulled from the arguments you passed to the constructor() function. Also if no age argument is passed, the output should change to `Bob is 0 year(s) old`

### Solution
```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  class Person {
    constructor(name = 'Anonymous', age = 0) {
      this.name = name;
      this.age = age;
    }

    getGreeting() {
      return `Hello. My name is ${this.name}.`;
    }

    getPersonDescription() {
      return `${this.name} is ${this.age} year(s) old.`;
    }

  }

  const me = new Person('KingLuddite', 40);
  console.log(me.getPersonDescription());
});
```
