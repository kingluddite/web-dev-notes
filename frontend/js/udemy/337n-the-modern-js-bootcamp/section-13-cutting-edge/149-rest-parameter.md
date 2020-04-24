# The Rest parameter
* [rest docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
* The rest parameter gives us a bit of choice when designing our functions

## Create a simple function that will get the average of 2 numbers
`src/index.js`

```
// MORE CODE

const calculateAverage = (numOne, numTwo) => {
  return (numOne + numTwo) / 2
}

console.log(calculateAverage(93, 86)) // 89

// MORE CODE
```

## Problem - Function is not flexible
* What if I want to add more numbers to average?

```
// MORE CODE

const calculateAverage = (numOne, numTwo) => {
  return (numOne + numTwo) / 2
}

console.log(calculateAverage(93, 86, 76, 30))

// MORE CODE
```

* I would need to adjust my function
* It would be better if we had a list of numbers that we could loop over and then generate their average by dividing the sum by the array's length

### Two solutions
* One would be to pass in an array into the function's argument
* Loop over it and sum and then get the average

#### Use a simple for loop
```
// MORE CODE

const calculateAverage = listOfNumbers => {
  const arrLen = listOfNumbers.length
  let sum = 0
  for (let i = 0; i < arrLen; i++) {
    sum += listOfNumbers[i]
  }
  return sum / arrLen
}
console.log(calculateAverage([40, 80, 96, 100])) // 79

// MORE CODE
```

## Use reduce array method
```
// MORE CODE

const calculateAverage = listOfNumbers => {
  const sum = listOfNumbers.reduce((a, b) => a + b, 0)
  return sum / listOfNumbers.length
}

console.log(calculateAverage([40, 80, 96, 100, 100]))

// MORE CODE
```

### Use the "rest" parameter
* We don't have to call the method with an array and we can just call it with as many numbers as we want
* The Rest parameter can grab all of the methods passed into the function
* We won't name the args `numOne` and `numTwo`
    - Instead we'll do this: `...numbers`

### ...numbers (example using the rest parameter)
```
// MORE CODE

const calculateAverage = (...numbers) => {
  // 
}

// MORE CODE
```

* Now inside of calculateAverage we have access to an array (numbers)
* And that array is populate with all the numbers passed into the function call

### We don't pass in an array like this:
```
console.log(calculateAverage([40, 80, 96, 100, 100]))
```

* Instead we just pass in numbers like this

```
console.log(calculateAverage(40, 80, 96, 100, 100))
```

* And now we can get the average

```
const calculateAverage = (...numbers) => {
  let sum = 0
  numbers.forEach(number => (sum += number))
  return sum / numbers.length
}

console.log(calculateAverage(40, 80, 96, 100, 100)) // 83.2
```

And if we add a few more numbers we don't have to alter our function

```
// MORE CODE

console.log(calculateAverage(40, 80, 96, 100, 100, 30, 50, 200, 80)) // 86.2222

// MORE CODE
```

## Another aspect of rest parameter
* What if we wanted our calculateAverage to return a string message as opposed to a number
* like this:

```
// MORE CODE

const calculateAverage = (...numbers) => {
  let sum = 0
  numbers.forEach(number => (sum += number))
  const average = sum / numbers.length
  // The average grade is 86.22222222222223
  return `The average grade is ${average}`
}

console.log(calculateAverage(40, 80, 96, 100, 100, 30, 50, 200, 80))

// MORE CODE
```

* But we want `grade` to be dynamic as well as the user can determine what they are averaging by also passing that as an argument

## Houston we have a problem
* This will break our code because now we have a string as the first item in our array of numbers and our loop math will break

`console.log(calculateAverage('grade', 40, 80, 96, 100, 100, 30, 50, 200, 80))`

### subset of rest parameters
* We can choose just to grab a subset of rest parameters
* If I want the first argument as it's own thing I need to name it

```
// MORE CODE

const calculateAverage = (type, ...numbers) => {
  let sum = 0
  numbers.forEach(number => (sum += number))
  const average = sum / numbers.length
  // The average grade is 86.22222222222223
  return `The average ${type} is ${average}`
}

// MORE CODE
```

### We can add as many arguments as we want
* We just need to name them
* If we did this:

```
// MORE CODE

const calculateAverage = (type, firstNum, ...numbers) => {
  let sum = 0
  numbers.forEach(number => (sum += number))
  const average = sum / numbers.length
  // The average grade is 86.22222222222223. The first number is 40.
  return `The average ${type} is ${average}. The first number is ${firstNum}.`
}

console.log(calculateAverage('grade', 40, 80, 96, 100, 100, 30, 50, 200, 80))

// MORE CODE
```

## Challenge
* Create printTeam function that takes team name, coach and players
    - Team: Liberty
    - Coach: John Doe
    - Players: Manny, Moe, Jack
