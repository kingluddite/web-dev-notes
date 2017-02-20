# ES6

## New with ES6
* let
* const

## Review about `var` keywords
* You can reassign them

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>var let const</title>
</head>

<body>
  <script>
    var width = 100;
    console.log(width);
    width = 200;
    console.log(width);
  </script>
</body>

</html>
```

## Output
100
200

## Redefining `var` keyword

Problem you can create the same variable name twice and it won't yell at you.

```js
var width = 100;
console.log(width);
var width = 200;
console.log(width);
```

The value has been reassigned. So we are able to update variables using the `var` keyword.

### Scoping var variables
Scoping means `where are these variables available to me`

* `var` variables are **function scope**
    - function scope
        + Only available inside the function they are created
        + Or if not created in function but outside 
            * Then they are **global scoped and available to the **window**
            * You know this when you type `width` in the console and you get back `200`

### Will this work?
Yes because width is available inside the function that was called.

```js
function setWidth() {
    var width = 100;
    console.log(width);
  }
setWidth();
```

## But will this work?

```js
function setWidth() {
    var width = 100;
    console.log(width);
  }
  setWidth();

  console.log(width);
```

### No. It won't work
The second `console.log()` will error out `width is not defined` because width does not exist outside the function. (_width is only **scoped** to that function_)

* Think of the curly brackets/braces `{}` as gates, so width is not available outside the gates of the function jail

We could globally scope the variable and update it and then it would work.

```js
var width;
function setWidth() {
  width = 100;
  console.log(width);
}
setWidth();
console.log(width);
```

And that will work. We globally scoped a variable and we are updating it.

## This will also work

```js
function setWidth() {
    width = 100;
    console.log(width);
  }
  setWidth();

  console.log(width);
```

But that is not what you want to do as you don't want to `pollute the global scope`. If you want to share it between functions, then return it and store that inside a variable.

## Scope leak problem
This is where function scoping comes back and bites us

```js
var age = 100;
if (age > 12) {
  var dogYears = age * 7;
  console.log(`You are ${dogYears} dog years old!`);
}
```

If you type dogYears in browser you'll get `700` because `var` is only "function scoped" and the `if` statement won't scope it so `dogYears` leaks out to our **window** Object scope - the global scope!

# Benefit of using `let` and `const`

## The Block Statement
* `let` and `const` are not only scoped to the function they are also scoped to **the block**
* Anytime you see an opening and closing curly brace, that is a **block statement**
* functions are also block statements
* If you have a function with multiple nested blocks, each block `let` and `const` can be scoped to that nested set of curly brackets

### Testing it out by changing it from `var` to `let`

```js
var age = 100;
if (age > 12) {
  let dogYears = age * 7;
  console.log(`You are ${dogYears} dog years old!`);
}
```

If you type `dogYears` in console you will see that you get an error informing you that `dogYears` is not defined.

![dog years not defined](https://i.imgur.com/L0DtHEI.png)

### `const` is also block scoped

```js
var age = 100;
if (age > 12) {
  const dogYears = age * 7;
  console.log(`You are ${dogYears} dog years old!`);
}
```

One of the benefits of `let` and `const` is they are both block scoped
