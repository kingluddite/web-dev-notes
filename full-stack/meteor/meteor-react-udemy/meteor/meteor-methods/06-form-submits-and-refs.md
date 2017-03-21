# Form Submits and Refs
We need to

1. Watch for the form being submitted
2. Pull the value out from the form
3. Validate the form

## Step 1 - Watch for the form being submitted
This means we need to add an `event handler` to the form

* Name of event `submit`
* Capitalize event name `Submit`
* Add `on` prefix `onSubmit`

`<form onSubmit=` is our event handler

And then we'll add our **helper function `handleSubmit()`

```js
handleSubmit(e) {
  e.preventDefault();
}
```

Now our browser won't refresh because it is trying to refresh the browser

**note** Submit events are not from React. All HTML forms have a submit event

**important**

Since this is an event handler we care about the value of `this` inside the handler. We need to bind the context with `onSubmit={this.handleSubmit.bind(this)`

## Pull the value out of the form text field
To get access to form fields you need to use `ref`

**note** `ref` is another construct to get used to in **React**

## refs
Short for `references`

A `ref` is a variable that points to a specific DOM element that is being produced by our component

### Adding refs
We can add a ref to a very particular element by passing a `ref` **property** to the element we are interested in

So we care about this tag `<input type="text" id="shortenURL" className="form-control" />`

So we add the `ref` property to it:

`<input type="text" id="shortenURL" className="form-control" />`

like this:

`<input ref="input" type="text" id="shortenURL" className="form-control" />`

### Test if ref is working
```
handleSubmit(e) {
    e.preventDefault();

    console.log(this.refs.input.value);
  }
```

You don't have to name `refs` **input** but anything you want. Since we are working with links, let's name it links

#### Test in browser
You click button and should see what you typed in the console

We will change ref name to link and here is our code:

```
import React, { Component } from 'react';

class LinkCreate extends Component {
  handleSubmit(e) {
    e.preventDefault();

    console.log(this.refs.link.value);
  }
  render() {
    return (
       <form onSubmit={this.handleSubmit.bind(this)}>
         <div className="form-group">
           <label htmlFor="shortenURL">Link to shorten</label>
           <input ref="link" type="text" id="shortenURL" className="form-control" />
         </div>
         <button className="btn btn-primary">Shorten!</button>
       </form>
    );
  }
}

export default LinkCreate;
```

## What we just accomplished
* We have a system that lets us know:
    - When user submitted form
    - Grabs value user submitted

## Next Challenge
Validating the URL
