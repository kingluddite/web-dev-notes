# Searching arrays (Part 1)
* How we can see if something exists inside an array

## Move from an array of strings to an array of objects
* A note isn't just a string
* A note will contain other pieces of information we want to model
    - Like
        + A title
        + A body
        + When the note was created
        + Author of the note
        + Lots more

### Also a todo isn't just a string
* It has other info we want to model
    - Like
        + Assigned to a date
        + Assigned to a user
        + Completed todo or incomplete todo

## indexOf method
* Helps us find stuff inside an array
* It is easy to work with
* `indexOf(WHAT_YOU_ARE_LOOKING_FOR)`
    - It will return an index of where that item was found inside the array

```
console.log('##### indexOf #####');
const note = notes.indexOf('Note 2');
console.log(note); // 1
```

* **note** It is case sensitive so if you tried `notes.indexOf('note 2')` it would not find a match
    - It will return `-1` if it doesn't find a match

## Moving from an array of strings to an array of objects

### An array of strings
```
const notes = ['Note 1', 'Note 2', 'Note 3'];
```

### An array of objects
```
const notes = [{}, {}, {}];
```

### Create a new array of objects for our notes
```
const notes = [
  {
    title: 'indexOf()',
    body: 'Helps you find stuff inside an array',
  },
  {
    title: 'forEach()',
    body: 'array method to loop through an array',
  },
  {
    title: 'toUpperCase()',
    body: 'String method to make a string upper case',
  },
];

// notes.forEach(function(item, index) {
//   console.log(index);
//   console.log(item);
// });

console.log(notes.length);
console.log(notes);

console.log('##### indexOf #####');
const note = notes.indexOf('note 2');
console.log(note); // 1
```

## How can indexOf() work with an array of objects
* Now add one empty object to our array

```
const notes = [
  {},
  {
    title: 'indexOf()',
    body: 'Helps you find stuff inside an array',
  },
  {
    title: 'forEach()',
    body: 'array method to loop through an array',
  },
  {
    title: 'toUpperCase()',
    body: 'String method to make a string upper case',
  },
];
```

* Then we'll search for that empty object

```
console.log('##### indexOf #####');
const note = notes.indexOf({});
console.log(note); // -1
```

* What went wrong?
    - I have an empty object in my array
    - I tried to search for it with `indexOf()` but it came back with a value of `-1` which means it did not find a match for my search argument

### Remember our discussion about object references?
* **remember** When we pass an object to a function what we get access to isn't a clone of that object with the same properties
    - We get a reference (pointer) to that same object in memory
    - Which means if I try to change a property on that object, I'll change the original value of that object's property
    - When we assign an object to a variable, that variable points to a spot in memory where that object is located
    - And If I pass a function to an object that object is also pointing to the same spot in memory where that object is
    - A change in one, changes the memory of that object where both references are pointing to

### Can an empty object be compared to another empty object?
* No it can not

```
console.log('## Compare 2 empty objects ##');
console.log({} === {}); // false
```

#### Important when comparing 2 objects
* It does not matter if they have the same set of object properties and the same set of object property values --- that does not make 2 objects equal
* What makes 2 objects equal is if they are the exact same object in memory

## Example of exact same objects in memory
```
console.log('## Compare 2 EQUAL empty objects ##');
let someObject = {};
let otherObject = someObject;
console.log(someObject === otherObject); // true
```

* So we show both objects are equal because they both are the same objects in memory

## So we just showed how `indexOf` breaks when comparing objects
* Why are arrays of objects super popular if objects if they issues with `indexOf()`
* Why can't it use a basic method like `indexOf()`?

### Answer
* Although we can't use the array method `indexOf()`
* There are a many other array methods we can use

## Alternative to get the indexOf something in our array when that something is an object
* **note** `indexOf()` compares searchElement to elements of the Array using strict equality (the same method used by the` ===` or triple-equals operator)

### we need something with more flexibility and the is `findIndex()` 
#### findIndex()
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* This can work with an array of objects

```
console.log(notes.length);
console.log(notes);

notes.findIndex(function(note, index) {
  console.log(note);
});
```

* It just outputs our array of objects
* Not a big deal as `forEach` does the same thing
    - This isn't the goal of `findIndex()`
    - The goal of `findIndex()` is to find the index
    - And unlike `forEach()` **findIndex()** has a meaningful return value
        + What is the return value?
            * The index of the first element in the array that passes the test. Otherwise, `-1` (it didn't find a match)

```
console.log(notes.length);
console.log(notes);

const index = notes.findIndex(function(note, index) {
  console.log(note);
});

console.log(index); // -1
```

* We get `-1` not because we didn't find a match but because we didn't set up `findIndex()` to the work the way it is supposed to
* With `findIndex()` we return whether it returns `true` or `false`
    - "If this thing isn't the thing we are looking for we return **false**"
    - "If it is the thing we are looking for we return **true**"

### Let's try this out
* I want to find a note with "make a string" inside it

```
const index = notes.findIndex(function(note, index) {
  console.log(note);
  return note.title === 'indexOf()';
});

console.log(index); // 1
```

* We find a match so we know the match is in `notes[1]` (second object in our array of objects)
* **note** `findIndex()` looks for the first match it finds then it stops
    - This is good because it is efficient, if we find a match on item 3 of 10000 items, we don't have to search the rest and we save machine resources
