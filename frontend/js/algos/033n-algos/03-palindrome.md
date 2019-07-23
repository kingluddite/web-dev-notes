# Palindrome
`$ cd exercises`

`$ jest palindrome/test.js --watch`

* 1 test suite failed
* 3 tests failed, 5 passed

## Code Question
* Given a string, return true if the string is a palindrome or false if it is not
    - Palindromes are strings that form the same word if it is reversed
    - **Do** include spaces and punctuation in determining if the string is a palindrome
        + Examples:
            * palindrome('abba') === true
            * palindrome('abcdefg') === false

## Start coding
`palindrome/index.js`

```
function palindrome(str) {}

module.exports = palindrome;
```

* First important thing - Always ask what you are expected to **return**
    - You are expected to return in this code question a **Boolean** (true/false)

## Try it
```
function palindrome(str) {
  const reverseStr = str
    .split('')
    .reverse()
    .join('');

  if (reverseStr === str) {
    return true;
  } else {
    return false;
  }
}

module.exports = palindrome;
```

## Refactor using an array helper called `every()`
* [every() docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
* The `every()` method tests whether all elements in the array pass the test implemented by the provided function
* It returns a **Boolean** value
* The `every()` function is used to do a **boolean** check on every element within an array
    - Example:
    - `const arr[0, 10, 14]` -----> Is 'every' value greater than 5?
        + `arr(every(val) => val > 5);`
* When the `every()` function runs it checks to see the return value of every function run, if any function returns false, then the overall expression will return false as well
    - However if the inner function comparison returns true for every element then the entire function expression will return true
* Great name for this function as it is essential returning a "check" or some type of comparison for every element within the array

### How we'll use every()
[a, b, c, b, a]

* First compare the first and last elements of the array

![first last elements of array](https://i.imgur.com/3HUc30O.png)

If they are equal, so far this is a palindrome

* Next compare the 2nd and 2nd to last value

![2nd and 2nd to last value](https://i.imgur.com/30iYmSO.png)

* If they are equal, then we still have a palindrome
* We would continue doing this until we go through the entire array
* In this case since `c` is at the middle, we would compare `c` to itself

![compare c to itself](https://i.imgur.com/5AQIoUX.png)

* Then compare `b` to previous `b`

![b compare to b](https://i.imgur.com/2ghcThV.png)

* Then compare `a` to `a`

![a to a](https://i.imgur.com/FHjW2jB.png)

** Problem - We are doing more comparisons then are necessary
    * We really only need to check from `a, b, c`
    * So this would not be an ideal solution for this type of work since we are doing twice as much work as we need to do

### Write the function
```
function palindrome(str) {
  return str.split('').every((char, i) => {
    return char === str[str.length - i - 1];
  });
}
```

* We first take the `str` and turn it into an array `str.split()`
* **note** Strings do not have access to the `every()` function as it is only for arrays
    - The first argument to the `every()` function is a function and it will be called for every element in the array

```
str.split('').every(() => {
  //
})
```

* We will receive the first argument to the `every()` function (which is each character from the array as an argument we will call `char` ( and because we want to compare each element to it's "mirror" on the other side, we also need to figure out how to get access to the element on the other side))

```
str.split('').every((char, i) => {
  //
})
```

### How to get access to element on other side?
* The second argument of `every(a, b)` we are given the index of the element

`['a', 'b', 'c']` --> So the second argument of `c` in the array would be `2` (remember that arrays are zero based)

* Now we'll return the comparison of the element and it's mirror on the other side of the array using this:

```
function palindrome(str) {
  str.split('').every((char, i) => {
    return char === str[str.length - i - 1];
  });
}
```

* The first time we run our function we are at position `i` of the array `['a', 'b', 'c', 'b', 'a']`
    - That `i` position would be **index** `0`
* To get access to the element on the other side we can look at the entire string array `['a', 'b', 'c', 'b', 'a']` and access the last element at the length of the array - 1 `str.length - 1`
    - But we can't say look at the element at `str.length` because that would be 5 but we need to subtract to get the correct index of the last item in the array `str.length - 1` - So our array with a length of 5 would use `str.length - 1` to give us `4`
    - So at the end we need to find the str[str.length - i]
    - But as we go through every step of the loop we need to subtract 1 off of that `str[str.length - i - 1]`
        + 5 - 0 - 1 (first iteration of loop gives us 4 (which would be the last 'a' in our array))
        + 5 - 1 - 1 (first iteration of loop gives us 3 (which would be the last 'b' in our array))
        
![index mirror element of array](https://i.imgur.com/aakizgZ.png)

## Remember to return the result of the `every()` function (gotcha! be careful)

```
function palindrome(str) {
  return str.split('').every((char, i) => {
    return char === str[str.length - i - 1];
  });
}
```

* Check to see all your tests are passing

`$ jest palindrome/test.js --watch`

## Interview Questions
* If you use this solution be prepared to point out it's weaknesses like we are doing more work than necessary
* Let interview know "this is a solution but it is doing half the work that it needs to do"
