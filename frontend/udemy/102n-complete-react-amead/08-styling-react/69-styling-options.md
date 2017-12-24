# Styling Options
* Create `src/styles/components/_widget.scss`
* Make sure to import in inside `styles.scss`

`_settings.scss`

```
// colors
$off-black: #20222b;
$off-white: #a5afd7;
$dark-blue: #333745;
$blue: #3c4251; // add this new color
$purple: #8357c5;
// MORE CODE
```

* Add a widget class to our options

`_widget.scss`

```css
.widget {
  &__header {
    background: $blue;
    color: $off-white;
    padding: $m-size;
  }
}
```

`Options.js`

```
// MORE CODE
const Options = props => (
  <div className="widget">
    <div class="widget__header">
      <h3 class="widget__title">Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>
// MORE CODE
```

![options styled](https://i.imgur.com/KynfNFC.png)

## Side by side
* The old way to do the was to use floats
* But now most all browsers understand `flexbox` and this makes side-by-side a bit easier but you just have to know how flexbox works

### More on Flexbox
* Wes Bos [free Flexbox tutorial videos](https://flexbox.io/)
* [CSS-Tricks flexbox diagrams](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### What do we want to do?
* We want to display all the space evenly inside

![space displayed evenly inside](https://i.imgur.com/uV3fzfN.png)

* We need to have the `widget__header` just be the container for `h3` and the `button`

`Options.js`

```
// MORE CODE
const Options = props => (
  <div>
    <div className="widget__header">
      <h3 className="widget__title">Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>
    </div>
    {props.options.length === 0 && <p>Please add an option to get started</p>}
    {props.options.map(option => (
      <Option
        key={option}
        optionText={option}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);
// MORE CODE
```

* And here we use flexbox

`_widget.scss`

```css
.widget {
  &__header {
    background: $blue;
    color: $off-white;
    display: flex; // add this line
    justify-content: space-between; // add this line
    padding: $m-size;
  }
}
```

* This gives us what we were looking for and our UX should look like this

![flexbox in the house yo!](https://i.imgur.com/6FXHbTK.png)

## Challenge
* Get rid of extra space above the text "Your Options"

`_widget.scss`

```css
.widget {
  &__header {
    background: $blue;
    color: $off-white;
    display: flex;
    justify-content: space-between;
    padding: $m-size;
  }

  &__title {
    margin: 0;
  }
}
```

* Notice when you changed the margin on the `h3` the button on the right moved up too

![no margin](https://i.imgur.com/UO8x2F6.png)

## Add background for content of widget
![bg content widget](https://i.imgur.com/v7W14gb.png)

`_settings.scss`

```
// colors
$off-black: #20222b;
$off-white: #a5afd7;
$light-blue: #464b5e; // add this color
$blue: #3c4251;
$dark-blue: #333745;
$purple: #8357c5;
// MORE CODE
```

`_widget.scss`

```css
.widget {
  background: $light-blue;
  margin-bottom: $xl-size;

  &__header {
    background: $blue;
    color: $off-white;
    display: flex;
    justify-content: space-between;
    padding: $m-size;
  }

  &__title {
    margin: 0;
  }
}
```

`IndecisionApp.js`

```
// MORE CODE
return (
  <div>
    <Header subtitle={subtitle} />
    <div className="container">
      <Action
        handlePick={this.handlePick}
        hasOptions={this.state.options.length > 0}
      />
      <div className="widget">
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    </div>
    <OptionModal
      ariaHideApp={false}
      selectedOption={this.state.selectedOption}
      handleClearSelectedOption={this.handleClearSelectedOption}
    />
  </div>
);
// MORE CODE
```

![bg light blue widget](https://i.imgur.com/zQaQh91.png)

## Challenge
Make message code, "Please add an option to get started!" to look like this:

![message code](https://i.imgur.com/Chnp5FS.png)

### Solution
`_widget.scss`

```
.widget {
  background: $light-blue;
  margin-bottom: $xl-size;

  &__header {
    background: $blue;
    color: $off-white;
    display: flex;
    justify-content: space-between;
    padding: $m-size;
  }

  &__title {
    margin: 0;
  }
  
  // add element below
  &__empty-message {
    border-bottom: 1px solid lighten($light-blue, 10%); 
    color: $off-white;
    margin: 0;
    padding: $l-size;
    text-align: center;
  }
}
```

`Options.js`

```
// MORE CODE
const Options = props => (
  <div>
    <div className="widget__header">
      <h3 className="widget__title">Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleDeleteOptions}
      >
        Remove All
      </button>
    </div>
    {props.options.length === 0 && (
      <p className="widget__empty-message">
        Please add an option to get started
      </p>
    )}
    {props.options.map(option => (
      <Option
        key={option}
        optionText={option}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);

export default Options;
```

* We add the class to the optional `p` tag if there are options in our app
