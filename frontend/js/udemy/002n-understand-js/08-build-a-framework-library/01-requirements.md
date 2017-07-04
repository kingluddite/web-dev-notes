# Requirements
## We are focusing on structure of the framework

### Greetr
* Name of our framework

#### Official Requirements
* When given a first name, last name and optional language, it generates formal and informal greetings
* It should support english and spanish languages
* Should be reusable library/framework
    - Won't interfere with any JavaScript code in my app
    - People can just grab and use in their code
* Easy to type `G$()` structure (similar to jQuery`s `$`)
* Greetr should also support jQuery
    - We should be able to give it a jQuery object that points at some other HTML element and it will fill that element with that greeting

## Starter Code

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Greetr</title>
</head>
<body>

 <script src="jquery"></script>
 <script src="Greetr.js"></script>
 <script src="app.js"></script>
</body>
</html>
```

`Greetr.js`

```js
(function(global, $) {

}(window, jQuery));
```

* Wrap up code so that any code inside it will be safe
* Pass to it what we need access to (Window and `$` (jQuery))
* Now my code is safe inside this structure
* I pass it the global object and jquery and when I invoke it I pass the window object and the jQuery object
