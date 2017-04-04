# Shared Bins Publication
Right now we have a publication that is for all the bins a user owns

`server/main.js`

```
Meteor.startup(() => {
  Meteor.publish('bins', function() {
    return Bins.find({ ownerId: this.userId });
  });
});
```

We need to add to this publication or as a separate publication a list of all the bins that this user is a collaborator on

## Create a new publication
Of all the bins that a user has been shared with

They are separate because in the future we may want to only show a list of bins that a user owns and a list of bins that a user has been shared with

slight challenge. We need to use `this.userId` find the user it belongs to and then pull their email address off of it

**note** Inside of this function:

```
Meteor.publish('sharedBins', function() {
    
  });
```

We only know the current user's 'id' (using `this.userId`). We don't have access (directly) to their `email`

We need to:

1. Find their users object
2. Then find their email

We will take the userId and find if the email exists

`const user = Meteor.users.findOne(this.userId);`

This should return us a user but we need to make sure that it actually did:

```
Meteor.publish('sharedBins', function() {
    const user = Meteor.users.findOne(this.userId);

    if (!user) { return; }
  });
```

So if it did not return us a user, we just `return`

We do this in case someone who is not logged in accessed our application in which case we say 'you don't get any additional bins in here'

**note** A user model can have multiple email addresses associated with it and so we will just pull off the first email record and get the address

`const email = user.emails[0].address;`

Meteor allows multiple emails but we only accept one email so we pull off the first email in the Meteor user Object

```
return Bins.find({
      sharedWith: { $elemMatch: { $eq: email }}
    });
```

* Look through all the different Bins we have
* Look at the `sharedWith` property of each
* The `sharedWith` property should be an array
    - And walk through that array
    - And find an element that matches an email equal to `$eq` `email`
    - Any `email` contained in the `sharedWith` property return it from this publication

Now we have 2 publications that each return bins
the sharedBins publication return a different subset of bins than our `bins` publication

Now we can either show a user a list of bins that they own or a list of bins that that they are shared with

## Next Challenge 
Set up a subscription in the BinsList and BinsMain Components
