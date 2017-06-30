# Functional Programming
* JavaScript has less to do with languages like:
    - Java
    - C++
* More to do with languages like:
    - These are languages with first class functions
        + [Lisp](http://www.gigamonkeys.com/book/introduction-why-lisp.html)
        + [Schema](https://en.wikipedia.org/wiki/Scheme_(programming_language))
        + [ML](https://en.wikipedia.org/wiki/Standard_ML)
    - Functions that behave as object
    - Functions you can pass as parameters
    - You can return functions from functions
* Having first class functions inside JavaScript means we can use **functional programming**
    - Where we think and code in terms of functions
    - This introduces an entirely different way of thinking when programming
    - It introduces an approach that is impossible to replicate in other programming languages

## Example of Functional Programming
* Task
    - Loop through an array of other arrays

```js
const arr1 = [1,2,3];
console.log(arr1);

const arr2 = [];
for (var i = 0; i < arr1.length; i++) {

  arr2.push(arr1[i] * 2);

}

console.log(arr2);
```

* That will output two arrays
    1. [1,2,3]
    2. [2,4,6]
* We had to write a lot of code to accomplish that
    - We repeat ourselves a lot
    - Can we improve on our efficiency
    - Do more with less?
    - Saves us time

```js
function mapForEach(arr, fn) {

  const newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(
      fn(arr[i])
    );
  };

  return newArr;
}
```

* We call a function and pass in our array item
* I have just abstracted the concept of looping over an array

```js
function mapForEach(arr, fn) {

  const newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(
      fn(arr[i])
    );
  };

  return newArr;
}

const arr1 = [1,2,3];
console.log(arr1);

const arr2 = mapForEach(arr1, function(item) {
  return item * 2;
});

console.log(arr2);
```

* Same output but a far more powerful pattern
* What did we do?
    - We extracted the loop and the array creation into its own function
    - Then I gave it the work to do against each item in the array

### Expand and create a function where items in the original array are > 2
```js
const arr3 = mapForEach(arr1, function(item) {
  return item > 2;
});

console.log(arr3);
```

* We were able to reuse this map function to do entirely different work
* This is a classic example of **functional programming**
    - Where I'm using first class functions to my advantage
    - To segment my code in cleaner and tighter ways
    - Enables me to write clean, beautiful looking code that is straight forward to understand

## Same as a above but using a functional reference to make it reusable
```js
var checkPastLimit = function(limiter, item) {
  return item > limiter;
};
```

* Problem
    - This function accepts 2 parameters
    - And the map for each wants a function that accepts just 1 parameter
        + `fn(arr[i])`
        + How can I take a function and call it or use it in a way that I preset the first parameter so that the `fn(arr[i])` function call will pass the item and we preset `limiter`?
        + We can do that with `bind()`

```js
var checkPastLimit = function(limiter, item) {
  return item > limiter;
};

var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr4);
```

* Will give you [false, true, true]
    - 1 > 1 false
    - 2 > 1 true
    - 3 > 1 true
* When we call `checkPastLimit.bind(this, 1)`, we pass this as the first arg which we don't use, and the second parameter is `1` which will set the default value of limiter to `1`
    - That way we don't have to pass 2 parameters and only 1 (the function we are passing only accepts 1) but because we can set a default parameter value we can get around the function only accepting 1 parameter

## It is a pain do call `bind()` all the time
* Is there an alternative way to set default values

```js
var checkPastLimitSimplified = function(limiter) {
  return function(limiter, item) {
    return item > limiter;
  }.bind(this, limiter);
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(2));
console.log(arr5);
```

* We accept one argument for checkPastLimitSimplified `limiter`
* Then we just return a function object and we bind `limiter` to that function so that when we call `checkPastLimitSimplified` we only have to pass it 1 argument `2`
* I create the object with a function expression
    - I then copy that object that was created with .bind() and then we set this limiter value

![limiter value](https://i.imgur.com/g1zKu0l.png)

* With whatever I set this limiter value to when I called checkPastLimitSimplified

![limit value 2](https://i.imgur.com/UtDxmIP.png)

* All I'm doing is creating an object

![creating an object](https://i.imgur.com/Chjt49E.png)

* And I'm using .bind() to create an object that has its first parameter preset

Output will be `[false, false, true]`

### Review
We called this function

![call function](https://i.imgur.com/QlJdwht.png)

* Which returned a function object with its first parameter preset to `2`
* And that returned function object

![returned function object](https://i.imgur.com/vyIqqXA.png)

* Is what gets passed to the mapForEach()

![mapForEach](https://i.imgur.com/Q013PYz.png)

* And then it gets called

![mapForEach called](https://i.imgur.com/zwqQhyR.png)

* And I get my array back
* In one very clean, very simple line of code that I can reuse
* This example should show you the power and expressiveness of functional programming
    - Instead of thinking of code as separating it into different functions
    - You should start thinking "how can I give my functions functions" or return functions from my functions in order to even greater simplify the code I am writing over and over again
    - All these functions flying around may first break your brain
    - But once you get used to it it is a very natural feeling to split things into functions, to pass them around to each other
    - Because you are just spreading the work into finer, more minute details than you might in other programming languages

## One important note about functional programming
* Your functions should do their best to NOT **mutate** data (mutate == change)
    - If you do change data you will find yourself in odd situations
    - Mutate data as high up in that chain as possible or not change it at all and just return something new
        + Like we just did
            * Not change the original array
            * Just create a new array with new values
* Functional Programming is a huge topic
    - This is just an introduction to it
    - first class objects in JavaScript is what takes JavaScript to the next level and will take you as a programmer to the next level
    - Instead of using JavaScript like other programming languages (PHP, C#, Java) you can use the full power of JavaScript that is not available in those other languages
