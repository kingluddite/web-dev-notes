# Default Arguments

## Starting

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Default Arguments</title>
</head>

<body>
  <script>
    function calculateBill(total, tax, tip) {
      return total + (total * tax) + (total * tip);
    }

    const totalBill = calculateBill(100, 0.13, 0.15);
    console.log( totalBill ); // 128
  </script>
</body>

</html>
```

What if we want to 'assume' the #2 and #3 arguments? How do you do that?

If you take off the last 2 arguments and run it

```js
const totalBill = calculateBill(100);
console.log( totalBill ); // NaN
```

We'll get a `NaN` error (Not a Number)

* We are trying to do math on things that aren't passed in

Why is this happening?

If we `console.log()` the arguments that were not passed in we'll get undefined

```js
function calculateBill(total, tax, tip) {
  console.log(tax);
  console.log(tip);
  return total + (total * tax) + (total * tip);
}

const totalBill = calculateBill(100);

console.log(totalBill);
```

Will return

```
undefined
undefined
NaN
```

## How we used to deal with this

```js
function calculateBill(total, tax, tip) {
      if (tax === undefined) {
        tax = 0.13;
      }
      if (tip === undefined) {
        tip = 0.15;
      }
      return total + (total * tax) + (total * tip);
    }

    const totalBill = calculateBill(100);

    console.log(totalBill); // 128
```

And now it works fine but it is a lot of extra code to type

Or you can make it work with more concise code like this:

```js
function calculateBill(total, tax, tip) {
  tax = tax || 0.13;
  tip = tip || 0.15;
  return total + (total * tax) + (total * tip);
}

const totalBill = calculateBill(100);

console.log(totalBill); // 128
```

And that works too but it is a bit harder to read and you make it more unreadable if a lot more arguments are passed into the function

## The new way to do this in ES6
```js
function calculateBill(total, tax = 0.13, tip = 0.15) {
      
  return total + (total * tax) + (total * tip);
}

const totalBill = calculateBill(100);

console.log(totalBill); // 128
```

And that works!

## Missing middle argument

`const totalBill = calculateBill(100, , 0.25);`

This will give you `Unexpected token ,` error

But you can pass `undefined` as an argument and it will work by not using the middle value

```js
function calculateBill(total, tax = 0.13, tip = 0.15) {
  return total + (total * tax) + (total * tip);
}

const totalBill = calculateBill(100, undefined, 0.25);

console.log(totalBill); // 138
```

One bad thing is this function's arguments are order dependent but when we learn about destructuring later on, there is a way to tackle that problem



