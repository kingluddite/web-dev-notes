# Passing room data
* Fill the form out and hit submit
* The answers are passing to the chat.html in the URL

## location
* Object that has tons of info inside it
* We'll use `window.location.search`
    - Has the query string
    - It is a string but we need to parse it to get the data
    - We'll use a library to do this

```
> window.location.search
```

* output: `"?name=sdf&room=asdfd"`

## jQuery can help us
`chat.js`

* `console.log(jQuery.param({ name: 'Joe', age: 22 }));`
    - `name=Joe&`
* That matches our query string
    - We just need to add the `?`
* But jquery can't take that string and convert it into an object
* We also have to decode things like spaces (+)

## Deparam
`/public/js/libs/deparam.js`

```js
/**
 * jQuery.deparam - The oposite of jQuery param. Creates an object of query string parameters.
 *
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
*/
(function($){
  $.deparam = $.deparam || function(uri){
    if(uri === undefined){
      uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
      new RegExp(
        "([^?=&]+)(=([^&#]*))?", "g"),
        function($0, $1, $2, $3) {
            queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        }
      );
      return queryString;
    };
})(jQuery);
```

* `param` takes your object and returns a string
* `deparam` takes the string and returns an object

`chat.html`

```html
  <script src="/bundle.js"></script>
    <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script> 
  <script src="/js/libs/deparam.js"></script>
</body>
</html>
```

* Try this in the console

`> jQuery.deparam`

* You will see the function
* Now we pass our search string into that function

`> jQuery.deparam(window.location.search)`

* Will output `{name: "sdf", room: "asdfd"}`

## Add chat
```js
socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, err => {
    if (err) {
    } else {
    }
  });
});
```



