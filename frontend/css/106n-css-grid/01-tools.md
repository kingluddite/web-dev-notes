# Tools
* [Firefox developer edition](https://www.mozilla.org/en-US/firefox/developer/)
* Currently best css grid tools
* Install latest version of Node `$ node -v`

## Starter files
* `$ yarn install`
* browserSync
    - start in package.json
    - creates a server, it watches all files ending with html, css or js and refresh when any change
    - It will show a listing of our directories
    - port 7777
    - by default will open firefox browser (developer edition)
* `$ yarn start`
* Will open a directory of all your files
* Yarn did not work
* `$ npm i`
* `$ npm start`
* Had to manually open firefox developer

## Chapter 2
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/style.css">
  <title>Starter Files and Tooling Setup!</title>
</head>

<style>
  p {
    font-size: 40px;
    border-bottom: 10px solid var(--yellow);
    color: var(--black);
  }
</style>

<body>
  <p>Hello!!</p>
</body>

</html>
```

## Base css review `/assets/style.css`

* css variables

```css
:root {
  --yellow: #ffc600;
  --black: #272727;
}
```

* To use that in your CSS file use

```css
p {
    border-bottom: 1rem solid var(--yellow);
}
```

* border-box
    - Always add it

```css
html {
  /* border-box box model allows us to add padding and border to our elements without increasing their size */
  box-sizing: border-box;
  /* A system font stack so things load nice and quick! */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 900;
  font-size: 62.5%;
  color: var(--black);
}

/*
  WAT IS THIS?!
  We inherit box-sizing: border-box; from our <html> selector
  Apparently this is a bit better than applying box-sizing: border-box; directly to the * selector
*/
*,
*:before,
*:after {
  box-sizing: inherit;
}
