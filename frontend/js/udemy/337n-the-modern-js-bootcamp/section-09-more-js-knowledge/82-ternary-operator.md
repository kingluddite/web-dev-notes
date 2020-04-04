# Conditional (Ternary) Operator
* Shortcut to write a simple if statement

## The `if` statement way
* A person can vote if they are older than 18

```
const myAge = 30;
let message;

if (myAge >= 18) {
  message = 'You can vote';
} else {
  message = 'You can not vote';
}

console.log(message); // You can vote
```

## The ternary operator way
```
const myAge = 17;
let message;

// if (myAge >= 18) {
//   message = 'You can vote';
// } else {
//   message = 'You can not vote';
// }

message = myAge >= 18 ? 'You can vote' : 'You can not vote';
console.log(message); // You can not vote
```

## Refactor even more
* This saves us multiple lines
* A much more concise way to write simple logic

```
const myAge = 17;
let message = myAge >= 18 ? 'You can vote' : 'You can not vote';
console.log(message);
```

## Use ternary operator to call a function based on logic
* Create 2 functions
    - One function logs a message to "Show the page"
    - One function (if the user is not of drinking age) to "Show the error page"
* Use the ternary to call a function based on user's age

```
const myAge = 21;
const showPage = () => {
  console.log('Show Page');
};
const showErrorPage = () => {
  console.log('Show Error Page');
};
myAge >= 21 ? showPage() : showErrorPage(); // Show Page 
```

## Return a value and store it to log it out
```
const myAge = 21;
const showPage = () => {
  return 'Show Page';
};
const showErrorPage = () => {
  return 'Show Error Page';
};
const message = myAge >= 21 ? showPage() : showErrorPage();
console.log(message);
```

## Challenge
* Write a ternary operator

### Starting code
`const team = ['John', 'Mike']`

1. Print "Team size: 3" if less than or equal to 4
2. Print "Too many people on your team" otherwise

```
const team = ['John', 'Mike', 'Jill', 'Jan', 'Bill'];
const teamSize = team => `Team Size: ${team.length}`;
const teamTooBig = () => `Too many people on your team`;

const message = team.length <= 4 ? teamSize(team) : teamTooBig();
console.log(message);
```

## Challenge
Convert the following if statements into ternary operators

`notes-functions.js`

```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// MORE CODE
```

* Here it is as a ternary operator

```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  // if (notesJSON !== null) {
  //   return JSON.parse(notesJSON);
  // } else {
  //   return [];
  // }
  return notesJSON !== null ? JSON.parse(notesJSON) : [];
};

// MORE CODE
```

`todos-functions.js`

```
// fetch existing todos from localStorage
const getSavedTodos = () => {
  // Grab any todos from localStorage
  const todosJSON = localStorage.getItem('todos');

  // if (todosJSON !== null) {
  //   // if there is something in todosJSON
  //   // Grab the string and turn it back into an object
  //   return JSON.parse(todosJSON);
  // } else {
  //   // If there is nothing in localStorage under 'notes' return an empty array
  //   return [];
  // }
  return todosJSON !== null ? JSON.parse(todosJSON) : [];
};

// MORE CODE
```

* Test on both to make sure the changes still work
