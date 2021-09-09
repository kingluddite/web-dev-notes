# Toggle Markdown editor
```
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div>
        <MDEditor />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;

```

* And we'll add an event listener on the `body` element of our document
* We'll add a listener inside a `useEffect` hook
* Then anytime a user clicks anywhere on the DOM, that click event will bubble up into our body element and we can use that to detect a click on anything else inside our document

```
import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = () => {
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  });
  if (editing) {
    return (
      <div>
        <MDEditor />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
```

## Houston we have a problem!
* When we are inside our edit window the click event works and switches us to preview - we need to fix this

### Find out what element a user clicked on
```
} from 'react';
import MDEditor from '@uiw/react-md-editor';
import { log } from 'console';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      console.log(event.target);

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  });

// MORE CODE
```

* html or textarea or h1

## Determine if user is clicking on `<MDEditor />`

```
// MORE CODE

  if (editing) {
    return (
      <div>
        <MDEditor />
      </div>
    );
  }

// MORE CODE
```

* But better would be to detect the parent `<div>` if that was clicked on 
    - We can add a `ref` to it

## And here it is working (with some logs to check)

```
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { log } from 'console';

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        console.log('element clicked on is inside editor');
        return;
      }
      console.log('element clicked is not inside editor');

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  });
  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
```

* remove the logs

## CSS conflict with 3rd party Bulma
* Fix

`text-editor.tsx`

```
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';

// MORE CODE
```

`text-editor.css`

```
.w-md-editor .title {
  font-size: unset;
  line-height: unset;
  font-weight: unset;
}
```

## Fix vertical divider going down too far

## Dark theme
```
.w-md-editor .title {
  line-height: unset;
  font-size: unset;
  font-weight: unset;
  color: #d4d4d4 !important;
}

.w-md-editor ul {
  line-height: 1;
}

.text-editor .w-md-editor-bar svg {
  display: none;
}

.text-editor .w-md-editor-bar {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
  height: 11px;
  cursor: row-resize;
  background-color: #37414b;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 100%;
  position: relative;
}

.text-editor em {
  font-style: italic;
}

.text-editor .wmde-markdown hr {
  border-top: 1px solid #dee5ed;
}

.text-editor .wmde-markdown ol {
  list-style: decimal;
}

.text-editor .w-md-editor-show-live {
  /* Hide menu bar buttons to prevent accidental delete */
  z-index: 20;
}

.text-editor .w-md-editor-toolbar {
  background-color: #37414b;
  border-bottom: 1px solid gray;
}

.text-editor .w-md-editor-toolbar li button {
  color: #d4d4d4;
}

.text-editor .w-md-editor-content {
  background-color: #202123;
}

.text-editor .w-md-editor,
.text-editor .w-md-editor .w-md-editor-text-pre {
  color: #d4d4d4;
}

.text-editor .w-md-editor-text-pre .bold {
  color: unset;
}

.text-editor .token.list.punctuation {
  background-color: unset;
}
```

