# Templates and Template Engines
* Express comes with the ability to plugin lots of different template engines

## Express is unopinionated
* It likes you to have choice

## Using Template Engines
* Express site > Guide > [Using Template Engines](https://expressjs.com/en/guide/using-template-engines.html)

### Set the view engine
`app.set('engine name', engine extension)`

### Use EJS template engine
[EJS website link](http://ejs.co/)

### Use Pug template engine
[Pug website link](https://pugjs.org/api/getting-started.html)

### Install Pug
`$ npm i pug -S`

#### Use the pug view engine
`app.js`

```js
// more code
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'pug');
```

* By default express will use the `/views` folder as the location of our view templates
* **tip** Set your editor to use syntax coloring for your template engine
    - EJS
    - Pug/Jade
    - Handlebars

### `/views/index.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Hello World
  link(rel="stylesheet", href="assets/styles/styles.css")
body
  h1 Hello World
```

### Update our route
`app.js`

```js
// more code
app.use('/', function(req, res, next) {
  console.log('Request URL: ' + req.url);
  next();
});

app.get('/', function(req, res) {
  res.render('index'); // update this line
});
// more code
```

#### View in browser
* You will see what we saw before
* `Hello World` styled with our CSS

### Let's do the same thing for our `/person/:id` route
`/views/person.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Hello World
  link(rel="stylesheet", href="assets/styles/styles.css")
body
  h1 Person: #{id}
```

* I reference the `id` property of the object I will pass to the template

`app.js`

```js
// more code
app.get('/person/:id', function(req, res) {
  res.render('person', { id: req.params.id });
});
// more code
```

* I pass my template an object that I can use inside my template
* Visit this URL:

`http://localhost:3000/person/john%20doe`

* Outputs this:

![output dynamic URL pug](https://i.imgur.com/UKY5ouy.png)

### Why did I lose my stylesheet?
![bad styles](https://i.imgur.com/9ro4Ros.png)

* Because of my URL the path broke
* I need to change the URL of my assets to `/assets` so it will always look to the root of my project for the assets

`person.pug`

```
// more code
link(rel="stylesheet", href="/assets/styles/styles.css")
// more code
```

* There is no `person` folder but the browser doesn't know that
* We have to be thinking of these things

## Just JavaScript inside templates
`person.pug`

```
// more code
body
h1 Person: #{id.length}
// more code
```

* Will output `Person: 8`

## I have flexibility with my templates
* I can loop through objects
* give it arrays of data
* The object I give the view is usually referred to as **the model**
* I can generate the UI
    - That is the point of a template engine
    - I can use **layouts** to create a parent page and then embed child pages inside it
