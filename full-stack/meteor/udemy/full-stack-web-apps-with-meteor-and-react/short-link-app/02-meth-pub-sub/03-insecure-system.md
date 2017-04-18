# Setting up an Insecure System - Part 1
We will start from a clean slate running `$ meteor reset` to reset all of our Collections

## Stop the server
`ctrl` + `c`

## Reset meteor
`$ meteor reset`

## Clear the terminal
`$ clear`

## Run Meteor
`$ meteor run`

## Create the Links Collection
`imports/api/links.js`

```
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');
```

* We store **Links** (_uppercase is the recommended naming convention_) because we'll need to access the returned result. Now we can access things like:
    - `Links.insert()`
    - `Links.find()`
* The name of our Collection is `links` (_lowercase is the recommended naming convention_)
* We `export` **Links** so the files that `import` Links can get access to this variable

## import Links Collection on `Server` and `Client`

`server/main.js`

```
import { Meteor } from 'meteor/meteor';

import './../imports/api/users';
import './../imports/api/links';

Meteor.startup(() => {

});
```

* We don't need any of the **default** or **named** `exports` so we just use the `relative path` to the Collection

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import ReactDOM from 'react-dom';
import { routes, onAuthChange } from './../imports/routes/routes';
import { Links } from './../imports/api/links';
// more code
```

* On the `Client-side` we will need access to the `Links` **named export**

Now that we have the `links` Collection set up on both the `Client` and the `Server` we are ready to add some basic functionality

## We will create a real basic example using `links`
* We want to focus on Publications, Subscriptions, and Methods
* Once we get that down we'll dive into adding validations and shortening the link (the entire purpose of our app)

## Create basic form
That adds new links

`<form onSubmit={this.onSubmit.bind(this)}>`

* We add this to make sure we have access to the Component inside of that method
* We use `e.preventDefault()` to prevent the **full page refresh** and we also want to prevent the actual inputs posted as query strings
* We are inserting using `Links.insert()` so we need to import our `Links` named export
* We use React `refs` to gain access to the value the user enters into the URL input using `this.refs.url.value;`
    - We make sure to trim an extra spaces off the end with `this.refs.url.value.trim();`

```
if (url) {
 Links.insert({ url });
 this.refs.url.value = '';
}
```

* We like to define our variables at the top of every function (_good coding practice_)
* We do a quick, simple validation to make sure the url has at least some value (_we don't want the user to be able to enter empty strings into the `links` Collection_)
* We know `Links.insert()` takes an object as an argument so `Links.insert({})`
* We use the ES6 object short code which changes `Links.insert({ url: url });` to `Links.insert({ url })`
* We clear out the input field after we insert a `url` using `this.refs.url.value = ''`
    - **note** We are not **getting** the input value (_aka reading the input field value_) but instead we are **setting** the input value to an empty string

## Test
* Since we used `$ meteor reset` we will have to create a new account to test this Application
* After we insert a new link we need to make sure it was added. We did not wire to output the link list to the page yet so we will use our Meteor Dev tool in Chrome to check on our `lists` Collection
    - Select the **MiniMongo** tab
    - There are 0 items inside our `links` Collection
    - Enter `Test Value here` as your url and submit
    - This is what you'll see

![first link added](https://i.imgur.com/xeOtAkD.png)

* We have a url key with a string set to the url we added (_Obviously, it is not a valid URL but we have not added any validation yet_)
* Add another link but use spaces before and after and you'll see `.trim()` working it's magic (_trimming the space before and after_)

## Exercise
Write a Tracker call that keeps track of changes to the `links` Collection (which will be in `client/main.js`)

```
// Call Tracker.autorun()
  // fetch all links using find() method
  // print links to console using console.log()
```

<details>
  <summary>Solution</summary>
```
Tracker.autorun(() => {
  const linkList = Links.find().fetch();
  console.log(linkList);
});
```
</details>
