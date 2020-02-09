# Working with forms
* This allow us to combine inputs and buttons together to create a form that the user can submit

## What do we have now
* We just have inputs but we don't wait for the user to submit

## What we need
* We want the user to fill all the info we need then they click a submit button

## Starting with notes app
* Remove remove all notes button and it's event handler

### The HTML form element
* The `name` attribute makes it easy to access all those field values when the form is submitted
    - **Common Naming Convestion** `name` values should be spelled in camel case notation because we will use them in JavaScript
    - `<input type="text" placeholder="First Name" name="firstName" />`

`notes-app/index.html`

```
// MORE CODE
    <form>
      <input type="text" placeholder="First Name" name="firstName" />
      <button>Submit</button>
    </form>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

## View form in browser
* Looks like input we added before
* But now when you type and click submit, the browser will refresh
* You will see in the URL `http://127.0.0.1:62183/?firstName=Test`
    - This is the default behavior for a form
    - And this behavior goes way back to the early web (back before client side JavaScript was something we could realistically depend on)
        + Back then a lot of browsers didn't have JavaScript support or good JavaScript support and so this default behavior of forms was necessary to insure that we could get data back to whatever server we were using

## Today is different
* Now we have great JavaScript support
* So we now want to handle the form submit via client side JavaScript
    - This will allow us to validate data on the fly
    - And also allow us to render an error message without completely wiping all of the user's information

## Give the form an id
`index.html`

```
// MORE CODE

    <form id="name-form">
      <input type="text" placeholder="First Name" name="firstName" />
      <button>Submit</button>
    </form>

// MORE CODE
```

* For forms the only event we'll ever use is `submit`
    - The `submit` event is fired whenever a user takes action to submit a form
    - This could be either `clicking` a button or hitting enter in one of the inputs (this is great for accessibility)
    - We first want to cancel the default behavior of the form using `e.preventDefault()` (this will stop the form from refreshing the page)

`script.js`

```
// MORE CODE
document.querySelector('#name-form').addEventListener('submit', function(e) {
  e.preventDefault();
});
```

* Test it out
* Add name, press enter and watch the form submit doesn't cause a page refresh
* **note** Get rid of remove all notes event listener as that button was deleted from the HTML and you will get an error that `addEventListener` of `null` (the line number will let you know that it is the `#remove-all-notes`) causing the issue, remove it and your form will work as expected

## Test the form again
* Now your form will behave totally different than before
* The page does not refresh and the URL is not populated with form information
    - We will handle all form data client side with JavaScript

### Let's log out the form data
* In order to access all the fields in a form we need to use a special property in the Event object `e.target.elements`
* If you log that out you will see that you have access to `firstName` and if you expand that you will see value
    - We can access it by it's name and that is `firstName` (this is a representation of the DOM input)
    - We then get the value of this element's firstName using `value`
    - Let's log that out

`script.js`
```
// MORE CODE

document.querySelector('#name-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(e.target.elements.firstName.value);
});
```

* Enter a name, submit and you'll see the name you entered inside the client console

## Wipe the form field data after submitting
* Just set the value to an empty string

```
// MORE CODE
document.querySelector('#name-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(e.target.elements.firstName.value);
  e.target.elements.firstName.value = ''; // add this line
});
```

## Challenge
* For the todo app
* Wrap the todo text and the add todo button inside a form

`index.html`

* Start like this:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo App</title>
  </head>
  <body>
    <header id="header">
    <h1>Todo App</h1>
    <input id="todo-search-text" type="text" placeholder="Search Todos" />
    </header>
    <div id="todos"></div>
    <!-- todos container -->
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

* Add the form below the todos list
* Delete the events for adding todo and new todo
* Only listener we are keeping is for our search text
* Setup a submit handler and cancel the default action
* Add a new item to the todos array with that text data (completed value of false)
* Re-Render the app (we do that every time that search text changes)
* Clear the input field
* **note** We are not worried about client side validation at this point

## Solutions
`index.html`

```
// MORE CODE
    <form id="new-todo-form">
      <input type="text" placeholder="Something to do" name="text" />
      <button>Add Todo</button>
    </form>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

`script.js`

```
// MORE CODE

// todo form submit listener
document
  .querySelector('#new-todo-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();
    todos.push({
      text: e.target.elements.text.value,
      completed: false,
    });
    renderTodos(todos, filters);
    // clear text input value
    e.target.elements.text.value = '';
  });
```

## Test in browser
* The form should add another todo to your list
* The list is searchable with that todo
* The dynamic number of completed todos adjust as well




