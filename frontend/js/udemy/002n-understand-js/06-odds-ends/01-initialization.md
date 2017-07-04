# Initialization
* array literal uses brackets []
* object literal uses curly braces {}

```js
const people = [
  {
    // the 'john' object
    firstName: 'John',
    lastName: 'Doe',
    addresses: [
      '123 Elm St',
      '222 Main St'
    ]
  },
  {
    // the 'jane' object
    firstName: 'Jane',
    lastName: 'Doe',
    addresses: [
      '333 Elm St',
      '444 Main St'
    ],
    greet: function() {
      return 'Yo';
    }
  }
];
```

* People new to JavaScript might get intimidated as the file grows large
* Don't be
* This is used a lot when there is no Database and you are building a protype and above might be your fake data
    - Then when you're ready you can swap it out with data you are getting from an API using JSON
* You can use it for testing
    - Usability test
* A good IDE or text editor will show you were your brackets should be and even format it for you
* If you forget a comma (common error) you will get a `Unexpected token {` error
* Another problem is when programmers accidentally do this

```js
const people = [
  {
    // the 'john' object
    firstName = 'John',
    lastName: 'Doe'
   }
];
```

* They use an equals `=` instead of a colon `:` because they are thinking they are setting variables and you'll get the unexpected token error again
* In object literal syntax you use colons and not equals

```js
const object = {
    firstName: 'Bob',
    lastName: 'Dole'
};
```

## Log out our object
```js
const people = [
  {
    // the 'john' object
    firstName: 'John',
    lastName: 'Doe',
    addresses: [
      '123 Elm St',
      '222 Main St'
    ]
  },
  {
    // the 'jane' object
    firstName: 'Jane',
    lastName: 'Doe',
    addresses: [
      '333 Elm St',
      '444 Main St'
    ],
    greet: function() {
      return 'Yo';
    }
  }
];

console.log(people);
```

* Will give us this:

![two objects](https://i.imgur.com/6da4AT5.png)

* And I can access the method like this:

`> people[1].greet()`

* Will give me

`< "Yo"`

* You will find **initialization** useful

