# Complex `state` with `useState`
* Work through an example of an array of objects
    - Each object representing something
        + like
            * note
            * place
            * email
            * whatever

## We'll remove our app we just created
* This is where we showed that `useState` works differently with objects then it did before with CBCs
* We'll create `NoteApp` and render it to the screen

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  return (
    <div>
      <h1>Note App</h1>
    </div>
  );
};
// const App = props => {
//   const [count, setCount] = useState(props.count);
//   const [word, setWord] = useState('test');
//
//   return (
//     <div>
//       <p>
//         The current {word || 'count'} is {count}
//       </p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(0)}>reset</button>
//       <input value={word} onChange={e => setWord(e.target.value)} />
//     </div>
//   );
// };

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Set up 2 pieces of data we need to track
`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');

  return (
    <div>
      <h1>Note App</h1>
    </div>
  );
};

// MORE CODE
```

## Add our form with our input
`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');

  return (
    <div>
      <h1>Note App</h1>
      <p>Add note</p>
      <form>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </form>
    </div>
  );
};

// MORE CODE
```

* You should now see input in browser and you can type stuff into that input

## Add button
* Wire up onSubmit function
* We want to manipulate the notes array using data stored inside of `title` (that is the title for the new note we want to add)
* **note** We can add this functionality inline or break it out into it's own function (no right way - it is purely a matter of style and personal preference)
    - **tip**
        + If it's doing one thing use inline
        + If you have multiple things use a function

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');

  const addNote = e => {
    console.log('works');
  };
  return (
    <div>
      <h1>Note App</h1>
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button>add note</button>
      </form>
    </div>
  );
};

// MORE CODE
```

* Click button and you'll see `works` in Chrome dev tool
* When we call `setNotes` we pass in an `array` because **notes** should always be an array
* We start by passing in all existing notes
* We add an object with a title set to title (use shortcut)

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');

  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, { title }]);
  };
  return (
    <div>
      <h1>Note App</h1>
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button>add note</button>
      </form>
    </div>
  );
};

// MORE CODE
```

* View react dev tools and add notes and see how each title is added to the array as an object with a tile property
* You call `setTitle('')` to an empty string to clear the data

`index.js`

```
// MORE CODE

  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, { title }]);
    setTitle('');
  };

// MORE CODE
```

* Test the form
* Add multiple notes
* After adding each not see how input field is cleared

## Now we need to render our data to the browser
* This will happen inside of our JSX
    - We want to iterate over our `notes` array
    - Adding new content to the string for each and every note

```
// MORE CODE

  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, { title }]);
    setTitle('');
  };
  return (
    <div>
      <h1>Note App</h1>
      {notes.map(note => (
        <div key={note.title}>
          <h3>{note.title}</h3>
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <button>add note</button>
      </form>
    </div>
  );
};

// MORE CODE
```

* Now you can add notes with a title one by one and once you click the add note button the note will be rendered to the screen
* Now we now how to use `useState` in our functional components and still take advantage of a very common data structure (the array of objects - which is typically what we get whenever we are working with any sort of Database in JavaScript)

## Add a remove button
* This will be added to each button that allows each button to be removed

`index.js`

```
const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');

  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, { title }]);
    setTitle('');
  };

  const removeNote = title => {
    setNotes(notes.filter(note => note.title !== title));
  };
  return (
    <div>
      <h1>Note App</h1>
      {notes.map(note => {
        return (
          <div key={note.title}>
            <h3>{note.title}</h3>
            <button onClick={() => removeNote(note.title)}>Remove</button>
          </div>
        );
      })}

// MORE CODE
```

### How will we remove notes?
- By their title
- In a production app we would remove notes by their `id` as it would be unique
- We would use the `id` as the key as well as `title` could be a duplicate value

#### array filter method
* We'll use a similar technique we used inside Redux by using the array `filter` method
    - We use setNotes as we are trying to change the `notes` array
    - `notes.filter()` will return an array of all notes that match the filter
    - We only want to remove titles that match the title passed into the `removeNote` function

```
// MORE CODE

  const removeNote = title => {
    setNotes(notes.filter(note => note.title !== title));
  };

// MORE CODE
```

* The filter method creates a new array with all elements that pass the test implemented by the provided function
    - So any notes that do not have the title passed into removeNote will be added to the new array
    - But if we have a match then that note is not included in the new array

## Call removeNote
* **warning** This will not work! (because it will not be called with the correct argument)

```
// MORE CODE

<button onClick={removeNote}>Remove</button>

// MORE CODE
```

* But this will work (below)

```
// MORE CODE

<button onclick={() => removeNote(note.title)}>remove</button>

// MORE CODE
```

* `note.title` is available in scope from the parent `notes.map()`

```
// MORE CODE

      {notes.map(note => {
        return (
          <div key={note.title}>
            <h3>{note.title}</h3>
            <button onclick={() => removeNote(note.title)}>remove</button>
          </div>
        );
      })}

// MORE CODE
```

* When the button is clicked our arrow function runs
* The arrow function calls remoteNote with the correct data and the note is removed

## Challenge
* Goal: Add body for each note

1. Allow users to add body to each note
2. Render the body alongside the note title
3. Test your work

### Challenge Solution
```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, { title, body }]);
    setTitle('');
    setBody('');
  };

  const removeNote = title => {
    setNotes(notes.filter(note => note.title !== title));
  };
  return (
    <div>
      <h1>Note App</h1>
      {notes.map(note => {
        return (
          <div key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={() => removeNote(note.title)}>remove</button>
          </div>
        );
      })}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <p>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </p>
        <p>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </p>
        <button>add note</button>
      </form>
    </div>
  );
};
// const App = props => {
//   const [count, setCount] = useState(props.count);
//   const [word, setWord] = useState('test');
//
//   return (
//     <div>
//       <p>
//         The current {word || 'count'} is {count}
//       </p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(0)}>reset</button>
//       <input value={word} onChange={e => setWord(e.target.value)} />
//     </div>
//   );
// };

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Next - useEffect
* This is another built in React hook
