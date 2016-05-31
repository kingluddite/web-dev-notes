# jQuery
## write less do more
* most popular JavaScript framework
* make JS work on wide range of browsers


## from JS AJAX to jQuery AJAX

old way

```js
var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      document.getElementById('ajax').innerHTML = xhr.responseText;
    }
  };
  xhr.open('GET', 'sidebar.html');

  function sendAJAX() {
    xhr.send();
    document.getElementById('load').style.display = 'none';
  }
```

jquery ajax

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AJAX with JavaScript</title>
  <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/main.css">
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script>
  function sendAJAX() {
    $('#ajax').load('sidebar.html');
    $('#load').hide();
  }
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
          <button id="load" onclick="sendAJAX()" class="button">Bring it!</button>
          <ul id="ajax">

          </ul>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

## [jQuery API](http://api.jquery.com)

[click Ajax shorthand methods link](https://api.jquery.com/category/ajax/shorthand-methods/)

[jQuery.get()](https://api.jquery.com/jQuery.get/)
* another way to send a request to the server using the HTTP `get` method

jQuery.get(url, data, callback);
or shorter way
$.get(url, data, callback);
most of the time we use jQuery with Selector method like this
$('#some-element')
but $.get(url, data, callback) is one that does not require a selector
you never use $.get with jQuery selector
$('#one').get() will give you an error

example
var url = '/players.php';
//query string = 'players.php?firstName=Diego&lastName=Maradona';
var data = {
    firstName : "Diego",
    lastName : "Maradona"
};
var callback = function (response) {
  // do something with the response   
};
$.get(url, data, callback);

// some people don't use variables and cram three things into $.get() method
// not very readable

using jQuery `GET` method

```js
function sendAJAX() {
    $.get('sidebar.html', function(response) {
        $('#ajax').html(response);
    });
    $('#load').hide();
}
```

Soccer Team Project using jQuery

index-jquery.html

```html


```


## $.each(array_or_object, callback)
* useful jQuery utility for looping through an array of items
    - does same thing as JS for loop but uses less code

```
var data = [
  'one',
  'two',
  'three'
];

$.each(data, function(index, value) {
  console.log(index, value);
});

```

or use with an array of objects
```
[
 {
    "name": "John",
    "playing": true
 },
 {
    "name": "Bob",
    "playing": false
 }
]
```

when
index
0

value.name
"John"

value.playing
false

final jQuery Player example

```js
$(document).ready(function() {
    var url="data/team.json";
    // if line 4 returns anything but JSON,
    // the entire getJSON function fails which means the callback
    // does not run
    $.getJSON(url, function(response) {
       /*
       <ul class="bulleted">
        <li class="in">example in</li>
        <li class="out">example out</li>
       </ul>
        */
       var statusHTML = '<ul class="bulleted">';
       $.each(response, function (index, player) {
         if (player.playing === true) {
            statusHTML += '<li class="in">';
         } else {
            statusHTML += '<li class="out">';
         }
         statusHTML += player.name + '</li>';
       });
       // loop ends
       statusHTML += '</ul>';
       // add HTML to page
       $('#playerList').html(statusHTML);
    }); // end getJSON
}); // end ready
```

$.post
When to use?
* submit large post like blog post
* suppots data meant to be stored in db
* more common to use data from form

```js
var url = "http://example.com/posts"
var data = {
    firstName : "Diego",
    lastName : "Maradona"
};
$.post(url, data, callback);

```

Sign up for team
Traditional form would have fields to enter and then submit. After submission, you would be taken to another page.
With Ajax - you after form submission you stay on the same page. This is a better user experience.

example form

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ajax Post Form</title>
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css">
     <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
     <script>
         $(document).ready(function() {
          $('form').submit(function(evt) {
            evt.preventDefault();
            var url = $(this).attr("action");
            var formData = $(this).serialize();
            $.post(url, formData, function(response) {
              $('#addPlayer').html("<p>Player Added</p>");
            }); // end post
          }); // end submit
         }); // end ready
     </script>
</head>
<body>

    <div id="addPlayer">
        <form method="post" action="/add">
            <label for="userName">What is your name?</label>
            <input type="text" name="userName" id="userName"><br>
            <label for="email">What is your email?</label>
            <input type="email" name="email" id="email"><br>
            <label for="submit"></label>
            <input type="submit" value="Signup!" id="submit">
        </form>
    </div><!-- END #addPlayer -->
</body>
</html>
```

**What does jQuery's serialize() method do?**
Creates a text string with standard URL-encoded notation of fields in an HTML form.

## The jQuery AJAX Method
* All of jQuery's shorthand AJAX methods are built on a more complex AJAX method `$.ajax(url, settings)`

[reference](https://api.jquery.com/jQuery.ajax/)

#### rewrite jquery post method using jquery ajax method
* does same as before but this method is far more versatile

```js
         $(document).ready(function() {
          
          $('form').submit(function(evt) {
            evt.preventDefault();
            var url = $(this).attr("action");
            var formData = $(this).serialize();
            $.ajax(url, {
              data : formData,
              type : "POST",
              success : function(response) {
                $('#addPlayer').html("<p>Player Added</p>")
              } 
            }); // end post
          }); // end submit
         }); // end ready

```

## Handling Errors
* jQuery's ajax functions fail silently
* The success callback won't do anything either
Problem - How can you let your users know when there is a problem?
* chaining to jquery methods

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ajax Post Form</title>
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="css/style.css">
     <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
     <script>
         $(document).ready(function() {
           $.get('no-file.html', function(data) {
            $('#addPlayer').html(data);
           }).fail(function (jqXHR) {
             $('#addPlayer').html("<p>Sorry! " + jqXHR.statusText + " error.</p>");
           }); // print error to page
         }); // end ready
     </script>
</head>
<body>
<div class="grid-container centered">
    <div class="grid-100">
        <div class="contained">
            <div class="grid-100">
                <div class="heading">
                    <h1>Soccer Team</h1>
                    <div id="addPlayer">

                    </div><!-- END #addPlayer -->
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
```


can also use `jqXHR.statusText`

Add this to print out error message when ajax method fails

```js
$(document).ready(function() {
           $.get('no-file.html', function(data) {
            $('#addPlayer').html(data);
           }).fail(function (jqXHR) {
             $('#addPlayer').html("<p>Sorry! " + jqXHR.statusText + " error.</p>");
           }); // print error to page
         }); // end ready

```

Simply tell user there is an error

```js
 $(document).ready(function() {
   $.get('no-file.html', function(data) {
    $('#addPlayer').html(data);
   }).fail(function (jqXHR) {
     var errorMessage = "<p>Houston. We have a problem. ";
     errorMessage += "Please fly again later.</p>";
     $('#addPlayer').html(errorMessage);
   }); // print error to page
 }); // end ready
```

jquery ajax fail won't work for
* ajax load() method
* won't use for remote ajax request that use JSONP (requests to a different web server)

Add Field Status using jQuery

```html
<aside class="grid-30 list">
  <h2>Soccer Team Player Status</h2>
  <div id="playerList">

  </div>
  <h2>Field Status</h2>
  <div id="fieldList">

  </div>
</aside>
```

```js
$(document).ready(function() {
    var url="data/team.json";
    // if line 4 returns anything but JSON,
    // the entire getJSON function fails which means the callback
    // does not run
    $.getJSON(url, function(response) {
       /*
       <ul class="bulleted">
        <li class="in">example in</li>
        <li class="out">example out</li>
       </ul>
        */
       var statusHTML = '<ul class="bulleted">';
       $.each(response, function (index, player) {
         if (player.playing === true) {
            statusHTML += '<li class="in">';
         } else {
            statusHTML += '<li class="out">';
         }
         statusHTML += player.name + '</li>';
       });
       // loop ends
       statusHTML += '</ul>';
       // add HTML to page
       $('#playerList').html(statusHTML);
    }); // end getJSON

    // next getJSON
     var url="data/fields.json";
    $.getJSON(url, function(response) {
       /*
       <ul class="bulleted">
        <li class="full">example full</li>
        <li class="empty">example empty</li>
       </ul>
        */
       var statusHTML = '<ul class="fields">';
       $.each(response, function (index, field) {
         if (field.available === true) {
            statusHTML += '<li class="empty">';
         } else {
            statusHTML += '<li class="full">';
         }
         statusHTML += field.field + '</li>';
       });
       // loop ends
       statusHTML += '</ul>';
       // add HTML to page
       $('#fieldList').html(statusHTML);
    }); // end getJSON
}); // end ready
```
