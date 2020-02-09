# Functions basics
* Function
    - input (arguments), code, output (return value)
* You provide an argument (aka input but it is called **argument(s)**)

## Pass and argument and name the argument value
```
let square = function(num) {
  console.log(num);
};

square(3); // 3
square(133); // 133
```

## Return something from a function
* Use the `return` reserved keyword in JavaScript
* **note** It can only be used a single time in your function

## Here is a function that does these 3 things:
1. Has input (arguments)
2. Has code
3. Has output (returns a value)

`function-101.js`

```
let square = function(num) {
  let result = num * num;
  return result;
};

square(3);
```

### Houston we have a problem!
* When I run: 

`$ node function-101.js`

* I don't get anything in the Terminal. What did I do wrong?
    - You didn't do anything wrong
    - It's just that the `return` value **isn't being used**

### How to show a returned value
* You need to store the returned value inside a variable then log the variable 
* We are "referencing" the function by name (using a variable)

```
let square = function(num) {
  let result = num * num;
  return result;
};

let value = square(3);
let value = square(10);
console.log(value); // 9
console.log(value); // 100
```

* Now when you run:

`$ node function-101.js`

* You will see `9` (the returned value) in the Terminal

## Challenge
* Create a function `convertFahrenheitToCelsius`
* It will take in as an argument the temp in Fahrenheit
* It will run the conversion algorithm
* It will return the temperature in Celsius
* Call the function a couple of times
    - use 32 as argument and it should return 0
    - use 68 as argument and it should return 20
* Print the converted values

```
console.log('-----------------------Begin Challenge---------------------');
function convertFahrenheitToCelsius(temp) {
  // code
  let tempAsCelcius = ((temp - 32) * 5) / 9;

  // return value
  return tempAsCelcius;
}

// reference values
const temp1 = convertFahrenheitToCelsius(32);
const temp2 = convertFahrenheitToCelsius(68);

// output
console.log(temp1); // 0
console.log(temp2); // 20

console.log('-----------------------End Challenge---------------------');
```
