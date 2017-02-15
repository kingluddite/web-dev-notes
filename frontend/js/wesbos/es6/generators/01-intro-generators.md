# Intro to Generators

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Generators</title>
</head>
<body>
<script>
function listPeople() {
  console.log('Manny');
  console.log('Moe');
  console.log('Jack');
}

listPeople();
</script>
</body>
</html>
```

Currently, with functions in JavaScript it runs top to bottom and then that function is done

Generators are functions you can start and stop or function you can pause for an indefinate amount of time and functions that you can pass additional information to at a later point in time

## How to create a Generator function

### yield key word
Kind of like `return for now`

If you return from a function you are done but if you `yield` from a function than that will return for that item until that function is called again

```js
function* listPeople() {
  yield 'Manny';
  yield 'Moe';
  yield 'Jack';
}
```

The above Generator function will need to be called 3 times to get all it's information. Only things that are different from regular functions are that we have an `*` after the function word and we use `yield` inside it

## How to use a generator function
First invoke that generator function and store in a variable

`const people = listPeople();`

```js
function* listPeople() {
  yield 'Manny';
  yield 'Moe';
  yield 'Jack';
}

const people = listPeople();
```

## people.next()

Typing `people` in console gives us nothing but `people.next()` doesn't return `Manny` but it returns an Object that inside has a property with the value we expect `"Manny"` but another property `done` with a value of `false`. The reason it is false is it is not done running since we only ran it once. But if we run it 3 more times we will get the other values and then when we get all the yielded values it will say `done` is set to a value of `true` and the value property is `undefined`

## Dynamically generated yields
Before we used hard coded yields now let's use dynamically generated yields

```js
function* listPeople() {
  let i = 0;
  yield i;
  i++;
  yield i;
  i++;
  yield i;
}
```

![dynamic yield generator](https://i.imgur.com/GwZwz8z.png)

Notice each time you call it the value of `i` is scoped to the generator and each time you call it, it remembers the last time and increases from that value until `done` is `true` and `value` is `undefined`

**note** Generator functions keep their variable functions until it is finished and you can yield multiple values from it

### Interating through an array
Instead of all at once, we will interate through it one by one with `next()`

```js
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879 },
  { first: 'Isaac', last: 'Newton', year: 1643 },
  { first: 'Galileo', last: 'Galilei', year: 1564 },
  { first: 'Marie', last: 'Curie', year: 1867 },
  { first: 'Johannes', last: 'Kepler', year: 1571 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
  { first: 'Max', last: 'Planck', year: 1858 },
];

```

#### Create a new Generator function called `loop()`

```js
function* loop(arr) {
  // think -> const inventor of inventors
  for (const item of arr) {
    yield item;
  }
}
```

That will create 7 yields and the generator is smart enough to know that when there are know more yields to loop through the entire function will be done

### How do we call this loop generator?
By invoking it and assigning it to a variable

`const inventorGen = loop(inventors);`

```js
const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879 },
  { first: 'Isaac', last: 'Newton', year: 1643 },
  { first: 'Galileo', last: 'Galilei', year: 1564 },
  { first: 'Marie', last: 'Curie', year: 1867 },
  { first: 'Johannes', last: 'Kepler', year: 1571 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473 },
  { first: 'Max', last: 'Planck', year: 1858 },
];

function* loop(arr) {
  console.log(inventors);
  // think -> const inventor of inventors
  for (const item of arr) {
    yield item;
  }
}

const inventorGen = loop(inventors);
```

Call it with: `inventorGen.next()`

Gives us:

```
[Object, Object, Object, Object, Object, Object, Object]
Object {value: Object, done: false}
```

We first see all the Inventor objects (from our first console.log(inventors))
But then we see our first inventor

![First inventor](https://i.imgur.com/hvYAhSC.png)

**tip** if you don't care about the `done` status use this `inventorGen.next().value`

Gives us:

`Object {first: "Isaac", last: "Newton", year: 1643}`

Then you can use `inventorGen.next().value` to one-by-one go through each inventor








