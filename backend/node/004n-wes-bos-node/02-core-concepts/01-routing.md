# Core Concept - Routing
* You will deal with routing in any Application you build
* When people go to a URL you need to do stuff
    - Query Database
    - Filter through list of stores
    - Modify that data in some way
    - And finally, when you have all the data you want to send to the user, you send it to them

## `routes/index.js`
1. Import express

`const express = require('express');`

2. Grab router off of express

`const router = express.Router();`

3. Define all your routes

```
router.get('/', (req, res) => {
  res.send('Hey! It works!');
});
```

4. We point to this file in `app.js`

`const routes = require('./routes/index');`

5. We tell **express** to use our **routes** here in `app.js`

`app.use('/', routes);`

* Anytime someone goes to `/` anything, we will hit the routes file (`/routes/index.js`) and that file will handle every single URL hit that we get
* You can have multiple route handlers `app.use('/admin', adminRoutes)`

## How the router works
```
router.get('/', (req, res) => {
  res.send('Hey! It works!');
});
```

1. You `get` the URL
2. You have a **callback** function that runs whenever someone visits that specific URL

### Callback function gives you three things
1. The `req` (_request_)
  - An object full of information coming in
2. the `res` (_response_)
  - An object full of methods for sending data back to the user
3.  `next`
  - We'll learn more about this later
  - But at times you won't want to send data back and you just want to pass it off to something else and that falls under the topic of `middleware`

### Stuff we can do with our `res`
* `res.send()`
* **Important** You NEVER want to send data more than once
  - If you do, you'll get an **error**
  - Replace our route with the code below and you'll see the error

```js
router.get('/', (req, res) => {
  const player = { name: 'Kobe', age: 40, good: true };
  res.send('Hey! It works!');
  res.json(player);
});
```

## Houston we have a problem!
We get an error stating `Error: Can't set headers after they are sent`

![header error](https://i.imgur.com/vpowWmg.png)

But if we comment out `res.send()` and we want to send our JSON object

```js
router.get('/', (req, res) => {
  const player = { name: 'Kobe', age: 40, good: true };
  // res.send('Hey! It works!');
  res.json(player);
});
```

We will see this:

![json output](https://i.imgur.com/UZVO25T.png)

* Download Chrome extension `JSON Viewer` to make your JSON look more readable

### How do we get data that is in URL?
* Put this URL in the address bar of the browser and replace our current route with the route below

`http://localhost:7777/?name=kobe&age=40&good=true`

* The URL is part of the **request** `req`

```js
router.get('/', (req, res) => {
  const player = { name: 'Kobe', age: 40, good: true };
  // res.send('Hey! It works!');
  // res.json(player);
  res.send(req.query.name);
});
```

Will output to screen `kobe`

### Pass our query back in JSON format
URL: `http://localhost:7777/?team=lakers&good=true`

```js
router.get('/', (req, res) => {
  const player = { name: 'Kobe', age: 40, good: true };
  // res.send('Hey! It works!');
  // res.json(player);
  // res.send(req.query.good);
  res.json(req.query);
});
```

## bodyParser
* `body-parser` extracts the entire body portion of an incoming request stream and exposes it on `req.body` as something easier to interface with.
* You can do the same thing by yourself but using `body-parser` will do what is required and will save you time
  - `bodyParser.urlencoded()` Parses the text as **URL encoded data** (_which is how browsers tend to send form data from regular forms set to POST_) and exposes the resulting object (_containing the keys and values_) on `req.body`
  - `bodyParser.json()` Parses the text as JSON and exposes the resulting object on `req.body`

`app.js`

```js
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

* This is middleware
* **Before we get to our routes**, `Express` will:
    - Check the URL
    - And it will check if user has posted data from a form and this will put all the data in the request so we can easily access it with stuff like 
      + `req.query` 
      + or `req.body` 
      + or `req.params`

### Let's make a new route
* Our route will return the **reverse of the name we enter**

#### How do you put variables in a route? `router.get('/reverse/:name')`
  - Add the following route below our existing route
  - Enter the URL into the browser address bar and press enter
    + [http://localhost:7777/reverse/bob](http://localhost:7777/reverse/bob)

```js
router.get('/', (req, res) => {
  const player = { name: 'Kobe', age: 40, good: true };
  res.json(req.query.name);
});

router.get('/reverse/:name', (req, res) => {
  res.send('it works!');
});
```

Now if we go to that URL it will hit our route and output `it works!`

```js
router.get('/reverse/:name', (req, res) => {
  res.send(req.params);
});
```

URL -> http://localhost:7777/reverse/jerry

Will output to screen:

```js
{
"name": "jerry"
}
```

### Reverse the name in the URL and send it back to user
URL -> [http://localhost:7777/reverse/elvis](http://localhost:7777/reverse/elvis)

```js
router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});
```

* Try to reverse the name of `racecar`
* `[...req.params.name]`
  - spread operator
  - Converts to an array and puts each letter as an item
  - We use the array `reverse()` method to reverse the order of the array of letters
  - We join the letters together with `.join()`
* `req.body`
  - We'll use for posted parameters

All this and more can be found at the [Express Documentation page](https://expressjs.com/en/4x/api.html)

## Add Git keyboard shortcuts to your `.zshrc`

`~/.zshrc`

```
# ====================
# Git Aliases
# ====================
alias gs='git status'
alias gpush='git push origin master'
alias gpull='git pull origin master'
alias gap='git add -p'
alias ga='git add '
alias gb='git branch '
alias gc='git commit'
alias gd='git diff'
alias go='git checkout '
alias gob='git checkout -b '
alias gk='gitk --all&'
alias gx='gitx --all'
alias glog='git log --pretty=oneline --abbrev-commit'
alias gitl='git log --pretty=oneline'
alias lgl='git log --oneline --decorate'
# when I mispell git commands the following 2 commands help
alias got='git '
alias get='git '
alias glog='git log --pretty=oneline --abbrev-commit'
alias up='git pull upstream master'
```

## Git
* Save
  - `$ ga -A`
* Commit
  - `$ gc -m 'routing notes`
* Checkout master
  - `$ gcm`
* Merge branch into master
  - `$ git merge routing`
* Push master to github (_and all branches_)
  - `$ git push --all`





