# Wiring up the frontend and backend
* Make sure your `$ npm run build` is running so that all changes instantly get recompiled

## Injecting services
* While inside a service

`message.service.ts`

```js
import { Http } from '@angular/http';

import { Message } from './message.model';

export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];

  constructor(private http: Http) {}

  addMessage(message: Message) {
    this.messages.push(message);

  }

  getMessages() {
    return this.messages;
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
```

## Attach metadata
* We will get an error unless we attach metadata to this class
* Angular2 is only able to inject services inside classes which have some form of metadata attached to them (currently our plain vanilla class has not metadata attached)

`message-input.component.ts`

```js
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSubmit(form: NgForm) {
    const message = new Message(form.value.content, 'John');
    this.messageService.addMessage(message);
    form.resetForm();
  }
}
```

* Above we had the `@Component` Decorator added and that is why we get no issues or errors here because it has metadata attached

### Which Decorator should we attach to our MessageService class?
* We don't want to attach `@Component` because it is not a Component and we don't want to turn it into a Component

### @Injectable() Decorator
* You must import it when you use it from `@angular/core`
* It does nothing behind the scenes
* But it does add metadata so that the Injector is able to give us this Service here

`message.service.ts`

```js
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Message } from './message.model';

@Injectable()
export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];

  constructor(private http: Http) {}

  addMessage(message: Message) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
```

* Above code enables us to inject the http service into the MessageService class

## Unlock our Http module
* The Http Service is built-in but to unlock it we have to import a built-in module that Angular2 ships with (`HttpModule`)

`app.js`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; // add this line

// more code
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
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule, // don't forget the comma!
        HttpModule // add this line
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

* HttpModule unlocks the HttpService, which means if we don't add this module, we are not able to inject Http in `message.service.ts`

`message.service.ts`

```
// more code
@Injectable()
export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];

  constructor(private http: Http) {}

  addMessage(message: Message) {
    this.messages.push(message);
    this.http.post('http://localhost:3000/message');
  }
// more code
```

* Swap out your production/staging domain with `localhost:3000`
* We use post because we are pushing the data
* The `/message` will point to our NodeJS route we defined earlier
* The first argument we pass is the route we want to trigger
* The second argument is the `data` we want to send
    - Since it is a `post` request the data is NOT encoded in the URL with query parameters but instead the data is sent in the post body
    - I want to take the message I'm already passing `addMessage()` and convert it into JSON format (JSON.stringify)

`message.service.ts`

```js
// more code
addMessage(message: Message) {
    this.messages.push(message);
    const body = JSON.stringify(message);
    this.http.post('http://localhost:3000/message', body);
  }
// more code
```

* As it is coded above, nothing will happen
* All that it does is set up an **"observable"**
* It doesn't send the request yet **Super important to understand**
    - It holds the `request`
    - Enables us to **subscribe** to any data this **request** will give us back (But it doesn't send the request yet)
    - The reason no data has been sent yet is that noone has subscribed to this **observable** yet
    - If noone is listening, why would you send a request?
    - Do I subscribe in this service? NO
        + I want to subscribe in the Component which calls the `addMessage()` method (You will see this pattern often where the subscription happens in the Component which needs the data/issues the data)
    - So we will **return** the observable which is created by this post method

`return this.http.post('http://localhost:3000/message', body);`

### What is rxjs?
* The 3rd party observable library Angular2 uses and when we import it we are unlocking all their **operators** like the `.map()` method
    - There are many more operators
    - Observables is an advanced topic
    - But `.map()` is a function you will often use
        + It is very powerful
        + It allows you to transform the data once it comes back from the server
            * This will transform the data here so that later on I won't have to change the format because we did it here
        + We need to import `Response` from `@angular/http`
        + `.json()` method is a method offered by the Response object which allows me to extract data which was attached to the response
            * It throws away the status code and all the headers etc...
            * It only gives me the data which was attached to the response
            * It automatically converts it to a JavaScript object so that I can work with it

### Server stuff
`message.js`

```js
// more code
res.status(201).json({
  message: 'Saved message',
  obj: result
});
// more code
```

* We are attaching the object below to a success response
* The object has a message field and an `obj` field which contains the result of the Database operation
* It is this object that we now get in the front end simply by calling `.json` on the **response**

`response.json()`

```
{
  message: 'Saved message',
  obj: result
}
```

`message.service.ts`

```
// more code
import { Observable } from 'rxjs'; // add this line

import { Message } from './message.model';

@Injectable()
export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];

  constructor(private http: Http) {}

  addMessage(message: Message) {
    this.messages.push(message);
    const body = JSON.stringify(message);
    return this.http.post('http://localhost:3000/message', body)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
```

* We need to import `Observable` in order to catch and see our error
* Now we will send the data in the input Component where we call `addMessage()`

`message-input.component.ts`

```
// more code
onSubmit(form: NgForm) {
    const message = new Message(form.value.content, 'John');
    this.messageService.addMessage(message);
    form.resetForm();
  }
// more code
```

* This line won't work anymore because calling `addMessage()` isn't enough
* It will just give us back an **Observable**
    - I need to **subscribe** to the **Observable** to make anything happen

`this.messageService.addMessage(message);`

`message-input.component.ts`

```js
// more code
onSubmit(form: NgForm) {
  const message = new Message(form.value.content, 'John');
  this.messageService.addMessage(message)
    .subscribe();
  form.resetForm();
}
// more code
```

* The above will send the request (I'm subscribing now!)
* But I also want to see the response we get back
* `.subscribe()` takes 3 arguments (which are 3 callback functions which get executed in 3 different cases)
        - case 1 - The success case
        - case 2 - The error function
        - case 3 - The complete function (we won't pass but this gets executed whenever the observable completes), it differs from the first callback because the first callback gets called whenever we receive new data from the Observable

`message-input.component.ts`

```js
// more code
onSubmit(form: NgForm) {
  const message = new Message(form.value.content, 'John');
  this.messageService.addMessage(message)
    .subscribe(
       data => console.log(data),
       error => console.log(error)
    );
  form.resetForm();
}
// more code
```

## Test in browser
* You need to restart the server because we made changes there
    - `ctrl` + `c` to stop server
    - `$ npm start` to restart server
* `localhost:3000/messages` and enter a message in the input field and click `Save`
    - We get an error
    - The reason is we are sending the message as plain text
    - Click on `Network` tab of Chrome
    - Click on red `message`
    - Click on `Headers` tab

![text as plain](https://i.imgur.com/tpWmn4y.png)

* So when we send text/plain, it doesn't have properties, it doesn't have key/value pairs which means when we try to extract using `.json()` this will (and does) fail
* We need to change the content-type for this to work correctly
    - We will import `Headers` from `@angular/http`

### Adding the proper headers
`message.service.ts`

```js
import { Http, Response, Headers } from '@angular/http'; // update this line
// more code

export class MessageService {
  // more code

  addMessage(message: Message) {
    this.messages.push(message);
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/message', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
// more code
}
```

* You should see something like this after you enter a message

![response is object](https://i.imgur.com/DpRRjrM.png)

* You may need to restart both servers if you don't
* Run `mongod` and `mongo`
* And query your `messages` collection and you should see this:

![data in the database](https://i.imgur.com/2vveK4s.png)

## Congrats!
* You used an Angular2 form and submitted to a NodeJS post route that created a new Message document inside the MongoDB!

## Next - How do we retrieve it from the Database?


