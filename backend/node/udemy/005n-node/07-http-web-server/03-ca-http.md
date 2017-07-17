# Conceptual Aside
## HTTP
* TCP splits up and sends our info across the Internet in packets
* That is the idea of the protocol that the two sides agree to receive the info in packets

## But how info itself?
* How is it structured?
* How do we put all those packets back together?

## HTTP
A set of rules (_and a format_) for data being transferred on the web

* Stands for `HyperText Transfer Protocol`
* It is a format (_of various_) defining data being transferred via TCP/IP
* It is just a set of rules that states:
    - Here's are all the things the message can contain
    - Here's how it's structured
    - Here's where you put these pieces of data
    - Here's all the kinds of data that you can define
* It is used not just to send HyperText (_that is HTML_)
    - But lots of information like:
        + JavaScript files
        + Images
        + other things too
* It is the core of how we send information on the World Wide Web
    - web pages
    - web applications
    - images
    - css files
    - JavaScript files

## Client Server Relationship
* The format of the information being sent is in HTTP

![HTTP format Client Server](https://i.imgur.com/S836RtS.png)

* Simple Example of a HTTP Request

![http request](https://i.imgur.com/FplMuSo.png)

## Headers
* Part of the HTTP request
    - Just name/value pairs
    - Separated by a colon `:`

`Host: www.google.com` is part of the Headers

* There are standards what all these Headers values mean
* And the server and the client understand what these all mean

### HTTP Response example
* What comes back from the server

![HTTP Response example](https://i.imgur.com/H0g2B0v.png)

* It is split up into a protocol that the browser and server are programmed to understand
* `Status` - Tells you did all go well or not on the server, any problems?
* `Headers` - Name value pairs separated by colons
* Then there is a space
* `Body` - Could be HTML (common), data that defines an image, JSON data, JavaScript file, css file... whatever we're sending across the Internet defined by that HTTP protocol
* **note** - The content type **MIME Type**

![HTTP Response](https://i.imgur.com/RQw0mnk.png)

## MIME Type
* A standard for specifying the type of data being sent
* Stands for `Multipurpose Internet Mail Extensions`
    - Examples:
        + application/json
        + text/html
        + image/jpeg
* Why the `mail` in the name?`
    - It was originally designed to specify how we send attachments in email
        + What kind of data we send in attachments
    - But HTTP has adopted it as well as a way of specifying the kind of information being sent with any particular HTTP response
* The server and browser understand what a MIME type is and then it is coded to treat each particular MIME type a certain way
    - If the browser sees an image MIME type
        + It knows that you are sending an image and then display it
    - If it sees you are sending HTML, then it knows that it should process the HTML and render a web page
* When we are sending data from Node we can specify the MIME type


