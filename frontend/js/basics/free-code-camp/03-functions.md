# Functions

## Generate Random Fractions with JavaScript
Random numbers are useful for creating random behavior.

JavaScript has a `Math.random()` function that generates a random decimal number between `0` (inclusive) and not quite up to `1` (exclusive). Thus `Math.random()` can return a `0` but never quite return a `1`

**Note**
Like Storing Values with the Equal Operator, all function calls will be resolved before the return executes, so we can return the value of the `Math.random()` function

## Generate Random Whole Numbers with JavaScript
```js
function randomWholeNum() {

  // Only change code below this line.

  return Math.floor(Math.random() * 10);
}
```

## Generate Random Whole Numbers within a Range
Instead of generating a random number between zero and a given number like we did before, we can generate a random number that falls within a range of two specific numbers.

`Math.floor(Math.random() * (max - min + 1)) + min`

## Use the parseInt Function
The `parseInt()` function parses a string and returns an integer. Here's an example:

`var a = parseInt("007");`

The above function converts the string "007" to an integer 7. If the first character in the string can't be converted into a number, then it returns `NaN`

## Use the parseInt Function with a Radix
The `parseInt()` function parses a string and returns an integer. It takes a second argument for the **radix**, which specifies the base of the number in the string. The radix can be an integer between 2 and 36.

The function call looks like:

`parseInt(string, radix);`

And here's an example:

`var a = parseInt("11", 2);`

The radix variable says that "11" is in the binary system, or base 2. This example converts the string "11" to an integer 3.

