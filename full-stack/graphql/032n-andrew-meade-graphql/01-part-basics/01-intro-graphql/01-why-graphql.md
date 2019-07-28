# Why GraphQL?
* Your app has at least one client

## Example
* Let's say we have a web app with a few clients
    - A web app
        + Where users can log in to manager their data
    - A mobile app
        + One for Android and iOS that they can take with them on the go
* We also have a server and a DB
    - Maybe we're using NodeJS with the MongoDB db
    - Maybe we're using Python with the Postgres db
    - Or maybe we're using Java with MySQL
    - (whatever we're using, it doesn't matter because the "glue" between the client and the server has always been the standard HTTP requests)
        + Typically represented as some sort of REST API (this is a typical setup)
            * Might have a dozen or so URLs (aka endpoints) that can be used to communicate with the server
                - Maybe one for signing up
                - Another one for logging in
                - And maybe we also have a blogging app so we have an endpoint for creating a new post or reading all of the available posts to the database
        + When we use GraphQL not a lot will change, we still can use any client and any server
        + In this course we'll focus on using Node.js

![REST API](https://i.imgur.com/1Sv9ivg.png)

* We are going to replace our REST API with a GraphQL API with a single endpoint exposed

![New with GraphQL](https://i.imgur.com/Z4wpe1j.png)

* But we are going to replace our REST API with many endpoints

## What does GraphQL stand for?
Graph Query Langauge

* GraphQL also operates over HTTP which means we can use any backend language we want with any DB we want and we can use any client we want
    - a web, mobile app and also communicate with another server
* GraphQL is very flexible

![GraphQL is super flexible](https://i.imgur.com/Z4wpe1j.png)

### GraphQL is fast
* This is how we do it with a REST API

![REST API with 3 request](https://i.imgur.com/gMjW7Se.png)

* And this is how we get the same data using GraphQL

![GraphQL API](https://i.imgur.com/zdsMDoD.png)

* Now we are using GraphQL as the "glue" between the two 
* Remember that GraphQL can operate over HTTP - so at the end of the day we are still just making HTTP requests
* Now we make a POST request and GraphQL exposes just a single endpoint we called the POST `/graphql` but we could name it whatever we want
* But here's the catch, with our `request` **we are going to be sending along a graphql query**
    - The `GraphQL query` **lets the client decide what data it needs from the server**
        + The server than gets all of that data ready and it sends it back
        + So the client can describe exactly what it needs and it gets that data - nothing more, nothing less

##This is a very powerful piece of the puzzle!
* Instead of the server determining what data comes back it's up to the client to describe all of the data it needs
    - So in this case I can
        + Request all the post details by that author
        + And any post comments
        + All with a SINGLE GraphQL request
* Key take away difference between using GraphQL vs using a traditional REST API
    - GraphQL enables the client to determine what data it gets back as opposed to a traditional REST API endpoint where the server determines what data comes back from an endpoint
    - 3 request is more than 1 request so GraphQL is faster
    - GraphQL will enable us to get all the data we need with just one HTTP request

## GraphQL is flexible
* Speed is nice but flexibility is GraphQL's greatest asset

We could use this REST API and get back everything (post details, comments and other posts by auther)

![all in one REST API](https://i.imgur.com/JIufZ0i.png)

* The problem is we have this 1 endpoint that is making way more DB requests than it was before, it went from 1 DB request to at least 3 requests in order to get all the data necessary
* For the desktop version of our app this is fine, we are going to use all the data anyway so let's use it

## But what if we are also using a mobile app
* The mobile app can't change the data it is getting back
* On mobile devices we have a whole different set of considerations
    - We have less screen real estate
    - We have battery life to worry about
    - We have slow and expensive data
    - It we abuse the device the app is going to give a poor user experience, the app will run slow and the user will likely uninstall
    - This is the actual reason  GraphQL was created - facebook had same problem - they had a desktop version of app and mobile version of app and they didn't always need the same data for both - they needed a way for the individual clients to request exactly the data they were going to use
        + So on comments for mobile we don't want to load them until someone clicks to read the comments
        + With the REST API solution it doesn't matter because the comments have already been loaded
            * It would be nice if we didn't fetch the comments until the user clicked to read the comments

## This is how we do this with GraphQL
![diff GraphQL queries](https://i.imgur.com/nY8bcJ5.png)

* On desktop we use one GraphQL query
* On mobile app we use a different GraphQL query

## GraphQL is easy to use and simple to maintain

## Takeaway
* GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need
* Fewer HTTP request
* Flexible data querying
* Less code to manage
