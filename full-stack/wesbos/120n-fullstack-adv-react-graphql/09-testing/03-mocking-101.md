# Mocking 101
* You may have functions in your app that reach out and connect with an API or a database
* You don't want those things inside your test

## Why not have APIs in your test code?
* It will make your tests slow because you have to rely on an internet connection
* Makes your tests very brittle and you are relying on that API To be working 100% of the time, if they are down your tests will break
* A mock will pretend that that data hit that API endpoint and came back with data
* You pretend what data comes back
* This makes your unit tests very self contained

### Let's make our first mock jest function
`mocking.test.js`

```
describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    console.log(fetchDogs);
  });
});
```

* Check terminal and you will see our function is an actual mock

![mock function terminal](https://i.imgur.com/bZlZ0mz.png)

* Let's mock that we expect our `fetchDogs` function to have been called

```
describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalled();
  });
});
```

* And it passes

### But this will fail
```
describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('peaches');
  });
});
```

* To pass we need to pass our function a parameter

```
describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('peaches');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('peaches');
  });
});
```

* And that will pass

### Test to see if function was called 2 times
```
describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('peaches');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('peaches');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });
});
```

* That will fail but if we add this it will pass

```
describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('peaches');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('peaches');
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });
});
```

## [Mock Functions](https://jestjs.io/docs/en/mock-function-api)
```
mockFn.getMockName()
mockFn.mock.calls
mockFn.mock.results
mockFn.mock.instances
mockFn.mockClear()
mockFn.mockReset()
mockFn.mockRestore()
mockFn.mockImplementation(fn)
mockFn.mockImplementationOnce(fn)
mockFn.mockName(value)
mockFn.mockReturnThis()
mockFn.mockReturnValue(value)
mockFn.mockReturnValueOnce(value)
mockFn.mockResolvedValue(value)
mockFn.mockResolvedValueOnce(value)
mockFn.mockRejectedValue(value)
mockFn.mockRejectedValueOnce(value)
```

* You can also mock Promises with what it will be return with or rejected with

## Let's test a Promise
```
function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = () =>
  new Promise((resolve, reject) => {
    // Simulating an API
    // in a real world this would go off to some external API endpoint and fetch some data
    setTimeout(() => resolve(this.foods), 2000);
  });

// MORE CODE
```

* We are making a function that lives on every single person called `fetchFavFoods()`
* And after 2 seconds we will return the fetchFavFoods

```
function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('peaches');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('peaches');
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person', () => {
    const person = new Person('John', ['fries', 'pizza']);
    expect(person.name).toBe('John');
  });
});
```

* Now let's try it with the actual fetching of foods
```
  it('can create a person', () => {
    const person = new Person('John', ['fries', 'pizza']);
    expect(person.name).toBe('John');
  });

  it('can fetch foods', async () => {
    const person = new Person('John', ['fries', 'pizza']);
    const favFoods = await person.fetchFavFoods();
    console.log(favFoods);
    expect(favFoods).toContain('pizza');
  });
});
// MORE CODE
```

* That will fail (need to alter this)

```
// MORE CODE

Person.prototype.fetchFavFoods = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
// MORE CODE
```

* To this:

```
Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
};
```

* Test will pass
* But it takes a long time
* To make our tests run faster
    - We can swap out `fetchFavFoods` with a mock functon and just simulate returning some data

```
Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
};
// MORE CODE
```

* Above will fail

```
  it('can fetch foods', async () => {
    const person = new Person('John', ['fries', 'pizza']);
    // mock the favFoods function
    person.fetchFavFoods = jest.fn().mockResolvedValue(['tofu', 'soy burger']);
    const favFoods = await person.fetchFavFoods();
    console.log(favFoods);
    expect(favFoods).toContain('tofu');
  });
});
// MORE CODE
```

* Above will pass

* We will do this with our apollo store
* We don't want to hook up to an external apollo store and have to query that database for all of that data
* We want to fake return some data and then check if those components are rendering out properly (and that is what mocking is)

## Next - We will be mocking our apollo store
