# Querystring and Post Parameters
* From HTTP Requests in Express
* This is important because we are handling the HTTP requests ourselves on the server
* `http://domain.com/?name=bob&job=banker`

## GETing data
```
GET /?id=4&page=3 HTTP/1.1
Host: www.domain.net
Cookie: username=test;name=John
```

* But when the browser builds the GET request the querystring will be in the Header of the **request**
    - So we then need to parse the HTTP request
    - Pull out that data
    - And put it into a format we can use in our code
* Cookies also come along for the ride
    - Any cookies stored in your browser

## POSTing data
```
POST / HTTP/1.1
Host: www.domain.net
Content-Type: application/x-www-form-urlencoded
Cookie: num=4;page=2

username=John&password=pwd
```

* The browser forms a POST
* The Content-Type is `application/x-www-form-urlencoded`
    - All that means is the querystring is moved into the body of the HTTP request
    - So you know longer see it in the URL because it is no longer part of the URL but it is the exact same data sitting in the body of the request

## Sending JSON data
```
POST / HTTP/1.1
Host: domain.net
Content-Type: application/json
Cookie: num=4;page=2

{
    "username": "Tony",
    "password": "pwd"
}
```

* When you send JSON data from the browser
    - Like using a tool like jQuery to help send some JavaScript objects on the browser side (client side)
    - Then you end up with a **Content-Type** of `application/json`
    - The JSON string is also in the body of the request (similar to when you're posting a form)

## Format of the HTTP request
* All of the above have to do with the format of the HTTP request
* In order to get the data out, we'll need some **middleware** in some cases in order to process this part of the request, the body itself, so that we can then work with the data

## The querystring
* Is the easiest to work with because the Express request object already parses it out for us

`app.js`

```js
// more code
app.get('/person/:id', function(req, res) {
  res.render('person', { id: req.params.id, Qstr: req.query.qstr });
});
// more code
```

`person.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Hello World
  link(rel="stylesheet", href="/assets/styles/styles.css")
body
  h1 Person: #{id}
  h2 Querystring Value: #{Qstr}
```

* URL `http://localhost:3000/person/john%20doe`
* Refresh browser and Querystring will have no value
* But if you enter a querystring in the URL like this:

`http://localhost:3000/person/john%20doe?qstr=123`

* Querystring will have a value of `123`

![querystring value](https://i.imgur.com/s97OWIP.png)

* This generated an HTTP request that included the querystring in the `header`
* That was parsed
* And made available to me in Express via the `.query` object

`req.query.qstr`

* And it is available to me as `qstr` which is a property on the `query` object
* That is fairly straightforward and simple

## Forms and JSON data being posted - not so simple
* We'll need to be able to parse the `Body` of the HTTP request and Express doesn't handle this out of the box
* That means we need to use more **middleware**
    - We need something between the request and the response
    - Something that will look at the request give us access to that information
    - Parse that content of the HTTP request for us so we can work with it
    - We could do it ourselves but `body-parser` is what we'll use

## Install body-parser
`$ npm i body-parser -S`

## Require it
* It won't just work like a view engine so I must require it
* It will not automatically hook 

`app.js`

```js
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
// more code
```

* We want to treat things differently depending on the URL
* We don't want to parse the body for every single HTTP request
    - Just for Posts and certain others

```js
// more code
const port = process.env.PORT || 3000;

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
```

* Then we just pass it back as a callback to the post statement

```js
app.get('/person/:id', function(req, res) {
  res.render('person', { id: req.params.id, Qstr: req.query.qstr });
});

app.post('/person', urlencodedParser, function(req, res) {

});
```

* `urlencodedparse` will be **middlewar** that will be called before the function is called
* So when the POST verb is seen and the `/person` route is "hit", then the `urlencodedParser` middleware will run and then the function will be invoked
* `req.body` will be added by the `urlencodedParser` middleware
* And we just add on our form value names as properties of the `req.body` object

`app.js`

```js
// more code
app.post('/person', urlencodedParser, function(req, res) {
  res.send('Thanks for being you!');
  console.log(req.body.firstName);
  console.log(req.body.lastName);
});
// more code
```

## Now we build an HTML form
`index.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Hello World
  link(rel="stylesheet", href="/assets/styles/styles.css")
body
  h1 Hello World
  form(action="/person" method="POST")
    label(for="firstName") First Name:
    input(type="text" name="firstName" id="firstName")
    label(for="lastName") Last Name:
    input(type="text" name="lastName" id="lastName")
    input(type="submit" value="Submit")
```

* View http://localhost:3000/ and refresh

![home form](https://i.imgur.com/cEBpQgx.png)

* Submit and you'll be routed to `localhost/person`
* `Thanks for being you!` will be in browser
* Terminal will have

```
John
Doe
```

* When you submit the form the browser takes the `name` attribute for each form element and builds the query string `?firstName=john&lastName=doe`

### Now we want to send JSON data via POST 
`app.js`

```js
// more code
// create application/json parser
var jsonParser = bodyParser.json(); // add this line

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// more code
```

### Create the JSON post route
`app.js`

```js
// more code
app.post('/personjson', jsonParser, function(req, res) {
  res.send('Thanks for sending JSON data');
  console.log(req.body.firstName);
  console.log(req.body.lastName);
});
// more code
```

* Now we will add jQuery to send JSON data
* The JavaScript in our Pug template won't be run by Node, it will be run by the browser
    - If you created Pug variables, then it would be running that JavaScript inside Node
    - But we aren't doing that so our JavaScript will be sent as the final text in the response

`index.pug`

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Hello World
  link(rel="stylesheet", href="/assets/styles/styles.css")
body
  h1 Hello World
  form(action="/person" method="POST")
    label(for="firstName") First Name:
    input(type="text" name="firstName" id="firstName")
    label(for="lastName") Last Name:
    input(type="text" name="lastName" id="lastName")
    input(type="submit" value="Submit")
script(src="https://code.jquery.com/jquery-3.2.1.min.js")
script.
  $(document).ready(function(){
    $.ajax({
      type: "POST",
      url: '/personjson',
      data: JSON.stringify(
        {
          firstName: 'Jane',
          lastName: 'Doe'
        }
      ),
      dataType: 'json',
      contentType: 'application/json'
    });
  });
```

* I will send my data object that will be converted to a JSON string
* It will create and HTTP request that is a POST
* To this URL `/personjson`
* With this content type `application/json`
* Run `localhost:3000` in browser
* Chrome **Network** tab will show:

![network](https://i.imgur.com/nxQjzvh.png)

* Payload shows our JSON being transferred to Node
* Terminal will show `Jane Doe`

## Steps
1. I rand the post
2. It took our data from the post
3. Which was converted to a string by the JavaScript Engine running on the browser
4. The browser sent that HTTP request
5. Then the JavaScript Engine running on the server
6. Took that data and converted it to JavaScript objects
