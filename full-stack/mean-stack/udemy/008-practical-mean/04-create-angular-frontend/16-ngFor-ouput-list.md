# Use `ngFor` to Output a list
* Let's show a Structural Directive
    - Changes the structure of the DOM

## We want two messages
* We could do this:

`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message" (editClicked)="message.content = $event"></app-message>
      <app-message [message]="message" (editClicked)="message.content = $event"></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

![two messages](https://i.imgur.com/rWJqV3O.png)

* That is a terrible way to do two messages because it is not dynamic at all

## Better Way - Make our AppComponent hold an array of messages
`app.component.ts`

```js
import { Component } from '@angular/core';

import { Message } from './messages/message.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
  messages: Message[] = [
    new Message('Some message', 'John'),
    new Message('Another message', 'John')
  ];
}
```

* Make our component use `ngFor` to loop through our `messages` array

`message.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <app-message
          [message]="message"
          (editClicked)="message.content = $event"
           *ngFor="let message of messages"></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

* Output

![ngFor loop through array](https://i.imgur.com/Vnd3vGW.png)

* Now we have two different messages
* But they were created dynamically
* If we added a third message it would just be added to our list of messages
* We just used a built-in **structural Directive** because we use them to change the structure of the DOM

## What does the `*`
* The `*` in `*ngFor` is telling Angular2 that this is a structural Directive

## All Built in structural Directives in Angular2
* `*ngFor`
* `*ngIf`
* `*ngSwitch`
