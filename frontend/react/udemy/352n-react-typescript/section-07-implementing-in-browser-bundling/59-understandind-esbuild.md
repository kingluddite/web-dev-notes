# Understanding ESBuild
## [esbuild docs for Transform API](https://esbuild.github.io/api/#transform-api)
* You will see tabs for CLI, JS and GO
* What is GO?
    - The entire esbuild tool is written in GO
    - We installed a version of esbuild called esbuild-wasm
        + What is wasm?
            * web assembly (this is a feature supported in many modern browsers - that allows you to execute compiled C, C++, C#, Rust and Go code)
            * We'll write a small amount of JavaScript and it will send the code to WASM binary, this is all the GO code of Esbuild, compiled to work inside the browser
            * using WASM to work with compiled Go code will make our app work super fast

## Access our code 
* In `node_modules`
    - `esbuild-wasm/esbuild.wasm`
    - Copy that file and paste it into the public folder
        + We do that because we need that code in our browser
* Every file placed inside `public` can be easily accessed in the browser

### Now import it
```
import * as esbuild from 'esbuild-wasm';
import { useState } from 'react';

// MORE CODE
```

* And use the code
    - The following says go into that public directory, find `esbuild.wasm`
    - That will give us back a service object and we'll use that to bundle, transpile and compile all our code

```tsx
// MORE CODE

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
    console.log(service);
  };

// MORE CODE
```

* We need to call this `startService` only once, when our app first loads
    - This is perfect for the useEffect hook

```tsx
// MORE CODE

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
    console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);
// MORE CODE
```

## Test it out - you will see (after a brief pause) a object with some functions inside it:
* We will use the `build` and `transform` functions
    - transform is only for transpiling
    - If we want to bundle our code we'll use build

![build functions from esbuild](https://i.imgur.com/KjJfVMK.png)
