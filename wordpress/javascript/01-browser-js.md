# JavaScript in the Browser

## [JSBin](http://jsbin.com)
* `HTML`
* `CSS`
* `JS` (include libraries you need)
* console (shows output)

## Text Editor

[Atom](https://atom.io/)
* drag folder onto Atom to open them

View in browser (_use finder_)
Console 
`ctrl` + `i` (`cntl` + `j`)

Change theme in Atom in Preferences

## Statements, Expressions, Keywords

`Statement`: An executable line or block of code
* many statements end with semi-colon

This is a statement (_wrapped in curly braces_)

```js
function myFunction() {
    // stuff here
}
```

## Expression
Produces a value or is a value 
* Parts of statements

**Example of expressions**

`document.getElementById('wrapper')`

you could have `addEventListener` that has a callback function and that function (_second argument_) is also an expression and is part of a larger statement

* expressions and statements can be nested inside each other

## [Keywords](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)
A set of words with reserved functionality in JavaScript.
examples: `var`, `function`

## Data Types & Variables

* `Boolean`
* `String`
* `Number`
* `Null` - represents an empty value
* `Undefined` - a data type was set up but no value was assigned to it
* `Objects` - objects that allow for properties
* `Symbols` - (_new_) allow for unique identifiers

## Variable
A generic container for storing data in our JavaScript code

### How should I name variables?
full words, camel case, first word begins with lowercase letter

`var myName;`

### Set up Variable
1. Declare variable - set the name
2. Assigning - set the value

```js
// if you call this without ever setting a value you will return the `undefined` data type
var firstName;
firstName = "Tom";
// or
var lastName = "Brady";
```

