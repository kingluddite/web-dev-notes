# Interfaces
## What is an Interface?
* Allows for type checking of data that allows for a certain shape
* Similar to GraphQL
* Allows you to essentionally set up "named parameters"

## This works
```
// Interfaces
const sayName = (name: string, age: number): string => {
  console.log(name);
  return name;
}

sayName('Scott', 32);
```

* But this doesn't work because the order of the args is reversed

```
// Interfaces
const sayName = (name: string, age: number): string => {
  console.log(name);
  return name;
}

sayName('John', 32);
sayName(32, 'John');
```

* So the order of the parameters matter
* If we could use named parameters then we don't have to care about the order of the args

```
// Interfaces
interface Person {
  name: string;
  age: number;
}
const sayName = ({ name, age }: Person): string => {
  console.log(name);
  return name;
}

sayName({
  name: 'John',
  age: 30
}); // this works correctly!
```

## We switch the order and it works!
```
// Interfaces
interface Person {
  name: string;
  age: number;
}
const sayName = ({ name, age }: Person): string => {
  console.log(name);
  return name;
}

sayName({
  name: 'John',
  age: 30
});

sayName({
  age: 30
  name: 'John',
});
```

* Interfaces is a replacement for **named parameters**

## Optional Interface args
```
// Interfaces
interface Person {
  name: string;
  age?: number; // Optional param
}
const sayName = ({ name, age }: Person): string => {
  console.log(name);
  return name;
}

sayName({
  name: 'John',
  age: 30
});

sayName({
  name: 'John'
});
```

## We can also return the Person itself
```
// Interfaces
interface Person {
  name: string;
  age?: number;
}
const sayName = ({ name, age }: Person): Person => {
  console.log(name);
  return { name, age };
}

sayName({
  name: 'John',
  age: 30
});

sayName({
  name: 'John'
});
```

