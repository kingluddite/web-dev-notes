# Copying Link URL to Clipboard
## document.execCommand()
Available in all modern browsers (except Opera Mini)

Highlight one of your links and type `> document.execCommand('copy')`

`true` Will be returned 

* If you get `false` it means your browser doesn't work with this command
* Or maybe the user has restricted access to the clipboard

You can paste your clipboard item to the console and it should be exactly the link you copied to your clipboard

![copy to clipboard](https://i.imgur.com/QgaspSU.png)

We want to programmatically add this behavior to make copying and sharing URLs easy for our user

## Problem
We can programmatically highlight code in JavaScript, but you can focus and select on an input field

`> document.querySelector('input')`
Will return our input field

`<input type="text" placeholder="URL">`

Now we can select all the text in input with:

`> document.querySelector('input').select()`

and

`> document.execCommand('copy')`

Then paste into the console and you'll see you capture the value inside the form field

Using these two commands, we're able to copy the url with out the user having to do anything

This is exactly what is used on Github. Look familiar?

![github copy to clipboard](https://i.imgur.com/iYvvi7N.png)

## Our behavior will be even cooler
* This is possible because we are using a 3rd party library
* It is using what we have plus a little more making it a much better user experience
    - It will create an input (_like what we used_)
    - It shifts the input out of view of the user
    - It adds the URL we want to copy to that input field then it runs the commands we just used to select and copy and it also removes the input
        + This all happens in just a few milliseconds
        + The time it takes to click a button

## Clipboard from npm
[clipboard from npm](https://www.npmjs.com/package/clipboard)

### Non React libraries can work inside your React apps
* This is not specific to `React` so this will show you that you can use non-react libraries inside your React Application
* This library could be used in `Angular`, `React`, `Ember` or even just a static page

### Install clipboard
`$ npm i -S clipboard`

### Make a simple button that copies text
`LinksListItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

class LinksListItem extends Component {
  componentDidMount() {
    new Clipboard(this.refs.copy);
  }

  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <button ref="copy" data-clipboard-text="from my cold dead hands!">Copy</button>
       </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

export default LinksListItem;
```

Click any `Copy` button in the browser and you'll see you copied the static text `from my cold dead hands!` to the clipboard

## Digging Deeper into the Clipboard API
We'll be working with `success` and `error` event

* This will enable us to change the button text when it does get copied

```
// more code
class LinksListItem extends Component {
  componentDidMount() {
    const clipboard = new Clipboard(this.refs.copy);

    clipboard.on('success', () => {
      alert('It worked!');
    });
  }
// more code
```

Click `Copy` button and you will see alert pop up

![alert clipboard](https://i.imgur.com/CXXRFbH.png)

### Error
Let the user know we were not able to automatically copy it to the clipboard and they will have to manually do that

```
// more code
class LinksListItem extends Component {
  componentDidMount() {
    const clipboard = new Clipboard(this.refs.copy);

    clipboard.on('success', () => {
      alert('It worked!');
    }).on('error', () =>{
      alert('Unable to copy. Please manually copy the link.');
    });
  }
  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <button ref="copy" data-clipboard-text={this.props.shortUrl}>Copy</button>
       </div>
    );
  }
// more code
```

* We add option for handling errors where browsers don't copy to clipboard
* We use `<button ref="copy" data-clipboard-text={this.props.shortUrl}>Copy</button>` to grab the copied clipboard text when we click the button

## Time for some clean up
**"clean up"** means remove all the event listeners that `Clipboard` uses and this will free up the browser of useful resources

```
// more code
class LinksListItem extends Component {
  componentDidMount() {
    const clipboard = new Clipboard(this.refs.copy);

    clipboard.on('success', () => {
      alert('It worked!');
    }).on('error', () =>{
      alert('Unable to copy. Please manually copy the link.');
    });
  }

  componentWillUnmount() {
     clipboard.destroy();
  }
// more code
```

* This won't work 
* Because the way we structured our code we can't access `clipboard` in another function because of scope
* But if we scope `clipboard` to the Component using `this.clipboard`, this will give us access to it globally inside the Component

```
// more code
class LinksListItem extends Component {
  componentDidMount() {
    // change this line
    this.clipboard = new Clipboard(this.refs.copy);
    
    // change this line
    this.clipboard.on('success', () => {
      alert('It worked!');
    }).on('error', () =>{
      alert('Unable to copy. Please manually copy the link.');
    });
  }

  componentWillUnmount() {
     // change this line
     this.clipboard.destroy();
  }
// more code
```

## Test
* Copy and paste a link using button
* Log out and you should have no errors
