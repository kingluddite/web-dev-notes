# reverseint
```
// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
  //
}
```

### Question to ask
* What is the input type and output type?
    - The input is a number and the output is a number

### Tricks to know
#### Number to String
* We have a number but we can turn a number into a string using

`n.toString()`

#### Negative and Positive Numbers
* We can use the [Math.sign(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) function and if we pass in a positive number it will return `1` and if that number is `negative` it will return `-1`

```
Math.sign(4000) --> 1
Math.sign(-4000) --> -1
```

#### Convert String into a Number
`parseInt`

* parseInt(String) and returns a number
* After it is a number we can perform mathematical operations on it

```
const myNumber = 200
parseInt(myNumber.toString()) + 300 // 500
```

#### JavaScript Playground Tool
[JSPlaygrounds](https://stephengrider.github.io/JSPlaygrounds/)

```
const myNumber = 200
myNumber.toString().split('').join('')
```

* And on the right you will see: 200

## Quokka.js
* Install the plugin
* Use in new file or current file (cmd + shift + palette)
* free version console log function call and it will give the output inline inside vs code

## First Try
```
function reverseInt(n) {
  return (
    parseInt(
      n
        .toString()
        .split('')
        .reverse()
        .join('')
    ) * Math.sign(n)
  );
}

module.exports = reverseInt;
```

## Refactor for readability
```
function reverseInt(n) {
  const reversed = n.toString().split('').reverse().join('');

  if (n < 0) {
    return parseInt(reversed) * -1;
  }
  return parseInt(reversed);
}

module.exports = reverseInt;
```

* A little cleaner using Math.sign()

```
function reverseInt(n) {
  const reversed = n.toString().split('').reverse().join('');

  return parseInt(reversed) * Math.sign(n);
}

module.exports = reverseInt;
```

