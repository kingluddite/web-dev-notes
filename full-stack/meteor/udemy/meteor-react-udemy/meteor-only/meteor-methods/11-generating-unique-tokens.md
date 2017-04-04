# Generating Unique tokens for URLs

`imports/collections/links.js`

```
Meteor.methods({
  'links.insert': function(url) {
    check(url, Match.Where(url => validUrl.isUri(url)));
  
    // We're ready to save the url
  }

});
```

If we get past the `check` line that means validation was successful and we're ready to insert the URL into the `Links` collection

## Time to generate a token for this URL
The goal of our app is to shorten a url
We do this by generating a short token
When anyone visits our app with that token in the URL we can extract that token and figure out which link they were trying to visit

### First let's generate our token
Then we'll save the URL and token to our database

### Cool JavaScript trick
Paste this inside the console and run it

`Math.random().toString(36).slice(-5);`

Will give you something like: `"6s9k9"`

* Gives us a random string of characters
* 5 characters long
* Each character is always between 0 and 9 or a - Z
* This is pretty darn random string of characters

This random string of characters will serve as our `token`
Every time we try to save to our collection, we will generate a unique random token

### Save our URL
```
// Save our url
Links.insert({ url: url, token: token, clicks: 0 });
```

* We save our url
* We save our token
* We initial our clicks to `0`
    - Part of our goals was to record the number of times the link was clicked

### Refactor with ES6
Because our key and value of `url` and `token` are identical, we can shorten it with ES6 to this:

`Links.insert({ url, token, clicks: 0 });`

Remember this Meteor Method will be run on the client and the server and it will only be saved to our database on the server.

On the client `Links.insert()` will occur but remember that it is a **optimistic update** (a simulation) it will not be reflected on the database. Only when the server executes `Links.insert()` will this link be actually inserted into our MongoDB database

It took us a long time to get here but we are guaranteed that users are not able to insert trash into our database

## Next up
We will render our list of links onto our React component onto the screen


