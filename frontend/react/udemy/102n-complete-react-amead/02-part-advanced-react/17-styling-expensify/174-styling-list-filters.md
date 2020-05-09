# Styling List Filters
`ExpenseListFilters.js`

* We'll focus on the filters on the dashboard page
  - This is the main dashboard page
* This is a `stateful` component and it also renders stuff to screen
  - We have:
    + search input
    + select dropdown
    + Instance of DateRangePicker

## UI
![desktop ui](https://i.imgur.com/2zbSKgV.png)

![mobile ui](https://i.imgur.com/0TIRVwP.png)

`ExpenseListFilters.js`

* We put all the form elements in their own `div` and and then put all of them inside their own parent `div`
* The parent `div` has a class of `input-group` and the children `div`s have a class name of `input-group__item`

`ExpenseListFilters.js`

```
// MORE CODE

    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          {/* END .input-group__item */}
          <div className="input-group__item">
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          {/* END .input-group__item */}
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="start"
              endDate={this.props.filters.endDate}
              endDateId="end"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          {/* END .input-group__item */}
        </div>
        {/* END .input-group */}
      </div>
      // END .content-container
    );

// MORE CODE
```

![what it looks like so far](https://i.imgur.com/1WvRrlQ.png)

## Challenge
1. Create `input-group` partial
2. Add selectors for `input-group` and `input-group__item`
3. Setup flexbox with space below the group
4. Setup right margin for the individual items

`styles.scss`

```
@import './base/settings';
@import './base/base';
@import './components/box-layout';
@import './components/button';
@import './components/content-container';
@import './components/Header';
@import './components/input-group'; // add this line
@import './components/page-header';
```

`_input-group.scss`

```
.input-group {
   display: flex; /* make elements move left to right */
   margin-bottom: $l-size;

  &__item {
   margin-right: $s-size;
  }
}
```

![so far](https://i.imgur.com/XlTNpjp.png)

### Challenge Complete!

## Now we need to style the list for mobile
![not looking good](https://i.imgur.com/gIvUJ3E.png)

* When we make the browser small we see the form elements are still right to left and for mobile we want them to stack on top of each other

### To do this we'll need to set up media queries
* We will use the $desktop-breakpoint variable again

#### How does the $desktop-breakpoint variable work again?
* We get it from this file:

`_theme.scss`

```
// Colors
$blue: #1C88BF;
$dark-blue: #364051;
$dark-grey: #333333;
$white: #ffffff;

// Font Size
$font-size-large: 1.8rem;

// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;

// Media Query Breakpoints
$desktop-breakpoint: 45rem; /* here is where we set it */
```

`_input-group.scss`

```
// MORE CODE

.input-group {
   display: flex; /* make elements move left to right */
   margin-bottom: $l-size;

   @media () {
     /* these are the styles we will apply for larger screens */
   }
  &__item {
   margin-right: $s-size;
  }
}

// MORE CODE
```

* To use it we provide the `min-width` as an argument and set it equal to the $desktop-breakpoint (45rem)

`_input-group.scss`

```
.input-group {
   display: flex; /* make elements move left to right */
   margin-bottom: $l-size;

   @media (min-width: $desktop-breakpoint) {
     /* these are the styles we will apply for larger screens */
   }
  &__item {
   margin-right: $s-size;
  }
}
```

## Now we'll add our rules for smaller screens and larger screens
`_input-group.scss`

```
.input-group {
  /* THIS IS FOR SMALLER SCREENS */
   display: flex; /* make elements move left to right */
   flex-direction: column;
   margin-bottom: $m-size;

   @media (min-width: $desktop-breakpoint) {
     /* THIS IS FOR LARGER SCREENS */
     /* these are the styles we will apply for larger screens */
     flex-direction: row;
     margin-bottom: $l-size;
   }

  &__item {
   margin-right: $s-size;
  }
}
```

* Now when you view in browser and make browser small, the form elements will stack and be in a row on larger devices
* mobile

![mobile](https://i.imgur.com/fZXduxL.png)

* desktop
![desktop](https://i.imgur.com/1RbcsUX.png)

## Minor spacing fixes
* We increased margin bottom for phones
* And we removed bottom margin and added right margin for desktop devices

`_input-groups.scss`

```
// MORE CODE
  &__item {
   margin-bottom: $s-size;

   @media (min-width: $desktop-breakpoint) {
     margin: 0 $s-size;
     margin-right: $s-size;
   }
  }
}
```

## Next - Styling inputs
