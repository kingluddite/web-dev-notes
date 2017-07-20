# Operators
```js
var birthYear = 2016 - 26;
console.log(birthYear); // 1990

// mutate birthYear variable
birthYear = 2016 - 26 * 2;
console.log(birthYear); // 1964
```

* Since we are repeating `2016` twice, we should make it a variable to use the DRY coding principle

```js
var currentYear = 2017
var birthYear = currentYear - 26;
console.log(birthYear); // 1990

// mutate birthYear variable
birthYear = currentYear - 26 * 2;
console.log(birthYear); // 1964
```

## Precedence of Operators
### JavaScript uses order of operations
* 26 * 2 is done first
* Then currentYear - 52

## Useful Resources
* [useful resources link](http://codingheroes.io/resources/)
* [MDN Operator precedence](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

### Operator Precedence
* What is `Associativity`?
    - If two operators have the same precedence which order will they follow?
        + left to right or right to left
* Why is multiplication (14) done before subtraction (13)?
    - Because it has a larger precedence number
* But if you are using adding (13) and subtraction (13) their precedence is the same so you need to then look at Associativity which tells you that you need to follow **left-to-right**
* `=` is also an operator
        - It has a low precedence (3) so it is usually the last one to be executed

#### Parenthesees are king
They have `20` precedence so they do stuff first

```js
ageMike = 3 + 5 * 4 - 6; // 17
console.log(ageMike);
ageMike = (3 + 5) * 4 - 6; // 26
console.log(ageMike);
```

## Two equal operators
```js
ageMike = ageDana = (3 + 10) * 4 - 6; // 46
//ageMike = ageDana = 46
```

* Since we have two equal operators above we know they both have a precedence of `3`
* We look at the equals precedence chart under Associativity and see that we need to follow the order of right to left

![equals associativity](https://i.imgur.com/sRFBEmZ.png)

```js
var ageMike = 30;
ageMike = ageDana = (3 + 10) * 4 - 6; // 46
//ageMike = ageDana = 46
console.log(ageMike); // 46
console.log(ageDana); // 46
```

* This shows the importance of Associativity because if the order was left to right instead of right to left the answer would be totally different

## Operators that enable us to write less code
### `++` and `*=`
```js
ageMike++;
// same as
ageMike = ageMike + 1;
```

* `++` operator is useful in loops

`ageMike *= 2` is same as `ageMike = ageMike * 2`
