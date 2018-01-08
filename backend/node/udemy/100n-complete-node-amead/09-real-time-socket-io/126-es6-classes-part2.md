# More ES6 classes
`/server/utils/users.js`

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

  removeUser(id) {
    // return user that was removed
  }

  getUser(id) {
    i;
  }

  getUserList(room) {
    // we will just return an array of strings
    // ['Manny', 'Mo', 'Jack']
  }
}

module.exports = { Users };
```

## Add seed data
* We need users that already exist so we can perform CRUD on them
* beforeEach()
    - Gets called before every single test case
    - Will help us initialize some data
    - We will define `users` outside of beforeEach() so that it is accessible inside of beforeEach() and also accessilble inside the test cases down below

`users.test.js`

```
const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Manny',
        room: 'Node Course',
      },
      {
        id: '2',
        name: 'Mo',
        room: 'React Course',
      },
      {
        id: '3',
        name: 'Jack',
        room: 'Node Course',
      },
    ];
  });

  it('should add new user', () => {
// // MORE CODE
```

## Get a list of all the users
`users.js`

```js
// MORE CODE
//   getUserList(room) {
    // we will just return an array of strings
    // ['Manny', 'Mo', 'Jack']
    const users = this.users.filter(user => user.room == room);
    const namesArray = users.map(user => user.name);

    return namesArray;
  }
}

module.exports = { Users };
```

### Write test case to get names for all users
`users.test.js`

```js
  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Manny', 'Jack']);
  });

  it('should return names for react course', () => {
    const userList = users.getUserList('React Course');

    expect(userList).toEqual(['Mo']);
  });
});
```

* We are using the seed data
* We make sure to spell the strings so they match seed data exactly
* Run `$ yarn test` and we should now have 9 passing tests

## Challenge
`users.test.js`

```js
it('should remove a user', () => {});

it('should not remove a user', () => {});

it('should find user', () => {});

it('should not find a user', () => {});
```

`users.js`

```js

```

* Test that you get back `undefined` when you look for the first item inside an empty array
* Open Node in terminal `$ node`
    - Will give you `>`
    - Type `> [][0]`
      + Will return `undefined`


`users.js`

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

  removeUser(id) {
    // return user that was removed
    // return this.users.filter(user => user.id === id)[0];
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    // we will just return an array of strings
    // ['Manny', 'Mo', 'Jack']
    const users = this.users.filter(user => user.room == room);
    const namesArray = users.map(user => user.name);

    return namesArray;
  }
}

module.exports = { Users };
```

`users.test.js`

```js
// MORE CODE
// describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Manny',
        room: 'Node Course',
      },
      {
        id: '2',
        name: 'Mo',
        room: 'React Course',
      },
      {
        id: '3',
        name: 'Jack',
        room: 'Node Course',
      },
    ];
  });

  it('should add new user', () => {
    users = new Users();
    const user = {
      id: '123',
      name: 'John',
      room: 'The Office Fans',
    };

    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const userId = '99';
    const user = users.removeUser(userId);

    expect(user).toBeFalsy;
    // expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);

    expect(user.id).toBe('2');
  });

  it('should not find a user', () => {
    const userId = '99';
    const user = users.getUser(userId);

    expect(user).toBeFalsy;
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Manny', 'Jack']);
  });

  it('should return names for react course', () => {
    const userList = users.getUserList('React Course');

    expect(userList).toEqual(['Mo']);
  });
});
```

* All 13 tests should pass
