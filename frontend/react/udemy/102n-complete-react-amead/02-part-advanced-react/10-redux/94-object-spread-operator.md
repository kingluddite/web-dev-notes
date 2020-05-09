# Object spread operator
* We looked at the array spread operator

```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE': {
      return state.filter(({ id }) => id !== action.id);
    }
    default:
      return state;
  }
};

// MORE CODE
```

* Now we'll look at the Object spread operator
  - This is the more useful one
  - With the array spread operator there are other ways to not use is (using concat() for example)
    + But with the object spread operator there really is no other way to do what it does
    + In principle the object spread operator does the exact same thing as the array spread operator it is just the details that are different
      * The array spread operator allows us to create a new array grabbing items from an existing one
      * The exact same thing is true for the object spread operator
        - It allows us to define a new object while grabbing items from an existing object

## Let's experiment the Object spread operator
* Let's create a simple object

```
const user = {
  name: 'John',
  age: 30
}
```

* We have an object with a couple of properties
* Now we want to get a new object without changing user

## How can we get that done?
* Easy. Just do this:

```
const user = {
  name: 'John',
  age: 30,
};

console.log(...user);
```

## Houston we have a problem!
* Make sure you put the spread operator inside an object

```
const user = {
  name: 'John',
  age: 30,
};

console.log({ ...user }); // {name: "John", age: 30}
```

## Houston we have a problem!
* This may work but you will still need to add a plugin because not everyone is using the latest version of every browser which support features like these
* Uses may see an error like this:

![object spread operator error](https://i.imgur.com/sq9uxNV.png)

## Add a plugin for object spread operator
* The array spread operator has made it into main stream
* The object spread operator still needs a plugin installed to be supported by all browsers

### Install @babel/plugin-proposal-object-rest-spread
* [docs](https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread)

#### Install module
1. Stop server
2. Install module
3. Add to `.babelrc` or `package.json`

`$ npm install --save-dev @babel/plugin-proposal-object-rest-spread`

* Feel free to install with yarn but use yarn syntax

`package.json`

```
// MORE CODE

  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread" // add this line
    ]
  },

// MORE CODE
```

4. Star dev-server again `$ npm run dev-server`

## View in client console
`{name: "John", age: 30}`

## Cool but not that special
* We just cloned an object and did nothing to it

### What if we want to edit this object
1. Clone it
2. Edit it by adding a new property 'vegetarian' with a boolean value

* Easy. Just add it like this:

```
const user = {
  name: 'John',
  age: 30,
};

console.log({ ...user, vegetarian: true }); 
// output will be ------> {name: "John", age: 30, vegetarian: true}
```

* Now we have a cloned object with old properties and the new property we just set up

## Can we also override existing properties?
* Yes we can
* Just add it at end like this:

```
const user = {
  name: 'John',
  age: 30,
};

console.log({ ...user, vegetarian: true, age: 199 });
// output -----> {name: "John", age: 199, vegetarian: true}
```

### What happens if we define the age before we use the object spread operator?
```
const user = {
  name: 'John',
  age: 30,
};

console.log({ age: 199, ...user, vegetarian: true });
// You will see age is still 30? why?
```

* Easy explanation
  - It sets the age to 199
  - Then it clones user object into new object and sets the age to 30

## The object spread operator is very useful
* Just as we don't want to change the state array we also don't want to change any of the objects that make up our Redux store
  - Instead we just want to clone them and add our various overriding values

## Start using the object spread operator now!
```
// MORE CODE

const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* We will use it to edit an expense
* We want the user to have the ability to override these expense properties:
  - description
  - note
  - amount
  - createdAt
  - **note** They won't be able to change the `id` only the original 4 values they were able to set up above

## The setup will look a bit different
* So let's experiment with it first by using the function before we actually create it
* We'll call store.dispatch()
* We'll edit expenseTwo (remember we removed expenseOne)
  - We'll create a method called `editExpense()`
  - What arguments will we pass `editExpense()`?
    1. We'll need the `id` of the thing we are trying to edit
    2. We'll also need to pass in the thing we are trying to edit

```
store.dispatch(editExpense(ID, EXPENSE_WE_ARE_TRYING_TO_EDIT))
```

* Now let's plugin in real values
* We'll use the same `id` value we grabbed from before
* We'll pass in the amount we want to update

```
// MORE CODE

// DELETE an expense
store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// UPDATE an expense
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 999 }));
// we add the above line

// MORE CODE
```

* We have the call to editExpense in place
* We also have the 2 arguments set up
* Now we need to create the Action Generator up above (in our code base)

## Add our EDIT_EXPENSE Action Generator
```
// MORE CODE

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE ---> Add this!!!!
const editExpense = (id, updates) => {

}

// MORE CODE
```

* The arguments don't need defaults because if you don't have an `id` and your not updating anything there's no need to call it
* We'll implicitly return an object
* We are required to add a `type` which we'll set to EDIT_EXPENSE
* And we'll add the `id` and `updates`
* It will look like this:

```
// MORE CODE

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// MORE CODE
```

* Now we have all the information correctly set up
* And now we can handle editExpense using the object spread operator

## Add new case
* If we see `EDIT_EXPENSE` type what do we want to do?
  - We want to go through every expense in the array finding the match and when we find the match we want to go ahead and correctly change the match
  - To do this we'll use `state` and `map()` (inside map we'll use some conditional logic to change just the one who's id matches the action id and for the other ones we'll just return what they currently are and not change them at all)
  - Inside `map()` we'll pass in the updater function for each one
  - We have an array of expenses so we can call each individual one `expense`

#
```
// MORE CODE

    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        }
      })
    default:
      return state;
  }
};

// MORE CODE
```

* We want to check if the current expense we are iterating over if it's `id` is equal to the action.id (the action we are trying to change)
  - If they are equal then we'll add the condition code
  - If its not equal and its not the expense we are trying to edit then we'll add our else case and just return the expense (this has the same affect as if we didn't do anything at all)
  - But if they are a match (passes our condition) then we want to return a brand new object
    + And **this is where we want to use the object spread operator**
    + We want to grab all of the properties from the existing one `...expense`
    + Then we just want to override the ones they passed in
      * Then we just spread out `...action.updates` 
* I want to return a new object changing its expense

```
return {}
```

* I want to grab all its existing properties

```
return {
    ...expense,
}
```

* I want to override any of the ones that were passed down

```
return {
  ...expense,
  ...action.updates
}
```

* And then that will be the new value for that expense

### Here is the chunk of code you want
```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE': {
      return state.filter(({ id }) => id !== action.id);
    }
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        }
        return state;
      });
    default:
      return state;
  }
};

// MORE CODE
```

* **note** I commented out the user object we were experimenting with

```
// const user = {
//   name: 'John',
//   age: 30,
// };
//
// console.log({ age: 199, ...user, vegetarian: true });
```

* Now if we save we will see this in action

![editExpense working](https://i.imgur.com/3yIIQx7.png)

1. You add an expense
2. You add another expense
3. You delete the first expense
4. You update the amount of the expenseTwo from 2000 to 999

## filtersReducer Challenge
* Set up the Reducer code and the Action Generator necessary to allow the user to change the text value
* Here is the call
  - I could pass in no value to clear it out `store.dispatch(setTextFilter(''))` setting it equal to an empty string or pass in a string value (let's say I search for a string value `rent`) and this will return expenses where you have `rent` in the description or notes fields
    + `store.dispatch(setTextFilter('rent'));`

#
```
// MORE CODE

// UPDATE an expense
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 999 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

// MORE CODE
```

* If completed successfully you should see rent as the text filter and then it will be removed in the subsequent call
* Make these work
* Use the object spread operator in the reducer
* You will set up the case
* You will spread out the state object
* You will override the one text property

![filter text working](https://i.imgur.com/RSlmcoN.png)

* You should see the empty text string
* Then you should see text set to `rent`
* Then you should see filter set back to an emtpy string

```
// MORE CODE

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

// MORE CODE

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Rent', amount: 2000, note: 'test note' })
);

// MORE CODE

// DELETE an expense
store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// UPDATE an expense
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 999 }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());


// MORE CODE
```










* Now that we have the basic Reducers in place we need to start dispatching some actions and handling those actions in the appropriate reducer

## Set up an Action Generator
```
import { createStore, combineReducers } from 'redux';

// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

// MORE CODE
```

* Let's add and dispatch an action

## We'll start with the ADD_EXPENSE
* We'll implicitly return the action object
* We'll get the user to provide 4 of the values but we'll generate the `id` using the npm library `uuid`

### npm uuid
* [docs](https://www.npmjs.com/package/uuid)
* This will allow us to generate universally unique identifiers

#### Install uuid
* Shut down dev server

`$ npm i uuid` or `$ yarn add uuid`

##### Use uuid
* Import it and then use it

```
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const person = {
  id: uuid(),
};
console.log(person.id); // 2565e9ef-6685-4335-8e2a-3fd0a086aabf
```

* Let's apply that to our expense app

```
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = () => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid();
  }
});

// MORE CODE
```

* But how will we handle the other 4 values?
* They will come from the user so they will be passed in
* We'll use the same setup we've used in `redux-101.js` to destructure the values and set up defaults

```
// MORE CODE

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
  },
});

// MORE CODE
```

* Now we have all the correct values coming in and now we just have to is attach them to the expense object

```
// MORE CODE

import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* Now we just completely set up our `addExpense` Action Generator

## We can now add an expense!
* We'll use `store.subscribe()` to track changes
* Every time the `subscribe()` callback function runs I'll just print the log to the screen that will just `getState()`

```
// MORE CODE

store.subscribe(() => {
  console.log(store.getState());
});
const demoState = {

// MORE CODE
```

### Our first expense
* We won't define all fields
* We'll add a description of `Rent` and an amount of $1 (100 cents is the value we'll use)

```
// MORE CODE

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addExpense({ description: 'Rent', amount: 100 }));

// MORE CODE
```

* So we've successfully dispatched an action

## But what happens?
* How do we handle this when we are using combineReducers to setup multiple Reducers for the Redux store?
  - Well it works just like it did before
    + The dispatch action (the action with the type of ADD_EXPENSE), it will get dispatched to BOTH Reducers (expensesReducer and filtersReducer)

## Set up case for the reducers
* We'll set up case for the reducers that need to do something when ADD_EXPENSE gets dispatched

### Does the expensesReducer need to do anything?
* Yes it needs to add that to the array

###Does the filtersReducer need to do anything?
* No. Adding an expense doesn't affect this data at all
  - So we won't be adding a case for `addedExpense`
  - It will just run the switch statement and the end result will be the default case running in which case the state won't get changed at all

### Add our first case for expenseReducer
```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // run some code that adds a new expense onto the array
    default:
      return state;
  }
};

// MORE CODE
```

* At this point we know that `state` is an array
  - So can we do this:

```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      state.push(action.expense);
    default:
      return state;
  }
};
// MORE CODE
```

## The problem with push()
* It mutates the original array
  - **remember** We want to avoid that - we don't want to change `state` or `action` instead we just want to read off of them
  - Luckily for us there is an array method that lets us do that and that is called `concat()`

### concat()
* [concat() docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* Example:

```
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

#### Use concat() in our expense app
```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      state.concat(action.expense);
      break;
    default:
      return state;
  }
};

// MORE CODE
```

### No need to use `break` since we will return like this:
```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return state.concat(action.expense);
    default:
      return state;
  }
};

// MORE CODE
```

* This takes the `state` from `state.concat(action.expense)` and it combines the `state` array with the `action.expense` array
  - And it returns the new array it doesn't change the `state` at all

## Try it out
![contat working nicely](https://i.imgur.com/OFF33sh.png)

* Now everything is working great
  - We have our store on our expenses array we have a single item that's an Object
    + Everything on that Object is looking as we expected
      * We have the amount we set
      * We have the default values for createdAt, amount and the id we generated with uuid module. description is set to default Rent and note is an empty string
      * This works but there is a better way and that is to use the ES6 spread operator

# Object Spread Operator
* More useful than array spread operator
  - You can use `concat()` to do what array spread operator does
  - Nothing else does what the object spread operator does

## Let's play around with ES6 spread operator in client console
* push() mutates the array - we don't want to mutate the state

```
const names = ['Manny', 'Moe'];
names.push('Jack'); // 3 is returned (just added one item to array)
names
// ["Manny", "Moe", "Jack"]
```

### concat() doesn't mutate
```
const names = ['Manny', 'Moe'];
names.concat('Jack');
// ['Manny', 'Moe', 'Jack']
names // will just output ['Manny', 'Moe']
```

* Above concat() proofs shows that `concat()` does not mutate original array

### But we can also use the "spread operator"
* Be forewarned that the "spread operator" has a very strange syntax!

1. We will create an empty new array `[]`
2. We will "spread out" all of the current items on the names array `[...names]`

* If you run this in the console:

```
[...names]
// ["Manny", "Moe", "Jack"]
```

* So the spread operator shows us it just copies the items from the array and outputs them

### Add the magic to the spread operator
* Just add a comma and what you want to add to the array

```
[...names, 'jill']
// ["Manny", "Moe", "Jack", "jill"]
names
// ["Manny", "Moe", "Jack"]
```

* So we can see that the spread operator does not mutate

## More complex arrays with the spread operator
```
['bob', ...names, 'mike']
["bob", "Manny", "Moe", "Jack", "mike"]
```

* The spread operator is great as it allows us to create new arrays from old ones

## Let's use the spread operator in our expense app
* We use the spread operator to copy the current state and add in the action.expense into a new array without mutating the original state array
```
// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];
    default:
      return state;
  }
};

// MORE CODE
```

* Same output as before but now we are using the spread operator

### Now add multiple expenses by adding multiple dispatch() calls
![multiple dispatches called](https://i.imgur.com/saEsFqJ.png)

* It is called 3 times and the third time shows all 3 expenses added to the expenses array
* **note** The added expense occur in the order the expenses were dispatched because the spread operator is copying then adding the new expense

## Challenge
* Do the same thing we did for addExpense for removeExpense
  - But we are missing one vital piece of information to complete this challenge
    + We want to remove expenses by their `id`
    + If we are removing expenses by their id we need a way of actually getting expenses by their `id`
    + We do get the `id` information back from `store.getState()` but we also get the action object back from `store.dispatch()`
      * So if I dispatch an action object it comes back as the return value for call to dispatch and we can just create a variable that stores it

```
// MORE CODE

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Rent', amount: 2000, note: 'test note' })
);
const expenseThree = store.dispatch(
  addExpense({ description: 'Rent', amount: 5000 })
);

// MORE CODE
```

* Now we'll log them out to see what they look like
```
// MORE CODE

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Rent', amount: 2000, note: 'test note' })
);
const expenseThree = store.dispatch(
  addExpense({ description: 'Rent', amount: 5000 })
);
console.log(expenseOne);
console.log(expenseTwo);
console.log(expenseThree);

// MORE CODE
```

* Will show you this in the console:

![logging out the returned action object](https://i.imgur.com/Sljmia1.png)

* We see we have access to all the action properties
* The one we need is `id`

```
console.log(expenseOne.expense.id); // 65e4d70b-bb38-4d17-a9c0-3194fbdee8a4
```

* That will output the `id`
* We'll need this to remove the expense
* Here is the function call
  - You will need to create the Action Generator
  - And fill out the reducer part

```
// MORE CODE

// REMOVE_EXPENSE
// notes on this
// We start by creating the removeExpense
// This will just be an Action Generator so we'll make it an arrow function that implicitly returns an object
// We need the type to be REMOVE_EXPENSE
// We also need some data, we'll get an object passed in as the first argument, we'll destructure it and if it doesn't exists we'll destructure an empty object to avoid undefined errors
// We will be pulling off "id"
// No default required
// This id needs to make it onto the action object otherwise we can't use it in the Reducer
// With both id and type setup we are going to have an action successfully dispatched, all we have to do is handle removeExpense down in the expensesReducer
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// MORE CODE

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // return state.concat(action.expense);
      return [...state, action.expense];
    case 'REMOVE_EXPENSE': 
      // when we see REMOVE_EXPENSE what do we want to do?
      //  we want to return a new array
      //  we will use filter() to get a new array back (remember - state.filter() doesn't change state, filter doesn't change the array it's called on, it returns a new array with a subset of the values)
      // We pass in a function to state.filter()
        // if the function returns true the item will be kept
        // if the function return false the item will be removed
        // note: state.filter((expense) => {})
        // but since we just need id we destructure it off of expense object
      // if the id is not equal to the action.id the statement will be true (the item will be kept)
      // if the statement is false then there was a match and that item needs to be filtered out
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

// MORE CODE

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Rent', amount: 2000, note: 'test note' })
);
const expenseThree = store.dispatch(
  addExpense({ description: 'Rent', amount: 5000 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// MORE CODE
```

* You will see the array grow to 3 and then drop to 2

![remove array](https://i.imgur.com/jVs9lHa.png)

* We now have 2 of the cases handled for the expensesReducer

## Recap
* We explored the spread operator when working with arrays

## Next
* We'll use the spread operator with our objects as well
* It will make it easier to edit expenses
* It will also make it easier to handle these 5 actions related to our filters:

```
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE
```
