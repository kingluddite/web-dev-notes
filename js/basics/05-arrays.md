# Arrays

* variables only hold one value
* shopping cart
    - if you want people to be able to buy things you'd have to create a variable for each item they could buy. This is not flexible enough of a solution.

## Arrays offer a better solution
* arrays are a flexible way to store information
    - you can store different types of data
    - you don't need to know in advance what's going inside it
    - you can add or remove items dynamically


## Create an array
```js
var myShopping
```

* just like creating a variable

But with an array we also do this

```js
var myShopping = [ 'cereal', 'bread', 'jello'];
```

* the brackets are where it gets different
* we can store different data types all the same or a combination

## This is an array literal

* think of this empty array like a blank piece of paper

```js
var myArray = [];
```

## Array Format

You will see arrays on a single line like this:

```js
var myShopping = [ 'cereal', 'bread', 'jello'];
```

Or on multiple lines like this:

```js
var myShopping = [ 
  'cereal', 
  'bread', 
  'jello'
];
```

### Challenge:
Add another line of code that creates a second array named assorted. Assign one string value, a number and a Boolean value (like true or false) to the array.

```js
var data = [ 1, 2, 3 ];
```

#### Solution:
```js
var data = [ 1, 2, 3 ];
var assorted = [ 'pele', 3, true ];
```

## Accessing items in an Array
* use its `index` value
    - just a number that indicates the position of that item in the list

## 1 isn't the number, 0 is
Just remember that Array indexes start at 0
    * this is hard for beginners to wrap their head around

```js
var assorted = [ 'pele', 3, true ];
```

* grab the first item in the above array and post it to the console

```js
console.log( assorted[ 0 ] ); // pele
console.log( assorted[ 2 ] ); // true
```

If you try to access an index in the array that doesn't exist, you'll get `undefined`
* JavaScript is telling us that there isn't anything in that index of the array

## Add items to an Array

[MDN array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Array properties

* length

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers.length; // 6
```

#### How could I add an item to the end of the above array?

one way would be:

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers[ numbers.length ] = 7;
console.log( numbers ); // [1, 2, 3, 4, 5, 6, 7]
```

### Array methods

* Array.push()

easier way to add an item to the end of an array

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers.push(7);
console.log( numbers ); // [1, 2, 3, 4, 5, 6, 7]
```

You can add multiple items to an array at once

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers.push( 7, 8, 9 );
console.log( numbers ); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

* Array.unshift()
    - add items to the beginning of an array
    - the name `unshift` is a confusing name, should have been named better

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers.unshift( 0 );
console.log( numbers ); // [0, 1, 2, 3, 4, 5, 6]
```

* just like push, you can add more than one item to the beginning of an array

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers.unshift( -2, -1, 0 );
console.log( numbers ); // [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Removing items from an array

`pop()`

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
numbers.pop();
console.log( numbers ); // [1, 2, 3, 4, 5]
```

**note**: pop() doesn't just remove the last item, it also returns the last item
    * so you could use pop() to retrieve the last item in an array

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
var lastItem = numbers.pop();
console.log( numbers ); // [1, 2, 3, 4, 5]
console.log( lastItem ); // 6
```

`shift()`

```js
var numbers = [ 1, 2, 3, 4, 5, 6 ];
var firstItem = numbers.shift(); // [2, 3, 4, 5, 6]
console.log( firstItem ); // 1
```

**note**: push and shift methods are often used together to create a `queue`, a list of items that follow the logic of `first in, first out` (fifo)

grocery store line
* new customers get pushed to the end of the line
* latest customer (front of line) get helped first and and when they get rung up by the teller, they get pushed out of the line 

[console practice](https://i.imgur.com/0AI3Db9.png)

* `clear()` - cleans up console
* up arrow remembers history in console, saves you typing

## Using Loops with Arrays

* arrays are one of the most used structures in JavaScript  

### Programming Jargon
"loop through and array" is same as "iterate through and array"

one way to loop through an array

```js
var players = ['Kobe', 'Magic', 'Kareem', 'Shaq' ];
for ( var i = 0; i < 4; i += 1 }
  // do stuff
)
```

* problem, we always don't know how many items are in an array, how can we dynamically change the conditional upper number?

```js
var players = ['Kobe', 'Magic', 'Kareem', 'Shaq' ];
for ( var i = 0; i < players.length; i += 1 }
  console.log( players[ i ] );
)
```

1. Create an ordered list of our players in HTML

```html
<ul>
  <li>Kobe</li>
  <li>Magic</li>
  <li>Kareem</li>
  <li>Shaq</li>
</ul>
```

2. We want to create a loop that will write this code for us

```js
// <ul>
//   <li>Kobe</li>
//   <li>Magic</li>
//   <li>Kareem</li>
//   <li>Shaq</li>
// </ul>

var players = [
  'Kobe',
  'Magic',
  'Kareem',
  'Shaq'
];

function print( message ) {
  document.write( message );
}

function printList( list ) {
  var listHTML = '<ol>';
  for (var i = 0; i < list.length; i += 1) {
    listHTML += '<li>' + list[i] + '</li>';
  }
  listHTML += '</ol>';
  print( listHTML );
}

printList( players );
```

## Exercise:
Create an array of scores. Figure out a way to find the average of those scores using a `for loop`.


# Useful Array Methods

## join()
* output entire array as a comma separated string (doesn't have to just be a comma, can use whatever separater you want)

```js
var daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
    daysString = daysInWeek.join( ', ' );
    console.log( daysString ); // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
```

## concat()
* use it to add one list to another

```js
var greatestEverTeamRoster = [ 'Pele', 'Zidane', 'George Best' ],
    newGreatestPlayersEver = [ 'Messi', 'Ronaldo'],
    bestEverTeam = greatestEverTeamRoster.concat( newGreatestPlayersEver );
    console.log( bestEverTeam ); // ["Pele", "Zidane", "George Best", "Messi", "Ronaldo"]
```

**important** concat does not change the original two arrays
* they are still there and have the same values as before


## indexOf()
How do you find stuff inside an array?

```js
var players = [ 'Kobe', 'Magic', 'Kareem', 'Shaq' ],
    position = players.indexOf( 'Magic' );
console.log( position ); // 1
```

* 1 is the postion of where the match in the array was found, since magic is in the players[1], 1 is returned

**Best Practice** code a little, check it, code a little check it
* write and test, write and test
  - enables you to quickly catch and fix errors

## Two Dimensional Arrays
You can put arrays in side of an array (an array of arrays)
* this is known as a `two dimensional` array

![turn this into a multi-dimensional array](https://i.imgur.com/DMecpe6.png)

start by creating the outer array, the spreadsheet itself

think of this as a way to hold all the grades for all the students

```js
var grades = [ ];
```

Then we add arrays inside the arrays

```js
var grades = [
  [ 80, 90, 100, 95 ],
  [ 75, 95, 88, 70 ],
  [ 60, 88, 92, 93 ]
];
```

![accessing grades](https://i.imgur.com/jfMdmHp.png)

grades[0] - will access student 1's grades
grades[1] - will access student 2's grades
grades[2] - will access student 3's grades

get the last grade of 2nd student
grades[1][3];

get the first grade of the last student
grades[2][0];

## Exercise
Create a two dimensional array to hold songs and artists and then displays playlist of each song and the artist that recorded it

**tip**

```js
var coordinates = [
 [ 'bmw', 'vw bug' ]; DO NOT PUT A SEMI-COLON HERE! Leave it as a blank or add a comma if there are more than one line, the last line does not have a comma
];
```

## Quiz
* create two dimensional array to hold three questions and answers
* use a loop
* compare answer to response
* use prompt message to ask question
* conditional statement to see if studnet's answer matches real answer
* when loop is done you should know how many questions were correctly answered and print that out to the screen

## DOM
* stop using document.write


