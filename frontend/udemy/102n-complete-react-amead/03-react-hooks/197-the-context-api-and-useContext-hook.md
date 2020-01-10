# The Context API & useContext Hook (Part 1)
* We will talk about the React Context API and the useContext hook to manage a more complex hierarchy of components

## What problem are we trying to fix?
* All of our components are very tightly bound
* Tons of props are being passed between them
    - This includes
        + Data to be rendered
        + And functions to be called
* All of the about problems makes our components very hard to reuse throughout the app

### What are solutions?
* Redux
    - Redux library provides the `Provider` component and the `connect()` function allowing individual components to grab the data they needed without needing the parent component to pass it down
    - This was a huge improvement in the React workflow

### Good news!
* The good news is this functionality is now baked inside React right now!

### What we will do now
* We'll hold off on the `context` API
* Instead we'll break up `index.js` from one big file into a lot of smaller files
    - This will shine a light on how this context API can help us

## Extract our reducer function into a new file of its own
* Create `/src/reducers/notes.js`
* The file needs no imports
* We export it as the default export

`src/reducers/notes.js`

```
const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [...state, { title: action.title, body: action.body }];
    case 'REMOVE_NOTE':
      return state.filter(note => note.title !== action.title);
    default:
      return state;
  }
};

export { notesReducer as default };
```

* Now import our reducer so the app will function just like it did before this modification

`index.js`

```
import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import NoteItem from './NoteItem';
import notesReducer from './reducers/notes';

// MORE CODE
```

## Move NoteItem component
* It was already in its own file but lets group it inside a `components` folder

`src/components/NoteItem.js`

```
import React, { useEffect } from 'react';

const NoteItem = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect');

    return () => {
      console.log('Cleaning up effect!');
    };
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>remove</button>
    </div>
  );
};

export default NoteItem;
```

* We aren't really using `useEffect` so we can remove it

`NoteItem.js`

```
import React from 'react';

const NoteItem = ({ note, removeNote }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>remove</button>
    </div>
  );
};

export default NoteItem;
```

* And import it

`index.js`

```
import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import NoteItem from './components/NoteItem'; // update this line

// MORE CODE
```

* The app should function as it did before

## Make index.js tiny
* We'll extract out the Notes component into it's own file
* We'll update what needs to be imported
* We get rid of all the code we don't need in `index.js`

### Here is what that should look like:
`src/components/Note.js`

```
import React, { useState, useEffect, useReducer } from 'react';
import notesReducer from '../reducers/notes';
import NoteItem from './NoteItem';

const Note = () => {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = e => {
    e.preventDefault();
    // setNotes([...notes, { title, body }]);
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

  const removeNote = title => {
    dispatch({ type: 'REMOVE_NOTE', title });
    // setNotes(notes.filter(note => note.title !== title));
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
      // setNotes(notesData);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem('notes', json);
  }, [notes]);

  return (
    <div>
      <h1>Note App</h1>
      {notes.map(note => {
        return (
          <NoteItem key={note.title} note={note} removeNote={removeNote} />
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

export { Note as default };
```

* Our new `index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Note from './components/Note';

ReactDOM.render(<Note />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* The app should work as it did before but now we have the benefit of a better structured app
    - Check that you can remove and add notes just like before

## Let's work with the `Note` component
* We want to break out the List of notes into a NoteList component
* And the Form into a NoteForm component

### NoteList
* Cut it out and put it inside it's own file

`Note.js`

```
import React, { useState, useEffect, useReducer } from 'react';
import notesReducer from '../reducers/notes';
import NoteList from './NoteList';

const Note = () => {

  // MORE CODE

  const removeNote = title => {
    dispatch({ type: 'REMOVE_NOTE', title });
    // setNotes(notes.filter(note => note.title !== title));
  };

  // MORE CODE

  return (
    <div>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />

      // MORE CODE

      </form>
    </div>
  );
};

export { Note as default };
```

* And here is the NoteList component

`src/components/NoteList.js`

```
import React from 'react';
import NoteItem from './NoteItem';

const NoteList = props => {
  return props.notes.map(note => {
    return (
      <NoteItem key={note.title} note={note} removeNote={props.removeNote} />
    );
  });
};

export { NoteList as default };
```

## We can refactor this code using some destructing
`NoteList.js`

```
import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, removeNote }) => {
  return notes.map(note => {
    return <NoteItem key={note.title} note={note} removeNote={removeNote} />;
  });
};

export { NoteList as default };
```

* Test and the app should work as it did before

## Where are we now? The good and the bad
* Our app works which is `good`
* But we are passing our props around which makes our code not reusable - which is `bad`

### NoteList
`Note.js`

* Below we can only use `NoteList` if I have access to `notes` and `removeNote` from the parent component
* If I wanted to add NoteList somewhere else in my app it would be difficult to accomplish

```
// MORE CODE

  return (
    <div>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <p>Add note</p>

// MORE CODE
```

* The same limitation comes from the `NoteItem` component

`NoteItem.js`

```
import React from 'react';

const NoteItem = ({ note, removeNote }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>remove</button>
    </div>
  );
};

export default NoteItem;
```

* We can only use NoteItem if it has access to the note and removeNote that was passed down from it's parent (`Note`)

## Challenge
* Refactor the Form into it's own component (call it `AddNoteForm.js`)
* Goal: Continue refactoring the app

1. Create AddNoteForm component
    - What `state` is that JSX using? Make it local to new component
        + There is no reason for the Note component to keep track of what's being typed in those two fields
    - What functions is that JSX using? It should only need dispatch from the parent
2. Render AddNoteForm in NoteApp
3. Test your work

### Challenge Solution
`AddNoteForm.js`

```
import React, { useState } from 'react';

const AddNoteForm = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = e => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

  return (
    <div>
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

export { AddNoteForm as default };
```

`Note.js`

```
import React, { useEffect, useReducer } from 'react';
import notesReducer from '../reducers/notes';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';

const Note = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  const removeNote = title => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem('notes', json);
  }, [notes]);

  return (
    <div>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </div>
  );
};

export { Note as default };
```

* Test and the app should work like it did before

## Slight improvement
* I want to rename Note to NoteApp (just a personal preference)

`NoteApp.js`

```
import React, { useEffect, useReducer } from 'react';
import notesReducer from '../reducers/notes';
import NoteList from './NoteList';
import AddNoteForm from './AddNoteForm';

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  const removeNote = title => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem('notes', json);
  }, [notes]);

  return (
    <div>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </div>
  );
};

export { NoteApp as default };
```

`index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import NoteApp from './components/NoteApp';

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* Test and it should work as it did before

## Recap
* We made our app into many pieces
* Now we can dive into the React Context API and use that to solve the problem of having to pass lots of props around and reusability we used Redux and now we'll use the React Context API and the `useContext` hook
