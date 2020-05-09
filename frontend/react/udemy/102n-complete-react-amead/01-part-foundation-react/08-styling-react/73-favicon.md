# Favicon
* Grab favicon and place in `public/img`

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Indecision App 3</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
</head>
<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```

* We add `<link rel="icon" type="image/png" href="/img/favicon.png" />`
* No changes until your refresh (we are not watching for changes to `index.html`)
* If you point to the wrong favicon (wrong name) you will get a 404 inside the chrome console tab

![favicon working](https://i.imgur.com/QyYIv3x.png)

## If you are using a .ico file
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Indecision App</title>
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
  </head>
  <body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

