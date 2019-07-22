# fizzbuzz
```
// --- Directions
// Write a program that console logs the numbers
// from 1 to n. But for multiples of three print
// “fizz” instead of the number and for the multiples
// of five print “buzz”. For numbers which are multiples
// of both three and five print “fizzbuzz”.
// --- Example
//   fizzBuzz(5);
//   1
//   2
//   fizz
//   4
//   buzz

function fizzBuzz(n) {
}

module.exports = fizzBuzz;
```

## Run test to start things off
`$ jest fizzbuzz/test.js --watch`

* I will call fizzBuzz(n) with only whole numbers

## Trick - How to calculate a multiple of a given number in JavaScript
### The modulo operator
* We will use a very specific operator ---> `modulo` operator
* The modulo operator gives us the remainder of a number during division

`9 % 3` will return `0` (it has no remainer when you divide 9 by 3)

* But if we `10 % 3` then it has a remainder of `1`

### Use this info
* So if we use the modulo operator with the number as the multiple our question is whether or not the result of that is `0`

```
12 % 3 === 0 // true
// so if the number we are using doesn't have a remainder (the module of the numbers we are checking) then it must be a multiple and we will get true

11 * 3 === 0 // false
```

* We will be printing out lowercase `fizz` (not uppercase - that is specifically what the jest tests are looking for)
* We are not return the number we are console logging the number

## The Solution
* We will use a manual `for` loop
    - It is advised to avoid manual for loops whenever possible but in this case we can't get around it
    - We normally start off with `0` in a `for` loop but in this case we will start off at `1` (the directions explicitly say we are iterating from 1 to `n`)
    - During an interview you should write out comments to guide you
    - Instead of `if (i % 3 === 0 and i % 5 === 0)` you can use `if (i % 15) === 0` (easier to read)

##
```
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // check to see if n is a multiple of 3 and 5
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('fizzbuzz');
      // check to see if n is a multiple of 3
    } else if (i % 3 === 0) {
      console.log('fizz');
      // check to see if n is a multiple of 5
    } else if (i % 5 === 0) {
      console.log('buzz');
    } else {
      console.log(i);
    }
  }
}

module.exports = fizzBuzz;
```

### Tip
* Many times developer interviewers will try to get fancy with this code question and this is a bad idea. This is a straight forward coding question and don't try to be fancy here or it will reflect poorly on you. K.I.S.S with this question
    - If you try to make this fancy the interviewer might say "wow you took some straightforward easy code and you made it much harder to read"
    - On some questions they want you to be fancy and show your knowledge of JavaScript and on others they want you to be straight forward and simple - you need to know when to be fancy and try to impress with your knowledge of JavaScript and other times you need to keep it straightforward and simple 
