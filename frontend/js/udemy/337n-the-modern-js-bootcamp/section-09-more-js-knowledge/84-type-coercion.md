# Type Coercion
* truthy and falsy are part of a bigger language feature called type coercion
* type coercion allows us to take the value of one type and in a specific context automatically convert it over to a value of a different type

```
const products = [];
const product = products[0];

if (product) {
  console.log('Product found');
} else {
  console.log(0 / 1);
}
```

* Above we take an object or undefined and coerce it into a boolean value (either true or false)
* In truthy/falsy type coercion is what we want
    - But there are other cases where we get very strange and unexpected behavior

`type-coercion.js`

```
console.log('5' + 5); // "55"
```

* Above type coercion happens when JavaScript tries to do what it thinks we want
* We want to avoid this as it will result in inconsistent behavior

```
console.log('5' - 5); // 0
```

* Above we change the operator from `+` to `-`
* JavaScript knows that we most likely want to treat both like numbers so it performs the coercion automatically and we get `0`
    - But with `+` we could add number or concatenate them

## We want to avoid type coercion with strings and numbers
* But as with truthy/falsy we can use it with booleans

## Rule - Only 3 ways to have Type Coercion
* A String `console.log('5' + 5); // "55"` (AVOID USING AT ALL COST!)
* A Number `console.log('5' - 5); // 0` (AVOID USING AT ALL COST!)
* A Boolean (we saw in truthy/falsy examples)

## == vs ===
```
console.log(5 === 5); true
console.log(5 == 5); // true, checks for equality but does not take type into account
```

* But look at this:

```
console.log('5' === 5); // false (equality and type - 5 the string is not the same as 5 the number)
console.log('5' == 5); // true (coerce 5 from string to number, and number is equal to number)
```

## Always use strict equality `===`
* There is no need to ever use `==`
* If someone tells you there is, they are lying to you

## typeof
* Find out what type of value you are dealing with

```
const one = () => {
  console.log('hello');
};
console.log(typeof 123); // "number"
console.log(typeof '123'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof null); // "object"
console.log(typeof one()); // "undefined"
console.log(typeof []); // "object"
```

* Experiment

```
const value = true + 12;
const type = typeof value;
console.log(type); // "number"
console.log(value); // 13
```

* When we convert a boolean to a number, JavaScript converts `true` to the number one and `false` to the number zero

```
const value = false + 12;
const type = typeof value;
console.log(type); // "number"
console.log(value); // 12
```
