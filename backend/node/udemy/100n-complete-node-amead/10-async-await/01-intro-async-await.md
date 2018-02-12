# Intro to async-await
* only available on node v7.6 or later

`$ node -v`

## Promises vs Async-await
* Some people thing async-await is 3rd option for Promises
* Not the case
    - It is just an enhancemet for Promises

## New Project - async-await
`$ take `106e-async-await`

`$ touch app-promises.js`

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

 const grades = [];

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

 getUser(2)
   .then(user => {
     console.log(user);
   })
   .catch(e => {
     console.log(e);
   });
```

`$ nodemon app-promises.js`

* terminal output
 
```js
// output
{ id: 2, name: 'Oprah', schoolId: 999 }
```

```
getUser(1)
  .then(user => {
    console.log(user);
  })
  .catch(e => {
    console.log(e);
  });
```

* Gives me:

`{ id: 1, name: 'Bob', schoolId: 101 }`

* Pass in another number like `11` and you will see `Unable to find user with ide of 11.`

## Grades
* Return grade of student based off of their student id

```js
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

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

getGrades(101)
  .then(grades => {
    console.log(grades);
  })
  .catch(e => {
    console.log(e);
  });
```

* Will output

```js
[ { id: 1, schoolId: 101, grade: 86 },
  { id: 3, schoolId: 101, grade: 80 } ]
```

* We get two records because a studentID of `101` has 2 records

## Average their grades
```js
const getStatus = userId => {
  let user;
  return getUser(userId)
    .then(tempUser => {
      user = tempUser;
      return getGrades(user.schoolId);
    })
    .then(grades => {
      let average = 0;

      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length;
      }

      return `${user.name} has a ${average}% in the class.`;
      console.log(average);
    });
};

getStatus(2)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e);
  });
```

* Output is:

`Oprah has a 100% in the class.`

## Next: Make our life and syntax easier with async-await
