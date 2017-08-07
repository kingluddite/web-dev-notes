# Using Event Binding

## Starting server
* Remember it is a two step proces

1. Start the server `$ npm start`
2. Start the build process `$ npm run build`

* Let's make the edit button work
* When we click it, we'll change it to a static new content (later we'll make it an input)
* Use all event without the `on` so `onClick` becomes `click`

## Testing event
* We'll show an `alert()` when the edit is click to test it out

`message.component.ts`

```js
// more code
export class MessageComponent {
  @Input() message: Message;

  onEdit() {
    alert('it worked');
  }
}
```

* Update the html component

`message.component.html`

```html
// more code
 <div class="config">
      <a href="#" (click)="onEdit()">Edit</a>
      <a href="#">Delete</a>
    </div><!-- /.config -->
// more code
```

* Rebuilt and start server
* Click `edit` link and you should see an alert window pop up

## Next Step - Pass this event onto the app Component
* We can't listen to events in the child components in our app Component
    - That is good because we certainly don't want to get all the events that occur there
    - But we can explicitly create an event which we'll pass there
    - `@Output()` is the key here
        + When using this make sure you import it from `@angular/core`
        + `Event Emitter` is an object that Angular 2 offers you and this lets us create or listen to events
            * We need to also import this from `@angular/core`
            * Is a **Generic** type

`message.component.ts`

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';

// more code
export class MessageComponent {
  // more code
  @Output() editClicked = new EventEmitter<string>();

  onEdit() {
    this.editClicked.emit();
  }
}
// more code
```

## What is a Generic?
* Generic is a feature TypeScript offers us (they also exist in other languages) and they allow you to create classes (like EventEmitter), which can use multiple types
* The EventEmitter doesn't care which type of data you pass or use in the event but it would be nice to tell it at the point in time that you create it
* You do this like this: `new EventEmitter<string>()`
    - If you don't know which data you will use, then you can use `<any>`
    - `.emit()` - means... emit a new event
        + As an argument I can pass any data I want to pass (It is optional)
        + We pass a new value that will be a new value for `message.content`
        + This will emit the new event
        + It also makes it "listenable" outside (by adding `@Output`)

## Now I need to listen to my own event

`app.component.html`

```html
// more code
<app-message [message]="message" (editClicked)="'"></app-message>
// more code
```

* That name comes from `message.component.ts`

![editClicked name](https://i.imgur.com/g02EoHm.png)

* Angular2 gives you a way to access the value passed through a custom event `$event`
    - This built in object always holds the value you pass
    - That is just something you have to keep in mind

`app.component.html`

```html
// more code
<div class="col-md-8 col-md-offset-2">
      <app-message [message]="message" (editClicked)="message.content = $event"></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
// more code
```

* Save, build and start server

## Test
Click edit in browser and you will see we change our content to a new value using event binding

* This is how you set up your own event
* And how you listen to it
* And how you pass data to it 
