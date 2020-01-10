# Creating Custom Hooks
* This is just a function we define that using the built in React hooks behind the scenes
    - This will make it possible to extract complex logic
    - And to reuse that logic across components

## Add a function we may need in multiple places
* We'll start inside our NoteItem component

### We'll need to add 3 pieces of functionality
1. Setup `state` to track **x** and **y** positions (we'll use `useState` for this)
2. Setup event to listen for mouse movement (no React hook needed for this)
3. To free up resources we need to remove the event when the component is unmounted (We'll use the `useEffect` React built in hook)

`NoteItem.js`

```
// MORE CODE

import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);

  // We could put this custom code here but it would not be reusable
  return (
    <div>
      <h3>{note.title}</h3>

// MORE CODE
```

* The NoteItem component doesn't need to know about this function, it just needs to know the `x` and `y` position
* We'll start by including the custom hook in the NoteItem.js file just to see how it works and then we'll extract it into it's own file (where we can put all our custom hooks)

## Our first custom hook
* Remember - custom hooks are just functions just like React built in hooks

### Recommended Naming Convention for Hooks
* A common naming convention for React hooks is to preface the hook name with `use` (ie **useMousePosition**)

`NoteItem.js`

```
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  //
};

const NoteItem = ({ note }) => {

// MORE CODE
```

* Instead of writing our custom code inside our functional component we place it outside
* **Note** It is recommended to call `useState()` for of the different things we want to track in our `state` but in this example we will pass `useState()` an object because we will be tracking both `x` and `y` at the same time

`NoteItem.js`

* **note** We import the `useState` built-in hook

```
// MORE CODE

import React, { useContext, useState } from 'react'; // update this line
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  useState({ x: 0, y: 0 }); // update this line
};

const NoteItem = ({ note }) => {

// MORE CODE
```

* Now we'll destructure the variable name and how we'll set it

`NoteItem.js`

```
// MORE CODE

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
};

// MORE CODE
```

* Now we need to return what the component needs which is position

`NoteItem.js`

```
// MORE CODE

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return position;
};

// MORE CODE
```

* **remember** The component itself doesn't care about the implementation details, all it wants is an up to date cursor position

## We still have more stuff we want to do with our custom hook but let's call what we have so far
### Here's how we call a custom hook
* We won't pass in any arguments to our custom hook but we could pass in any if we want

`NoteItem.js`

```
import React, { useContext, useState } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return position;
};

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  // We could put this custom code here but it would not be reusable
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        Position X: {position.x}, Position Y: {position.y}
      </p>
      <button
        onClick={() => dispatch({ type: 'REMOVE_NOTE', title: note.title })}
      >
        remove
      </button>
    </div>
  );
};

export default NoteItem;
```

* Notes:
    - The hooks from React that we are using are not defined in our functional component
    - But they are defined in a function that our functional component calls and that's what makes a custom hook
    - This is valid and a real design pattern recommended in the React docs

## Now we need to listen for mouse movements
`NoteItem.js`

```
import React, { useContext, useState, useEffect } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  console.log('Setting up event');
  document.addEventListener('mousemove', e => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    });
  });
  return position;
};

// MORE CODE
```

## Houston we have a problem!
* If you run that all will be well until you move your mouse and then because we are constantly adding the listener with every mouse movement our app will freeze when we get to 4000+ added listeners
* To fix this problem we need to free up resources and remove the event when our component unmounts and we'll use the built in `useEffect` React hook to accomplish this

### Houston we have a problem
* Make sure you don't put the return inside the useEffect

`NoteItem.js`

```
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Setting up event');
    document.addEventListener('mousemove', e => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    });
  });
  return position;
};

// MORE CODE
```

## Houston we have a problem
* Our app crashes
* We just add the empty array to add dependencies and this will keep our this only running once
* Now our code works if you test in browser

`NodeItem.js`

```
import React, { useContext, useState, useEffect } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Setting up event');
    document.addEventListener('mousemove', e => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    });
  }, []);
  return position;
};

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  // We could put this custom code here but it would not be reusable
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        Position X: {position.x}, Position Y: {position.y}
      </p>
      <button
        onClick={() => dispatch({ type: 'REMOVE_NOTE', title: note.title })}
      >
        remove
      </button>
    </div>
  );
};

export default NoteItem;
```

* Add a note
    - You'll see it works
    - And it fires `Setting up event` log again which is what we expected

## Try to remove one of the notes
### Houston we have a problem
* We removed the note but not the listener and you get this error `Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To `

### Solution - Clean up our event listener when our component is unmounted
* To accomplish this we return a function like we did before
* We'll use `document.removeEventListener(provide the name of the event listener, we also have to provide the function (not the same function typed up again, but instead the same function defined in memory`
* So we'll store our event in a variable and reference it when we add the event listener and remove the event listener like this:

`NoteItem.js`

```
import React, { useContext, useState, useEffect } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = e => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
    console.log('Setting up event');
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return position;
};

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  // We could put this custom code here but it would not be reusable
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        Position X: {position.x}, Position Y: {position.y}
      </p>
      <button
        onClick={() => dispatch({ type: 'REMOVE_NOTE', title: note.title })}
      >
        remove
      </button>
    </div>
  );
};

export default NoteItem;
```

* Test and it should work as before
* We can add and remove notes
* We don't freeze up our browser and we are using event listeners efficiently

## Reuse custom hooks
* Now we can put this custom hook in its own file
* We'll create `src/hooks` and put `useMousePosition.js` inside that folder

`NoteItem.js`

```
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';
import useMousePosition from '../hooks/useMousePosition';

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  // We could put this custom code here but it would not be reusable
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        Position X: {position.x}, Position Y: {position.y}
      </p>
      <button
        onClick={() => dispatch({ type: 'REMOVE_NOTE', title: note.title })}
      >
        remove
      </button>
    </div>
  );
};

export default NoteItem;
```

`src/hooks/useMousePosition.js`

```
import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = e => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
    console.log('Setting up event');
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return position;
};

export { useMousePosition as default };
```

* Test and it should work like it did before but now we can use useMousePosition wherever we want

## Add useMousePosition on AddNoteForm
`AddNoteForm.js`

```
import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context.js';
import useMousePosition from '../hooks/useMousePosition';

const AddNoteForm = () => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const position = useMousePosition();

  const addNote = e => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

  return (
    <>
      <p>Add note</p>
      <p>
        Position X: {position.x}, Position Y: {position.y}
      </p>

// MORE CODE
```

* Now we easily added the position custom hook to that AddNoteForm component
