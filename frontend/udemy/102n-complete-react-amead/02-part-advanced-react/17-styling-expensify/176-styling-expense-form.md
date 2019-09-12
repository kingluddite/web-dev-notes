# Styling Expense Form
* Style the:
    - AddExpensePage
    - EditExpensePage

`AddExpensePage.js`

```
// MORE CODE
render() {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Add Expense</h1>
        </div>
      </div>
      <ExpenseForm onSubmit={this.onSubmit} />
    </div>
  );
}
// MORE CODE
```

* View `http://localhost:8080/create`
* Here is what you will see:

![reuse header](https://i.imgur.com/dqV0ttz.png)

### Best Practice
* Using styling to create reusable components throughout your app

`ExpenseForm.js`

* Restructure
    - Remove root div
    - Move error inside form
    - **note** no requirement that there must be a root `div`
        + You just are required to have any root parent container
            * So form is now our root container

```
// MORE CODE
render() {
  return (
    <form onSubmit={this.onSubmit} className="form">
      {this.state.error && <p className="form__error">{this.state.error}</p>}
// MORE CODE
```

* We add our classNames of `form` and `form__error`

## Create `_form.scss` and import it
```css
.form {
  display: flex;
  flex-direction: column;

  &__error {
    
  }
}
```

* That will stack form elements on `http://localhost:8080/create` from top to bottom

### Houston we have problems
#### Problem #1: Form elements are taking up the full width
    - We will use `content-container` inside `AddExpensePage` to fix this

`AddExpensePage.js`

```
// MORE CODE
render() {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Add Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    </div>
  );
}
// MORE CODE
```

* That will center our expense form
* We want `page-header` to have the full page width header so we keep that and use the `content-container` inside it to just center the form
* Our Header and the grey box to be full width no matter the size of the device

## Challenge
* Make it look like this:

![EditExpense](https://i.imgur.com/mS4N7cN.png)

`EditExpensePage.js`

```
// MORE CODE
render() {
  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Edit Expense</h1>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button className="button button--secondary" onClick={this.onRemove}>
          Remove Expense
        </button>
      </div>
    </div>
  );
}
// MORE CODE
```

`_button.scss`

```css
.button {
  background-color: $blue;
  border: none;
  color: $white;
  display: inline-block;
  font-weight: 300;
  font-size: $font-size-large;
  line-height: 1;
  padding: $s-size;
  text-decoration: none;

  &--link {
    background-color: transparent;
  }

  &--secondary {
    background-color: $grey;
  }
}
```

`_settings.scss`

```
// Colors
$white: #FFFFFF;
$dark-grey: #333333;
$blue: #1C88BF;
$dark-blue: #364051;
$grey: #888888;

// MORE CODE
```

`ExpenseForm.js`

```
// MORE CODE
  />
  <div>
    <button className="button">Save Expense</button>
  </div>
</form>
// MORE CODE
```



1. Setup page header
2. Setup content contain for form and remove button
3. Add button and button--secondary modifier with bg color of #888888 (grey)

#### Problem #2 Form element have so spacing between each other
`_form.scss`

```css
.form {
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: $m-size;
  }

  &__error {
    margin: 0 0 $m-size 0;
    font-style: italic;
  }
}
```

* I love the `> *` this sets all the **direct children** of `.form` to have margin-bottom
* We style the error

![form so far](https://i.imgur.com/rNer3N8.png)

* Click `Save Expense` button to make the error appear

### Fixes
* Make button not cover full width
    - That is because all direct children have flex-direction `column`
        + To make button not inherit this value we put it inside it's own `div` therefor making it not a direct child and it will be be flex-direction of column

`ExpenseForm.js`

```
// MORE CODE
        <textarea
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">Add Expense</button>
        </div>
      </form>
    );
  }
}
```

* Now `Add Expense` does not cover width of page
* We add button className to make it have button styles

## EditExpensePage Challenge
* Look at it now and make it look as nice as AddExpensePage
