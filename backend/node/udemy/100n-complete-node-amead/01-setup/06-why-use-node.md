# Why Use Node?
## Block vs Non-Blocking
![blocking vs non-blocking](https://i.imgur.com/giHiNj0.png)

* Node uses non-blocking I/O
    - I/O: Input/Output
        + Every Node app will use I/O anytime it is trying to communicate with the outside world
        + If your Node app needs to communicate with the machine it is running on (that is I/O)
            * Example: reading some data from a file on the file system
        + If your Node app needs to communicate with some other server (that is I/O as well)
            * Example: querying a Database to fetch some records for a given user (that will be an I/O operation)
            * **note** I/O operations take `time` and with Node.js we get `non-blocking` I/O

## What is non-blocking I/O?
* This means while your Node application is waiting for a response (let's say it's waiting for a response from the Database) it can do other things (aka continue to process other code and make other requests)
* `non-blocking` is actually from the browser
    - `non-blocking` I/O started in the browser because otherwise the browser would freeze up whenever an I/O operation was happening
    - So if I was trying to fetch some data to render to a user, while that data was being fetched the user wouldn't be able to do anything:
        + They wouldn't be able to click links or buttons
        + Obviously that is a terrible UX
        + `non-blocking` I/O is a great thing, it frees up the browser to allow the end user to interact with the UI, while those I/O operations are running in the background
        + The same thing is true with Node, we can continue to do other things while waiting for those long running I/O operations to complete
        + **important** This is a critical feature of what makes Node so great
* Think of a line fetching some data and printing it to the screen
* Both files do same thing but in a different way

### Blocking example
* Bulk of operation time is spent fetching data from Database
* While we are waiting for that data our app isn't doing anything

```
// load in a function defined elsewhere
// functions will be invoke later in code to perform I/O operations
const getUserSync = require('./src/getUserSync')

// goal: take in a user id and go off to Database and fetch that info
const userOne = getUserSync(1)
console.log(userOne);

const userTwo = getUserSync(2)
console.log(userTwo);

const sum = 1 + 33
console.log(sum)
```

### Non-Blocking example
```
const getUser = require('./src/getUser')

getUser(1, (user) => {
  // console.log() is not an I/O operation
  console.log(user)
})

getUser(2, (user) => {
  console.log(user)
})

const sum = 1 + 33
console.log(sum)
```

* **note** Both code blocks about are JavaScript
    - `require()` is Node.js specific (similar to `import` - it is a way to get functionality from another file)

## Visual Representation of blocking vs non-blocking
![blocking vs non-blocking](https://i.imgur.com/wEsqBeg.png)

* non-blocking is almost twice as fast!
* Non-blocking allows your app to process multiple requests at the exact same time for different users
* `event-driven` - That process of registering those callbacks and having them called with the I/O operation is complete
* `Node.js` package ecosystem, `npm`, is the largest ecosystem of open source libraries in the world
    - **note** `npm` was a tool that was installed on your machine when you installed Node.js
    - `npmjs.com` is a website that lists all of the freely available open source npm packages

1. Fetch user on line 3
    * Request requires us to go to DB
    * That is an I/O operation to fetch that user by id
    * This takes a little bit of time (3 seconds)
2. Print users
    * Not I/O operation
    * Take almost no time
3. We wait on the fetching of user2
4. When data comes back we print to screen
5. We add two numbers and print to screen
    * Not I/O
    * Barely any time
    * Print to screen

#### This is how blocking works
* It is called blocking because while we are fetching from db, we wait because our app can not do anything else
* This means our machine sits around idly waiting for our app to respond

### Non-blocking example
* We will build like this when we use Node
* We request data but we don't wait
* This kicks off the event loop inside of Node
* It just takes a little bit of time because we are not waiting for the data
* We kick off another event just takes a little bit of time
* The sum is not I/O we don't have to wait, so we can just add them and print them to the screen
* Then we use a dotted box to simulate the time for our event to be responded to
* It is the same length as our blocking first box
* Using non-blocking does not make our apps any faster but it does let us run more than one operation at same time
* The result is our app finishes much quicker
* blocking takes 3 seconds
* non-blocking 1.5 (difference of 50%)
* So our request each take 3 seconds but the non-blocking run at the same time
* We attach events in non-blocking by attaching callbacks and these callbacks get called later
* We still print out **user1** and **user2** but we just do it when the data comes back
* In of `Node.js` the event loop attaches a listener for the event to finish (_the db to respond back_) when it does it passes in the callback and then we print it to the screen

### Imagine this was a web server
* `node.js` is single-threated, your app is running on one single thread
* Because node is non-blocking this is not a problem
* On blocking we have to beef up the amount of RAM memory resources for each request
* With non-blocking we don't waste resources and do everything on one thread

![execution difference](https://i.imgur.com/ozjTnjt.png)

## npm 
* Every single npm module is non-blocking

## Takeaway
* Node saved time

![saves time](https://i.imgur.com/UQSbdeM.png)

# Why use node?
* `Node.js` uses an event-driven, non-blocking I/O model that makes it lightweight and efficient
* `Node.js` package ecosystem, **npm**, is the largest ecosystem of open source libraries in the world

## What is I/O?
* Input/Output
    - This is the communication from your node app to other things inside the IOT (Internet of Things)
        + Database read/write request
        + Changing files on your file system
        + Making a HTTP request to a separate web server
