# Conditionals

## Syntax

`if else statement`

* creates two code blocks
    - you can only go through one of the two doors, never both

```js
var answer = prompt('Who won the 1986 World Cup?');
if ( answer === 'Argentina' ) {
  document.write( '<p>Correct</p>');
} else {
    document.write( '<p>Incorrect</p>' );
}
```

**note**: no semi-colon after last curly brace

braces create a `code block` that can hold one or more JavaScript statements
=== (equality operator) used to test if two values are exactly the same
indent code properly inside the braces

conditional statements - allow you to control the flow of a program

flow of program - which code runs and when

### Problem with our code
if we type `argentina` it will evaluate to false? why?

Conditional Operator | Meaning
--- | --- 
`>` | Greater Than
`>=` | Greater Than or Equal To
`<` | Less Than
`<=` | Less Than Or Equal To
`==` | Equal To
`===` | Strict Equal To
`!=` | Not Equal To
`!==` | Strict Not Equal To

True or False
(100 > 0) true
(-1 < 200) true
('car' < 'boat') ??? what is this? (because first letter `c` in `car` comes after `b` in boat, this is `false`)

**note**: if you compare a number and a letter?
a number is always less than a letter

## JavaScript's way to test if two values are equal

### Double Equals Sign ==
("2" == 2)
"2" is a string but with double equals sign, JavaScript converts the string to a number and this expression evaluates to **true**

### Strict Equality Operator ===
("2" === 2) // false
because we are comparing the value and type (one value is string, the other is a number)

## Best Practice
Use ===

* It avoids strange problems that `==` can lead do

example
```js
( '' == 0 ) // true ???
// but if you use strict equality operator
( '' === 0 ) // false
```

**note** JavaScript is case sensitive

('JavaScript' === 'JavaScript') // true
but
('javaScript' === 'JavaScript') // false

## JavaScript test for NOT Equal
!= (not equal)
! - the not operator

## Best Practice
Better to use the strict not equals to operator
`!==`

(10 !== 9) // true
('10' !== 10) // true
('Ruby' !== 'ruby') //true
(-59 !== -59) // false

# Boolean Values

in JavaScript we say an expression `evaluates` to either `true` or `false`
**note**: don't type `"true"` or `"false"`
true and false are not strings, they are Boolean values

## If Else, else if, else
* you will only get to the second conditon if the first condition is false

```js
if ( ) {
 // do this
} else if ( ) {
    // do this
} else if ( ) {
    // do this
} else if ( ) {

} else {
    // do this if all else fails
}
```

## Comments

```js
// single line

/*
multi-line comment
 */
```

**note**:  In any conditional statement with multiple clauses only 1 code block will ever run

## Combining Multiple Tests into a Single Condition
### && (And operator)

( 44 < age && age < 100 )

Value of age | 20 < age | age < 30 | results of &&
--- | --- | --- | ---
25 | true | true | true
35 | true | false | false
10 | false | true | false
'string' | false | false | false

* if the first evaluation is false, the result will be false because there is no need to go any further because only if both are true is the entire expression true

## || (Or operator)
* pipe character

where is pipe character on keyboard
![where is pipe character on keyboard](https://i.imgur.com/bgo6sDx.png)

if either of the two conditions is true then result will be true

**note**: this is wrong
```js
if ( agree === 'yes' || 'y' ) {

} 
```

**Caution** the stuff on left and right of operator has to be a complete condition

You can have multiple conditions

```js
if( score === 0 && ships <= 0 && time === 0 ) {

}

// or this
if( score === 0 || ships <= 0 || time === 0 ) {

}

```

* ( true && false ) // evaluates to true
* ( false && true ) // evaluates to false

## Code Challenge
Challenge Instructions

1. Ask at least five questions
2. Keep track of the number of questions the user answered correctly
3. Provide a final message after the quiz letting the user know the number of questions he or she got right.
4. Rank the player. If the player answered all five correctly, give that player the gold crown: 3-4 is a silver crown; 1-2 correct answers is a bronze crown and 0 correct is no crown at all.

