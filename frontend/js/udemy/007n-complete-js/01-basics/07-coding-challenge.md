# Coding Challenge #1
* The heighest value of height + (5 x age) wins

1. Create variables for the heights and ages of two people
    * Assign them values
2. Calculate their scores
3. Decide who wins and print the winner to the console
    * Include the score in the string that you output to the console
    * There can be a draw
4. Add a third player and decide who wins
    * You will need to use `&&` operator

```js
// two players
// const mikeAge = 21;
// const mikeHeight = 6;
// const maryAge = 21;
// const maryHeight = 6;

// const mikeScore = mikeHeight + 5 * mikeAge;
// const maryScore = maryHeight + 5 * maryAge;

// if (mikeScore > maryScore) {
//   console.log(`Mike wins with ${mikeScore} points`);
// } else if (mikeScore < maryScore) {
//   console.log(`Mary wins with ${maryScore} points`);
// } else {
//   console.log('It is a draw');
// }

// add a third player
const bobAge = 1;
const bobHeight = 6;

const mikeScore = mikeHeight + 5 * mikeAge;
const maryScore = maryHeight + 5 * maryAge;
const bobScore = bobHeight + 5 * bobAge;

if (mikeScore > maryScore && mikeScore > bobScore) {
  console.log(`Mike wins with ${mikeScore} points`);
} else if (maryScore > mikeScore && maryScore > bobScore) {
  console.log(`Mary wins with ${maryScore} points`);
} else if (bobScore > mikeScore && bobScore > maryScore) {
  console.log(`Bob wins with ${bobScore} points`);
} else {
  console.log('It\'s a draw');
}
```

* You can type `mikeAge` in console or `mikeScore` and you'll see the value
* Up arrow shows history of console commands to save you from typing
