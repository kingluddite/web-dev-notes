# maxchar
```
// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {}

module.exports = maxChar;
```

* The technique used to solve this can be used to solve many other string related questions as well
    - Some other common variations of this question
        + What is the most common character in a string?
        + Does string **A** have the same characters as string **B** (is it an `anagram`)?
        + Does the given string have any repeated characters in it?

## Run test
`$ jest maxchar/test.js --watch`

## Trick to the solution
![convert string into object](https://i.imgur.com/amJDbnp.png)

* Take our string and convert it into an object
    - Where the **keys** of the object are the characters from the string and the **values** are the number of times that that character has been found

```
// string 'Hello There!'
// 3 'E's
// 2 'L's
/* here is our object
{
 H:1,
 e: 3,
 l: 2,
 o: 1,
 " ": 1,
 t: 1,
 h: 1,
 r: 1,
 !: 1
}
/* 
```

* The above map makes our question solution straightforward
    - Now we can walk through the object and find the key with the highest value and we have our answer
    - If we are asked to see if string A and string B have the same characters with the same frequency we could build up an object like above for both string A and string B and then compare the two and then make sure that both object have the same properties and values
    - Does the string have any repeated characters (any duplicate characters in the string) - might be the easiest related question overall, if there is any value inside our object above with a value greater than 1, then we have a duplicate

## Convert string into object
* js playground - https://stephengrider.github.io/JSPlaygrounds/

1. Create a string
2. Create an object

### How to add characters to object options
* Split string into an array and use a `foreach` helper to loop through all the characters
* Or use a `for of` loop to loop through all the characters inside and do basically the same thing
    - We'll use this (as we used it before)

1. We will iterate through our string
2. And for every character inside there we will either:
    * Add the character as a property and assign it the value of 1
    * Or if we already saw that property before we will add 1 to it

### Use in js playground
```
const str = "Hello There!"
const chars = {}

for (let char of str) {
 if (!chars[char]) {
  chars[char] = 1; 
 } else {
   chars[char]++;
 }
}

chars;
```

* Output

```
1
{"H":1,"e":3,"l":2,"o":1," ":1,"T":1,"h":1,"r":1,"!":1}
```

* Watch out for `null`!

```
const str = "Hello There!"
const chars = {}

for (let char of str) {
 chars[char] = chars[char] + 1
}

chars;
```

* Look at the output

```
NaN
{"H":null,"e":null,"l":null,"o":null," ":null,"T":null,"h":null,"r":null,"!":null}
```

* This is why we can't just say add 1 because if we try to add 1 to undefined we wind up with `null`
    - That's why we have to put in the `if` statement to see if that value exists yet

## Solution to that issue of null
* Say if adding 1 results in null (or falsey) than just assign the value of 1

```
const str = "Hello There!"
const chars = {}

for (let char of str) {
 chars[char] = chars[char] + 1 || 1
}

chars;
```

## Character map
* We can use a character map to solve a wide variety of string related questions

### What is a character map?
It is an object where we take every character out of the source string, we add it as a key to the object and the value for that key is the number of times that the letter is found in the string

```
function maxChar(str) {
  const charMap = {};

  for (let char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }
}
```

* We pull in what we learned
* We just switched up the order of operations in our if (from what we just walked through) just to introduce a little variety

## Log out to see where we are
```
function maxChar(str) {
  const charMap = {};

  for (let char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }

  console.log(charMap);
}
```

* You will see:

```
console.log maxchar/index.js:19
    { a: 1 }

console.log maxchar/index.js:19
    { '1': 6, a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, g: 1 }
```

* We can see that the character `'1'` is being used 6 times
    - It looks like our character map is working as expected

## Now we need to determine the max values
* We will create 2 new variables `max` and we'll set this to `0` and `maxChar` and we'll set that to an empty str `''`

```
function maxChar(str) {
  const charMap = {};
  let max = 0;
  let maxChar = '';

  for (let char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }

  console.log(charMap);
}

```

* As we iterate through the character map if we ever find a character that has more uses than max, then we'll set max equal to that new value and we'll set maxChar to the character that was responsible for that number of uses
    - Example:
        + Take the string `"Hello There!"`

```
{"H":1,"e":3,"l":2,"o":1," ":1,"T":1,"h":1,"r":1,"!":1}
```

* As we loop through `Hello There!` we will look at the value of `H` and `1`, since 1 is greater than the initial variable of `max` so this must be a new maximum, then we would set `max` to 1 and `maxChar` would be set to that key at that location
* Then we would go to the next value `e` and since e's value is 3 we would set max to `3` and maxChar would be updated to `e`

## `for of` loop --> arrays and strings
* For iterating through an array or string (any type of iterable object)

## `for in` loop --> objects 
* But in this case we are iterating through an actual object
* An actual collection of key/value pairs
* So to iterate through this object or any type of JavaScript object as opposed to an array or string we use a slightly different type of loop which is the `for in` loop
* **tip** How to remember the difference between the 2 loops
    - Since `object` starts with `o` we do not use the `for of` loop... we use the `for in` loop

```
function maxChar(str) {
  const charMap = {};
  let max = 0;
  let maxChar = '';

  for (let char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }

  for (let char in charMap) {
    if (charMap[char] > max) {
      max = charMap[char];
      maxChar = char;
    }
  }
}
```

* When we iterate with a `for in` **char** assigned the **keys** inside that object (it is not the value... it is the keys - so `char` will be the different letters that we added to our object)

## Don't forget to return it!
* At this point we know what character is the most commonly used in a string so all we have to do is remember to return it and we are finished!

```
function maxChar(str) {
  // create our character map object
  const charMap = {};
  // create a variable that will be used to hold highest count
  let max = 0;
  // create a variable that will be used to determine which character is used the most
  let maxChar = '';

  // loop through string
  for (let char of str) {
    console.log(char); // will capture each character of string
    if (charMap[char]) {
      // charMap[char] has a value and now need to be incremented as we 
      // loop through characters in string and we increment each value as we encounter a duplicate value and we assign it to that key
      charMap[char]++;
    } else {
      // charMap[char] is undefined so we first need to set it to 1
      charMap[char] = 1;
    }
  }
  
  // now we will loop through the charMap object
  for (let char in charMap) {
    // console.log(max)
    // max will keep track of the maximum value
    if (charMap[char] > max) {
      // as we loop through the charMap Object keys we test if any is greater than the max value we have stored
      // if it is greater than we assign the new max value to the max variable 
      max = charMap[char];
      // and we assign the char letter to the maxChar variable
      maxChar = char;
    }
  }
  
  // we return the letter most used in the string
  return maxChar;
}

module.exports = maxChar;
```

* All tests should not pass

