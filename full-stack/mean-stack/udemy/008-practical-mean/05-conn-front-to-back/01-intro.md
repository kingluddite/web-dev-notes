# Connect Angular 2 Frontend to NodeJS backend
* If we add messages they are all gone
* We need to find a way to make them consistent
* To do that, we need to store them in a Database
* We can create a user but we don't save the user on the backend either

![overall diagram](https://i.imgur.com/BE173vK.png)

* We have our Angular2 app and then we reach out to the NodeJS server whenever we need something
    - To request data
    - We can also make a request to store some data
    - In the end we send a request and hand it off to NodeJS and MongoDB to do something with our data
    - They will send us a response with the status of our request and also send us data back if we requested it
