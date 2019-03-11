# Basic Types

* This is basic JavaScript

```
const isOpen = false;
```

## Convert JavaScript to typescript

```
const isOpen: boolean = false;
```

## Show our first TS error
```
const isOpen: boolean = 'false';
```

* VS Code will show you an error `"false" is not assignable type boolean`
* But we will not see an error in our browser
* In order to see errors in the browser, we need to add a parcel plugin

```
const isOpen: boolean = false;
const name: string = 'John';
```

* `name` is already defined in global window
* Don't use `name` when using typescript
* You will also get an error with `name` if you are using `let`

```
const isOpen: boolean = false;
const myName: string = 'John';
const myAge: number = 6;
const myFavoriteDecimal: number = 6.03;
// number in an array
const list: number[] = [0, 1, 2];
// tupal
const you: [string, number, boolean] = ['John', 33, true];
// enum (think of it as a list)
enum Job {
  WebDev,
  WebDesigner,
  PM
}
const job: Job = Job.WebDev;

const phone: any = 'Phone';
const tablet: any = 3;
```

* Number can also be a decimal
* `never` could be useful in a future concept
