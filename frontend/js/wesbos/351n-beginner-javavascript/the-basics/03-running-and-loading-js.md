# Running and Loading JavaScript
## console
* Return every single paragraph that lives on page

```
> document.querySelectorAll('p')
```

* Always put JavaScript right before closing `</body>` HTML tag

## script tags

## external js file
* You can omit `type` attribute unless we are dealing with modules

```
<script src=""></script>
```


### You can put code inside a script pointing to src
* The log will now run

```
<script src="script.js">
 console.log('yo');
</script>
```

## You can have multiple script tags
* But this means each one will incur a separate HTTP request
    - So it will go off and download each one and parse it
    - We can bundle them all into one file
    - Or we can use `code splitting` to split them all into multiple small files and have them load on demand

## Write JavaScript in terminal using Node



