# Building "links.create" Method
This is our first **real world**, ready for production, **Meteor Method**

* Our method will allow for the secure insertion of a new link
* We will add validation that someone can't just bypass on the client
* This validation will happen on the server

**note** We can remove `addNumbers()` and `greetUser()` from our Application as we won't be using them

## Insecure
* Meteor has a built-in package that enables insecure behavior in our app
* We will uninstall this package
* This **insecure** package allows us to write to the Database from the `Client` without going through any formal process
* This is great for prototyping but a huge problem for production ready apps

### View the currently installed packages
`$ meteor list`

### Caution - We are about to break our app!
* Once we remove `insecure` from our app our app will break because we won't be able to directly call our Collections from the `Client`
* So the code in `Link` calling the Links Collection directly from the client will no longer work

`Link`

```
// more code
onSubmit(e) {
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if (url) {
      Links.insert({ url, userId: Meteor.userId() });
      this.refs.url.value = '';
    }
  }
// more code
```

Instead we will call our **Meteor Methods** and that's where the data manipulation is going to happen

## Uninstall the `insecure` package
`$ meteor remove insecure`

### Log in and Test
![insert failed](https://i.imgur.com/T4uzRgv.png)

* We try to insert a Document but it doesn't work and we get this error message in the console, `insert failed: Access denied`
* We now see the effect of removing the `insecure` package

### Great. No we can't insert data via form any more. What gives?
* We still will allow data to gathered on forms and inserted into Collections but we will do it in a **much more secure way**

### Meteor Method naming convention (optional but recommended)
`resource.action` --> `emails.archive` (_if I had an email app and I was created a method to store old emails_)

Another example - we have links and we want to insert links

`links.insert`

### Define our first Meteor Method
`links.js`

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

// here is our first Meteor Method
Meteor.methods({
  'links.insert'() {
    
  }
});
```

* We still want to insert something into the `links` Collection
* We still want to associate a **url** with the link
* We still want to use the `userId` (_aka - the `id` of the user who is responsible for creating it_)

```
Meteor.methods({
  'links.insert'() {
    // check if the user is not logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }


  }
});
```

* We leave off the reason in our `Meteor.Error()` which it totally valid. If this error is thrown nothing after that `if` statement gets run. So if the user is not logged in, they can't do any damage which is good!

```
Meteor.methods({
  'links.insert'(url) {
    // check if the user is not logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }

    Links.insert({
      url,
      userId: this.userId  
    });
  }
});
```

* We accept the **url** as our one and only argument
* We use ES6 shortcode for our object key/value
* We store the logged in `user id` inside our `links` Collection
* We currently are not using any validation
    - Later we'll validate for:
        + That the **url** exists
        + That the **url** is a valid URL

## Add our Method.call
`Link`

Change this code:

```
onSubmit(e) {
    const url = this.refs.url.value.trim();

    e.preventDefault();

    if (url) {
      Links.insert({ url, userId: Meteor.userId() });
      this.refs.url.value = '';
    }
  }
```

To this code:

```
onSubmit(e) {
  const url = this.refs.url.value.trim();

  e.preventDefault();

  if (url) {
    Meteor.call('links.insert', url);
    this.refs.url.value = '';
  }
}
```

* Remove the `Links` named export import line as we no longer use it
* We could provide a **callback** function but it is optional and to prove this, we'll leave it off for now

### Test
Insert a URL and you will see that it gets added and we no longer get the `insert failed: Access denied` console notification

* Check if our new [link is inside `MiniMongo`](https://i.imgur.com/iTlgxOi.png)
* Check the Mongo shell if our new link [is inside MongoDB's server](https://i.imgur.com/QTPTAfQ.png) `links` Collection
* Make sure you see the logged in user's `userId` value for the Document
* All should be good to move on to the next step
* Now we have secured our insertion process for the `Links` collection
* You have to provide a **url**
* You can't add any extra fields (_only the once we specify in our **Meteor Method**_)

## DDP
* DDP looks like it is doing a lot stuff but frankly it is a bit intimidating and overwhelming
* We can simplify to make the data easier to digest

1. Click the DDP tab of the Meteor Dev Tool
2. Click the clear button
3. Uncheck `Subscriptions` and uncheck `Collections`
4. Now we only have `Methods` checked

![just Methods checked](https://i.imgur.com/kwG6HDE.png)

5. Clear again
6. Add one link
7. Now you'll just see 3 items

![three items](https://i.imgur.com/mCwSHef.png)

* [The first item](https://i.imgur.com/2d1zFjr.png) is our method call, with the method name, the params (**url**), an `id` (_used to sync up all the requests_), 
* `randomSeed` - this is designed to allow the `Client` and the `Server` to use the exact same random numbers (_this is for generating object ids_) and this is necessary so we don't get any sync errors when the server tells the client what to show to the screen
    - Remember - The `Server` is the boss
* [The second items](https://i.imgur.com/xptHvu0.png) is the message and this is where the error would appear or the response (_res_) if all went well and we returned data
* The last item is the update and that message gets sent once it has all the info it needs and this is the time to swap out the `Client` data for the real `Server` data
    - Most of the time this won't change anything
    - If there was a conflict of any sort, you might see a quick flicker where the client side data gets swapped out for the server side data

## No data is coming back from the server?
* We won't see the data if we just look at `Methods` in the DDP tab
* We need to look at the Collections tab
* Click the `Show` check-box over Collections [and you will see](https://i.imgur.com/ljx25Yq.png) `item added to links collection` (_this is where the data actually comes back from the server_)

[`updated`](https://i.imgur.com/aqi200T.png) is just a way to say it's time to take the server data and swap out the client MiniMongo data with the real server data

## Exercise
1. Log out of app
2. Attempt to run our `Meteor.call()` inside of `link.js` over inside of `client/main.js`

```
// more code
Meteor.startup(() => {
  // Call links.insert 'someurl'
  ReactDOM.render(routes, document.getElementById('app'));
});
```

This should show you what happens when a Method throws an error

<details>
  <summary>Solution</summary>
`client/main.js`

```
Meteor.startup(() => {
  // Call links.insert 'someurl'
  Meteor.call('links.insert', 'blablabla');
  ReactDOM.render(routes, document.getElementById('app'));
});
```

![error](https://i.imgur.com/I9cGCNT.png)

* This error happened because we were not logged in and so we got our `not-authorized` error

And here is our DDP error

![DDP error](https://i.imgur.com/GomkyWl.png)
</details>

**note** You can remove our `Meteor.call()` from `client/main.js` as we won't need it


