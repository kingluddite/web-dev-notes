# Handle App Errors
* We'll use try/catch to improve code for notes and todos
* Just because a program throws and error does not mean the code needs to change (this is true when we are relying on external things (external Database or some sort of external server or network - cell phone example - just because your cell phone can't connect to the internet, does not mean any code in the cell phone software needs to change - it may be a problem with the external source, in this case a wi-fi router))

## Both of our apps rely on localStorage
`notes-functionsjs`

* Inside of `getSavedNotes()` we are reading data from localStorage and without doing any validation we are blindly parsing it assuming that it is JSON
    - This assumption might be correct but what if it's not? (what if there is other data stored inside of there?)
        + If that happened then our app would crash and become unusable for our user
        
```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  return notesJSON ? JSON.parse(notesJSON) : [];
};

// MORE CODE
```

## Break our app on purpose
* We run our app
* Then we'll go in browser and delete the closing square bracket of our empty array

![break code ](https://i.imgur.com/LNb0qf2.png)

### Error
```
Uncaught SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at getSavedNotes (notes-functions.js:5)
    at notes-app.js:1
```

* Our app breaks because it expects JSON and we don't give it what it expects

### Can we create a new note?
* Nope, our app has crashed
* We need to update our code to allow our app to continue on even if there our app doesn't get the data it needs to function

#### Let's fix this
* We can still blindly read the data out of localStorage (nothing wrong with doing that)
* We'll use a `try/catch`
    - Good code goes in try
    - If all goes well we'll run that
    - If not, we'll use our catch and display the error but our app won't crash

`notes-functions.js`

* If we get an error we need to return an empty array so our app won't crash and we can continue adding notes

```
// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// MORE CODE
```

* We do same for `todo-app.js`

```
// fetch existing todos from localStorage
const getSavedTodos = () => {
  // Grab any todos from localStorage
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// MORE CODE
```

