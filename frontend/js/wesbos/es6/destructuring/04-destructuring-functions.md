# Destructuring Functions

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Destructuring Functions</title>
</head>
<body>
<script>
  function convertCurrency(amount) {
    const converted = {
      USD: amount * 0.76;
      GPB: amount * 0.53;
      AUD: amount * 1.01;
      MEX: amount * 13.30;
    };
    return converted;
  }

  const hundo = convertCurrency(100);
  console.log(hundo);
</script>
</body>
</html>
```

![Output](https://i.imgur.com/0Blmgcs.png)

Pass the convertCurrency(amount) function an amount of $100 and it will return an Object with 4 different currency values

If I wanted to get Mexican pesos or Australian Dollars:
```js
console.log(hundo.MEX); // 1330
console.log(hundo.AUD); // 101
```

With Destructuring you can `sort of` return multiple values from a function
* You can't really but you can return an Object and destructure the answer

```js
const hundo = convertCurrency(100);
const { USD, GPB, AUD, MEX } = convertCurrency(100);
```

So now destructure as soon as the object comes back and now you have access to `USD`, `GPB`, `AUD`, `MEX` as variables

`console.log( USD, GPB, AUD, MEX ); // 76 53 101 1330`

**note** You don't need to worry about the order because it is an Object and you can put it in any order you want

## The Order of function arguments with Destructuring

```js
function tipCalc(total, tip = 0.15, tax = 0.13) {
    
}
```

What if you get the order wrong of the function arguments? Errors!

There are things we can do to make our function arguments **order independent**

First step, let's supply what the function will do:

```js
function tipCalc(total, tip = 0.15, tax = 0.13) {
    return total + (tip * total) + (tax * total);
}
```

Wrap arguments with curly braces:

`function tipCalc({ total, tip = 0.15, tax = 0.13 }) {`

When we pass in an object it will destructure them into 3 variables (`total`, `tip` and `tax`)

### How do we call it?
```js
function tipCalc({ total, tip = 0.15, tax = 0.13 }) {
    return total + (tip * total) + (tax * total);
}
const bill = tipCalc({ total: 200, tip: 0.20, tax: 0.13 });
console.log(bill); // 266
```

## Benefits of doing this
You don't have to pass all 3 arguments

```js
const bill = tipCalc({ total: 200, tip: 0.20});
console.log(bill); // 266
```

Why? The default tax `0.13` will kick in

You can pass the arguments in any order

```js
const bill = tipCalc({ tip: 0.20, total: 200  });
console.log(bill); // 266
```

## Review
We are passing in an Object and it is getting destructured and if we leave one out from when we call the function, the default argument values will be substituted

### What if we didn't pass any arguments when we call our function?
I added a default for total `total = 100`

```js
function tipCalc({ total = 100, tip = 0.15, tax = 0.13 }) {
  return total + (tip * total) + (tax * total);
}
const bill = tipCalc();
console.log(bill);
```

We will get a `TypeError: Cannot match against 'undefined' or 'null'`

You could pass an empty Object like this:

`const bill = tipCalc({})`

But the best way would be to give the function argument object a default argument like this:

```js
function tipCalc({ total = 100, tip = 0.15, tax = 0.13 } ={}) {
    return total + (tip * total) + (tax * total);
}
const bill = tipCalc();
console.log(bill); // 128
```

So if no Object is passed then it will default to a blank Object and then all of the 3 defaults will be used
