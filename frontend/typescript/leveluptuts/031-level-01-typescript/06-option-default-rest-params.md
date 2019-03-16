# Optional, Default, & Rest Params
## Optional Parameters

```
// functions in TypeScript
// "?" for optional parmams
const sayWord = (word?: string): string => {
  console.log(word || 'Hello');
  return word || 'Hello';
};

sayWord();
```

## Default Parameters
* We don't need to define a type because TypeScript knows it is a string

```
// functions in TypeScript
// Default params
const sayWord = (word = 'Hello'): string => {
  console.log(word)
  return word;
}
sayWord(); // 'Hello'
```

## JavaScript rest spread operator ...
```
const sayWord = (word = 'Hello', ...otherStuff): string => {
  console.log(otherStuff);
  return word;
}
sayWord('Mo', 'Jack'); // ['Jack']
```

* But we can make sure we get an array of strings using TypeScript

```
// Rest params work as expected
const sayWord = (word = 'Hello', ...otherStuff: string[]): string => {
  console.log(otherStuff);
  return word;
}
sayWord('Mo', 'Jack');
```

* Named parameters work with "Interfaces"



