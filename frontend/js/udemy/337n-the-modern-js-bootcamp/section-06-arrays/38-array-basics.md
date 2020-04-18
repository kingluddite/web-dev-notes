# Array Basics
## Create 2 apps
* `notes.js`
* `todo.js`
* For now it will be just a script that runs but we'll eventually tie them to a UI

## Create and output an array
`notes.js`

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

console.log(notes); // [ 'Note 1', 'Note 2', 'Note 3' ]
```

## array.length
`notes.length; // 3`

## array docs
* Lots of methods
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Grab an individual item from an array
* indices of arrays start at `0` (consistent with most programming languages)
* Grab first note

`notes[0]; // Note 1`

```
console.log(`First item of notes array is ${notes[0]}`);
```

## What happens if you try to access an array item that doesn't exist?
* You will get `undefined` back

```
// undefined returned for non-existent array items
console.log(notes[100]); // undefined
```

## How to grab the last item in an array
```
// grab last item in an array
console.log(notes[notes.length - 1]); // Note 3
```

## Challenge
* Create an array of 5 `todos`
* Print out a message highlighting the number of `todos`
* Print the `first` and `second to last` items to the terminal using this format: `Todo: walk the dog`

### Challenge Solution
```
// challenge
// list of 5 todos
const todos = [
  'Lift weights',
  'Pay Rent',
  'Do Laundry',
  'Code JavaScript',
  'Run',
];

// log length of todos
console.log(`You have ${todos.length} to complete.`);

// print first and 2nd to last todos in this format: Todo: walk the dog
console.log(`Todo: ${todos[0]} to complete`);
console.log(`Todo: ${todos[todos.length - 2]} to complete`);
```
