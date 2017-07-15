# What is JavaScript?
* JavaScript is:
    - lightweight
    - cross-platform
    - object-oriented (it's based on objects)
    - computer programming language
* JavaScript is one of three core technologies of web development
    - Mostly using on web pages
    - But also can be used in environments not based on web
* Today, JavaScript can be used in different places
    - `Client-side`: JavaScript was traditionally only used in the browser
    - `Server-side`: Thanks to `node.js` we can use JavaScript on the server as well

![the role of JavaScript](https://i.imgur.com/wubKGov.png)

![nouns adj and verbs](https://i.imgur.com/gogC5aD.png)

`index.html`

### embedded JavaScript

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Section 2: JavaScript Language Basics</title>
    </head>

    <body>
        <h1>Section 2: JavaScript Language Basics</h1>
    </body>
    <script>
      console.log('yo');
    </script>
</html>
```

### External JavaScript

`app.js`

```js
console.log('yo');
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Section 2: JavaScript Language Basics</title>
    </head>

    <body>
        <h1>Section 2: JavaScript Language Basics</h1>
    </body>

    <script src="app.js"></script>
</html>
```
