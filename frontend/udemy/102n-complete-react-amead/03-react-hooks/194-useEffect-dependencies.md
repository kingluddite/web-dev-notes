# useEffect Dependencies
* We will now learn how to conditionally fire an effect
* We'll experiment with this in our `count` example

`index.js`

```
// MORE CODE

ReactDOM.render(<App count={0} />, document.getElementById('root'));

// MORE CODE
```

* You will see `useEffect` is in our chrome console
* It ran one time
* That is great
* The title is updated and the only reason it is updated is `useEffect` already ran
* Whenever we click our buttons +1 or -1 or reset the title stays in sync with the `state`
* **important** But it will also run when we update the `word`
    - This is not really a problem now but React is doing more work than it needs to be doing
    - `useEffect` hook allows us to specify the things we care about (the things that we want to make sure when they change the effect runs)
        + This is accomplished via an array as the 2nd argument of `useEffect()`

`index.js`

```
// MORE CODE

  useEffect(() => {
    console.log('useEffect ran');
    document.title = count;
  }, [count]);

// MORE CODE
```

* **note** The second argument is optional
* By adding `[count]` we are "listing out our dependencies"
* If we leave it off useEffect will run when things change
* If I provide the `[]` and and can add `[count]` and this tells useEffect to only run when the `count` changes

## Test it out
* You click buttons and useEffect runs
* But if you type a word, useEffect does not run
* Now by using that array second argument we can specify effects to run only when we want them to

## Now we want to use useEffect() dependencies
* Just like with `useState()` we can use `useEffect()` hook as many times as we want to in a functional componenT
    - This it great!
    - In traditional CBCs we had a single place to set up `componentDidMount()` and everything that needed to happen when the component mounted needed to go inside `componentDidMount()` (even if it was separate unrelated features - all that stuff was jammed together)
    - But now with `useEffect()` we can call it several times each with it's own set of dependencies, keeping your app easy to maintain and really quick too!

## Only run once
* Now we can use `useEffect()` to only run once
* We do this by providing an empty array as the second option like this:

`index.js`

```
// MORE CODE

  useEffect(() => {
    console.log('this will only run once');
  }, []);

  useEffect(() => {
    console.log('useEffect ran');
    document.title = count;
  }, [count]);


// MORE CODE
```

* Test it out and you'll see that our log "this will only run once" only runs once
* Since the dependencies are empty this means there is nothing out there that will cause this to change
* Only running once is very useful and will come in handy if you are fetching or reading data
* We just set up a complete mirror of `componentDidMount()`

## Order useEffects run
* The run in the order they are listed in your code

## Challenge
* Use this knowledge with the noteApp

### Challenge Goal: Continue working with useEffect
1. Add dependencies to existing useEffect call
2. Call useEffect again to have it only run once
    - Use this to load the data from localStorage
    - **note** In our app we are loading the data from localStorage
        + That is a synchronous process so we can just use this code that we used before:

`index.js`

```
// MORE CODE

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem('notes'));
  const [notes, setNotes] = useState(notesData || []);

// MORE CODE
```

* But if we were loading the data from a real Database that would be an `asynchronous` process in which case we would have to use something like `componentDidMount()` or with hooks `useEffect()` to contain all of the code that fetches that data and gets the `state` up to date
* So in this challenge pretend we are getting the data from a Database and use `useEffect()` to set our data
    - Start `useState()` as an empty array and you'll change it in a useEffect call later on in your code
3. Test your work

```
import React, { useState, useEffect } from 'react';

// MORE CODE

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // MORE CODE

  useEffect(() => {
    console.log('getItem');
    const notesData = JSON.parse(localStorage.getItem('notes'));

    if (notesData) {
      setNotes(notesData);
    }
  }, []);

  useEffect(() => {
    console.log('setItem');
    const json = JSON.stringify(notes);
    localStorage.setItem('notes', json);
  }, [notes]);

  return (

      // MORE CODE 

  );
};

// MORE CODE

ReactDOM.render(<NoteApp />, document.getElementById('root'));

// MORE CODE
```

* Now the app works like it did before but we only load our data from localStorage once and we only update our state when our notes change
* We did add 6 lines in our useEffect when we only used 2 lines up above but the reason is to get you comfortable with this API in a simple example so when you use it in a more complex example, you'll recognize these patterns
    - The pattern we just used is what we would use if we were fetching our data from a Database

1. You fetch the data
2. You have some sort of Promise or callback
3. And once you get the data you would call `setNotes(data)`
