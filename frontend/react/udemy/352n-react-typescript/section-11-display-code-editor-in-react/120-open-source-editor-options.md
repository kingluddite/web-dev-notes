# Open Source Editor Options
* CodeMirror
    - Easy to use
    - Doesn't have as many out-of-the-box-features
* Ace Editor
    - Somewhat easy to use
    - Widely used
* Monaco Editor
    - Hardest to setup
        + But we will use a React Component that takes care of all this hard setup for us
    - Gives an almost-perfect editing experience immediately
        + autocomplete
        + syntax highlighting
    - Same editor used inside VS Code

## Install monaco
`$ npm i --save-exact @monaco-editor/react@3.7.5`

* [monaco editor docs](https://www.npmjs.com/package/@monaco-editor/react)
    - **note** Inside this editor there are 3 editors
        + editor (we are going to use this editor component)
        + diff editor
            * This is used anytime you want to compare the differences between two files
        + controlled editor
            * remember controlled form elements in react
                - in our texterea

## What is a `controlled` input?
* example of a controlled form element

## We won't use the controlled editor
* It is slower
* The docs recommend against using it

## Create our code editor component
`src/components/code-editor.tsx`

```
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return <MonacoEditor />;
};

export default CodeEditor;
```


```
// MORE CODE

      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>

// MORE CODE
```

* A controlled form input is when we are pushing a value into that element `value={input}` and whenever that value changes (when anyone types inside the textarea) we call some callback `onChange` and update a piece of state `setInput(e.target.value)`
    - When we update that piece of state it causes our component to re-render
    - We then take the updated value and we push that value back down into the `<textarea>`
* **summary of controlled input** - It's this whole cycle of updates that makes some textarea, input, or whatever else a controlled input

* Import the editor and place it inside

```
// MORE CODE

  return (
    <div>
      <CodeEditor />
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>

// MORE CODE
```

* You won't see it as only 5px of height is shown by default
* Add a prop of some height

```
// MORE CODE

import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return <MonacoEditor height="500px" />;
};

export default CodeEditor;

// MORE CODE
```

* You will now see the editor

## Configure the editor
* Open the type definition file for the react component
* **note** <kbd>cmd</kbd> + <kbd>click</kbd> will open that component in VS Code `index.d.ts`
    - EditorProps will show you all the props you can enter to customize it
    - That will show us one prop is `language`
    - Let's set it to javascript

```
// MORE CODE

const CodeEditor = () => {
  return <MonacoEditor language="javascript" height="500px" />;
};
// MORE CODE
```

## Autocomplete!
* View in UI and type `window.` or `console.` and you will see dropdowns with all properties and methods associated with those objects
    - This is amazing!

## syntax highlighting
`import React from 'react';`

* If you don't use that import it fades to let you know you are not using that import

## A bit of linting
If you just write `import` it will give you a red squiqqly error line

## Use a dark theme
```
// MORE CODE

const CodeEditor = () => {
  return <MonacoEditor theme="dark" language="javascript" height="500px" />;
};

// MORE CODE
```

## Toggle off minimap (done with `options`)
* Our editor is a react component wrapped arount the original editor
* We'll need to dive into the original editor to make these changes

## Automatically wrap long lines of code (done with `options`)
* **note** the monacoEditor type definition files are hard to read
* **note** "For TypeScript type definitions, this package uses the monaco-editor package as a peer dependency. So, if you need types and don't already have the monaco-editor package installed, you will need to do so" (from docs)

`$ npm i monaco-editor`

* Now after doing this we should be able to cmd+click to open `monacoEditor.editor.IEditorConstructionOptions`
* Click on `IEditorOptions`
    - wordWrap (off by default and we'll set it to `on`)

```
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <MonacoEditor
      theme="dark"
      language="javascript"
      height="500px"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  );
};

export default CodeEditor;
```

## Setting initial values
```
// MORE CODE

const CodeEditor = () => {
  return (
    <MonacoEditor
      value="const a = 1;"
      theme="dark"
// MORE CODE
```

* **value** is really initialValue
* the component loads the value loads and then it falls of the face of the earth

## Define an interface
* To describe all the props that our component will receive

```
// MORE CODE

import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <MonacoEditor
      value={initialValue}
// MORE CODE
```

* And update this:

`index.tsx`

```
// MORE CODE

  return (
    <div>
      <CodeEditor initialValue="const a = 1;" />
      <textarea
// MORE CODE
```

* Add this

```
// MORE CODE

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
// MORE CODE
```

```
// MORE CODE

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount = (getValue: () => string) => {
    console.log(getValue());
  };

  return (
// MORE CODE
```

* View in console and see `> const a = 1;`
* We see the initialValue when component loads but subsequent changes to our code inside the editor do not update

```
// MORE CODE

import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      console.log(getValue());
    });
  };
// MORE CODE
```

* And now we see logs of changes to our editor

## now we can use our `onChange`
```
// MORE CODE

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };
// MORE CODE
```

## Test
1. Write code
2. Attempt to bundle it
3. Then look at bundled output

`console.log('yo')` 

* Scroll down and we get the same code we wrote because it is using the same state
* Click `submit`
* And the log shows us we are bundling our code

```
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };
// MORE CODE
```

## Tab only 2 spaces
```
// MORE CODE

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };
// MORE CODE
```

## Format with prettier
* Prettier can be executed:
    - From the Command Line
    - Or Programatically (we'll use this option)
        + We want to get direct access to prettier
        + We want to feed it some code
        + Then have prettier immediately give back the code and format it 

### Install prettier and prettier types too
`$ npm i prettier @types/prettier`

```
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
// MORE CODE
```

* And now make it work with:

```
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
```

## Test
* Indent code and click Format and it should format it
* Grab some code, unindent it, and see if it formats
* Add new lines and it should remove them on Format

## Add some CSS
* We'll add a little CSS library called `bulmaswatch`
    - Has all the CSS and a couple themes inside it too

`$ npm i bulmaswatch`

```
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
// MORE CODE
```

## Test
* Looks better and matches our theme of our editor

`code-editor.tsx`

```
// MORE CODE

  return (
    <div>
      <button
        className="button button-format is-primary is-small"
// MORE CODE
```

## Add in some custom CSS
```
// MORE CODE

return (
    <div className="editor-wrapper">
      <button
// MORE CODE
```

`code-editor.css`

```
.editor-wrapper {
  position: relative;
  height: 100%;
}

.editor-wrapper .button-format {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.3s;
}

.editor-wrapper:hover .button-format {
  opacity: 1;
}
```

* Format button now appears when you hover over editor and disappears when you are not over editor

## Get rid of new line
* Prettier adds a newline after formatting
* We can replace the new line character using a regular express that replaces the newline with an empty string

`code-editor.tsx`

```
// MORE CODE

// format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, ''); // ADD this!

// MORE CODE
```

## You are getting almost no syntax highlighting for react
* We will fix this now
* Our solution is not great
* We will use a 3rd party package that can break in the future
* Use at your own risk

### Install these 3 things
`$ npm i --save-exact monaco-jsx-highlighter@0.0.15 jscodeshift@0.11.0 @types/jscodeshift@0.7.2`

```
// MORE CODE

import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
// MORE CODE
```

* We get a red error because we are using a library that doesn't have typescript so we will need to write something like this to get rid of the error

`types.d.ts`

```
declare module 'monaco-jsx-highlighter'
```

* That will get rid of our error message

`code-editor.tsx`

* `// @ts-ignore` ignore the following line to turn off typescript error

```
// MORE CODE

const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent();
  };

  const onFormatClick = () => {
// MORE CODE
```

## Problem!
* Type `const App =` and you'll see lots of console log warning
* On every key our 3rd party is trying to highlight code that isn't finished, we need to turn this off

```
// MORE CODE

   highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
// MORE CODE
```

* Test again and no more warnings

## Also test and see we now can get syntax highlighting for react
```
const App = () => {
  return <div>
  <h1>one</h1>
  <button onClick={() => console.log('click')}>Click me</button>
  </div>
}
```

* Click format!

`components/syntax.css`

```
.editor-wrapper .mtk1 {
  color: #d4d4d4;
}
.editor-wrapper .mtk2 {
  color: #1e1e1e;
}
.editor-wrapper .mtk3 {
  color: #000080;
}
.editor-wrapper .mtk4 {
  color: #6a9955;
}
.editor-wrapper .mtk5 {
  color: #569cd6;
}
.editor-wrapper .mtk6 {
  color: #b5cea8;
}
.editor-wrapper .mtk7 {
  color: #646695;
}
.editor-wrapper .mtk8 {
  color: #c586c0;
}
.editor-wrapper .mtk9 {
  color: #9cdcfe;
}
.editor-wrapper .mtk10 {
  color: #f44747;
}
.editor-wrapper .mtk11 {
  color: #ce9178;
}
.editor-wrapper .mtk12 {
  color: #6796e6;
}
.editor-wrapper .mtk13 {
  color: #808080;
}
.editor-wrapper .mtk14 {
  color: #d16969;
}
.editor-wrapper .mtk15 {
  color: #dcdcaa;
}
.editor-wrapper .mtk16 {
  color: #4ec9b0;
}
.editor-wrapper .mtk17 {
  color: #c586c0;
}
.editor-wrapper .mtk18 {
  color: #4fc1ff;
}
.editor-wrapper .mtk19 {
  color: #c8c8c8;
}
.editor-wrapper .mtk20 {
  color: #cd9731;
}
.editor-wrapper .mtk21 {
  color: #b267e6;
}
.editor-wrapper .mtki {
  font-style: italic;
}
.editor-wrapper .mtkb {
  font-weight: bold;
}
.editor-wrapper .mtku {
  text-decoration: underline;
  text-underline-position: under;
}

.editor-wrapper .mtk100.Identifier.JsxElement.Bracket {
  color: #0080ff;
}

.editor-wrapper .mtk1000.Identifier.JsxOpeningElement.Bracket {
  color: #808080;
  font-weight: bold;
}

.editor-wrapper .mtk1001.Identifier.JsxClosingElement.Bracket {
  color: #808080;
  font-weight: lighter;
}

.editor-wrapper .mtk101.Identifier.JsxOpeningElement.Identifier {
  color: #569cd6;
}

.editor-wrapper .mtk102.Identifier.JsxClosingElement.Identifier {
  color: #569cd6;
  font-weight: lighter;
}

.editor-wrapper .mtk103.Identifier.JsxAttribute.Identifier {
  color: #9cdcfe;
}

.editor-wrapper .mtk104.JsxElement.JsxText {
  color: darkgoldenrod;
}

.editor-wrapper .mtk105.glyph.Identifier.JsxElement {
  background: #61dafb;
  opacity: 0.25;
}

.editor-wrapper .mtk12.Identifier.JsxExpression.JsxClosingElement {
  color: #ec5f67;
}

.editor-wrapper .mtk12.Identifier.JsxSelfClosingElement {
  color: #ec5f67;
}
.editor-wrapper .mtk12.Identifier.VariableStatement.JsxClosingElement {
  color: #ec5f67 !important;
}
.editor-wrapper .mtk12.VariableStatement.JsxSelfClosingElement.Identifier {
  color: #ec5f67;
}
.editor-wrapper .mtk12.Identifier.JsxAttribute.VariableDeclaration {
  color: crimson;
}
.editor-wrapper .mtk12.JsxExpression.VariableStatement {
  color: #fac863;
}
.editor-wrapper .mtk12.VariableStatement.JsxSelfClosingElement {
  color: #ede0e0;
}
.editor-wrapper .mtk12.VariableStatement.JsxClosingElement {
  color: #ede0e0;
}
.editor-wrapper .JsxText {
  color: #0c141f;
}
```

* Import the css

```
// MORE CODE

import Highlighter from 'monaco-jsx-highlighter';
import './syntax.css';

interface CodeEditorProps {
// MORE CODE
```

* Test and see we have a nicer styled editor

