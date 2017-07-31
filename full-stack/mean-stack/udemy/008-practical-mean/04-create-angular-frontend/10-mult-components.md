# Multiple Components
## Naming convention tip
nameoffile.describewhatisinfile.ts

`message.component.ts`

`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
<!-- CUT CODE FROM THIS PART -->
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

`message.component.html`

```html
<article class="panel panel-default">
  <div class="panel-body">
    {{ message.content }}
  </div><!-- /.panel-body -->
  <div class="panel-footer">
    <div class="author">
      {{ message.author }}
    </div><!-- /.author -->
    <div class="config">
      <a href="#">Edit</a>
      <a href="#">Delete</a>
    </div><!-- /.config -->
  </div><!-- /.panel-footer -->
</article><!-- /.panel panel-default -->
```

* We remove the input as we won't be using it

## message.component.ts
* We create a component
* And we need to import it to use @Component

### What is a good way to name `selectors`?
* You want to make sure it is unique as you don't want to override an existing selector
    - Like `h1` would override all `<h1>` elements
    - Prefix it with something that makes it unique (kind of like a namespace)
    - I'll use `app-message`
    - And don't forget to also point to your template URL `./message.component.html`

`message.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {

}
```

## Hook up Component to root component
* I will add all of my Components to the root Component not to `index.hbs`
    - Angular 2 won't find them there because it only knows how to start the app Component

`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <app-message></app-message>
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

* But that still wouldn't work
* We need to make our app aware of our new component (We do that in the `app.module.ts` file)
    - This is an extra step but a good extra step because if Angular 2 doesn't scan all your files for selector because that would be a huge performance hit

`app.module.ts`

### declarations array
* This is where you add all new:
    - Components
    - directives
    - pipes
* Don't forget to also add the import
* **import** Always create imports WITHOUT a file extension because if you add a file extension, you will get an error

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component'; // add this line

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent // add this line
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}
```

![add first custom component](https://i.imgur.com/6SeHGxI.png)

### Our styling is gone
* Remember our style is scoped to the Component
* So we move it from `app.component.ts` to `message.component.ts`

`message.component.ts`

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
      }
  `]
})
export class MessageComponent {

}
```

`app.component.ts`

```js
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
  message = {
    content: 'A message',
    author: 'John'
  }
}
```

![styled custom component](https://i.imgur.com/Ycur86A.png)

