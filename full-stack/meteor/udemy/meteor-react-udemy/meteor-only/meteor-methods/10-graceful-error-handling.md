# Graceful Error Handling
Whenever we have a metmet we can always add an optional callback function as the last argument when we call it

## Adding a callback as the last argument of our metmet
`client/components/LinkCreate.js`

Change this:

```
handleSubmit(e) {
    e.preventDefault();

    Meteor.call('links.insert', this.refs.link.value);
  }
```

To this:

```
handleSubmit(e) {
    e.preventDefault();

    Meteor.call('links.insert', this.refs.link.value, (error) => {
      console.log(error);
    });
  }
```

**note** 

* In the callback, the argument passed is the error function if one exists
* This error object is any error that was created by the metmet

### Test in browser
Type `#*&)(#&` in text field and submit

* We get the original error we saw before
* But we also get an additional error that is provided to the client
    - We have access to:
        + error
        + errorType
        + message
        + reason

If you look at both error messages. The first one (from our `check` package) gives us more specific reasons for the error

`message:"Match error: Failed Match.Where validation"`

But the callback error message is paired down and more generic

`message: "Match failed [400]"`

## Error Handling
Now that we have our error message we can figure out our error handling fairly easily

"if error object exists" we could call `setState` on our component and update the component state with the error message (**note** - whenever we call `setState` it instantly causes our component to re-render)

**note**

Whenever we use component state, we always have to initialize it inside our constructor

```
import React, { Component } from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }
// More code
```

* We always call `super(props)` with `props`
* We initialize our state
    - Our error state with have a property of `error` and we'll initially set it to an empty string (this string will carry the error message if one exists)
    - By default we do not have an error

`client/components/LinkCreate.js`

Change this:

```
Meteor.call('links.insert', this.refs.link.value, (error) => {
      console.log(error);
    });
```

To this

```
Meteor.call('links.insert', this.refs.link.value, (error) => {
      if (error) {
        this.setState({ error: 'Enter a valid URL' });
      } else {
        this.setState({ error: '' });
      }
    });
```

* The else covers if someone first enters an error and then they fix it, we set the error in state to an empty string
* This will clear out any error message if there is one

### Update our UI with an error
```html
<form onSubmit={this.handleSubmit.bind(this)}>
 <div className="form-group">
   <label htmlFor="shortenURL">Link to shorten</label>
   <input ref="link" type="text" id="shortenURL" className="form-control" />
 </div>
 <div className="text-danger">{this.state.error}</div>
 <button className="btn btn-primary">Shorten!</button>
</form>
```

### Test in browser
Enter random string of text and submit button

You'll get red `Enter a valid URL` error message

Enter a valid URL and the error message will go away

### Clear form after submitting
If the form was successful, we want to clear the input field value

```
Meteor.call('links.insert', this.refs.link.value, (error) => {
  if (error) {
    this.setState({ error: 'Enter a valid URL' });
  } else {
    this.setState({ error: '' });
    this.refs.link.value = ''; // add this line
  }
});
```

### Test in browser
* Enter a valid URL and field value is cleared
* Enter an invalid URL and the field value remains

### Next up
Take our URL and generate a token for it that will map to that very particular URL


