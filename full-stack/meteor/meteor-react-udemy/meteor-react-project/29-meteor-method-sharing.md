# Meteor Method for Sharing
We will take an email from the input and update the `bin` so that we know this user has access to the `bin`

## Create Meteor Method

`imports/collections/bins.js`

```
'bins.share': function(bin, email) {
    
  }
```

We'll need to pass it the `bin` and the user's `email`

Whenever we want to update an existing record we need to use Mongo Modifiers. We need to use a Mongo Modifier to add our email onto the `sharedWith` array on the `bin`

**remember** We last used a bin modifier here:

`return Bins.update(bin._id, {$set: { content: newContent } });`

```
'bins.share': function(bin, email) {
    return Bins.update(bin._id, { $push: { sharedWith: email } })
  }
```

* We use the `$push` Mongo Modifier to push an new item into an array
* Find the Bin with this `id`, find a property of `sharedWith` (it better be an array), and push in the value `email` into it
* Because our Bin has tons of properties on it, we need to specify the `key` or property of `sharedWith`

## Update our onClick hander in BinsShare
`BinsShare`

```
onShareClick() {
    const email = this.refs.email.value;

    Meteor.call('bins.share', this.props.bin, email);
  }
```

### View in browser
You can enter an email and you should get no errors but we get no feedback to know if anything happened

### Next challenge
Show some feedback to let us know we added and shared an email






