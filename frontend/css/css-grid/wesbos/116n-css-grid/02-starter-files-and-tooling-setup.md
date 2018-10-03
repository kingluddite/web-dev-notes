# Tooling Setup
* Download and use Firefox Developer Edition
* Node `$ node -v`
find . -type f -name "* *.md" -exec bash -c 'mv "$0" "${0//---/_}"' {} \;

`package.json`

```
// MORE CODE

"scripts": {
  "start": "run-script-os",
  "start:win32": "browser-sync start --server --files '**/*.css, **/*.html, **/*.js, !node_modules/**/*' --directory --port 7777 --browser \"C:\\Program Files\\Firefox Developer Edition\\firefox.exe\"",
  "//": "Hello! If you are having trouble running this command. Try changing Firefox Developer Edition to FirefoxDeveloperEdition",
  "start:darwin:linux": "browser-sync start --server --files '**/*.css, **/*.html, **/*.js, !node_modules/**/*' --directory --port 7777 --browser 'Firefox Developer Edition'"
},

// MORE CODE
```

* This will auto open Firefox Developer Edition

## Install our needed packages
`$ npm i` (just installs browser sync)

## Start browsersync
`$ npm start`

* It may open browser but if not, browser to `locahost:7777`
* You will see folders of all files
* Open folder, click on file and it will open in browser and all changes, when saved will be viewable in browser

## CSS Variables
* Don't use browser default color for yellow, pick and use your own

`main.css`

```
:root {
  --green: #99a273;
  --gray: #384247;
}
```

## Use them
* Without variables

```
<style>
  p {
    font-size: 40px;
    border-bottom: 10px solid gray;
    color: green;
  }
</style>
```

* With CSS variables

```
<style>
  p {
    font-size: 40px;
    border-bottom: 10px solid var(--green);
    color: var(--gray); 
  }
</style>
```

## border-box
* The border-box model allows us to add padding and border to our elements without increasing their size

```css
html {
    box-sizing: border-box;
}
```
## system-fonts
```css
html {
  /* A system font stack so things load nice and quick! */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 900;
  font-size: 10px;
  color: var(--black);
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
}
```
## inherit box-sizing
* We inherit box-sizing: border-box; from our `<html>` selector
* Apparently this is a bit better than applying `box-sizing: border-box;`directly to the `*` selector

```
/*

  We inherit box-sizing: border-box; from our <html> selector
  Apparently this is a bit better than applying box-sizing: border-box; directly to the * selector
*/
*,
*:before,
*:after {
  box-sizing: inherit;
}
```


## Colors
* Green #99A273
* Dark Green #4A4B45
* Gray #3E4247
* White #F2E8DC
* Tan #D8995A
