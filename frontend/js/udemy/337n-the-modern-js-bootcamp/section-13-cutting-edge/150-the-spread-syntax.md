# The Spread Operator
```
const printTeam = (teamName, coach, ...players) => {
  console.log(`Team Name: ${teamName}`)
  console.log(`Coach Name: ${coach}`)
  console.log(`Player Names: ${players}`)
}

const team = {
  name: 'Man U',
  coach: 'John Doe',
  players: ['Manny', 'Moe', 'Jack']
}

printTeam('Man U', 'John Doe', 'Manny', 'Moe', 'Jack');
```

## Problem
* What happens if the format we get our data in doesn't line up with the format the printTeam function expects?
* How can we make our data and our function work together without changing either of them
    - This is important because you might not be able to change the function especially if it is from a third party library

### Bad solution
* Bad solution because if we have 100 items this would take to long
* I would have to change the function call if the array changes
* Not a good solution
* A better approach is to use the spread operator

```
const printTeam = (teamName, coach, ...players) => {
  console.log(`Team Name: ${teamName}`);
  console.log(`Coach Name: ${coach}`);
  console.log(`Player Names: ${players.join(', ')}`);
};

const team = {
  name: 'Man U',
  coach: 'John Doe',
  players: ['Manny', 'Moe', 'Jack'],
};

// printTeam('Man U', 'John Doe', 'Manny', 'Moe', 'Jack');
printTeam(
  team.name,
  team.coach,
  team.players[0],
  team.players[1],
  team.players[2]
);
```

## What is the spread operator?
* It allows us to spread out an array into individual arguments

```
const printTeam = (teamName, coach, ...players) => {
  console.log(`Team Name: ${teamName}`);
  console.log(`Coach Name: ${coach}`);
  console.log(`Player Names: ${players.join(', ')}`);
};

const team = {
  name: 'Man U',
  coach: 'John Doe',
  players: ['Manny', 'Moe', 'Jack'],
};

// printTeam('Man U', 'John Doe', 'Manny', 'Moe', 'Jack');
printTeam(team.name, team.coach, ...team.players); // modify this line
```

## We can further show that this is working by:
* We'll remove the `rest` operator argument `...players` and just pass it 2 players in 2 arguments `firstPlayer` and `secondPlayer` respectively

```
// const printTeam = (teamName, coach, ...players) => {
const printTeam = (teamName, coach, playerOne, playerTwo) => {
  console.log(`Team Name: ${teamName}`);
  console.log(`Coach Name: ${coach}`);
  // console.log(`Player Names: ${players.join(', ')}`);
  console.log(playerOne, playerTwo); // Manny, Moe
};

const team = {
  name: 'Man U',
  coach: 'John Doe',
  players: ['Manny', 'Moe', 'Jack'],
};

// printTeam('Man U', 'John Doe', 'Manny', 'Moe', 'Jack');
printTeam(team.name, team.coach, ...team.players);
```

## Cool thing about a spread operator
* It is not just limited to us calling a function when we want to have individual arguments instead of an array
* We can use it when we are working with arrays in a wide range of contexts

### We'll create an array of cities
```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
```

#### Clone an array
* How do we clone an array in JavaScript?

We don't want to do this:

```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
const citiesCopy = [cities];
console.log(citiesCopy); // [ [ 'Philly', 'LA', 'Clemson', 'Arlington' ] ]
```

* Because that just gives us an array inside an array and that's not what we want

## With the spread operator cloning an array is easy

```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
const citiesCopy = [...cities];
console.log(cities);
console.log(citiesCopy);
```

* We can see it is a copy because we see the array of cities in both the original array and the cloned array
* But the very cool things is they are both separate arrays so I can change one without changing the other

## Let's add a city into our cloned array
```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
const citiesCopy = [...cities];
citiesCopy.push('Hermosa Beach');
console.log(cities); // [ 'Philly', 'LA', 'Clemson', 'Arlington' ]
console.log(citiesCopy); // [ 'Philly', 'LA', 'Clemson', 'Arlington', 'Hermosa Beach' ]
```

## What if I want to add cities in a more efficient way
### Add to front of array
* This adds Dublin at the front of our array of cities

```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
const citiesCopy = ['Dublin', ...cities];
console.log(cities);
console.log(citiesCopy);
// [ 'Dublin', 'Philly', 'LA', 'Clemson', 'Arlington', 'Hermosa Beach' ]
```

### Add to end of array
```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
const citiesCopy = [...cities, 'Dublin'];
console.log(cities);
console.log(citiesCopy);
// [ 'Philly', 'LA', 'Clemson', 'Arlington', 'Dublin' ]
```

### Add multiple cities to the array
```
// array of cities
const cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
const citiesCopy = ['Woodland Hills', ...cities, 'Dublin', 'Killasser'];
console.log(cities);
console.log(citiesCopy);
//[
//  'Woodland Hills',
//  'Philly',
//  'LA',
//  'Clemson',
//  'Arlington',
//  'Dublin',
//  'Killasser'
//]
```

## You can also use the spread operator to add additional items to the end of an array
* Has same effect of adding new items to end of array using push
* You could also add to beginning of array by placing the new city before the spread operator

```
// array of cities
let cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
cities = [...cities, 'Dublin', 'Killasser'];
console.log(cities);
// [ 'Philly', 'LA', 'Clemson', 'Arlington', 'Dublin', 'Killasser' ]
```

## Challenge
* Use the spread operator to swap an array push with the spread operator to add a new guess onto the guessedLetters array

`hangman.js`

```
// MORE CODE

  makeGuess(guess) {
    // MORE CODE

    if (isUnique) {
      this.guessedLetters.push(guess);
    }

    // MORE CODE
  }

// MORE CODE
```

## Using the spread operator
```
// MORE CODE

    if (isUnique) {
      // this.guessedLetters.push(guess);
      this.guessedLetters = [...this.guessedLetters, guess];
    }

// MORE CODE
```


