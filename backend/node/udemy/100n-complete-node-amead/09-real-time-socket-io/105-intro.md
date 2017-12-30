# Socket.io and websocket
* Allow two way communication between the server and the client
* We already set up a node server
    - We are also going to set up a client
        + Client could be:
            * A web app (we are building a web app)
            * A IOS app
            * An Android app

## Browser Server
* We are going to create a way to move data from server to browser or browser to server

### Todo App
* Data only came in one direction because the client had to initialize the request
* Socket.io enables us to send data back and forth instantly
* So for real time apps
    - food app
    - email app
    - chat app
    - The server doesn't have to wait for the client to issue information
    - The server could say, yo, I just got something you probably want to show the user, so here it is

### How to integrate socket.io into a node app
