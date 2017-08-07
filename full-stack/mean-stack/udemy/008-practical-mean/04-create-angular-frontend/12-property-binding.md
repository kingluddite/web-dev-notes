# Using Property Binding
* How can we pass a property to an Component

`message.component.ts`

```js
import { Component } from '@angular/core';

import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
      }
  `]
})
export class MessageComponent {
  message: Message
}
```

* We import `Message` and then use it inside our `MessageComponent`
* So `Message` must follow the structure inside our `message.model.ts`

```js
export class Message {
  content: string;
  username: string;
  messageId?: string;
  userId?: string;

  constructor(content: string, username: string, messageId?: string, userId?: string) {
    this.content = content;
    this.username = username;
    this.messageId = messageId;
    this.userId = userId;
  }
}
```

* Update `app.component.ts`

```js
import { Component } from '@angular/core';

import { Message } from './messages/message.model';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
  message: Message = new Message('Some message', 'John');
}
```

`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message"></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

* Set up an alias

`message.component.ts`

```js
import { Component, Input } from '@angular/core'; // import Input here

import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
      }
  `]
})
export class MessageComponent {
  @Input('inputMessage') message: Message
}
```

* And then use that alias like this:

`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <app-message [inputMessage]="message"></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

* But let's remove the alias for this example

`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message"></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

`message.component.ts`

```js
import { Component, Input } from '@angular/core';

import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
      }
  `]
})
export class MessageComponent {
  @Input() message: Message;
}
```

* Don't forget to import `Input` at the top
* Don't forget the parenthesees in `@Input()`
* This allows me to pass an argument inside my `<app-message>` (`app.component.html`) like this `<app-message [message]="message">`
    - `[message]` comes from the name of the property set up here `mesage` in `@Input() message: Message`
    - and `"message"` is the value I want to pass and that will be the message property of my `AppComponent`

## Troubleshooting
* We are not using the Database so `mongod` doesn't need to be running
* I was getting `Input` not defined and that was because I forgot to import `Input` in `message.component.ts`

`import { Component, Input } from '@angular/core';`

* After changing your code you need to build with `$ npm run build`
    - That won't run the server
    - So you need to then stop with `ctrl` + `c` and then run the server with `$ npm start`
* You won't see the the username so:
        - Change this

`message.component.html`

```html
// more code
    <div class="author">
      {{ message.author }}
    </div><!-- /.author -->
// more code
```

* To this:

```html
// more code
    <div class="author">
      {{ message.username }}
    </div><!-- /.author -->
// more code
```

* The reason we don't see it, it now we are not using `message.author` but instead we are now using `message.username`

`message.model.ts`

```
export class Message {
  content: string;
  username: string;
  // more code
```

![new output](https://i.imgur.com/e5yI3j7.png)

## Takeaway
* Same output as before but the key difference is the message is now passed from outside
* This is a very important feature
* Angular 2 because of this, let's your application be dynamic and let your Application communicate between your Components
    - This is huge because you often need to communicate between Components
