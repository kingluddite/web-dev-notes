# Unit Testing 101
* Pro of Jest ---> zero config!

## Get a good Jest VS Code plugin
* turn on VS code jest for code completions (Jest by Orta)

## Where do you put your jest tests?
* Doesn't matter
* As long as:
    - They are in a folder called `__tests__`
    - or they have an extension of `.spec.js`
    - or they have an extension of `.test.js`
* A lot of people will have a folder for every single component that they build

## You may see folders set up like this:
```
/Pagination
    index.js (component)
    style.js (styled components)
    pagination.test.js (tests)
```

* Or if you have lots of tests you may see

```
/Pagination
    __tests__/
        whatever.test.js
    index.js
    style.js
```

## We will keep this simple
* We will just have one folder `__tests__`
* And we'll mirror all our components inside `__tests__` and all the files will end with `test.js`
* We will do both put files inside `__tests__` and end file with `test.js` (It is not necessary but this will clearly label test files)

`frontend/__tests__/sample.test.js`

* Usually you will have a few imports
* But there are a few [**globals**](https://jestjs.io/docs/en/api) that we have access to
    - We will use (you don't have to import these):
        + describe()
        + test()
        + expect()

### describe('describe what is going on', () => {});
* describe function will describe what is going on
* Second argument is a function and this is where you list a group of tests inside of that
    - This is important
        + Because you use describe to group together related tests
        + Generally you have 1 test per describe
        + But you may also see multiple describes just to keep them separate

`frontend/__tests__/sample.test.js`

```
// MORE CODE

describe('sample test 101', () => {
  console.log('I am running some tests!~');
});

// MORE CODE
```

## Let's analyze what is happening under the hood
* Let's look inside `frontend/package.json`

```
// MORE CODE

  "scripts": {

    // MORE CODE
    
    "test": "NODE_ENV=test jest --watch",

    // MORE CODE

  },

// MORE CODE
```

* We set the NODE_ENV to `test`
* And we run the command **jest** with the flag `--watch`
    - VERY COOL! - will only watch files that have changed since your last git commit
        + This is great because things would slow down a lot if it were monitoring every single file in your app
        + **note** Make sure you have a git repo up and running to make this work properly

## Running test again (make sure you are in the `frontend` directory)
`$ npm run test`

* It will show you your logs
* It will let you know if any of your "test suites" have passed or failed

### What is a "test suite"?
* It is a describe
    - Inside of the `describe()` we will set up all our different tests

### test() or it()
* You can run either
* They are the exact same thing
* We will use `it()` as it reads better

### expect()
* Runs inside `it()`

`frontend/__test__/sample.test.js`

```
describe('sample test 101', () => {
  it('works as expected', () => {
    expect(1).toEqual(1);
  });
});
```

#### Add another expect()
* You can add as many expects as you want
* Let's set a variable to 100 and expect it to be 99
    - This will generate a failure

```
describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(99);
  });
});
```

* It will fail and tell you where it failed

![failed test](https://i.imgur.com/LBlWFv4.png)

* If you change it to:

```
describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });
});
```

* It will pass

### Switching to another it
* You can add a bunch of expects
* But when you are checking out something else about that component you add another `id()`

```
describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });
});
```

* Now you will get 2 checkmarks between 2 passing tests

## only() vs skip() tests
### only()
```
describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  it.only('makes a list of dog name', () => {
    const dogs = ['peaches', 'guinness'];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('peaches');
  });
});
```

* Will say in terminal `Tests: 2 skipped, 1 passed, 3 total`
* We skipped all the other tests

## skip()
* Usually the preferred choice
* Will skip one test and run all the others
* Use this if you are having problem tests that aren't working yet

```
describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  // it.only('makes a list of dog name', () => {
  //   const dogs = ['peaches', 'guinness'];
  //   expect(dogs).toEqual(dogs);
  //   expect(dogs).toContain('peaches');
  // });

  it.skip('do not worry about this yet', () => {
    expect(cats).toEqual(dogs);
  });
});
```

## shorcut for skip it is `xit()`

```
// MORE CODE

xit('makes a list of dog name', () => {
  const dogs = ['peaches', 'guinness'];
  expect(dogs).toEqual(dogs);
  expect(dogs).toContain('peaches');
});

// MORE CODE
```

## shortcut for only is `fit()`
```
// MORE CODE

fit('makes a list of dog name', () => {
  const dogs = ['peaches', 'guinness'];
  expect(dogs).toEqual(dogs);
  expect(dogs).toContain('peaches');
});

// MORE CODE
```

## Test a real practical function
`lib/formatMoney.js`

```
export default function(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}
```

`__tests__/formatMoney.test.js`

* First import the file you are testing

```
import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
  });
});
```

* That will pass
* Make it fail by setting the expect value to be `$0.02`
* **tip** Break tests first and see that what it is expecting and then you can paste the expected value into your test

### Add two more variations of the test
```
import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(10)).toEqual('$0.10');
  });
});
```

### A few more variations
```
import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(50)).toEqual('$0.50');
  });
});
```

* Now we want to make sure there are no cents added for whole dollars

```
import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(50)).toEqual('$0.50');
  });

  it('leaves off cents for whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(50000000)).toEqual('$500,000');
  });

  it('works with whole and fractional dollars', () => {
    expect(formatMoney(4013)).toEqual('$40.13');
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(110)).toEqual('$1.10');
    expect(formatMoney(898234923492302389434)).toEqual('$8,982,349,234,923,024,000.00');
  });
});
```

## Next - Unit Testing a React component
