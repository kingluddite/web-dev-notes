# Big Button
![big btn](https://i.imgur.com/jXArGlx.png)

## Add the class name to JSX
`/src/styles/components/_button.scss`

* **note** `class` vs `className`

```
import React from 'react';

const Action = props => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      What should I do?
    </button>
  </div>
);

export default Action;
```

## Creat the file and add the .scss
`src/styles/_button.scss`

```
.big-button {
  background: $purple;
}
```

## Import the rule
```
@import './base/settings';
@import './base/base';
@import './components/button'; // add this rule
@import './components/container';
@import './components/header';
```

![purple big button](https://i.imgur.com/Jl790xI.png)

## Sass built in function
```
darken($color, $amount);
```

* Returns the color

`_button.scss`

```
.big-button {
  background: $purple;
  border: none;
  border-bottom: 0.6rem solid darken($purple, 10%); // add this line
}
```

![darken bottom border](https://i.imgur.com/mV4YQ7M.png)

* [Read More on Sass built-in functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

```
.big-button {
  background: $purple;
  border: none;
  border-bottom: 0.6rem solid darken($purple, 10%);
  color: white; // add
  font-weight: bold; // add
  font-size: $l-size; // add
}
```

### Adjust the spacing of the button
```
.big-button {
  background: $purple;
  border: none;
  border-bottom: 0.6rem solid darken($purple, 10%);
  color: white;
  font-size: $l-size;
  font-weight: bold;
  margin-bottom: $xl-size; // add
  padding: 2.4rem; // add
  width: 100%; // add take up full width of container
}
```

![button with spacing](https://i.imgur.com/LdeGYSP.png)

## Style the state of the button
* faded if not clickable, regular if clickable

```
.big-button {
  background: $purple;
  border: none;
  border-bottom: 0.6rem solid darken($purple, 10%);
  color: white;
  font-size: $l-size;
  font-weight: bold;
  margin-bottom: $xl-size;
  padding: 2.4rem;
  width: 100%;

  &:disabled { // add this part
    opacity: 0.5;
  }
}
```

## Global setting for buttons
* All buttons when clickable will have a `pointer` cursor
* All disabled buttons will be the default cursor (arrow)
* This will be good to add it to your `_base.scss` file

`_base.scss`

```
html {
  font-size: 62.5%
}
body {
  background-color: $dark-blue;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
}

h1 {
  font-size: 2.4rem;
}
// add the code below this line
button {
  cursor: pointer;
}

button:disabled {
  cursor: default;
}
```

* In Chrome Elements tab, remove the `disabled` attribute of the `button` element
    - To see the affects of the button in both states

![disabled button](https://i.imgur.com/mgln5mE.png)

* A better way it to use the app to add options to see the button state change
* Remove all options to see the disabled state of the button

## A better way with BEM
* We have a disabled button
* We have a big button
* We have a regular button
* We can use BEM to organize this a lot better

`Action.js`

```
import React from 'react';

const Action = props => (
  <div>
    <button
      className="button button--large"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      What should I do?
    </button>
  </div>
);

export default Action;
```

`AddOption.js`

```
// MORE CODE
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}
```

`Options.js`

```
// MORE CODE
const Options = props => (
  <div>
    <button className="button button--link" onClick={props.handleDeleteOptions}>
      Remove All
    </button>
// MORE CODE
```

`Option.js`

```
// MORE CODE
const Option = props => (
  <div>
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

`_buttons.scss`

```
.button {
  background: $purple;
  border: none;
  border-bottom: 0.3rem solid darken($purple, 10%);
  color: white;
  font-weight: 500;
  padding: $s-size;

  &--large {
    background: $purple;
    border: none;
    border-bottom: 0.6rem solid darken($purple, 10%);
    color: white;
    font-size: $l-size;
    font-weight: bold;
    margin-bottom: $xl-size;
    padding: 2.4rem;
    width: 100%;
  }

  &--link {
    background: none;
    border: none;
    color: $off-white;
    padding: 0;
  }

  &:disabled {
    opacity: 0.5;
  }
}
```

