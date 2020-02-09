# Objects 101
`objects-101.js`

```
let myBook = {
  title: '1984',
  author: 'George Orwell',
  pageCount: 326,
};

console.log(myBook); // { title: '1984', author: 'George Orwell', pageCount: 326 }
```

* Now we know how to define and object
* And we know how to read properties off of an object

## We can also change an object's properties
* Change the title of 1984 to another George Orwell book called Animal Farm

```
// template string with 2 pieces of object info
console.log(
  `My book title is ${myBook.title} and it has ${myBook.pageCount} pages`
);

// change title of book
myBook.title = 'Animal Farm';
console.log(myBook.title); // Animal Farm
```

## These are the 3 essential things you'll be doing with objects
1. Creating Objects
2. Reading property values of Objects
3. Changing property values of Objects

### These 3 things help us create models of real world things

## Challenge
* Create a person object that has name, age and location properties
* Output a string similar to `John is 30 and lives in Ontario.`
* Then increase age by 1 and print string again with new property value

```
// Challenge
console.log('###### Challenge #######');
let person = {
  name: 'John',
  age: 33,
  location: 'LA',
};

console.log(
  `${person.name} is ${person.age} years old and lives in ${person.location}`
);
person.age = 34;
console.log(
  `${person.name} is ${person.age} years old and lives in ${person.location}`
);
```
