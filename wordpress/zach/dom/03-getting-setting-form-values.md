# Getting and Setting Form Values

## Common Ways to Select a Form
* document.forms (not the most common)
    - returns array of all forms on page
* document.getElementById
    - if you have an id on your form tag
* querySelector
* querySelectorAll
* document.getElementsByName
    - very relevant when working with forms
    - name attribute is almost always required and assigned to form on any field that you want to submit
    - returns an array of all fields that match that name

var forms = document.forms
* returns an array of all forms

forms[0]
* returns just the first form in the array of forms

Selecting Elements in a Form
* Two General Approaches
    - no right or wrong here, depends on what you want to do
1. Loop through elements
    - pro
        + you get all of the elements in one
    - con
        + you have to write a lot of custom conditional code to figure out what elements you're dealing with, what type of form fields they are and then what you actually want to do with it
2. Select specific elements
    - pro
        + you know what you're getting, so you know exactly what you want to do with it
    - con
        + you may miss out on some ones if you don't select them, if you add a field then the item you're selecting will have moved and you'll be selecting the wrong field

**note**: in console, when you refresh sometimes you see your element and you can drill into it and sometimes you'll see the entire element... kind of a glitch, just keep refreshing until it shows which way you want

**note**: if you select a radio button, only one is going to be selected when the form is submitted, so to get it's value you can use something like `contactPreference = document.getElementsByName( 'contact-preference' );` and this is possible because all radio buttons in that choice field will have the same `name` attribute value.

![radio name array](https://i.imgur.com/1VO6z4j.png)

## How to get form element values

Simplest Way to get the value of a form element
* use the `value` property
 
`formEl.value;`

**note** when you loop through and get elements that have `undefined`, you probably want to throw that out, so you need to code it so that it is thrown out.

**console tip:**

`ctrl` + `l` - clears out console

### Grabbing Form Values example
1. Fill out the form
2. Add this loop in your console
3. Press `return`

```js
var mainForm = document.getElementById( 'main-contact' );

for ( var i = 0, max = mainForm.length; i < max; i++ ) {

  console.log( mainForm[i].name, mainForm[i].value );

}
```

![form value output](https://i.imgur.com/TBb0AnL.png)

* it is correct but NOT what we expect
    - case in point: we left the newsletter field unchecked but the value we get says yes??? why?

**note**: we don't always want the value of a form field

### Set a new value for a form field
* very easy to do

```js
formEl.value = 'New Value Here!';
```

#### Problems select field values

##### Radio buttons vs. text field values
Text fields, textareas you'll use the `value` property to change the value of the field
But Radio buttons and check boxes have use a different approach

```js
radio.checked = true;
checkbox.checked = true;
option.selected = true;
```

**tip** be specific with radio, checkbox and option

* they take boolean values (checked, checked, selected)

**tip**: can help to add `id` attribute to your forms because it helps make it easier to select them

##### Selecting Select Options

You could do it this way:

```js
// 
console.log( subject[2] );
// or this way using the children property
subject.children[1].selected = true;
// if you use the console, you'll see the DOM has the options as children of select
```

## Hacking fields with console

**caution** Just because you marked something as readonly, it can be changed clientside in console with JavaScript

```js
/*================================================
=            Hacking a Readonly Field            =
================================================*/

var readOnlyField = document.getElementsByName( 'cant-touch-this' )[0];

readOnlyField.removeAttribute( 'readonly' );
readOnlyField.value = 'Changed it';
```

## Important Note About DOM
The DOM remembers `default` and `current` values

![console elements and property screen](https://i.imgur.com/kn6LS3P.png)

you will see two values `defaultChecked` and `defaultValue` and their will also be a `value` property

[W3Schools Form Elements](http://www.w3schools.com/html/html_form_elements.asp)
[Difference between type=button and type=submit](http://stackoverflow.com/questions/290215/difference-between-input-type-button-and-input-type-submit)
[MDN Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
[What's the difference between disabled=“disabled” and readonly=“readonly” for HTML form input fields?](http://stackoverflow.com/questions/7730695/whats-the-difference-between-disabled-disabled-and-readonly-readonly-for-ht)
[handling POST requests the WordPress Way](https://www.sitepoint.com/handling-post-requests-the-wordpress-way/)
[w3Schools Placeholder](http://www.w3schools.com/jsref/prop_text_placeholder.asp)
