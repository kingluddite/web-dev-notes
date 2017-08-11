# Using Error Service and passing data
`error.component.ts`

```js
import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

import { Error } from './error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
    `
    .backdrop {
      background-color: rgba(0,0,0,0.6);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
  `
  ]
})
export class ErrorComponent implements OnInit {
  error: Error;
  display = 'none';

  constructor(private errorService: ErrorService) {}

  onErrorHandled() {
    this.display = 'none';
  }

  ngOnInit() {
    this.errorService.errorOccurred.subscribe((error: Error) => {
      this.error = error;
      this.display = 'block';
    });
  }
}
```

* Now that I listen for the error
* I need to submit the error (aka Emit the error)

`message.service.ts`

```js
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Message } from './message.model';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();

  constructor(private http: Http, private errorService: ErrorService) {}

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // this will automatically set up my query string I want to append to my URL
    const token = localStorage.getItem('token')
      ? `?token=${localStorage.getItem('token')}`
      : '';
    return this.http
      .post(`http://localhost:3000/message${token}`, body, { headers: headers })
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(
          result.obj.content,
          result.obj.user.firstName,
          result.obj._id,
          result.obj.user._id
        );
        this.messages.push(message);
        return message;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getMessages() {
    return this.http
      .get('http://localhost:3000/message')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(
            new Message(
              message.content,
              message.user.firstName,
              message._id,
              message.user._id
            )
          );
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token')
      ? `?token=${localStorage.getItem('token')}`
      : '';
    return this.http
      .patch(
        `http://localhost:3000/message/${message.messageId}${token}`,
        body,
        { headers: headers }
      )
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    const token = localStorage.getItem('token')
      ? `?token=${localStorage.getItem('token')}`
      : '';
    return this.http
      .delete(`http://localhost:3000/message/${message.messageId}${token}`)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
}
```

* We also do the same for the AuthService

`auth.service.ts`

```js
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from './user.model';
import { ErrorService } from './../errors/error.service';

@Injectable()
export class AuthService {
  constructor(private http: Http, private errorService: ErrorService) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post('http://localhost:3000/user', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post('http://localhost:3000/user/signin', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
```

* View in browser
* Log out
* Create a message
* We get the grey backdrop but no modal

## Fix
* We need to remove the `fade` class
    - Otherwise it tries to fade it in which will work with Bootstrap's code but not with ours

`error.component.html`

`<div class="modal fade"`

to this;

`<div class="modal"`

* Save the changes
* View in browser
* Log out and try to create a message
* You should get the modal with error info
* You can close the modal by clicking on 'X'

![modal error showing](https://i.imgur.com/LYf0GLy.png)

* Try to create a new user with an email already in Database
* Try to login with bad username/password
