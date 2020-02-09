# Filtering Arrays
* We now know how to find an individual item in our list (array)
* We could pull back a particular title from our array of objects (notes array)

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
  {
    title: 'to be or not to be',
    body: 'that is the question',
  },
];

const findNote = function(notes, noteTitle) {
  const index = notes.findIndex(function(note, index) {
    return note.title === noteTitle;
  });
  return notes[index];
};

const note = findNote(notes, 'forEach()');
console.log(note);
```

* And we also were able to find a specific item and delete it

```
// challenge
// list of 5 todos
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: true },
];

const deleteTodo = function(todosArr, todoText) {
  const index = todosArr.findIndex(function(todo) {
    return todo.text.toLowerCase() === todoText.toLowerCase();
  });
  if (index > -1) {
    todosArr.splice(index, 1);
  }
};

deleteTodo(todos, 'Paya Rent');

console.log(todos);
```

* Here we are only targeting 1 item in our array

## filtering
* A concept where we only show results if they meet a certain criteria
* Only show tasks that are completed
* Only show notes that have a title with "gym" inside the string?

### What is filtering?
* We take an array and make a new array with some of the items based on whatever the filter is
* Filter just completed tasks
* Filter books by a specific author
* Emails from a specific person

## filter docs
* [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* **note** `filter()` does not mutate the array on which it is called
* Creates a new array with all elements that pass the test implemented by the provided function
* `filter()` gets called with a single function
    - This function is a callback and we pass it 2 things
        + 1. The individual item
        + 2. The index (call it whatever but we'll call it index)

`notes.js`

```
const notes = [
  {
    title: 'Go to gym',
    body: 'Work out shoulders',
  },
  {
    title: 'Go to gym',
    body: 'work out arms',
  },
  {
    title: 'Go to school',
    body: 'Teach a good class',
  },
  {
    title: 'Do homework',
    body: 'Write lots of JavaScript',
  },
];

const filteredNotes = notes.filter(function(note, index) {
  // inside here we return a boolean
  // if true, keep the item inside the new array we are generating
  // if false, keep the item out of the new array we are generating
  // Remember this creates a new array, it does not change the original array
  //  So you can store this new array in a new variable
  return true;
});

console.log(filteredNotes);
```

* This will output a new array that is identical to the old array because all we did was create a new variable and use filter to store all same items because we just returned `true` for our condition
* Here is the output:

```
[
  { title: 'Go to gym', body: 'Work out shoulders' },
  { title: 'Go to gym', body: 'work out arms' },
  { title: 'Go to school', body: 'Teach a good class' },
  { title: 'Do homework', body: 'Write lots of JavaScript' }
]
```

* If we returned `false` it would be an empty array in our new array because there was no matches

## We will use `method chaining`
```
const filteredNotes = notes.filter(function(note, index) {
  // inside here we return a boolean
  // if true, keep the item inside the new array we are generating
  // if false, keep the item out of the new array we are generating
  // Remember this creates a new array, it does not change the original array
  //  So you can store this new array in a new variable
  const isTitleMatch = note.title.toLowerCase().includes('gym');
  const isBodyMatch = note.body.toLowerCase().includes('gym');
  if (isTitleMatch || isBodyMatch) {
    return true;
  }
});

console.log(filteredNotes);
```

* That will return 2 items in the new array

```
[
  { title: 'Go to gym', body: 'Work out shoulders' },
  { title: 'Go to gym', body: 'work out arms' }
]
```

## Wrap our filter into a function
```
const findNotes = function(notes, query) {
  const filteredNotes = notes.filter(function(note, index) {
    const isTitleMatch = note.title.toLowerCase().includes(query.toLowerCase());
    const isBodyMatch = note.body.toLowerCase().includes(query.toLowerCase());
    // if (isTitleMatch || isBodyMatch) {
    //   return true;
    // }
    return isTitleMatch || isBodyMatch;
  });
  return filteredNotes;
};

const gymNotes = findNotes(notes, 'to');
console.log(gymNotes); // this will return 3 items that match query
```

* **important** You will always get undefined unless you return something from the function
    - The first `return` gives the value to `filteredNotes` but unless you also return `filtered` notes, calling the function will give you `undefined`

## Refactor
* We can remove the last return and just drop it before `filteredNotes` to save us a line of code and having to define another variable

```
const filteredNotes = notes.filter(function(note, index) {
  const isTitleMatch = note.title.toLowerCase().includes('gym');
  const isBodyMatch = note.body.toLowerCase().includes('gym');
  if (isTitleMatch || isBodyMatch) {
    return true;
  }
});
```

## Challenge
```
// list of 5 todos
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: true },
];

const findIncompleteTodos = function(todos) {
  return todos.filter(function(todo, index) {
    // return (isMatch = todo.completed === false);
    // no reason to store in variable so just use this
    // return todo.completed === false;
    // above line works but we can refactor yet again with the below line
    return !todo.completed;
  });
};

const incompletedTodos = findIncompleteTodos(todos);
console.log(incompletedTodos);
```

* Will return 2 items (because 2 todos were incomplete)

## Takeaway
* Now we can take an array and get a subarray back and this is a powerful tool to use with arrays

## Next - Sorting arrays

