# HTTP Methods & RESTful APIs (below 90% is what you'll use)

## HTTP REQUEST METHODS
* GET - Retrieve Resource
* POST - Submit Resource
* PUT/PATCH - Update Resource
    - PUT replaces entire thing
    - PATCH updates a portion of that thing
* DELETE = Delete/Destroy Resource

## RESTful API Standards
* GET
    - `/todos`  (Get todos)
* GET
    - `/todos/1` (Get todo with ID of 1)
* POST
    - `/todos` (Add a todo)
* PUT
    - `/todos/1` (Update todo with ID of 1)
* DELETE
    - `/todos/1` (Delete todo with ID of 1)

* **tip** Use plural throughout your REST API (or just be consistent throughout your API)
* It's totally fine to have exact same routes as long as they are different methods
* **bad routes** 
    - POST /addtodos
    - PUT /updatetodos/1
    - You want your API to be RESTful like the standard above
    - **note** Your React and React router could be different

## Restructure our http server
```
const http = require('http');

const todos = [
  { id: 1, text: 'Todo 1'},
  { id: 2, text: 'Todo 2'},
  { id: 3, text: 'Todo 3'}
]
const server = http.createServer((req, res) => {
  let body = [];

  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    res.writeHead(400, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js'
    });

    res.end(JSON.stringify({
      success: false,
      error: 'Please add email',
      data: null
    }));

  })

});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

* We put our writeHead and end inside our end stream (this is where we have access to the body)

`server.js`

```
const http = require('http');

const todos = [
  { id: 1, text: 'Todo 1'},
  { id: 2, text: 'Todo 2'},
  { id: 3, text: 'Todo 3'}
]
const server = http.createServer((req, res) => {
  // destructure stuff we need off the req object
  const { method, url } = req;
  let body = [];

  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    // default to 404
    let status = 404;
    const response = {
      success: false,
      data: null
    }

    if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos;
    }

    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js'
    });

    res.end(
      JSON.stringify(response)
    );
  });

});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

* And if you visit `/todos` you'll get the todos object in the response body
* If you got to any other route you'll get 404 status error and the default success false and null for data

## And a POST would look like
```
// MORE CODE

if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos;
    } else if (method === 'POST' && url === '/todos') {
      const { id, text } = JSON.parse(body);
      todos.push({ id, text });
      status = 201;
      response.success = true;
      response.data = todos;
    }
// MORE CODE
```

* But if you submit you'll get an empty object (make sure POST is REST method in Postman)
* You need to add the raw JSON
* **Note** Numbers don't need quotes in JSON

```
{
    "id": 545345,
    "text": "this is cool"
}
```

* Now click `Send` and you'll see that the todo is added into the todos array and your server status is `201` (created)

## Validation
* Let's say the todos need to have an `id` and `text`
* Currently if we remove the `text` the route still works

```
// MORE CODE

} else if (method === 'POST' && url === '/todos') {
      const { id, text } = JSON.parse(body);

      if (!id || !text) {
        status = 400;
      } else {
        todos.push({ id, text });
        status = 201;
        response.success = true;
        response.data = todos;
      }
    }
// MORE CODE
```

* Now you get a 400 client error if you submit JSON with both and `id` and `text`

## Send error info in response
```
// MORE CODE

req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    // default to 404
    let status = 404;
    const response = {
      success: false,
      data: null,
      error: null
    }

    if (method === 'GET' && url === '/todos') {
      status = 200;
      response.success = true;
      response.data = todos;
    } else if (method === 'POST' && url === '/todos') {
      const { id, text } = JSON.parse(body);

      if (!id || !text) {
        status = 400;
        response.error = 'id and text are required';
      } else {
        todos.push({ id, text });
        status = 201;
        response.success = true;
        response.data = todos;
      }
    }

    res.writeHead(status, {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Node.js'
    });

    res.end(
      JSON.stringify(response)
    );
  });

});

// MORE CODE
```

* Now if you don't send `test` in JSON

```
{
    "success": false,
    "data": null,
    "error": "id and text are required"
}
```


