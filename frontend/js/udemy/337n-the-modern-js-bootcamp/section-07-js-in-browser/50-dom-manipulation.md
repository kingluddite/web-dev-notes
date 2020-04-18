# DOM Manipulation
* DOM (Document Object Model)

## Doing stuff with JavaScript
* We know how to load JavaScript into our app
* How do we use our JavaScript on a button
* Change text when user hovers over it
* And lots of other stuff too inside our browser

## More about the DOM
* The document in DOM is the HTML document
* The Object in DOM is a JavaScript object
* So we have an Object in JavaScript that models our HTML Document (that's all the DOM is)
    - Knowing the DOM I could grab all my HTML `p` tags and get all of their text and see if there are any phone numbers in them
    - I could listen for form input field values to change using the DOM
    - I could delete every single form from a web page using the DOM
    - If we are doing anything with our JavaScript to manipulate our HTML we will be using the DOM

## Use the DOM to delete an element from our HTML file
* **note** Remember that the document is modeled using a JavaScript object and that object is called `document`
    - This `document` is not an object that we create it is an object provided to us via the browser
    - We can use `document` to perform all of those DOM manipulations

### Steps to delete an element from the DOM
* We need to search/query to find the element we want to remove
* We tell it to remove that element
    - These are the 2 steps for all DOM manipulation

1. Find by querying what you want to manipulate
2. Provide the instructions to manipulate that item

## querySelector
* Very popular method of the DOM `document`

```
// DOM - Document Object Model
const pTag = document.querySelector('p');
console.log(pTag); // null
```

## Houston we have a problem!
* Why are we getting `null`?
* The reason is where we are calling our `script` tag to import our external JavaScript file
    - Since it is called and our HTML element (`<p>`) we want to access is after the `<script>` we can't get to it, but if we move our JavaScript to the bottom then we can access it

## Moving script to bottom
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notes App</title>
</head>
<body>
  <h1>Notes App</h1>
  <h2>Take notes whenever you want</h2>
  <p>
  Consectetur quidem minus impedit nulla maiores quam quibusdam. Harum sint quos modi sequi repellat. Magni nulla similique impedit laboriosam deserunt? Itaque aut tenetur mollitia ratione voluptatum exercitationem atque dolorum? At.
</p>
  <script src="assets/js/script.js">
  </script>
</body>
</html>
```

* Now we see our `p` fragment
* **note** If you open Firefox and view their dev tools you'll get different information
    - It will be all the properties and methods you have access to
    - If you click inspect button you'll see the fragment of `p`

## Now we'll remove the `p` element with `element.remove()`
```
// DOM - Document Object Model
const pTag = document.querySelector('p');
pTag.remove();
```

* View the browser and you'll see the `<p></p>` element and it's text has been removed from the web page in the browser
* If you change the `querySelector()` argument to `h1` it would remove that element from the page

## What would querySelector() do if there were multiple `p` elements in our page?
* It would just remove the first one it finds

## How could we remove all paragraphs
* Easy use a different method called `document.querySelectorAll('p')`

```
// DOM - Document Object Model
const pTag = document.querySelectorAll('p');
pTag.remove();
```

### Houston we have a problem!
* We get an error `pTag.remove` is not a function
* We get back a list of all `p` elements (not just one)
* So this list is like an array and we can loop through them all using `forEach()` to remove all paragraphs

```
// DOM - Document Object Model
const pTags = document.querySelectorAll('p');

pTags.forEach(function(p) {
  p.remove();
});
```

## element.textContent
* We are going to figure out how we can read text values from our document

```
// DOM - Document Object Model
const pTags = document.querySelectorAll('p');

pTags.forEach(function(p) {
  console.log(p.textContent);
});
```

* Will log out the content of the 3 paragraphs

## Write the content
* We just learned how to read the content off an HTML element, we can also write the content on an HTML element

```
// DOM - Document Object Model
const pTags = document.querySelectorAll('p');

pTags.forEach(function(p, index) {
  p.textContent = `hello ${index} paragraph`;
});
```

* Will output to the browser

```
hello 0 paragraph

hello 1 paragraph

hello 2 paragraph
```

## Takeaway
* The DOM (Document Object Model)
    - This is an object called `document` that models our HTML document
* I use the DOM to read, write, update the HTML from JavaScript
* We delved into some DOM methods
    - `document.querySelector()` (finds first HTML element in query)
    - `document.querySelectorAll()` (finds all HTML element in query)
    - `element.remove()` -> removes an element
    - `element.textContent` -> property to get or set HTML element content
