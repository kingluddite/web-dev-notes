# Sending Data to the Server
* How to send custom Headers
* As well as content in the body
* So far we are concerned with route info

## How to send a custom Header
* You could do with with:
    - axios
    - fetch
    - $.ajax (jquery)
    - We are using Postman
* Let's fake send an authorization token via the header
    - We click on `Headers` tab in Request part of Postman
    - We set `Authentication` for **key** and some long string `werqwerwersasfasfsd` as it's **value**
        + You would send authorization token or JWT token
            * If you have authentication within your API
            * You would send the `id` of the user that is being logged in

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.writeHead(400, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
  });

  console.log(req.headers);
// MORE CODE
```

* Look at the Terminal after clicking send in postman (and adding Authorization key with a string value)

```
// MORE CODE

{
  authorization: 'asdfasdfasdfasdeqwerqwerqwerqwerwe',
  'user-agent': 'PostmanRuntime/7.23.0',
// MORE CODE
```

* We can even grab the authorization token

```
// MORE CODE

  console.log(req.headers.authorization);
// MORE CODE
```

* Will give us this in the terminal:

```
asdfasdfasdfasdeqwerqwerqwerqwerwe
```

## Now sending data in the body is a bit different with the Node http module
* But Express makes this very easy with `req.body.email`

### the http module involves a lot more coding
* We have to listen to the request (req) data and event
* req is a "readable stream"
    - So we can use `req.on` and on a `data` event we can have a callback function that takes a `chunk` as a parameter
    - We initialize a body array (because anything that's send in the body I want to add it to the `body` array)
        + So we push onto the body array that chunk
    - We have to listen for `on('end')` for end of stream
        + And in that callback function we give body access to the `Buffer` and we `concat()` onto the body array

```
// MORE CODE

let body = [];

  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body);
    console.log(body);
  })
  res.end(JSON.stringify({
    success: false,
    error: 'Please add email',
    data: null
  }));
// MORE CODE
```

* Then in Postman we need to send JSON in the body
* We type raw JSON like this:

```
{
    "todo": "do something"
}
```

* We can remove the `Authorization` key and value
* And instead add `Content-Type` with a value of `application/json`
* Select `Body` > `raw`
* Then we click `Send` and that gives us the Buffer (long string of numbers)
    - Doesn't do us much good
    - But if we turn that Buffer into a string with `toString()` method

```
// MORE CODE

req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString(); // We add this on
    console.log(body);
  })
// MORE CODE
```

* Now we'll get this in the Terminal
    - Now we are actually getting the body object

```
{
        "todo": "do something"
}
```

## Next
* Work with the Methods and the URLs and do something based on that
    - This will give us the beginnings of a REST API
    - We won't do the whole REST API with just the Node `http` module
