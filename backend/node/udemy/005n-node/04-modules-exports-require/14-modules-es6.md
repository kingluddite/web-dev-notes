# Modules and ES6
ES6 now includes modules

## ES5 exports
`greet.js`

```js
export function greet() {
    console.log('Yo');
}
```

`app.js`

```js
import * as greetr from 'greet';
greetr.greet();
```

* You can import specific names
* as is an alias
* The V8 engine is supporting this not the addon features from NodeJS
* Same concept to protect your code, encapulate it and only use what you want
