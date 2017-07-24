# Comparison Operators
```
console.log(1 < 2 < 3); // true
console.log(3 < 2 < 1); // true
```

## Why are both true?
* Both `<` have same precedence
* So then we go to associativity and see is "left to right"

![< associativity](https://i.imgur.com/bJa82fx.png)

* 3 < 2 ---> returns false
* false < 1 ---> returns true

## What happens when the JavaScript Engine gets a Boolean value and a number?
It will use coercion and convert the boolean to a number

To find out what JavaScript Engine will coerce to use:

`> Number("3")` --> 3

`> Number(false)` --> 0

`> Number(true)` --> 1

### Back to our code
`false < 1` becomes `0 < 1` which is **true**

## Takeaway
* From a human perspective `console.log(3 < 2 < 1)` - should be `false`
* From a JavaScript Engine engine it is `true`
    - Because of order execution of these function operators
    - And the coercion of the resulting values

## Not everything can get coerced
`> Number(undefined)` ---> **NaN**

* `NaN` means "Not A Number"
    - Not a Primitive type but you can treat it as such
    - "I have this thing that I tried to convert to a number and there is no way to convert it to a number"

## Coercion of `null`
`> Number(null)` ---> 0

### Takeaway
* It isn't always obvious what a particular type is going to coerce to
* The JavaScript Engine decides
* This behavior is what causes a lot of strange bugs and problems if you don't understand what is going on

## Equality
`==`

`> 3 == 3` ---> true

`> "3" == 3` ---> true (Here the JavaScript Engine coerced one type and then checked for equality)

### coercion can lead to strange side effects
* false when coerced becomes a number 0
* `false == 0` becomes `0 == 0` ---> true

```
var a = false;
a == 0; // true
```

* Because false when coerced becomes `0`

### null coerced
`> null == 0` ----> false

* But null coerces to `0` so why is `0 == 0` false?
* So there are special cases where `undefined` and `null` don't do what you would expect

### Import To Know
* `null` doesn't coerce to `0` for comparison
* `null` does coerce to `0` with conditional operators
* This behavior causes lots of problems and people think it is a weakness in the language

### Another problem
`"" == 0` ---> true

`"" == false` ---> true

### How do we solve this problem?
#### Strict Equality ===, Strict Inequality !==
* Strict Equality compares two things but doesn't try to coerce the values
* If the two values are not the same type it just says, "No! They are not equal and returns false"

#### Let's try it out
```
> 3 === 3; // true (same value and both numbers)
> "3" === "3"; // true (because they are the same value and both strings)
> "3" === 3; // false (two different types)
```

* using `===` in our code will prevent odd behavior caused by coercion

```js
var a = 0;
var b = false;

if (a == b) {
  console.log('They are equal');
} else {
  console.log('Not equal');
}

// will log They are equal

var a = 0;
var b = false;

if (a === b) {
  console.log('They are equal');
} else {
  console.log('Not equal');
}

// will log Not equal
```

### Tips for coding
* Try to do comparisons in your code you know will be the same **type**
* In General, 99% of the time, use `===` and `!==` when making quality comparisons
* Only use `==` if you explicitly want to coerce the values

Remember `==` and `===` are just two different functions that behave differently

```js
function ==(a, b) {}
function ===(a, b) {}
```

### Great reference
[reference link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

#### What is `Object.is`
Object.is will behave the same way as triple equals, but with special handling for NaN and -0 and +0 so that the last two are not said to be the same, while Object.is(NaN, NaN) will be true. (Comparing NaN with NaN ordinarily—i.e., using either double equals or triple equals—evaluates to false, because IEEE 754 says so
