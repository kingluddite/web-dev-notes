# Existence and Booleans
`> Boolean(undefined)` ---> false

`> Boolean(null)` ---> false

`> Boolean("")` ---> false

## All things that imply the "lack of existence" they convert to `false`
This is something we can use to our advantage

```js
var a;

// goes out to internet and looks for a value

if (a) {
  console.log('Something is there');
}
```

* Whatever we put into the parentheses of an `if` statement the JavaScript Engine will attempt to convert or coerce to a Boolean true or false
* It doesn't matter what `a` is, the JavaScript Engine will attempt to convert it
* In the execution phase `a` is set to undefined
* undefined converts to `false`
* So the log statement never runs

## Checks
* If `a` is **null** ---> false
* If `a` is **undefined** ---> false
* If `a` is **""** ---> false

### But once I have something
* Where the string is not empty

```js
var a;

// goes out to internet and looks for a value
a = 'hello';

if (a) {
  console.log('Something is there');
}
```

Then the log runs with `Something is there`

### Watch out for this
* If there is any change that the Boolean can be `0` that will return `false`
* This is a problem because `0` is not lack of existence

### Fix for values of `0`
```js
var a;

// goes out to internet and looks for a value
a = 0;

if (a || a === 0) {
  console.log('Something is there');
}
```

* And that will run the log statement
* Check order precedence table
    - `||` (means OR) has a lower precedence than `===` (strict equality)
    - This means `a === 0` which evaluates to **true** because it doesn't coerce
    - Then `(a || true)`
        Since `a` is **0** it will be coerced to `false`
    - Then `(false || true)`
    - With `||` (OR) if either one is **true**, then the statement is **true**
