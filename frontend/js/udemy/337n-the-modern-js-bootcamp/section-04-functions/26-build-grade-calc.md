# Build a Grade calculator
* Create a file `grace-calc.js`
* Create a function that will take in 2 arguments
    - studentScore
    - totalScore
* Goal: Generate the letter grade as well as the percentage the student got

## Example
* Student gets 15/20 questions (that is 75% and C)
* Should output "You received a C (75%)"
* Grades
    - A 90-100
    - B 80-89
    - C 70-79
    - D 60-69
    - F 0-59
* Invoke the function passing in the arguments needed

`grade-calc.js`

```
// determine the student letter grade
let letterGrade = function(numberGrade) {
  let letter;
  if (numberGrade >= 90) {
    letter = 'A';
  } else if (numberGrade >= 80) {
    letter = 'B';
    return letter;
  } else if (numberGrade >= 70) {
    letter = 'C';
  } else if (numberGrade >= 60) {
    letter = 'D';
  } else {
    letter = 'F';
  }
  return letter;
};

// determine student grade percentage
let percentGrade = function(score, total) {
  return (percent = ((score / total) * 100).toFixed(2));
};

// determine final message
let gradeMessage = function(studentScore, totalScore = 100) {
  let percent = percentGrade(studentScore, totalScore);
  let letter = letterGrade(percent);
  return `You received a ${letter} (${percent}%)`;
};

// invoke graded messages
let studentOne = gradeMessage(70, 80);
let studentTwo = gradeMessage(90);
let studentThree = gradeMessage(20, 30);
let studentFour = gradeMessage(10, 90);

// log grades to terminal
console.log(studentOne);
console.log(studentTwo);
console.log(studentThree);
console.log(studentFour);
```

