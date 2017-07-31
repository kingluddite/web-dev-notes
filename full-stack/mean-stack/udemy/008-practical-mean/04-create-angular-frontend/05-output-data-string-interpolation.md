# Outputting Data with String Interpolation
`app.component.ts`

```js
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
  // we add this line
  content = 'Some new content as we learn about String Interpolation';
}
```


`app.component.html`

```html
<h1>New Content Here!</h1>
{{ content }}
```

* This is how easy it is to make our app dynamic
* Refresh browser

![string interpolation](https://i.imgur.com/vganMzU.png)

* This is very useful
* We can easily add content and dynamically update everything without complicated code
