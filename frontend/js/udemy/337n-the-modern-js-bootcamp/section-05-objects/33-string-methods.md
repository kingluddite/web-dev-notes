# String Properties
* length is a property of the string object
* Useful for determining if password length is long enough

```
let name = 'John Doe';

// Length property
console.log(name.length); // 8
```


## String Methods
### toUpperCase()
* Doesn't take any arguments
* Convert all letters in string to uppercase using `toUpperCase()`
* Doesn't change the original string and it just gives us a new string that we could store in a new variable or print to screen in console.log()
* [docs for String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
    - Look at sidebar (Properties and Methods)
    - Syntax shows you `toUpperCase()` takes in no arguments
* **note** JavaScript strings are `immutable`

```
let name = 'John Doe';

// Length property
console.log(name.length); // 8

// toUpperCase() method
console.log(name.toUpperCase()); // JOHN DOE
console.log(name.toLowerCase()); // john doe

```

## `includes()`
* Looking at its documentation you can see that this method does take arguments

```
str.includes(searchString[, position])
```

* Then the docs show the parameters and what they represent

```
let isValidPassword2 = function(password) {
  if (password.length > 8 && !password.includes('password')) {
    return true;
  } else {
    return false;
  }
};
```

* But we can be more efficient
* If the if condition returns true we can just return it like this

```
let isValidPassword3 = function(password) {
  return password.length > 8 && !password.includes('password');
};
```

* The above code will return true if the condition is true or false if it is not
