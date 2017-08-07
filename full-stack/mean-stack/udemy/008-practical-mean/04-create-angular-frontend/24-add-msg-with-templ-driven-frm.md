# Adding Messages with a template driven form
* After we add a message we want to clear it
* It also allows us to submit an empty field

## Forms in Angular
* Angular makes the create an management of forms very easy

### Two Approaches with Forms in Angular
1. The template driven approach with forms
2. The data-driven appreach (aka Reactive approach)

## Template Driven Approach with forms
* We remove the action
    - We won't be submitting this directly to the server
    - Angular2 will handle this for us

`message-input.component.html`

```html
<div class="col-md-8 col-md-offset-2">
  <form ngNativeValidate>
    <div class="form-group">
      <label for="content">Content</label>
      <input type="text" id="content" class="form-control" #input />
    </div><!-- /.form-group -->
    <button class="btn btn-primary" type="submit" (click)="onSave(input.value)">Save</button>
  </form>
</div><!-- /.col-md-8 col-md-offset-2 -->
```

* Angular2 will automatically detect and construct the form
    - Angular2 manages the form for us
    - It tracks the validity of the form
    - The current value
    - And much more...
    - All of that is stored in a `form` JavaScript object Angular2 creates for us automatically
        + It creates that object for us and stores it simply because it detects this `form` element
        + If we ever want to, we can overwrite this behavior
    - Angular2 does detect the form for us but IT DOES NOT DETECT the inputs for us
        + It could but you might not want to because you may have forms where you don't want to register all the inputs
        + Or maybe you have a custom Component which holds your inputs
        + So you need to tell Angular2 which parts of the form are inputs you want to register
            * This is simple to do!
* We will remove our local reference as we won't use it anymore

` #input />`

* Instead we need to tell Angular2 that this input is "controlled" off that form
* We will use an attribute `ngModel`
    - Tells Angular2 says this input on which `ngModel` is placed should be registered as a control of the form which was automatically derived by Angular2
    - For that to work is is **important** that you have the `FormsModule` added to the `imports` of `app.module.ts`

![FormsModule](https://i.imgur.com/uGRJtok.png)

* We already had added it but it is important to note that we need it now

`message-input.component.html`

```html
<div class="col-md-8 col-md-offset-2">
  <form ngNativeValidate>
    <div class="form-group">
      <label for="content">Content</label>
      <input
          type="text"
          id="content"
          class="form-control"
          ngModel
          name="content" />
    </div><!-- /.form-group -->
    <button class="btn btn-primary" type="submit" (click)="onSave(input.value)">Save</button>
  </form>
</div><!-- /.col-md-8 col-md-offset-2 -->
```

* `name` is a normal HTML attribute (nothing to do with Angular2)
* Angular2 will automatically detect it to store this value of this input on a control it gives this name which we assign here

```
ngModel
name="content" />
```

* With that we are `storing` our content
* But it would be nice to "do something" when we click the `submit` button
* We have a `click` but this is NOT how you handle the form submissions (so delete that)
* Angular2 gives us a new Directive which exposes an event here

## (ngSubmit)
* Should be enclosed in parenthesees since it is an event

`message-input.component.html`

```html
<div class="col-md-8 col-md-offset-2">
  <form ngNativeValidate (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="content">Content</label>
      <input
          type="text"
          id="content"
          class="form-control"
          ngModel
          name="content" />
    </div><!-- /.form-group -->
    <button class="btn btn-primary" type="submit">Save</button>
  </form>
</div><!-- /.col-md-8 col-md-offset-2 -->
```

* Rename `onSave` to `onSubmit`

`message-input.component.ts`

```js
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSave(value: string) {
    const message = new Message(value, 'John');
    this.messageService.addMessage(message);
  }
}
```

To this:

```js
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSubmit(value: string) {
    const message = new Message(value, 'John');
    this.messageService.addMessage(message);
  }
}
```

* We could use two-way binding to get access to the binding and store it in the property automatically but I don't want to update a property on every keystroke
    - I only want to pass this when I hit the submit button
    - `#f` will be a local reference and will give us access to this form element
        + But how do you get access to the form Angular2 created in the background?
            * And you get the background form access using `#f="ngForm"`
                    - This tells Angular2 "don't give me access to this HTML form element"
                    - Instead give me access to the JavaScript object you (Angular2) created for me, and then I can pass this reference to the `onSubmit(f)` method

```html
<form ngNativeValidate (ngSubmit)="onSubmit(f)" #f="ngForm">
    <div class="form-group">
      <label for="content">Content</label>
      <input
          type="text"
          id="content"
          class="form-control"
          ngModel
          name="content" />
    </div><!-- /.form-group -->
    <button class="btn btn-primary" type="submit">Save</button>
  </form>
```

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
    console.log(form);
    // const message = new Message(value, 'John');
    // this.messageService.addMessage(message);
  }
}
```

* We import NgForm
* We pass `onSubmit(form: NgForm)`
* We log out what form is
    - This should be the form Angular2 created for me in the background

## Test in browser
* Enter `test` in input
* Click `Save`
* View console and you should see this:

![NgForm](https://i.imgur.com/UywWzi1.png)

* We get an object of `NgForm` submitted
* This is the form Angular2 created in the background for us
* Check out all the properties Angular2 created for us on this form

![lots of form properties to play around with](https://i.imgur.com/j8p7R4a.png)

* If you expand `controls:` you will see `content` which is the name we gave for our input

![content](https://i.imgur.com/UkNz5jJ.png)

### Important form - value
* This holds an object representing the value of the form
    - It will show the content (name we set up) and it's value

![content and value](https://i.imgur.com/kFj9Gs9.png)

`message-input.component.ts`

```js
// more code
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSubmit(form: NgForm) {
    const message = new Message(value, 'John');
    this.messageService.addMessage(message);
  }
}
```

* And update the code to look like this:

```js
// more code
export class MessageInputComponent {
  constructor(private messageService: MessageService) {}

  onSubmit(form: NgForm) {
    const message = new Message(form.value.content, 'John');
    this.messageService.addMessage(message);
    form.resetForm();
  }
}
```

* Now we are using the template driven approach to now submit our form
* We then clear the form of all stuff using `form.resetForm()`
* Test again and after submitting, the form is cleared and the message is added to our list

## Prevent the submission of empty fields
* Just use `HTML5` **required** attribute and that means you have to fill in content before you can submit
* You will see that it has a red border
* Examine the code and you will see Angular2 added custom classes

`class="... ng-pristine ng-invalid ng-touched"`

* The above classes represent the **state** of this input
    - `ng-pristine` - we haven't entered anything
    - `ng-invalid` - it is empty and required
    - `ng-touched` - because I clicked into it
    - Refresh the page and inspect the classes again
    - `ng-untouched ng-pristine ng-invalid`

## Where did the red border come from?
* That is my custom style

`public/stylesheets/style.css`

```css
// more code
input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

* Any input that has both `ng-invalid` and `ng-touched` will have a red border
