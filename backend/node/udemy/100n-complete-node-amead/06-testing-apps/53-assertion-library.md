# Using an Assertion Library
* Will help streamline our test code
* Help us make assertions about the value whether it is:
    - about their type
    - the value itself
    - whether an array contains an element
* We wrote an if statement and threw an erro
* our assertion library will write this code for us

## Expect
* [documenation](https://github.com/mjackson/expect)
* The assertion library we'll be using
* It is now jest and run by facebook

### Install inspect
`$ yarn add expect@1.20.2 -D`

### Load expect into our code
* Use the documentation to make assertions 
* You check for equality - common assertion

```js
it('should expect some values', () => {
  // expect(12).toNotBe(12);
  expect({name: 'Joe'}).toBe({name: 'Joe'});
});
```

* This test will fail
* Why are two identical objects not equal?
* toBe uses `===` to compare and this won't pass two object being equal test because it is trying to see if they are the exact same object (and they're not) because we created two separate objects with the same properties
* To check two objects we use `toEqual()` instead

```js
it('should expect some values', () => {
  // expect(12).toNotBe(12);
  expect({name: 'Joe'}).toEqual({name: 'Joe'});
});
```

* Test and they will be equal and pass the test

## toNotEqual()
```js
it('should expect some values', () => {
  expect({name: 'Joey'}).toNotEqual({name: 'Joe'});
});
```

* This will pass because the two objects are not equal

## Check if an array has a specific element inside of it
```js
it('should expect some values', () => {
  expect([2,3,4]).toInclude(5);
});
```

* This will fail, 5 is not in that array

## toExclude()
* Check if something does not exist
```js
it('should expect some values', () => {
  expect([2,3,4]).toExclude(5);
});
```

* That will pass because 5 is not in array

## Check property values of objects
* Test age is 25 of object

```js
it('should expect some values', () => {
  expect({
    name: 'Pip',
    age: 45,
    location: 'Los Angeles'
  }).toInclude({
    age: 46
  });
});
```

* That will fail but if you change the toInclude() age property value to `45` it will pass

## toExlude()
* Check if object property does not have a matching value

```js
it('should expect some values', () => {
  expect({
    name: 'Pip',
    age: 45,
    location: 'Los Angeles'
  }).toExclude({
    age: 46
  });
});
```

* That will pass because age with 46 value is excluded

## Challenge
* Here is our new function

`utils/utils.js`

```js

module.exports.add = (a, b) => a + b;

module.exports.square = (a) => a * a;

module.exports.setName = (user, fullname) => {
  const names = fullname.split(' ');
  user.firstname = name[0];
  user.lastname = name[1];
  return user;
};
```

* Comment out the `should expect some values` assertion
* Should verify first and last names are set
* assert it includes firstName and lastName with proper values

```js
it('should set first name and last name', () => {
  const user = {location: 'LA', age: 30};
  const res = utils.setName(user, 'John Doe');

  expect(user).toEqual(res);
});
```

* This will pass because when we test we pass the full name into the function and it updates the object and since objects pass by reference both user and res will be equal

```js
it('should set firstName and lastName', () => {
  const user = {location: 'LA', age: 30};
  const res = utils.setName(user, 'John Doe');

  expect(res).toInclude({
    firstName: 'John',
    lastName: 'Doe'
  });  
});
```

* That will pass the test letting us know the object has the correct firstName and lastName set




