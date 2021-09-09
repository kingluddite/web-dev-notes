# Issue with Eager Bundling
* We are going to bundle our code with every single key press
* This is very inefficient
* But we'll learn something
* Make this temp change

```
// MORE CODE

  const onClick = async (input: string) => {

        // MORE CODE

    }

  // MORE CODE

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => {
          onClick(e.target.value);
          setInput(e.target.value);
        }}
      ></textarea>
      <div>{/* <button onClick={onClick}>Submit</button> */}</div>

// MORE CODE
```

* Now we execute code bundling with every single key press

## Chrome Performance Monitoring tools
* We can monitor our app internally using CDTs
* Performance won't matter as our laptop could be modern
* But the amount of processing power is important
* So we won't use the built in performance tools
    - Instead we'll use the vertical 3 dots in CDTs > Performance monitor shows CCPU
    - There is also top of chrome 3 dots, more tools > task manager

```
import React from 'react';
import ReactDOM from 'react-dom';
console.log(React);
// MORE CODE
```

* And you will see a lot of CPU being used
* With every keypress we are expending a tremendous amount of battery power

## Lesson Learned
* We want to throttle how often we bundle our code
* But we want to remove a "bundle/submit" button but let them just type and it will bundle (but limit how many times the bundle is called)

* Make sure to undo the changes we just made:

`index.tsx`

```
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    // console.log(ref?.current);
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const rootEl = document.querySelector('#root'); 
          rootEl.innerHTML = '<div style="color: red; font-weight: bold"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      })
      </script>
    </body>
  </html>
  `;

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="preview" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```
