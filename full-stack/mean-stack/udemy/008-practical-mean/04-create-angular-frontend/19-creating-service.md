# Creating Service
`message.service.ts`

```js
import { Message } from './message.model';

export class MessageService {
  messages: Message[] = [];
}
```

* This is my central messages array which I will use to store and manage all my messages in my front end Application
* To be able to use this array I need to create `addMessage()`

`message.service.ts`

```js
import { Message } from './message.model';

export class MessageService {
  // make it private so it is not accessible from outside
  private messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
  }

  getMessage() {
    return this.messages;
  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
```
