# Starting Angular 2 Application
* Important file is `assets/app/main.ts`
    - This is the file where we start the Angular 2 Application

`main.ts`

```
platformBrowserDynamic().bootstrapModule(AppModule);
```

* This is the code that gets executed first in the bundle.js
* To start an Angular 2 app you have to tell the framework, here's the app and you pass `AppModule` like it is done above

## app.module.ts
* I use this file to tell Angular 2 what my file consists of

### Which component should be my root component?
* You do this with this line `boostrap: [AppComponent]`
    - This is the module responsible for holding my Application
    - This is the root component that will hold all the other Applications

`app.component.ts`

```js
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    
}
```

* This empty `AppCompnent` class has the `@Component` selector attached to it
    - This is a **decorator**
    - Each component needs to have a template because a component is something that in the end gets placed on the DOM which gets rendered to the client in the browser, so it will need to have some HTML code and that HTML lives in app.component.html

`app.component.html`

```html
<h1>New Content Here!</h1>
```

### selector: 'my-app'
* This is the HTML element that is in our `index.hbs`

```
// more code
<body>
<my-app>Loading...</my-app>
// more code
```

* We told Angular 2 that in `app.module.ts` that we want to start our Application with AppComponent
* Angular 2 goes to AppComponent
* Then it looks at the component declaration
* And sees the selector is `my-app`
* Then it recognized the compenent selector is inside `index.hbs`
* And then it put our content in the place of the `my-app` element
* And that is how we see the content of `app.component.html` when we visit our page

## Start our app
`$ npm start`

## Start our build process
`$ npm run build`

* This starts webpack
* Bundles everything
* And keeps watching for changes
    - So that it recomponiles whenever we change something 

## View in browser
* `localhost:3000`

## Takeaway
* This is how Angular 2 gets started using our component to display the content of this component on our page
* We won't do anything else with `views/index.hbs`
