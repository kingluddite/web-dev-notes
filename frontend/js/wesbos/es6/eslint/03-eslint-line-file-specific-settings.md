# Eslint Line and File Specific Settings

Settings can sometimes get in your way. Here's how to turn them off

## Problems with Globals
ga.track (Google Analytics)
twttr.trackConversion() (Twitter)

If you use them you'll get errors

`bad-code.js`

Append this code to the end:

```js
ga.track();
twttr.trackConversion();
```

Run eslint `$ eslint bad-code.js`

You will get errors that they are both not defined

To fix this you use comments to set globals and then eslint will ignore them

So at top of file do this:

`/* globals twttr ga */`

Run eslint again `$ eslint bad-code.js` and you won't have errors

Could do it globally but better to do it file by file

## Turn off eslint setting in a file or in a line

[Add a Polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) to give us some future cool feature of ES7

Add this code to `bad-code.js` and run eslint again

```js
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
```

Now we get a bunch of errors

## Disable eslint rule by file
To disable eslint rules by file add this to the top of `bad-code.js`

```
/* eslint-disable no-extend-native */
```

Run eslint again and we go from 17 errors to 16 errors

## How to disable just for a line
Go to the specific line and do this:

```
if (!Array.prototype.includes) {
  /* eslint-disable no-extend-native */
  Object.defineProperty(Array.prototype, 'includes', {
    /* eslint-enable no-extend-native */
```

But we know this polyfill is good (it was recommended by MDN) so how can we just turn off one function (block of code)

Just put this on the line before the function

`/* eslint-disable */`

And this line at the end

`/* eslint-enable */`


