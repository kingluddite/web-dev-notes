# Check Login state
* We will just check of token exists, if it doesn't, I'm not logged in

`auth.service.ts`

```js
// more code

logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}
```

### Conditionally show auth tabs
`authentication.component.ts`

```js
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  template: `
    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
          <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signup']">Signup</a></li>
          <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
          <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li></ul>
      </nav>
    </header>
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AuthenticationComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
```

## Next - Make sure only logged in users can create messages
