# Async Await
```js
const getStatusAlt = userId => {
  return 'Joe';
};

console.log(getStatusAlt());
```

* Returns `Joe`

## keywords - `async` and `await`
* Before you can use `await` you have to mark the function as `async`

```js
const getStatusAlt = async userId => {
  return 'Joe';
};

console.log(getStatusAlt());
```

* Above using **async** will change how the code works
* Now we get a Promise back that resolves the string Joe

## Reg functions vs Async functions
* Regular functions return strings and strings come back
* Async functions always return Promises and resolves a value
* The above function is identical to:

```js
() => {
    return new Promise((resolve, reject) => {
        resolve('Joe')
        })
}
```

* So we can now use this:

```js
const getStatusAlt = async userId => {
  return 'Joe';
};

getStatusAlt().then(name => {
  console.log(name);
});
```

* Will output `Joe`
* Return a value is equivalent to **resolving**... so how do we **reject**
    - use `throw new Error()`

```js
const getStatusAlt = async userId => {
  throw new Error('This is an error');
  return 'Joe';
};

getStatusAlt().then(name => {
  console.log(name);
});
```

```js
const getStatusAlt = async userId => {
  throw new Error('This is an error');
  return 'Joe';
};

getStatusAlt()
  .then(name => {
    console.log(name);
  })
  .catch(e => {
    console.log(e);
  });
```

* That error will always occur because we place it on line 2
* Throwing an error is equivalent to rejecting

## Now we need to use async with `await`
* We use `await` just before a Promise
    - if that Promise **resolves** the result of this express will get store in user
    - if that Promise **rejects** no `user` variable will be created, the function will stop executing and the error will appear down below inside of `catch`

```js
const users = [
  {
    id: 1,
    name: 'Bob',
    schoolId: 101,
  },
  {
    id: 2,
    name: 'Oprah',
    schoolId: 999,
  },
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86,
  },
  {
    id: 2,
    schoolId: 999,
    grade: 100,
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80,
  },
];
const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with ide of ${id}.`);
    }
  });
};

const getStatusAlt = async userId => {
  const user = await getUser(userId);

  console.log(user);
};

getStatusAlt(2)
  .then(name => {
    console.log(name);
  })
  .catch(e => {
    console.log(e);
  });
```

* Output in terminal is:

```
{ id: 2, name: 'Oprah', schoolId: 999 }
undefined
```

```js
const getStatusAlt = async userId => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  console.log(user, grades);
};

getStatusAlt(2)
  .then(name => {
    console.log(name);
  })
  .catch(e => {
    console.log(e);
  });
```

** Get the grade

```js
const getStatusAlt = async userId => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let average = 0;

  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(1)
  .then(name => {
    console.log(name);
  })
  .catch(e => {
    console.log(e);
  });
```

* Will output `Bob has a 83% in the class`
    - We were able to compute this with not a single callback
    - No chaining
    - No nesting
    - We just used code that looks like asynchronous code
    - way more readable, maintainable
    - Enables us to write more clear, concise Promise base code
    - no top level await
    - you have to use await inside an async function
