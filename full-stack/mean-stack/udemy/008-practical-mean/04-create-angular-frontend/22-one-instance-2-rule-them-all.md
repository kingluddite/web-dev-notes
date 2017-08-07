# Once instance to rule them all
* We added messages but they did not get added to our message list
* Why not?

## How can we add messages?
* We can inject/provide such a Service per Component basis
* Or Per Application basis

## Angular2 dependency injector
* We are using it here
* It is hierarchical injector
    - Which means it can be set up in a way to give us one instance of this message service for all our Components
    - Or only for some Component
    - Or one instance per Component
    - Right now we are in the "one instance per Component mode"
        + And this is why we are NOT seeing our messages
        + The MessageService Component is a different Component then the one in the InputServiceComponent
        + Angular2 creates two instances of the service
        + We don't want this in this particular case, we want to use the same instance
            * We will remove the provider in the MessageInputComponent and we'll also remove the provider in the MessageListComponent

## Remove `providers: [MessageService]`
* From both `message-input.component.ts` and `message-list.component.ts`
* Add it to:

`app.component.ts`

```js
import { Component } from '@angular/core';

import { MessageService } from './messages/message.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {

}
```

* This will create one single instance of this `MessageService` for the app Component and **all its child Components**

`message-list.component.ts`

```js
import { Component, OnInit } from '@angular/core';

import { Message } from './message.model';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message
          [message]="message"
          (editClicked)="message.content = $event"
           *ngFor="let message of messages"></app-message>
    </div>
  `
})

export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
  }
}
```

`message-input.component.ts`

```js
import { Component } from '@angular/core';

import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSave(value: string) {
    const message = new Message(value, 'John');
    this.messageService.addMessage(message);
  }
}
```

* Now clear console and try again
* As you add messages they will be added to the page
