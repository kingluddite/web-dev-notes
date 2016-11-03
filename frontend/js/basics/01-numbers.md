# Numbers

* Integers are a whole number WITHOUT decimal points

Integers | Floating Point Numbers | Scientific Notation
--- | --- | ---
1 | 3.14 | 8e-5 (same as .00008)
0 | -14.13 | 2e+3 (same as 9000)
-100 | .0005
1234 |

## Assign Number to variable
```js
var age = 21;
var pi = 3.141592
var kelvinZero = -273.15;
var bigNumber = 2.33e+222;
```

## Don't Do This
```js
var myString = '44';
```

This is not a number. It is a string made up of the character `4` and the number `4`.

### Use Caution
This behavior will cause you problems and you will need to know how to convert a string into a number. 

####Math
`concatenation` - combining strings

```js
// add
var answer = 2 + 7; //
var concatAnswer = '2' + '7' = '27'; // concatenation in action!

// subtract
var subtractAnswer = 7 - 2; // 5
// divide
var divideAnswer = 10 / 2; // 5
// multiply
var multiployAnswer = 5 * 5; // 25
```

## Use variables in code
**tip:** stuff on the right, goes into the thing on the left

Create a variable that stores a number and later in your code, you'll add to that number using math.

```js
var score = 0;
// in game you get points for capturing a blue smurf
score = score + 2000;
```

## Mathematical Shorthands
Add 100 to a variable
+= 100
* it both adds 100 to variable and assigns it back into the existing value of the variable
```js
var score = 100;
score += 1000; // score now equals 1100;
```

Chaning the value of a variable | Shorthand version
--- | ---
score = score + 10; | score += 1000;
score = score - 20; | score -= 20;
score = score * 5; | score *= 5;
score = score / 2; | score /= 2;

### Simple program
`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Time In A Bottle Calculator</title>
</head>
<body>
  <div class="container">
    <h1>Time In A Bottle Calculator</h1>
  <script src="js/scripts.js"></script>  
</body>
</html>
```

`js/scripts.js`

```js
var secondsPerMin = 60;
var minsPerHour = 60;
var hoursPerDay = 24;
var daysPerWeek = 7;
var weeksPerYear = 52;
var secondsPerDay = secondsPerMin * minsPerHour * hoursPerDay;
document.write('There are ' + secondsPerDay + ' seconds in a day');
```

## Order of Operations

```js
var myScore = 20 + (90 * 30) / 3;
```

## Numbers and Strings
Whatever you type into the prompty command, it will return a string
* even if you ask for age in prompt window and user types in a number, you would still get a string
* same with text fields
    - person types in a number but JavaScript will return a string value and not the number

```js
// assuming you enter 10 goals and 20 assists
var goalsThisSeason = prompt( 'How many goals did you score this season?' ),
  assistsThisSeason = prompt( 'How many assists did you have this season?' ),
  totalGoalsAndAssists = goalsThisSeason + assistsThisSeason;
console.log( 'Goals and Assists Total: ' + totalGoalsAndAssists ); // 1020
```

Why is the answer `1020` and not `30`? 
Because of concatenation.

**Solution**: First convert strings into numbers.

### parseInt() to the rescue
```js
// SOLUTION
// assuming you enter 10 goals and 20 assists
var goalsThisSeason = prompt( 'How many goals did you score this season?' ),
  assistsThisSeason = prompt( 'How many assists did you have this season?' ),
  totalGoalsAndAssists = parseInt( goalsThisSeason ) + parseInt( assistsThisSeason );
console.log( 'Goals and Assists Total: ' + totalGoalsAndAssists ); // 30
```

### But What if my number has a decimal point?
`parseFloat()`

### Using the Console panel to type 
Open console cmd + option + j
type
```
> alert('yo');
```

Hit return and alert pops up with `undefined`

![console](https://i.imgur.com/JfVRZHZ.png)

That's the commands `return value`
* the value it supplies back to a program when it's done
* the value of `undefined` means it returns nothing back
    - alert() returns `undefined`
    - but parsefloat('3.14') returns `3.14`
        + try this
            * parseFloat('1.11 light years away');
                - returns `1.89`
        + if you begin with letters you get `NAN`
            * Not A Number

Parse Command | Return Value 
--- | ---
parseInt('11'); | 11
parseInt('111px'); | 111
parseInt('202.99'); | 202
parseInt('Plan 9'); | NaN
parseFloat('32.50'); | 32.50
parseFloat('-273.15*'); | -237.15
parseFloat('Absolute zero is -273.15'); | NaN


```js
// Problem part4
// Imagine you have 10 <div> tags on a web page. Each div is 190 pixels wide. Using the two variables in this script, create a new variable named totalWidth that multiplies the width by the numOfDivs variable. Because the width variable is a string, you'll need to use a JavaScript function to retrieve the number value.
var width = '190px',
numOfDivs = 10,
totalWidth = parseInt( width ) * numOfDivs;
console.log( totalWidth ); // 1900
```

`js/scripts.js`

* This works but it's not DRY
    - Don't Repeat Yourself
    
```js
// part 5 - fun exercise
var questions, questionsLeft, adjective, verb, noun, sentence;

// set questions value
questions = 3;
// how many questons left UI
questionsLeft = ' [' + questions + ' questions left]';
// first question
adjective = prompt( 'Please type an adjective' + questionsLeft );
// after each question, subtract 1 from questions variable
questions -= 1;

// second question
questionsLeft = ' [' + questions + ' questions left]';
verb = prompt( 'Please type a verb' + questionsLeft );
questions -= 1;

// third question
questionsLeft = ' [' + questions + ' questions left]';
noun = prompt( 'Please type a noun' + questionsLeft );
questions -= 1;

// building sentence with adjective
sentence = "<h2>there once was a " + adjective;



sentence += ' programmer who wanted to use JavaScript to ' + verb;
sentence += ' the ' + noun + '.</h2>';
document.write( sentence );
```

# JavaScript is made up of objects
* Numbers are one type of object
* Strings are another type of object

## Objects have properties
* just like a variable that's associated with the object

example
A String object has a property named length

try this in your console

```js
> 'John Doe'.length; // returns 8
```

## Objects have methods
* actions objects perform

example

```js
> 'John Doe'.toLowerCase(); // john doe
```

String is just one type of object in JavaScript. There are tons others.

# MDN (Mozilla Developer Network)

One other type of object is the `[Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)` object

**tip** Clear console
```
> clear()
```

### Math.round()

```js
> Math.round(1.99); // returns 2
```

### Math.random()
It produces a random number from `0` up to and but not including `1`. For example, it could return `0`, `0.3898784155026078` but never `1`.

```js
> Math.random(); // random number between 0 and 1
> Math.random() * 10; // random number between 0 and 9
> Math.floor( Math.random() * 10 ) + 1; // random number between 1 and 10
```
* returns a random number each time

**tip** up arrow in console shows you your last command, saves you typing

### Math.floor(num) and Math.ceil(num)
Both convert numbers to integers

Math.floor( Math.random() * 6)
**tip** in JavaScript code runs inside out, stuff in parenthesees happens first

**note** we use Math.floor(num) instead of Math.ceil(num) because Math.ceil(0) is possible and that would return 0.

Random number exercise
```js
var dieRoll = Math.floor( Math.random() * 6 ) + 1;
console.log( 'You rolled a ' + dieRoll );
```

## Exercise

```js
// See if you can build a program that collects a number from a user, then prints out a random number from 1 to the number the user selects. Now is the opportunity to practice using some of the commands you learned in this course.
// as an added bonus let the use say where they want to start and end in their range of randomization
var userInputStart, userInputEnd, randomNumber, userMessage;

userInputStart = prompt( 'What starting number would you like to randomize?' );
userInputEnd = prompt( 'What ending number would you like to randomize?' );
randomNumber = Math.floor( Math.random() * parseInt( userInputEnd ) );
userMessage = 'A random number between ' + parseInt( userInputStart ) + ' and ' + parseInt( userInputEnd ) + ' is ' + randomNumber;
console.log( userMessage );
```

better way

```js
// better way
var input1 = prompt( "Please type a starting number" );
var bottomNumber = parseInt( input1 );
var input = prompt( "Please type a number" );
var topNumber = parseInt( input );
var randomNumber = Math.floor( Math.random() * ( topNumber - bottomNumber + 1 ) ) + bottomNumber;
var message = "<p>" + randomNumber + " is a number between " + bottomNumber + " and " + topNumber + ".</p>";
document.write( message );
```

## Problem
When someone types in a string, our program breaks. We need to use conditional statements to fix this.
