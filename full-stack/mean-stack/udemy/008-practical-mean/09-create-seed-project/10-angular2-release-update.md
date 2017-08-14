# Angular2 Beta to release
* Changed from `angular2/core` to `@angular/core`

## old Angular
    - `import { RouteConfig } from 'angular2/router`

## new Angular
    - `import { RouteConfig } from '@angular/router'`

## ngFor
* Old Syntax

```
// more code
@Component({
    selector: 'my-ngfor',
    template: `
        <ul>
            <li *ngFor="#item of items">Item: {{item}}</li>
        </ul>
    `
})
export class NgForComponent {
    items = [1,2,3,4,5,6];
}
// more code
```

* New Syntax (we just exchange `#` (hashtag) for `let`)

```
// more code
@Component({
    selector: 'my-ngfor',
    template: `
        <ul>
            <li *ngFor="let item of items">Item: {{item}}</li>
        </ul>
    `
})
// more code
```

## Router - The biggest change from Beta to Release
* Old router syntax

```js
import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { Route1Component } from './router/route1.component';
import { Route3Component } from './router/route3.component';
import { Route2Component } from './router/route2.component';
import { NgForComponent } from './ngFor/ngFor.component';
import { RouterComponent } from './router/router.component';
import { RouteConfig } from 'angular2/router';

@Component({
  selector: 'my-app',
  template: `
    <h1>Angular 2 Release Candidate 1 Changes</h1>
    <hr />
    <h2>NgFor</h2>
    <p>Use "let" instead of "#"</p>
    <my-ngfor></my-ngfor>
    <hr />
    <h2>Router</h2>
    <my-router></my-router>
  `,
  directives: [NgForComponent, RouterComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/route1', name: 'Route1', component: Route1Component },
  { path: '/route2/...', name: 'Route2', component: Route2Component },
  { path: '/route3/:id', name: 'Route3', component: Route3Component }
])
export class JunkComponent {}
```

* Sub routes were indicated by `...`

`route3.component.ts`

```
import ...

@Component({
  selector: 'my-route3',
  template: `
    <p>This is route 3. No subrouting, has parameters</p>
    <div>Passed parameters: {{param}}</div>
  `
})
export class Route3Component implements OnInit {
  param:string

  constructor(private routeParams: RouteParams) {}

  ngOnInit() {
    this.param = this.routeParams.get('id');
  }
}
```

### What will change
* Routes are no longer defined using RouteConfig but instead using the Routes metadata

```
@Routes([
  { path: '/route1', name: 'Route1', component: Route1Component },
  { path: '/route2/...', name: 'Route2', component: Route2Component },
  { path: '/route3/:id', name: 'Route3', component: Route3Component }
])
```

* Using this import

`import { Routes, ROUTER_DIRECTIVES } from '@angular/router';`

### Routes no longer have names
* They are identified by the `path` which is unique
* Just use `path` and `component` to set up routes

```
@RouteConfig([
  { path: '/route1', component: Route1Component },
  { path: '/route2/...', component: Route2Component },
  { path: '/route3/:id', component: Route3Component }
])
```

### No more `...` for subrouting
```
@RouteConfig([
  { path: '/route1', component: Route1Component },
  { path: '/route2', component: Route2Component },
  { path: '/route3/:id', component: Route3Component }
])
```

* Just define the routes like any other route and Angular2 will figure out if it has routes inside it

### final file
```js
import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { Route1Component } from './router/route1.component';
import { Route3Component } from './router/route3.component';
import { Route2Component } from './router/route2.component';
import { NgForComponent } from './ngFor/ngFor.component';
import { RouterComponent } from './router/router.component';

@Component({
  selector: 'my-app',
  template: `
    <h1>Angular 2 Release Candidate 1 Changes</h1>
    <hr />
    <h2>NgFor</h2>
    <p>Use "let" instead of "#"</p>
    <my-ngfor></my-ngfor>
    <hr />
    <h2>Router</h2>
    <my-router></my-router>
  `,
  directives: [NgForComponent, RouterComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/route1', component: Route1Component },
  { path: '/route2/...', component: Route2Component },
  { path: '/route3/:id', component: Route3Component }
])
export class JunkComponent {}
```

### Child Component
* How links were set up in the past

```js
import ...

@Component({
  selector: 'my-router',
  template: `
   <a [routerLink]="['Route1']">Route 1 (no subroutes)</a>
   <a [routerLink]="['Route2']">Route 2 (has subroutes)</a>
   <a [routerLink]="['Route3', {id: 1}]">Route 3 (has parameter)</a>
   <br />
   <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class RouterComponent {

}
```

* We don't use names anymore and replace them with the paths (leave out the leading forward slash)
* `parameters` can be passed as additional args
    - So I pass `1` and route3 expects and `:id` so that gets passed as a parameter
* New way

```
import ...

@Component({
  selector: 'my-router',
  template: `
   <a [routerLink]="['route1']">Route 1 (no subroutes)</a>
   <a [routerLink]="['route2']">Route 2 (has subroutes)</a>
   <a [routerLink]="['route3', 1]">Route 3 (has parameter)</a>
   <br />
   <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class RouterComponent {

}
```

* **note** If I use `/`

`<a [routerLink]="['/route1']">Route 1 (no subroutes)</a>`

* Then that is `/route1` is an absolute path from the domain of this page
* If I want to use a relative path, I would use `./route1`

### Subrouting
```
import ...

@Component({
  selector: 'my-router2',
  template: `
   <p>This is route 2. Has subrouting, no parameters</p>
   <h3>Subroutes</h3>
   <a [routerLink]="['./']">Subroute 1</a>
   <a [routerLink]="['subroute2']">Subroute 2</a>
   <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '', component: Subroute1Component},
  {path: '/subroute2', component: Subroute2Component},
])
export class RouterComponent {

}
```

* Here is a relative path:

`<a [routerLink]="['./']">Subroute 1</a>`

* If I used [''] instead of `[./']` That would point to the root of the app instead of relative to this subroute
* So relative will mean "Stay on the same URL you are currently at"
* We navigate here just like if we were in a folder stucture

## Fetching parameters also changed
```
import ...

@Component({
  selector: 'my-route3',
  template: `
    <p>This is route 3. No subrouting, has parameters</p>
    <div>Passed parameters: {{param}}</div>
  `
})
export class Route3Component implements OnInit {
  param:string

  constructor(private routeParams: RouteParams) {}

  ngOnInit() {
    this.param = this.routeParams.get('id');
  }
}
```

* We are no longer using `routeParams` but now use `routeSegment` because Angular2 no longer knows routeParams it only knows `segments` of a URL
* And RouteSegment has a method called `getParam()`

### New Way
```
import ...

@Component({
  selector: 'my-route3',
  template: `
    <p>This is route 3. No subrouting, has parameters</p>
    <div>Passed parameters: {{param}}</div>
  `
})
export class Route3Component implements OnInit {
  param:string

  constructor(private routeSegment: RouteSegment) {}

  ngOnInit() {
    this.param = this.routeSegment.getParam('id');
  }
}
```

* The updated Version of the Course uses Angular 2.0 Final instead of the Beta or RC version
* It also uses Webpack as a Build Tool instead of the SystemJS Module Loader

### To successfully update
* You can copy your Angular 2 Code Files (in `assets/app`) into the new Seed Project (in the `assets/app` folder as well)
* Make sure that you're using the `app.component.ts`
    - If your Root Component (filename) is named differently, make sure to copy all its code into the `app.component.ts` file
    - The same is true for the `app.component.html`
* That should allow you to use the new Folder Structure, but you're still using the old Angular 2 Code

### There are three major Differences between RC and Angular 2.0 Final: 
1) Angular 2 now uses "Modules"

* You'll see the `app.module.ts` file in your `assets/app` folder (in the new seed project)
* In this `AppModule`, register ALL Components, Directives and Pipes you may use in the declarations[] array
* Register all Services you may provide in the `bootstrap()` method in the providers[] array of the AppModule

### Don't use `bootstrap()` anymore to provide services

### Don't use directives[] or pipes[] in @Component anymore
* Follow the above approach instead

Learn more about that change here: https://www.barbarianmeetscoding.com/blog/2016/08/13/updating-your-angular-2-app-from-rc4-to-rc5-a-practical-guide/

2) In the above Article you can already read about it: The Router also needs updating

### You can follow the steps outlined in the Article
* Generally, you don't use `@Route`s anymore
* Instead, create a new file (e.g. `app.routing.ts`) in your root (`assets/app`) folder and store your `Routes` there
* Make sure to watch the videos where I set up Routing in the updated course sections to learn more about setting up Routes with the new Router.

### Forms now also changed
* Here I also strongly advise to have a look at the updated Videos to understand how you now use the Template-Driven or Data-Driven (Reactive) Approach.

### Also make sure to use HttpModule
* Add it to your imports[] in AppModule instead of HTTP_PROVIDERS

* With that, your Project should be updated

-------

Required Code Updates in Detail:

* Angular 2.0 Final was released and with it, a couple of changes have to implemented in this course's project

### NgModule
* RC5 introduced the concept of "Application Modules" (learn more [here](https://angular.io/guide/ngmodule) - no worries, it's not that complicated)
* For many applications, one module will suffice
* An App Module basically bundles a couple of Components, Directives, Services and Pipes together
* In the case of one single module, the whole app is bundled together

#### Getting Started with NgModule
* In order to update your app from RCx to 2.0 Final, you have to put ALL components you used to add in the directives field of the @Component  decorator into the declarations field in the @NgModule decorator on your AppModule
* Previously, you would have added `MessageComponent` to the directives array in the `@Component` decorator like this:

```
@Component({
    ...
    directives: [MessageComponent]
})
```

##### This is no longer correct!
* Instead, you would use the AppModule in the `app.module.ts` file like this:

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
 
@NgModule({
    declarations: [AppComponent, MessageComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
export class AppModule {
 
}
```

### Providing Application-Wide Services
* A similar change has to be applied to application-wide provided services
* Previously, you would add them in the `bootstrap()` method like this:

```js
///<reference path="../../typings/index.d.ts"/>
import { bootstrap } from '@angular/platform-browser-dynamic';
 
import { AppComponent } from "./app.component";
import { MessageService } from "./messages/message.service";
 
bootstrap(AppComponent, [MessageService]);
```

##### This is no longer correct!
* Instead you provide this service in the `AppModule` as well:

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from "./app.component";
import { MessageComponent } from "./messages/message.component";
import { MessageService } from "./messages/message.service";
 
@NgModule({
    declarations: [AppComponent, MessageComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
    providers: [MessageService]
})
export class AppModule {
 
}
```

### How to bootstrap the Application with NgModule
* Lastly, since we have this `AppModule`, the way the application gets bootstrapped also changed
* You see the `boot.ts`  file as it looked previously in the example above
* Now it looks like this:

```js
///<reference path="../../typings/index.d.ts"/>
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 
import { AppModule } from "./app.module";
 
platformBrowserDynamic().bootstrapModule(AppModule);
```

* The `AppModule` gets bootstrapped since it holds all the information about our application

## New Forms - Template Driven (in this course: create / edit message)
* Forms also got changed. Learn more about them [here](https://angular.io/guide/forms)
* Template-driven Forms now use a different syntax - it's best to simply have a look at the source code attached to this lecture
* Basically, you don't use `ngControl`  anymore - instead you use `ngModel`

### You can now also reset forms with `form.reset()`
* Forms also have to be enabled by importing a specific module in the `AppModule`
* For template-driven forms, you have to import the `FormsModule`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from "./app.component";
import { MessageService } from "./messages/message.service";
import { MessageComponent } from "./messages/message.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { FormsModule } from "@angular/forms";
 
@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageInputComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent],
    providers: [MessageService]
})
export class AppModule {
 
}
```

### New Forms - Data Driven (in this course: Sign Up & Sign In)
* Forms also got changed. Learn more about them [here](https://angular.io/guide/forms)
* The general approach hasn't changed but the directives you use in your template were changed / renamed
* Forms also have to be enabled by importing a specific module in the `AppModule`
* For data-driven (= reactive) forms, you have to import the `ReactiveFormsModule`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from "./app.component";
import { MessageService } from "./messages/message.service";
import { MessageComponent } from "./messages/message.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { ReactiveFormsModule } from "@angular/forms";
 
@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageInputComponent
    ],
    imports: [BrowserModule, ReactiveFormsModule],
    bootstrap: [AppComponent],
    providers: [MessageService]
})
export class AppModule {
 
}
```

### New Router
* Angular 2 received yet another new Router
* The syntax is very different to the old syntax but fortunately not that difficult to get into
* You define your routes in separate files - again
* Basically, you provide an array of JS objects, where each object defines one route
* For that, you define the path (i.e. part of the URL), the component which should get loaded and possible children of that route
* You then have to use `RouterModule` to provide the root routes for your application
* An example `app.routing.ts` file could look like this:

```js
import { Routes, RouterModule } from "@angular/router";
 
import { AUTH_ROUTES } from "./auth/auth.routes";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
 
const APP_ROUTES: Routes = [
    { path: '', component: MessagesComponent},
    { path: 'auth', component: AuthenticationComponent, children: [
        ...AUTH_ROUTES
    ] }
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
```

* **Note** that `AUTH_ROUTES` is just another array of routes, stored in another file (there, you don't need the RouterModule  - it's just an array of objects)
* The exported constant ROUTING then has to be imported in your `AppModule`:

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from "./app.component";
import { ROUTING } from "./app.routing";
 
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule, ROUTING],
    bootstrap: [AppComponent]
})
export class AppModule {
 
}
```

* That's all - this defines your routes and you may then use them
* In order to use them, you can create links or navigate directly from code
* For both concepts, the syntax hasn't changed that much

### You don't need to import ROUTER_DIRECTIVES anymore! 
* At no place in your app!

### HttpModule
* In order to use `Http`, you no longer provide HTTP_PROVIDERS in the `bootstrap()`  method
* Remember, the `bootstrap()` method isn't used anymore when using `NgModule`
* Instead, you have to import the `HttpModule` in your `AppModule`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from "./app.component";
import { HttpModule } from "@angular/http";
 
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [BrowserModule, HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {
 
}
```
