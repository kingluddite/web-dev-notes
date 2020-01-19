# Styling Inputs
* We won't style elements that come from 3rd parties (like DatePicker)
* We don't want to write conflict code with inputs (DatePicker) so we add class names to the inputs

## Create `_inputs.scss` and import it into `styles.scss`
`_inputs.scss`

```css
.text-input {
  border: 0.1rem solid #cacccd;
  height: 5rem;
  font-size: $fong-size-large;
  font-weight: 300;
  padding: $s-size;
}
```

![styled input](https://i.imgur.com/5Cgulnq.png)

## Houston we have a problem
### Why is the input so big?
* Select input, view Computed and 1 + 12 + 50 + 12 + 1 = 76px
    - Browser takes the height you specified (50px === 5rem)
    - And browser also adds on padding and border!

### Solution - universal selector
* Do this in every single project you work on

#### box-sizing
* By default browsers set everything to `box-sizing: content-box`
* **important** We will set it equal to border-box
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

.select {

}
```

* If we want to share props between elements we could do it this way
* But Sass gives us a better options
    - Check out **Extend/Inheritance** in [the docs](http://sass-lang.com/guide)

#### Example of how it works:
```css
/ This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

// This CSS will print because %message-shared is extended.
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}
```

* Let's apply `@extend` to our select

`_inputs.scss`

```css
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
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
```


