# Fragments
* All React components when rendered need to return a single root element

`AddNoteForm.js`

```
import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context.js';

const AddNoteForm = () => {
  const { dispatch } = useContext(NotesContext);
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

* But that is an extra element we don't need
* So we can not generate that extra element and use Fragment instead
* Sometimes you'll want that root element for styling purposes or sometimes you don't need it so you can remove it using [React Fragments](https://reactjs.org/docs/react-api.html#reactfragment)

`AddNoteForm.js`

```
import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context.js';

const AddNoteForm = () => {

  // MORE CODE

  return (
    <>
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
    </>
  );
};

export { AddNoteForm as default };
```

* That's how easy it is to use React Fragments if we need to

