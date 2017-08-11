# The Error Service
`error.service.ts`

```js
import { EventEmitter } from '@angular/core';

import { Error } from './error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any) {
    const errorData = new Error(error.title, error.error.message);
    this.errorOccurred.emit(errorData);
  }
}
```

* I want to subscribe to these errors from anywhere in my app so I need to add it to the `providers` array inside `app.module.ts`

`app.module.ts`

```js
// more code
import { ErrorService } from './errors/error.service';
// more code
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {}
```
