# Routing and Navigation
* [routerLink] expects a value in an array

`header.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="row">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-pills">
          <li><a [routerLink]="['/messages']">Messenger</a></li>
          <li><a [routerLink]="['/auth']">Authentication</a></li>
        </ul>
      </nav>
    </header>
  `
})
export class HeaderComponent {

}
```

## Test in browser
* Links should now work

## Make current page "active" and style it accordingly
* We are using `Bootstrap` and can use class of `active` to make it active
* But we don't want to hardcode it
* We want to conditionally set this class

`header.component.ts`

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="row">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-pills">
          <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>
          <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
        </ul>
      </nav>
    </header>
  `
})
export class HeaderComponent {

}
```

* The class `active` only gets applied if the nested link is the active one
