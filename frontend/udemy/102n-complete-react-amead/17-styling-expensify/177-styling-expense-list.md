# Style ExpenseList
* From this:

![old expense list](https://i.imgur.com/aoyyqJk.png)

* To this:

![new ExpenseList](https://i.imgur.com/OeMbaS9.png)

* And make it look goog on mobile

![mobile expense list](https://i.imgur.com/Y8jR05y.png)

* Add Expense and Amount headings on desktop
* Show only Expenses on mobile

`_visibility.scss`

```css
.show-for-mobile {
  @media (min-width: $desktop-breakpoint) {
    display: none;
  }
}

.show-for-desktop {
  @media (max-width: $desktop-breakpoint - .01rem) {
    display: none;
  }
}
```

* Import it

`styles.scsss`

```css
// MORE CODE
@import './components/form';
@import './components/visibility';
```

`ExpenseList.js`

```
// MORE CODE
export const ExpenseList = props => (
  <div className="content-container">
    <div>
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
);
// MORE CODE
```

## Style the list header
`list-header`

```css
.list-header {
  background-color: $off-white;
  border: .01rem  solid darken($off-white, 7%);
  color: $grey;
  display: flex;
  justify-content: space-between;
  padding: $s-size $m-size;
}
```

`ExpenseList`

```
// MORE CODE
export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    {props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
);
// MORE CODE
```

## Focus on list items now
`ExpenseListItem.js`

* We just restructure and put everything inside Link

```
// MORE CODE
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link to={`/edit/${id}`}>
    <h3>{description}</h3>
    <p>
      {numeral(amount / 100).format('$0,0.00')}
      -
      {moment(createdAt).format('MMMM Do, YYYY')}
    </p>
  </Link>
);

export default ExpenseListItem;
```

* And make it like this:

`ExpenseListItem.js`

```
// MORE CODE
const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3>{description}</h3>
      <span>{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3>{numeral(amount / 100).format('$0,0.00')}</h3>
  </Link>
);

export default ExpenseListItem;
```

### transition
* CSS property
    - let's us define 3 things:
        1. The CSS property we are trying to transition
        2. The amount of time we want the transition to take
        3. The function we will use

### Better naming
* I went through and renamed `list-header` to `list__header` and `list__item`
* I renamed the file to `_list.scss` and imported it using that name
* Just a personal preference

`_list.scss`

```css
.list {
  &__header {
    background-color: $off-white;
    border: .01rem  solid darken($off-white, 7%);
    color: $grey;
    display: flex;
    justify-content: space-between;
    padding: $s-size $m-size;
  }

  &__item {
    border: .01rem solid darken($off-white, 7%);
    border-top: none;
    color: $dark-grey;
    display: flex;
    flex-direction: column;
    padding: $s-size;
    text-decoration: none;
    transition: background 0.3s ease;
    
    &:hover {
      background: $off-white;
    }
  }
}
```

* We now can hover over and see a transition effect

## Houston we have a problem
* In mobile we want our items to be grouped on left and right
* Current look:

![current item style](https://i.imgur.com/APOIugq.png)


