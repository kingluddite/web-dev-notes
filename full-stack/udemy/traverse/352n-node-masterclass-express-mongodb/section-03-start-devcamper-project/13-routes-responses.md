# Express routes and responses
`server.js`

```
// MORE CODE

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
});
// MORE CODE
```

* Postman
    - GET
    - `localhost:5000`
    - Output: Hello from Express (Body tab of response)
    - 200 status
    - `text/html; charset=utf-8` default header for `Content-Type`
        + This means we could put HTML in our send and the browser would parse it (by default)
    - Click `Preview` tab and you'll see what page will look like in browser

## Troubleshoot
### fixing eslint
* https://github.com/wesbos/eslint-config-wesbos/blob/master/.eslintrc.js
    - **error** VS code shows `html` plugin error from wes code 
    - need to remove `html` plugin
    - save file as `.eslintrc.js`
    - copy and paste wes code to `.eslintrc.js`
    - Then eslint will work

## What if I want to send JSON?
* **note** I just pass an object (_and Express is smart enough to run `JSON.stringify()` in the background_)

```
app.get('/', (req, res) => {
  res.send({
    name: 'John',
  });
});
```

* output

```
{
    "name": "John"
}
```

* **Express is helping us!** And if you look at Headers Express is converting `Content-Type` to `application/json`

## But if you want to send JSON you should use res.json()
```
app.get('/', (req, res) => {
  res.json({
    name: 'John',
  });
});
```

## How to manually change status
```
app.get('/', (req, res) => {
  res.sendStatus(400);
});
```

* That will give you a 400 Bad Request status and say `Bad Request` in response body
    - But we would like to send data back on success and a message of why it failed

```
// MORE CODE

app.get('/', (req, res) => {
  res.status(400).json({
    success: false,
    error: 'Did not give us what we wanted!',
  });
});
// MORE CODE
```

* **Best Practice** Even with success it good to send 200 status and an object with success and data like this:

```
// MORE CODE

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: { id: 123 },
    error: null,
  });
});
// MORE CODE
```

* Output

```
{
    "success": true,
    "data": {
        "id": 123
    },
    "error": null
}
```

## Route Structure
GET/POST/PUT/DELETE

* /api/v1/bootcamps
* /api/v1/courses
* /api/v1/reviews
* /api/v1/auth
    - Auth is a little different as it is not a CRUD resource
* /api/v1/users

### Why `v1`?
* We are versioning our API
* We do this just in case we decide to update our API
    - And we do this to not affect the `v1` route
    - Any frontend apps that uses our API can still use v1 (if we move to v2)
    - We might keep it or specify in docs they have a certain amount of time to update before the API is deprecated

```
// MORE CODE

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: 'Create a bootcamp' },
    error: null,
  });
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Update a bootcamp with ${req.params.id}` },
    error: null,
  });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Delete a bootcamp with ${req.params.id}` },
    error: null,
  });
});
// MORE CODE
```

### And view this in Postman

* Visit this routes:
    - GET -  `localhost:5000/api/v1/bootcamps`
        + ouput

```
{
    "success": true,
    "data": {
        "msg": Get all bootcamps"
    },
    "error": null
}
```

    - POST - `localhost:5000/api/v1/bootcamps`
        + output

```
{
    "success": true,
    "data": {
        "msg": "Create a bootcamp"
    },
    "error": null
}
```

    - PUT - `localhost:5000/api/v1/bootcamps/123`
        + output

```
{
    "success": true,
    "data": {
        "msg": "Update a bootcamp with 123"
    },
    "error": null
}
```

    - DELETE - `localhost:5000/api/v1/bootcamps/123`
        * output

```
{
    "success": true,
    "data": {
        "msg": "Delete a bootcamp with 123"
    },
    "error": null
}
```

## As you can see our routes can make our file very long
* A better way would be to put all our routes in a separate file
* And we'll do that Next!
