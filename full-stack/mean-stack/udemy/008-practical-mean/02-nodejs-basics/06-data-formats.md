# Data Formats
![diagram of data formats](https://i.imgur.com/R84BJYK.png)

* We can send data in the URL
* We can send data with a POST request

## Request
* We have a `Header`
* We have a `Content-Type`
* We also have a `Body` which might hold our data

## Response
* We have a `Header`
* We have a `Content-Type`
* We also have a `Body` which might hold our data

![and a body](https://i.imgur.com/zvcHzUR.png)

### URL request
![get data from URL](https://i.imgur.com/9xsD27Y.png)

* We might access a URL that looks like:

`http://coolapp.com/user/3?token=abc`

* We could store our data in the Body
* If we do the Body is not visible in the URL but is sent behind the scenes
* We showed how to retreive data from the body in a previous lecture
* We can use `req.params` to grab things from the URL
* We also can grab things after the `?`
    - This is the **query string**
    - using `req.query` (aka "query parameters")

## What is the difference between `req.params` and `req.query`
* `req.params` is hard coded in url like `/message/:msg`
* `req.query` always goes at end and follows the `?something=bla`
    - This is how we pass on optional data to each request

## Data formats we can use
* JSON
    - Lightweight format
    - Similar to a JavaScript object but as a string
    - It is able to encode a lot of data with minimal characters (keeping it small)
    - Since we are using NodeJS it is easy to be parsed since we are using JavaScript objects all over the place so why not send our data as one
* Plain Text
* File
* Urlencoded
* HTML code (for our views) - But we won't do this much in our Angular 2 /NodeJS app

## Takeaway
* We will primarily use JSON
* We will never send a request which sends a response which leads to a reload of the page
* We won't send HTML code from the server besides the initial handlebars template (`index.hps`)

## More Node Homework
* Official NodeJS Page (also dive into the Docs there!)
    - [https://nodejs.org/en/](https://nodejs.org/en/)
* An Absolute Beginner Guide to NodeJS: 
    - [http://stackabuse.com/learn-node-js-a-beginners-guide/](http://stackabuse.com/learn-node-js-a-beginners-guide/)
* Official ExpressJS Page (check out the "Getting Started" and other Guide there!):
    - [http://expressjs.com/](http://expressjs.com/)
* Creating a Basic NodeJS + ExpressJS App from Scratch: 
    - [https://shapeshed.com/creating-a-basic-site-with-node-and-express/](https://shapeshed.com/creating-a-basic-site-with-node-and-express/)


