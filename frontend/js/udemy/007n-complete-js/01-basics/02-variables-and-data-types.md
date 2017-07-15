# Variables and Data Types
## Primitive JavaScript Data Types
* Number
    - Floating point numbers, for decimals and integers
    - Always use decimals even if we don't see them `5 === 5.0`
    - Other programming languages have different data types for integers and decimals but not JavaScript
* String
    - Sequence of characters, used for text
* Boolean
    - Logical data type that can only be true or false
* Undefined
    - Data type of a variable which does not have a value yet
* Null
    - Also means 'non-existent'

## Primitive
* Means they are not objects

## JavaScript has dynamic typing
* This means you do not have to manually define the data type of a variable
* The JavaScript Engine figures out the data type of the variable on its own
    - This can be useful
    - This can also be the reason for hard to find bugs

```js
const firstName = 'John';
const lastName = 'Doe';
const age = 40;
const fullAge = true;
console.log(`${firstName} ${lastName} is ${age} years old`);
```

 
