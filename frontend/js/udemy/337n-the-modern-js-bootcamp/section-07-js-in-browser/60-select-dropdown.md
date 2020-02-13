# Dropdown
* Provide the user with multiple preconfigured options and they can pick one
* We'll use a dropdown in the notes app
* We'll remove the checkbox and event listener in notes

## Out notes app
* We'll add a dropdown to provide the user with ways they want to sort by
    - alphabetically
    - most recently created notes
    - most recently edited notes

## All we care about now is..
* Getting dropdown in place
* Getting value selected from dropdown showing up in client console
* We'll deal with wiring this up in our app later

### Caution on browser "weird" behavior
* **note** Using live-server it will keep the last chosen from dropdown, for a true starting point use a hard refresh with `cmd` + `shift` + `r`
    - **windows** `windows` + `shift` + `r`
    - **linux** `cmd` + `shift` + `r` (depending on how your keyboard is setup)
* Hard refresh will always bring you back to the "raw default page"

`notes-app/index.html`

```
// MORE CODE
    <select id="filter-by-select">
      <option>Sort by last edited</option>
      <option>Sort by recently created</option>
      <option>Sort alphabetically</option>
    </select>
    <div id="notes"></div>
   <!-- notes container  -->
    <button id="create-note">Create Note</button>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

* View in browser

![dropdown](https://i.imgur.com/mse6zXk.png)

* And click to expand to see choices

![click to see dropdown choices](https://i.imgur.com/cnubRIr.png)

### Log out the selected value
* The event we'll use is `change`
* The way we grab the value is `e.target.value`

```
// MORE CODE
document
  .querySelector('#filter-by-select')
  .addEventListener('change', function(e) {
    console.log(e.target.value);
  });
```

* Click on dropdown in browser to choose an option
    - The text for that option will appear in the client console
    - But we may not always want the option string, many times we'll way a way to grab something that won't change and that is the `option`s **value** attribute
    - We'll set the attribute name to something simple and in camel case notation as we may use it often in our JavaScript

```
// MORE CODE

    <select id="filter-by-select">
      <option value="byEdited">Sort by last edited</option>
      <option value="byCreated">Sort by recently created</option>
      <option value="alphabetical">Sort alphabetically</option>
    </select>

// MORE CODE
```

* The benefit is we can use the option value in our programming while providing longer (maybe in different languages) to our end user for the values in the actual dropdown
* Now if you view again, you'll see our short value names are used instead of the option text
