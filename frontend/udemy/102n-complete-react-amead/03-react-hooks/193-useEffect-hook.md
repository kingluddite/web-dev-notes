# The useEffect hook
* Allows us to do something in functional components that we were previously not allowed to do
* Think of it like a replacement for Life Cycle Methods (LCMs) for our CBCs
    - Like
        + componentDidMount
        + componentDidUnmount
        + componentDidUpdate
* `useEffect` is one of the core hooks available in React

### Here is how you import `useEffect`
* (it is a named export)

`index.js`

```
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// MORE CODE
```

* We'll render `App` and work on our `count` app we were working on before

`index.js`

```
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// MORE CODE

const App = props => {
  const [count, setCount] = useState(props.count);
  const [word, setWord] = useState('test');

  return (
    <div>
      <p>
        The current {word || 'count'} is {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>reset</button>
      <input value={word} onChange={e => setWord(e.target.value)} />
    </div>
  );
};

ReactDOM.render(<App count={0} />, document.getElementById('root'));

// MORE CODE
```

## Basics of using useEffect
* We call useEffect and we pass to it a function
    - The function we pass is kind of a combination of `componentDidMount` and `componentDidUpdate`

```
// MORE CODE

const App = props => {
  const [count, setCount] = useState(props.count);
  const [word, setWord] = useState('test');

  useEffect(() => {
    console.log('useEffect ran');
  });

// MORE CODE
```

* You will see `useEffect ran` in your console
* Everything time you click `+1`, `-1` or `reset` you will see that log runs again
* Add letters to the input and it runs each time you type a letter

## When useEffect runs
* When we render our app component (passing an instance of `<App />` to **ReactDOM.render())
    - React behind the scenes will call this function (see screenshot below) with the correct props

![function called](https://i.imgur.com/VDW1qmD.png)

* The returned JSX is what gets rendered
* So:

1. React runs the function
2. We say we want to run this content to the screen

```
// MORE CODE

  return (
    <div>
      <p>
        The current {word || 'count'} is {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>reset</button>
      <input value={word} onChange={e => setWord(e.target.value)} />
    </div>
  );

// MORE CODE
```

3. Then React goes off and get the content rendered (it changes what's shown in the browser)
4. After that occurs the effect created with `useEffect` runs

```
// MORE CODE

  useEffect(() => {
    console.log('useEffect ran');
  });

// MORE CODE
```

* So this is similar to `componentDidMount()` and `componentDidUpdate()`
* It will run once right away and after changes to your component `state` or `props`
    - This is very useful because now we can do what we did with LCMs with CBCs in functional components

## Let's set our page title to be the count value
`index.js`

```
// MORE CODE

  useEffect(() => {
    console.log('useEffect ran');
    document.title = count;
  });

// MORE CODE
```

* The title says `0`
* Now when you change it, it will also update!

## Challenge
* Use the NoteApp

### Goal: Synchronize notes data with localStorage
* [reference](../01-part-foundation-react/05-stateless-func-components/45-saving-loading-options-data.md)
1. Read notes data from **localStorage**
    * hints: `JSON.parse()`
    * No data stored? Default to empty array
2. Call `useEffect` to update **localStorage** when notes array changes
    * JSON.stringify()
3. Test your work

### Solution
* We read from localStorage
* If it exists we add it to our state using `useState` or if not we set our state equal to an empty array
    - Test the code out in the browser and you should see an empty array inside `notes` inside localStorage
    - We are just reading we are never updating localStorage

```
import React, { useState, useEffect } from 'react';

// MORE CODE

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem('notes'));
  const [notes, setNotes] = useState(notesData || []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // MORE CODE

  return (

    // MORE CODE

  );
};

// MORE CODE

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// MORE CODE
```

## Update localStorage with `useEffect`
`index.js`

```
// MORE CODE

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem('notes'));
  const [notes, setNotes] = useState(notesData || []);
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

  useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem('notes', json);
  });

// MORE CODE
```

## Next - Customize `useEffect`
