# Build an Expense tracker
## Challenge
* functions
    - `addIncome` - will take the account to manipulate (which account are we trying to add income for) and the amount of income we want to add
    - `resetAccount` - will reset the expenses and the income for an account to `0` (just will take one argument - the account to change)
    - `getAccountSummary` - will print a summary of the account
        + the current account balance
        + the total expenses and income
        + Output would resemble `Account for John has $1000. $1000 in income. $100 in expenses`
            * Return the string as the return value for getAccountSummary
            * Then when you use it just print it to screen using console.log()

### Example of how we could use these functions
1. addIncome
2. addExpense
3. getAccountSummary
4. resetAccount
5. getAccountSummary

### Challenge Solution
`expense-tracker.js`

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


