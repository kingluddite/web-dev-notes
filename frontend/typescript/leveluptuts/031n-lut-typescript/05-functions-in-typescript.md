# Functions in TypeScript
* Make sure functions have:
    - right arguments
    - right return value
    - right variables inside them

```js
// functions in TypeScript
const sayHello = () => {
  console.log('hello');
};

sayHello();
```

## Error if expect an argument and no argument provided
```
const sayWord = (word) => {
  console.log(word);
};

sayWord();
```

* You will see `sayWord()` has an error underline because `word` is an argument and it was not provided

## Fix the error
```
const sayWord = (word) => {
  console.log(word);
};

sayWord('book');
```

## Make sure argument is a particular value
```
const sayWord = (word: string) => {
  console.log(word);
};

sayWord(99);
```

* Above will error because `99` is not a string

## Make sure function returns a string
```
const sayWord = (word: string): string => {
  console.log(word);
  return word;
};

sayWord('Book');
```

* Now we check for the argument to be a string and the function to return a string

```
const sayWord = (word: string): number => {
  console.log(word);
  return word;
};

sayWord('Book');
```

* Now you will get `string is not assignable to number` and this lets us know that our return should be a number
