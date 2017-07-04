# Strict Mode
* JavaScript is liberal with how it parses code
* You can tell the JavaScript Engine to process your code in a strictor way

```js
var person;

persom = {};
console.log(persom);
```

* This won't error
    - I will have Window.person and Window.persom 
    - This can cause debugging nightmares

## `use strict`

```js
'use strict';

var person;

persom = {};
console.log(persom);
```

* `use strict` will make us have to declare a variable first before we use it
* We will now get an error `persom is not defined`
* `use strict` is a string
    - It must go at the top of your file

## Or at the top of a function
* You can have just a function use `use strict` and not the rest of the file

```js
function logNewPerson() {
  'use strict';

  var person2;
  persom2 = {};
  console.log(persom2);
}

var person;

persom = {};
console.log(persom);
logNewPerson();
```

## Why not use `use strict` everywhere?
* It is an opt in
* Not every JavaScript Engine uses `use strict` the same way
* They don't all agree on every rule it will implement
* It is not 100% reliable but it can be useful
* Can have problems if you use it and bundle your files because if the first file uses it, they all will use it and maybe you don't want it used for all the bundled files
* [more reading on strict mode MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
