# Manipulate Arrays with Methods
## Add a new item to end of notes array
`notes.js`

```
// MORE CODE
// add item to end of array using array push method
notes.push('Write blog post');

console.log(notes.length); // 4
console.log(notes); // [ 'Note 1', 'Note 2', 'Note 3', 'Write blog post' ]
```

## Remove something from the end of an array using `pop` array method
* The return value from `pop` is the last item removed

```
// remove something from end of array
const lastItem = notes.pop();
console.log(lastItem); // Write blog post
console.log(notes.length); // 3
console.log(notes); // [ 'Note 1', 'Note 2', 'Note 3' ]
```

## Two array methods for manipulating an array from the start
### `shift()`
* Removes the first element from an array and returns that removed element
* This method changes the length of the array

```
// remove the first item from the array
const firstItem = notes.shift();
console.log(firstItem); // Note 1
console.log(notes.length); // 2
console.log(notes); // [ 'Note 2', 'Note 3' ]
```

### `arr.unshift(element1[, ...[, elementN]])`
* Takes an argument of what item you want to add to the beginning of the array
* This array method adds one or more elements to the beginning of an array and returns the new length of the array
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

```
// Add one element to beginning of array
const newNotesLength = notes.unshift('Bake cake');
console.log(newNotesLength); // 3
console.log(notes); // [ 'Note 2', 'Note 3' ]
```

## splice()
* This array method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* splice()
    - First argument is where are you trying to take the action? Are you trying to start at the 2nd item, the 3rd item of the array?
        + And to do this you need to provide the starting index
    - The second argument is the number of things we want to remove

### Example
* In our notes array I want to remove a single item starting at the 2nd item in the array

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

console.log(notes.splice(1, 2)); // Note 2, Note 3

console.log(notes.length); // 1
console.log(notes); // ['Note 1']
```

* Or

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

console.log(notes.splice(1)); // Note 2

console.log(notes.length); // 1
console.log(notes); // ['Note 1', 'Note 3']
```

## A nuance of splice() where you don't remove any items but replace an item
* So start at 1, remove nothing and replace the 1 index item with something else

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

console.log(notes.splice(1, 0, 'Buy Gold')); // 4
console.log(notes); // ['Note 1', 'Buy Gold', 'Note 2', Note 3']
```

## Replace an item
* We know how to delete an item
* We know how to add an item
* We can combine both to replace an item
    - Start at index 1
    - Delete that item
    - Replace with something else

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

console.log(notes.splice(1, 1, 'Buy Gold')); // Note 2
console.log(notes.length); // 3
console.log(notes); // ['Note 1', 'Buy Gold', 'Note 3']
```

## We can change the value of an item using bracket notation
### "setting" an array item
* Let's change the last item with 'Last Item'

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

console.log((notes[notes.length - 1] = 'Last Item'));
console.log(notes);
```

## Challenge
```
const todos = [
  'Lift weights',
  'Pay Rent',
  'Do Laundry',
  'Code JavaScript',
  'Run',
];

// CHALLENGE SOLUTION
console.log('#### Challenge Solution ####');
// delete the 3rd item in the array
console.log(todos.splice(2, 1)); // ['Do Laundry']
console.log(todos.length); // 4
console.log(todos); // [ 'Lift weights', 'Pay Rent', 'Code JavaScript', 'Run' ]

// add a new item onto the end of the array
console.log(todos.push('Buy groceries')); // 5
console.log(todos); // [ 'Lift weights', 'Pay Rent', 'Code JavaScript', 'Run', 'Buy groceries' ]

// remove the first item from the list (array)
console.log(todos.shift()); // 'Lift weights'
console.log(todos.length); // 4
console.log(todos); // [ 'Pay Rent', 'Code JavaScript', 'Run', 'Buy groceries' ]

console.log('#### END Challenge Solution ####');
```

