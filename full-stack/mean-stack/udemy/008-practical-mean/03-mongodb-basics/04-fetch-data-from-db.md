# Fetch Data from Database
* `User.findOne({}, callback)`
    - If If specify an emptyp object in first parameter it will give me the first record it finds
    - We do not get the user by find a user and storing it in a variable like this:

`const user = User.findOne({}, callback);`

* Why?
    - Because this is asynchronous task
    - It will reach out to the Database and it make take a couple of seconds
        + And it will call our callback once it is done
        + The callback will either receive the `error` or the `result`
            * A common name for the result is `doc` (short for document)

`app.js`

```js
// more code
router.get('/', function (req, res, next) {
    User.findOne({}, function(err, doc) {
      if (err) {
        return res.send('Error!');
      }
      res.render('node', {email: doc});
    });
});
// more code
```

* If we get an error we just send back text (we're not rendering a view here just sending back plain text reading `Error!`)
* We make sure to render `node` inside the callback otherwise it would render before we received our `document`
* **note** We could also circumvent this callback process using the new `async-await`

### Update our handlebar template to show the fetched email
`node.hbs`

```html
<h1>A NodeJS View</h1>
{{ email }}
<form action="/" method="post">
  <label for="email">Email</label>
  <input type="email" name="email" id="email" placeholder="email" />
  <input type="submit" value="submit" />
</form>
```

* Restart server
* And you will see:

![fetched data](https://i.imgur.com/w5vPFH8.png)

#### Houston we have a problem!
* We are fetching the entire object but we just wanted the email

`routes/app.js`

```js
// more code
router.get('/', function (req, res, next) {
    User.findOne({}, function(err, doc) {
      if (err) {
        return res.send('Error!');
      }
      res.render('node', {email: doc.email}); // we update this line
    });
});
// more code
```

* Restart server
* You should now see just the email `john@doe.com`

## Key Takeaway
* Use any method to fetch data directly on the model
    - And then use it in the **callback** include the rendering of responses

## More info on `MongoDB`
* [Official MongoDB Page](https://www.mongodb.com/) 
* [Setup Instructions on Official Page (choose your OS)](https://docs.mongodb.com/manual/administration/install-community/) 
* [Mongoose Docs](http://mongoosejs.com/docs/guide.html)
