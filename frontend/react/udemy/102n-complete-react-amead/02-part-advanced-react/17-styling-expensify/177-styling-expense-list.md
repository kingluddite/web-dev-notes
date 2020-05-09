# Style ExpenseList
## First let's line up our list with our forms and headers
* We can use the `content-container` class to do this

`ExpenseList.js`

```
// MORE CODE

export const ExpenseList = ({ expenses }) => (
  <div className="content-container">
    {expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
    )}
  </div>
  // END .content-container
);

// MORE CODE
```

* View in browser and naviate to `/dashboard`
* You should see the list is lining up with Header

* From this:

![old expense list](https://i.imgur.com/aoyyqJk.png)

* To this:

![new ExpenseList](https://i.imgur.com/OeMbaS9.png)

* And make it look good on mobile

![mobile expense list](https://i.imgur.com/Y8jR05y.png)

* Add `Expense` and `Amount` headings on desktop
* Show only `Expenses` on mobile

`_visibility.scss`

```
.show-for-mobile {
  /* show the content unless it is on a desktop */
  @media (min-width: $desktop-breakpoint) {
    display: none;
  }
}

.show-for-desktop {
  /* we use max-width hear to only use display: none up to a max width of desktop (and we shave off a small amount to make sure we never have both rules applying at the same time) */
  @media (max-width: $desktop-breakpoint - .01rem) {
    display: none;
  }
}
```

* Import it

`styles.scss`

```
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

* Now you'll see Expense and Amount on Desktop

![both showing](https://i.imgur.com/FKfazdF.png)

* And only one `Expenses` showing up on mobile

![only mobile](https://i.imgur.com/aDhvvNN.png)

## Style the list header
* Now we'll focus on some list styles
* We'll create a class of `list-header` and `list-body`

### Create `styles/components/_list.scss`
* And add it to our app

`styles.scss`

```
// MORE CODE

@import './components/input-group';
@import './components/list';

// MORE CODE
```

`_page-header.scss`

```
.page-header {
  background: $off-white;
  margin-bottom: $l-size;
  padding: $l-size 0;

  &__actions {
    margin-top: $m-size;
  }

  &__title {
    font-weight: 300;
    margin: 0;

    span {
      font-weight: 700;
    }
  }
}
```

* Add our new color

`_theme.scss`

```
// MORE CODE

// Colors
$blue: #1C88BF;
$dark-blue: #364051;
$dark-grey: #333333;
$white: #ffffff;
$off-white: #f7f7f7;

// MORE CODE
```

`_list.scss`

```
.list-header {
  background: $off-white;
  border: 1px solid darken($off-white, 7%);
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

    // MORE CODE

  </div>
);
// MORE CODE
```

![box around list header](https://i.imgur.com/CutqT4p.png)

* Add a new color to our theme

`_theme.scss`

```
// Colors
$blue: #1C88BF;
$dark-blue: #364051;
$dark-grey: #333333;
$grey: #666666; /* add this */
$off-white: #f7f7f7;
$white: #ffffff;

// MORE CODE
```

`_list.scss`

```
.list-header {
  background: $off-white;
  border: 1px solid darken($off-white, 7%);
  color: $grey; /* add this */
}
```

## Time for flexbox
* We need to have Expense on left and Amount on right on desktop devices

`_list.scss`

```
.list-header {
  background: $off-white;
  border: 1px solid darken($off-white, 7%);
  color: $grey;
  display: flex;
  justify-content: space-between;
}
```

* `space-between` - This puts one item on left and other on right and all empty space distributed in the middle

## Add a little bit of padding
`_list.scss`

```
.list-header {
  background: $off-white;
  border: 1px solid darken($off-white, 7%);
  color: $grey;
  display: flex;
  justify-content: space-between;
  padding: $s-size $m-size; /* add this */
}
```

![list heading looking good](https://i.imgur.com/zJUbjMV.png)

## Focus on list items now
`ExpenseListItem.js`

* We just restructure and put everything inside `Link`
  - By making this change everything inside the Link is now clickable (better user experience)
* We'll need to get rid of the ugly purple visited link color

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
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item_subtitle">{moment(createdAt).format('MMMM Do, YYYY')}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
  </Link>
);

export default ExpenseListItem;
```

* We add a class called `list-item`

## Next - Continue where we left off

![so far](https://i.imgur.com/MjbWb9v.png) 


