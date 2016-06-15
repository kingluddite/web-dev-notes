# Objects

* something that has properties and methods
    - property is like a variable that belongs to the object
    - method is something that it can do or be done to the object
    - object > noun
    - method > verb
    - property > adjective

## Examples of Objects
* [1, 2, 3 ]
    - arrays are objects
    - property
        +[1, 2, 3 ].length
    - method
        + [1, 2, 3 ].push()

## Storing values
* variable
    - var name = 'Phil';
* array
    - var grades = [100, 90, 86, 70];

## JavaScript object 
* store values

key: value (kind of like a variable name)
property: value (kind of like the value for that variable)

Think of an object like a single item that holds multiple variables

## How to create an object

```js
var student = {};
```

* assigning an object literal to a variable
* the {} (curly braces) represent an object

**note** :
* {} - creates an object
* [] - creates an array

```js
var student {
    firstName: 'Dave',
    lastName: 'Thomas'
};
```
* each key has a colon and then the value
* each line ends with a comma unless it is only one line or the last line and then it has no comma
* the key (or property name) is not in quotes
* rules of variable names apply to the key
* for readability place each key value pair on its own line
* indent each line inside object (2 spaces)
* add one space after colon
* object ends with semi-colon `;`

```js
var person = {
    name: 'Bob',
    country: 'US',
    age: 49,
    bloodDonor: true
    skills: [ 'HTML', 'CSS', 'JS', 'PHP' ];
};
```
Accessing Object Properties
* Arrays use an index to access Array items
* Objects use a key to access Object items

```js
var person = {
    name: 'Jack',
    age: 49
}
```

### How can you access the name value?
```js
console.log( person[ 'name' ] );
```
* similar to accessing an array but instead of providing a number (index) you provide the name of the property

### Dot Notation
The easier way to access the values of an Object

This is called **dot notation**

```js
person.name
```
* so much easier!!
* more common than using square brackets

## Change value of property
```js
person.name = 'Rick';
```

## Add a new property to our Object

```js
person.country = 'Ireland';
```

* think of objects as a `package` for variables
* think of properties as a collection of variables contained inside the object
* helps keep related data grouped in one easily accessed unit
   - simplifies handling data
   - you can pass an object and all of its properties to a function
   - very help if you want to return a lot of information from a function
   - the `return` key only allows you to return one thing but if you `return` one object, that object can be full of information

```js
var person = {
  name: 'Bob',
  country: 'US',
  age: 35,
  bloodDonor: true,
  skills: [ 'CSS', 'HTML5' ]
};

function print( message ) {
  'use strict';
  var div = document.getElementById( 'output' );
  div.innerHTML = message;
}

function boldText( word ) {
  return '<strong>' + word + '</strong>';
}

var message = '<p>Hello. My name is ' + boldText( person.name ) + '</p>';
message += '<p>I live in the ' + person.country + '</p>';
person.name = 'Johnny Two Times';
message += '<p>But, my real name is ' + person.name + '</p>';
person.age += 1;
message += '<p>My age is now ' + person.age + '</p>';
message += '<p>I have ' + boldText( person.skills.length ) + ' skills';
message += '<p>One of those skills is ' + person.skills[ 1 ];
message += '<p>But a full list of my skills are ' + person.skills.join( ', ' );
print( message );
```

# for in Loop
* only for objects
* loops through each key

```js
for ( var key in object ) {
  // do stuff
}
```

## example using for in loop
```js
var student = {
  name: 'Phil',
  grades: [ 92, 32, 22, 100 ]
};

for ( var key in student ) {
  console.log( key );
}
```

output

![output of for in loop](https://i.imgur.com/aBtIVfx.png)

* the object is added after the `in`
* the variable `key` refers to the property name in the object
* `key` can be changed to anything you want
* `for`, `var` and `in` are key words and can't be changed

## How do we access the key name values?
* the only way to access a key name value is with the square brackets
* You CAN NOT use dot notation
* remember only bracket notation will work when using a `for in` loop

```js
var person = {
    name: 'Bob',
    country: 'US',
    age: 35,
    bloodDonor: true,
    skills: [ 'CSS', 'HTML5' ]
  },
  prop;

for ( prop in person ) {
  console.log( prop );
}
```

![ouput props](https://i.imgur.com/8unb7oB.png)

What if I try this?

```js
for ( prop in person ) {
  console.log( prop, ': ', person.prop );
}
```

![for in output](https://i.imgur.com/zReK2wg.png)

Hmm. Why undefined?
The JavaScript interpreter is literally looking for a property named `prop` which does not exist
* prop is just the name of our variable and it's only a container that holds a property name
  - to access the value we have to use the square bracket notation

```js
  console.log( prop, ': ', person[ prop ] );
}
```

![it works](https://i.imgur.com/6IkyEuq.png)

If we did this

```js
  console.log( prop, ': ', person[ 'country' ] );
}
```
* it will populate all properties with the 'US' value
* It's a good idea to use the `var` keyword in a `for in` loop like this: `for (var key in shanghai)`.

```js
for ( var key in shanghai ) {
 console.log( key ); 
}
```


