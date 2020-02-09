# DOM challenge
1. Create a new HTML file
2. Add content - an h1 and 5 `p` tags
3. Serve that folder with live-server
4. View the doc in the browser

## DOM Challenge #1 Solution
* Shut down live-server (ctrl + c)

`todo-app/index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo App</title>
</head>
<body>
<h1>Todo App</h1>  
<p>Walk the dog</p>
<p>Buy groceries</p>
<p>Do homework</p>
<p>Change oil in car</p>
<p>Do laundry</p>
</body>
</html>
```

## Run in server
`$ live-server todo-app`

## View in browser
![todo app rendered](https://i.imgur.com/8ufw0uH.png)

## DOM Challenge #2
1. Create a link to a JavaScript file
2. Use the DOM to iterate over all `p` tags and remove any `p` that contain the text `the`

### DOM Challenge #2 Solution
`index.html`

```
<!DOCTYPE html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Todo App</title>
    </head>
<body>
    <h1>Todo App</h1>  
    <p>Walk the dog</p>
    <p>Buy groceries</p>
    <p>Do homework</p>
    <p>Change the oil in car</p>
    <p>Do laundry</p>
    <script src="assets/js/script.js"></script>
</body>
</html>
```

`assets/js/script.js`

```
// Grab a collection (can be treated like an array) of all p tags
const allPars = document.querySelectorAll('p');
// loop through all p tags
allPars.forEach(function(p) {
  // make the content all lowercase to improve search
  parContentLower = p.textContent.toLowerCase();
  // console.log(parContentLower.indexOf('the'));
  // Check if 'the' string is found
  if (parContentLower.indexOf('the') !== -1) {
    // remove all p tags that have content with `the` string
    p.remove();
  }
});
```

### Alternative is to use `includes`

`script.js`

```
const paragraphs = document.querySelectorAll('p');

paragraphs.forEach(function(paragraph) {
  if (paragraph.textContent.includes('the')) {
    paragraph.remove();
  }
});
```

## Tip - get rid of favicon error
`index.html` 

```
<head>
 // MORE CODE

    <link rel="shortcut icon" href="#" />

 // MORE CODE

</head>
```

## Next - How to add new elements to the document via the DOM
