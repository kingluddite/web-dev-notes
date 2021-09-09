# Demo App
## Build our new CRA
`$ npx create-react-app jbook --template typescript`

### Install ESBuild
`$ npm i --save-exact esbuild-wasm@0.8.27`

## Delete all CRA files inside src
`src/index.tsx`

```tsx
import ReactDOM from 'react-dom';

const App = () => {
  return <h1>hi</h1>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## Run it
`$ npm start` and you'll see `hi` in the browser


## Add basic form elements
```tsx
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <textarea></textarea>
      <div>
        <button>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```
## Modify to allow to type into textarea and see text
* And when you submit you see a log of what you typed in textarea

`index.tsx`

```
import { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

# Next
1. Type ES6 in textarea
2. Click on Submit
3. Use ESBuild to transpile and bundle it
4. And show result(javascript) in `pre` HTML element
