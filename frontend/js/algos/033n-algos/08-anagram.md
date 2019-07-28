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

##
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

  if (Object.keys(aCharmap).length) !== Object.keys(bCharMap).length) {
    // we don't have an anagram
    return false;
  }
}


module.exports = anagrams;
```

