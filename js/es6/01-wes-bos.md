## let const for the real world

[ben alman IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

## IIFE - a function that runs immediately

* `I`mmediately
* `I`nvoked
* `F`unction
* `E`xpression

If you view the following in chrome and look at the inspector and type `name` you will get `Phil`. It leaks into the global scope.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>let and const real world</title>
</head>

<body>
    <script>
    var name = 'phil';
    </script>
</body>

</html>
```
Now if you type `name` in chrome inspector you will get `""` which means the variable is no longer leaking to the global scope

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>let and const real world</title>
</head>

<body>
    <script>
        (function() {
            var name = 'phil';
        })();
    </script>
</body>

</html>
```

but if we use `let` and `const` we don't need IIFE because they are both block scoped

so now just do this:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>let and const real world</title>
</head>

<body>
    <script>
        {
            const name = 'phil';
        }
    </script>
</body>

</html>
```

You will see that name has not leaked to global scope

If you are using `let` and `const` you don't need to use IIFE anymore!

## For Loop problem

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>let and const real world</title>
</head>

<body>
    <script>
        for (var i = 0; i < 10; i++) {
            console.log(i);
        }
    </script>
</body>

</html>
```

## Problems with above for loop
* if you type `i` in console it will be `10`
    + so we have a global variable that has leaked out
