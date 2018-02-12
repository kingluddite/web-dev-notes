# Create Endpoint
* We will configure our routes

## First Route - Post Route
* Will enable us to create new todos
* Inside API there is basic CRUD operations
    - Create, Read, Update, Delete

### Create
* When you want to create a resource you use the POST http method
* And you send that resource as the **body**
    - Translation: When we make a new todo we send a JSON object over to the server
    - That JSON object will have a **text** property
    - The server will get that **text** property
    - The server will create a new model
    - The server will then send the complete model with the `_id`, the `completed` property and the `completedAt` back to the client

### Setup our first route  
* naming routes
* lots of talk about the "right" way to name routes
* `/todos`
    - pretty standard for creating a new resource (in this case the resource is the todos)
    - To Get todos GET `/todos`
    - To Get an individual todo GET `/todos/123`

## Focusing on getting the body data that was sent from the client
`server.js`

```js
app.post('/', (req, res) => {

});
```

* To do this we need to use the `body-parser` module
    - As stated before
    - body-parser will take your JSON and convert it into an object
    - And it will attach it onto the `req` object

### Configure the middleware to use `body-parser`
```js
app.use(bodyParser.json());

app.post('/', (req, res) => {

});
```

## Send JSON to our express app
* Let's test to see what the body looks like inside Postman

```
app.use(bodyParser.json());

app.post('/', (req, res) => {

});
```

