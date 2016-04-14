#Ajax

**Note** You can not use Ajax without a server.

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

Here we use Ajax to grab a file resource, which is just a fragment of HTML and place it inside a DIV element. We use the DOM to grab the DIV element by it's ID attribute. We create a new XHR object and check it's `onreadystate` property to see if it's a value of 4. If it is we know the response is ready and we plug the XHR's `responseText` property to the DIV element we captured. The `responseText` is going to hold our string of data (which is just the fragment of HTML). As soon as the page loads, we use AJAX and the page should load the fragment of HTML instaneously (or quickly depending on the internet connection.)

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

### Parsing JSON Data

JSON is formatted to look like JavaScript, it's not
It is just a plain text string with no magical significance to your web browser

#### What does Parsing JSON mean?
To use JSON you need to
1. Take string
2. Convert to JavaScript

**How difficult is it to parse JSON?**
It's simple.
All Web Browsers can do it using a single command.

Open JavaScript console
`cmd` + `opt` + `j`

### JSON.parse
* method built into all modern web browsers (even back to IE8)
* JSON.parse takes a string and tries to convert it into a JavaScript object
* 

rules of JSON formatted data
must be an array of items or an object filled with `key` : `object` pairs or a combination of those two 
keys must use double quotes
strings must use double quotes
must be an array of objects or a com

what happens if JSON is not formatted as correct JSON
it won't work

if you try to parse a normal string with JSON.parse you will get a JavaScript error

what does JSON.parse return
when it completes it returns a JavaScript object

# Soccer Team Widget

index.html

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Soccer Team Widget</title>
  <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="grid-container centered">
    <div class="grid-100">
      <div class="contained">
        <div class="grid-100">
          <div class="heading">
            <h1>Soccer Team</h1>
          </div>
        </div>
        <section class="grid-70 main">
          <h2>Lorem Ipsum Headline</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, eius magnam aliquid doloremque quidem distinctio delectus earum natus incidunt. Molestias, ipsa ut deleniti mollitia, quibusdam alias deserunt sequi obcaecati sapiente?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad sunt ipsum quisquam vitae fugit mollitia illo tenetur, nisi impedit voluptatum vero. Cumque sunt neque consequuntur deleniti, quibusdam dolorum, nesciunt.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia voluptas natus nulla, dolore at libero. Aspernatur nesciunt repudiandae expedita vel, maxime reiciendis incidunt, vero officiis sit facere alias iusto deleniti?</p>
        </section>
        <aside class="grid-30 list">
          <h2>Employee Office Status</h2>
          <div id="employeeList">

          </div>
        </aside>
        <footer class="grid-100">
          <p>Copyright, The Intranet Corporation</p>
        </footer>
      </div>
    </div>
  </div>
  <script src="js/my-widget.js"></script>
</body>
</html>
```

js/my-widget.js

``` js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var employees = JSON.parse(xhr.responseText);
      // returns object
      //console.log(typeof employees);
      // returns an array of objects
      // console.log(employees);
    }
};
xhr.open('GET', 'data/team.json');
xhr.send();
```

[chrome console](https://i.imgur.com/vNEHYUd.png)

css/style.css

```css
@charset "UTF-8";

.grid-container:before,
.grid-container:after {
  content: ".";
  display: block;
  overflow: hidden;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
}

.grid-container:after {
  clear: both;
}

.grid-container {
  max-width: 1080px;
  position: relative;
}

.grid-30,
.grid-70,
.grid-100 {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
}

body {
  min-width: 320px;
}

@media screen {
  .grid-container:before,
  .grid-container:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after {
    clear: both;
  }

  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-30,
  .grid-70,
  .grid-100 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }

  body {
    min-width: 320px;
  }
}

@media screen and (min-width: 1080px) {
  .grid-container:before,
  .grid-100:before,
  .grid-container:after,
  .grid-100:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after,
  .grid-100:after {
    clear: both;
  }

  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-30,
  .grid-70,
  .grid-100 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }

  .grid-30 {
    float: left;
    width: 30%;
  }

  .grid-70 {
    float: left;
    width: 70%;
  }

  .grid-100 {
    clear: both;
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  @-ms-viewport {
    width: 320px;
  }
}

@media screen and (max-width: 680px) {
  .grid-container:before,
  .grid-container:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after {
    clear: both;
  }

  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-30,
  .grid-70,
  .grid-100 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media screen and (min-width: 680px) and (max-width: 1080px) {
  .grid-container:before,
  .grid-container:after {
    content: ".";
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
  }

  .grid-container:after {
    clear: both;
  }

  .grid-container {
    max-width: 1080px;
    position: relative;
  }

  .grid-30,
  .grid-70,
  .grid-100 {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.grid-container:before,
.grid-container:after {
  content: ".";
  display: block;
  overflow: hidden;
  visibility: hidden;
  font-size: 0;
  line-height: 0;
  width: 0;
  height: 0;
}

.grid-container:after {
  clear: both;
}

.grid-container {
  max-width: 1080px;
  position: relative;
}

.grid-30,
.grid-70,
.grid-100 {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
}

html,
body,
div,
h1,
h2,
p,
ul,
li,
aside,
footer,
section {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

html {
  line-height: 1;
}

ul {
  list-style: none;
}

aside,
footer,
section {
  display: block;
}

body {
  background: #edeff0;
  padding: 50px 0 0;
  font-family: "Varela Round", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 62.5%;
}

.centered {
  margin: 0 auto;
}

.contained {
  background: white;
  padding: 30px 15px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
}

.heading {
  margin-bottom: 20px;
}

h1,
h2 {
  font-size: 2.4em;
  font-weight: 500;
  margin-bottom: 8px;
  color: #384047;
  line-height: 1.2;
}

h2 {
  font-size: 1.8em;
}

aside h2 {
  margin-bottom: 15px;
}

p {
  color: #8d9aa5;
  font-size: 1.4em;
  margin-bottom: 15px;
  line-height: 1.4;
}

ul li {
  margin: 15px 0 0;
  font-size: 1.6em;
  color: #8d9aa5;
  position: relative;
}

ul.bulleted li {
  padding-left: 40px;
}

ul.bulleted li:before {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: .5em;
  padding: 3px 2px 2px;
  border-radius: 2px;
  text-align: center;
  width: 25px;
}

ul.bulleted .in {
  color: #5A6772;
}

ul.bulleted .in:before {
  content: "IN";
  background-color: #5fcf80;
}

ul.bulleted .out {
  color: #A7B4BF;
}

ul.bulleted .out:before {
  content: "OUT";
  background-color: #ed5a5a;
}
ul.rooms {
  margin-bottom: 30px;
}

ul.rooms li {
  font-size: 1em;
  display: inline-block;
  width: 10%;
  padding: 3px 2px 2px;
  border-radius: 2px;
  margin: 0 3px 3px 3px;
  color: white;
    text-align: center;
}

ul.rooms li.empty {
  background-color: #5fcf80;
}
ul.rooms li.full {
  background-color: #ed5a5a;
}

footer p {
  color: #b2bac2;
  font-size: 1.15em;
  margin: 0;
}

```


Put on CSS/HTML hats

team-mockup.html

``` html
<div id="employeeList">
    <ul class="bulleted">
        <li class="out">Phil</li>
        <li class="out">Phil</li>
        <li class="in">Phil</li>
        <li class="in">Phil</li>
        <li class="out">Phil</li>
        <li class="out">Phil</li>
        <li class="in">Phil</li>
        <li class="in">Phil</li>
        <li class="out">Phil</li>
    </ul>
</div>
```

## Process JSON Data
1. Create new HTML list element
2. Check `playing` property
3. Get value for the `name` property and insert it inside the `LI` element
4. Close `LI` element

End Result

[what we want it to look like](https://i.imgur.com/grXLe8x.png)

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var employees = JSON.parse(xhr.responseText);
      // console.log(typeof employees);
      //console.log(employees);
      var statusHTML = '<ul class="bulleted">';
      for (var i = 0; i < employees.length; i += 1) {
        if (employees[i].playing === true) {
            statusHTML += '<li class="in">';
        } else {
            statusHTML += '<li class="out">';
        }
        statusHTML += employees[i].name;
        statusHTML += '</li>';
      }
      statusHTML += '</ul>';
      document.getElementById('teamList').innerHTML = statusHTML;
    }
};
xhr.open('GET', 'data/team.json');
xhr.send();
```


fields.json

```json
[
  {
   "field": "a",
   "available": false
  },
  {
   "field": "b",
   "available": true
  },
  {
   "field": "c",
   "available": false
  },
  {
   "field": "d",
   "available": false
  },
  {
   "field": "e",
   "available": true
  }
]

```

How with the JavaScript change if you also want to add to the sidebar the list of fields and whether they are available or not:

add this to underneath the player status in `index.html`

```html
...
<h2>Field Status</h2>
<div id="fieldList">

</div>
...
```

add this to `js/main.js`

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var employees = JSON.parse(xhr.responseText);
      // console.log(typeof employees);
      //console.log(employees);
      var statusHTML = '<ul class="bulleted">';
      for (var i = 0; i < employees.length; i += 1) {
        if (employees[i].playing === true) {
            statusHTML += '<li class="in">';
        } else {
            statusHTML += '<li class="out">';
        }
        statusHTML += employees[i].name;
        statusHTML += '</li>';
      }
      statusHTML += '</ul>';
      document.getElementById('teamList').innerHTML = statusHTML;
    }
};
xhr.open('GET', 'data/team.json');
xhr.send();

var fieldRequestXHR = new XMLHttpRequest();
fieldRequestXHR.onreadystatechange = function () {
    if (fieldRequestXHR.readyState === 4) {
      var myFields = JSON.parse(fieldRequestXHR.responseText);
      // console.log(typeof employees);
      //console.log(employees);
      var fieldStatusHTML = '<ul class="rooms">';
      for (var i = 0; i < myFields.length; i += 1) {
        if (myFields[i].available === true) {
            fieldStatusHTML += '<li class="empty">';
        } else {
            fieldStatusHTML += '<li class="full">';
        }
        fieldStatusHTML += myFields[i].field;
        fieldStatusHTML += '</li>';
      }
      fieldStatusHTML += '</ul>';
      document.getElementById('fieldList').innerHTML = fieldStatusHTML;
    }
};
fieldRequestXHR.open('GET', 'data/fields.json');
fieldRequestXHR.send();
```
