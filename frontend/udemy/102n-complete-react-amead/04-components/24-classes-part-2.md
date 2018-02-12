# ES6 Classes (part 2)
## Subclass
* We'll create a subclass of Person ---> Student
* Student is a Person but it has a `major` property which Person does not have
    - So we are extending the base of a class

```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
  }
}

class Student extends Person {

}
const me = new Student('John', 40);
console.log(me.getGreeting());
console.log(me.getDescription());
const other = new Person();
console.log(other.getGreeting());
console.log(other.getDescription());
```

* Now Student extends Person but they are identical as you'll see with the same output as before
* What point is extending a class if it does the same thing?

`const me = new Student('John', 40, 'Finance');

* Adding that 3rd parameter will do nothing because we didn't set up our constructor for the subclass

```js
class Student extends Person {
  constructor(major = 'Undeclared') {
    this.major = major;
  }
}
const me = new Student('John', 40, 'Finance');
```

### Houston we have a problem!
* We get this error: `this' is not allowed before super()`

#### Solution - add `super()`
```js
class Student extends Person {
  constructor(major = 'Undeclared') {
    super();
    this.major = major;
  }

}
const me = new Student('John', 40, 'Finance');
```

* This doesn't work because we also need to add the arguments from the parent class like this:

```js
class Student extends Person {
  constructor(name, age, major = 'Undeclared') {
    super();
    this.major = major;
  }
}
```

* That works
* You don't need to re-write the parent argument defaults
* If you are wondering what `super()` does is it calls the parent constructor function, it has to do its thing before our subclass does its thing
    - `super()` is exact same as calling the parent contstructor
    - But in order for our defaults to be passed through we need to add them as arguments to `super()` like this: `super(name, age)` and that will save us from having to rewrite that code

```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name, age, major = 'Undeclared') {
    super(name, age);
    this.major = major;
  }

}
const me = new Student('John', 40, 'Finance');
console.log(me);

const other = new Student();
console.log(other);
```

### Output
```
Student {name: "John", age: 40, major: "Finance"}
Student {name: "Anonymous", age: 0, major: "Undeclared"}
```

### Add methods to subclass
* We will create `hasMajor()`
* It will be boolean and return true if they have a major
* `> ''` -----> falsey (won't pass conditional)
* `!` ----> logical NOT operator
* `!''` ----> flips the falsey to `true`
* `!!''` ----> flip it twice to `false`
* `'some string'` ----> truthy
* `!!'some string'` ----> true
* `!!undefined` ---> false

#### a string or undefined
```js
hasMajor() {
    return !!this.major;
}
```

```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name, age, major = 'Undeclared') {
    super(name, age);
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }

}
const me = new Student('John', 40, 'Finance');
console.log(me.hasMajor());

const other = new Student();
console.log(other.hasMajor());
```

* Both majors are declared
* But if I remove the default major I'll get true and false

```js
class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }

}
const me = new Student('John', 40, 'Finance');
console.log(me.hasMajor());

const other = new Student();
console.log(other.hasMajor());
```

## Override parent class methods
```js
class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    return 'testing';
  }

}
const me = new Student('John', 40, 'Finance');
console.log(me.hasMajor());
console.log(me.getDescription());

const other = new Student();
console.log(other.hasMajor());
```

* Simple to overwrite parent methods
* You will see output like this:

```
true
testing
false
```

## Can we call the parent and use it's information too?
* Yes we can!
* Using `super()` again

```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
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
    return description;
  }

}
const me = new Student('John', 40, 'Finance');
console.log(me.hasMajor());
console.log(me.getDescription());

const other = new Student();
console.log(other.hasMajor());
```

* This is the special part:

```js
getDescription() {
  let description = super.getDescription();
  return description;
}
```

* returns `I am 40 years old.`

### Adding onto a parent method inside the subclass
```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
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
const me = new Student('John', 40, 'Finance');
console.log(me.hasMajor());
console.log(me.getDescription());

const other = new Student();
console.log(other.hasMajor());
console.log(other.getDescription());
```

### Output
```
true
I am 40 years old. Their major is Finance.
false
I am 0 years old.
```

## Tying react into this
* We will be extending our own classes from the classes React gives us

## Challenge
* Create a new subclass of Person
    - Traveler will extend Person
    - Add support for home location (homeLocation)
    - override `getGreeting()`
        + If there is a location include that in the message
            * `Hi. I am John. I am visiting from Canada`
        + If there is no home location, it will just output the parent class getGreeting which is `Hi. I am John.`
    - Test by calling `getGreeting()` for both, one with a location passed and the latter without a location passed

```js
class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    // return 'Hi, I am ' + this.name;
    return `Hi, I am ${this.name} and I am ${this.age} years old`;
  }

  getDescription() {
    return `I am ${this.age} years old.`;
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

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }

  getGreeting() {
    let greeting = super.getGreeting();

    if (this.homeLocation) {
      greeting += ` I am visiting from ${this.homeLocation}`;
    } 

    return greeting;
  }
}

const me = new Traveler('John', 40, 'Canada');
console.log(me.getGreeting());

const other = new Traveler('Jane', 21);
console.log(other.getGreeting());
```

### Output

```
Hi, I am John and I am 40 years old I am visiting from Canada
Hi, I am Jane and I am 21 years old
```

* other way is:

```js
const other = new Traveler(undefined, undefined, 'Nowhere');
console.log(other.getGreeting());
```

* Output

```
Hi, I am Anonymous and I am 0 years old I am visiting from Nowhere
```
