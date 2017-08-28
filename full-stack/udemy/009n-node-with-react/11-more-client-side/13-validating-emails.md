# Validating Emails
![email format rules diagram](https://i.imgur.com/hD4lTZF.png)

* Every email will need a comma between each email
* Users may also add a space after the comma
* We need to notify the user if any one of the list of emails they have entered is not valid

## Utils folder
* We create this folder to house functions used globally on our client side
* We'll move our validate function into this folder and call it `validateEmails.js`
    - I name (camelCase) it that way because the file is returning a function and not a class

`/client/src/utils/validateEmails.js`

```js
export default emails => {
  const invalidEmailsArray = email.split(',').map(email => email.trim());
};
```

![email format diagram](https://i.imgur.com/Lomn6mN.png)

* We split all emails by comma
* We remove the spaces
* We filter by bad emails

### The filter() function
* Works similarly to how the `.map()` function works
* Inside of filter we will pass each individual email
    - Inside the email function we will check to see if that email is valid
        + If it is valid we will return `false`
        + If it is not valid we will return `true`
    - If you return `true` inside a filter() function that value will be kept inside the array
        + Otherwise the value will be dumped

### How do we check if the email is valid or not?
* [emailregex.com](http://emailregex.com/)
    - Provides regular expressions to validate email addresses
    - Make sure to switch to plain text before copying and pasting this regex
    - You will get a warning about the regex and if you want to get rid of it use the HTML5 regex instead (it is not as powerful as the JavaScript regex)
* We want this one

![js regex](https://i.imgur.com/1Eph0u6.png)

```js
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

`validateEmails.js`

```js
// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => regEx.test(email) === false);

  if (invalidEmailsArray.length) {
    return `These emails are invalid: ${invalidEmailsArray}`;
  }

  return null;
};
```

`SurveyForm.js`

```
// more code
import validateEmails from './../../utils/validateEmails'; // add this line

// more code

class SurveyForm extends Component {
  // more code
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  errors.emails = validateEmails(values.emails);

  return errors;
}

// more code
```

## Test
* We get an error because validate runs once the Component is rendered to the screen and at that point we have no emails and that is why emails is undefined
* We will first check for emails and if there are none, we'll return an empty string `''`

`SurveyForm.js`

```
// more code
  errors.emails = validateEmails(values.emails || '');

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);
```

## Test
* Our error is fixed
* But when we click next we see our empty emails is overwritten by our validateEmails error message
* We fix this by changing the order of the code

`SurveyForm.js`

```
// more code
function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}
// more code
```

## Remove trailing commas from validation
* Someone adds a comma after the valid email and then we trigger an error
* We need to fix this
* Added this line so that any trailing commas will be ignored when validating the list of emails

`validateEmails.js`

```
// more code
export default emails => {
  emails = emails.replace(/,\s*$/, ''); // add this line
  const invalidEmailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if (invalidEmailsArray.length) {
    return `These emails are invalid: ${invalidEmailsArray}`;
  }

  return null;
};
```
