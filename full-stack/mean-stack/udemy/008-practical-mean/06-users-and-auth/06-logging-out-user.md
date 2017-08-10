# Logging Out Users
* Also hide 'Signin' tab if already signed in
* Hide `Logout` tab if not logged in

`auth.service.ts`

```js
// more code
signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }

  logout() {
    localStorage.clear();
  }
}
```

`logout.component.ts`

```js
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <button class="btn btn-danger" (click)="onLogout()">Logout</button>
    </div>
  `
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'signin']);
  }
}
```

## Test in browser
* Refresh browser
* Click logout and check Chrome `Application` tab
    - You should see that under `Local Storage` the token and userId are gone

## Next - Conditionally show/hide tabs in auth section
