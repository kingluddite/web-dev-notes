# Text Inputs and Live Data Filtering
* Now we'll get text based input from the user

1. The user will type data in the browser
2. We'll be able to get that data back and do something with it in our JavaScript
    * We might use it as:
        - The note title, the note body
        - The todo text
        - But we'll use it in this example as their search filter
            + We can filter their notes by title
            + Or their todos by todo text

## The HTML `<input />`
* Open and close tag at same time

`notes-app/index.html`

```
// MORE CODE

  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <input />
    <p class="note">This is my first note</p>
    <p class="note">This is my second note</p>

// MORE CODE
```

* View in browser and you can type into the input field
    - Excellent! This is our text based input we need

## Different types of input
* Lots of different `types` of input but default is **text**

```
// MORE CODE

  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <input type="text" />
    <input type="password" />

// MORE CODE
```

![text and password inputs](https://i.imgur.com/aQF3eQL.png)

### Permitted content
* Scroll down docs and you'll see that `Permitted content` is **none** because it is an `empty element`
    - So you can't do this `<input>bla bla bal</input>`

### List of all HTML empty elements
* [empty elements](https://developer.mozilla.org/en-US/docs/Glossary/empty_element)

* `<area>`
* `<base>`
* `<br>`
* `<col>`
* `<embed>`
* `<hr>`
* `<img>`
* `<input>`
* `<keygen>`(HTML 5.2 Draft removed)
* `<link>`
* `<meta>`
* `<param>`
* `<source>`
* `<track>`
* `<wbr>`

## How do we attach an event on this input
* Give it an `id`

```
// MORE CODE

  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <input id="search-text" type="text" />

// MORE CODE
```

`script.js`

```
// MORE CODE

document
  .querySelector('#search-text')
  .addEventListener('change', function(e) {
    console.log(e.target);
  });

// MORE CODE
```

* You need to type in the input and then leave the focus of the input and you will this in the console

```
<input id="search-text" type="text">
```

* Change the log to just `e` and you will see the Event object
    - Expand target and you'll see `value` and inside it will be the text you typed
    - We can read or right to this value (get/set)

```
// MORE CODE

document.querySelector('#search-text').addEventListener('change', function(e) {
  console.log(e.target.value);
});

// MORE CODE
```

* Now you can type and when you leave the focus of the input you will see that text output in the console

## change is cool but we want to filter in real time
* Any time I change my text I want the event to fire so I can see the text change

### The input event
* This event will fire on every single change

```
// MORE CODE

document.querySelector('#search-text').addEventListener('input', function(e) {
  console.log(e.target.value);
});

// MORE CODE
```

## Add a placeholder
* This will show up when the input is empty
* The purpose of placeholder is to let the user know what they need to type into the input

```
// MORE CODE

    <body>
      <h1>Todo App</h1>
      <input type="text" id="new-todo" placeholder="Add Todo" />

// MORE CODE
```

![search text](https://i.imgur.com/buU9JyB.png)

## Challenge
* Create another input that will be where the user enters their new note
* Add an event listener that will console log the user's note

`index.html`

```
// MORE CODE

  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <input id="search-text" placeholder="Search Notes" type="text" />
    <input type="text" id="new-note" placeholder="Add Note" />

// MORE CODE
```

`script.js`

```
// MORE CODE

document.querySelector('#new-todo').addEventListener('input', function(e) {
  console.log(e.target.value);
});

// MORE CODE
```

* **tip** Good item to begin tags with the `id` or `class` attribute for easy visibility

## Next
* Render our data and filter them based on our UI inputs
