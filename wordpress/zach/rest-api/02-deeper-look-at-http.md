# A Deeper look at HTTP
## HTTP
Hypertext Transfer Protocol

[more info on HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

* A standard for making requests and responses between clients and servers
* In the address bar whenever you see `http` or `https` you are using the HTTP protocol
* HTTP is accessible programmatically via languages like JavaScript

## HTTP - Clients (_specific technical term_)
Applications like web browsers or JavaScript apps that make requests to web servers

## HTTP - Servers (_specific technical term_)
Computers running software(Apache, NGINX, etc) that understand HTTP requests and responses

![client server diagram](https://i.imgur.com/Qckxr32.png)

We are going to unpack this diagram and talk specifically about the `request` and `response` objects

## HTTP - Request
Made from a client to a server. Several Request Methods like **GET**, **POST**, **PUT** (_means update_), **DELETE**, **OPTIONS**, **CONNECT**, **TRACE** are available

[link to complete list of what is possible with requests](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)

We are used to GET requests where we put in a URL and we get back a response. But **HTTP** enables us to do a whole lot more

## HTTP - Response
Made from a **server** to a **client** in `response` to a `request`. 

**note** When we work with WordPress the response we get back will be in the JSON format

![http messages](https://i.imgur.com/eQIJWeJ.png)

When we make requests and get responses back we are passing what are called **HTTP Messages**

## HTTP - Messages
Bundle of data passed with requests and responses

### Messages include three parts:
1. Request or Status Line
2. Headers
3. Message Body (_technically optional but we will see it every time we get a response back from an API enabled WordPress site_)

## 1. HTTP - Request Line (_with Request_)
1. Request Method (GET, POST, PUT, DELETE etc.)
2. URI (_URL_) to request
3. HTTP Version

### Examples
```
GET site.com/api/posts HTTP/1.1
POST site.com/api/posts HTTP/1.1
```

### HTTP - Status line (_with Response_)
In turn we get a status line back from the server and this will include:

1. The `HTTP Version` that we are using
2. The `Status Codes`:
    * 1XX informational
    * 2XX success
    * 3XX redirect
    * 4XX client error
    * 5XX server error

[Complete list of Status Code](http://www.restapitutorial.com/httpstatuscodes.html)

#### Examples of Status Lines
```
HTTP/1.1 200 OK
HTTP/1.1 404 Not Found
HTTP/1.1 500 Internal Server Error
```

Here is the newly updated client server relationship

![client server status line](https://i.imgur.com/8e53u99.png)

* This is part 1 of `The Message`

## Part 2 of the Message - HTTP Headers
Include `metadata` for each **request** and **response** that is sent

* There is an entire array of metadata that can be passed
* Standard header fields(_metadata types_) exist
* Custom header fields can be added as well
    - WordPress adds its own custom header fields

### Some examples of HTTP Header Fields
When we make a `request` these are some examples of **metadata** that are passed along with the request

* Accept (_what we can accept back_)
* Authorization (_if any authorization information is being sent_)
* Cache-control
* Content-Type
* Host
* Origin
* X-WP-Nonce
    - This would be `"hey I'm already logged into WordPress, so trust me here`

### And from the other end when we get information back from the server
Response Header Fields

* Access-Control-Allow-Origin
    - determines whether other sites are able to request information via the API
* Allow
* Connection (_whether it should stay open_)
* Content-Type (_is this JSON_)
* Status (_the status code_)
* Server (_information about the server and what it is running_)
* X-WP-Total (_total number of items you are getting back_)
* X-WP-Totalpages (_total number of pages if you are using pagination_)

When we make that GET request we are also going to send with it a bunch of header information

![sample header info from get request](https://i.imgur.com/sHe7AYv.png)

The server will say back "ok, got that, here's what you are looking for" but it will also pass back metadata, something like ("ok you're at https://yourapp.com, your allowed to get this but you can't post in this case, here is your JSON and status 200 means it went through OK")

![sample header info response](https://i.imgur.com/yAx6UrH.png)

We don't have to know all the different types of headers or the different syntax but we do need to know that at the lower level runnings of HTTP headers are the second part of messages

## Third Part of Messages - HTTP - Message Body
Optional data passed along with a request or response

* WordPress REST API uses JSON format for this data
    + It doesn't have to be JSON format but it will be in the context that we are using it
    + It is optional and sometimes when we make a GET request we won't be sending any **Message Body** data along with our request but we are going to get one back (We won't be sending a **Message Body** but we'll get one back)
        * Other times we will send a **Message Body** (_"hey! submit this post"_)

![make a get request](https://i.imgur.com/lF3bCZj.png)

If we make a GET request we are not going to pass any message body we can see that a message body shows up in the response that we get back

But if we make a POST request we will pass in the content we want our post to contain and the server will respond and it will give us a message body back with all the information about that post (this is just how wordpress works specifically )

**note** If you just hit a normal URL for a WordPress site you will just get HTML for that page as the **Message Body**

The bulk of what we will be dealing with when working with the WordPress REST API

## Review
HTTP - Message
Bundle of data passed with requests and responses

### Messages include three parts:
1. Request or Status Line
2. Headers
3. Message Body

This is the heart of the HTTP underlining technology that we really need to understand

When people jump in to work with the REST API you don't need to understand this upfront but it helps a lot because you do get to it and it can be very confusing because you might have built stuff with JavaScript or jQuery or PHP in the past but you never really had to deal with HTTP Headers (as an example) to understand what the different request or status lines were or how to format things that need to be passed as a message body

### HTTP - Cookies
* Let you store small pieces of data in the **client browser**
* Cookies can be set via HTTP Response Headers and included in Request Headers
    - When we make a request to a server and it says, "OK, here is your data back", it can actually say in its Headers, "Hey, set a cookie on the computer accessing this in the browser with this information"
    - And likewise, when we make a request to a server we can say "Hey, pull in my cookie information and send it back to the server" but the cookie information is going to only accessible via these two bodies, **the client** and **the server** so it won't be possible for other sites to access cookies from other sites
        + That said, there are security implications
        
**note** Cookies are part of HTTP

## HTTPS - Secure HTTP
Because of the security implications with HTTP we really want to use HTTPS whenever possible

* HTTPS uses different protocols (sometimes SSL which is moving more towards TSL for securing HTTP connections and communications (includes the Header, the cookie data, anything in our message body that's being included and even sometimes the authentication stuff that we're passing back and forth, that could be very easily in these days, intercepted and grabbed, if we are not using HTTPS))
* We need HTTPS on both **the client** and **the server** side
    - In the past, **the client** was the web browser but when we start building JavaScript and API applications our apps are actually HTTP clients and therefore whatever domain or hosting account they are set up and served with, it doesn't have to be in the same place as WordPress, it should have HTTPS running
    - Likewise your WordPress site that is serving it up and processing potential authentications via the API, it also should have HTTPS

## The History of HTTP
Not finished evolving and what is coming down the road with HTTP is something we need to know about

* 1989 - Tim Berners-Lee and his team at CERN
    - Started with just GET Request Method
        + Had the ability to request from your client information from other servers
        + Could not POST and submit
* HTML was created at the same time at HTTP
    - Hypertext Transfer Protocol could include links in it then HTML - Hypertext Markup language was created to mark up or give some more meta data to the message body itself, so instead of just being a huge blob of text, you could wrap it in paragraphs and this is where we see the origins of HTML
* 1991 - V 0.9 - First standard (_though used previously_)
* 1996 - V1.0 - Opened new connection each request
    - Every time that you made a request to a server, it needed to open a new connection (and a request and a connection are two separate things)
* 1997 - V1.2 - Multiple requests per connection
    - This has been in action for a long time
    - You could open one connection to a server (think of that as a tunnel) and then pass multiple requests back and forth (which is less expensive resource-wise then having to open new connections each time)
* 2015 - V2.0 - Multiplexing, HTTPS
    - Multiplexing is having a single connection and multiple requests but those multiple requests not being affected as much by one another as they are with V1.2 (where one slow request might slow up another slow request) where you are waiting for it and creating a **bottleneck** situation and HTTP2 improves on this
    - HTTP 2.0 is not required or tied into HTTPS except that with our move toward 2.0 implementation we are also seeing the use of HTTPS everywhere, because it is all around more secure but there are some ways with HTTPS and HTTP2.0 it makes things more secure

## Final Review
* HTTP is a standard for requests and responses between clients and servers
HTTP 
* HTTP is used in browsers and accessible programmatically
    - We can hook into it with JavaScript and other programming languages (like PHP and a lot more)
* HTTP Messages include:
    1. Request / Status Line
    2. Headers
    3. Message Body
* HTTP Cookies store data in user browser
* HTTPS allows for securing HTTP connections

