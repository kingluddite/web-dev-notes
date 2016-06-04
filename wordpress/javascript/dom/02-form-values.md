# Getting and Setting Form Values

## HTML side of forms
* can have multiple forms on page
* front end of form 
* no form will work without a `<form>` element
    - if you want to submit, you need `<form>` element

`sample-form.html`

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>The DOM</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <h1>Sample Form</h1>
  <div class="content container">
    <form action="" method="get" id="main-contact" name="main-contact">
      <input type="hidden" name="secret" value="3kd80083abd">
      <fieldset>
        <legend>Contact Information</legend>
        <p>
          <label for="fullName">Your Full
            <abbr title="Name">N</abbr>ame:</label>
          <input type="input" id="fullName" name="fullName" value="" placeholder="First and last Name" tabindex="1" accesskey="n" autofocus="true" autocomplete="name" draggable="true">
        </p>
        <p>
          <label for="subject">
            <abbr title="Subject">S</abbr>ubject:</label>
          <select name="subject" tabindex="2" accesskey="s">
            <option value="project">I want to work with you on a project</option>
            <option value="question">I have a question</option>
            <option value="other">Other..</option>
          </select>
        </p>
        <p>
          <label for="message">
            <abbr title="Subject">M</abbr>essage:</label>
          <textarea name="message" placeholder="Your message here" tabindex="3" accesskey="m" spellcheck="true"></textarea>
        </p>
        <p>
          <label for="contact-preference">Contact Preference:</label>
          <input type="radio" name="contact-preference" value="email" tabindex="4" checked="checked"> Email
          <br>
          <label for="contact-preference-phone">
            <input type="radio" id="contact-preference-phone" name="contact-preference" value="phone" tabindex="5"> Phone</label>
        </p>
        <p>
          <label for="email">Email:</label>
          <input type="email" name="email" value="" autocomplete="email" required="true">
        </p>
        <p>
          <label for="phone">Phone:</label>
          <input type="tel" name="name" value="" autocomplete="tel">
        </p>
        <p>
          <label for="date">Best Contact Date:</label>
          <input type="date" name="date" value="">
        </p>
        <p>
          <label for="date">Best Contact Time:</label>
          <input type="time" name="date" value="">
        </p>
        <p>
          <label for="datetime">Best Date and Time:</label>
          <input type="datetime-local" name="datetime" value="">
        </p>
      </fieldset>
      <fieldset>
        <legend>Additional Information</legend>
        <p>
          <label for="recommend">Preferred Volume</label>
          <input type="range" name="recommend" min="1" max="10" value="1">
        </p>
        <p>
          <label for="extra-info">Please upload any additional information we may need (.pdf only):</label>
          <input type="file" accept=".pdf" name="extra-info" value="">
        </p>
        <p>
          <label for="cant-touch-this">Can't Touch This</label>
          <input type="input" name="cant-touch-this" value="Cannot edit" readonly>
        </p>
        <p>
          <label for="newsletter">Subscribe to Newsletter:</label>
          <input type="checkbox" name="newsletter" value="yes" checked tabindex="6"> Yes
        </p>
        <p>
          <input type="reset" name="reset" value="Reset">
          <input type="submit" name="submit" value="Submit" tabindex="7">
        </p>
      </fieldset>
    </form>
  </div>
  <footer class="content">
    <h2>Another Form</h2>
    <form action="" method="post" name="rain-form" id="rain-form">
      <p>
        <input type="button" name="magic" value="Make it Rain">
        <button type="button" name="more-magic" class="help"><img src="help-icon.svg" alt="Help Icon" width="20" /> </button>
      </p>
    </form>
  </footer>
</body>
<script src="app.js"></script>

</html>
```

### FORM
* `action` attribute
    * can link to .php page to be processed
    * can link to file in your plugin
    * can link to [admin-post.php - handling POST requests the WordPress way](https://www.sitepoint.com/handling-post-requests-the-wordpress-way/)
* `method` attribute
    + get
        * goes through URL
            - name and value pairs
            - uses
                + search engine query
                + testing
                + average form, you may not want to use
    + `post`
        * most forms use this
        * pushes to back and not seen by end user
    + `id`
        * great if you are using getElementById()
        * used just front in for reference
    + `name`
        * great if you are using getElementsByName()
        * name will also be submitted along with the form so this is beneficial if we want to access the form later (if we have multiple forms this is good to let us know which form was submitted)
* `fieldset`
    - breaks your form up into logical different sections
        + contact
        + additional information
    - they are not required but they are part of the DOM
* `legend`
    - if you use a fieldset, use a legend too
        + improves
            * usability
            * accessibility
* `label`
    - always have a label
    - tied to a form field by the `for` attribute
        + the `for` attribute has to match the `id` attribute in the form field
        + improves accessibility and usability allowing us to know that both items are connected
            * so if you click on a label it will automatically pop the curser down into that connected form field
* radio buttons
    - these are a bit different
    - type=`radio` for each radio button
    - name=`contact-preference` for both radio buttons
    - `checked` attribute will pre check the radio button
        + can also be `checked="checked"`

one way to use radio buttons

```html
<p>
  <label for="contact-preference">Contact Preference:</label>
  <input type="radio" name="contact-preference" value="email" tabindex="4" checked="checked"> Email
  <input type="radio" name="contact-preference" value="phone" tabindex="5"> Phone
</p>
```

another way you may see radio buttons coded

```html
<p>
  <label for="contact-preference">Contact Preference:</label>
  <input type="radio" name="contact-preference" value="email" tabindex="4" checked="checked"> Email
  <br>
  <label for="contact-preference-phone">
    <input type="radio" id="contact-preference-phone" name="contact-preference" value="phone" tabindex="5"> Phone</label>
</p>
```

this way is more accessible because it associates the label with the radio button

```html
<label for="contact-preference-phone">
  <input type="radio" id="contact-preference-phone" name="contact-preference" value="phone" tabindex="5"> Phone</label>
```

* `textarea `
    - no `value` attribute
    - you put the text you want as a placeholder or to set the value of the `textarea` to be inside the `textarea` opening and closing tag
        + `<textarea>text here</textarea>`
    - `spellcheck` option
        + true means when people type their typing will be spell checked
* `select`
    - gives you a dropdown
    - `name` attribute used to target it
    - has `option` tags nested inside with a `value` attribute. the value is what will be sent. The text inside the option is what people see when the page loads. If you set `selected` on option that will be the chosen option when form loads on page.
        + can also say selected="selected"
            * why do we need two choices for selected?
                - in case we need to use JavaScript to get and set values
* `required` attribute
    - new with HTML5 and this will have the browser do some simple validation when the form is submitted
        + note: if you have JavaScript turned off, it won't validate so it is a best practice to always validate on the server as well
* input type `submit`
    - has default action to submit form and go back to top
* input type `button`
    - this had no default action, not submitting anything by default like type="submit"

```html
<!-- look how confusing this is -->
<button type="button"></button>
<input type="button">
<button type="submit"></button>
<input type="submit">
```

what's the difference?
when you have an input field, you have to set the `value` attribute.

but a button has an opening and closing element so it can accept content inbetween it (text or images)
the only way to add images to input type = button or submit is with CSS

caution - if you leave off the type=button attribute on <button>, it will default to type="submit" and submit the form. you want to always be specific with buttons and hardcode the type value or you will get undesirable results. 
* input type `reset`
    - default action to reset all field values
* input type `checkbox`
    - `checked` attribute
    - `checked="checked"`

```html
<p>
  <label for="newsletter">Subscribe to Newsletter:</label>
  <input type="checkbox" name="newsletter" value="yes" checked tabindex="6"> Yes
</p>
```

important fix for making checkbox accessible

* add `id` attribute!

```html
<p>
  <label for="newsletter">Subscribe to Newsletter:</label>
  <input type="checkbox" id="newsletter" name="newsletter" value="yes" checked tabindex="6"> Yes
</p>
```

* input type `range`
    - `min` and `max` attributes
* input type `file`
    - has `accept` attribute
        + if you put `pdf` in it will only allow you to upload those types of files
            * multiple values with `accept="pdf, png"`
* input `disabled` attribute
    - if this is set on an input the field will not be mutable
    - it also does not submit this field value
    - `disabled="disabled"`
* input `readonly`
    - field not mutable
    - but FIELD VALUE WILL BE SENT WHEN FORM SUBMITTED (Important difference with `disabled`)
    - `readonly="readonly"`

```html
<p>
  <label for="recommend">Preferred Volume</label>
  <input type="range" name="recommend" min="1" max="10" value="1">
</p>
```
* `hidden`
    - hidden to the user but we need to pass to other page
* `input`
    - one of the most common types of fields
        + types of input fields
            * button
            * checkbox
            * color
            * date
            * datetime-local
            * email
            * file
            * hidden
            * month
            * number
            * password
            * radio
            * range
            * reset
            * search
            * submit
            * tel
            * text
            * time
            * url
            * week
    - name attribute
        + must have this attribute
        + many times the `name` will match the `id`
        + quite common to name them in camelCase
        + used for server side
    - value attribute
        + when form submitted this is value that will go server side
        + sometimes you'll prepopulate this field usability improvement
            * can get or set this field value
    - placeholder attribute
        + don't use this as a substitute for label, include both (placeholder usability and label for accessibility)
    - tabindex
        + if you put tabindexes in you control the user experience if you omit, then the tab will go through all the fields
    - accesskey
        + if you set this, people can type keyboard shortcuts in browser (`alt` + `your key here`) and you'll jump to that area
        + power user
        + not just for form elements, global, can stick it on links or for your app
        + [different in each browser](https://en.wikipedia.org/wiki/Access_key#Access_in_different_browsers)
        + also good for usability
            * style it obviously
            * could be conflicts with other shortcuts
    - draggable
        + global
            * can drag it around the page
                - you will need to add JavaScript to make it really work
    - autofocus
        + will be the first filed the focus goes on page load
            * pros
                - helps get people into the form
                - can use javascript to autofocus user to field
            * con
                - if you put on a bad location, it will bother the user
                - bad user experience
    - autocomplete
    
## autocomplete values
col1 | col2 | col3
--- | --- | --- 
on | username | language
off | new-password | bday
name | current-password | bday-day
honorific-prefix | organization-title | bday-month
given-name | organization | bday-year
additional-name | street-address | sex
family-name | address | tel
honorific-suffix | country | url
nickname | country-name | photo
email | postal-code | 

## autocomplete values for credit cards
col1 | col2 | col3
--- | --- | --- 
cc-name | cc-exp | transaction-currency 
cc-given-name | cc-exp-month | transaction-amount
cc-additional-name | cc-exp-year |
cc-family-name | cc-csc
cc-number | cc-type 

passing values with form with GET method

```
http://my-web-site.com?name=value&name=value&name=value
```

