# Using refs for any arbitrary values
* We use `refs` in react to get a reference to any React component
* **note** You can use a `ref` to keep a reference to any kind of JavaScript value inside a component (not just to a component itself)

## Add our ref with the `useRef()` hook
* We will assign a type to this ref the easy `<any>` for now
* **note** Using `ref` avoids the re-render

```
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
// MORE CODE
```

## ref.current
* Now after calling our `startService()` we can refer to `ref.current` anywhere in our component

```
// MORE CODE

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
// MORE CODE
```

* We always check to make sure there is a `ref.current`
* Now when we click on the button we get our service

```
// MORE CODE

const onClick = () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }
    console.log(ref.current);
  };

  return (
    <div>
      <textarea
// MORE CODE
```

# Now we call the transform
* Tell it is `jsx` we are transforming
* Into `es2015`

```
// MORE CODE

  const onClick = () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    const result = ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    console.log(result);
  };
// MORE CODE
```

* But when we click we get `Promise{<pending>}` which means we need to use async/await

```
// MORE CODE

  const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    console.log(result);
  };
// MORE CODE
```

## Test
* Click button
    - You'll see code(the code that was transpile), map and warnings

## Now update our state using setCode
```
// MORE CODE

 const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code); // add!
  };
// MORE CODE
```

## Test
* Enter some JSX into form

```
const App = () => <div>yo</div>
```

* Submit and you'll see ES2015 on screen
* All JSX was removed and replaced with transpiled ES2015 code

### We can also test advanced JavaScript
`async () => {}` - enter in form and submit and you'll get a lot of JavaScript 2015

* It will handle spread syntax `const b = { ...{ color: 'red' }}`

## Next - dealing with bundling
* If we type `import react from 'react'` and submit we see that doesn't get transpiled


