# Advanced Postman
* We can work with Postman better using environmental variables
* Adding x-auth variables every time on every route is a waste of time

![manual x-auth postman](https://i.imgur.com/bxiwZFm.png)

* Set it once and use it in all the other requests

## Tests section of Postman
![tests section](https://i.imgur.com/DwfGVO6.png)

* This is a spot where we can run some code after a test comes back
* We could use this to make sure the request performed as expected but our test suite does that for us

### Manage environment variables on Postman
* Snippets on right to get you started
* We'll do 2 things
    1. fetch the token
    2. set the token equalt to an environment variable

#### View current environment variables on Postman
![click eye icon](https://i.imgur.com/cAUOxNm.png)

* Notice the `url` we created before `{{url}}`
* `postman` is an object inside postman that gives us the ability to manipulate things inside our test text area
* We will add an `x-auth` environment variable

##### Steps to make the magic happen
1. Type in Postman Tests textarea:

```js
var token = postman.getResponseHeader('x-auth');
postman.setEnvironmentVariable('x-auth', token);
```

2. **important** Make sure to save request by clicking `Save` button in Postman
    - I forgot to do this and my environment variable was not created, and I lost my Tests script and had to type it again

![add environment variable in postman test text area](https://i.imgur.com/RLsOOZi.png)

3. Now view POST /users route on Postman of Todo App Heroku
4. Change to new email in `Body` tab of Postman

```js
{
  "email": "luke@starwars.com",
  "password": "jediknight"
}
```

5. Click `Send` (Things look similar)
    * We see the `x-auth` in the **Headers** tab of the `response`
    * `200` status in the body
    * _But this is the cool part_, we now have an `x-auth` variable!

![x-auth in postman](https://i.imgur.com/X1NTq4b.png)

### How does this help?
* We now get the `x-auth` token stored in the token variable on every route so now using private routes in Postman testing just got a WHOLE LOT EASIER

### Let's take it for a test drive
#### GET /todos
* Click Send
* We get a 401 Unauthorized error
    - Previously we had to get the x-auth value every time and create a key/value pair in Postman
    - Now we just type in `x-auth` in key and `{{x-auth}}` in value and hit `Send` and it should work
    - We can now send requests without every having to copy a value

## Add these 2 lines to POST /users/login
* Inside that Postman route of the Tests textarea

```js
var token = postman.getResponseHeader('x-auth');
postman.setEnvironmentVariable('x-auth', token);
```

* And remember to click `Save`
* Click eye to see new `x-auth` value

**note** Both `signup` and `login`

## Now update all private requests
* Open each of the following routes stored in our Postman TodoApp `Headers` tab
* **save** each one you add by clicking `Save` button

**key** `x-auth` **value** `{{x-auth}}` are both going to get an `x-auth` token back

* POST `/users` (signup) we did this already --- gets `x-auth` token back
* POST `/users/login` (login) we did this already --- get `x-auth` token back
* POST `/todos`
* GET `/todos/:id`
* DELETE `/todos/:id`
* PATCH `/todos/:id` (this is the update a todo route)
* GET `/users/me`
* DELETE `/users/me/token` (logout request)

* After doing the above we never have to copy x-auth and paste into Postman
* We just click the routes and we get the data back

## Do the same for the `id` value
* We've had to manually copy id's and pass them in as parameters
* Ideally the 'id' value will be the last todo created
* We can do this by changing the POST /todos route
    - Click `Tests` tab
    - Type in textarea code that will grab the `_id` from the response body and we'll set that equal to an environment variable (just like we did with `x-auth`)
    - Then we can use that variable inside the URL like `{{url}}/todos/{{todoId}}`
        + We need to use `JSON.parse()` to take the json value and convert it into a JavaScript object
        + `postman` gives us access to the JSON reponse via `responseBody`

`(code inside Tests textarea of POST /todos)`

```js
var body = JSON.parse(responseBody);
postman.setEnvironmentVariable('todoId', body._id);
```

* Make sure to save the request by clicking `Save`
    - **Note** even though we saved it we do not have a `todoId` environment variable when you click the `eye` icon of Postman
    - But after you send you click `eye` icon again and you'll see the `todoId` environment variable

![no eye-icon](https://i.imgur.com/BLdnrk3.png)

* Click `Send`

* That is holding the exact same `_id` value inside the Body response at the body after we hit `Send`

## Update todo routes that require `_id`
* GET /todos/:id
    - {{url}}/todos/{{todoId}}
        + Click `Save`
        + Click `Send` and you get the todo we just created
* PATCH /todos/:id
    - {{url}}/todos/{{todoId}}
        + Click `Save`
        + Click `Send` and you update the todo we just created
        + You will see
        + **(bug)** the `completedAt` is **null** and should be set to a time stamp??? FIX THIS!
* DELETE /todos/:id
    - {{url}}/todos/{{todoId}}
        + Click `Save`
        + Click `Send`
        + The Delete worked with 200 and the todo was deleted
        + If you try to use GET /todos/:id now you will get a 404 because that todo no longer exists

## All of the changes will work locally automatically!
* In Postman, switch to Todo App Local
* Start up `$ mongod`
* Start up `$ node server/server.js`
* Wipe local collections in robomongo
* In Postman
    - Create a user with POST /users route
    - And then all is working as expected
    - Our x-auth postman environmental variable was created
    - GET /todos ---> we have no todos
    - POST /todos ---> create a todo
        + We have a todo
        + The todoId is populated
    - GET /todos/:id --> get individual todo (based on environment variable)
    - PATCH /todos/:id ---> We can update it
    - DELETE /todos/:id ---> We can delete it
    - GET /users/me ---> We can get the user
    - DELETE /users/me/token ---> We can log out the user
        + Now x-auth token is deleted and private routes will all fail
        + But if you login with correct email/password (check robomongo for email ---> password is hashed) and you have an `x-auth` generated again and can access all the private routes again

## Tip
* For any API you create down the line, use this setup as it will make life so much easier
    - Testing
    - Issuing all your requests you have saved in your Postman collections
