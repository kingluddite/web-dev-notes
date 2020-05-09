# Styling Expense (part 2)
* Continue working on things inside the list item

### transition
* CSS property
    - let's us define 3 things:
        1. The CSS property we are trying to transition
        2. The amount of time we want the transition to take
        3. The function we will use

### Better naming
* I went through and renamed `list-header` to `list-item__header` and `list__item`
* I renamed the file to `_list-item.scss` and imported it using that name
* Just a personal preference

`_list.scss`

```
.list-header {
  background: $off-white;
  border: 1px solid darken($off-white, 7%);
  color: $grey;
  display: flex;
  justify-content: space-between;
  padding: $s-size $m-size;
}

.list-body {
  margin-bottom: $m-size;
  @media (min-width: $desktop-breakpoint) {
    margin-bottom: $l-size;
  }
}

.list-item {
  border: 1px solid darken($off-white, 7%);
  border-top: none;
  color: $dark-grey;
  display: flex;
  flex-direction: column;
  padding: $s-size;
  text-decoration: none;
  transition: background .3s ease;
  &:hover {
    background: $off-white;
  }
  @media (min-width: $desktop-breakpoint) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: $m-size;
  }
}

.list-item--message {
  align-items: center;
  color: $grey;
  justify-content: center;
  padding: $m-size;
  &:hover {
    background: none;
  }
}

.list-item__title {
  margin: 0;
  word-break: break-all;
}

.list-item__sub-title {
  color: $grey;
  font-size: $font-size-small;
}

.list-item__data {
  margin: $s-size 0 0 0;
  @media (min-width: $desktop-breakpoint) {
    margin: 0;
    padding-left: $s-size;
  }
}
```

* We now can hover over and see a transition effect

## Houston we have a problem
* In mobile we want our items to be grouped on left and right
* Current look:

![current item style](https://i.imgur.com/APOIugq.png)

`ExpenseListItem.js`

```
// MORE CODE
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__subtitle">
        {moment(createdAt).format('MMMM Do, YYYY')}
      </span>
    </div>
    <h3 className="list-item__data">
      {numeral(amount / 100).format('$0,0.00')}
    </h3>
  </Link>
);

export default ExpenseListItem;
```

### Edge cases
* Multiple words looks OK
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
