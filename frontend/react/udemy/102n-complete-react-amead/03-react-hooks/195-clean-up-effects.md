# Clean up effects
* We can also use useEffect to mimic `componentDidUnmount()`
    - This LCM would fire when our component was being unmounted and removed from the screen
    - We can do something similar with useEffect

## Currently our app is made of one a single component
* So nothing is getting unmounted
* To test our `componentDidUnmount()` behavior we'll create a separate component with the individual note
* We'll remove our counter example

`src/NoteItem.js`

```
import React, { setNotes } from 'react';

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

`index.js`

```
// MORE CODE

import NoteItem from './NoteItem';

const NoteApp = () => {

  // MORE CODE

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

        // MORE CODE

      </form>
    </div>
  );
};

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// MORE CODE
```

* Our app will work just like it did before but now we can test the `componentWillUnmount()` behavior

## Now we'll clean up our effects
* Provides similar behavior to `componentWillUnmount()`

`NoteItem.js`

```
import React, { useEffect } from 'react';

const NoteItem = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect');
  });

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

* You won't see the effect if not notes are in `localStorage`
* But if you add a note you will see `Setting up effect`
* If you refresh page you will see `Setting up effect` because we are loading a note from localStorage

## Houston we have a problem
* Now if we type letters in our boxes we'll fire the `useEffect()` because we did not list any dependencies
    - The parent component to Note is indeed having some state changed
    - The title state is being changed, then the component is being re-rendered to reflect those changes rendering them to the text field in the value field

`index.js`

```
// MORE CODE

          <input value={title} onChange={e => setTitle(e.target.value)} />

// MORE CODE
```

* Our other `useEffect()` are not suffering from this "firing too much" effect because we have listed dependencies (provided 2nd array option to useEffect)
* We could pass `note` as a dependency but we currently have no way to edit the note so the not would never change so we won't add this as a dependency (so we'll just leave it as an empty array)

`NoteItem.js`

```
// MORE CODE

import React, { useEffect } from 'react';

const NoteItem = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect');
  }, []);

// MORE CODE
```

* Now we'll only run this `useEffect()` once when the component is first mounted

## Test it out
* You can add a note and now it will fire when note is added but not everytime we type letters in the input or textarea
* **tip** When using `useEffect` make sure you are explicit with your dependencies

## How you can register a function to "clean up" a given effect
* It is slightly different than `componentWillUnmount()` but the general idea is the same

### How do you register this clean up function
* By returning a function from the function use passed to useEffect()

![function](https://i.imgur.com/LCsgB3G.png)

* The above function sets up the effect
* This function I'm returning cleans up the effect

`NoteItem.js`

```
// MORE CODE

import React, { useEffect } from 'react';

const NoteItem = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting up effect');

    return () => {
      console.log('Cleaning up effect!');
    };
  }, []);

// MORE CODE
```

* Now if you have a note and click to remove it you will then see `Cleaning up effect!` because the `NoteItem` was removed
* Now we know how to run some code just after a component was removed

## Recap
* We just covered the 3 main features of `useEffect`

1. Registering the effect itself
2. Registering a clean up function (optional)
3. Registering your dependencies array (optional)

* So we now have similar behavior we had before but now in a more ideal way
    - Being able to call `useEffect()` multiple times with different dependencies allows us to keep complex components simple and easy to work with
