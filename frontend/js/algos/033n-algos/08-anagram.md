# Anagram
## Coding Question:
* Check to see if two provided strings are anagrams of each other
* One string is an anagram of another if it uses the same characters in the same quantity
    - Only characters, not spaces or punctuation
    - Consider capital letters to be the same as lower case
    - Examples:
        + anagrams('rail safety', fairy tales') --> true
        + anagrams('RAIL! SAFETY!', 'fairy tales') --> true
        + anagrams('Hi there', 'bye there') -- false

## Run test
`$ jest anagrams/test.js --watch`

## Regular Expressions (RegEx)
* [RegEx docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
* [Special characters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters)
    - `\w` - Matches any alphanumeric character including the underscore
        + (equivalent to `[A-Za-z0-9_]`)
        + Example:

### Question
* How could we remove any spaces and ! and ? from a string:
* [js playground](https://stephengrider.github.io/JSPlaygrounds/)

```
const word = "HI THERE CODER ???!!!"
```

* We can use the `/w` regular expression with an empty string

```
const word = "HI THERE!!!";
word.replace(/[^\w]/g, '').toLowerCase(); // hithere
```

## Character maps
* When working with strings it is a good strategy to generate character maps

![character maps](https://i.imgur.com/P5uT5tS.png)

* hello

```
{
    h: 1,
    e: 1,
    l: 2,
    o: 1
}
```

* lleho

```
{
    h: 1,
    e: 1,
    l: 2,
    o: 1
}
```

* We could iterate over our first character map and compare all the letters inside of it with all the letters in the other character map and the quantities as well

## Gotcha! Beware of one edge catch
* [hello and hellos](https://i.imgur.com/UdJ9uDy.png)
```
// hello
{
    h: 1,
    e: 1,
    l: 2,
    o: 1
}

// hellos
{
    h: 1,
    e: 1,
    l: 2,
    o: 1,
    s: 1
}
```

* If we start with the first `hello` and compare it to `hellos` we only go up to the `o` in `hello` and we won't compare `s` because our first object doesn't have it
    - Solution (not efficient) - compare the first character map to the second character map and then compare the second character map to the first character map
    - Better (easier) Solution - count the number of keys in the first object and compare it to the other object
        + So in hello we have 4 keys and in the second we have 5 keys
        + Or you could count the length of the first string and compare it to the second string

## Start coding
```
function anagrams(stringA, stringB) {}

module.exports = anagrams;
```

* We will need to make a character map out of `stringA` and `stringB`
* We could build 2 for loops to iterate through both stringA and stringB
    - A better way will be to create a helper function to build a character map for us and this will give us 2 for loops for the price of one
    - Interviewers like to see applicants build helper functions
    - This helps you compartmentalize your code

```
function anagrams(stringA, stringB) {
  //
}

// helper function
function buildCharMap(str) {
  const charMap = {};
  const cleanedStr = str.replace(/[^\w]/g, '').toLowerCase();
}

module.exports = anagrams;

```

* But a more compact way would be to tuck that cleanup logic directly inside the `for of` loop itself

```
function anagrams(stringA, stringB) {
  //
}

// helper function
function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
  }
}

module.exports = anagrams;

```

### Remember how we put our character maps together
1. We take our character map (`charMap`)
2. We assign a key to our character map with the current key that we are looking at `char`
3. Then we increment the value at that character

### Houston we have a problem!
```
// MORE CODE

// helper function
function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
    charMap[char] = charMap[char] + 1;
  }
}

// MORE CODE
```

* If we just use `charMap[char] = charMap[char] + 1;` this will generate an error on the first iteration of our `for of` loop because there will `undefined` values and that will cause an NaN error
* To fix that add `|| 1`

```
function anagrams(stringA, stringB) {
  //
}

// helper function
function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
    charMap[char] = charMap[char] + 1 || 1;
  }
}

module.exports = anagrams;

```

## Very important reminder - make sure you return something!
```
// MORE CODE

function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
    charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap; // Don't forget to return!!!!!!
}

// MORE CODE
```

* In a high pressure situation like a coding interview, many interviewees forget to add the return!

## Use our helper function to build a character map for both `stringA` and `stringB`

```
// helper function
function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
    charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap;
}

function anagrams(stringA, stringB) {
  aCharMap = buildCharMap(stringA);
  bCharMap = buildCharMap(stringB);
}


module.exports = anagrams;
```

## Compare the two character maps
* We now have our two character maps and it is now up to us to compare the two character maps together
* Don't forget to incorporate the edge case discussed earlier. Instead of comparing both character maps both ways, find the longest character map key length or str length instead for a more efficient solution

### If you choose to compare string lengths
* If you choose this approach remember to do it AFTER you remove spaces and punctuation

### If you choose to look at the number of keys inside both of these character maps and check to see if they are identical in length (we will choose this)

#### How to pull out the number of keys in an object
* Notice that `Object` is using a capital `O`
* [js playground](https://stephengrider.github.io/JSPlaygrounds/)

```
const obj = {
  a: 1,
  b: 1,
  c: 1
}

Object.keys(obj); // ["a","b","c"]
```

* This returns an array with all of our keys from that object

### Then call .length
* This will tell us how many keys are in our object

```
const obj = {
  a: 1,
  b: 1,
  c: 1
}

Object.keys(obj).length; // 3
```

* If the length of the keys is different between both character maps than we know we do not have an anagram (better way to say it is "one character map has an extra character type that the other character map does not")

```
// helper function
function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
    charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap;
}

function anagrams(stringA, stringB) {
  aCharMap = buildCharMap(stringA);
  bCharMap = buildCharMap(stringB);

  if (Object.keys(aCharMap).length !== Object.keys(bCharMap).length) {
    // we don't have an anagram
    return false;
  }
}


module.exports = anagrams;
```

## But if they do have the same number of characters
* Then we want to move forward with the "map checking" process

![map checking](https://i.imgur.com/qIKitCe.png)

* We will look at each one of the characters in object 1 and compare the number of uses it has to the other map
* It sounds complex but it is something you should be able to do
  - We need to iterate over one char map `aCharMap`, get every character inside it and then compare it to the other char map `bCharMap`
  - **note** We could iterate over either char map, it doesn't matter

## Important Gotcha (in vs of)
* When iterating over an array we use `for (let char of ...`
* When iterating over an object we use `for (let char in ...`
   - It would be create if `let char of` was for objects because the `o` in object would line up with the `o` in `of` but this is not the case

#
```
// MORE CODE

  for (let char in aCharMap) {
    if(aCharMap[char] !== bCharMap[char]) {

    }
  }

// MORE CODE
```

* So as we iterated through aCharMap[char] and if the first character is `a`, we say in the if conditional above we say 'how many times has "a" been used in `aCharMap` and if it has not been used the same number of times it has been used in `bCharMap` that means something must be wrong because these 2 objects do not line up at all
  - If that is the case we can immediately return false

```
// MORE CODE

  for (let char in aCharMap) {
    if(aCharMap[char] !== bCharMap[char]) {
      return;
    }
  }

// MORE CODE
```

## Don't forget to return!
* We need to return true if they are an anagram and false if they are not
  - We already handled the cases where they are not anagrams by returning false
* Now we need to return true if they are an anagram
  - So if both checks are passed that means we have an anagram and we can return true

```
// helper function
function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    // now we are only iterating over the parts of the string we care about
    charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap;
}

function anagrams(stringA, stringB) {
  aCharMap = buildCharMap(stringA);
  bCharMap = buildCharMap(stringB);

  if (Object.keys(aCharMap).length !== Object.keys(bCharMap).length) {
    // we don't have an anagram
    return false;
  }

  for (let char in aCharMap) {
    if (aCharMap[char] !== bCharMap[char]) {
      return;
    }
  }

  return true;
}

module.exports = anagrams;

```

## Run test
`$ jest anagrams/test.js --watch`

* All tests should pass

## Observation
* How many times are we iterating through `stringA` and `stringB`?
  - We iterate through `stringA` one time to build our character map using our utility function
  - We iterate through `stringB` one time to build our character map using our utility function
  - Then we iterate through one character map `for (let char in aCharMap) {` to do the final comparison
* We will come back to this solution as we show how we do this in another solution

## Next
* A far easier solution (but will cause us to run into some issues later on in another test question)

## Solution #2 for anagrams
* This will be far easier but it will run into some performance concerns

```
function anagrams(stringA, stringB) {

}

module.exports = anagrams;

```

## Learning a trick
```
const numbers = [1, 20, -100, 1000];
numbers.sort(); // [-100,1,1000,20]
```

* `sort()` will take all of the numbers in the array and your JavaScript runtime will do its best to figure out how to meaningfully sort the elements in the array
  - **note** sort() can be used with numbers and characters

## Sort characters too!
```
const numbers = ['a', 'z', 'd', 'x'];
numbers.sort(); // ["a","d","x","z"]
```

* We will use this alphabetical order as our alternative solution for anagrams

## New solution
1. Take our 2 inputs `stringA` and `stringB`
2. We'll clean up both strings (removing any spaces or punctuation)
3. We will lowercase both strings
4. We will sort both strings (when we sort both strings, they will end up in the same order and if the 2 sorted strings are completely the same, then we can say we have an anagram)
  * This solution means we don't have to use a for loop

## Helper function
* This will be used to automatically clean up each of these strings
  - We use the `replace()` statement and the 2 lowercase statements and doing the sorting of the strings as well
  - Anytime you are doing something twice, it is recommended to create a helper function to act as a factory to pump our your code for you and save you time and lines of code

##
```
function anagrams(stringA, stringB) {}

function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .sort();
}

module.exports = anagrams;
```

* Remember that `sort()` is a array method and we can't use it on a string

## Test this out
[test](https://stephengrider.github.io/JSPlaygrounds/)

```
function cleanString(str) {
 return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .sort(); 
}

cleanString("Billy WIlder");
```

* Will give you this error:

`TypeError: str.replace(...).toLowerCase(...).sort is not a function`

## Turn string to an array and then sort it and then join it together again
```
function cleanString(str) {
 return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('')
}

cleanString("Billy WIlder");
```

* And then we will use some code to test if this works:

```
function cleanString(str) {
 return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('')
}

cleanString("Hello There!!!"); // eeehhllort
cleanString("There@@@ Hello!!!!!!"); // eeehhllort
```

* We can see that both string are anagrams
* But if one string was different we see it can't be an anagram because the strings are not equal

```
function cleanString(str) {
 return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('')
}

cleanString("Hello Taaahere!!!"); // aaaeeehhllort

cleanString("There@@@ Hello!!!!!!"); // eeehhllort
```

## And we can add this to our code

```
function anagrams(stringA, stringB) {}

function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase().split('')
    .sort().join('');
}

module.exports = anagrams;
```

## Now How do we do that comparison between 2 strings?
* We have to loop through 1 string and compare every character to the other string
* Actually it is much more simple than that

```
function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase().split('')
    .sort().join('');
}

function anagrams(stringA, stringB) {
  cleanString(stringA) === cleanString(stringB);
}


module.exports = anagrams;
```

## Never forget to return!
```
// helper function
function anagrams(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB);
}

function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('');
}

module.exports = anagrams;
```

* The tests should all pass now
