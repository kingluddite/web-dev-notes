# Setup Expensify
## Create our boilerplate
* Gut indecision app and keep only stuff we'll use for all future projects

## Make copy of indecision-app and name it `expensify-app`
`$ cp -R indecision-app expensify-app`

* `$ cd expensify-app`

## Remove git
`$ rm -rf .git`

## Run Server
`$ yarn run dev-server`

* You will see same app as last time

## Make our boilerplate
* We'll gut the existing app to only use tools we'll use for all future apps
* This will greatly increase our app building speed
* Delete `src/components` and `src/playground` folders and their contents
    - Then just create empty folders of `src/components` and `src/playground` and just save an empty `.gitkeep` file in each
    - This will enable you to push empty files to github
        + Without .gitkeep, you can't push empty folders to github

`styles/styles.scss`

```css
@import './base/settings';
@import './base/base';
```

`styles/base/_base.scss`

```css
html {
  font-size: 62.5%
}
body {
  background-color: $white;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
}

h1 {
  font-size: 2.4rem;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: default;
}
```

`src/styles/base/_settings.scss`

```
// colors
$white: #ffffff;
// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;

// Media Query Breakpoints
$desktop-breakpoint: 45rem;
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My React Boilerplate</title>
  <link rel="icon" type="image/png" href="/img/favicon.png" />
</head>
<body>
  <div id="app"></div>
  <script src="/bundle.js"></script>
</body>
</html>
```

`package.json`

```json
{
  "name": "my-react-boilerplate",
  // MORE CODE
}
```

## That's it
* We now have our boilerplate tooling

