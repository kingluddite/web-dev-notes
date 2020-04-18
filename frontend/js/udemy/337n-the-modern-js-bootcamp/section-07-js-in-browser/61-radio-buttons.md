# Radio buttons
* This is not as straightforward as the others
* Radio buttons are true or false and are grouped together using the `name` attribute

`index.html`

```
    <input id="genderMale" type="radio" name="gender" value="male">
    <label for="genderMale">Male</label>
    <input id="genderFemale" type="radio" name="gender" value="female">
    <label for="genderFemale">Female</label>
```

* The querySelector function only returns the first element of all the ones matched by the selector, and this is a problem
    - We need to use `querySelectorAll()` instead as this will return all matched elements
        + Then once we have all the matched elements (all our grouped radio buttons) we can loop through them to add an event to each

```
// MORE CODE

if (document.querySelector('input[name="gender"]')) {
  document.querySelectorAll('input[name="gender"]').forEach(function(elem) {
    elem.addEventListener('change', function(e) {
      const item = e.target.value;
      console.log(item);
    });
  });
}

// MORE CODE
```

* As we loop through each radio button we attach an event listener to each one
* **Best Practice** You should use a `change` event rather than a `click` event then it doesn't fire unnecessarily when the user clicks an "already-selected" radio button
* **tip** If no radio button is selected when the form is submitted (if you are using a form), the radio group is not included in the submitted form data at all, since there is no value to report
    - You need to set your value attribute values or they will just have `on` as their value
    - It's uncommon to want to allow the form to be submitted without any of the radio buttons in a group selected, so it is wise and advised to have one of your radio buttons defaulted to a checked stated

```
// MORE CODE
    <input id="genderMale" type="radio" name="gender" value="male">
    <label for="genderMale">Male</label>
    <input id="genderFemale" type="radio" name="gender" value="female">
    <label for="genderFemale">Female</label>
    <input id="noAnswer" type="radio" name="gender" value="na" checked>
    <label for="noAnswer">No Answer</label>
```


