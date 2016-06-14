# Loops
* Repeat actions a certain amount of times
    - or until a certain condition is true
    - racetrack analogy, race is over when a certain amount of laps (or loops) are completed

## Different Types of Loops
### While Loops

conditional syntax

```js
if ( condition ) {
    // do this
}
```

while loop syntax

```js
while ( condition ) {

}
```

## Challenge
Write 10 random numbers to a page using a loop

generate 10000 random numbers between 1 and 10

```js
// part 2 better while loop
function randomNumber( upper ) {
  return Math.floor( Math.random() * upper ) + 1;
}
var counter = 0;
while ( counter < 10000 ) {
  var randNum = randomNumber( 10 );
  document.write( randNum + ' ' );
  counter += 1
}
```

## JavaScript Interpreter
1. reads through code and memorizes it
    * looks for syntax errors or other errors
2. then it runs the program
3. stores counter variable
4. runs while loop and tests condition
5. continues loop until condition is false


## Exercise
1. Generate random number from 1 to 100000. The computer will have to guess this number.
2. Enter a while loop
    * inside this loop, the computer guesses a random number
        - success on guess, the loop ends
        - failure on guess, the loop continues until the correct number is guessed
3. Exit loop
    * print the random number and the number of times it took the computer to guess it

### Notes on while loop
* the condition is evaluated before the loop
    - if the condition is false at the beginning, the loop with never run
* avoid never ending loops (called an `endless loop`)
    - the condition is always true and never changes (VERY BAD)
        + what happens to a car on a racetrack if the race never ends?
            * web browsers can crash too

## Do While Loop

Structure

```js
do {
    // do this
} while ( )
```

* one difference between this and a while loop and other than that the do while and while loops are the same
    - the difference is the do while loop will always execute at least once
        + because the condition is not tested until after the code block

* practical use of a do while loop
    - when a user is logging in to use your app, you need their email. if they don't give it to you, they can't use app, so you want this to run at least once so they can fill it in, and if they don't you keep looping until they do

**jargon**: flag
* if a variable holds a `true` or `false` value programmers refer to this as a flag because it's used to determine the state of a particular condition (think of it as we are waiting until the condition is true and when it is you can wave it like a flag to let the program know it can end the loop)

# for loops

compare for loop and while loop

```js
// while loop
var counter = 0;
while ( counter < 10 ) {
  document.write( counter );
  counter += 1;
}
// for loop
for ( var counter = 0; counter < 10; counter += 1 ) {
 document.write( counter );
}
```

* for loops are more compact and that's why it's used more
* programmers usually use `i` as the counter

## Break Statements

* when JavaScript encouters a `break` it immediately exits that loop

```js
var randomNumber = getRandomNumber(10),
    guess,
    guessCount = 0,
    correctGuess = false;

function getRandomNumber( upper ) {

  var num = Math.floor( Math.random() * upper ) + 1;
  return num;

}

while ( true ) {
  guess = prompt( 'I am thinking of a number between 1 and 10. What is it?' );
  guessCount += 1;
  if ( parseInt( guess)  === randomNumber ) {
    correctGuess = true;
    break;
  }
} while ( ! correctGuess );

document.write( '<h1>You guessed the number!</h1>' );
document.write( 'It took you ' + guessCount + ' tries to guess the number ' + randomNumber );
```

* we convert a do while loop to a while loop
* we set true as the starting condition
    - this is dangerous because it sets us up for an infinite loop
    - but we `break` out of the loop which saves us from the infinite loop

## Quiz How many times will the following loop run: 
for (var j = 0; j <= 100; j += 10) {
  console.log( j );
}
solution: 11

## Dry Programming
aka Refactoring

