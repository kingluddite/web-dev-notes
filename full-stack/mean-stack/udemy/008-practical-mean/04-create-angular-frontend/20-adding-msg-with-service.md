# Adding a message with a Service
`message.service.ts`

```js
import { Message } from './message.model';

export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
    console.log(this.messages);
  }

  getMessages() {
    return this.messages;
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}

```

* We are just logging the messages

## Angular2 ships with its own dependency injector
`message-input.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
  onSave(value: string) {
    console.log(value);
    message = new MessageService();
  }
}
```

* We will not do the above to instantiate a new MessageService
* Instead we will let Angular2 handle it and we will get the readily instantiated instance directly served to our Component

## How does this work?
* We add a constructor to the class
* We pass the constructor an argument we expect to get

### Who is creating our message input Component?
Angular2

* When Angular2 is creating it:
    - It will execute the constructor
    - And there it will see that we expect to get this messageService
    - So Angular2 will need a way to pass this instance of type MessageService to this message input Component where it creates it
    - In order for Angular2 to create this we need to tell it how to do that
        + Telling Angular2 how to do that is **really simple**
            * We just add a new property called **providers** to our `@Component`
                - This will be an array of "blue prints" that we want to get Angular2 to know for this Component

```
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  providers: [MessageService]
})
```

* By doing the above with providers Angular2 is able to create an instance of  of `MessageService` and pass it to the constructor where it then will be stored in the private message property
* With this setup here we are using Angular2's dependency injector which is doing all the rest in the background for us, creating this new message service instance and passing it to us... and then we can use it here in our Component (and only here, not in any other Component)
* You will find this "dependency injection" in other languages too

`message-input.component.ts`

```js
import { Component } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  providers: [MessageService]
})
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSave(value: string) {
    const message = new Message(value, 'John');
    this.messageService.addMessage(message);
  }
}
```

* Save
* View in browser
* Type `Something`
* Click Save
* View Console
* You should see this:

![array of messages using Angular2 built-in service](https://i.imgur.com/yMDvauK.png)

## Add another message
* Our array grows to 2 messages... rinse and repeat
* We are storing data which is nice
* We can also retrieve the data too and output it in our list of messages

### Next - We'll do exactly that!
