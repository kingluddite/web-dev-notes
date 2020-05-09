# Styling Expense Form
* Style the:
    - AddExpensePage
    - EditExpensePage

`AddExpensePage.js`

```
// MORE CODE
render() {
  return (
    <>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Add Expense</h1>
      </div>
        {/* END .content-container */}
    </div>
    {/* END .page-header */}
      <ExpenseForm onSubmit={this.onSubmit} />
    </>
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
    - Remove root `div`
    - Move error inside `form`
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

## Add new style file to our app
`_theme.scss`

```
// MORE CODE

@import './components/button';
@import './components/form';

// MORE CODE
```

## Create `_form.scss` and import it
```
.form {
  display: flex;
  flex-direction: column;

  &__error {}
}
```

* That will stack form elements on `http://localhost:8080/create` from top to bottom

### Houston we have problems
#### Problem #1: Form elements are taking up the full width
* We will use `content-container` inside `AddExpensePage` to fix this

`AddExpensePage.js`

```
// MORE CODE

render() {
  return (
    <>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Add Expense</h1>
      </div>
        {/* END .content-container */}
    </div>
    {/* END .page-header */}
    <div className="content-container">
      <ExpenseForm onSubmit={this.onSubmit} />
    </div>
    {/* END .content-container */}
    </>
  );
}

// MORE CODE
```

* That will center our expense form
* We want `page-header` to have the full page width header so we keep that and use the `content-container` inside it to just center the form
* Our Header and the grey box to be full width no matter the size of the device

![AddExpensePage](https://i.imgur.com/n0CDOWi.png)

## Style error and form
* Let's add some margin bottom below every form field

`_form.scss`

```
.form {
  display: flex;
  flex-direction: column;
  /* set all the direct children of form to the following rules */
  > * {
    margin-bottom: $m-size;
  }

  &__error {
    font-style: italic;
    margin: 0 0 $m-size 0;
  }
}
```

![improve form spacing](https://i.imgur.com/oAdERoO.png)

* Click Add Expense button and you'll see we need to style our error slightly

## How can we make the button not take up the full width
* Just put it inside some `div`s

`ExpenseForm.js`

```
// MORE CODE

        <div>
          <button>Add Expense</button>
        </div>

// MORE CODE
```

![smaller button](https://i.imgur.com/VrCPG1R.png)

* Then add the button class

```
// MORE CODE

        <div>
          <button className="button">Add Expense</button>
        </div>

// MORE CODE
```

![styled button](https://i.imgur.com/Vgfy9p9.png)
## Challenge
* AddExpensePage looks good
* EditExpensePage needs to have some styles applied
* Make it look like this:

![EditExpense](https://i.imgur.com/mS4N7cN.png)

### Follow these steps
1. Setup page header
2. Setup content container for form and remove button
3. Add button and button--secondary (bg color #888888)

`EditExpensePage.js`

```
// MORE CODE

render() {
  // const { expense, dispatch, history } = this.props;
  return (
    <>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Edit Expense</h1>
      </div>
      {/* END .content-container */}
    </div>
    {/* END .page-header */}
      <div className="content-container">
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button className="button button--secondary" onClick={this.onRemove}>
          Remove Expense
        </button>
      </div>
      {/* END .content-container */}
    </>
  );
}

// MORE CODE
```

`_button.scss`

```
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

![Edit Expense](https://i.imgur.com/xDJ4Qou.png)

## Next
* Style list of existing expenses
