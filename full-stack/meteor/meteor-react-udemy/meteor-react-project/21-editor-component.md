# BinEditor Component

* Please remove the console.log inside the BinsMain Component

**note** The URL of our bin is completely bookmarkedable, so if a user wants to share this bin with anyone, they can

This is very impressive in a JavaScript single page application. If you come from Backbone framework you will be impressed

## The BinEditor
It will have the functionality of enabling the user to type markdown into it. It will be a Component so we will make it inside the `bins` folder

`bins/BinsEditor.js`

```
import React, { Component } from 'react';

class BinsEditor extends Component {
  render() {
    return (
       <p>Bins Editor</p>
    );
  }
}

export default BinsEditor;
```


