# Finish off the frontend
`signin.component.ts`

```js
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  myForm: FormGroup;

  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
         Validators.required,
         Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
       ]),
      password: new FormControl(),
    })
  }
}
```

`signin.component.html`

```html
<div class="col-md-8 col-md-offset-2">
  <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          formControlName="email"
        />
    </div><!-- /.form-group -->
    <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          formControlName="password"
        />
    </div><!-- /.form-group -->
    <button
      class="btn btn-primary"
      type="submit"
      [disabled]="!myForm.valid"
      >Submit</button>
  </form>
</div><!-- /.col-md-8 col-md-offset-2 -->
```

![signin form](https://i.imgur.com/lwPBqei.png)

* Works the same as the signup form (but has less form fields)

## Make our `Edit` and `Delete` buttons work
### We will make the delete button work
`message.component.html`

```
<a (click)="onDelete()">Delete</a>
```

* **note** We already have the `deleteMessage` method in `message.services`

```js
deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
  }
```

* Add the delete behavior

`message.component.ts`

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service'; // add this line

// more code

export class MessageComponent {
  @Input() message: Message;
  @Output() editClicked = new EventEmitter<string>();

  constructor(private messageService: MessageService) {} // add this line

  onEdit() {
    this.editClicked.emit('Some other new value');
  }

  onDelete() { // add this method
    this.messageService.deleteMessage(this.message);
  }
}
```

* View in browser
* Refresh
* Add a message
* And you should now be able to delete it

### We will remove the `reloading` page issue
    - This is easy, just remove the `href="#"`

`message.component.html`

* Change this:

```
// more code
<div class="config">
      <a href="#" (click)="onEdit()">Edit</a>
      <a href="#">Delete</a>
    </div><!-- /.config -->
// more code
```

* To this:

```
// more code
<div class="config">
      <a (click)="onEdit()">Edit</a>
      <a>Delete</a>
    </div><!-- /.config -->
// more code
```

## Congrats - Frontend is finished

## Next - Connect Node to the frontend
