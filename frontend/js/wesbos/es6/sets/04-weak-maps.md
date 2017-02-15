# Weak Maps
Don't have size so you can never tell how many elements are in it
Are not innumerable - can't loop over it
Items get garbage collection if they are not longer in your application

## Comparing a Weak Map vs Map

```js
let dog1 = { name: 'Peaches' };
let dog2 = { name: 'Barky' };

const strong = new Map();
const weak = new WeakMap();

strong.set(dog1, 'Peaches rocks');
weak.set(dog2, 'Barky is loud');

dog1 = null;
dog2 = null;
```

The weak map clears out objects removed from the code. You have to babysit the strong map items because even if you remove them from your code you will get a code leak and it will remain.
