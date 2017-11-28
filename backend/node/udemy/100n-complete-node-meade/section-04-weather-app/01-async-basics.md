# ASYNC basics
Build a weather app
* Communicates with:
    - Google API
    - And a weather API

```js
console.log('starting app');

setTimeout(() => {
  console.log('from inside of callback');
}, 2000);
console.log('finishing app');
```

`$ node playground/async-basics.js`

Outputs:

```
starting app
finishing app
from inside of callbac
```

* We used non-blockin IO, we can wait 2 seconds without preventing the rest of the program from executing
