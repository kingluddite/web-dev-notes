# Temporal Dead Zone
You can not access a variable before it is defined

This works

```js
var fries = 'Large Fries';
console.log(fries);
```

This does not:

```js
console.log(fries);
var fries = 'Large Fries';
```

You get `undefined`

With `var` variables you can access them as they are defined or before they are defined but you can't access the value

If you use `let` or `const` you will get an error saying `fries` is not defined

```js
console.log(fries);
const fries = 'Large Fries';
```
