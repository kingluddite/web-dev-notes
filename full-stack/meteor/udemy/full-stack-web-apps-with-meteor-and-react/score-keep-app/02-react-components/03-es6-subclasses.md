# ES6 Subclasses
How to extend existing classes

This is useful because in order to create React Components you have to extend existing classes

## How can we extend our Person class?
Employee is a good subclass of Person. They are persons but they also have salaries and job titles

```
class Employee extends Person {
    
}
```

* We now have a class that is identical to `Person`

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

  class Employee extends Person {
    
  }

  const me = new Employee('KingLuddite', 40);
  console.log(me.getPersonDescription());
});
```

* We swap out `Person` for `Employee` and we get the exact same output. Not very useful but it is what it is :)
* It only becomes useful when we give our sub class custom **properties** and **behavior**

We will call a third argument that our `Person` class doesn't have but our subclass does

`const me = new Employee('KingLuddite', 40, 'Web Developer');`

And here is our sub class

```
class Employee extends Person {
    constructor(name, age, title) {
      this.title = title; 
    }
  }
```

* We are not giving default values for `name` and `age` (_more on that later_)
* We are not giving a default value for `title` because the employee may be unemployed
* We don't set **name** and **age** like this:

```
class Employee extends Person {
    constructor(name, age, title) {
      this.name = name;
      this.age = age;
      this.title = title;
    }
  }
```

Instead we will use this:

```
class Employee extends Person {
    constructor(name, age, title) {
      super(name, age);
      this.title = title;
    }
  }
```

* By using `super()` we are calling the parents `constructor()` function because we are going to need it to run in order for the **parent's** methods to work
* `super()` is a reserved keyword and enables you to access the parent's class
* We pass super our arguments `super(name, age)` and that way we don't have to redefine the defaults, we simply call the **parent** and when the `Person` changes, the `Employees` will change because `Employees` extends `Person`

Inside our subclass we can do things with our methods:

1. We can override existing methods
2. We can create our own methods

## Not Not. Who's there?
Convert to Boolean by flipping its value twice

```
hasJob() {
      return !!this.title;
}
```

* Which means if it is `undefined` it will get flipped once to true and again to false (_so they won't have a job_)
* If there is a valid string it will get flipped once to false and a second time to true
* It will work regardless whether or not they have a title

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

  class Employee extends Person {
    constructor(name, age, title) {
      super(name, age);
      this.title = title;
    }
    hasJob() {
      return !!this.title;
    }
  }

  const me = new Employee('KingLuddite', 40, 'Web Developer');
  console.log(me.getPersonDescription());
  console.log(me.hasJob());

  const person = new Employee('Joe');
  console.log(person.getPersonDescription());
  console.log(person.hasJob());
});
```

### Output
![output of getJob method](https://i.imgur.com/CMnCfOW.png)

## Overriding a function (aka method)
Just write the same function in the subclass like:

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

  class Employee extends Person {
    constructor(name, age, title) {
      super(name, age);
      this.title = title;
    }
    getGreeting() {
      if (this.title) {
        return `Hello. My name is ${this.name}. I work as a ${this.title}`;
      } else {
        return super.getGreeting();
      }
    }
    hasJob() {
      return !!this.title;
    }
  }

  const me = new Employee('KingLuddite', 40, 'Web Developer');
  console.log(me.getPersonDescription());
  console.log(me.hasJob());
  console.log(me.getGreeting());

  const person = new Employee('Joe');
  console.log(person.getPersonDescription());
  console.log(person.hasJob());
  console.log(person.getGreeting());
});
```

### Output
![output of method override](https://i.imgur.com/hiQBN5B.png)

* We call `super()` to just use the original base class `getGreeting()` method

## Exercise
Creat a new Programmer class that extends from Person class (_Because all Programmers are people but they might not be Employees_)

A Programmer will have an **age**, a **name** and a **preferredLanguage** (_set JavaScript as the default preferredLanguage_). Override the `getGreeting()` method for the programmer with, "_Hi! I am NAME. I am a preferredLanguage developer_". Then create a brand new programmer passing a name, age and preferred langauge. Print result to screen

<details>
  <summary>Solution</summary>
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

  class Employee extends Person {
    constructor(name, age, title) {
      super(name, age);
      this.title = title;
    }
    getGreeting() {
      if (this.title) {
        return `Hello. My name is ${this.name}. I work as a ${this.title}`;
      } else {
        return super.getGreeting();
      }
    }
    hasJob() {
      return !!this.title;
    }
  }

  class Programmer extends Person {
    constructor(name, age, preferredLanguage = 'JavaScript') {
      super(name, age);
      this.preferredLanguage = preferredLanguage;
    }
    getGreeting() {
      if (this.preferredLanguage) {
        return `Hello. My name is ${this.name}. I am a ${this.preferredLanguage} developer.`;
      } else {
        return super.getGreeting();
      }
    }
  }

  const me = new Employee('KingLuddite', 40, 'Web Developer');
  console.log(me.getPersonDescription());
  console.log(me.hasJob());
  console.log(me.getGreeting());

  const person = new Employee('Joe');
  console.log(person.getPersonDescription());
  console.log(person.hasJob());
  console.log(person.getGreeting());

  const dev = new Programmer('John', 50, 'C++');
  const dev2 = new Programmer();
  console.log(dev.getGreeting);
  console.log(dev2.getGreeting);
});
```
</details>

## Review
* When we extend a class we create a new class
    - `class Name extends NewName`
* We can override methods
* We can write new methods
* We can add custom properties in the constructor function
* We call `super()` to make sure the old properties still get set by the parent's constructor
