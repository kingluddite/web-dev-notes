# Working with Template Styles
`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <article class="panel panel-default">
        <div class="panel-body">
            
        </div><!-- /.panel-body -->
        <div class="panel-footer">
          <div class="author">

          </div><!-- /.author -->
          <div class="config">
            <a href="#">Edit</a>
            <a href="#">Delete</a>
          </div><!-- /.config -->
        </div><!-- /.panel-footer -->
      </article><!-- /.panel panel-default -->
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

## Create our content
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
}j
```

## Add our String Interpolation to showcase our dynamic data
`app.component.html`

```html
<div class="content">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
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
    </div><!-- /.col-md-8 col-md-offset-2 -->
  </div><!-- /.row -->
</div><!-- /.content -->
```

![out output in browser so far](https://i.imgur.com/G9qLVKY.png)

### Change up the styling
* I want author on right and edit/delete button on the left
* We could easily do this using Bootstrap classes

### Target a component directly with custom CSS
* We want to write code that will only impact this one component and no others in our Application

`app.component.ts`

```js
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
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
export class AppComponent {
  message = {
    content: 'A message',
    author: 'John'
  }
}
```

* The great thing about this code is these classes are limited to the scope of this Component
* They will not work anywhere else

![styled better](https://i.imgur.com/mafbNcC.png)

