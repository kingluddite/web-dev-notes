# Styling Summary Area
`ExpenseSummary.js`

* Some things we will tackle when styling
  - Make a button look like a link
  - Make a link look like a button

## Building a versatile header with styles
* `_Header.scss`
    - Regular header for all of the pages
* `_page-header.scss`
    - This file will contain styles for page specific information
    - In this case it will contain a [summary with a button](https://i.imgur.com/ldZ2nzj.png)
    - In other pages is will contain the title
      + [EditPage with title](https://i.imgur.com/ogWQx5D.png)
      + [AddExpensePage with title](https://i.imgur.com/vcCMXGk.png)

`ExpenseSummary.js`

```
// MORE CODE

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {

  // MORE CODE

  return (
    <div className="page-header">
      <div className="content-container">

       // MORE CODE

       </div>
    </div>
  );
};
// MORE CODE
```

* Make sure to import `_page-header.scss`

`styles.scss`

```
// MORE CODE
@import './components/page-header';
@import './components/Header';
```

## Run server
`$ npm run dev-server`

## View in browser
![so far what it looks like](https://i.imgur.com/Onm8IX2.png)

## Fun with fonts
* We want to alternate between a thin font and a think font
  - The thin font will be for the h1 content that is not dynamic info
  - The thick font will be the dynamic information

![example of thin and thick font](https://i.imgur.com/sumgIDr.png)

`ExpenseSummary.js`

```
// MORE CODE

   export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {

     // MORE CODE

     return (
       <div className="page-header">
         <div className="content-container">
           <h1 className="page-header__title">
             Viewing {expenseCount} {expenseWord} totaling {formattedExpensesTotal}
           </h1>
         </div>
           {/* END .content-container */}
       </div>
       // END .page-header
     );
   };

// MORE CODE
```

## Style our page-header
`_page-header.scss`

```
.page-header {
  background: #f7f7f7;
  margin-bottom: $l-size;
  padding: $l-size 0;
}
```

![page header styled](https://i.imgur.com/sJWjcVF.png)

* Thin and thick font
  - Use font weight of 300 for thin fonts
  - Use span and add heavier font weight for thick fonts

`ExpenseSummary.js`

```
// MORE CODE

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
            Viewing <span>{expenseCount}</span> {expenseWord} totaling <span>{formattedExpensesTotal}</span>
        </h1>
      </div>
        {/* END .content-container */}
    </div>
    // END .page-header
  );

// MORE CODE
```

`_page-header.scss`

```
.page-header {
  background: #f7f7f7;
  margin-bottom: $l-size;
  padding: $l-size 0;

  &__title {
    font-weight: 300;
    margin: 0;

    span {
      font-weight: 700;
    }
  }
}
```

* font-weight of `700` === **bold**

![so far styled](https://i.imgur.com/ngGEMev.png)

## Add a link
`ExpensesSummary.js`

* Add a link to the `AddExpensePage`

```
import React from 'react';
import { Link } from 'react-router-dom';

// MORE CODE

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  
  // MORE CODE

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totaling{' '}
          <span>{formattedExpensesTotal}</span>
        </h1>
        <div>
          <Link to="/Create">Add Expense</Link>
        </div>
      </div>
      {/* END .content-container */}
    </div>
    // END .page-header
  );
};

// MORE CODE
```

![link to add expense](https://i.imgur.com/BHw7E1u.png)

* We add/reuse on a `button` class

`ExpensesSummary.js`

```
// MORE CODE

          <Link className="button" to="/Create">
            Add Expense
          </Link>

// MORE CODE
```

![new button](https://i.imgur.com/CC5V2se.png)

## Style actions for a page

`ExpensesSummary.js`

```
// MORE CODE

        <div className="page-header__actions">
          <Link className="button" to="/Create">
            Add Expense
          </Link>
        </div>
          {/* END .page-header__actions */}

// MORE CODE
```

* Style actions

`_page-header.scss`

```
.page-header {
  background: #f7f7f7;
  margin-bottom: $l-size;
  padding: $l-size 0;

  &__actions {
    margin-top: $m-size;
  }

  &__title {

// MORE CODE
```

* And what it looks like

![spacing added](https://i.imgur.com/PkxP69n.png)

## Style a link to look like a button

`_button.scss`

### inline vs block-inline

* By default links are displayed `inline` where we won't have our top and bottom margin taken into effect

```
.button {
  background-color: $blue;
  border: none;
  color: $white;
  display: inline-block; /* use to make sure the vertical margin and padding get taken into effect */
  font-weight: 300;
  font-size: $font-size-large;
  line-height: 1; /* Since buttons will always sit on one line we have no need for extra line height */
  padding: $s-size;
  text-decoration: none; /* remove underline of link */
}
```

## Add Expense done
* But we still need to fix Logout button

## Challenge
1. Create link modifier
2. Setup style to use no bg
3. Apply base and modified class to logout button

`Header.js`

```
// MORE CODE

        <button className="button button--link" onClick={startLogout}>
          Logout
        </button>

// MORE CODE
```

`_button.scss`

```
.button {

  // MORE CODE

  &--link {
    background-color: transparent;
  }
}
```

![Logout as link](https://i.imgur.com/96QIn4y.png)

## Next - Style the filters area of dashboard

