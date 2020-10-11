# Union Types
Our value can be a string or a number?

```
let newName: string | number = 'John';
newName = 'Jane';
newName = 10;

let newNameTwo = newName;
newNameTwo = 10;
```

* And the error goes away

## Multiple pipes (ORs)
```
// Union Types with |
let newName: string | number | boolean = 'John';
newName = 'Jane';
newName = false;
newName = 10;

// gets type from initial declaration
let newNameTwo = newName;
newNameTwo = 10;
```

## We get no errors from TS with this code
```
// Union Types with |
const makeMargin = (x): string => {
  return `margin: ${x}px;`;
};

makeMargin(10);
makeMargin('Scott');
makeMargin(false);
```

* Why? Let's error if we pass in a boolean

```
// Union Types with |
const makeMargin = (x: string | number): string => {
  return `margin: ${x}px;`;
};

makeMargin(10);
makeMargin('Scott');
makeMargin(false); // this line errors
```

## Null types
```
let dog; // declared but undefined
dog = 'Lucie';
dog = 10;
dog = false;
```

* How do we get it to be string or undefined?

```
let dog: string; // declared but undefined
dog = 'Lucie';
dog = 10;
dog = false;
```

* The string works
* TS has 2 special types `null` and `undefined` just like in JavaScript but in TS `null` and `undefined` can be assigned to anything
* TS treats `string` as `string` or `undefined` or `null`

```
let dog: string; // declared but undefined
dog = null;
dog = 'Lucie';
dog = 10;
dog = false;
```

* Let's allow string or null but not undefined
* This won't work

```
let dog: string | null; // declared but undefined
dog = null;
dog = 'Lucie';
dog = undefined;
dog = 10;
dog = false;
```

* And this won't work

```
let dog: string | undefined; // declared but undefined
dog = null;
dog = 'Lucie';
dog = undefined;
dog = 10;
dog = false;
```

## Solution - Run a "strict null check"

