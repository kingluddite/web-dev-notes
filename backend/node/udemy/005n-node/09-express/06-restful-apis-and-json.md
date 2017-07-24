# RESTful APIs and JSON
* Express make this easy

## REST
* An architectural style for building APIs
* Stands for 'Representation State Transfer'
* We decide that HTTP verbs and URLs mean something

## Let's get rid of our AJAX post
`app.js`

* Delete this part of the code

```js
app.post('/personjson', jsonParser, function(req, res) {
  res.send('Thanks for sending JSON data');
  console.log(req.body.firstName);
  console.log(req.body.lastName);
});
```

`index.pug`

* Delete this part of the code

```
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

## Let's take a look at what a RESTful API would look like
`app.js`

```js
app.get('/api/person/:id', function(req, res) {
  // get that data from database
  res.json({ firstName: 'John', lastName: 'Doe' });
});

app.post('/api/person', jsonParser, function(req, res) {
  // save to the database
});

app.delete('/api/person/:id', function(req, res) {
  // delete from the database
});
```

* Above is the idea of a RESTful API
* We do this because if we build routes like this

`app.get('/api/person/:id/post`...

* And

`app.get('/api/person/:id/delete`...

* If we routed like above it would be hard to judge then what the HTTP request is supposed to do if you are just looking at the request
* The HTTP request already has these verbs given to us so that we can respond to them
* So having a RESTful API is you design your API so that it responds to the HTTP request verbs in a way that's expected
* And you also look at the URL and understand what it's doing
* So if I combine the URL `/api/person/:id` with the HTTP verb `app.delete` I can guess what it will do

## That's all what the idea of a RESTful API is
* Typically it accepts and returns JSON
* And deals with the standard HTTP methods (aka verbs)
* Has decent, clear URLs that are clear about what they do
* That makes is very easy to use
* Whenever you hear the phrase "we can build a RESTful API", don't be intimidated, it just means:
    - Follow a good URL structure
    - And deal with HTTP methods in a way that one would anticipate
    - Express makes this easy because it already allows us to deal with the verbs in a very direct way
        + `app.post()`
        + `app.get()`
        + `app.delete()`
        + ...

