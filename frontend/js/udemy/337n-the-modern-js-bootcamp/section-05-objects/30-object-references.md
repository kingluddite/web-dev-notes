# Object References
* What happens when we pass objects around our program?

```
let otherBook = {
  title: 'A Peoples History',
  author: 'Howard Zinn',
  pageCount: 723,
};

let getSummary = function(book) {
  return {
    summary: `The book ${book.title} by ${book.author}`,
    pageCountSummary: `The book ${book.title} has ${book.pageCount} pages long.`,
  };
};

```

* In the above code what if we modify the `book` object we passed to the getSummary function?
    - If we modify `book` in that function does it also modify the `otherBook` original object (if that was the object we passed the function)?

## Let's see if we pass an object to a function what happens to that object when we alter it inside the function we pass it to
```
let myAccount = {
  name: 'John Doe',
  expenses: 0,
  income: 0,
};

let addExpense = function(account, amount) {
  account.expenses = account.expenses + amount;
  console.log(account);
};

addExpense(myAccount, 4.2);
console.log(myAccount);

// output
// { name: 'John Doe', expenses: 4.2, income: 0 }
// { name: 'John Doe', expenses: 4.2, income: 0 }
```

* You will see the output is the same
* **note** When we pass an object into a function argument what we get as that argument value isn't just a clone of the object with the exact same properties and values
    - It is actually a reference to THE EXACT SAME OBJECT (in memory)
        + Somewhere on your machine we have the object stored in memory
            * `myAccount` is a pointer to this object
            * When we pass `myAccount` into **addExpense(account)**, `account` because a pointer to that same object in memory
                - This explains why changing `account` changes the value inside the function and the value inside the original object too

## But check this out - you can break the binding
* If we experiment with our code and set `account` to an empty object we'll see this:

```
let myAccount = {
  name: 'John Doe',
  expenses: 0,
  income: 0,
};

let addExpense = function(account, amount) {
  account = {};
  console.log(account);
};

addExpense(myAccount, 4.2);
console.log(myAccount);

// output
// {}
// { name: 'John Doe', expenses: 0, income: 0 }
```

* Now we see there are 2 different objects
* When we assign the object to a new empty object we break the binding and the object in the function will be different than the original object
    - The original object will be untouched
* **remember** If I assign my object that I pass to a function to something else, the binding is broken and that object no longer points to the object in member
    - But if I change the properties of that object, it will point to the same object in memory

## This is also referencing the same object in memory
```
let myAccount = {
  name: 'John Doe',
  expenses: 0,
  income: 0,
};

let otherAccount = myAccount;
otherAccount.income = 2000;
otherAccount = {};

let addExpense = function(account, amount) {
  account.expenses = account.expenses + amount;
};

addExpense(myAccount, 4.2);
console.log(myAccount);
```

* But like before this would break the binding/pointer/reference

```
let myAccount = {
  name: 'John Doe',
  expenses: 0,
  income: 0,
};

let otherAccount = myAccount;
otherAccount.income = 2000;
otherAccount = {};

let addExpense = function(account, amount) {
  account.expenses = account.expenses + amount;
};

addExpense(myAccount, 4.2);
console.log(otherAccount); // {}
console.log(myAccount); // { name: 'John Doe', expenses: 4.2, income: 2000 }
```

