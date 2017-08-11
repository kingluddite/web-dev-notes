# Signin - Frontend to Backend
* Wire it up!
* Copy signup method and paste it below and rename to signin
* Use this path `http://localhost:3000/user/signin` because I set that up in the `user.js` routes file
    - **note** We don't see `user/signin` but it is there because in `app.js` when our middleware get's to `app.use('/user', userRoutes);` it will got to `user.js` and that is where `/user/signin` happens

`router.post('/signin', function(req, res, next) {`

`auth.service.ts`

```js
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
}
```

* update this in previous notes - .map((response: Response) => response.json())
* Now we need to work on our `onSubmit` for this signin form
* We setup provider in app.module so we can use authService here too (and everywhere in our app - so no need to add providers here)
* I created a token but I need to store it
    - Where should I store the token?
        + You have 2 options
            * localStorage and session storage is available in your browser
            * You could store it inside a **cookie**
            * There are arguments for both
            * The localStorage and session storage is available only via JavaScript
                - This means it is vulnerable to XSS attacks (Cross-site scripting)
                - "**Cross-site scripting (XSS)** is a type of computer security vulnerability typically found in web applications. XSS enables attackers to inject client-side scripts into web pages viewed by other users. A cross-site scripting vulnerability may be used by attackers to bypass access controls such as the same-origin policy."
            * I will use localStorage
                - This is an object vanilla JavaScript ships with
                - Will persist even if you close the browser window (If you used session storage, the session would be cleared when you close the browser)
                    + Note we set this up so that the token will invalidate after 2 hours (_7200 / 60 = 120 minutes = 2 hours_)
            * We will store the token and the user `_id`

`signin.component.ts`

```js
// more code

import { User } from './user.model';
import { AuthService } from './auth.service';

// more code
export class SigninComponent {
  myForm: FormGroup;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password
    );
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
        },
        error => console.error(error)
       );
    this.myForm.reset();
  }

  // more code
}
```

* After I store the token I want to leave this Component (navigate away from it)
* To do this I need to inject my router here

`signin.component.ts`

```js
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // add this line

// more code
export class SigninComponent {
  myForm: FormGroup;
  
  // update the following line
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // more code
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/'); // add this line
        },
        error => console.error(error)
       );
    this.myForm.reset();
  }
  // more code
}
```

* After storing token, I navigate to the root route of my app
* Restart server and build
* View in browser
* Sigin and you should be redirected to messages page

## Chrome tools
* View the Application tab in Chrome
* Click on Local Storage to expand
* Click on http://localhost:3000
* You should see a token and userId

![token and userId in localStorage](https://i.imgur.com/O0mGCeq.png)

## Next
* Make our app more secure
* Restrict who can create messages
* And which messages you may delete or edit
