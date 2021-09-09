# Plan for the text cell
## npm markdown editor
* @uiw/react-md-editor
* A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on textarea encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc.
* [demo](https://uiwjs.github.io/react-md-editor/)

## Download
`$ npm i --save-exact @uiw/react-md-editor@2.1.1`

`components/text-editor.tsx`

```
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  return <div />;
};

export default TextEditor;
```

`src/index.tsx`

```
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <div>
      <TextEditor />
      {/*<CodeCell /> */}
      {/*<CodeCell /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

```

`text-editor.tsx`

```
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  return (
    <div>
      <MDEditor />
    </div>
  );
};

export default TextEditor;
```


