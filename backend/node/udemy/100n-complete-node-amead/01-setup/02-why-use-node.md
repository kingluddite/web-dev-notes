# Why Use Node?
## Block vs Non-Blocking
![blocking vs non-blocking](https://i.imgur.com/giHiNj0.png)

* Node uses non-blocking
* Think of a line fetching some data and printing it to the screen
* Both files do same thing but in a different way

### Blocking example
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
