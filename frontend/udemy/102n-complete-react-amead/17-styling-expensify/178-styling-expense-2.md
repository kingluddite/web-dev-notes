# Styling Expense (part 2)
* Continue working on things inside the list item

`ExpenseListItem.js`

```
// MORE CODE
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list__item" to={`/edit/${id}`}>
    <div>
      <h3 className="list__item__title">{description}</h3>
      <span className="list__item__sub-title">
        {moment(createdAt).format('MMMM Do, YYYY')}
      </span>
    </div>
    <h3 className="list__item__data">
      {numeral(amount / 100).format('$0,0.00')}
    </h3>
  </Link>
);

export default ExpenseListItem;
```

### Edge cases
* Multiple words looks ok
* But one long word looks bad

![one long word](https://i.imgur.com/1BUmI5N.png)

* The fix is `word-break: break-all`

`_settings.scss`

```
// MORE CODE
// Font Size
$font-size-large: 1.8rem;
$font-size-small: 1.4rem;

// MORE CODE
```

`_list.scss`

```
// MORE CODE
&__item__title {
  margin: 0;
  word-break: break-all;
}

&__item__sub-title {
  color: $grey;
  font-size: $font-size-small; 
}

&__item__data {
  margin: $s-size 0 0 0;

  @media (min-width: $desktop-breakpoint) {
    margin: 0;
    padding-left: $s-size;
  }
}
```

* That will make the Expense items look nice in desktop and mobile

## Fix the No Expenses message
* Delete all expenses to show the message

![no expenses](https://i.imgur.com/dZylTiH.png)

`ExpenseList.js`

```
export const ExpenseList = props => (
  <div className="content-container">
    <div className="list__header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {props.expenses.length === 0 ? (
      <div className="list__item list__item--message">
        <span>No expenses</span>
      </div>
// MORE CODE
```

`_list.scss`

```
// MORE CODE
&__item--message {
  align-items: center;
  color: $grey;
  justify-content: center;
  padding: $m-size;

  &:hover {
    background: none;
  }
}
// MORE CODE
```

## Add a little space below list
`ExpenseList.js`

* We put our jsx inside `list__body`

```
// MORE CODE
export const ExpenseList = props => (
  <div className="content-container">
    <div className="list__header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list__body">
      {props.expenses.length === 0 ? (
        <div className="list__item list__item--message">
          <span>No expenses</span>
        </div>
      ) : (
        props.expenses.map(expense => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
    </div>
  </div>
);
// MORE CODE
```

`_list.scss`

```
// MORE CODE
&__body {
  margin-bottom: $m-size;

  @media (min-width: $desktop-breakpoint) {
    margin-bottom: $l-size;
  }
}

&__item--message {

// MORE CODE
```

## Next - Swap word `Loading...` with animated gif
