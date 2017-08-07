# Creating User Related Components
## Create 3 auth files
* logout.component.ts
* signin.component.ts
* signup.component.ts

`logout.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    </div>
  `
})
export class LogoutComponent {
  onLogout() {

  }
}
```

* Add to `app.module`

`app.module.ts`

```
// more code
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent
    ],
// more code
```

* But I will not add this to my `authentication.component.ts`
    - Why?
    - Because I will add nesting to my auth routes (sub routes)
        + routes like
            * auth/logout
            * auth/signup
            * auth/signin
        + I want to add these components conditionally and not hardcode them
        + It is different for the messages pages because I only have one page
        + But for auth I want multiple pages

`signup.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

}
```

`signin.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {

}
```

## Create 2 HTML templates
`sigin.component.html`

```html
<h1>Signin</h1>
```

`sigup.component.html`

```html
<h1>Signup</h1>
```


