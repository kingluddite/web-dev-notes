# Adding Input and List Components
* We will improve on our structure and move our message list into it's own Component

* First, we remove it the message list from our main AppComponent

`app.component.ts`

```js
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

}
```

* Then we create our new file to hold our messages inside a Component

`message-list.component.ts`

```js
import { Component } from '@angular/core';

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

export class MessageListComponent {
  messages: Message[] = [
    new Message('Some message', 'John'),
    new Message('Another message', 'John'),
    new Message('One more message', 'John')
  ];
}
```

* We use an inline template and and ES6 template string because it is just a small chunk of HTML

### Update the Main `app.component.html` to include our new custom Component
`app.component.html`

```html
<div class="content">
  <div class="row">
    <app-message-list></app-message-list>
  </div><!-- /.row -->
</div><!-- /.content -->
```

* Finally, we need to add this new Component to our `app.module.ts` file

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

* View it in the browser it will look the exact same
* But our app now has a better structure
* We soon will be adding authentication
* So we want all message stuff/features components to be responsible for itself

## Let's do the same thing for the message input Component
`message-input.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {

}
```

* Add our template

`message-input.component.html`

```html
<div class="col-md-8 col-md-offset-2">
  <div class="form-group">
    <label for="content">Content</label>
    <input type="text" id="content" class="form-control" />
  </div><!-- /.form-group -->
  <button type="submit" class="btn btn-primary">Save</button>
</div><!-- /.col-md-8 col-md-offset-2 -->
```

* Update our app module with the new input Component

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

* Add the new input Component to the main Component

`app.component.html`

```html
<div class="content">
  <div class="row">
    <app-message-input></app-message-input>
  </div><!-- /.row -->
  <hr/>
  <div class="row">
    <app-message-list></app-message-list>
  </div><!-- /.row -->
</div><!-- /.content -->
```

* View in browser

![new input Component added](https://i.imgur.com/QiitiWD.png)

## Pass the value the user enters into the input to the console
* We could use two-way binding but we will try something different

### local reference
* We can assign a local reference to any HTML element in our template

`message-input.component.html`

```html
<div class="col-md-8 col-md-offset-2">
  <div class="form-group">
    <label for="content">Content</label>
    <input type="text" id="content" class="form-control" #input />
  </div><!-- /.form-group -->
  <button class="btn btn-primary" type="submit" (click)="onSave(input.value)">Save</button>
</div><!-- /.col-md-8 col-md-offset-2 -->
```

* `#input` will store a reference to that input which we then can use everywhere in our template
* `(click)="onSave(input.value)` - passes the input value whenever I click the button

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
  }
}
```

* Save
* View in browser
* Type `Something` in input and click `submit` button
* You should see this in the console

![output from console of new input click](https://i.imgur.com/AQG0PqD.png)

## Next
* Instead of passing it to the Chrome console, we will add the new message to our message array
