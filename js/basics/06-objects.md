# Objects

* Something that has properties and methods
    - property is like a variable that belongs to the object
    - method is something that it can do or be done to the object

## Helpful Analogy
I like to think of objects as nouns (person, place or thing), methods as verbs because they do stuff and properties as adjectives because they describe stuff

* object > noun
* method > verb
* property > adjective

## Examples of Objects
* arrays are `objects`

```js
var myFavNums = [ 3, 5, 10 ];
```

* arrays have `properties`

```js
var myFavNums = [ 3, 5, 10 ].length;
```

* arrays have `methods`

```js
var myFavNums.push( 1, 2, 22 );
```

* [1, 2, 3 ]
    - arrays are `objects`
    - arrays have `properties`
      + [1, 2, 3 ].length
    - arrays have `methods`
      + [1, 2, 3 ].push()

## Storing values using variables
We can use variables to store different types of values.

```js
// we can use variables to store a String data type
var name = 'Phil';
```

Storing Arrays inside variables

```js
// We can also use a variable to store an Array data type
var grades = [100, 90, 86, 70];
```

## JavaScript object 
Objects can store values too.

 __ | __ | similar to 
--- | --- | ---
key: | value | _kind of like a variable name_
property: | value | _kind of like the value for that variable_

### Useful Analogy
Think of an object like a single item that holds multiple variables

![bag with items](https://i.imgur.com/JcpaE1P.png)

## How to create an object

```js
var student = {};
```

* We we did above is known as `assigning an object literal to a variable`
* the `{}` (curly braces) represent an object

**note** :
* `{}` - braces creates an object
* `[]` - brackets creates an array

```js
var student {
    firstName: 'Dave',
    lastName: 'Thomas'
};
```
* each key has a colon `:` and then the `value`
  - `firstName: 'Dave'`
* **each line ends with a comma** 
  - unless it is only one line or the last line and then it has no comma
* the `key` (or property name) is **not in quotes**
* the same naming rules of `variable` apply to the `key`
* object ends with semi-colon `;`

## Best Practice
* For readability place each key value pair on its own line
* Indent each line inside object
  - I recommend 2 spaces
* Add one space after colon

### Example of Best Practice

```js
var person = {
    name: 'Bob',
    country: 'US',
    age: 49,
    bloodDonor: true
    skills: [ 'HTML', 'CSS', 'JS', 'PHP' ];
};
```

### Accessing Object Properties
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
* similar to accessing an `array` but instead of providing a `number` (index) you provide the `name` of the `property`

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

## Example using for in loop

```js
var student = {
  name: 'Phil',
  grades: [ 92, 32, 22, 100 ]
};

for ( var key in student ) {
  console.log( key );
}
```

### Output in Console

![output of for in loop](https://i.imgur.com/aBtIVfx.png)

* The object is added after the `in`
* The variable `key` refers to the property name in the object
* `key` can be changed to anything you want
* `for`, `var` and `in` are key words and can't be changed

## How do we access the key name values?
* The only way to access a key name value is with the square brackets
* You CAN NOT use dot notation
* Remember only bracket notation will work when using a `for in` loop

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

### Output in console

![ouput props](https://i.imgur.com/8unb7oB.png)

What if I try this?

```js
for ( prop in person ) {
  console.log( prop, ': ', person.prop );
}
```

![for in output](https://i.imgur.com/zReK2wg.png)

### Undefined? Why?

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

## Switch Array to Using an Object

### Array example

```js
var questions = [
  ['How many states are in the United States?', 50],
  ['How many continents are there?', 7],
  ['How many legs does an insect have?', 6]
];
var correctAnswers = 0;
var question;
var answer;
var response;

function print(message) {
  document.write(message);
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    correctAnswers += 1;
  } 
}

html = "You got " + correctAnswers + " question(s) right."
print(html);
```

## Converted to Using Object

* convert an Array of Arrays into an Array of Objects

```js
// here is the array of objects
var questions = [
 {
   question: 'How many states are in the United States?',
   answer: 50
 },
 {
   question: 'How many continents are there?',
   answer: 7
 },
 {
   question: 'How many legs does an insect have?',
   answer: 6
 }
];
var correctAnswers = 0;
var question;
var answer;
var response;

function print(message) {
  document.write(message);
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i].question; // this line was changed
  answer = questions[i].answer; // this line was changed
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    correctAnswers += 1;
  }
}

html = "You got " + correctAnswers + " question(s) right."
print(html);

```

* same result but this code is more `readable`

### TIP: Make object more readable

* put items on same line, makes it more readable

```js
var questions = [
 { question: 'How many states are in the United States?', answer: 50 },
 { question: 'How many continents are there?', answer: 7 },
 { question: 'How many legs does an insect have?', answer: 6 }
];
```

#### Challenge 1
Create an array literal named objects.

**Solution**

```js
var objects = [ {} ];
```

#### Challenge 2
Inside the array literal, add three object literals. In other words, the objects array should have three values. Each object should have 2 property/value pairs.

**Solution**

```js
var objects = [ 
  { make: 'Ford', year: 1998 },
  { make: 'BMW', year: 2000 },
  { make: 'VW', year: 2010 }
];
```


## JSON
`JA`vaScript `O`bject `N`otation

* the most popular data exchange format on the web
* commonly used with AJAX to exchange data between a server and a web browser
* MongoDB uses JSON to update and send db info

### [OpenWeather MAP JSON link](http://openweathermap.org/)
* sign up
* grab your api key
* search for the city you want, look in URL and find city id
* put your id and your individual APPID in like the following and paste that URL into the browser and you will get JSON data back.

The following URL will not work because it is a bogus `APPID`, put yours in to see the weather data for `Philadelphia`

http://api.openweathermap.org/data/2.5/forecast/city?id=4560349&APPID=4bdc423659b58443ad1676fe261eead4

Your JSON view will not be friendly. To make it friendly download this Chrome extension [JSON View](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc): 

Now view the URL again and you'll see that it is nicely formatted.

### JSON Lint
Make sure your JSON is properly formatted using this tool [JSONLint](http://jsonlint.com/).

* JSON looks like a JavaScript Object but it's different
  - JSON is just a string of tags and words
  - but it is formatted just like a JavaScript Object
    + the reason is once we send it to a browser, it can easily grab that string and convert it to a JavaScript Object and then the programmer can use their own programming to work with it
  - JSON uses double quotes, not single quotes

### Challenge
```js
var students = [

];
```

Array of 5 student objects with:
* name (string)
* class name (string)
* grade (number )
* major (string)

## Best Practice
* Save data inside it's own file

When adding the js files to your html, add the data files first like this:

```html

```

* when you hit cancel in dialog box, the browser returns `null`
  - special data type which represents `no value`

Why are we getting the `cannot read property toLowerCase of null` error?

### Strange `null` error

![strange null error](https://i.imgur.com/fHMh8Bg.png_)

This will fix that error

```js
 if ( search === null || search === 'quit' ) {
  // code here
 }
```

* now we are checking for if they type quit or they hit cancel (which returns `null`), the error is gone when we click `cancel` in the dialog
