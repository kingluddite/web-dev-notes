# List Resources with GET
* Create a new route that will show all todos

`server.js`

```js
// more code
app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
```

### Fire up the server!
`$ node server/server.js`

* Now you're watching on port 3000
* Currently our app and our tests is the same db
* But because of this we wiped all our data in our tests (we'll need to fix this setup by having a test only db)

![data wiped from testing](https://i.imgur.com/o8DwBDy.png)

## View in Postman
GET and localhost:3000/todos

* You'll see we have an object with an empty array for our todos

```
{
    "todos": []
}
```

## Houston we have a problem
* Manually creating a route each time can get tedious
* With Postman
    - We can create a collection of routes
    - So we can refire requests without having to refire all this info
    - Right Save
        + Request NAME
            * HTTP METHOD URL/
            * GET /todos
            * There is a default Postman collection
            * Create a new one called `Todo App` and save it

![new Postman collection](https://i.imgur.com/oWGRFl6.png)

* Now to run that route
    - Click Todo App
    - Click Send
    - And the request fires
* Create a POST request to create a todo
* Save it to our collection
    - Choose POST from dropdown
    - Select Body
        + Choose raw
        + Choose JSON (application/json)

```json
{
    "text": "Postman created this todo"
}
```

* Hit send
* It creates a todo
* Save as
* Choose the Todo App collection
* Now you can easily view your todos and create new ones using Postman

## Git
`$ git commit -a -m 'Add GET /todos route'`

You can also use
`$ git commit -am 'Add GET /todos route'`

* The `-a` flag adds all modified files to the commit
* It does not work for new or untracked files



