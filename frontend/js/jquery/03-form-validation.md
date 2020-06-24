# Login

login.html

```html
<!DOCTYPE html>
<html>

<head>
  <title>Sign Up Form</title>
  <link rel="stylesheet" href="css/login-style.css">
</head>

<body>
  <form action="#" method="post">
    <p>
      <label for="username">Username</label>
      <input id="username" name="username" type="text">
    </p>
    <p>
      <label for="password">Password</label>
      <input id="password" name="password" type="password">
      <span>Enter a password longer than 8 characters</span>
    </p>
    <p>
      <label for="confirm-password">Confirm Password</label>
      <input id="confirm-password" name="confirmPassword" type="password">
      <span>Please confirm your password</span>
    </p>
    <p>
      <input type="submit" value="SUBMIT">
    </p>
  </form>
  <script src="node_modules/tether/dist/js/tether.min.js"></script>
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="js/login.js"></script>
</body>

</html>
```

`css/login-style.css`

```css
body {
  background: #384047;
  font-family: sans-serif;
  font-size: 10px
}

form {
  background: #fff;
  padding: 4em 4em 2em;
  max-width: 400px;
  margin: 100px auto 0;
  box-shadow: 0 0 1em #222;
  border-radius: 5px;
}

p {
  margin: 0 0 3em 0;
  position: relative;
}

label {
  display: block;
  font-size: 1.6em;
  margin: 0 0 .5em;
  color: #333;
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none
}

input[type="text"],
input[type="password"] {
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  font-size: 1.6em;
  padding: .8em .5em;
  border-radius: 5px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background: #fff
}

span {
  border-radius: 5px;
  display: block;
  font-size: 1.3em;
  text-align: center;
  position: absolute;
  background: #2F558E;
  left: 105%;
  top: 25px;
  width: 160px;
  padding: 7px 10px;
  color: #fff;
}

span:after {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(136, 183, 213, 0);
  border-right-color: #2F558E;
  border-width: 8px;
  margin-top: -8px;
}

input[type="submit"] {
  background: #2F558E;
  box-shadow: 0 3px 0 0 #1D3C6A;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 2em;
  line-height: 1.6em;
  margin: 2em 0 0;
  outline: none;
  padding: .8em 0;
  text-shadow: 0 1px #68B25B;
}

```

`js/login.js`

## Plan

```js
// Hide hints

// when event happens on pwd input
// determine if pwd valid
// hide if valide
// else show hint

// when event happens on confirmation input
// determine if pwd and confirmation match
// hide if match
// else show hint
```

## Add Blur event and keyup

```js
// Hide hints
$( "form span" ).hide();
// when event happens on pwd input
$( "#password" ).blur( function() {
  var $pwdLength = $( this ).val().length;
  // determine if pwd valid
  if ( $pwdLength > 8 ) {
    // hide if valid
    $( this ).next().hide();
  } else {
    // else show hint
    $( this ).next().show();
  }
} ).keyup( function() {
  var $pwdLength = $( this ).val().length;
  // determine if pwd valid
  if ( $pwdLength > 8 ) {
    // hide if valid
    $( this ).next().hide();
  } else {
    // else show hint
    $( this ).next().show();
  }
} );
```

### Refactor (DRY)

* same end result but less code repeated

```js
// Hide hints
$( "form span" ).hide();
// when event happens on pwd input

function validPwdLength() {
  var $pwdLength = $( this ).val().length;
  // determine if pwd valid
  if ( $pwdLength > 8 ) {
    // hide if valid
    $( this ).next().hide();
  } else {
    // else show hint
    $( this ).next().show();
  }
}
$( "#password" ).focus( validPwdLength ).keyup( validPwdLength );
```

## add confirm password

```js
// Hide hints
$( "form span" ).hide();
// when event happens on pwd input

function validPwdLength() {
  var $pwdLength = $( this ).val().length;
  // determine if pwd valid
  if ( $pwdLength > 8 ) {
    // hide if valid
    $( this ).next().hide();
  } else {
    // else show hint
    $( this ).next().show();
  }
}

function confirmPassword() {
  var $password = $( "#password" ).val();
  var $conPassword = $( "#confirm-password" ).val();
  if ( $password === $conPassword ) {
    $( this ).next().hide();
  } else {
    $( this ).next().show();
  }

}
$( "#password" ).focus( validPwdLength ).keyup( validPwdLength );

$( "#confirm-password" ).focus( confirmPassword ).keyup( confirmPassword );
```

## refactor with variables

```js
// declare variables
var $password = $( "#password" ),
  $confirmPassword = $( "#confirm-password" );

// Hide hints
$( "form span" ).hide();
// when event happens on pwd input

function validPwdLength() {
  // determine if pwd valid
  if ( $password.val().length > 8 ) {
    // hide if valid
    $password.next().hide();
  } else {
    // else show hint
    $password.next().show();
  }
}

function confirmPassword() {
  if ( $password.val() === $confirmPassword.val() ) {
    $confirmPassword.next().hide();
  } else {
    $confirmPassword.next().show();
  }

}
// here we use multiple focus and keyup events to reevaluate match, if we leave off last two, and have matching password and confirmPassword, then change the password length, it won't reevaluate. By chaining the confirm password onto the password, this fixes it
$password.focus( validPwdLength )
  .keyup( validPwdLength )
  .focus( confirmPassword )
  .keyup( confirmPassword );;

$confirmPassword.focus( confirmPassword ).keyup( confirmPassword );
```

## What do we do if we want to programatically disable the submit button until the form validates?

* add `id` of `login-submit` to submit button in html to make it easier to select

```js
// declare variables
var $password = $( "#password" ),
  $confirmPassword = $( "#confirm-password" ),
  $username = $( "#username" );

$( "form span" ).hide();

function isUsernamePresent() {
  return $username.val().length > 0;
}

function isPasswordValid() {
  return $password.val().length > 8;
}

function doPasswordsMatch() {
  return $password.val() === $confirmPassword.val();
}

function canSubmit() {
  return isPasswordValid() && doPasswordsMatch() && isUsernamePresent();
}

function validPwdLength() {
  // determine if pwd valid
  if ( isPasswordValid() ) {
    // hide if valid
    $password.next().hide();
  } else {
    // else show hint
    $password.next().show();
  }
}

function confirmPassword() {
  if ( doPasswordsMatch() ) {
    $confirmPassword.next().hide();
  } else {
    $confirmPassword.next().show();
  }
}

function enableSubmitEvent() {
  $( '#login-submit' ).prop( 'disabled', !canSubmit() );
}

function usernameEvent() {
  if ( isUsernamePresent() ) {
    $username.next().hide();
  } else {
    $username.next().show();
  }
}

$password.focus( validPwdLength )
  .keyup( validPwdLength )
  .keyup( confirmPassword )
  .keyup( enableSubmitEvent );

$confirmPassword.focus( confirmPassword )
  .keyup( confirmPassword )
  .keyup( enableSubmitEvent );

$username.focus( usernameEvent ).keyup( usernameEvent ).keyup( enableSubmitEvent );

// disable form on page load
enableSubmitEvent();
```


