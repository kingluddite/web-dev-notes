# Setup
* We will create a modal for errors
* A new error model to show what an error should look like in the front end

## Create new folder `errors`
* Create a new folder called `/assets/app/errors`

### Create new files
* `error.component.ts`
* `error.model.ts`
* `error.service.ts`

## What do our errors look like?
* We can look at the backend to see that our errors always have:
    - A title
    - The error object

`error.model.ts`

```js
export class Error {
  constructor(public title: string, public message: string) {}
}
```

`error.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {}
```

## Using Bootstrap modal code
* We aren't using Bootstrap JavaScript, just their HTML and CSS
* [Link to code](http://getbootstrap.com/javascript/#modals)

`modal code from bootstrap`

```html
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

* Also add a backdrop container so the background is gray

`error.component.html`

```html
<div class="backdrop"></div><!-- /.backdrop -->
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
  // more code
```

* Remove `data-dismiss` attributes
* Remove Save changes button too

`error.component.html`

```html
<div class="backdrop"></div><!-- /.backdrop -->
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

`error.component.ts`

```js
import { Component } from '@angular/core';

import { Error } from './error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
    `
    .backdrop {
      background-color: rgba(0,0,0,0.6);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
    }
  `
  ]
})
export class ErrorComponent {
  error: Error;
  display = 'none';
}
```

We add our inline scoped to component styles to give our full gray background for our modal

* I am showing/hiding with ngStyle so modal will always be there
* I am not attaching/detaching to/from DOM with ngIf
* `{{ error?.title }}` - The question mark means the error is optional (when page first loads the modal will be there and there will be no error so we need to make the error optional or else we'd get an error on on error :) )
* Code our close button
    - We will add the JavaScript for this event

`error.component.html`

```html
<div class="backdrop" [ngStyle]="{'display': display}"></div><!-- /.backdrop -->
<div class="modal fade" tabindex="-1" role="dialog" [ngStyle]="{'display': display}">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close" (click)="onErrorHandled()"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{ error?.title }}</h4>
      </div>
      <div class="modal-body">
        <p>{{ error?.message }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" (click)="onErrorHandled()">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
```

`error.component.ts`

```js
// more code
export class ErrorComponent {
  error: Error;
  display = 'none';

  onErrorHandled() {
    this.display = 'none';
  }
}
```

* Add our error to our main app Component

`app.component.html`

```html
<div class="content">
  <app-header></app-header>
  <hr/>
  <router-outlet></router-outlet>
</div><!-- /.content -->
<app-error></app-error>
```

* Also add Error to app module

`app.module.ts`

```js
// more code
import { ErrorComponent } from './errors/error.component';

@NgModule({
    declarations: [
       // more code
        ErrorComponent
    ],
    imports: [
       // more code
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### View in browser
* Inspect code and at the bottom you will see `app-error` but you don't see the modal
* Change `display: none` to `display: block` (in Chrome Styles tab) and you will at least see grey background

## Next - Setup ErrorService to Emit and Handle errors
