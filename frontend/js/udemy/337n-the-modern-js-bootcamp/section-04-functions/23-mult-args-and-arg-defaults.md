# Multiple Arguments and Argument Defaults
* We will provide multiple arguments
* We will see how to provide default arguments when arguments are not provided when the function is called

```
let add = function() {
  //
};

let result = add();
console.log(result); // undefined
```

## Multiple arguments
* I am saving one line by returning a value without storing it in a variable first
* Provide multiple arguments using a comma
* Invoke the function calling both arguments

```
let add = function(a, b, c) {
  return a + b + c;
};

let result = add(10, 20, 30); // 60
console.log(result);
```

## Default arguments
```
console.log('####default arguments####');
let getScoreText = function(name, score) {
  console.log(name);
  console.log(score);
};

getScoreText(); // will output undefined twice
```

* Here is how we provide default values to our arguments

```
console.log('####default arguments####');
let getScoreText = function(name = 'player1', score = 0) {
  console.log(name);
  console.log(score);
};

getScoreText(); // will output player1 and 0
```

* If you provide a number when you call the function that value will be used instead of the default value
* If I don't want to provide a value for the first argument and a value for the second argument I use `undefined` (use undefined as a placeholder for values that are not passed to the function - to keep the order of the arguments in sync)

```
console.log('####default arguments####');
let getScoreText = function(name = 'player1', score = 0) {
  console.log(name);
  console.log(score);
};

getScoreText(undefined, 100); // player1 and 100
```

## How to output the returned value from the function
* Assign the invoking function to a variable and log out that variable

```
console.log('####default arguments####');
let getScoreText = function(name = 'player1', score = 0) {
  console.log(name);
  console.log(score);
};

let scoreText = getScoreText(undefined, 100);
console.log(scoreText);
```

* **Remember** To also return something from the function
```
console.log('####default arguments####');
let getScoreText = function(name = 'player1', score = 0) {
  return `Name: ${name}, Score: ${score}`;
};

let scoreText = getScoreText(undefined, 100);
console.log(scoreText);
```

## Challenge
* Create a tip calculator that has 2 arguments `total` and `tipPercent`
* Have a default tipPercent of `20%` (.2)
* Invoke 3 times with 3 different totals

```
console.log('#### Tip Calculator Challenge ####');
function tipCalculator(total, tipPercent = 0.2) {
  return (total * (1 + tipPercent)).toFixed(2);
}
let tipOne = tipCalculator(100, 0.05);
let tipTwo = tipCalculator(100);
let tipThree = tipCalculator(100, 0.15);
console.log(tipOne); // 105.00
console.log(tipTwo); // 120.00
console.log(tipThree); // 115.00
```

* Here I set the function to a variable and call the variable

```
console.log('#### Tip Calculator Challenge ####');
let getTip = function tipCalculator(total, tipPercent = 0.2) {
  return (total * (1 + tipPercent)).toFixed(2);
};

let tipOne = getTip(100, 0.05);
let tipTwo = getTip(100);
let tipThree = getTip(100, 0.15);

console.log(tipOne); // 105.00
console.log(tipTwo); // 120.00
console.log(tipThree); // 115.00
```
