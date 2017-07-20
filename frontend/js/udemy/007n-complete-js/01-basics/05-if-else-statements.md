# IF/ELSE statements
* JavaScript like other programming languages has a few control structures
* if/else statements is a control structure
* This is the condition

![the condition](https://i.imgur.com/PKPzdmj.png)

* If it evaluates to true we execute the code inside the if curly braces
* If the condition is false we exect the code inside the else curly braces

### ===
* It a boolean operator
* It will return a true or false operator

```js
var name = 'John';
var age = 26;
var isMarried = 'no';

if (isMarried === 'yes') {
  console.log(name + ' is married!');
} else {
  console.log(name + ' will hopefully marry soon');
}
```

## Make our code simplar using booleans
```js
var name = 'John';
var age = 26;
var isMarried = false;

if (isMarried) {
  console.log(name + ' is married!');
} else {
  console.log(name + ' will hopefully marry soon');
}
```

* The else is optional

### `==` vs `===`
`==` does type coercion and `===` does not

```js
if ( 23 === "23") {
  console.log('type coercion just happened');
} else {
  console.log('no type coercion this time!');
}
```


