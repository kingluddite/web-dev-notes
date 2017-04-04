# Safely Changing Data with Meteor Methods
## Our first Meteor Method
**note** Purpose of a Meteor Methods is to update a collection in a secure fashion

We removed the `insecure` package so now we have to define this Meteor Methods to update our data

## Where do we define Meteor Methods's?
Inside the same collection that we want to update with our Meteor Methods

* So if I want to define a Meteor Methods that updates the `Links` collections (`imports/collections/links.js`) I should define the Meteor Methods inside of `links.js`

`links.js`

```
Meteor.methods({
  'links.insert': function() {

  }
});
```

* `'links.insert'` - Is a valid JavaScript key
    - If I have a dot `.` inside and wrap it in quotes, this makes this string a valid JavaScript `key`
        + This is total vanilla JavaScript here. Nothing Meteor specific
        + I could have used `insert` but since I want this insert to be associated with the `links` collection so we call it `links.insert`
        + So by now we have just created a `Meteor method` called `links.insert`
        + Now anywhere else in our codebase we could call the Meteor Method links.insert and this function will be ran
        + We will assume only one argument `url` because that is what the person will be typing into the input field

```
Meteor.methods({
  'links.insert': function(url) {

  }
});
```

### We will test to see if Meteor Methods is working
```
Meteor.methods({
  'links.insert': function(url) {
    console.log('attempting to save', url);
  }
});
```

### One more thing we need to do before we can call this method
We defined this collection inside of `links.js`
* Anything defined inside this imports directory by default is not going to be loaded into the client or server side of our application. So as it stands right now this file is not being executed whenever our client starts up

#### How can we make sure `links.js` gets executed?
We need to import this file into the `main.js` in both our **client** and **server** applications

Let's import it in both files

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import LinkCreate from './components/LinkCreate';
import { Links } from '../imports/collections/links'; // add this line

const App = () => {
  return (
    <div>
      <Header />
      <LinkCreate />
    </div>
  )
}

Meteor.startup(() =>{
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
```

And we'll import it into:

`server/main.js`

```
import { Meteor } from 'meteor/meteor';

import { Links } from '../imports/collections/links'; // add this line

Meteor.startup(() => {
  // code to run on server at startup
});
```

So at this point we have:

* Created a Meteor Methods
* It is being loaded on both the client and the server

## Last thing we need to do
Anytime someone tries to submit a new URL, we need to call the meteor method

`client/components/CreateLink.js`

Change the following code from this:

```
// more code
handleSubmit(e) {
    e.preventDefault();

    console.log(this.refs.link.value);
  }
// more code
```

To this: (Here's where we call the Meteor Methods)

```
// more code
handleSubmit(e) {
    e.preventDefault();

    Meteor.call('links.insert', this.refs.link.value);
  }
// more code
```

* So now whenever a user clicks the button to submit the form, it will call `handleSubmit()`, which will call our Meteor Method `links.insert` (which in theory is being executed on both the client side and the server side), whenever we call `links.insert` we pass in the URL we want to save, it passes it to the Meteor Method (located in `imports/collections/links.js`) and we should see our `console.log()` message with the url passed in

### Test in browser
Enter `Some URL` in text field, click button to submit

You will see `some URL` in console and you will also see same `some URL` in the Terminal (which represents the server). This is proof that Meteor Methods execute on both the client and the server automatically for us

### Next up
We will validate the URL and save it to the links collection

