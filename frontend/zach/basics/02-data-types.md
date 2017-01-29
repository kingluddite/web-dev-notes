# Boolean

```js
var isLoggedIn = true;

if ( true === isLoggedIn ) {

    console.log( 'Show admin area' );
}
```

## JsBin Useful Keyboard Shortcuts

* Using jsbin is easy
* The two following keyboard shortcuts should get you up and running in no time

| Keyboard Shortcut | function  |
| ----------------- |:-----------------:|
| `cmd` + `return`  | Run the code      |
| `ctl` + `l`       | Clean up the code |

# Strings

```js
var username = 'pip';

console.log( username );
```

 `JavaScript Guidelines`: use **single** quotes for strings

## Concatenate JavaScript Strings

 ```js
var firstName = "John";
var lastName = "Doe";
var fullName = firstName + " " + lastName;
console.log( fullName );
 ```

## Best Practice

Declare variables at the top and separate them with commas.

```js
var firstName =  "John",
    lastName = "Doe",
    fullName;

fullName = firstName + " " + lastName;
console.log( fullName );
```

## String Methods
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2" target="_blank">reference</a>

```js
console.log( firstName.charAt( 1 ) ); // "o"
console.log( firstName.slice( 0, -1 ) ); // "Joh"
console.log( firstName.slice( 2 ) ); // "hn"
console.log( firstName.concat( ' ', lastName ) ); // John Doe
// someString.trim() ---- will trim before and after spaces from string
```

# Number

Data type for numeric values and mathematical operations
* no quotation marks around them (_like we use in Strings_)
* `add` a + b
* `subtract` a - b
* `multiply` a * b
* `divide` a / b
* `modulo` a % b (remainder)

**note:** variables can later be reassigned to new values

```js
var a = 5;
a = 6;
```

* adds with numbers and concatenates with strings

## 3 Types of Numbers
* `Integers` - whole numbers
* `Floating Point` - decimal points
* `Positive & Negative` Infinity
    - (_note_) String - numeric values, NOT true numbers

```js
var detergent = '409'; // string not number`
```

## Add a string and a number
```js
var detergent = '409',
    favNumber = 5,
    bothVariables;

bothVariables = detergent + favNumber;
console.log( bothVariables ); // "4095"
```

* anytime you try to add a number and string **a string will always win out**

### Helpful Number functions

#### parseInt()

Converts string to integer

```js
bothVariables = parseInt(detergent) + favNumber;
console.log(bothVariables); // 504
```

#### parseFloat() 

Converts string to decimal

example - `1.111`

So if you want to add that to a number and not concatenat use `parseFloat()`

#### toFixed( x ) 

Converts to x number of decimal places, but also converts to string

```js
var floatNum = 1.111;
console.log( floatNum.toFixed( 2 ) ); // "1.11"
console.log( parseFloat( floatNum.toFixed( 2 ) ) ); // 1.11
```

#### toString() 

Converts a number to a string

#### typeof

Check type of data type with `typeof`

```js
var firstName = "John",
    favNum = 5;

console.log( typeof firstName ); // "string"
console.log( typeof favNum ); // "number"
```

#### NaN (this is a data type)

Not a Number

Most like returned because of an error

```js
console.log( parseInt( 'nowayjose' ) ); // NaN
```

#### Math Object
```js
Math.PI
Math.sqrt()
Math.pow()
Math.round()
Math.min()
Math.max()
Number.NEGATIVE_INFINITY
```

#### Object Data Type

[link](http://jsbin.com/dutiyex/edit?js,console)

A data type that allows for a value to have properties

* think of a variable having its own variables

##### Reassigning and adding new properties

* how to get value of a specific property
* console logging with string

#### Symbol Data Type

[link](http://jsbin.com/jevifo/edit?js,console)

Unique unchangeable values often used for naming custom properties

You add a property onto an existing object. 

`post.isPublished`

You have a high chance of a conflict with a 3rd party who writes same property.
A symbol stops this from being a property

`post[IS_PUBLISHED]`` - this is a unique value even if someone creates same symbol, no chance for conflict

* unique key as symbol
   + [link](http://jsbin.com/bolipo/edit?js,output)

#### Arrays (not it's own data type... it's technically a type of Object)

Store a collection of values.

* variables store a single value
* what if we want to store a collection of values? (use arrays!) 

**note:** avoid `new` with Array

```js
var postIds = new Array(); // bad
    betterArrayFormat = [];
```

[link](http://jsbin.com/kawaqo/edit?js,console)

* Array of Object ([link](http://jsbin.com/coxete/edit?js,console))

* Nested Arrays ([link](http://jsbin.com/fufuja/edit?js,console))

* Nested Arrays vs Objects ([link](http://jsbin.com/yadowil/edit?js,console))
    - objects are easier to decipher because they have names

### Array Index

position or order of a value in an Array
* Objects store values based on property names
* Arrays store values based on their order or their `index`
* first item has an index of 0 (zero) 
* Getting array values from their index ([link](http://jsbin.com/henewa/edit?js,console))
* reassign a value of an array

```js
pepBoys[0] = "Charlie";
```

* add one or many values to Array ([link](http://jsbin.com/rerabi/edit?js,console))
* they get added to `end` of Array

#### How do I add a value to the beginning of the Array?

```js
someArray.unshift( 'Magic' );
```

* Removing value from Array ([link](http://jsbin.com/qefadu/edit?js,console))

#### Other stuff you can do with Arrays

#### [Get number of items in array](http://jsbin.com/dulawa/edit?js,console) 

```js
myArray.length
```

#### Get last value in Array

```js
myArray[myArray.length];
```

* Join arrays together
* Get a portion of an array
* Sort items in an array
* Loop through items in an array
* Check if is an Array

### Concatenating Arrays
[link](http://jsbin.com/wanovu/edit?js,console)

* slice array, select portions of an array

```js
myArray.slice( startIndex, endIndex ); // endIndex is non-inclusive
```

[link](http://jsbin.com/gisiva/edit?js,console)

## Sorting Arrays

[link](http://jsbin.com/xuxune/edit?js,console)

* sorting numbers doesn't work as we would expect
* need to use special functions to sort numbers to be increasing and descreasing

## .forEach

Helps us loop through items in an array

[link](http://jsbin.com/lineweh/edit?js,console)

## .isArray

Run before you run a method on an array

[link](http://jsbin.com/tuqoso/edit?js,console)

## Convert Arrays to Strings and Strings to Arrays

[link](http://jsbin.com/xonano/edit?js,console)

## Strong vs Weak Typing

### Strong / Strict

* Specifies the data type when declaring a variable

### Weak / Loose

* Does not specify data type and can change data types

#### JavaScript is weakly typed
* Assign a variable a number and then reassign it to a string, no problem in JavaScript

**Best Practice**

Keep variables to a single data type
* keep the data types of variables consistent


