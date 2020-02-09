# Number Methods
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

## Also a Math object
* [Math MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
    - Math global is available in our script just like console is

```
let num = 103.9343434;

console.log(num.toFixed(2));

// round
console.log(Math.round(num));

// round up
console.log(Math.ceil(num));

// round down
console.log(Math.floor(num));

// generate a random number
let max = 100;
let randomNumber = Math.floor(Math.random() * Math.floor(max));
console.log(randomNumber); //
```

## Dive deeper into Generating a random number
* Basic - Generate a number between 0 and 1

```
console.log('***Random Number***');
console.log(Math.random());
// 0.7804710218500748
// run again and get a number like
// 0.17513402928520572
```

* The above number could go from 0 to .9999999

## But that isn't that useful
* We want to generate a number between 2 numbers like 20 and 30
* We want whole numbers only

```
console.log('***Random Number***');
let min = 20;
let max = 30;
let randomNum = Math.random() * (max - min);
console.log(randomNum);

```

* max - min (will give you 10)
* Now we are getting number from 0 to 9.999999 

## Now we'll add 1 like this:
```
console.log('***Random Number***');
let min = 20;
let max = 30;
let randomNum = Math.random() * (max - min + 1);
console.log(randomNum);
```

* Now we go from 0 to 10.999999

### Now we need to round down to a whole number
```
console.log('***Random Number***');
let min = 20;
let max = 30;
let randomNum = Math.floor(Math.random() * (max - min + 1));
console.log(randomNum);
```

* Now we are going from 0 to 10

### But we don't want it from 0 to 10, we want it from 10 to 20
* Easy, we just add the `min` value

```
console.log('***Random Number***');
let min = 20;
let max = 30;
let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomNum);
```

### Challenge Solution
```
// guess function
let makeGuess = function(num) {
  let min = 1;
  let max = 5;
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return num === randomNum;
};

console.log(makeGuess(1));
console.log(makeGuess(2));
console.log(makeGuess(3));
console.log(makeGuess(4));
console.log(makeGuess(5));
```

