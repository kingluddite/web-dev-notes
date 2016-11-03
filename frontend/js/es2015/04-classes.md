# Classes

[MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

**constructor-function.js**

```js
'use strict';

let Student = function( data ) {
  this.name = data.name;
  this.age = data.age;
};

let joey = new Student( { name: 'Joey', age: 25 } );
let sarah = new Student( { name: 'Sarah', age: 22 } );

console.log( joey );
console.log( sarah );
/*
{ name: 'Joey', age: 25 }
{ name: 'Sarah', age: 22 }
 */
```

* class is constructor function in disguise
* main purpose is to create a more convenient syntax

## Constructor function
function you call with `new` keyword to create an instance of an object 

**class.js**

```js
'use strict';

class Student {
  constructor( data ) {
    this.name = data.name;
    this.age = data.age;
  }
}

let joey = new Student( { name: 'Joey', age: 25 } );
let sarah = new Student( { name: 'Sarah', age: 22 } );

console.log( joey );
console.log( sarah );
/*
Student { name: 'Joey', age: 25 }
Student { name: 'Sarah', age: 22 }
 */
```

* code inside constructor is executed when called with `new`

### Improve on classes

```js
'use strict';

class Student {
  constructor( { name, age, interestLevel = 5 } = {} ) {
    this.name = name;
    this.age = age;
    // old way
    //this.interestLevel = data.interestLevel || 5;
    this.interestLevel = interestLevel;
  }
}

let joey = new Student( { name: 'Joey', age: 25 } );
let sarah = new Student( { name: 'Sarah', age: 22 } );

console.log( joey );
console.log( sarah );
/*
Student { name: 'Joey', age: 25, interestLevel: 5 }
Student { name: 'Sarah', age: 22, interestLevel: 5 }
 */
```

### Class and Map

```js
'use strict';

class Student {
  constructor( { name, age, interestLevel = 5 } = {} ) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map();
  }
}

let joey = new Student( { name: 'Joey', age: 25 } );
let sarah = new Student( { name: 'Sarah', age: 22 } );

sarah.grades.set( 'History', 'B' );
sarah.grades.set( 'English', 'A' );

console.log( Array.from( sarah.grades ) );
/*
[ [ 'History', 'B' ], [ 'English', 'A' ] ]
 */
```

## Sub-Classes
create new classes based off of an existing class

```js
'use strict';

class Person {
  dance() {
    const dances = [
     'waltz',
     'tango',
     'mambo',
     'foxtrot'
    ];
    console.log( `${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!` );
  }
  constructor( { name, age, eyeColor = 'brown' } = {} ) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student {
  constructor({ name, age, interestLevel = 5 } = {} ) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Person( { name: 'Steven', age: 22 } );
stevenJ.dance();
/*
Steven is doing the foxtrot!
 */
```

## What is [hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting)?
normally a named JavaScript function like a constructor function can appear at the bottom of a script and still be called by code that appears before it

* JavaScript classes are NOT hoisted so you need to load code that defines the class before any code that calls that class
    - make sure you define classes at the top of scripts before other codes use them

## using `[extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)`

```js
'use strict';

class Person {
  dance() {
    const dances = [
     'waltz',
     'tango',
     'mambo',
     'foxtrot'
    ];
    console.log( `${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!` );
  }
  constructor( { name, age, eyeColor = 'brown' } = {} ) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {
  constructor({ name, age, interestLevel = 5 } = {} ) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student( { name: 'Steven', age: 22 } );
stevenJ.dance();
/*
ERROR - this is not defined
 */
```

### `super()`

```js
'use strict';

class Person {
  dance() {
    const dances = [
     'waltz',
     'tango',
     'mambo',
     'foxtrot'
    ];
    console.log( `${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!` );
  }
  constructor( { name, age, eyeColor = 'brown' } = {} ) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {
  constructor( { name, age, interestLevel = 5 } = {} ) {
    super( { name, age } );
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student( { name: 'Steven', age: 22, interestLevel: 3 } );
stevenJ.dance();
console.log( stevenJ.interestLevel );
/*
Steven is doing the tango!
3
 */
```

### overriding parent class methods

```js
'use strict';

class Person {
  dance() {
    const dances = [
     'waltz',
     'tango',
     'mambo',
     'foxtrot'
    ];
    console.log( `${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!` );
  }
  constructor( { name, age, eyeColor = 'brown' } = {} ) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {

  dance( traditional ) {
    if ( traditional ) {
      super.dance();
      return;
    }
    const dances = [
      'lyrical',
      'tap',
      'ballet',
      'jazz'
    ];
    console.log( `${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!` );
  }
  constructor( { name, age, interestLevel = 5 } = {} ) {
    super( { name, age } );
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map;
  }
}

let stevenJ = new Student( { name: 'Steven', age: 22, interestLevel: 3 } );
stevenJ.dance( true );
stevenJ.dance( false );
console.log( stevenJ.interestLevel );
/*
Steven is doing the tango!
Steven is doing the ballet!
3
 */
```

## Static Methods
When defining a method inside a class we have two options

1. instance
2. static

### Static Methods
A static method is one that exists on the class declaration and is not accessible through an instance

* You can only call the function by referencing its class

```js
'use strict';

class Bird {
  static changeColor( color ) {
    this.color = color;
  }
  constructor( { color = 'red' } = {} ) {
    this.color = color;
  }
}

let redBird = new Bird;
console.log( redBird.color );
redBird.changeColor( 'blue' );
console.log( redBird.color );
/*
ERROR - redBird.changeColor is not a function
 */
```

Why the error?
Since changeColor is a static method we can't access it through the redBird instance

fix

```js
// redBird.changeColor( 'blue' ); old
Bird.changeColor.call( redBird, 'blue' );
```

another way to do the same thing

```js
'use strict';

class Bird {
  static changeColor( bird, color ) {
    bird.color = color;
  }
  constructor( { color = 'red' } = {} ) {
    this.color = color;
  }
}

let redBird = new Bird;
console.log( redBird.color );
// redBird.changeColor( 'blue' ); old
Bird.changeColor( redBird, 'blue' );
console.log( redBird.color );
/*
red
blue
 */
```

## Getter and Setter Methods
A way of accessing and changing data in an object

* getters and setters are common across programming languages
* ES2015 introduces `get` and `set` keywords which provides a cleaner and easier way of defining getters and setters within a class

### get
retrieves and returns a value

### set
Assigns (or sets) a value

starting **get-set.js**

```js
'use strict';

class Student {
  constructor( { name, age, interestLevel = 5 } = {} ) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}
```

* getter is a function that must return a value

```js
'use strict';

class Student {
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor( { firstName, lastName, age, interestLevel = 5 } = {} ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let darrenD = new Student( { firstName: 'Darren', lastName: 'Dalton', age: 50 } );

console.log( darrenD.name );
/*
Darren Daulton
 */
```

but if I try to change the name with

`darrenD.name = 'Darren Derry';`

I get this error

`TypeError: Cannot set property name of #<Student> which has only a getter`

### Add a setter

```js
'use strict';

class Student {
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  set name( input ) {
    let name = input.split( ' ' );
    this.firstName = name[ 0 ];
    this.lastName = name[ 1 ];
  }

  constructor( { firstName, lastName, age, interestLevel = 5 } = {} ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let darrenD = new Student( { firstName: 'Darren', lastName: 'Dalton', age: 50 } );

console.log( darrenD.name );
darrenD.name = 'Darren Derry';
console.log( darrenD.name );
/*
Darren Dalton
Darren Derry
 */
```
