# Error Handling
* Async errors
* bundling errors

## Three kinds of errors that handle when we bundle
1. bundling error (aka syntax error)
2. synchronous error
3. async error - not thrown immediately, gets thrown at some future point in time

`preview.tsx`

```
import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
}

const html = `
  <html>
  <head>
  <style>html { background-color: white; }</style>
  </head>
  <body>
  <div id="root"></div>
  <script>
  const handleErr = (err) => {
    const rootEl = document.querySelector('#root'); 
    rootEl.innerHTML = '<div style="color: red; font-weight: bold"><h4>Runtime Error</h4>' + err + '</div>';
    console.error(err);
  }

  window.addEventListener('error', (event) => {
    event.preventDefault();
    handleErr(event.error);
  });

  window.addEventListener('message', (event) => {
    try {
      eval(event.data);
    } catch (err) {
      handleErr(err);
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
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="preview" />
    </div>
  );
};

export default Preview;

```

## Show bundled errors using try/catch
`code-cell.tsx`

```
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

```

`preview.tsx`

```
import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
  <head>
  <style>html { background-color: white; }</style>
  </head>
  <body>
  <div id="root"></div>
  <script>
  const handleErr = (err) => {
    const rootEl = document.querySelector('#root'); 
    rootEl.innerHTML = '<div style="color: red; font-weight: bold"><h4>Runtime Error</h4>' + err + '</div>';
    console.error(err);
  }

  window.addEventListener('error', (event) => {
    event.preventDefault();
    handleErr(event.error);
  });

  window.addEventListener('message', (event) => {
    try {
      eval(event.data);
    } catch (err) {
      handleErr(err);
    }
  })
  </script>
  </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  // console.log(err);

  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="preview" />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;

```

`preview.css`

```
// MORE CODE

.preview-wrapper iframe {
  height: 100%;
  width: 100%;
}

.preview-error {
  position: absolute;
  top: 10px;
  left: 10px;
  color: red;
}


// MORE CODE
```

`bundler/index.ts`

```
// MORE CODE

  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    return {
      code: "",
      err: err.message,
    };
  }
};

export default bundle;
```
