# Editing Messages
* Preparing the frontend

## We are using our Database now
* `$ npm start`
* `$ npm run build`
* `$ mongod`
* View `localhost:3000` and it should redirect you to `localhost:3000/messages`
* You should see our message data in the list Component

## Working with edit
* I click edit and the static value changes
* We need to improve on this
* I want to:
    - Click edit
    - The message is loaded into the content input field
    - I should be able to change it and save it
    - And it should then appear (persistantly) in our Component list
    - I want a button to cancel the editing process

### Update our message-list Component
* Look at our frontend current process
    - `message-list.component.ts` - component rendering all our messages
    - The message component - individual message
        + We have the onEdit() method and that is what emits the `editClicked()` event
            * That sends it to the MessageListComponent and that is where we listen to the `(editclicked)` custom event and that is where we change the `content`
            * We won't be using this setup anymore
            * We will delete this line:

` (editClicked)="message.content = $event"`

* I want to edit the actual message in the array and then save it to the Database

And delete this line from `message.component.ts`

` @Output() editClicked = new EventEmitter<string>();`

* Also remove `Output` and `EventEmitter` from the imports:

`import { Component, Input, Output, EventEmitter } from '@angular/core';`

To this:

`import { Component, Input } from '@angular/core';`

`message.service.ts`

```js
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core'; // Add EventEmitter
// more code

@Injectable()
export class MessageService {
  // more code
  messageIsEdit = new EventEmitter<Message>(); // add this line

  // more code

  editMessage(message: Message) {
    this.messageIsEdit.emit(message);
  }

  // more code
}
```

### Update our message input field
* We want no value to appear if the field is empty
* But if `edit` is clicked, then fill content input with content value of that document

`message-input-component.html`

```html
<input
    type="text"
    id="content"
    class="form-control"
    [ngModel]="message?.content"
    name="content"
    required
/>
```

* The `?` says **optional** and fill content field with message if it exists

`message-input.component.ts`

```js
import { Component, OnInit } from '@angular/core'; // update this line

// more code

export class MessageInputComponent implements OnInit { // update this line
  message: Message; // update this line

  // more code
  
  // add the following method
  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => this.message = message
    );
  }
}
```

`message.component.ts`

```js
export class MessageComponent {
  @Input() message: Message;

  // more code
  // update this method
  onEdit() {
    this.messageService.editMessage(this.message);
  }

  // more code
}
```

### Test in browser
* Refresh and click `Edit` beside any message
* You should see the Content field populate with the Content of the message you clicked `Edit` on
* But if I edit the field and click `Save` it won't save to Database

### Improvements
* I want to add a clear button to reset the form
* When I click `Save` I don't want to save it as a new message, I want to update the existing record
    - We will need to add a new method in my Service to accomplish this

#### Clear the edit form
* We use `button` HTML so that it won't submit this form
* Add `Clear` button with event to call `onClear()` method

`message-input.component.html`

```html
// more code
<button type="button" class="btn btn-danger" (click)="onClear(f)">Clear</button>
<button class="btn btn-primary" type="submit">Save</button>
// more code
```

`message-input.component.ts`

```
// more code

  onClear(form: NgForm) {
    form.resetForm()
  }

  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => this.message = message
    );
  }
}
```

### Test in browser
* You will see new button
* Click Edit
* Click Clear
* You shoud see the form content field clear

![clear content](https://i.imgur.com/dDX1O3y.png)

## Update an existing message
`message-input.component.ts`

```js
// more code
  onSubmit(form: NgForm) {
    if (this.message) {
      // Edit
      this.message.content = form.value.content;
    } else {
      // Create
      const message = new Message(form.value.content, 'John');
      this.messageService.addMessage(message)
        .subscribe(
           data => console.log(data),
           error => console.log(error)
        );
    }
    form.resetForm();
  }
// more code
```

`message.service.ts`

```
// more code
  updateMessage(message: Message) {

  }

  deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
}
```

* View in browser
* Edit a message
* Click `Save`
* A new message won't be added, but instead the current message it updated
* But if I refresh the browser my change is reverted to the former message

## Houston we have a problem
* After we edit a message, it does not clear the form field
* To fix this we need to set `this.message` to **null**

`message-input.component.ts`

```
// more code
onSubmit(form: NgForm) {
  if (this.message) {
    // Edit
    this.message.content = form.value.content;
    this.message = null;
  } else {
// more code

onClear(form: NgForm) {
  this.message = null;
  form.resetForm()
}
```

* By doing this we set `message` to null in these two spots
* Try again and you'll see the field clears after editing and then saving

## Save our changes in the Database
