# Header and Restructuring Project
* Currently our app 100% represents only messages
* We need to add authentication part
* We also need to add routing
    - I need to switch between messages and authentication
    - one part create messages
    - other part sign up or sign in user

## Routing
* Load different pages depending on clicking different links

`messages.component.ts`

* We already have `message.component.ts` but `messages.component.ts` will represent the entire `message` feature

`messages.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  template: `
    <div class="row">
      <app-message-input></app-message-input>
    </div><!-- /.row -->
    <hr/>
    <div class="row">
      <app-message-list></app-message-list>
    </div><!-- /.row -->
  `
})
export class MessagesComponent {

}
```

`app.component.html`

```html
<div class="content">
  <app-header></app-header>
</div><!-- /.content -->
```

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}

```

`authentication.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  template: `<h1>Authentication</h1>`
})
export class AuthenticationComponent {

}
```

## View in browser
* You should just see our header

![header only](https://i.imgur.com/mICsOqm.png)



