# Code Questions
1. Given a string, return a new string with the reversed order of characters
2. Given a string, return true if the string is a palindrome or false if it is not
    - Palindromes are strings that form the same word if it is reversed
    - **Do** include spaces and punctuation in determining if the string is a palindrome
        + Examples:
            * palindrome('abba') === true
            * palindrome('abcdefg') === false
3. Given an integer, return an integer that is the reverse ordering of numbers
    - Examples:
        + reverseInt(15) === 51
        + reverseInt(981) === 189
        + reverseInt(500) === 5
        + reverseInt(-15) === -51
        + reverseInt(-90) === -9
4. Given a string, return the character that is most commonly used in the string
    - Examples:
        + macChar('abccccccd') === 'c'
        + maxChar('orange 11122244444444') === '1'
5. Write a program that console logs the numbers from 1 to n
    * But for multiples of three print "fizz" instead of the number and for the multiples of five print "buzz"
    * For numbers which are multiples of both three and five print "fizzbuzz"

* Example:

```
fizzBuzz(5);
1
2
fizz
4
buzz
```

6. Given an array and chunk size, divide the array into many subarrays where each subarray is of length size

-- Examples
* chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
* chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
* chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
* chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
* chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

7. Check to see if two provided strings are anagrams of each other
* One string is an anagram of another if it uses the same characters in the same quantity
    - Only characters, not spaces or punctuation
    - Consider capital letters to be the same as lower case
    - Examples:
        + anagrams('rail safety', fairy tales') --> true
        + anagrams('RAIL! SAFETY!', 'fairy tales') --> true
        + anagrams('Hi there', 'bye there') -- false
