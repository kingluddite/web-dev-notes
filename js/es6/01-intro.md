# ES6

Add this to your `.jshintrc` so you won't get warnings on es6 code

**.jshintrc** (placed in root of your files)

```
{
  "node": true,
  "esnext": true
}
```

New with es6
* let
* const

## A little bit about `var` keywords
* you can reassign them
* you can update them

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>let and const</title>
  <script>
  var width = 100;
  console.log(width);
  width = 200;
  console.log(width);
  </script>
</head>

<body>
</body>

</html>
```

Console Output

![console var update output](https://i.imgur.com/rdqqziI.png)

## Redefining `var` keyword
You could do this. It is bad but you won't get an error.

```js
var width = 100;
console.log(width);
var width = 200;
console.log(width);
```

### Scoping var variables
Scoping means `where are these variables available to me`

* `var` variables are **function scope**
    - function scope
        + only available inside the function they are created
        + or if not created in function but outside then they are **global scoped and available to the **window**
            * You know this when you type `width` in the console and you get back `200`

### Will this work?
Yes because width is availble inside the function that was called.

```js
function setWidth() {
    var width = 100;
    console.log(width);
  }
setWidth();
```

### But this won't work
The second console.log will error out `width is not defined` because width does not exist outside the function. (width is only **scoped** to that function)

* think of the curly brackets/braces `{}` as gates, so width is not available outside the gates of the function jail

```js
function setWidth() {
    var width = 100;
    console.log(width);
  }
  setWidth();

  console.log(width);
```

We could globally scope the variable and update it and then it would work. See below.

```js
function setWidth() {
    width = 100;
    console.log(width);
  }
  setWidth();

  console.log(width);
```

But that is not what you want to do as you don't want to pollute the global scope. If you want to share it between functions, then return it and store that inside a variable.

## Scope leak problem

```js
var age = 100;
  if (age > 12) {
    var dogYears = age * 7;
  }
```

If you type dogYears in browser you'll get 700 because var is only function scoped and the if statement won't scope it so dogYears leaks out to our window object scope - the global scope

# Benefit of using `let` and `const`

## The Block Statement
* `let` and `const` are not only scoped to the function
    - both are scope to **the block**
* Anytime you see an opening and closing curly brace, that is a **block statement**
* If you have a function with multiple nested blocks, each block `let` and `const` can be scoped to

### Testing it out

```js
var age = 100;
if (age > 12) {
 let dogYears = age * 7;
}
```
```js
var age = 100;
if (age > 12) {
  const dogYears = age * 7;
}
```

If you type `dogYears` in console you will see that you get an error informing you that `dogYears` is not defined.

![dog years not defined](https://i.imgur.com/N0bIj1d.png)


