# Boolean

```js
var isLoggedIn = true;

if ( true === isLoggedIn ) {

    console.log( 'Show admin area' );
}
```

JsBin
Run - cmd + enter
Clean up - ctl + l

# Strings

```js
var username = 'pip';

console.log( username );
```

 JavaScript Guidelines: use **single** quotes for strings

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
[reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2)
```js
console.log( firstName.charAt( 1 ) ); // "o"
console.log( firstName.slice( 0, -1 ) ); // "Joh"
console.log( firstName.slice( 2 ) ); // "hn"
console.log( firstName.concat( ' ', lastName ) ); // John Doe
// someString.trim() ---- will trim before and after spaces from string
```

# Number

Data type for numeric values and mathematical operations
* no quotation marks around them (like Strings)
add a + b
subtract a - b
multiply a * b
divide a / b
modulo a % b (remainder)

**note** variables can later be reassigned to new values
var a = 5;
a = 6;

* + adds with numbers and concatenates with strings
## Types of Numbers

* Integers - whole numbers
* Floating Point - decimal points
* Positive & Negative Infinity

* String - numeric values, NOT true numbers
var detergent = '409'; // string not number

Add a string and a number
var detergent = '409',
    favNumber = 5,
    bothVariables;

bothVariables = detergent + favNumber;
console.log( bothVariables ); // "4095"
* anytime you try to add a number and string a string will always win out

### Helpful Number functions

* parseInt() - converts string to integer

bothVariables = parseInt(detergent) + favNumber;
console.log(bothVariables); // 504
* parseFloat() - converts string to decimal

a float - '1.111'
so if you want to add that to a number and not concatenat use parseFloat()
* toFixed( x ) - converts to x number of decimal places, but also converts to string

var floatNum = 1.111;
console.log( floatNum.toFixed( 2 ) ); // "1.11"
console.log( parseFloat( floatNum.toFixed( 2 ) ) ); // 1.11

* toString() - converts a number to a string

## Check what type?

`typeof`

var firstName = "John",
    favNum = 5;

console.log( typeof firstName ); // "string"
console.log( typeof favNum ); // "number"

## NaN (this is a data type)

Not a Number

Most like returned because of an error

console.log( parseInt( 'nowayjose' ) ); // NaN

## Math Object
Math.PI
Math.sqrt()
Math.pow()
Math.round()
Math.min()
Math.max()
Number.NEGATIVE_INFINITY

