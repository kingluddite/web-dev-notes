# form stuff
## Radio buttons
for questions where you want the user to only give you one answer.

```html
<form action="/submit-cat-photo">
    <input type="text" placeholder="cat photo URL" required>
    <label><input type="radio" name="indoor-outdoor" />indoor</label>
    <label><input type="radio" name="indoor-outdoor" />outdoor</label>
    <button type="submit">Submit</button>
  </form>
```

**notes**
* Each of your **radio buttons** should be **nested** within its own `label` element
* All related **radio buttons** should have the same `name` attribute

## Placeholder text to a text field
Your **placeholder text** is what appears in your **text** `input` before your user has input anything.

```html
<input type="text" placeholder="this is placeholder text">
```

## Checkboxes
```html
<label><input type="checkbox" name="personality" /></label>
<label><input type="checkbox" name="personality" /></label>
<label><input type="checkbox" name="personality" /></label>
```

* Forms commonly use checkboxes for questions that may have more than one answer
* Checkboxes are a type of `input`
* Each of your checkboxes should be nested within its own label element
* All related checkbox inputs should have the same `name` attribute
* You can set a `checkbox` or `radio` button to be **checked by default** using the `checked` attribute
    - checkbox
        + ` <label><input type="checkbox" name="personality" checked> Loving</label>`
    - radio
    - `<label><input type="radio" name="indoor-outdoor" checked> Indoor</label>`



