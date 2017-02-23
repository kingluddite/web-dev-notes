# Symbols
7th Primitive type added to JavaScript in ES6

## Existing
* Number
* String
* Object
* Boolean
* Null
* Undefined

Symbols are simple but take a bit to wrap your head around

Symbols are unique identifiers

Avoid us from causing naming collisions

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Symbols</title>
</head>
<body>
<script>
const = Symbol('John');
</script>
</body>
</html>
```

We are not passing Symbol a value - it is called a `descriptor`

Because the Symbol itself is just a unique identifier

Visual a Symbol to be something like `asfl;aksdjfasd8f33h3gpieynqweruagasd573`

An absolute unique symbol so I can be positive that it will never override some piece of code

So we just describe that long unique Symbol as 'John', then you can just refer to `John` and it will reference that long symbol

View in console, type `john` and you'll get `Symbol(John)`

What about this?

```js
const john = Symbol('John');
const person = Symbol('John');
```

Are they the same? Nope
![comparing two Symbols with same descriptor](https://i.imgur.com/L0eao7a.png)

## Take aways from Symbols
* They are absolutely unique
* You will never have a naming collision with them

## A practical example using Symbols
```js
const classRoom = {
  'Mark': { grade: 50, gender: 'male'},
  'Olivia': { grade: 80, gender: 'female'},
  'Olivia': { grade: 80, gender: 'female'},
}
```

Two Olivia. How can you avoid a name collision?

```js
const classRoom = {
  [Symbol('Mark')]: { grade: 50, gender: 'male'},
  [Symbol('Olivia')] : { grade: 80, gender: 'female'},
  [Symbol('Olivia')] : { grade: 80, gender: 'female'},
}
```

View `classRoom` in console

## Symbols are not innumerable - we can not loop over them

**note** you can not use `for(name of classRoom)` because `for of` loops can't be used with objects

You will get nothing because Symbols are not innumerable. For that reason people use that to store private data because you will not be looping through them

So information you didn't want to loop over you can store that in Symbols

## How do get Symbol property values
```js
const syms = Object.getOwnPropertySymbols(classRoom);
console.log(syms);
```

This just gives us an array of the Symbols themselves

`[Symbol(Mark), Symbol(Olivia), Symbol(Olivia)]`

Why? Remember the Symbols are not the actual Object here. They are just the property keys that are inside of classroom

How do we get the data?

```js
const syms = Object.getOwnPropertySymbols(classRoom);
const data = syms.map(sym => classRoom[sym]);
```

We can use `sym` because remember that is a long super unique key. Even though the Symbol `Olivia` is the same they are completely different

![Symbol propert values output](https://i.imgur.com/pVzK3vY.png)

