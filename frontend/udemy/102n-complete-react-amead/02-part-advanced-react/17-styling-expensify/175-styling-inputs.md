# Styling Inputs
* We won't style elements that come from 3rd parties (like DatePicker)
* We don't want to write conflict code with inputs (DatePicker) so we add class names to the inputs

## Create `_inputs.scss` and import it into `styles.scss`
`styles.scss`

```
// MORE CODE
@import './components/inputs'; /* add this */
@import './components/input-group';
@import './components/page-header';
@import './components/Header';
```

`_inputs.scss`

* Why don't we just use selectors like `input` to style elements?
  - Because we are using 3rd party components and they may be using basic elements to style and if we do the same we could run into conflicts
  - **tip** To avoid CSS conflicts make your element class names unique (this was the reason BEM was created)
  - If we viewed the calendar you would see it also uses `input` html elements so if we styled our app using `input` this would add CSS to our data picker which is not the desired result

```
.text-input {
  border: 0.1rem solid #cacccd;
  height: 5rem;
  font-size: $font-size-large;
  font-weight: 300;
  padding: $s-size;
}
```

![styled input](https://i.imgur.com/5Cgulnq.png)

## Houston we have a problem
### Why is the input so big?
![computed height is 76px](https://i.imgur.com/SzQ81dZ.png)

* Select input, view Computed and 1 + 12 + 50 + 12 + 1 = 76px
    - Browser takes the height you specified (50px === 5rem)
    - And browser also adds on padding and border!

### Solution - universal selector
* Do this in every single project you work on

#### box-sizing
* By default browsers set everything to `box-sizing: content-box`
* **important** We will set it equal to `border-box`
* Add this to `_base.scss`

```
* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%
}
// MORE CODE
```

* Now the input is the 50px (5rem) you expected

## Style the select
* Two ways to skin a cat

`_inputs.scss`

```
.text-input, .select {
  border: 0.1rem  solid #cacccd;
  height: 5rem;
  font-size: $fong-size-large;
  font-weight: 300;
  padding: $s-size;
}
```

* If we want to share props between elements we could do it this way
* But Sass gives us a better options
    - Check out **Extend/Inheritance** in [the docs](http://sass-lang.com/guide)

#### Example of how it works:
```
/ This CSS won't print because .equal-heights is never extended
.equal-heights {
  display: flex;
  flex-wrap: wrap;
}

// This CSS will print because .message-shared is extended
.message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend .message-shared;
}

.success {
  @extend .message-shared;
  border-color: green;
}
```

* Let's apply `@extend` to our select

`_inputs.scss`

```
.text-input {
  border: 0.1rem  solid #cacccd;
  height: 5rem;
  font-size: $fong-size-large;
  font-weight: 300;
  padding: $s-size;
}

.select {
  @extend .text-input;
}
```

`ExpenseListFilters.js`

* We add the **class** name of `select`

```
// MORE CODE

          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          {/* END .input-group__item */}

// MORE CODE
```

![filters looking better](https://i.imgur.com/qIC0Ge9.png)

## Add placeholder 'Search Expenses'
`ExpenseListFilters.js`

```
// MORE CODE

            <input
              placeholder="Search Expenses"
              className="text-input"
              type="text"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />

// MORE CODE
```

![add placeholder to input](https://i.imgur.com/LM7lgQR.png)

# DRY
* Let's recycle our form classes

`_inputs.scss`

```
.text-input {
  border: 0.1rem solid #cacccd;
  height: 5rem;
  font-size: $font-size-large;
  font-weight: 300;
  padding: $s-size;
}

.select {
  @extend .text-input;
}

.textarea {
  @extend .text-input;
  height: 10rem;
}
```

`ExpenseForm.js`

```
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            className="text-input"
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            className="text-input"
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            className="textarea"
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Save Expense</button>
        </form>
      </div>
    );
  }
}
```

* I changed `Add Expense` to `Save Expense`

![ExpenseForm styled](https://i.imgur.com/6UfQacH.png)

## Next
* AddExpensePage
* EditExpensePage
