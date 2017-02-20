# The ...rest param

When you see `...` they are not always spreads they could also be a Rest param

It looks to be the exact same thing but it is actually the exact opposite

If spread `...` takes multiple things from an array or string and unpacks it into multiple items of an array

## What does the ...Rest param
It takes multiple things and packs it into a single array

### Two places you use a ...Rest param
1. function
2. destructuring

```js
function convertCurrency(rate, amount1, amount2, amount3, amount4) {
  
}
```

We could not pass anything and just use `arguments` but in this example we want the first thing to be the `rate` and the rest to be the amounts

```js
function convertCurrency(rate, ) {
  
}
convertCurrency(1.54, 10, 33, 50, 1, 60);
```

So we remove the amounts as arguments and call the function and pass the rate first and the amounts after it.

```js
function convertCurrency(rate, ...amounts) {
  console.log(amounts);
}
convertCurrency(1.54, 10, 33, 50, 1, 60);
```

That will return:

![rest param](https://i.imgur.com/wO30Kzv.png)

So it passes into our funtion all the rest of the amounts

But check this out

```js
function convertCurrency(rate, ...amounts) {
  console.log(rate, amounts);
}
convertCurrency(1.54, 10, 33, 50, 1, 60);
```

Our output now looks like: `1.54 → [10, 33, 50, 1, 60]`

We see the rate and then everything else passed to the function

This will give you the rate and one item `convertCurrency(1.54, 10);`

### Finishing up our function
```js
function convertCurrency(rate, ...amounts) {
  return amounts.map(amount => amount * rate);
}
const amounts = convertCurrency(1.54, 10, 200, 45, 111, 22);
console.log(amounts); // [15.4, 308, 69.3, 170.94, 33.88]
```

### Slight modification

```js
function convertCurrency(rate, tax, tip, ...amounts) {
  console.log(rate, tax, tip, amounts);
  return amounts.map(amount => amount * rate);
}
const amounts = convertCurrency(1.54, 10, 200, 45, 111, 22);
console.log(amounts);
```

Output: ![modifified output](https://i.imgur.com/guhZT5n.png)

## Use Case
Destructuring

We get data back from a jogging app.

`const runner = ['John Doe', 123, 5.4, 4, 3, 45, 22];`

In the array `Person name`, 'id', all the rest are the log of all their jogging distances in miles

```js
const runner = ['John Doe', 123, 5.4, 4, 3, 45, 22];
const [name, id, ...runs] = runner;
console.log(name, id, runs); // John Doe 123 5.4
```

We just get the first value after `name` and `id` but we want the rest of them

```js
const runner = ['John Doe', 123, 5.4, 4, 3, 45, 22];
const [name, id, ...runs] = runner;
console.log(name, id, runs); // John Doe 123 → [5.4, 4, 3, 45, 22]
```

## Review
A captain, assistant and the rest of the players

```js
const team = ['John', 'Jane', 'Shane', 'Johnny', 'Danny'];
const [captain, assistant, ...players] = team;
console.log(captain, assistant, players); // John Jane → ["Shane", "Johnny", "Danny"]
```


