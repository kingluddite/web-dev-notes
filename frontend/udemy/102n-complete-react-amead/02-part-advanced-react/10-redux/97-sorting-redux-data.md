# Sorting Redux Data
* We are going to add sorting to get physical expenses
  - Whether by date or by amount

## the array sort() method
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
* If you have a simple array (like an array of strings)

```
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]
```

* Then you can call `sort()` directly without any args and it will try its best to sort the data

### But if we have an array of more complex data (like objects)
* If this is the case there is no inherent sorting value
  - So in this case we'll need to define a `compareFunction`
    + This lets us write a bit of code to determine which comes first between 2 distinct items
      * We will look at 2 expenses

### How can you create a compareFunction?
* Very easy to create
* MDN sort() docs has an example:

```
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

## Let's add a sort call to our app
* sort() like filter() gets called on an array and it returns the array
  - So we can simply chain that onto our getVisibleExpenses array
  - We will **pass in our arrow function** as an arg to sort()
    + This will result in the filtered and sorted array be the return result from `getVisibleExpenses`
    + We will be passing in 2 expenses and we'll represent them with a and b

```
// MORE CODE

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {

  });

// MORE CODE
```

* Now we need to write conditional code to determine which one comes first
  - First we need to figure out what we are sorting by (amount or date)?

```
// MORE CODE

    .sort((a, b) => {
      if (sortBy === 'date') {
        // do this
      } else if (sortBy === 'amount') {
        // do this
      } else {
        // do this
      }
    });

// MORE CODE
```

* We need to determine if we return `-1` where `a` comes first or `1` where `b` comes first
  - We'll use the ternary operator to achieve this

```
// MORE CODE

    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      return 1;
    });

// MORE CODE
```

### Test it out
* We will dispatch 2 addExpense calls
  - The first we'll make it happen in the past and one more recently come second
  - So `coffee` should come first
  - Before we change our code we see that Rent comes first because it has a more recent createdAt date

![no sort](https://i.imgur.com/lN8m4R8.png)

* Now we change our createdAt dates

```
// MORE CODE

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: 'Coffee',
    amount: 300,
    createdAt: -1000,
  })
);

// MORE CODE
```

* Now `coffee` comes first

![coffee first](https://i.imgur.com/Q6ikWxq.png)

## Now sort by amount
```
// MORE CODE

    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
      return 1;
    });

// MORE CODE
```

* Change amounts in addExpense for experimentation

```
// MORE CODE

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 1500, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: 'Coffee',
    amount: 2000,
    createdAt: -1000,
  })
);

// MORE CODE
```

* Make sure to call the `sortByAmount()`

```
// MORE CODE

store.dispatch(sortByAmount());

// MORE CODE
```

* And now you see the expenses are sorted by amount

![greater expenses come first](https://i.imgur.com/PMkttVU.png)

## Our entire Redux store is in place!
* Currently it all sits in one file
* We will improve on this

## Recap
* We learned about Redux in isolation
  - It makes scaling our apps easier
* With Redux we'll easily be able to create separate pages and allow them to share data

## Next
* We'll integrate Redux into the React components we already have in place
* And we'll break our 1 Redux file into multiple files
  - Make Redux easier to work with and scale
