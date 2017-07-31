# Understanding Decorators
* All the things we see here are contained in an object
* Or are properties of an object which is passed as an argument to the `@NgModule` thing

## This "thing" is a Decorator
* Decorators are a TypeScript feature which enable us to attach some additional information to a class

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

* The above empty class becomes more than an empty class because of the @NgModule Decorator
    - We pass arguments to `@NgModule`
    - And in the background Angular 2 will use these arguments to store it and then know when we use the AppModule class it is more than an empty class
    - It is configured with all the info we add here in the @NgModule Decorator 
