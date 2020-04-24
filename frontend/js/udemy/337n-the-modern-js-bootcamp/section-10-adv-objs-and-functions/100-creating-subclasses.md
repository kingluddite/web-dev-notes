# Creating Subclasses
* Let's learn how to create a subclass using **Prototypal Inheritance**

## Let's write out the Prototypal chain for Person
* myPerson --> Person.prototype --> Object.prototype --> null
    - null marks the end of the Prototypal chain
    - The nice thing is the Person gets behavior from the Object

## We created a class of Person
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
```

## But what if we created a different type of person
* An employee
* A teacher
* A student
* A developer
* A designer
* All of the above are different types of "Person"
* They all share similarities but they also have subtle differences
    - A developer might understand SQL but a designer does not

## One way to copy a Person
* Just right another class for each
* But that has one glaring problem... LOT'S OF DUPLICATE code
* We want to code DRY (Don't Repeat Yourself)

## A better way
* Create a class that inherits behavior from Person

## We'll create a subclass of Person called Employee
* We can inherit behavior from a class using `extends`

### Prove we just created a copy of Person
* It really isn't that useful right now but let's prove that Person and Employee have same functionality

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

class Employee extends Person {
  //
}

// create a subclass of Person call Employee
const myPerson = new Employee('John', 'Doe', 33, ['Developer', 'Soccer']);
console.log(myPerson.getBio());
console.log(myPerson.setName('Jane Doe'));
console.log(myPerson.getBio());
```

* You'll see it works just like Person

## Now we can override methods or provide brand new methods on our subclass
* If we don't change anything we get the same functionality
* If we want to override the constructor we add new arguments
    - The arguments can be in any order you wish

```
class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {}
}

// create an instance of PersonClass
const myPerson = new Employee('John', 'Doe', 33, 'IT', ['Developer', 'Soccer']);
console.log(myPerson);

// MORE CODE
```

### Houston we have a problem!
* We are getting an error: `ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor`

#### What does this error mean?
* It means that inside of our subclass constructor functions we have to call the parent constructor function and we do that using `super()`
    - This will make sure the firstName, lastName, age and likes get set up correctly
    - All we have to do is this:

```
// MORE CODE

class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {
    super(); // add super here
  }
}

// MORE CODE
```

* **important** super() gets called inside the subclass constructor
    - But we also have to call it with the arguments the parent class expects

```
class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {
    super(firstName, lastName, age, likes);
  }
}
```

## Run
`$ node person.js`

* Output

```
Employee {
  firstName: 'John',
  lastName: 'Doe',
  age: 33,
  likes: [ 'Developer', 'Soccer' ]
}
```

* **note** If you don't pass the arguments to `super()` if you run the app you won't see the values populated in the terminal

## Now we put the code in our subclass that makes our subclass (Employee) unique

```
class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {
    super(firstName, lastName, age, likes);
    this.position = position;
  }
}
```

* Will give you our new property `position` and it's value 'IT'
* Output:

```
Employee {
  firstName: 'John',
  lastName: 'Doe',
  age: 33,
  likes: [ 'Developer', 'Soccer' ],
  position: 'IT'
}
```

### Create an instance of Employee subclass
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

class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {
    super(firstName, lastName, age, likes);
    this.position = position;
  }
}

// create an instance of PersonClass
const myPerson = new Employee('John', 'Doe', 33, 'IT', ['Developer', 'Soccer']);
console.log(myPerson);
```

* **important** The arguments we pass `new` Employee

```
// MORE CODE

// create an instance of subclass Employee 
const myPerson = new Employee('John', 'Doe', 33, 'IT', ['Developer', 'Soccer']);

// MORE CODE
```

must match up with the values inside our subclass constructor

```
// MORE CODE

class Employee extends Person {
  constructor(firstName, lastName, age, position, likes) {

// MORE CODE
```

* Output
  - We see we get position added to our subclass

```
Employee {
  firstName: 'John',
  lastName: 'Doe',
  age: 33,
  likes: [ 'Developer', 'Soccer' ],
  position: 'IT'
}
```

## What happens in the below code fragment?
```
// MORE CODE

const myPerson = new Employee('John', 'Doe', 33, 'IT', ['Developer', 'Soccer']);
myPerson.setName('Jane Doe');
console.log(myPerson.getBio());

// MORE CODE
```

* When I call setName it will look in Employee for `setName` and when it does not find it it will go to the parent Person class for `setName`

## Override methods in a subclass
* What if I want to override getBio in the Person class inside the Employee subclass?
* Maybe you want to replace the likes in getBio `likes` with the position of the employee at the company

```
// MORE CODE

class Employee extends Person {
  constructor(firstName, lastName, age, position, company, likes) {
    super(firstName, lastName, age, likes);
    this.position = position;
    this.company = company;
  }
  getBio() {
    return `${this.firstName} ${this.lastName} in the ${this.position} department  at ${this.company}`;
  }
}

// create an instance of PersonClass
const myPerson = new Employee('John', 'Doe', 33, 'IT', 'IBM', [
  'Developer',
  'Soccer',
]);
myPerson.setName('Jane Doe');
console.log(myPerson.getBio());

// MORE CODE
```

* Output will be:
  - `Jane Doe in the  IT department  at IBM`
  - We are not changing the functionality of getBio in Person class but just overriding the message for the Employee subclass
  - This will have no effect on "regular" Person people as we are not overriding anything specific to Person
  - We are just saying if you are an Employee don't use the Person getBio() use the Employee getBio() instead

## Show both class and subclass with overriding method
```
// MORE CODE

// create an instance of PersonClass
const myPerson = new Employee('John', 'Doe', 33, 'IT', 'IBM', [
  'Developer',
  'Soccer',
]);
myPerson.setName('Jane Doe');
console.log(myPerson.getBio());
const myPerson2 = new Person('John', 'Doe', 33, ['Developer', 'Soccer']);
myPerson2.setName('Pip');
console.log(myPerson2.getBio());

// MORE CODE
```

## Show the output
* And you'll see the output showing it shows **Employee** with overriding method but the `Person2` just uses the `getBio()` from **Person** class

```
Jane Doe in the IT department  at IBM
Pip is 33. Pip likes Developer. Pip likes Soccer.
```

## Let's add something completely unique to our subclass
* Let's create a `getYearsLeft()` method just for our Employee subclass
* getYearsLeft() will take the average retirement age (let's use 65) and subtract the Employees age

```
// MORE CODE

class Employee extends Person {
  constructor(firstName, lastName, age, position, company, likes) {
    super(firstName, lastName, age, likes);
    this.position = position;
    this.company = company;
  }
  getBio() {
    return `${this.firstName} ${this.lastName} in the ${this.position} department  at ${this.company}`;
  }
  getYearsLeft() {
    return 65 - this.age;
  }
}

// create an instance of PersonClass
const myPerson = new Employee('John', 'Doe', 33, 'IT', 'IBM', [
  'Developer',
  'Soccer',
]);
myPerson.setName('Jane Doe');
// console.log(myPerson.getBio());
console.log(myPerson.getYearsLeft());
const myPerson2 = new Person('John', 'Doe', 33, ['Developer', 'Soccer']);
myPerson2.setName('Pip');
// console.log(myPerson2.getBio());
console.log(myPerson2.getYearsLeft());
```

* You will in our output we get `32` (65 - 33) for `myPerson`
* And we will get an error `TypeError: myPerson2.getYearsLeft is not a function` because `getYearsLeft()` method doesn't exist in the Person parent class

## Challenge
1. Create a subclass of Person for Student
2. Track student grade (0 - 100)
3. Override bio to print a passing or failing message
  * 70 and above say "John is passing"
4. Create "updatedGrade" method that takes the amount to add or remove from the grade

## Test it out
1. Create student
2. Print status (failing or passing)
3. Change grade to change status
4. Print status again

## Challenge Solution
```
class Student extends Person {
  constructor(firstName, lastName, age, grade, likes) {
    super(firstName, lastName, age, likes);
    this.grade = grade;
  }
  checkPassing(grade) {
    if (grade > 70) {
      return 'passing';
    } else {
      return 'failing';
    }
  }
  getBio() {
    return `${this.firstName} is ${this.checkPassing(this.grade)}`;
  }
  updatedGrade(gradePoints) {
    return (this.grade = this.grade + gradePoints);
  }
}

const myStudent = new Student('John', 'Adams', 21, 70, ['Chess']);
console.log(myStudent.getBio());
myStudent.updatedGrade(1);
console.log(myStudent.getBio());
```

* Output

```
John is failing
John is passing
```


