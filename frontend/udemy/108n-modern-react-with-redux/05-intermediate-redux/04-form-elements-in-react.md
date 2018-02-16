# Form elements in React
Type something in the `SearchBar` and watch what happens

* The **url** changes from `http://localhost:8080` to `http://localhost:8080/?`
* The `input` box clears out (removes the text we typed)
* It happens when we click Search `button` or press `enter`

We created our `SearchBar` Component using a `form` element

**note** When you press `enter` on a child element of a `form` element, the form **automatically** thinks you are trying to **submit** the form

Form thinks when you type in `input` element and press `enter` key or `button`, the **browser** thinks the user is trying to **submit** a HTML **form** here and it needs to make a `post` request to the **server** (_which is happening_) and our **development server** is just kicking us back to `localhost:8080`, which re-renders our entire Application and that is what is clearing the `input` field

### We don't want our form to submit
Either when the user clicks the `Search` button or presses `enter`. Turn that behavior off with this code:

**note** This form submitting default behavior is not a **React** issue, it is a normal **HTML** issue. (_This is how all browser handle form elements_). If you have a `form` element focused and press `enter`, the browser will try to **submit** the form

## Preventing this default behavior
We have a `SPA` (_Single Page Application_)

* We don't want the user refreshing the page all the time
* We don't want them to change HTML documents at all

**note** We can prevent this behavior by adding a event handler to the form element itself

### Handling the submit event on the form element
`SearchBar`

Add our event handler to the `form` element

```
render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
```

Define that function and _prevent the default form event behavior_

```
onFormSubmit(event) {
  event.preventDefault();
}
```

### Test in browser
1. Save and refresh
2. Type in the form
3. Press enter or press Search button

You should see that our form doesn't try to submit itself. Yeh!

### What a pain in the *(@!! 
This seems like a pain with all the extra hurdles we have to jump through

### Why are we using the `form` element at all?
Great question and the reason we use it is we get free functionality when we use it

### Free is really such a great price
User expect to hit `enter` or have a **submit** button both trigger the search so by adding the `form` element we get that behavior for free and we don't have to code it ourselves

If we didn't use "free functionality" we would have to:

* Create an event handler when the user presses `enter` (_and have to check for that key being pressed_)
* Create another event handler when the user presses the `search` button

**tip** When using `input` forms make sure you use a `form` element and make sure to also use `event.preventDefault()`

## Next
We need to figure out how to tap into our Weather API to grab our 5 day weather forecast

```
onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch weather data
}
```







