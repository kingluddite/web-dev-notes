# Getting Messages - wiring up frontend and backend
`message.service.ts`

```js
getMessages() {
  return this.messages;
}
```

* We no longer us this method this way
* It is no longer retrieving the hardcoded, inpersistant array of messages
* We have a route on a get route /messages that will fetch all the messages from our Database
* We won't need to send the `body` because we are not posting any data
* I don't need to set up headers, because I'm not sending any data so no need to set the `Content-Type`
    - I will want to transform the response so I will need the `.map()` method
    - Grab the messages in the response, turn them into `json()` and grab the obj field `response.json().obj`

`message.service.ts`

```js
getMessages() {
  return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.content, message.id, 'Dummy', null));
        }
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
}
```

* Update the message list Component

`message-list.component.ts`

```js
ngOnInit() {
  this.messages = this.messageService.getMessages();
}
```

* Update it to this:

`message-list.component.ts`

```js
// more code
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }
}
```

* Update the following code to keep the code in sync

`message.service.ts`

```js
// more code
getMessages() {
    return this.http.get('http://localhost:3000/message')
        .map((response: Response) => {
          const messages = response.json().obj;
          let transformedMessages: Message[] = [];
          for (let message of messages) {
                      transformedMessages.push(new Message(message.content, 'Dummy', message.id, null));
          }
          this.messages = transformedMessages;
          return transformedMessages;
        })
        .catch((error: Response) => Observable.throw(error.json()));
  }
// more code
```

* Restart the node server
* View in browser

## Next - Editing Messages
