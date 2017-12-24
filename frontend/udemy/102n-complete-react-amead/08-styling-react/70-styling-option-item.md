# Styling Option Item
* New file in `src/styles/components/_option.scss`
* Make sure you import it inside `styles.scss`

```css
.option {
  display: flex;
  justify-content: space-between;
}
```

`Option.js`

```
// MORE CODE
const Option = props => (
  <div className="option">
    {props.optionText}
    <button
      className="button button--link"
      onClick={() => {
        props.handleDeleteOption(props.optionText);
      }}
    >
      remove
    </button>
  </div>
);
// MORE CODE
```

* options and remove spread out evenly

![option flex](https://i.imgur.com/lyHfuuM.png)

* Improve padding:

`_options.scss`

```css
.option {
  border-bottom: 1px solid lighten($light-blue, 10%);
  display: flex;
  justify-content: space-between;
  padding: $l-size $m-size;
}
```

## Focus what is inside the option
* Getting number showing up

![item focus](https://i.imgur.com/ILVXF9W.png)

### The beauty of index
* Where will get the number from that we want to pass into our list of options?
* It can't be static, that would be a pain updating
* Luckily map give us access to `index`

`Options.js`

```
// MORE CODE
    {props.options.map((option, index) => (
      <Option
        key={option}
        optionText={option}
        count={index + 1}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);

export default Options;
```

* `{index + 1}` because the **index** starts at `0`

`Option.js`

```
// MORE CODE
const Option = props => (
  <div className="option">
    <p className="option__content">
      {props.count}. {props.optionText}
    </p>
// MORE CODE
```

![now with numbers](https://i.imgur.com/1UpuX7Y.png)

`_option.scss`

```css
.option {
  border-bottom: 1px solid lighten($light-blue, 10%);
  display: flex;
  justify-content: space-between;
  padding: $l-size $m-size;

  &__content {
    color: white;
    font-size: 2rem;
    font-weight: 500;
    margin: 0
  }
}
```

* Final option styles

![option styles](https://i.imgur.com/FbX1mrQ.png)

## AddOption
`src/styles/components/_add-option.scss`

```css
.add-option {
  &__error {
    color: $off-white;
    font-style: italic;
    margin: $m-size 0 0 0;
    padding: 0 $m-size;
  }
}
```

`AddOption.js`

```
// MORE CODE
render() {
  return (
    <div className="add-option">
      {this.state.error && (
        <p className="add-option__error">{this.state.error}</p>
      )}
// MORE CODE
```

![error text styled](https://i.imgur.com/p78lVV4.png)

## Make our Add Option form look nice
* Use flexbox to have our input form take up all the extra space
* We'll give our form the class name of `add-option__form` and the input the class name of `add-option__input`

`AddOption`

```
// MORE CODE
render() {
  return (
    <div className="add-option">
      {this.state.error && (
        <p className="add-option__error">{this.state.error}</p>
      )}
      <form className="add-option__form" onSubmit={this.handleAddOption}>
        <input type="text" name="option" className="add-option__input" />
        <button className="button">Add Option</button>
      </form>
    </div>
  );
}
// MORE CODE
```

### Fill the width of the container
* Just give the form `display: flex`
* And give the input `flex: 1` like this:

```css
.add-option {

  &__error {
    color: $off-white;
    font-style: italic;
    margin: $m-size 0 0 0;
    padding: 0 $m-size;
  }

  &__form {
    display: flex;
    padding: $m-size;
  }

  &__input {
    background: $dark-blue;
    border: none;
    border-bottom: 0.3rem solid darken($dark-blue, 10%);
    flex-grow: 1;
    margin-right: $s-size;

  }
}
```

* Will make our form look good like this:

![form looking good](https://i.imgur.com/qHk0q5S.png)

* Add the bg and bottom border

![final form style](https://i.imgur.com/odsMMl9.png)

```css
&__input {
  background: $dark-blue;
  border: none;
  border-bottom: 0.3rem solid darken($dark-blue, 10%);
  color: $off-white; // add
  flex-grow: 1;
  margin-right: $s-size; // add
  padding: $s-size; // add 
}
```

* This makes the inside of the form input look nice

![form input text](https://i.imgur.com/0x20dWE.png)
