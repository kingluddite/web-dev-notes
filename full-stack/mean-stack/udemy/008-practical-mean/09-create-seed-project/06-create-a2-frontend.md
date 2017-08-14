# Create Angular2 frontend
* Create `/assets/app` - This will hold the Angular2 app

## Create basic files
* `app.component.ts`
* `app.component.html` - For the template
* `app.component.css` - For the styles
* `app.module.ts`
* `main.ts` - To start everything
* `polyfills.ts` - Will hold the polyfills of my Application
    - These are the dependencies Angular2 needs to run properly in all browsers

`polyfills.ts`

```js
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
```

`app.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
```

`app.component.css`

```css
h1 {
  color: red;
}
```

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

`main.ts`

```js
import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

* Above will start my application

## Work on index.hbs template file
`index.hbs`

* Add basic HTML5 skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My custom Seed Node Angular Project</title>
</head>
<body>
  
</body>
</html>
```

* Pull in Bootstrap
    - `https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css`
* Update our links to CSS

`index.hbs`

```html
// more code
  <title>My custom Seed Node Angular Project</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="/stylesheets/style.css"/>
</head>
// more code
```

## Add base element
`index.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <base href="/">
  // more code
```

* This is very imporant to make sure routing works as intended

## Add root element and bundled script
`index.hbs`

```html
// more code
<body>
<my-app>Loading ...</my-app>
<script src="/js/app/bundle.js"></script>
</body>
</html>
```

## Final handlebar server side template
`index.hbs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <base href="/">
  <meta charset="UTF-8"/>
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My custom Seed Node Angular Project</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
  <link rel="stylesheet" href="/stylesheets/style.css"/>
</head>
<body>
<my-app>Loading ...</my-app>
<script src="/js/app/bundle.js"></script>
</body>
</html>
```

## Next - Add development workflow script
