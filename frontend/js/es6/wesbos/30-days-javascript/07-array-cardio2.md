# Array Cardio Day #2

## Starter file

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Cardio Day 2</title>
</head>
<body>
<script>
const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];
const comments = [
  { text: 'Up, up and away!', id: 243451 },
  { text: 'To infinity and beyond!', id: 348292 },
  { text: 'If you build it, they will come', id: 234389 },
  { text: 'I see dead people', id: 223930 },
  { text: 'We\'re gonna need a bigger boat', id: 493830 },
];
</script>
</body>
</html>
```

## Some and Every Checks
### What is `.some()` (_Array.prototype.some()_)
At least one thing in your array meets what you are looking for

* Some will take an argument that is a function that will check it for every single item in our array

#### Example
Is at least one person 21?

```js
const people = [
  { name: 'Bob', year: 1979 },
  { name: 'Kate', year: 2000 },
  { name: 'Rick', year: 1980 },
  { name: 'Rebecca', year: 1999 }
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 21
const isAdult = people.some(function(person) {
  const currentYear = (new Date()).getFullYear();
  if(currentYear - person.year >= 21 ) {
    console.log('We have an adult');
  }
});
```

The console will show us `2 We have an adult`

But let's have this function return true and when we call the function, if it meets the condition it will return `true` else it will return `false`

```js
const isAdult = people.some(function(person) {
  const currentYear = (new Date()).getFullYear();
  if(currentYear - person.year >= 21 ) {
    return true;
  }
});
console.log(isAdult); // true
```

**tip** Surround the value you are passing `console.log({isAdult})` and it will return the name of the variable and the value

### Refactor our code
Makes it much simpler to read

```js
// const isAdult = people.some(function(person) {
//   const currentYear = (new Date()).getFullYear();
//   if(currentYear - person.year >= 21 ) {
//     return true;
//   }
// });
const isAdult = people.some((person) => {
  const currentYear = (new Date()).getFullYear();
  return currentYear - person.year >= 21;
});
console.log({ isAdult }); // Object {isAdult: true}
```

#### Refactored even more
```js
// const isAdult = people.some((person) => {
//   const currentYear = (new Date()).getFullYear();
//   return currentYear - person.year >= 21;
// });
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 21);
console.log({ isAdult }); // Object {isAdult: true}
```

## Array.prototype.every()
Checks every single item in array if is matches condition

```js
// Array.prototype.every() // is everyone 21
const isAdult = people.every(person => ((new Date()).getFullYear()) - person.year >= 21);
console.log({ isAdult }); // Object {isAdult: false}
```

## Array.prototype.find()
Kind of like filter, but instead of returning a subset of the array, it just finds the one you are looking for. It will return the first item that it finds

### find comment with ID of 493830

```js
const foundComment = comments.find((comment) => {
  if (comment.id === 493830) {
    return true;
  }
  return false;
});
console.log(foundComment); // Object {text: "We're gonna need a bigger boat", id: 493830}
```

* It returns `undefined` if not found

### Refactor
Refactored as arrow function with implicit return

```js
const foundComment = comments.find(comment => comment.id === 493830);
console.log(foundComment);
```

## Array.prototype.findIndex()
Find where something is by locating the array's index. Say you want to delete one of our comments but in order to do that you need to know where the comment is

```js
const index = comments.findIndex(comment => comment.id === 348292);
console.log(index); // 1 (index of 1 is 2nd item in array)
```

### Deleting an array item
2 ways to do this

1. `array.splice(start, deleteCount)`
    * `splice()` will return an array of items removed
2. Create a new array of updated comments (popular in Redux world) 

#### Using array.splice()
Now that we found the index of our array we need to delete it.
`comments.splice(index, 1);`

In console use `comments` or even better `console.tables(comments)`

![console.table comments](https://i.imgur.com/Us5McQ6.png)

#### Create a new array
The other way is we can create a new array of the updated comments (Used a lot in Redux)

```js
// create a new array
const newComments = [
  // take a copy of the comments before the index
  comments.slice(0, index),
  // take a copy of the comments after the index until the end
  // so you don't pass a second parameter
  comments.slice(index + 1),
];
```

`console.table(comments)` - gives you original comments

`console.table(newComments)` - gives you wacky data. The reason is our `.slice` returns arrays inside our 2 slots inside our new array.

`console.log(newComments)` - gives a better look

`[Array[1], Array[3]]`

That is not what we want. This is were we use `...` to spread our array items into our new array with:

```js
const newComments = [
  // take a copy of the comments before it
  ...comments.slice(0, index),
  ...comments.slice(index + 1),
];
```

And that will give us our new array of comments with our `.slice()` comment removed

