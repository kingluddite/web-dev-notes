# Create a Message Module
* Create `assets/app/messages/message.module.ts`

## We are showing how to split into multiple modules
### What should we modularize?
* Not `AuthService` and `ErrorService` because they are global Services

#### What about MessageService?
* It currently lives in `app.component.ts` but it only is used in Message part
* So we will remove it from the `app.component.ts` providers

`app.component.ts`

* Change this:

```js
import { Component } from '@angular/core';

import { MessageService } from './messages/message.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent {}
```

* To this:

```js
import { Component } from '@angular/core';

import { MessageService } from './messages/message.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

### What about Components?
* We can remove all Message related components from `app.module.ts`

![remove these components](https://i.imgur.com/VbEUBea.png)

* They will all be contained inside our Message module
* We do use MessageComponent in routing `app.routing.ts` but we don't need to declare it in our app.module
* CommonModule includes Directives like `ngFor`...

`message.module.ts`

```js
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessagesComponent } from './messages.component';
import { MessageListComponent } from './message-list.component';
import { MessageInputComponent } from './message-input.component';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageListComponent,
    MessageInputComponent,
    MessageComponent
  ],
  imports: [CommonModule, FormsModule]
})
export class MessageModule {}
```

### Update our app.module.ts
* Get rid of unused imports
* Get rid of FormsModule (we are just using it in Message.Module)
* But we now need to import our `Message.Module` otherwise all that functionality won't be available to our app

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { MessageModule } from './messages/message.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        MessageModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### Add our provider of MessageService to our MessageModule
`message.module.ts`

```js
// more code
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageListComponent,
    MessageInputComponent,
    MessageComponent
  ],
  imports: [CommonModule, FormsModule],
  providers: [MessageService] // we add this provider
})
export class MessageModule {}
```

* We do the above because we removed it from our app Component
* Save and recompile
* Now we get the Components and Service in MessageModule

### View in browser
* Works just like it did before
* But now our code is split up and distributed
* We just created a "feature module"
* Our app module is now more leaner because we split it up

## Next - Working on the Auth Module
