# Markdown Editor
Enable the user to enter markdown
type and enter some code
we could use input or textarea but that would be boring

We will make it look like a real editor

[react-codemirror](https://github.com/JedWatson/react-codemirror)

**Managed by Jed Watson**

Check out [live Demo](https://github.com/JedWatson/react-codemirror)

## Install react-codemirror
`$ npm install react-codemirror --save`

We also need to style our react-codemirror so we need [CMStyle](https://atmospherejs.com/sgslo/cmstyle)

## Install CMStyle
`$ meteor add sgslo:cmstyle`

## Import CodeMirror
```
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror'; // Add this line
```

## We need to import something else
```
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown'; // add this line
```

**note** we are not assigning this import to a variable and we are just importing a path directly

* This import statement just imports and executes all the code that is written inside this file and it does not assign it to any variable. All we need this import for is to execute it's code

### Adding the editor
```
class BinsEditor extends Component {
  render() {
    return (
       <div className="col-xs-8">
         <h5>Input</h5>
         <CodeMirror options={{}}
       </div>
    );
  }
}
```

**note** We are using `{{}}` two sets of curly braces. The outer `{}` is letting us know we are about to pass a JavaScript variable or JavaScript Object and the inner `{}` is to create an actual object

```
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class BinsEditor extends Component {
  render() {
    return (
       <div className="col-xs-8">
         <h5>Input</h5>
         <CodeMirror options={{ mode: 'markdown', lineNumbers: true }} />
       </div>
    );
  }
}

export default BinsEditor;
```

* We add that we are using `markdown`
* And we need line numbers

### Test in browser
Click on `Create Bin` button and you should see your editor!

![codemirror](https://i.imgur.com/onf3ka5.png)



