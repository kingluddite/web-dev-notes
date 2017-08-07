# Set up Routing
* Create new file

`app.routing.ts`

```js
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthenticationComponent }
];

// Make Angular2 aware of our routes
RouterModule.forRoot(APP_ROUTES);
```

* Angular2 ships with a built-in router
    - It is powerful
    - But we need to tell it what routes our app has
    - Very simple to tell it the routes
    - What is `pathMatch: 'full'`?
        + Makes sure that only if full path of `http://domain.com/` then redirect to home page of `http://domain.com/`

## Import `RouterModule` into AppModule
We first need to export our routing like this:

`app.routing.ts`

```js
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'auth', component: AuthenticationComponent }
];

// Make Angular2 aware of our routes
export const routing = RouterModule.forRoot(APP_ROUTES);
```

`app.module.ts`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent
    ],
    imports: [BrowserModule, FormsModule, routing],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

## Where should we load it?
* It looks like a Component
* But it is simply a Directive telling Angular2 "here is the place where you should load the router loaded Components"

`app.component.html`

```html
<div class="content">
  <app-header></app-header>
  <hr/>
  <router-outlet></router-outlet>
</div><!-- /.content -->
```

### View in browser
* You will instantly be redirected to `localhost:3000/messages`
* You can type `localhost:3000/auth` and you will see the auth page
* But the links don't work
    - Let's wire them up next

    
