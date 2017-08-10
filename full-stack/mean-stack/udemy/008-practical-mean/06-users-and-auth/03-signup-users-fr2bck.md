# Signup Users
* Wiring up Frontend and backend

## Working in the `assets/app/auth` folder
* We need to add a Service for our authentication feature

`auth.service.ts`

```
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers })
        .map((response: Response) => {
          const result = response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
}
```

`signup.component.ts`

```
// more code
import { AuthService } from './auth.service';

// more code
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  // need this to get access to AuthService
  constructor(private authService: AuthService) {}
// more code
```

* I want to use AuthService in other parts of my app
* I want to inject a single instance for my whole app
    - I will also use the AuthService inside my messages
* Because of the above bullet points, the place to inject this AuthService is inside the `app.module.ts`
* This will make our `AuthService` available app wide

`app.module.ts`

```js
// more code
import { AuthService } from './auth/auth.service';
import { User } from './user.model';

@NgModule({
// more code
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
// more code
```

* Now we remove the log and add the ability to create a new user on submit

`signup.component.ts`

```js
// more code
onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName,
    );
    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
    this.myForm.reset();
}
// more code
```

* Restart Express
* View in browser
* Try to signup a new user

## Problem
* After successfully creating a user
* I see user in Database with encrypted password
* But I get `undefined` in console
