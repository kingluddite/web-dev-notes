# Types and JavaScript
* JavaScript handles data differently than other programming languages

## Dynamic Typing
You don't tell the engine what type of data a variable holds, it figures it out while your code is running

* Variables can hold different types of values because it's all figured out during execution
* A single variable can hold different types of values at different times as the JavaScript engine executes your code

## Static Typing
You tell the engine ahead of time what type of data the variable will hold

### Java and C# use Static Typing
* Here is an example we tell the engine that `isNew` should only hold Boolean values
* If you try to put a `String` type into a `Boolean` type, you get an error
 
`bool isNew = 'hello'; // error`

## JavaScript uses Dynamic Typing
* There is no keyword to tell the JavaScript engine what kind of data goes into the variable

```
// no errors for any of these
var isNew = true; // I am a boolean value
isNew = 'I am a string';
isNew = 1; // now I'm a number!
