# Adding Child routes
* We will start in the **authentication** Component
    - Which is the parent Component of this whole feature

`authentication.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  template: `
    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
          <li><a ></a>Signup</li>
          <li><a ></a>Signin</li>
          <li><a ></a>Logout</li></ul>
      </nav>
    </header>
  `
})
export class AuthenticationComponent {

}
```

## View in browser
![auth with tabs](https://i.imgur.com/lSXWw9w.png)

### We need a place to add them
* We did this before and now we'll do it again
* Didn't we already use `router-outlet` in **app.component.html**?
    - Now we're rendering it again in the authentication module
    - How does Angular2 know what to render and where to render it?
        + Simple
            * Top row routes get loaded in the app.component
            * Nested routes will get loaded in the Component where I nested them

## The auth routes
* All paths will be off of `/auth` as a starting point
* 'signup' and not '/signup'
    - The latter would point to `localhost:3000/signup`
    - The former would point ot `localhost:3000/auth/signup`

`auth.routes.ts`

```js
import { Routes } from '@angular/router';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent }
];
```

* We won't create another routing variable and we will just add on to our existing routing
* We will just export

`auth.routes.ts`

```js
import { Routes } from '@angular/router';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

// we add the export below
export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent }
];
```

### Add nested routes as child routes to existing route
`app.routing.ts`

```js
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  // update the following line
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES } 
];

// Make Angular2 aware of our routes
export const routing = RouterModule.forRoot(APP_ROUTES);
```

### View in browser
![nested nav working](https://i.imgur.com/uwcURoS.png)

