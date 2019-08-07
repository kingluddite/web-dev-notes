# Capitalize

## Code question
* Write a function that accepts a string
    - The function should capitalize the first letter of each word in the string
        + Then return the capitalized string

### Examples
```
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'
```

## Starting code
```
function capitalize(str) {}

module.exports = capitalize;
```

## Start the test
`$ jest capitalize/test.js --watch`

## We will look at 2 solutions
1. Very clean, easy to ready but requires firm understanding of JavaScript standard library for working with strings
2. Easy to reason about but requires nasty for loop and hard to understand what's going on with it by just looking at the code 

## Tools you need to know about
### `slice()`
* The `slice()` method extracts a section of a string and returns it as a NEW string
* [slice() MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
* The slice method belongs to all strings
    - It will take some elements out of that string

### slice() syntax
`str.slice(beginIndex[, endIndex])`

* The first argument is the index of that string to start from
* There is an OPTIONAL 2nd argument which is the end index
    - If you don't provide the 2nd argument then the rest of the string is automatically included

## Take `slice()` for a test drive
```
const word = "there";

word.slice(1); // here
```

* If you just want the 't'

```
const word = "there";

word[0]; // t
```

* Make the T capitalized

```
const word = "there";

word[0].toUpperCase(); // t
```

## psuedo code it
* Make an empty array `words`
* Split the input string by spaces to get an array
* For each word in the array
    - Uppercase the first letter of the word
    - Join first letter with the rest of the string
    - Push result into `words` array
* Join `words` into a string and return it

```
function capitalize(str) {
  const words = [];

  for (let word of str.split(' ')) {
    word[0].toUpperCase() + word.slice(1);
  }

}

module.exports = capitalize;
```

* We create an empty array
* We loop through each word of the array split on empty spaces
* The first letter we capitalize and then we append the rest of the word

## Then we push the results into the words array
```
function capitalize(str) {
  const words = [];

  for (let word of str.split(' ')) {
    words.push(word[0].toUpperCase() + word.slice(1));
  }

}

module.exports = capitalize;
```

## Now we will join all the words together with the space character
```
function capitalize(str) {
  const words = [];

  for (let word of str.split(' ')) {
    words.push(word[0].toUpperCase() + word.slice(1));
  }

  return words.join(' ');

}

module.exports = capitalize;
```

* Don't forget to return it!

## Now we'll code another more verbose solution
* But easier to arrive at and easier to read

### Start coding
```
function capitalize(str) {

}

module.exports = capitalize;
```

### Psuedocode it
* Create an empty string called `result`
* For each character in the string
    - If the character to the left of a space
        + Capitalize it and add to `result`
    - Else
        + Add it to `result`

#### Translate
[h][i][_][t][h][e][r][e]

* We start at `h`. Is there a empty space to the left? No
* Add h to result
* Next character in iteration is `i`. Is there a space to the left? No
* Add i to result
* Next character is `_`. Is there a space to the left? No
* Add empty space to `result`
* next character is `t`. Is there an empty space to the left? YES!
* Capitalize it and move to the next character
* Continue until end of string

#### Problem with the solution
* It doesn't work well with the first character
* When you are capitalizing a sentence you need to always capitalize the sentence
    - To get around the limitation of our solution's issue here is our updated psuedocode

## New and improved psuedocode
```
* Create "result" which is the first character of the input string capitalized
* For each character in the string
    - If the character to the left of a space
        + Capitalize it and add to `result`
    - Else
        + Add it to `result`
```

* Here is the first step

```
function capitalize(str) {
  let result = str[0].toUpperCase();

  return result;
}

module.exports = capitalize;
```

* The downside of this solution is we'll need a manual for loop
    - We can not use a `for of` loop in this case
        + Why? Because the `for of` loop will attempt to iterate through EVERY character
        + But in our case here, we don't want to iterate through every character but we want to skip the first character and iterate through the rest

## Final Solution
```
function capitalize(str) {
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}

module.exports = capitalize;
```

## Houston we have a problem
* The second solution works but there are problems with it
* What if we were working with Spanish strings? The first let could be something like:

`?Que tal?` and you can't capitalize a question mark

* That would also not work for other solution but always hard coding a value is sloppy
