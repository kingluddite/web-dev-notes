# Constant Variables
```
let isRaining = true;

isRaining = false;

console.log(isRaining); // false;
```

* Above works as we expect

## const vs let
* The only difference between `let` based variables and `const` based variable is you can't reassign a `const` after it has been created

```
const isRaining = true;

isRaining = false;

console.log(isRaining); // false;
```

* We get a TypeError: Assignment to constant variable

* **note** This const reassign only applies when we are trying to reassign a variables value

## Let's use const with an object
```
const person = {
  name: 'Joe',
  age: 22,
};

person.age = 34; // we can do this because we are changing an object's property
person = {}; // but we can't reassign because we used `const`
```

* **note** scoping is same between const and let
    - how to name a variable is same for const and let

## Why use `const` at all?
* Because of "code readability"
* If we use `const` we are saying this variable doesn't change
* If we use `let` we are saying this variable will change

```
// convert this to let or const
let gradeCalc = function(score, totalScore) {
  let percent = (score / totalScore) * 100;
  let letterGrade = '';

  if (percent >= 90) {
    letterGrade = 'A';
  } else if (percent >= 80) {
    letterGrade = 'B';
  } else if (percent >= 70) {
    letterGrade = 'C';
  } else if (percent >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }

  return `You got a ${letterGrade} (${percent}%)!`;
};

let result = gradeCalc(9, 20);
console.log(result);

```

* Now this is the above properly using `let` and `const`

```
// convert this to let or const
const gradeCalc = function(score, totalScore) {
  const percent = (score / totalScore) * 100;
  let letterGrade = '';

  if (percent >= 90) {
    letterGrade = 'A';
  } else if (percent >= 80) {
    letterGrade = 'B';
  } else if (percent >= 70) {
    letterGrade = 'C';
  } else if (percent >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }

  return `You got a ${letterGrade} (${percent}%)!`;
};

const result = gradeCalc(9, 20);
console.log(result);
```
