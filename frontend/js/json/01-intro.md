# JSON
Stands for JavaScript Object Notation.
An easy way of passing information as text.

## Benefits of Using JSON
* Human readable and writeable
    - Both easy for us and machines to read
* Easy for machines to parse and generate
* Uses name value pairs as its format and this makes it particularly easy to work with
* Can contain objects and arrays
    - Allows it to pass complex data
* The format of JSON is based on JavaScript
    - But language agnostic
        + Which means it can be used with a variety of other languages
* Has largely replaced XML
* JSON is what the WordPress API uses to format all of its data to be passed to other applications

**example.json**

```json
[
  {
    "id":1,
    "title": "My Name is Steve",
    "content": "I like to skateboard"
  },
  {
    "id":2,
    "title": "My Name is Bob",
    "content": "What about Bob?"
  }
]
```

* [] means we are working with an array of data
* {} mean we have an object
    - the comma `,` separates each object
        + there is NO comma at the end of the last object
            * adding a comma at the end will break the JSON format
* we are using KEY/VALUE pairs
    - we have the key on the left side
    - we have the value on the right side
    - KEY:Value - a colon seperates the two and a comma at the end
        + no comma after the last key:value pair
* strings are enclosed in double quotes `"this is a string"`
    - you MUST USE DOUBLE QUOTES IN JSON
* if you are only passing a single object you do not need `[]`

single-object-example.json

```json
{
 "id":1,
 "title": "My Name is Steve",
 "content": "I like to skateboard"
}
```

## Helpful web site
Validator for our JSON
[JSON Lint](http://jsonlint.com/)

### Instructions
Grab your JSON, copy and paste it into the JSON validator site and you will be alerted if it is valid JSON or not

* Change double quotes to single quotes and you will see it is not valid JSON
* Add a comma after the last line and you will see it is not valid JSON

## Desktop Server
[Download the free version](https://serverpress.com)

* if you have MAMP running, you must stop it (Apache and MySQL)
* [instructions for installing Desktop Server](https://premium.wpmudev.org/blog/set-up-wordpress-locally-with-desktopserver/)
* Is there a free version of DesktopServer? Yes
* Does it use MAMP? No, it uses XAMP.

Create a local WordPress site using Desktop Server
'www.myfirstdesktopserversite.dev'

[Install WP REST API (version 2)](https://wordpress.org/plugins/rest-api/)
Activate that plugin
* eventually this plugin will be rolled into WordPress core

Now go to this URL

`http://www.myfirstdesktopserversite.dev/wp-json/wp/v2/posts`

And you will see all your posts formatted in JSON!

Download the Chrome extension JSONView and this will make the browser format the JSON nicely

You can toggle open and close the objects

Now if you change the URL to 

`http://www.myfirstdesktopserversite.dev/wp-json/wp/v2/posts`

You will see the pages in the same format at the posts.

* you will see an array of objects and nested inside some objects might be other array of objects and so JSON is allowing us to pass very complex tag across the wire

## JSON Review
* Easy to read and write (more favorable to XML)
* Allows us to pass data as a .json text file
* Also to possible to write JSON directly inside a JavaScript file 
* Uses objects, arrays and name value pairs
* Similar to JavaScript in syntax but there are some formatting rules where JSON is more strict than JavaScript
    - So it is very important to validate your JSON before putting it in your application

### Homework
Practice reading through a WP JSON file







 
