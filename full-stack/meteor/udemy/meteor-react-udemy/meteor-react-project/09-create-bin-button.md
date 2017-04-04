# Create Bin Button
## Two Reminders
1. For every Meteor project remove insecure package
2. Write some Meteor Methods

They will help give your project some more form and structure
And force you to think through some of the design considerations

## Create Bin
Button in header that says `Create Bin`

Whenever user clicks this it should create a new bin and automatically navigate the user to the bin editor page

### We'll work first in the Header component
`client/components/Header.js`

* Give <a> `href` and set it to `#` (`<a href="#"></a>`)
    - This makes link appear clickable

### Set up event handler
`<a href="#" onClick={this.onBinClick.bind(this)}>Create Bin</a>`

* We bind it to `this` because it is a **callback**
* It is a link tag so by default whenever someone clicks it, the browser is going to want to navigate somewhere and we want them to stay put

```
onBinClick(event) {
    event.preventDefault();
}
```

## Such a Refreshing Experience
### Test in browser
You will see that the page doesn't refresh. Remove the `preventDefault()` line and you will see the page refreshes when you click the 'Create Presentation' button

### Time to call our Meteor Method
Update our `onBinClick()` event with:

```
onBinClick(event) {
    event.preventDefault();

    Meteor.call('bins.insert');
}
```

**note** Make sure you are currently logged in as `test@example.com`

* Click the `Create Bin` link and check your console
    - You will see this error
        + `Error invoking Method 'bins.insert': Method 'bins.insert' not found [404]`

### Why did we get this error?
Where did we create our `bins` collection?

`imports/collections/bins.js`

In a Meteor project whenever we are using JavaScript modules (the `import` and `export` statements), **files are NOT imported by default**

So even though we added this `bins.js` file, it is not being executed by the **client side** and so this **Meteor Method** is not ever being loaded up, so `bins.insert` doesn't exist as a **Meteor Method**

## How can we fix this?
We just need to import `bins.js` into the `main.js` files on both the **server** and **client** side like this:

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Bins } from '../imports/collections/bins.js'; // add this line
```

**note** We are importing `{ Bins }` and not `Bins`

This would be the **wrong** way and would generate an error

`import Bins from '../imports/collections/bins.js';`

And this is the correct way

`import { Bins } from '../imports/collections/bins.js';`

The reason (_and one I keep forgetting_) is because of how we export our **MongoDB** collection like this:

`export const Bins = new Mongo.Collection('bins');`

We are not using `export default Bins` and if we did then we would import with `Bins` but since `Bins` is not our default export we need to use `{ Bins }` instead

`export default Bins` vs `export const Bins`

### Properly importing our `Bins` Collection

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins.js'; // add this line

Meteor.startup(() => {
  // code to run on server at startup
});
```

### We now have defined our `bins.insert` Meteor method
Just by importing the `Bins` collection into both the **server** `main.js` and **client** `main.js` it makes sure all the code inside of `bins.js` is executed which means this `bins.insert` Meteor method is now defined

### Test in browser again
Click `Create Bin` button again and nothing happens (_which is a good thing because it probably means we just inserted a default record_)

