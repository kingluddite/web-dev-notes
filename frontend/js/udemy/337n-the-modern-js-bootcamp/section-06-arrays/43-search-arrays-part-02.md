# Searching Arrays (Part 2)
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

* That will find a note with a string `forEach()` and log it to the terminal
* **note** using `===` is a case-sensitive search
* If you don't find a match you will get `undefined`

### So we can improve our search
* We can make our comparisons the same case `upper` or `lower`

```
const findNote = function(notes, noteTitle) {
  // here we check if there is a match (index) or no match -1
  const index = notes.findIndex(function(note, index) {
    return note.title.toLowerCase() === noteTitle.toLowerCase();
  });
  // the above return, returns the value to `index` variable
  // we then use our index (either -1 or the found index)
  // array[-1] returns undefined
  // we then return to findNote the array item found (notes[index])
  return notes[index];
};

const note = findNote(notes, 'To bE Or Not TO be');
console.log(note);
```

* We get a match in the above because we make both comparisons the same case

## more on findIndex()
* We were using findIndex() and we're directly grabbing the item out of the array
    - There is a function that does the above for us and makes our lives a bit easier

# find() array method
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
* The signature is the same so we just change `findIndex()` to `find()`

```
const findNote = function(notes, noteTitle) {
  const index = notes.findIndex(function(note, index) {
    return note.title.toLowerCase() === noteTitle.toLowerCase();
  });
  
  return notes[index];
};
```

```
const findNote = function(notes, noteTitle) {
  const index = notes.find(function(note, index) {
    return note.title.toLowerCase() === noteTitle.toLowerCase();
  });
  return notes[index];
};
```

* The difference using `find()` over `findIndex()` is `findIndex()` returns the index and `find()` returns the object

### Here's how we can get the note with a couple less steps
```
const findNote = function(notes, noteTitle) {
  const note = notes.find(function(note, index) {
    return note.title.toLowerCase() === noteTitle.toLowerCase();
  });
  return note;
};
const note = findNote(notes, 'To bE Or Not TO be');
console.log(note);
```

* That will return the object

## Recommendation
* If you are looking for the item directly use `find()`
* If you want to look for an index, like remove an item by index, then use `findIndex()`
* Both `find()` and `findIndex()` are very similar the only difference is what you get back from the method

## Refactor short cut
* Since we create a variable and the only thing we do with it is return it we can clean up our code by returning it and not storing it in a variable

```
const findNote = function(notes, noteTitle) {
  // here we check if there is a match (index) or no match -1
  return notes.find(function(note, index) {
    return note.title.toLowerCase() === noteTitle.toLowerCase();
  });
};

const note = findNote(notes, 'To bE Or Not TO be');
console.log(note);
```

## Arrays are also passed by reference
* This means that if I pass an array into a function and I make a change to that array I will see that change made on the original array
* We can see this occur in our code below:

```
const findNote = function(notes, noteTitle) {
  // here we check if there is a match (index) or no match -1
  // notes.push()
  return notes.find(function(note, index) {
    return note.title.toLowerCase() === noteTitle.toLowerCase();
  });
};
```

* So if we change `notes` inside the function (like using notes.push()) it will also change the original notes array (they are both pointing to the same memory)

## Challenge
1. Switch from an array of strings to an array of objects (gives us more properties to play with and we can return all of them inside the object)
2. Each item will have a `text` property and a `completed` property (true/false) - mix them up so we can play around with the data
3. Create a function that works with the array of objects - it will allow us to remove a todo by text value
   *  `deleteTodo(todos, 'buy Food')`
   *  If it finds a match it deletes it, if not, it doesn't
   *  How to delete an item from an array?
       -  It will be based off its index so find the index of the item
       -  If it is found use the other method we explored to delete the item
4. Make the search case insensitive
5. Test to show method deletes if match found, original array remains unchanged if not

### Challenge Solution
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

deleteTodo(todos, 'Pay Rent');

console.log(todos);
```

* That will remove one item
* **note** splice only works in this solution because arrays are passed by reference (both references to the array are pointing to the same spot in memory)
* Change the invoke argument to a phrase that doesn't exist in your array of todos and you should see no items are removed
