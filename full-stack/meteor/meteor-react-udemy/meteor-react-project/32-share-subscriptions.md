# Share Subscriptions
We need to put our subscription in two places because we never know which page a user lands on when they visit our application

They might visit a bookmark for a particular bin

We need to make sure BinsMain subscribes to the `sharedBins` publication and we also need to make sure that `BinsList` subscribes to the `sharedBins` publication

`BinsMain`

```
// more code
export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins');

  return { bin: Bins.findOne(binId) };

}, BinsMain);
```

`BinsList`

```
// more code
export default createContainer(() => {
  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins');

  return { bins: Bins.find({}).fetch() };
}, BinsList);
```

### Test in browser
I shared with the email `me@you.com` Create a new user with that email and when you log in (in incognito window) you should see the bin that was shared with you

You can refresh and still see the data.

Any data changes get propagated to other users



