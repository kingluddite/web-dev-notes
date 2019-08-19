# ES6 Classes (part 2)
* We will learn how to write subclasses using ES6 class syntax

`e6-classes-1.js`

```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

const me = new Person('Mike Martini', 44);
const other = new Person();
console.log(me.getDescription());
console.log(other.getDescription());
```

## Let's create subclass of Person called Student
* Here's what the class looks like so far:

## Student Subclass of Person
* We'll create a subclass of Person ---> Student
* Student is a Person
  - It has same things Person has
    + Age
    + Name

## They have the same properties
* But we don't want to just copy and paste same properties
* There needs to be a more efficient way
* There is! By **extending** the Person class

## Extending
* **extend** will give us all the functionality of Person in Student
* And then we can override any functionality we want to change

```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person {
  // stuff here

}

// MORE CODE
```

## Create new instances of Student
```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person {
  // stuff here
}
const me = new Student('Mike Martini', 44);
const other = new Student();
console.log(me.getDescription());
console.log(other.getDescription());
```

* All we did is swap out Person for Student
* The output is the exact same because we just extended the exact same properties and methods from Person to Student
  - So this:

```
// MORE CODE

const me = new Person('Mike Martini', 44);
const other = new Person();
// MORE CODE
```

* Becomes this:

```
// MORE CODE

const me = new Student('Mike Martini', 44);
const other = new Student();
// MORE CODE
```

* This really isn't helpful but it will be when we want to override Person properties and methods inside Student

## Add a new property to subclass
* only Student will have this property and it will be `major`

```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  jgetGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person {
  // stuff here
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
console.log(me);
console.log(other);
```

* Look at the client console
* Even though we added a new `Finance` argument, it does not show up in our client console log

![Nothing new added even though we added an argument](https://i.imgur.com/Vt5W3b2.png)

## Override parent inside Subclass
1. Call the constructor inside the subclass
2. Pass all parent arguments and add new child arguments
  * Add defaults if necessary
3. Only define properties and methods you want to override from parent
4. Call the parent constructor function (The parent contructor has to do its thing before we do our thing)

```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  jgetGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
console.log(me);
console.log(other);
```

* Now we can see the `major` property in our output

![we see subclass properties](https://i.imgur.com/eh38lsl.png)

* **note** Don't forget to pass `super` the parent arguments so it will know what to do with them when you call the parent constructor when using `super()`
  - And this is how we can avoid having to write code in our subclass for those properties
  - Notice `undefined` is value for property not passed when calling the subclass

## Add a new method to subclass
* We'll add a boolean check `hasMajor`
* We will use the logical `Not` operator `!

### Top on Boolean `!` operator
* An empty string is a falsey value `''`
* But if you put the Not operator in front of it, it becomes the opposite so it will be `true`
* Here is [a discussion on truthy and falsey values](https://stackoverflow.com/questions/19839952/all-falsey-values-in-javascript)

#### Try in console
`> !''` ------> Will return `true`

* And if you use it twice it will be false (double negative equals positive)

`> !!''` ------> Will return `false`

* And you can take a truthy value (any string that is not empty) and convert it to false

`> !'joe'` ------> Will return `false`

* Or convert it to true

`> !!'joe'` ------> Will return `true`

* **note** `undefined` is falsey

`> !undefined` ------> Will return `true`

### Add our method using this Boolean logic
```
// MORE CODE

class Student extends Person {
  constructor(name, age, major) {
    super();
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }
}
// MORE CODE
```

* **important** The method is outside the constructor!
* So since `!!'joe'` will return true if any String exists
* And `!!''` will return false on an empty string
* And if the value returned is `undefined` **!!undefined** will be `false` 

## Run app and see log in client console
```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  jgetGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
console.log(me.hasMajor()); // true
console.log(other.hasMajor()); // false
```

## What if we want to override a method in the parent class inside the subclass?
* We won't change greeting in parent
* But we would like to override getDescription in subclass to include info about the major

```
class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    return 'Override Parent class!';
  }
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
console.log(me.getDescription()); // "Override Parent class!"
console.log(other.getDescription()); // "Override Parent class!"
```

* Now the parent method is completely overwritten with text set in subclass method

## We can also call the parent and use that information as well
* We just use `super()` like this:

```
// MORE CODE

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    const description = super.getDescription();
    return description;
  }
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
console.log(me.getDescription()); // Mike Martini is 44 year(s) old
console.log(other.getDescription()); // Anonymous is 0 year(s) old

// MORE CODE
```

* That outputs exactly what the parent class method did before

## But let's override parent method with something more useful
* We'll check if there is a major and if so we'll tack on ` Their major is ` and then we'll dynamically populate the major with that instance of Student

```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  jgetGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }

    return description;
  }
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
console.log(me.getDescription()); // Mike Martini is 44 year(s) old Their major is Finance.
console.log(other.getDescription()); // Anonymous is 0 year(s) old
```

* **note** Don't forget to call the method (`hasMajor()` add the parentheses) and not just reference it `hasMajor`

## Why do we need to know this about classes when working with React?
* Because it is exactly what we'll be know with React components
* We'll be creating our own classes that extend some class React gives us

## Challenge
* Create new subclass of Person
  - subclass name: Traveler
    + It will extend the Person class
    + Will have a property called homeLocation (the idea is to be able to set my home location and use that throughout class) - This will be the 3rd argument for Traveler
    + Override getGreeting from parent class
      * Two options
        1. If there is a homeLocation include that in the message
          + Don't redefine. Make sure to use the super()
          + "Hi, I am John Doe. I'm visiting from Philly"
        2. If no homeLocation is provided just stick with default message
          + "Hi, I am John Doe."
* Make sure to test things out called the method for both instances

## Solution
```
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }

  hasLocation() {
    return !!this.homeLocation;
  }

  getGreeting() {
    let message = super.getGreeting();

    if (this.homeLocation) {
      message += ` I'm visiting from ${this.homeLocation}.`;
      return message; // Bad place to put return here!!!!
    }
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }

    return description;
  }
}
const me = new Student('Mike Martini', 44, 'Finance');
const other = new Student();
const meToo = new Traveler('John Doe', 22, 'Ireland');
const jd = new Traveler('Jane Doe', 22);
console.log(me.getDescription());
console.log(other.getDescription());
console.log(meToo.getGreeting());
console.log(jd.getGreeting());
```

### Solution Output
```
Hi. I am John Doe! I'm visiting from Ireland.
Undefined
```

* **note** There is one big mistake in the above. I returned `message` inside the getGreeting method and it should be outside the `if` because we want message to return regardless if the conditional passes. If we don't do this you'll see a greeting if and only if there is a homeLocation which is obviously not what we want

## The correct Solution
```
// MORE CODE

  getGreeting() {
    let message = super.getGreeting();

    if (this.homeLocation) {
      message += ` I'm visiting from ${this.homeLocation}.`;
    }
    return message;
  }
// MORE CODE
```

### Solution Output
```
Hi. I am John Doe! I'm visiting from Ireland.
Hi. I am Jane Doe!
```

## And if you created this instance
`const nobody = new Student(undefined, undefined, 'Nowhere');`

You would get `Hi. I am Anonymous! I'm visiting from Nowhere.`

## Recap
* We can extend a class using a subclass
  - We extended Person to Student and Traveler
  - This allows us to get all the behavior or the class without copying and pasting all the code
  - We can customize the behavior with new methods and properties
  - We can override methods and properties or inherit them from the parent class
