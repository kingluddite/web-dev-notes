# Rest Parameters and Spread Operator

Rest parameters let you specify an unknown number of parameters. 

The spread operator lets you specify an unknown number of array properties. In this video we’ll demonstrate how this is helpful.

## Rest Parameters
* `...`
* collects the arguments passed to a function
* needs to be the last argument defined in the function signature

**rest-parameters.js**

```js
'use strict';

function myFunction( name, ...params ) {
  console.log( name, params );
}

myFunction( 'Bob', 2, 4, 6, 8, 'Gary' );
// outputs: Bob [ 2, 4, 6, 8, 'Gary' ]
```

## Spread Operator
* `...`
* expands an array or any time of expression
* instead of array.concat() you can use spread `...
* you can pass all the values inside arrays to a new array

**spread-operator.js**

```js
'use strict';

const originalFlavors = [ 'Chocolate', 'Vanilla' ];

const newFlavors = [ 'Strawberry', 'Rocky Road' ];

const inventory = [ 'Mint Chocolate Chip', ...originalFlavors, 'Neopolitan', ...newFlavors ];

console.log( inventory );
// output
/* [ 'Mint Chocolate Chip',
  'Chocolate',
  'Vanilla',
  'Neopolitan',
  'Strawberry',
  'Rocky Road' ]
*/
```

If you add new values to the spread originals, they will be added to the final output

how can we split an array into single arguments then pass them to a function as separate arguments using the spread operator

**more-with-spread.js**

```js
'use strict';

function myFunction( name, iceCreamFlavor ) {
  console.log( `${name} really likes ${iceCreamFlavor} ice cream.` );
}

let args = [ 'Gabe', 'Vanilla' ];

// passes in array and places them in each parameter
myFunction( ...args );
```

## Destructuring
Let's you extract values from arrays or objects then assign those values to distinct variables
* simple concept
* one of most useful features in ES2015

```js
'use strict';

let toybox = { item1: 'car', item2: 'ball', item3: 'frisbee' };

let { item1, item2 } = toybox;

console.log( item1, item2 );
// car, ball
// item3 will generate an undefined error
```

you can declare new variables by placing the key on the left side of a colon and the new variable name on the right side

```js
'use strict';

let toybox = { item1: 'car', item2: 'ball', item3: 'frisbee' };

let { item3: disc } = toybox;

console.log( disc );
```

## Destructuring an Array

```js
'use strict';

let widgets = [ 'widget1', 'widget2', 'widget3', 'widget4', 'widget5' ];

let [ a, b, c, ...d ] = widgets;

console.log( a );
console.log( b );
console.log( c );
console.log( d );
/*
widget1
widget2
widget3
[ 'widget4', 'widget5' ]
 */
```

## Declaring default values for function parameters

```js
'use strict';

function getData( { url, method = 'post' } = {}, callback ) {
  callback( url, method );
}

getData( { url: 'myposturl.com' }, function( url, method ) {
  console.log( url, method );
} );

getData( {
    url: 'myputurl.com',
    method: 'put'
  },
  function( url, method ) {
    console.log( url, method );
  } );
/*
myposturl.com post
myputurl.com put
 */
```

Extract the value of a nested object's property

```js
'use strict';

let parentObject = {
  title: 'Super Important',
  childObject: {
    title: 'Equally Important'
  }
};

let { title, childObject: { title: childTitle } } = parentObject;

console.log( childTitle );
// Equally Important
```

## Object Property Shorthand
ES2015 provides a shorter syntax for defining property keys and objects
* when the interpreter provides a variable assignment without a property key, the variable name itself is used as the property key

```js
'use strict';

function submit( name, comments, rating = 5 ) {
  let data = { name, comments, rating };

  for ( let key in data ) {
    console.log( key + ':', data[ key ] );
  }
  // ... do ajax request
}

submit( 'English', 'Great course!' );
/*
name: English
comments: Great course!
rating: 5
 */
```

* not limited to strings
    - can also use Booleans, Arrays and Classes

## For...Of

### For Loop

```js
'use strict';

let myNumbers = [ 1, 2, 3, 4, 5, 6 ];

for ( let i = 0; i < myNumbers.length; i++ ) {
  console.log( myNumbers[ i ] );
}
/*
1
2
3
4
5
6
 */
```

* this works well but it is cumbersome

### for each loop

```js
'use strict';

let teachers = [
  { name: 'Phil', comments: 'Rock solid', rating: 4 },
  { name: 'Salvadore', comments: 'Cool', rating: 2 },
  { name: 'Johnny', comments: 'Super cool!', rating: 9 },
  { name: 'Bob', comments: 'Bad', rating: 6 },
  { name: 'Rachel', comments: 'OK', rating: 6 },
  { name: 'Mike', comments: 'Tepid', rating: 9 },
  { name: 'Brad', comments: 'Hated it', rating: 5 },
];

teachers.forEach( teacher => {
  if ( teacher.name === 'Brad' ) {
    console.log( teacher.rating );
  }
} );

// 5
```

### for of

```js
'use strict';

let teachers = [
  { name: 'Phil', comments: 'Rock solid', rating: 4 },
  { name: 'Salvadore', comments: 'Cool', rating: 2 },
  { name: 'Johnny', comments: 'Super cool!', rating: 9 },
  { name: 'Bob', comments: 'Bad', rating: 6 },
  { name: 'Rachel', comments: 'OK', rating: 6 },
  { name: 'Mike', comments: 'Tepid', rating: 9 },
  { name: 'Brad', comments: 'Hated it', rating: 5 },
];

for ( let teacher of teachers ) {
  console.log( teacher.name );
  if ( teacher.name === 'Bob' ) {
    console.log( teacher.rating );
    break;
  }
}
/*
Phil
Salvadore
Johnny
Bob
6
 */
```

* for of can not be used with regular statements
    - use the for in instead when looping over object properties

## Set
A Set is not an Array but it can behave like one. It’s a collection of unique values.

```js
'use strict';

let classroom = new Set();

let stevenJ = { name: 'Steven', age: 22 },
  sarah = { name: 'Sarah', age: 23 },
  stevenS = { name: 'Steven', age: 23 };

classroom.add( stevenJ );
classroom.add( sarah );
classroom.add( stevenS );

if ( classroom.has( stevenJ ) ) console.log( 'stevenJ is in the classroom' );
if ( classroom.has( sarah ) ) console.log( 'sarah is in the classroom' );
if ( classroom.has( stevenS ) ) console.log( 'stevenS is in the classroom' );

console.log( 'classroom size:', classroom.size );
/*
stevenJ is in the classroom
sarah is in the classroom
stevenS is in the classroom
classroom size: 3
 */
```

* a Set must have unique values
    - if you try to add a duplicate value, it will be ignored and not be added

### Set methods
* add()
* remove()
* has()

add to last js file

```js
classroom.delete( stevenJ );

console.log( 'classroom size:', classroom.size );

// Create an array of students from the classroom set
let arrayOfStudents = Array.from( classroom );
console.log( arrayOfStudents );

// Create a Set from an existing array
let alumni = new Set( arrayOfStudents );
console.log( 'alumni size:', alumni.size );
```

## Map
```js
'use strict';

let classroom = new Map();

let stevenJ = { name: 'Steven', age: 22 },
  sarah = { name: 'Sarah', age: 23 },
  stevenS = { name: 'Steven', age: 22 };

classroom.set( 'stevenJ', stevenJ );
classroom.set( 'sarah', sarah );
classroom.set( 'stevenS', stevenS );

// console.log( 'classroom size::', classroom.size );
// classroom.clear();
// console.log( 'classroom size::', classroom.size );


// if ( classroom.has( 'stevenJ' ) ) console.log( 'stevenJ is in the classroom' );
// if ( classroom.has( 'sarah' ) ) console.log( 'sarah is in the classroom' );
// if ( classroom.has( 'stevenS' ) ) console.log( 'stevenS is in the classroom' );

// classroom.delete( 'sarah' );
// console.log( 'sarah:', classroom.get( 'sarah' ) );

for ( let student of classroom ) {
  console.log( `'${student[0]}': ${student[1].age} years old.` );
}
/* output
'stevenJ': 22 years old.
'sarah': 23 years old.
'stevenS': 22 years old.
*/
```

