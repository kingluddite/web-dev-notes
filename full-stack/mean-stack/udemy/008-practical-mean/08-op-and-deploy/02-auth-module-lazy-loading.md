# Using an Auth Module and Lazy Loading
* Our modularization of the `MessageModule` makes our code easier to read but we don't gain any performance gains
* This will change with the `AuthModule`
* Both Auth and Message modules are loaded via routing but we always load the Messages since we redirect to them
    - But we don't always load the AuthModule
    - So we just want to load the Auth parts if we need them

## Create `auth.module.ts`
`/assets/app/auth/auth.module.ts`

### Update app.module.ts

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { MessageModule } from './messages/message.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [BrowserModule, routing, HttpModule, MessageModule],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

* We can remove `LogoutComponent`, `SignupComponent` and `SigninComponent`
* We can also remove teh ReactiveFormsModule because it is not needed
    - We will import this in the AuthModule where we use our Reactive forms to submit our signup and signin forms
* But we can't remove `AuthenticationComponent` because we use it in the routing
    - We didn't have to do this for MessageModule because we import that Module right at the beginning when we start our app and that means the MessageModule is available to our root router
* We also have to keep AuthService in `app.module` because we use it Application wide

### We want to Lazy Load the Auth Module
* What does Lazy Load mean?
    - Only load it once we need it
* The AuthenticationComponent is needed all the time because it is part of our root route

`auth.module.ts`

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LogoutComponent } from './logout.component';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [LogoutComponent, SignupComponent, SigninComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AuthModule {}
```

## We want to Lazy load auth module
`app.routing.ts`

```js
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';

const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);
```

* To do this I need to change the way I load my routes
    - Currently we load them right at the beginning `app.routing.ts`
* I need to set up my own router module in this auth module
* I rename `auth.routes.ts` to `auth.routing.ts` to be same naming convention used int `app.routing.ts`
* `forRoot()` vs `forChild()`
    - forRoot() is for app wide routes
    - I use forChild() to register routes that are only valid for this auth section
* I change how I export this file

## Update `app.routing.ts`
* Remove AUTH_ROUTES import
* `loadChildren()` tells Angular2 to lazy load
    - I pass it a string not a type (**important**)
    - The string just points to this module I want to load

`app.routing.ts`

```js
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: './auth/auth.module#AuthModule'
  }
];

// Make Angular2 aware of our routes
export const routing = RouterModule.forRoot(APP_ROUTES);
```

* `angular2-router-loader` - This converts this string `'./auth/auth.auth.module#AuthModule'` into a function which Angular2 can use at runtime to dynamically load this module when it needs it

### Update auth.module.ts
```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LogoutComponent } from './logout.component';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { authRouting } from './auth.routing'; // add this line

@NgModule({
  declarations: [LogoutComponent, SignupComponent, SigninComponent],
  imports: [CommonModule, ReactiveFormsModule, authRouting] // modify this line
})
export class AuthModule {}
```

## Test in browser
* You should see it works as before
* View Chrome Network tab
* Disable caching (check checkbox)

![disable caching](https://i.imgur.com/j87v5PV.png)

* Reload app on `localhost:3000/messages`

![loaded at start](https://i.imgur.com/INJvyp3.png)

* Click on `Authentication` tab
* You should see a `chunk` added

![added auth chunk](https://i.imgur.com/inqcwYi.png)

* This is lazy loading working and only loading auth when we need it
