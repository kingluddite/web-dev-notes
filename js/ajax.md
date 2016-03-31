#Ajax

Show Ajax requests
1. google maps
2. console
3. right click
4. [log requests option](https://i.imgur.com/YhbAN4U.png)

`XHR` - (XML HTTP Requests)

* created Microsoft 1995
* official name: XMLHttpRequest Object

## What AJAX stands for
Asynchronous
JavaScript
And
XML

(the most common is JSON instead of XML)

## How AJAX Works
1. Create an XMLHTTP Request object
2. Create a callback function 
3. Open a request
4. Send the request

## Simple Introduction to AJAX

* `note`: need a server to have this work

`index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href='//fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/main.css">
  <title>AJAX with JavaScript</title>
  <script>
    // 1. Create an XMLHTTP Request object
    var xhr = new XMLHttpRequest();
    // 2. Create a callback function
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
       document.getElementById('ajax').innerHTML = xhr.responseText; 
      }
    };
    // 3. Open a request
    xhr.open('GET', 'sidebar.html');
    // 4. Send request
    xhr.send();
    
  </script>
</head>
<body>
  <div class="grid-container centered">
    <div class="grid-100">
      <div class="contained">
        <div class="grid-100">
          <div class="heading">
            <h1>Bring on the AJAX</h1>
          </div>
          <div id="ajax">

          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

`sidebar.html`

```html
<section>
<h2>Welcome to the wonderful world of AJAX</h2>
<p>This content provided to you dynamically by the XMLHTTP Request Object</p>
</section>
```

### Looking under the AJAX hood
1. Refresh page in Chrome
2. Open console
3. Make sure `Log XMLHttpRequests` is checked
4. Here is the request [AJAX request](https://i.imgur.com/yZU53c4.png)

### Adding interaction
1. Add button that when clicked loads function and makes button disappear

Just replace the script code with this:

```html
<script>
    // 1. Create an XMLHTTP Request object
    var xhr = new XMLHttpRequest();
    // 2. Create a callback function
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
       document.getElementById('ajax').innerHTML = xhr.responseText; 
      }
    };
    // 3. Open a request
    xhr.open('GET', 'sidebar.html');
    // 4. Send request
    function sendAJAX() {
        xhr.send();
        document.getElementById('load').style.display = "none";
    }
    
  </script>
```

And add this line under the H1 in `index.html`

```html
<button id="load" onclick="sendAJAX()">Load text Now</button>
```

### GET vs POST (when to use which one)
* Use GET when receiving data
* Use POST when sending data you want saved.

note: POST. Used frequently with web forms to send data to store in a database. Use POST when sending data that will `store`, `delete` or `update` information from a **database**.

### Query String
example: `http://website.com/employees.php?firstName="Pele"`
The Query String is `firstName=Pele`
That is a Name/Value pair (`firstName` is the `Name`, `Pele` is the `Value`)

### Query String Symbols
&, Space and + need to be encoded
& --> %26
+ --> +
+ --> %2B

[URL Encode Site](http://www.url-encode-decode.com/)
[example](https://i.imgur.com/UIssjAJ.png)

sending lots of information is not good via GET
POST sends info separate from URL via 'body'
separate from URL
more secure
let's you send additional information
you also have to send an additional `header`

### AJAX Response Formats
with lots of data have a structured data format
XML - use tags to store data
example
```xml
<contacts>
 <contact>
  <name>Bob</name>
  <phone>111-222-3333</phone>
 </contact>
 <contact>
  <name>Gary</name>
  <phone>222-333-4444</phone>
 </contact>
</contacts>
```

**parsing** - breaking a file up into easily accessed parts

xml - common format
using with javascript is not simple, cumbersum

a better way is using JSON

JSON

## AJAX Security Limitations
Same origin
* ok on same server
* not ok on another server
* not ok on same server using https
* not ok on same server using different port number
* not ok to use different hosts (site.com and my.site.com)


### Ways to circumvent Same origin policy
* create a Web Proxy
  * set up PHP or Ruby on Rails script on the server to ask for informaton on another server
  * then that script can request info from other site and then share that info with your first site

JSONP - JSON with Padding

New Method (CORS) - Cross-Origin Resource Sharing
* W3C Recommendation and already implemented in most modern browsers

AJAX will not work unless you are viewing your page through a web server

# AJAX Callbacks

the `status` property
* number sent from server
* 200 means ok which means success on sent from service
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {

  }
};
xhr.open('GET', 'sidebar.html');
xhr.send();
```

or more checks can be added with this

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      document.getElementById('ajax').innerHTML = xhr.responseText;
    } else if (xhr.status === 404) {
      // file not found
    } else if (xhr.status === 500) {

    }
  }
};
xhr.open('GET', 'sidebar.html');
xhr.send();

```

### statusText property

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      document.getElementById('ajax').innerHTML = xhr.responseText;
    } else {
      alert(xhr.statusText);
    }

  }
};
xhr.open('GET', 'sidebar.html');
xhr.send();

```

## JSON
JavaScript Object Notation
* array notation
* object notation

Array - like a shopping list
// string, number, boolean, array
['string', 3, true, [1, 2, 3]];
con: don't know what the data means (what is string for, why is 3rd item in list true?)
Object part in JSON (object notation) comes in handy here because it is a set of key, value pairs (also called property value pairs)
* key -  is a name you can use to identify a property
* value - value you want to give that property

example of JSON
```json
{
  "name" : "John",
  "phone" : "111-222-333"
}

```

in regular JSON keys don't have to be quoted
but VALID JSON requires DOUBLE QUOTES around property name (single quotes won't work)
strings also require double quotes

data.json

```json
[
  {
    "name" : "Manny",
    "inoffice" : false
  },
  {
    "name" : "Moe",
    "inoffice" : false
  },
  {
    "name" : "Jack",
    "inoffice" : false
  }
]

```

### JSON Line [link](http://jsonlint.com/)
* online JSON validator
