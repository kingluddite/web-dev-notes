# Arrow Functions (Part 1)

`advanced/arrow-function.js`

```
const square = num => {
  return num * num;
};
console.log(square(5)); // 25

```

`node arrow-function.js`

## Shorthand syntax
* only works for arrow functions
* Can use it when there are simple functions that have 1 line that returns something

### Examples of simple functions that just return something
`notes-functions.js`

```
// MORE CODE

  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });

// MORE CODE
```

* And another example

```
// MORE CODE

  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

// MORE CODE
```

* Both of the above are great cases for an arrow function

## Let's convert our arrow function to use shorthand
* For simple functions that return one thing we can
    - remove curly braces
    - remove the return (implicit return)

### Before
```
// MORE CODE

const square = num => {
  return num * num;
};

// MORE CODE
```

### After
```
// MORE CODE

const square = num => num * num;

// MORE CODE
```

## A more complex example
* Create an array of 3 people with their name and age (ages 18, 21, 23 respectively)
* Use `filter()` to only output ages greater than or equal to 21

```
const twentyOneOrOlder = people.filter(function(person) {
  return person.age >= 21;
});

console.log(twentyOneOrOlder);
// [ { name: 'Moe', age: 21 }, { name: 'Jack', age: 22 } ]
```

* Convert to arrow function and use shorthand of above is:

```
const twentyOneOrOlder = people.filter(person => person.age >= 21);
```

## Challenge
1. Find the person with age 22
2. Print that person's name

### Challenge Solution
```
const twentyTwo = people.filter(person => person.age === 22);
console.log(twentyTwo);
```
