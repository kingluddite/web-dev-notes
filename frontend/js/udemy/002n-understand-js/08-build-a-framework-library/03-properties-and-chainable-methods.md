# Properties and Chainable Methods
* In order to save memory space I should put all my methods on the **prototype** property
    - And they will be shared by all objects generated from this object

`Greetr.prototype = {};`

`var supportedLangs = ['en', 'es']`

* Thanks to closures because they are using the same lexical environments
* But it is hidden from any developers from changing them without coming into the source code itself

## Adding things not exposed to the outside world

* supportedLangs
* greetings
* formalGreetings
* logMessages

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

  var formatGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  Greetr.prototype = {};

  Greetr.init = function(firstName, lastName, language) {

    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

  };

  Greetr.init.prototype = Greetr.prototype;

  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
```

* Things that will be exposed to the outside variable

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
    }

  };

  Greetr.init = function(firstName, lastName, language) {

    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

  };

  Greetr.init.prototype = Greetr.prototype;

  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
```

`app.js`

```js
const g = G$('John', 'Doe');
g.greet();
```

* Will return `Hello John!`
* And it is chainable so this will work too

```js
const g = G$('John', 'Doe');
g.greet().greet(true);
```

* And that will return

```
Hello John!
Greetings John Doe
```

* Change the language to Spanish `es`

```js
const g = G$('John', 'Doe');
g.greet().setLang('es').greet(true);
```

* Outputs

```
Hello John!
Saludos John Doe
```

* And if you pass an invalid language like `fr`

```js
const g = G$('John', 'Doe');
g.greet().setLang('fr').greet(true);
```

* You will get an error that says `Invalid language`
