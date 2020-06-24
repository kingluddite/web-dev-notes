# Important HTTP status codes
* [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

1.xx Information  1.xx Informational

* **note** We won't deal with 100 range http status codes

2.xx Success
200 Success
201 Created
    * If you inserted something into a Database than you would want to return a `201` which means request was successful AND something was created
204 No Content
    *  A successful response with no content
        -  If you were deleting something off the server, you would return a 204 response

3.xx Redirection
304 Not Modified
    * If you make the same request but nothing has changed on the server

4.xx Client Error (this means something went wrong and it's the client's fault)
400 Bad Request
    * Example
        - If you submitted a registration form and an email was required but you didn't send an email or if the email wasn't formatted correctly then you would get back a `400` error because you sent a Bad Request (You didn't give what was needed to make a successful request)
        - Many times form validation errors will be `400`
401 Unauthorized
    * Means you don't have access to make a successful request
        - Example: so if you were to fetch some data that was protected where you needed to be logged in and you weren't than you would get a `401` Unauthorized client error
404 Not Found
    * Page not found
    * Also if you were searching for a user in the Database that doesn't exist
        - And the reason it is a client error is that you are requesting something that is not there
5.xx Server Error
    * If something goes wrong on the server you send a `5xx` error
500 Internal Server Error
    * Any bugs in the code you return `500`

## Manually set a server status
* We'll send a 404 error
* This means we are sending no data back so we'll set that to null
* And we'll set success to false

```
// MORE CODE

const server = http.createServer((req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  res.end(JSON.stringify({
    success: false,
    error: 'Not Found',
    data: null
  }));
});
// MORE CODE
```

* You'll see a 404 on Postman with this object in the Body

```
{
    "success": false,
    "error": "Not Found",
    "data": null
}
```

* Above is a typical API response
* This lets the Client know that whatever they searched for is not there

## We can write our header a bit cleaner
```
// MORE CODE

const server = http.createServer((req, res) => {
  res.writeHead(404, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
  });

  res.end(JSON.stringify({
    success: false,
    error: 'Not Found',
    data: null
  }));
});
// MORE CODE
```

* It works the same but looks cleaner

## And if the user didn't send a required email we could send a 400 error
```
// MORE CODE

const server = http.createServer((req, res) => {
  res.writeHead(400, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
  });

  res.end(JSON.stringify({
    success: false,
    error: 'Please add email',
    data: null
  }));
});
// MORE CODE
```

* Even though we didn't write code to validate or accept code from the Client
    - But we still need to send back a response code
    - And we also need to structure our API to respond back with some data and information to let our Client know what's going on
        + Whether it's Postman, a React app, Vue app

## Next
* How to send data to our server
* And get that data 
* In Postman you see we can send Body data as:
    - form-data
    - raw json (what we typically will use when constructing an API)
* And we can also send Headers and grab those as well
