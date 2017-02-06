# The for of Loop in Action

## A deeper look into what an iterable is

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>For Loop in app-location</title>
</head>
<body>
<script>
  const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

  for (const of cuts) {
    console.log(cut);
  }
</script>
</body>
</html>
```

## How do I get the index?

Type into console:

`cuts.entries();`

Will give you an `ArrayIterator {}`

If you open it it will be empty except for `__proto__` and inside that a `next()` function

So if we then `const meat = cuts.entries();`

It will give us when we type `meat` we get teh `ArrayIterator {}` back. The `for of` loop will iterate for us but if we ever want to manually iterate we can use `meat.next()` and `meat.next()` and `meat.next()`

![output of manual iteration with next()](https://i.imgur.com/YklBjRJ.png)

**more on this with Generators**

Inside you will see `done: false` until the loop is complete when it will then say `done: true`

But also inside you will see a `value` property that is an Array. The first array item is the `index` and the second array item is the value in the Array

![finding the index](https://i.imgur.com/vjPc0pG.png)

## Why is this useful?
If we do this:

```js
const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

for (const cut of cuts.entries()) {
 console.log(cut);
}
```

![array with index](https://i.imgur.com/z4Ybv5k.png)

```js
for (const cut of cuts.entries()) {
 console.log(cut[0], cut[1]);
}
```

![index and String](https://i.imgur.com/fkAtodA.png)

## Destructuring to the rescue!
```js
for (const [i, cut] of cuts.entries()) {
 console.log(`${cut} is the ${i} item`);
}
```

Output

```
Chuck is the 0 item
Brisket is the 1 item
Shank is the 2 item
Short Rib is the 3 item
```

You can offset it (go to 1,2,3,4 instead of 0,1,2,3)

```js
for (const [i, cut] of cuts.entries()) {
 console.log(`${cut} is the ${i + 1} item`);
}
```

## Review of what we just did
We used `cuts.entries()` to bring us an iterator
One of the pros of `for of` is it can handle almost anything you throw at it (it almost all cases (except Objects) you can just use `for of` and throw anything at it and the `for of` loop will figure out how to handle that data)

## Other Use Case - Trying to iterate over the `arguments` object
When you create a function you may not know how many arguments someone will pass and you want to avoid hardcoding `num1` `num2` `num3` ... as they will be problematic in remember how many arguments need to be passed. There needs to be a better way and `arguments` is that better way

It is `array-ish` type and give us all of the arguments

```js
function addUpNumber() {
  console.log(arguments); // [10, 11, 33, 33, 22, 102, 154]
}

addUpNumbers(10,11,33,33,22,102,154);
```

`arguments` gives us an array-ish of all the arguments passed 

It looks like an array but what's different about it?

![open array-ish](https://i.imgur.com/nOcK77J.png)

If you open it up, you'll see the prototype is an Object, not an Array

Let's compare with an actual array

```js
function addUpNumbers() {
  console.log([1,2,3]);
  console.log(arguments);
}
```

And this has a prototype of and Array

![Array](https://i.imgur.com/BnsURQD.png)

And if you open that up you'll see the tons of methods that comes with Array

![tons of array methods](https://i.imgur.com/FvaYcKJ.png)

## What is `arguments`?
A list with only one thing on it, `length`

But you can iterate over it because it has a `Symbol(Symbol.iterator)`

![Symbol.iterator](https://i.imgur.com/XM6YACA.png)

Normally, we would convert `arguments` to an array and use a `reduce()` on it and add them all up

But in this case, we'll loop over `arguments` without first converting it to an Array

```js
function addUpNumbers() {
  let total = 0;
  for (const num of arguments) {
    total += num;
  }
  console.log(total);
  return total;
}

addUpNumbers(10,11,33,33,22,102,154); // 365
```

Note: if you use `for in` instead of `for of` you will get `00123456` because `for in` gives us the `index`. `for of` will give us the actual arguments

Now you can just add up any numbers

`addUpNumbers(10,10,10); // 30`
`addUpNumbers(100,200); // 300`

## `for of` iterate over a string
```js
const name = 'John Doe';
for (const char of name) {
  console.log(char);
}
```

![outputs all the characters of 'John Doe'](https://i.imgur.com/KfUsEBb.png)

**Important** don't forget to add `const` in the `for of` loop otherwise you will be overriding the variable value every single time (it will be globally scoped) but if you use `let` or `const` it will be block scoped and not available to the global window

## Looping over DOM collections
Without having to convert to a true Array

**note** DOM collections, NodeLists, or HTML Collections... whatever you want to call them are being changed and you will soon have all the `.map()`, `.forEach()` and all of the array methods that you are used to but currently (as of 2/5/2017) they are not a true Array

### Emmet tip
`p{Hi I'm p $$}*10` and hit tab inside Atom or Sublime Text and it will do this:

```html
<p>Hi I'm p 01</p>
<p>Hi I'm p 02</p>
<p>Hi I'm p 03</p>
<p>Hi I'm p 04</p>
<p>Hi I'm p 05</p>
<p>Hi I'm p 06</p>
<p>Hi I'm p 07</p>
<p>Hi I'm p 08</p>
<p>Hi I'm p 09</p>
<p>Hi I'm p 10</p>
```

Now I want to select all of them

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>For Loop in action</title>
</head>
<body>
  <p>Hi I'm p 01</p>
  <p>Hi I'm p 02</p>
  <p>Hi I'm p 03</p>
  <p>Hi I'm p 04</p>
  <p>Hi I'm p 05</p>
  <p>Hi I'm p 06</p>
  <p>Hi I'm p 07</p>
  <p>Hi I'm p 08</p>
  <p>Hi I'm p 09</p>
  <p>Hi I'm p 10</p>
<script>
const ps = document.querySelectorAll('p');
console.log(ps);
</script>
</body>
</html>
```

Open up the console and you'll see what looks like an Array but when you expand it you'll see it is a `NodeList` with these props:

![NodeList props](https://i.imgur.com/02r3eQ1.png)

## Using `for of`
```js
const ps = document.querySelectorAll('p');
for (const paragraph of ps) {
  console.log(paragraph);
}
```

Gives us:
![paragraphs](https://i.imgur.com/9bEsaDh.png)

Click on paragraph to get the text content returned for that paragraph only

```js
const ps = document.querySelectorAll('p');
for (const paragraph of ps) {
  paragraph.addEventListener('click', function () {
    console.log(this.textContent);
  });
}
```





