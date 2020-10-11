# Implicit Types

```
let newName = 'John';
newName = 'Jane';
newName = 10;
```

* TypeScript knows we are using a String and will alert us that `10` is not a string

```
let newName = 'John';
newName = 'Jane';
newName = 10;

let newNameTwo = newName;
newNameTwo = 10;
```

* Above will error because the original type is given from `newName` and when we assign a new variable to `newName` is uses that original type
