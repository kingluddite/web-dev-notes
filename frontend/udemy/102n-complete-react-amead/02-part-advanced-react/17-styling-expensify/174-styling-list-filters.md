# Styling List Filters
`ExpenseListFilters.js`

* This is the main dashboard page
* stateful component
* renders stuff to screen

## UI
![desktop ui](https://i.imgur.com/2zbSKgV.png)

![mobile ui](https://i.imgur.com/0TIRVwP.png)

`ExpenseListFilters.js`

```
// MORE CODE
  render() {
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
          <div className="input-group__item">
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              startDateId="start"
              endDate={this.props.filters.endDate}
              endDateId="end"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}
// MORE CODE
```

## Challenge
1. Create input-group partial
2. Add selectors for input-group and input-group__item
3. Setup flexbox with space below the group
4. Setup right margin for the individual items

`styles.scss`

```
@import './base/settings';
@import './base/base';
@import './components/box-layout';
@import './components/button';
@import './components/Header';
@import './components/content-container';
@import './components/page-header';
@import './components/input-group'; // add this line
```

## Put filter above list
`ExpenseDashboardPage.js`

```
// MORE CODE
const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
```

`_input-group.scss`

```css
.input-group {
  display: flex;
  margin-bottom: $l-size;

  &__item {
    margin-right: $s-size;
  }
}
```

* Make bg white

`_base.scss`

```
// MORE CODE
body {
  background-color: $white;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
  line-height: 1.6;
}
// MORE CODE
```

## Style the list for mobile
`_input-group.scss`

```css
.input-group {
  display: flex;
  flex-direction: column; 
  margin-bottom: $m-size;

  @media (min-width: $desktop-breakpoint) {
    flex-direction: row;
    margin-bottom: $l-size;
  }

  &__item {
    margin-right: $s-size;
  }
}
```

* Mobile first design
* We use column to stack elements and row for desktop (horizontal)
* We change the margin per device
* We use media query to target desktop
* Using breakpoint variable

`_setting.scss`

```
// MORE CODE
// Media Query Breakpoints
$desktop-breakpoint: 45rem;
// MORE CODE
```

## Make the spacing better on mobile
`_input-group.scss`

```
.input-group {
  display: flex;
  flex-direction: column; 
  margin-bottom: $m-size;

  @media (min-width: $desktop-breakpoint) {
    flex-direction: row;
    margin-bottom: $l-size;
  }

  &__item {
    margin-bottom: $s-size;
    margin-right: $s-size;

    @media (min-width: $desktop-breakpoint) {
      margin-right: $s-size;
      margin: 0 $s-size 0 0;
    }
  }
}
```



