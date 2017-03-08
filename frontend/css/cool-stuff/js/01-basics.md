# JavaScript basics
In computer science, data is anything that is meaningful to the computer. JavaScript provides seven different data types which are undefined, null, boolean, string, symbol, number, and object.

Variables allow computers to store and manipulate data in a dynamic fashion. They do this by using a "label" to point to the data rather than using the data itself. Any of the seven data types may be stored in a variable.

Variables are similar to the x and y variables you use in mathematics, which means they're a simple name to represent the data we want to refer to. Computer variables differ from mathematical variables in that they can store different values at different times.

We tell JavaScript to create or declare a variable by putting the keyword var in front of it, like so:

var ourName;

creates a variable called ourName. In JavaScript we end statements with semicolons.

Variable names can be made up of numbers, letters, and $ or _, but may not contain spaces or start with a number.

## Assignment operator
In JavaScript, you can store a value in a variable with the assignment operator.

myVariable = 5;

Assigns the Number value 5 to myVariable.

Assignment always goes from right to left. Everything to the right of the = operator is resolved before the value is assigned to the variable to the left of the operator.

myVar = 5;
myNum = myVar;
Assigns 5 to myVar and then resolves myVar to 5 again and assigns it to myNum.

## Initializing Variables with the Assignment Operator
It is common to initialize a variable to an initial value in the same line as it is declared.

var myVar = 0;

Creates a new variable called myVar and assigns it an initial value of 0.

## Understanding Uninitialized Variables
When JavaScript variables are declared, they have an initial value of undefined. If you do a mathematical operation on an undefined variable your result will be NaN which means "Not a Number". If you concatenate a string with an undefined variable, you will get a literal string of "undefined".

**note** In JavaScript all variables and function names are case sensitive. This means that capitalization matters.

**best practice** Write variable names in Javascript in camelCase
## if else Statement
Determine golf score
```js
  function golfScore(par, strokes) {
          // Only change code below this line
          if (strokes === 1) {
            return "Hole-in-one!";
          } else if (strokes <= par - 2) {
            return "Eagle";
          } else if (strokes === par - 1) {
            return "Birdie";
          } else if (strokes === par) {
            return "Par";
          } else if (strokes === par + 1) {
            return "Bogey";
          } else if (strokes === par + 2) {
            return "Double Bogey";
          } else {
            return "Go Home!";
          }

          // Only change code above this line
          }

// Change these values to test
golfScore(5, 4);
```
## Switch Statements
 A switch statement tests a value and can have many case statements which define various possible values. Statements are executed from the first matched case value until a break is encountered

```js
 switch (num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  case valueN:
    statementN;
    break;
}
```

case values are tested with strict equality `===`. The break tells JavaScript to stop executing statements. If the break is omitted, the next statement will be executed

```js
function caseInSwitch(val) {
          var answer = "";
          // Only change code below this line
          switch (val) {
            case 1:
              answer = "alpha";
              break;
            case 2:
              answer = "beta";
              break;
            case 3:
              answer = "gamma";
              break;
            case 4:
              answer = "delta";
              break;
          }


          // Only change code above this line
          return answer;
        }

        // Change this value to test
        caseInSwitch(1);
```

* you can add the default statement which will be executed if no matching case statements are found. Think of it like the final else statement in an if/else chain.

```
switch (num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  default:
    defaultStatement;
}
```

```
function caseInSwitch(val) {
          var answer = "";
          // Only change code below this line
          switch (val) {
            case "a":
              answer = "apple";
              break;
            case "b":
              answer = "bird";
              break;
            case "c":
              answer = "cat";
              break;
            default:
              answer = "stuff";  
          }


          // Only change code above this line
          return answer;
        }

        // Change this value to test
        caseInSwitch(1);
```

If the break statement is omitted from a switch statement's case, the following case statement(s) are executed until a break is encountered. If you have multiple inputs with the same output, you can represent them in a switch statement like this:

```
switch(val) {
  case 1:
  case 2:
  case 3:
    result = "1, 2, or 3";
    break;
  case 4:
    result = "4 alone";
}
```

Cases for 1, 2, and 3 will all produce the same result.

```
function caseInSwitch(val) {
          var answer = "";
          // Only change code below this line
          switch(val) {
            case 1:
            case 2:
            case 3:
              answer = "Low";
              break;
            case 4:
            case 5:
            case 6:
              answer = "Mid";
              break;
            case 7:
            case 8:
            case 9:
              answer = "High";
              break;
          }


          // Only change code above this line
          return answer;
        }

        // Change this value to test
        caseInSwitch(1);
```

If you have many options to choose from, a switch statement can be easier to write than many chained if/else if statements. The following:

```
if (val === 1) {
  answer = "a";
} else if (val === 2) {
  answer = "b";
} else {
  answer = "c";
}
```

can be replaced with:

```
switch (val) {
  case 1:
    answer = "a";
    break;
  case 2:
    answer = "b";
    break;
  default:
    answer = "c";
}
```
