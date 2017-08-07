# Creating Messages Via a Service
* We just injected the message service and message input Component
* Now we need to get this list of messages

## Getting list of messages
`message-list.component`

* This is the logical file to start in
* Because this is where we have the list of messages

```js
import { Component } from '@angular/core';
import { MessageService } from './message.service';

// more code

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message
          [message]="message"
          (editClicked)="message.content = $event"
           *ngFor="let message of messages"></app-message>
    </div>
  `,
  providers: [MessageService]
})

export class MessageListComponent {
  messages: Message[] = [
    new Message('Some message', 'John'),
    new Message('Another message', 'John'),
    new Message('One more message', 'John')
  ];

  constructor(private messageService: MessageService) {}
}
```

* We need to import `MessageService`
* We need to remember to add the `providers` array to provide the MessageService
* We need to add a constructor

## ngOnInit Lifecycle hook
* One of the lifecycle hooks Angular2 reaches when creating such a Component
* This is executed once the Component has been initialized by Angular2
* Remember it is doing this in the background we give Angular2 a chance to initialize the Component

### How to implement this lifecycle hook method
* Import `OnInit`
* Use ... `implements OnInit { ...`
* Call the `ngOnInit()` method
    - If you don't you'll get an error
    - I tell Angular2 I have this method
    - Angular2 won't execute it by default

### Arrays and Objects are Reference types
* Remember in JavaScript arrays and objects are Reference types
    - Which means if I assign this array from the Service to the array in this Component, then this will be one in the same object (you are passing by reference)
    - They are not two different objects
    - We are not creating a copy
    - I am just copying the pointer which points to the same location in memory
    - So these messages in this `MessageListComponent` points to the same array I have in the `message.service.ts` file
        + This is great because now whenever I add a message from some other place in the Application, it is added to this array which happens to be the same as the `MessageListComponent` which means the list will automatically get updated

```js
// more code
export class MessageService {
    private messages: Message[] = [];
    // more code
}
// more code
```

`message-list.component.ts`

```js
import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

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
  `,
  providers: [MessageService]
})

export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
  }
}
```

## Test
* Save
* `$ npm start`
* `$ npm run build`
* View in browser
* All our messages are gone (we removed them)
* Type `first message` in input
* Click `Save` button
* You will see we added our array in the console but our message does not get added to the page? Why not?

## Next
* We'll add our new messages to our message list
