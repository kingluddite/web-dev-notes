# Creating Routes and Passing Data
## We just dealt with GET routes

## Let's handle POST routes
`routes/app.js`

```js
// more code
router.post('/message', function(req, res, next) {
  // redirect user to normal GET /message route
  // and output the message which is now submittable by the user
  // (not really submittable right now but we will add a form which will enable this to be submittable)
});
// more code
```

* `body` variable in `req.body`

`app.js`

```js
// more code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// more code
```

* The above makes it possible to handle form data using `req.body`
* `req.body.message`
        - We are going to create a form and in that form we are going to have an input element that will have a name of `message` and that, when the form is submitted with his our post route and we will be able to peel off the `message` property inside the route using `req.body.message`
        - Our form will be in our Angular 2 code
* `res.redirect()`
        - I need to redirect the user because I don't want to `render()` a response to the browser
        - We just send the user to someplace else

`routes/app.js`

```js
// more code
router.post('/message', function(req, res, next) {
  var message = req.body.message;
  res.redirect(`/message/${message}`);
});
// more code
```


* I want to redirect to a `GET` route
* And that will ensure I only render `GET` routes
* I redirect to `/message` which is our previous `GET` route

`res.redirect('/message');`

* And I want to append the message sent by the user

``res.redirect(`${message}/message`);``

* And here I encode the message inside the URL

`routes/app.js`

```js
// more code
router.get('/message', function (req, res, next) {
    res.render('node', { message: 'Hello' });
});
// more code
```

* But when I send ``res.redirect(`${message}/message`)`` I need to update the GET route that will receive this message

`route/app.js`

```js
// more code
router.get('/message/:msg', function (req, res, next) {
    res.render('node', { message: 'Hello' });
});
// more code
```

* Name it `:msg` to make it dynamic
* And instead of `:message`, I mix it up and name it `:msg` to easily differentiate the code between two routes that if effectively the same variable but this makes the code easier to read and know where things are happening and make it more clear
* `:somethingaftercolor` - this is variable data
* I then can then extract the data in my function by grabbing the variable in the URL using `req.params.msg` to pass it to the view
    - `params` refers to parameters encoded in the URL

`routes/app.js`

```js
// more code
router.get('/message/:msg', function (req, res, next) {
    res.render('node', { message: req.params.msg });
});
// more code
```

## Use `nodemon`
* Will save us from restarting the server with every change to server side code
* Install nodemon
    - Run nodemon
    - `$ nodemon start`
* Browser to `localhost:3000/message/supercool`
    - You will see A NodeJS View and `supercool` on the page

![supercool](https://i.imgur.com/1pPhpop.png)

### Add our form
`node.hbs`

```html
<h1>A NodeJS View</h1>
{{ message }}

<form action="/message" method="POST">
  <label for="message">Message</label>
  <input type="text" name="message" id="message" placeholder="message" />
  <input type="submit" value="submit" />
</form>
```

* Browse to `localhost/message/something`
* Enter `word` in the form and submit
* You will be redirected to the same page but now you will see `word` on the page

![word in form](https://i.imgur.com/ssxJWZn.png)

### What happened behind the scenes
* Click chrome network tab
* Refresh browser
* Type `another word` in form input and submit

#### Chrome dev tool important setting
* You need to see `method`
* Right click on the chrome headings and make sure `Method` is checked

![method is checked](https://i.imgur.com/aXabs7H.png)

#### Also check preserve log checkbox
![preserve log](https://i.imgur.com/eLeDJct.png)

* After submitting form
* I reach out to the message route with **post** request
    - Then we get status 302 (which is a redirect)
* Then we are taken to `/message/another word`
    - Which is a GET request
    - Which handles what we see here in the end

## Takeaway
* This is how we work with different requests in the route folder
* And on our views
* We will use lots of server side routes
* But we will only have one server side view using templates (index.hbs)
* We won't use server side templates to output data
* Angular 2 will render all our data on the client 

