# Programmatic Navigation
We want to take the user to the `bin` when they click `Create Bin`

Can't we just turn `Create Bin` into a `Link` tag and whenever they click it they should just go there. Problem solved. Not so fast... It's not that simple

In order to view a bin the URL must reflect the `id` of the `bin` that is to be displayed

But we have a problem because when the user clicks on `Create Bin` the bin does not yet exist so there is not URL to send them to. We have no idea what the `bin id ` is

We must first:
1. Create a `bin`
2. Wait for the `bin` to be successfully created
3. And then navigate the user to the `bin`

This type of navigation is called **Programattic Navigation**

* This is navigation we, the developer, not the user, are initiating

`client/components/Header.js`

This is where our `Create Bin` button lives

```
onBinClick(event) {
  event.preventDefault();

  Meteor.call('bins.insert');
}
```

* The key here is that we only want to navigate to the `bin` after it was created
* Our current Meteor Method has a call where we create our `bin`
    - Fortunately, the Meteor Method accepts a `callback` method that is called only after the `bin` is made

The callback's first argument is always going to be an error object
The second value is whatever the return value is from the Meteor Method

So we open up `imports/collections/bins.js` and we see the Meteor Method we are calling:

```
  'bins.insert': function() {
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  },
```

And we see we are returning the result of `Bins.insert()`

So then we go back to `Header.js` and update the callback in our event handler

```
onBinClick(event) {
    event.preventDefault();

    Meteor.call('bins.insert', (error, bin) => {
      console.log(bin);
    });
  }
```

## We are guessing at what we get back from the Meteor Method
We view it in the browser and when we click `Create Bin` we [see that what was returned](https://i.imgur.com/P207IcM.png) was the `id` of the bin we created. It doesn't return the entire `bin` object, it is just the `id`. This is great and now we just need to know how to programmatically navigate the user around

**note** **React Router** is famous for being chaotic the last two years so the documenation online is going to give you several different answers

We are going to use `browserHistory` object to navigate the user around which we had previously wired up inside of our router (`client/main.js`)

### Import `browserHistory`

**note** Since we are getting back the bin id let's use that at the variable name:

```
Meteor.call('bins.insert', (error, binId) => {
      browserHistory.push(`/bins/${binId}`);
    });
```

`Header.js`

`import { Link, browserHistory } from 'react-router';`

We already were using `react-router` so we just append `browserHistory` to our import list for React Router

```
class Header extends Component {
  onBinClick(event) {
    event.preventDefault();

    Meteor.call('bins.insert', (error, binId) => {
      browserHistory.push(`/bins/${binId}`);
    });
  }
```

* After the Meteor Method calls, we'll get our callback, `browserHistory` will add a new URL and we should see navigation occur to the new bin
