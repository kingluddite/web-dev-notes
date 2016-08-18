# Arrow Functions
A new syntax for writing JavaScript functions
arrow functions aka lambda functions (other programming languages)
provide a short syntax for defining functions
simply function scope

old way generates an error

```js
'use strict';

var Person = function( data ) {
  for ( var key in data ) {
    this[ key ] = data[ key ];
  }
  this.getKeys = function() {
    return Object.keys( this );
  };
};

var Alena = new Person( { name: 'Alena', role: 'Teacher' } );

console.log( 'Alena\'s Keys:', Alena.getKeys() ); // 'this' refers to 'Alena' 

var getKeys = Alena.getKeys;

console.log( getKeys() ); // 'this' refers to the node process
```

new way no error

```js
'use strict';

var Person = function( data ) {
  for ( var key in data ) {
    this[ key ] = data[ key ];
  }
  this.getKeys = () => {
    return Object.keys( this );
  };
};

var Alena = new Person( { name: 'Alena', role: 'Teacher' } );

console.log( 'Alena\'s Keys:', Alena.getKeys() ); // 'this' refers to 'Alena' 

var getKeys = Alena.getKeys;

console.log( getKeys() ); // 'this' now refers to Alena
```

* What the arrow (or lambda) does is it binds the function to the instance of the Person no matter where it was called

[What are Promises?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* With Promises, callback functions are handed off to another scope to be called once an event is complete, because of this, you have to take extra care when handing off a callback function so that it has a way to access its original scope

old way

```js
'use strict';

var Teacher = function( data ) {
  this.name = data.name;
  this.greet = function( studentCnt ) {
    let promise = new Promise( function( resolve, reject ) {
      if ( studentCnt === 0 ) {
        reject( 'Zero students in class' );
      } else {
        resolve( `Hello to ${studentCnt} of my favorite students!` );
      }
    } );
    return promise;
  };
};

var Classroom = function( data ) {
  this.subject = data.name;
  this.teacher = data.teacher;
  this.students = [];
  this.addStudent = function( data ) {
    this.students.push( data );
    this.greet();
  };
  this.greet = () => {
    this.teacher.greet( this.students.length ).then(
      ( function( classroom ) {
        return function( greeting ) {
          console.log( `${classroom.teacher.name} says: `, greeting );
        };
      } )( this ),
      function( err ) {
        console.log( err );
      }
    );
  };
};

var myTeacher = new Teacher( { name: 'James' } );
var myClassroom = new Classroom( { name: 'The Future of JavaScript', teacher: myTeacher } );
```

better way with es6

```js
'use strict';

var Teacher = function( data ) {
  this.name = data.name;
  this.greet = function( studentCnt ) {
    let promise = new Promise( function( resolve, reject ) {
      if ( studentCnt === 0 ) {
        reject( 'Zero students in class' );
      } else {
        resolve( `Hello to ${studentCnt} of my favorite students!` );
      }
    } );
    return promise;
  };
};

var Classroom = function( data ) {
  this.subject = data.name;
  this.teacher = data.teacher;
  this.students = [];
  this.addStudent = function( data ) {
    this.students.push( data );
    this.greet();
  };
  this.greet = () => {
    this.teacher.greet( this.students.length ).then(
      greeting => console.log( `${this.teacher.name} says: `, greeting ),
      err => console.log( err ) );
  };
};

var myTeacher = new Teacher( { name: 'James' } );
var myClassroom = new Classroom( { name: 'The Future of JavaScript', teacher: myTeacher } );
```

* arrow functions do not require paranthesees when your function only takes a single parameter
* you can even remove the curly braces when you are simply returning the result of your expression

[ES6 Arrow functions Sample](https://googlechrome.github.io/samples/arrows-es6/)

[Arrow Functions MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Default Parameters
Finally we’re able to set default values for function parameters like every other programming language.

```js
'use strict';

function greet( name, timeOfDay ) {
  name = name || 'Guil';
  timeOfDay = timeOfDay || 'Day';
  console.log( `Good ${timeOfDay}, ${name}!` );
}

function betterGreet( name = 'Guil', timeOfDay = 'Day' ) {
  console.log( `Good ${timeOfDay}, ${name}!` );
}

greet();
betterGreet();
betterGreet( undefined, 'Afternoon' );
```

`$ node default-parameters.js`

### Console Output

```
Good Day, Guil!
Good Day, Guil!
Good Afternoon, Guil!
```
