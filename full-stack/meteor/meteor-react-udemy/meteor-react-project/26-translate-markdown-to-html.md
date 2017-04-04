# Translate Markdown to HTML
We now have a library that can translate saved markdown into raw HTML

## markdown.toHTML()
This markdown method takes a bunch of markdown and does the HTML conversion for us

`BinsViewer.js`

**note** This Component is getting passed a prop of our `bin` so we will take that **bins** content and translate it to raw HTML

```
import React, { Component } from 'react';
import { markdown } from 'markdown';

class BinsViewer extends Component {
  render() {
    const rawHTML = markdown.toHTML(this.props.bin.content);
    return (
      <div className="col-xs-4">
        <h5>Output</h5>
      </div>
    )
  }
}

export default BinsViewer;
```

## Challenge - How do we get our raw HTML onto our page?
We currently have HTML but it is held inside a string inside the variable `rawHTML`

```
<div className="col-xs-4">
        <h5>Output</h5>
        {rawHTML}
      </div>
```

This will give us not what we want

`<p>sdfasdfsdsdfsfd</p>`

The conversion is turning it into HTML but the but the problem is if we stick a string into JSX, React will render it as a string. React doesn't know it contains HTML

## dangerouslySetInnerHTML
We'll use a trick to make this work

```
class BinsViewer extends Component {
  render() {
    const rawHTML = markdown.toHTML(this.props.bin.content);
    return (
      <div className="col-xs-4">
        <h5>Output</h5>
        <div dangerouslySetInnerHTML={{ __html: rawHTML}}></div>
      </div>
    )
  }
}
```

### Why dangerous? 
By converting a raw string into HTML and rendering it to the page we are opening ourselves up to XSS attacks (Cross Site Scripting)

With XSS, a malicious user can inject JavaScript to modify another user's experience in our application. This will not work in a real live production but this is ok for our app

### What's Next?
Sharing Bins


