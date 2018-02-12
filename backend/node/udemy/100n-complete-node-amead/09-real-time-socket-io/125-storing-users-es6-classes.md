# Storing users with ES6 classes 
* We have access to socket.id

## Our data structure will look like this:
```js
[{
  id: '/#fasdfasdfasdf',
  name: 'John',
  room: 'Game of Thrones Fans'
}]
```

## We will need 4 methods
* addUser(id, name, room)
* removeUser(id)
* getUser(id)
* getUserList(room)

### How can we create these methods?
* You might want to do it this way:

```js
const users = [];

const addUser = (id, name, room) => {
    users.push({});
}

modules.export = {addUsers};
```

### Instead we are going to use ES6 classes
* When you use the `new` constructor it is a comman naming convention to name whatever comes after use `new` to be uppercase `new Object()`, `new Person()`...

```js
class Person {
  constructor(name, age) {
    console.log(name, age);
  }
}

const me = new Person('Andre', 25);
```

`$ node server/utils/users.js`

* Will output `Andre 25`

### this
* `this` refers to the instance

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const me = new Person('Andre', 25);
```

* Using `this` is how we customize the individual instance
* Above `me` and `this` are equivalent

`console.log('this.name', me.name);`

* Will output `'this.name' Andre`
* **note** no commas needed in ES6 classes

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getUserDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

const me = new Person('Andre', 25);
const description = me.getUserDescription();
console.log(description);
```

* Will output `Andre is 25 years old`

## Create our Users class
`server/utils/users.js`

```js
class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }
}
```

### Don't forget to export the class!
```js
class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }
}

module.exports = { Users }; // add this line
```

## Add test case for `users.test.js`
```js
const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'John',
      room: 'The Office Fans',
    };

    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
});
```

* Run `$ yarn test` and `should add new user` should pass
