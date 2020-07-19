# Respond With Data
```
// MORE CODE

const server = http.createServer((req, res) => {
  res.write('hello');
  res.end();
});
// MORE CODE
```

## Postman
* GET
* `localhost:5000`
* Click on `Body` tab
    - You will see `hello`
    - This is our 200 response
    - `hello` is in our response body

## Rule - Always have a content-type in the header
* very important
* content-type is spelled `Content-Type`
* Especially if you are sending HTML otherwise the browser won't know to render HTML

### How to send a header
* We'll set the `Content-Type` for our header
* We just want to send plain text

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('hello');
  res.end();
});
// MORE CODE
```

* Click `Send` in Postman
* Click on `Headers` tab
    - You'll see `Content-Type` with a value of `text/plain`

### What if I wanted to send HTML as a response?
* **note** You can send as many res.write() as you want

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('<h1>hello</h2>');
  res.write('<p>hello</p>');
  res.write('<p>hello</p>');
  res.end();
});
// MORE CODE
```

* And if you view in the browser you won't see HTML formatted but just a string of text
    - `http://localhost:5000/`
        + `<h1>hello</h2><p>hello</p><p>hello</p>`

## We have send our response with a content type of
```
// MORE CODE

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=ISO-8859-1');
  res.write('<h1>hello</h2>');
  res.write('<p>hello</p>');
  res.write('<p>hello</p>');
  res.end();
});
// MORE CODE
```

* View in browser and now the HTML is rendered
* Note there are response header and request headers

## Add non-standard headers
* To do this we use `X-` in front of it
    - A common one is `X-Powered-By` and we set it to what it server it is and we'll set it to Node.js

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=ISO-8859-1');
  res.setHeader('X-Powered-By', 'Node.js');
  res.write('<h1>hello</h2>');
  res.write('<p>hello</p>');
  res.write('<p>hello</p>');
  res.end();
});
// MORE CODE
```

* **tip** In postman the `i` circle links, if you hover over them they'll tell you what those header keys are for

## Our app will be returning JSON
* This is typical with data from a Database
* The official `Content-Type` if you are using JSON is `application/json`
* We will mock an array of objects (but in real world this would be data coming from a database)
* If you are just returning one thing you don't need to use `res.write()` you can just put it inside `res.end()`
* We need to pass `res.end()` and object and give it a success key with a true value and pass `todos` as our data

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  res.end({
    success: true,
    data: todos
  });
});
// MORE CODE
```

* We'll get an error because it is expecting `JSON` and we are passing it an object
    - This is our error `TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer. Received an instance of Object`
    - Writing JSON manually means lots of quotations around key value pairs
    - This is cumbersome to type
    - To make live easier we use JSON.stringify() to convert our object into a JSON string

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  res.end(JSON.stringify({
    success: true,
    data: todos
  }));
});
// MORE CODE
```

* In Postman click Body and you'll see:

```
{
    "success": true,
    "data": [
        {
            "id": 1,
            "text": "Todo 1"
        },
        {
            "id": 2,
            "text": "Todo 2"
        },
        {
            "id": 3,
            "text": "Todo 3"
        }
    ]
}
```

* Or in the browser you'll see:

![firefox showing JSON natively](https://i.imgur.com/j6Z35Cc.png)

* Firefox shows JSON formatted natively
* With Chrome you'd need to install a Chrome extension to make it pretty

## Express will make this much easier
* We won't have to use `JSON.stringify()`
* We can just use `res.send()` and put an object in and it will take that object and it will take care of the rest for us
* We don't have to specify the `Content-Type`

### http module
* Using this gives you an idea of what goes on under the hood under Express
