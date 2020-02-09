# Add JavaScript to browser
`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notes App</title>
  <script>
    console.log('Hello from JavaScript!');
  </script>
</head>
<body>
  <h1>Notes App</h1>
  <h2>Take notes whenever you want</h2>
  <p>
  Consectetur quidem minus impedit nulla maiores quam quibusdam. Harum sint quos modi sequi repellat. Magni nulla similique impedit laboriosam deserunt? Itaque aut tenetur mollitia ratione voluptatum exercitationem atque dolorum? At.
</p>
</body>
</html>
```

## View the browser
* You won't see the log statement in the terminal like we did before
* And if you view our web page you won't see any log statement there either
* To view JavaScript in the browser you need to use the Chrome developer tools (if you are using the Chrome browser - other browsers have their own developer tools that work similarly)
* You need to open the chrome console by right click and inspect code
* Click on `console` tab and you will see our log message
* `cmd` + `option` + `j` is keyboard shortcut on mac to open the console
* Open it and you will see `Hello from JavaScript!` in your Chrome console
* You will also see `Live reload enabled.` - this is coming from the Live Server software letting us know the server is running successfully
* This is one way we can run JavaScript in our browser using the `<script>` tag
    - This will work but is not ideal
    - Our JavaScript can get long so we want to avoid mixing JavaScript with HTML

## Move all JavaScript to a separate file and load that in
`assets/js/script.js`

```
console.log('This is from a different file');
```

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notes App</title>
  <script src="assets/js/script.js">
  </script>
</head>
<body>

// MORE CODE
```

![new site structure](https://i.imgur.com/BstUac0.png)

## View in browser
* You will see `This is from a different file` in the browser console
* We do this by loading in the JavaScript file
* We use an **attribute** inside our `<script>` tag called **src** and we set that attribute equal to the path to our new JavaScript file
    - Each tag has its own set of attributes that describe what that tag can do
    - Attributes are just key/value pairs `<script src="assets/js/script.js">`
* Using external JavaScript files helps us separate our concerns, cleans up our code

## More on HTML docs
* [HTML script docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
* You see you can either `embed` or reference an external file (reference executable code)
* Scroll down on that docs page to read all about all the attributes `script` tag can use
    - You will see that when using `script` tags you either use inline JavaScript or point to an external file. Do not use both for one script tag

## How we can use JavaScript to interact with a web page
