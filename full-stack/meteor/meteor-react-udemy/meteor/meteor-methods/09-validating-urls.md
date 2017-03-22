# Validating URLs
* We now have a secure method to save our link
* But now we have to make sure we validate the link first

## Simple validation
It just has to look like a URL

**note** We don't want someone to generate a random string of letters as that would just generate a broken link

**note** Just validating the URL is only part of what we need to do. We also have to make sure that if the URL is not valid a message is displayed back to the user as well

## Valid URL
npm has a package called valid-url

This package is straight forward. It validates a URL and confirms that it looks like one

### Install valid-url
`$ npm install --save valid-url`

## Where should we write our validation?
Inside of the metmet because this is what will execute on both the client and the server

### Import valid url
`imports/collections/links.js`

```
import { Mongo } from 'meteor/mongo';
import validURL from 'valid-url'; // add this line
```

Update this code in `links.js`

```
Meteor.methods({
  'links.insert': function(url) {
    console.log('attempting to save', url);
  }
});
```

With this code

```
Meteor.methods({
  'links.insert': function(url) {
    validURl.isUri(url);
  }
});
```

* If the URL is valid, it returns the URL
* If the URL is invalid, it returns `undefined`

We now need to somehow communicate the success or failure of this validation back to the client and we also need to keep the URL from being inserted into the `Links` collection if it is not valid

With this line `validURl.isUri(url)` we can check to see if it is valid but we actually need to act on that

To help accomplish this we will use two utility functions that come with Meteor that are called `check` and `match`

## Import check and Match
That is the correct spelling of each (case sensitive)

`imports/collections/links.js`

```
import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check'; // add this line
```

## How check and Match work
* We use check to run a validation on a variable
    - If the variable passes the validation, check does nothing (it says, `everything is cool, I don't care about this`)
    - If the variable fails validation, it will throw an error (JavaScript error) and that error can be communicated back to the `client` and that error can be used to show our user and say `hey, this things not valid, try again`
    - The check Method that we just imported comes with build in validations out of the box to make sure we can check things like whether the value was a **string**, an **object**, a **number** ... you get the idea
        + But we are doing a slightly more complicated validation here which is why we have the `Match` helper as well
            * `Match` allows us to run a custom validator function

Change this line:

```
Meteor.methods({
  'links.insert': function(url) {
    validURl.isUri(url);
  }
});
```

To this line:

```
Meteor.methods({
  'links.insert': function(url) {
    check(url, Match.Where(url => validUrl.isUri(url)));
  }
});
```

* We use `Match.Where()` whenever we want to define a custom validation
    - If we return a `truthy` value (the fat arrow function), then `check` passes and it says `hey, this thing must be valid`
    - If the inner function returns `false`, then `check` throws and error, then check says, `hey, something went wrong, here's the error message`
    - For simple validations we could just use `check` but checking a URL is more complex then the out of the box `check` so that is why we are using `Match` to help check if the URL is valid

### Test it out in the browser
Type `http://example.com` and you should see not feedback which means, `everything was fine`

Type `asd8;eke` (just some random string of letters) and submit and we get a big error message `Match error: Failed match validation`

## Next Up
Communicate the error message back to the client and pop up something on the UI that tells the user `hey, you screwed up, and enter a valid URL`




