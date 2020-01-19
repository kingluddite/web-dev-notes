# useState vs setState
* In FC (functional components) state does not need to be an object (like in CBC) when using `useState` with React Hook
    - In our previous notes page, we set the state to a number
    - This is a huge improvement to only setting state to an object

## But what if I need to track more than one thing?
* Then do I need to convert useState to an object?
    - No
    - But there is a use case where you'll pass an object to `useState`
* In General React recommends calling `useState` multiple times to the multiple pieces of state you are tracking
    - This will see cumbersome at first with multiple calls to `useState` littering your code base
    - But later when you learn how to create `custom hooks` we'll clean all of the `useState` littered code up

## Let's track another piece of state
* We will allow the user to customize the input
    - Instead of hard coding `count`
        + We'll give end user the ability to dynamically change it by adding one more pieces of state
        + The input we are tracking will be a String

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

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

// MORE CODE
```

* Now if you leave input blank it will default to `count`
* If you type a word inside the input it will change the dynamic `word` to be whatever was typed into the input box

## That is how you use `useState` to track multiple pieces of state

## Bad habit
* People try to create what they are used to in CBCs
* Sounds like a good idea now to make our FCs work like CBCs but as we learn more about hooks doing it the old way will limit what we can do with hooks

## Demo of combining 2 calls to useState into 1 call to useState
* Like we would set it up in a CBC

`index.js`

```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = props => {
  // const [count, setCount] = useState(props.count);
  // const [word, setWord] = useState('test');

  const [state, setState] = useState({
    count: props.count,
    word: '',
  });

  return (
    <div>
      <p>
        The current {state.word || 'count'} is {state.count}
      </p>
      <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
      <button onClick={() => setState({ count: props.count })}>reset</button>
      <button onClick={() => setState({ count: state.count - 1 })}>-1</button>
      <input
        value={state.word}
        onChange={e => setState({ word: e.target.value })}
      />
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

App.defaultProps = {
  count: 0,
};

ReactDOM.render(<App count={10} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

* We comment out the old code to show the new code
* Remember the reset sets the count back to 10
* If you click the buttons they work as expected

### But the problem is...
* When I try to change multiple pieces of state with a single function call
* If you type in the input `test` it will change the word to `test` but we lose our count
    - And then if I try to use the buttons again the word state is no longer being tracked correctly
    - Since there is a difference between the two pieces of state this is a problem
* **note** Whenever we use `useState` whenever we try to change the state `setState` it is not trying to merge those objects, it is instead overwriting them (it completely replaces the old state with the new state)
    - This makes things much less error prone
    - It allows us to break up our big state objects into individual values
* So the pattern we are used to actually no longer works as expected

```
// MORE CODE

      <button onClick={() => setState({ count: state.count + 1 })}>+1</button>
      <button onClick={() => setState({ count: props.count })}>reset</button>
      <button onClick={() => setState({ count: state.count - 1 })}>-1</button>

// MORE CODE
```

* Above
    - When I try to increase the count I am changing the count but I'm also replacing the object with this object `{count: state.count + 1}` which means that `word` is no longer defined
    - The same is true when I try to set `word` here:

```
// MORE CODE

      <input
        value={state.word}
        onChange={e => setState({ word: e.target.value })}
      />

// MORE CODE
```

* I'm not specifying count above so that completely goes away

## How to work around this limitation
* Use the spread operator

`index.js`

```
// MORE CODE

  return (
    <div>
      <p>
        The current {state.word || 'count'} is {state.count}
      </p>
      <button onClick={() => setState({ ...state, count: state.count + 1 })}>
        +1
      </button>
      <button onClick={() => setState({ ...state, count: props.count })}>
        reset
      </button>
      <button onClick={() => setState({ ...state, count: state.count - 1 })}>
        -1
      </button>
      <input
        value={state.word}
        onChange={e => setState({ ...state, word: e.target.value })}
      />
    </div>
  );
};

// MORE CODE
```

* The above code will not work
* **note** But this is no longer recommended to store all of your `state` on a single object with a single call to `useState`
    - Instead it is recommended to call `useState` multiple times with the pieces of state you are tracking

## 3 Takeaways
1. `state` doesn't need to be an object with `useState`
2. You can call use `state` as many times as you need to in a given component for all of the things you want to track
3. When you are using `useState` and you update the state it completely replaces what was there before (as opposed to how state worked in the past with object were the data was merged)

## Next
* Work through more complex examples with `useState`
    - An array of objects that we want to keep track of and we also want the use to manipulate
