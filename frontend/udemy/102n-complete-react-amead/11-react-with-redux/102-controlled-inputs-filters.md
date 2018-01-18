# Controlled Inputs for filters
* Learn how to filter by the text value
* Learn how to dispatch from a connected component

`components/ExpenseListFilters.js`

```
import React from 'react';

const ExpenseListFilters = () => (
  <div>
    <input type="text" />
  </div>
);

export default ExpenseListFilters;
```

## Import and render component
`ExpenseDashboardPage.js`

```
import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseList />
    <ExpenseListFilters />
  </div>
);

export default ExpenseDashboardPage;
```


