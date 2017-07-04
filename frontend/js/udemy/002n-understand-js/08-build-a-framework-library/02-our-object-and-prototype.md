# Our Greetr Object and its Prototype
* Will be a bit tricky
* Because we will imitate the way that jQuery is set up
* We are imitating jQuery's structure

## Goal
* To use our framework by using something like this:

`var g = G$(firstName, lastName, language);`

* My library will give me back an object
* That will help users of Greetr not have to use `new` all the time

`Greetr.js`

```js
(function(global, $) {

  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
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

`app.js`

```js
const g = G$('John', 'Doe');
console.log(g);
```

* And Chrome shows us how this is working

![Greetr returned](https://i.imgur.com/WLwJdvP.png)


