# Improve Expense Tracker App
## Challenge #1
`expense-tracker.js`

```
const account = {
  name: 'John Doe',
  expenses: [],
};

// Expense -> description, amount
// addExpense -> description, amount
// getAccountSummary -> total up all expenses -> "John Doe has $1200 in expenses"

account.addExpense('Rent', 960);
account.addExpense('Coffee', 2);
console.log(account.getAccountSummary());
```

* We previously built an expense tracker but we just kept of our expenses via a single number
* If we added an expense we just added it onto that single number, this is OK but not robust because we don't have a list of our expenses
    - I can't keep track of how much I'm spending on an individual item
    - I can't see the individual cost of each expense

`expense-tracker.js` (previous)

```
let myAccount = {
  name: 'John Doe',
  expenses: 0,
  income: 0,
};

let addExpense = function(account, amount) {
  account.expenses = account.expenses + amount;
};

let addIncome = function(account, income) {
  account.income = account.income + income;
};

let resetAccount = function(account) {
  account.income = 0;
  account.expenses = 0;
};

let getAccountSummary = function(account) {
  let balance = account.income - account.expenses;
  return `Account for ${account.name} has a $${balance} balance. There is $${account.expenses} in expenses. There is $${account.income} in income.`;
};

addIncome(myAccount, 10);
console.log(myAccount);
addExpense(myAccount, 100);
addExpense(myAccount, 200);
addIncome(myAccount, 1000);
console.log(getAccountSummary(myAccount));
resetAccount(myAccount);
console.log(myAccount);
addExpense(myAccount, 900);
addExpense(myAccount, 200);
addIncome(myAccount, 11000);
console.log(getAccountSummary(myAccount));
```

## Arrays of Objects to the rescue
* Now that we know about arrays of objects we can model each expense using an object
    - The will allow us to have multiple pieces of data
    - We'll have 2 properties
        + An expense description
        + The exact amount of that expense
    - By doing this we now can search our expenses, delete our expenses
    - And we'll also be able to analyze our data and get a total expense amount

## Starting point
```
const account = {
  name: 'John Doe',
  expenses: [],
};
```

* We see that expenses is an `array`
* We will store an array of objects in that array
* Each object will model an expense with 2 properties
    1. A `description` of the expense
    2. The `amount` of the expense
    3. **note** That will just define what goes in expense, we need to create a method to actually put things in expenses and also analyze our data in expenses

### addExpense
* This is the method that will add an Expense object to our `expenses` array
* What are the arguments this method will take?
    - `description` and `amount`
* We take in those 2 arguments and inside our `addExpense()` method will need to add a new object onto the expenses array with the correct data
* That will allow us to populate the expenses array

### getAccountSummary
* This method will take no arguments at all
* All it does is total up all the expenses and output an information message to the end user of the total expenses
    - "John Doe has $1000 in expenses"
        + `John Doe` is the account name
        + `$1000` is the total amount of expenses
* To accomplish this you'll just need to use a `forEach` to go through every single item in the expenses array, then you can get the amount and add it onto a variable, as you keep changing that variable you'll come up with the total in expenses and you can add that into the template string

## A couple of tests
```
account.addExpense('Rent', 960);
account.addExpense('Coffee', 2);
```

* That should add 2 expense objects

## Call the method to find the total expenses
```
console.log(account.getAccountSummary());
```

* That should output the dynamic sentence to alert the user their total expenses

## Part 1 Challenge Solution
`expense-tracker.js`

```
const account = {
  name: 'John Doe',
  expenses: [],
  addExpense: function(description, amount) {
    this.expenses.push({
      description,
      amount,
    });
  },
  getAccountSummary: function() {
    let totalExpenses = 0;
    this.expenses.forEach(function(expense) {
      totalExpenses += expense.amount;
    });
    return `${this.name} has $${totalExpenses} in expenses`;
  },
};

// Expense -> description, amount
// addExpense -> description, amount
// getAccountSummary -> total up all expenses -> "John Doe has $1200 in expenses"

account.addExpense('Rent', 960);
account.addExpense('Coffee', 2);
account.addExpense('Car', 200);
account.addExpense('Car Wash', 20);
console.log(account.getAccountSummary());
```

* Don't forget to add the extra `$` to show currency
* When outputting the account name remember to use `this` like `this.name` instead of `account.name` (`this` will come in handy often)

## Part 2 Challenge
1. Add an income array to account
2. Add `addIncome` method with 2 arguments `description` and `amount`
  * Will be similar to what we already have
3. Tweak getAccountSummary
  * You want to alert user how much is in income and expense (income minus expenses)
  * "John Doe has a balance of $100. With $1000 in income and $900 in expenses"

### Add some income to see if this will work as expected
```
account.addExpense('Rent', 960);
account.addExpense('Coffee', 2);
account.addExpense('Car', 200);
account.addExpense('Car Wash', 20);
account.addIncome('Job', 2000); // add this line
console.log(account.getAccountSummary());

```

### Challenge #2 Solution
```
const account = {
  name: 'John Doe',
  expenses: [],
  incomes: [],
  addExpense: function(description, amount) {
    this.expenses.push({
      description,
      amount,
    });
  },
  addIncome: function(description, amount) {
    this.incomes.push({
      description,
      amount,
    });
  },
  getAccountSummary: function() {
    let totalExpenses = 0;
    let totalIncomes = 0;
    let accountBalance = 0;
    this.expenses.forEach(function(expense) {
      totalExpenses += expense.amount;
    });
    this.incomes.forEach(function(income) {
      totalIncomes += income.amount;
    });
    accountBalance = totalIncomes - totalExpenses;
    return `${this.name} has a balance of $${accountBalance}. Total expenses are $${totalExpenses}. Total income is $${totalIncomes}.`;
  },
};

// Expense -> description, amount
// addExpense -> description, amount
// getAccountSummary -> total up all expenses -> "John Doe has $1200 in expenses"

account.addExpense('Rent', 960);
account.addExpense('Coffee', 2);
account.addExpense('Car', 200);
account.addExpense('Car Wash', 20);
account.addIncome('Job', 1000);
console.log(account.getAccountSummary());
```

## Run it
`$ node expense-tracker.js`

## Output should look similar to:

```
John Doe has a balance of $-182. Total expenses are $1182. Total income is $1000.
```
