## let const for the real world

[ben alman IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

## IIFE - a function that runs immediately

* `I`mmediately
* `I`nvoked
* `F`unction
* `E`xpression

Function that runs itself immediately and it creates a scope where nothing is going to leak into the parent scope

```js
var name = 'phil';
```

If you view console and type `name` you will get `Phil`. It leaks into the global scope.

## Using IIFE

```js
(function() {
    var name = 'phil';
})();
```

Now if you type `name` in chrome inspector you will get `""` which means the variable is no longer leaking to the global scope

This was used a lot so people wouldn't use variable names that would collide with 3rd party code

## We don't need IIFE anymore!

But if we use `let` and `const` we don't need IIFE because they are both block scoped

so now just do this:

```js
{
    const name = 'phil';
}
```

You will see that name has not leaked to global scope

## For Loop problem

```js
for (var i = 0; i < 10; i++) {
    console.log(i);
}
```

Gives us `0` through `9`

## Problems with above for loop
* If you type `i` in console it will be `10`
    + So we have a global variable that has leaked out

## Another problem

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log('The number is ' + i);
  }, 1000);
}
```

Will wait a second and then all will be `10`

There is no way (using `var`) to find out what the value of `i` was during the loop when inside the `setTimeout()` method (unless you used an IIFE)

## A solution is to change `var` to `let`

```js
for (let i = 0; i < 10; i++) {
      console.log(i);
      setTimeout(function() {
        console.log('The number is ' + i);
      }, 1000);
    }
```

![let saves the day in for loops](https://i.imgur.com/Um2q4Bv.png)

And now since `let` is blocked scope we now can get the values inside the `setTimeout()`

* **note** you can't use `const` inside the `for` loop because you can't override variable values when using `const`
