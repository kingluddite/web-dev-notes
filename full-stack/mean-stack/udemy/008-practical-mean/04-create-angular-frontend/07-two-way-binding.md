## Two-Way Binding
* Figure out a way to dynamically set our data
* Let's use a form element

`app.component.html`

```html
// more code
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <input type="text" [(ngModel)]="message.content" />
// more code
```

* The above enables us to bind our `input` to any property we set up within the quotation marks
* Now whenever I type something inside that input, we will store it inside `message.content` and whenever `message.content` gets somewhere else or at the beginning of this app, it will also output it as the value in this input and that is why it is called `two-way binding` (We can change it and we can see it there)
* In order to use it, we also have to add it to `AppModule`

## FormsModule
* The built in module Angular 2 ships with which offers us access to `ngModel` that we are using

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

* Save changes
* Refresh browser

![two-way data binding](https://i.imgur.com/KBDhToI.png)

## Takeaway
* The data is flowing from the component to the template and back to the component
