# Redirecting Shortened Links
## First let's redirect in a static way

### Exercise
Set up redirect to always take you to `https://google.com`

1. Create and register new middleware function
2. Set HTTP [status code to 302](https://httpstatuses.com/302) (tells the requestor (in this case the browser that what they are looking for is not at the current location, and we will send them somewhere new))
3. Set the `Location` header to URL you want to go to
4. End the request
5. No need to call `next()` in this function as we are always going to redirect them over to google
6. Refresh the app and see if you are redirected automatically to `https://google.com`

<details>
  <summary>Solution</summary>
```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    res.statusCode = 302;
    res.setHeader('Location', 'https://google.com');
    res.end();  
  });

  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP status code
    // res.statusCode = 404;
    // // Set HTTP headers
    // res.setHeader('my-cool-header', 'I am so cool');
    // // Set HTTP body
    // // res.write('<h1>Middleware will save the day</h1>');
    // // End HTTP request
    // res.end();
    next();
  });
});
```
</details>

* Good practice to provide all three `req, res, next` even if you don't use all three

## Dynamic Version
That was fine and dandy but what use is it if we always get redirected? We need to dynamically redirect if some logical conditions are met

### http://localhost:3000/blablabla
How do we get everything after `/`? (_blablabla_)

`req.url` - Will give us `/blablabla`

Now we just need to get rid of that first character

### `.findOne()` or `.find()`
**note** When you use `Collection.find()` you either get back an empty array or an array of `n` documents (how many documents match your query) so we are searching for `id` and we now `id` is unique so our array will be empty or have 1 item. Since we know we are just looking for one item we can use `.findOne()` instead of `.find()`

Now with `findOne()` our result will be `undefined` or a matching Document. So we don't have to grab the first item in the array or check the length of the array (a bit annoying to have to do that every time)

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import { Links } from './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.find({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
    } else {
      next();
    }
  });
});
```

* Grab link `_id` from MiniMongo
* Paste into url `http://localhost:3000/SPNwT9XkNSFiBmosB`
* And if all goes well, refresh browser and you should be redirected to that page. If you put in an unrecognized ID, you'll get Not Found
* Log out and test same URL and it should still work (you don't need to be logged in for it to work)
