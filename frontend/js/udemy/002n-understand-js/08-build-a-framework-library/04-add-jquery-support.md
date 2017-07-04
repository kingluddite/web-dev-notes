# Add jQuery Support
`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Greetr using jQuery</title>
</head>
<body>
  <div id="loginDiv">
    <select id="lang">
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
    <input type="button" value="Login" id="login" />
  </div><!-- /#loginDiv -->
  <h1 id='greeting'></h1>
 <script src="../node_modules/jquery/dist/jquery.min.js"></script>
 <script src="Greetr.js"></script>
 <script src="app.js"></script>
</body>
</html>
```

`app.js`

```js
const g = G$('John', 'Doe');
g.greet().setLang('es').greet(true).log();
```

* Outputs

```
Hello John!
Greetr.js:55 Saludos John Doe
Greetr.js:65 Inicio sesion: John Doe
```

## Add a method that accepts a jQuery selector
* And then updates whatever the selector is

```js
(function(global, $) {

  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  var supportedLangs = ['en', 'es'];

  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  Greetr.prototype = {

    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ' ' + this.fullName();
    },

    greet: function(formal) {
      var msg;

      // if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // `this` refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },

    setLang: function(lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }

      if (!selector) {
        throw 'Missing jQuery selector';
      }

      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      $(selector).html(msg);

      return this;
    }

  };

  Greetr.init = function(firstName, lastName, language) {

    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();

  };

  Greetr.init.prototype = Greetr.prototype;

  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
```
