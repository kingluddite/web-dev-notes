# Object Literal Upgrades

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Object Literal Upgrades</title>
</head>
<body>
<script>
const first = 'Guinness';
const last = 'Howley';
const age = 5;
const breed = 'Jack Russell Terrier';
</script>
</body>
</html>
```

## Make object properties
```js
const dog = {
  first: first,
  last: last,
  age: age,
  breed: breed,
};
console.log(dog);
```

![just regular object](https://i.imgur.com/ARTYNgV.png)

## ES6 and Object Literal
If property name and the value are the same just type it once

```js
const dog = {
  first,
  last,
  age,
  breed,
};
```

Output is same: `Object {first: "Guinness", last: "Howley", age: 5, breed: "Jack Russell Terrier"}`

But if you want to change property names or add stuff to it then:

```js
const dog = {
  firstName: first,
  last,
  age,
  breed,
  buds: ['Peaches', 'Brandy'],
};
```

Outputs: `Object {firstName: "Guinness", last: "Howley", age: 5, breed: "Jack Russell Terrier", buds: Array[2]}`

## Use Case ES6 and object literals
Method definitions inside of an object

```js
const modal = {
  create: function() {

  },
  open: function() {

  },
  close: function() {

  },
}
```

What you can do instead, you can leave out the word `function` and the colon `:` and that will be the same thing

```js
const modal = {
  create() {

  },
  open() {

  },
  close() {

  },
}
```

**tip** You should not use an arrow functon as a method to an object because we have this shorthand above, and it won't mess with the scoping of any of your variables or the keyword `this`

## And if you were passing arguments into that shortcut:

```js
const modal = {
  create(selector) {

  },
  open(content) {

  },
  close(goodbye) {

  },
}
```

## Other Use Case
Update E6 and Object literal with computed property names

```js
const key = 'pocketColor';
const value = '#ffc600';

const tShirt = {
  [key]: value
}

console.log(tShirt); // Object {pocketColor: "#ffc600"}
```

If I change key or value and refresh the browser, the object literal will update accordingly

### New with ES6
What if we want the opposite color to go along also

```js
function invertColor(color) {
  return '#' + ("000000" + (0xFFFFFF ^ parseInt(color.substring(1),16)).toString(16)).slice(-6);
}

const key = 'pocketColor';
const value = '#ffc600';

const tShirt = {
  [key]: value,
  [`${key}Opposite`]: invertColor(value)
};

console.log(tShirt); // Object {pocketColor: "#ffc600", pocketColorOpposite: "#0039ff"}
```

## Getting funky data from API
```js
const keys = ['size', 'color', 'weight'];
const values = ['medium', 'red', 100];

const shirt = {
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
};
console.log(shirt); // Object {size: "medium", color: "red", weight: 100}
```
