# Functions
* Receive some input
* Do stuff with that input
* Give output

## Functions help keep our code DRY
Don't Repeat Yourself

```js
function calculateAge(yearOfBirth, currentYear) {
  const age = currentYear - yearOfBirth;
  // return age;
  console.log(age);
}

calculateAge(1971, 2017); // 46
```

* A different way where we use `return` and store function inside a variable and log that variable

```js
function calculateAge(yearOfBirth, currentYear) {
  const age = currentYear - yearOfBirth;
  return age;
}

const ageMike = calculateAge(1971, 2017);
const ageMary = calculateAge(1981, 2017);
const ageBob = calculateAge(1991, 2017);
console.log(ageMike); // 46
console.log(ageMary); // 36
console.log(ageBob); // 26
```

* Functions can call other functions
* Function don't have to return something

## Multiple Functions
```js
function calculateAge(yearOfBirth, currentYear) {
  const age = currentYear - yearOfBirth;
  return age;
}

function yearsUntilRetirement(name, yearOfBirth, currentYear) {
    const age = calculateAge(yearOfBirth, currentYear);
    const retirement = 65 - age;
    console.log(`${name} retires in ${retirement} years`);
}

yearsUntilRetirement('Mike', 1990, 2017);
yearsUntilRetirement('Mary', 1980, 2017);
yearsUntilRetirement('Bob', 1970, 2017);
```

* We pass arguments into the function
    - myFunction("arg1", "arg2");
* Parameters are the variable holders of the function
    - function myFunction(param1, param2)
