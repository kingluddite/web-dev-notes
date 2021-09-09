# Add Debouncing Logic
* What is debouncing?
    - When you want to allow some function or some code to run as much as possible and then only after some period of time elapses we then want to do some other process

   ![diagram of debouncing logic](https://i.imgur.com/HK8NDdI.png)
   
```
// MORE CODE

import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">

// MORE CODE
```

## Bug
```
const root = document.querySelector('#root');
root.innerHTML = 'asdfasdfa'
```

* If you type that in UI you will see a flash of text

## Fix - delay code execution with setTimeout
```
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

```

* and now it no longer flashes and stays
