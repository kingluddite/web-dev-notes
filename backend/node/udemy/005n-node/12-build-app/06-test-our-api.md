# Testing our API
* We don't want to have to create a bunch of UI forms to test out our API
* We want to use easy, free tools to help us do this

## Question
* Would it be a problem if I had the following?

`package.json`

```json
// more code
"devDependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.3",
    "mongoose": "^4.11.4",
    "pug": "^2.0.0-rc.2"
}
// more code
```

* Yes, it would be a problem if we pushed to deploy to production
* Since we need the above as dependencies to our project, they won't be installed in the production environment
* To fix, just make sure they are listed as dependencies

```json
// more code
"dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.3",
    "mongoose": "^4.11.4",
    "pug": "^2.0.0-rc.2"
}
// more code
```

## Postman
* A utility to help test our API
* [Download Postman from this URL](https://www.getpostman.com/)
* Install Postman by clicking button to install it on Mac
* You can create an account and log in to sync your account

### What does Postman do for you?
* It enables you to generate HTTP requests
    - GET
    - POST
    - DELETE
    - And More
* And see the responses come back from the server

### How will we use Postman?
* We will create GET, POST and DELETE HTTP requests to our local API
* That will mimic everything I am going to do in my app
    - Calling the API via browser JavaScript (_aka via client side to the server_)
    - In our case, via Angular JS

### Taking Postman for a test drive
![GET request via postman](https://i.imgur.com/UzcfP5D.png)

* I get the results like before
* I also get the Status and how long it took
* I also can click the Headers tab to see the Headers that came back
* I just tested my API
* This is the same result as testing in the browser
* But POST and DELETEs are harder
* But POSTMAN makes POST and DELETE easy too

## Review of our POST api
`app.post('/api/todo`...)

* We are posting to `/api/todo`
* We are using `req.body`
    - That means it will look at the HTTP request BODY and assume that it is JSON and convert that to a JavaScript object and then let us look at the properties sitting on that object
    - body will be a JavaScript object, created from the JSON, sitting in the body of the HTTP request
    - And if there is an ID on that object `req.body.id` then it will do an update
    - If there is NOT and ID, it will create a new Todo with a user name `test`, it will expect a field called `todo`, a property called `isDone`, a property field called `hasAttachment`
    - Then it will save it to the Database
    - Then it will give us back the message `Successfully created new todo`
    - As an HTTP response

## For the DELETE of api
* It will just expect the ID `req.body.id` and that will still be a property on a JavaScript object created from some JSON
* So we'll send JSON at the HTTP body for both DELETE and POST
* Then we should expect to see a success message come back and then we'll know, it did what it was supposed to do
* And then we should be able to query a list of all the todos and see our new todo be created or updated or be deleted

## Let's give it a try in Postman
* We'll make sure our app is running in Node
* We can use multiple tabs in Postman
* We keep the first tab open so we can check back and see how our current list of all documents looks

### Add a todo using Postman
1. Create a new tab
2. Choose POST from the dropdown to to create an HTTP request that is of POST type
    * We'll use that `POST` verb so that the proper function runs inside NodeJS
    * It will handle the POST
    * And add the todo
3. Point to the `http://localhost:3000/api/todo` End Point
    * We can both update a todo (if we have an ID) in our BODY
    * And add a new todo (if we DO NOT have an ID) in our BODY

#### form-data
![choosing form-data](https://i.imgur.com/PsrJcwH.png)

* This would be as if we were posting a form in our browser using name / value pairs
* We will choose **raw**
    - Which means I will just type **raw data** straight in
    - But in stead of Text, I will choose JSON (_application/json_) because that is what NodeJS will be expecting

![raw and JSON](https://i.imgur.com/HnBfVqe.png)

* Notice that it added a `Headers` tab and if you click on it you will see that it has a **Content-Type** of `application/json`

![content-type application/json added to Header](https://i.imgur.com/tEq8QiK.png)

* So we just specified that the Content in the BODY of the HTTP request will be JSON and that is what NodeJS is expecting
* Now we need to type JSON
* It is important that we don't type JavaScript Object Literal Notation but we must type JSON
    - Which means we have to put quotes around everything

### Add this JSON to the Body raw section of Postman
```json
{
    "todo": "Ride Bike",
    "isDone": "false",
    "hasAttachment": "false"
}
```

* We will add this todo to our todos
* And this post this todo
* NodeJS will handle it
* Save it to my `MongoDB` Database
* And that's it
* Click `Send` in Postman to get this party started!
* Click `Body` and you should see `Successfully create new todo`
    - You will see that if all went well
* Go back to other tab with all todos and click `Send` and you will see we just added a new `todo`
    - We just created a new record and it is sitting in our Database and available to use

## Review of what just happened
* I sent an HTTP request with the verb POST
* NodeJS handled it
* I sent the request to localhost:3000
* So that was the port
* So NodeJS was the process that ended up handling that request
* After we posted it
* Express took that HTTP request and ran the function in response to the URL that was requested `api/todo` (and that was part of the HTTP request - what URL it was)
* Then it looked at the BODY and it took our JSON

```json
{
    "todo": "Ride Bike",
    "isDone": "false",
    "hasAttachment": "false"
}
```

* And turned it into a JavaScript object that was made available via request (or `req.body` in our case)

## Now we need to update an existing todo
* The same End Point for Post handles both create and updates
    - We could have done this differently but we chose to do it this way
* Our API will look for an `id` in the todo and if it sees it, it will run the update and not the create
* So I'll copy an existing `_id` from one of my todos by switching to the other tab and copying an `id` from one of the list of todo documents and paste it in the other tab of Postman like this:

```
{
    "id": "59751c241ad9ab0c8ee2dc4c",
    "todo": "Jump Very High",
    "isDone": "true",
    "hasAttachment": "true"
}
```

* I make sure to name `_id` and `id` differently so I know they are two different things
    - One is the `_id` from the `MongoDB` document
    - One is the `id` that is coming from my JSON
* **note** You're `id` will obviously be different than mine
* If you hit `Send` and switch to other tab you will see the todo was updated with that unique `id`
* You can also see that the Body in the other tab shows `Successfully updated`

![successfully updated](https://i.imgur.com/b2uHc9s.png)

## Delete a todo
* API needs a JavaScript object that has an `id` and that's it
* It just wants to know the `id` of the todo we want to delete
* Open a new tab in Postman
* Pick the DELETE verb from the drop down and the URL will be http://localhost:3000/api/todo

![delete postman setup](https://i.imgur.com/oXOzqsY.png)

```json
{
    "id": "59751c241ad9ab0c8ee2dc4c"
}
```

* Click `Send`
* You should see a `Successful deleted` message

![successfully deleted](https://i.imgur.com/Iy4Cn7X.png)

* View the full list of todos in the first tab of postman and you should see the todo was successfully deleted

### CRUD
* Our API is just using the concept of CRUD
* Which is the foundation of much of the apps we build

### What did we just build?
* We did not just build a web application
* We just built a Web API
* We will use Angular to manipulate the API
    - But we don't have to
        + We could build an `IOS` application
        + We could build an `Android` application
        + We could build a `Windows` application
        + A `React` application
        + An `Ember` application
        + A `Meteor` application
        + A `Vues` application
        + A `Backbone` application
        + Whatever we build will just use our API for CRUD
* By building your API first, you expand your options for the future
