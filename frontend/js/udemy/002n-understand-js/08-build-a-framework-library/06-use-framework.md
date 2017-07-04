# Use Greetr Framework (small so it's more like a Library)

## Another cool trick
`;(function(global, $) {`

* Start your IIFE with a semi-colon `;`
* It makes sure libraries used before get ended with a semi-colon in case they forgot theirs

## Add Click event to button
* When button is clicked
* We'll set the Greeting based on the language that is chosen

`app.js`

```js
$('#login').click(function() {

  var loginGrtr = G$('John', 'Doe');

  $('#loginDiv').hide();

  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});
```

* When user clicks button with an id of `login`
* Pass it a function object that I create on the fly with a function expression
* Create a brand new object using my Greetr object and pass it hard coded first and last name
    - In a real life app we would grab these names from the login form
* Then we'll hide the entire select form
* Then we set the language to the value of what the user selected `en` or `es`
* Then we chain the HTMLGreeting and select the element with an id of greeting (which is the h1) and pass true so that it will be formal and also chain on our log message
