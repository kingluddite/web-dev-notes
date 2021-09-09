# Refactor
## Preview Component
`components/preview.tsx`

```
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="preview" />;
};

export default Preview;
```

`src/index.tsx`

```
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const ref = useRef<any>();
  const [code, setCode] = useState('');
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

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## Test in app
`console.log(123);` and Submit and you'll see 123 in console of CDT

* We can remove `textarea` as all our code is coming now from our code editor

## Refactor our esbuild
`src/bundler/index.ts`

```
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esbuild.Service;

export default async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  return result.outputFiles[0].text;
};
```

`index.tsx`

```
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

## Test
* Works the same
* But our code is more modular and reusable
* Make sure to also test bundling logic

```
import React from 'react';

console.log(React);
```

## Fix warning
* `Assign arrow function to a variable before exporting as module default`
    - Warning telling you that if you export without a variable it is harder to debug to because it is hard to figure out where that function is coming from
    - here's how we fix it
        + We name it and export it like this:

```
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });

  return result.outputFiles[0].text;
};

export default bundle;
```

## Organize our code better
* All the plugins are for our bundler so let's put that folder inside the bundler folder
* Drag and drop `plugins` folder inside `bundler` folder and agree to update the paths (VS code is saving you time!)
* Test to make sure app still works

## Multiple editors and preview windows
* We have a code editor component and preview component
* Our app is wrapped around them

`index.tsx`

```
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';
const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

`components/code-cell.tsx`

```
import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
```

## Test
* Should work as before

## Put 2 code editors and test they both work
```
// MORE CODE

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};
// MORE CODE
```


