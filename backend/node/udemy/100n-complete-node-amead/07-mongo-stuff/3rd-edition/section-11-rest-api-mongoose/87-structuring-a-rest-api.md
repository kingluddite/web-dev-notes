# Structuring a Rest API
## What does REST stand for?
* Representational State Transfer - Application Programming Interface (REST API or RESTful API)

## What is an API?
* A set a tools that allow you to build software applications
* It is a very broad term

### Examples of APIs
* Node provides us with APIs
    - `fs` - enables us to build the apps we want to build
* Express provides us with APIs
* The REST API we are creating will allow others to build out their software

## What does Representation State Transfer mean?
* The REST API allows clients (such as a web application) to access and manipulate **resources** using a set of **predefined operations**

### What is a resource?
* A User or a Task

### What is a predefined operation?
* With Tasks it could be:
    - The ability to create a new task
    - Or mark a task as complete
    - Or more advance.. upload a profile picture for your account
* These predefined operations are going to allow a client (like a web app) to go through the process of creating a front end for a Task manager (in our example)

### Representational State Transfer
* Representational
    - We are working with representations of our data
    - So the data is stored in the Database
* Using a REST API I can fetch data I can manipulate data and I can perform all the basic CRUD operations so we are working with representations of our users and tasks

### State Transfer
* A REST API the server is stateless
* The state has been transferred from the server to the client
* Each request from the client (such as a request from a web application) contains everything needed for the server to process that request
    - This includes the operation you are trying to perform
    - All of the data the operation actually needs in order to work
    - It also includes things like Authentication
        + To make sure that the user who is trying to perform the operation is actually able to do so

## In practice our requests will be made via HTTP requests
* This is how a client (like a web app) is able to perform those prefedined operations

### Send HTTP request to server
GET /tasks/somelongidhere

![Need a task data to show](https://i.imgur.com/zfkhWtr.png)

* Now after we make the request to the server
* The server will go through the process of fulfilling it

### Server sends back what it found to the client
* As part of the HTTP response

200 - JSON Response

* 200 is a status code (indicating that all went well)
* And the JSON response which is the data requested

![Server sends back response with what it found in Database](https://i.imgur.com/Y55Ausj.png)

### Server send data to client and client can render things
![client renders things](https://i.imgur.com/vm9c784.png)

GET is requesting data

POST is creating data
DELETE is deleting data
PATCH or PUT is updating data

### When we create, update or delete data
* We still have a client and a server
* And we're still making a HTTP request after some need that needs to be fulfilled

![other HTTP requests](https://i.imgur.com/HKG3V6F.png)

* I will need to authenticate as myself
* And I need to perform one of our predefined operations
* I'll fire the request off

POST /tasks - JSON request
* POST is used for creating data
* And we are also sending along JSON with the request
    - Like a name and description of a Todo

![POST request](https://i.imgur.com/yJ3wQLp.png)

## When the server receives our request
* It will verify that we are who we say we are through authentication
* Then it will create a todo associated with us
* And once the task is created we get the response back
* The status code will be 201 (which signifies that the resource was created) and we also get a JSON response which is the new task that was created

![new task created in JSON 201 response](https://i.imgur.com/c4dYqIT.png)

## The client gets the response
* And it will be able to use it to signify to the user in the UI that things went well and the task was created

![time to render the data](https://i.imgur.com/qR8dJ8y.png)

## Let's define the predefined operations for CRUD operations
* For "The Task Resource"
* Create: POST /tasks
    - **note** Every single REST API operation is defined with 2 pieces of data:
        + The HTTP method (POST)
        + The path (/tasks)
    - This is what we set up for creating a resource
* Whatever we are creating is the pluralized version
    - So if we were creating a product it would be `POST /products`
        + or an order `POST /orders` (or whatever resource you are working with)
* This is the basic URL structures

![basic URL structures](https://i.imgur.com/f4lm1GX.png)

/resource (Pluralized)

## What makes up a HTTP request
* What exactly is getting sent back and forth between the client and the server
    - Answer: Just some text

### The Request
![The Request](https://i.imgur.com/95TuHFY.png)

* Line #1: This is known as the Request Line
    - The HTTP method being used
    - The path
    - The HTTP Protocol
    - Example: POST /tasks HTTP/1.1
        + This lets us know we are trying to create a new resource
* After that Request Line we have as many Headers as we need
* This example has three:
    - Accept
    - Connection
    - Authorization
* **note** Headers are nothing more than key/value pairs which allow you to attach meta information to the request
    - We use Accept to say we are expecting JSON data back (which is what we'll get)
    - We use `Connection` to say that we are likely to make more requests shortly (so let's keep this connection open to keep things fast)
    - And we also set up `Authorization` to set up authentication
    - **Note** Remember we can have as many headers as we need and after all the Headers we'll have an empty line followed by the Request `body`
    - When we POST data to `/tasks` we have to provide that data (and we provide it as JSON right inside the request.body)

`{"description:": "Order some new books"}`

* Once the server gets this request it's going to be able to parse it and Express does great work for us by giving us access to all of this in a much easier interface and it sends back a response

![the server reponse](https://i.imgur.com/UghAmTy.png)

* Looks quite similar to the request
    - We have the status line which contains the protocol, followed by the status code followed by the text representation of the status code
* We see our protocol's match up
* The status code is 201 (201 stands for Created)
* Then we have our `Response Headers`
    - Date (the time all this happened)
    - Server (Express)
    - Content-Type (metadata about what's below - and here we are saying that it's JSON)
* We have an empty line
* Followed by the response body (which in our case is the complete task)

```
{
    "_id": "long mongod id",
    "description": "Order more books",
    "completed": false
}
```

* **Note** we'll send body JSON in the request when we are trying to pass things over to the server
    - And we will get body JSON in the response for almost everything we do
