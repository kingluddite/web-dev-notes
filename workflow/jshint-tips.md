# JSHint Tips

When relying upon ECMAScript 6 features such as constants you should always set this option so JSHint doesn't raise unnecessary warnings.

`put this at the top of your js file`

```js
/*jshint esversion: 6 */
```

This option, as the name suggests, tells JSHint that your code uses ECMAScript 6 specific syntax. http://jshint.com/docs/options/#esnext

[source reference](http://stackoverflow.com/questions/27441803/why-does-jshint-throw-a-warning-if-i-am-using-const)
