# Theming with Variables
* We want to create a file that will hold all of our common settings that we may use in multiple places
* This way we could modify one file and all the common settings would update

## New file: _settings.scss

`src/styles/base/_settings.scss`

```
// colors
$off-black: #20222b;
$off-white: #a5afd7;

// Spacing
$m-size: 1.6rem;
```

* We can use variables and spacing

`_base.scss`

```
html {
  font-size: 62.5%
}
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
}

h1 {
  font-size: 2.4rem;
}
```

`_header.scss`

```
.header {
  background: $off-black;
  color: #ffffff;
  margin-bottom: $xl-size;
  padding: $m-size 0;

  &__title {
    font-size: $l-size;
    margin: 0;
  }

  &__subtitle {
    color: $off-white;
    font-size: $m-size;
    font-weight: 500;
    margin: 0;
  }
}
```

### Style a container
`src/styles/components/_container.scss`

```css
.container {
  max-width: 60rem;
  margin: 0 auto;
}
```

* Import `_container.scss`

```
@import './base/settings';
@import './base/base';
@import './components/container';
@import './components/header';
```

* The order of partials inside the `components` directory doesn't matter
* So just order them alphabetically

## Apply our container class
* We don't want the `header` to be centered as we want to stretch that across the browser
* So we'll nest a `div` and use that to center our content
* By adding the class to that `div`:

`Header.js`

```
import React from 'react';

const Header = props => (
  <header className="header">
    <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
    </div>
  </header>
);

Header.defaultProps = {
  title: 'Indecision',
};

export default Header;
```

* That will nicely center the content inside our `Header` component

![header component centered nicely](https://i.imgur.com/xOItqwS.png)

* If we drag to make the browser window very narrow we see we need some padding:

`_container.scss`

```
.container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 $m-size; // add this line
}
```

## Style the content in our app
![body centered content](https://i.imgur.com/Fu71z8S.png)

* We need to use that container in our Actions, Options and AddOptions
* Just add a new `div` and nest those 3 components inside and give that `div` a **className** of `container`

`IndecisionApp`

```
// MORE CODE
render() {
  const subtitle = 'My computer is my BFF';

  return (
    <div>
      <Header subtitle={subtitle} />
      <div className="container">
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
      <OptionModal
        ariaHideApp={false}
        selectedOption={this.state.selectedOption}
        handleClearSelectedOption={this.handleClearSelectedOption}
      />
    </div>
  );
}
}
```

* That will center those Components by reusing our `.container` class

### Challenge
* Create a new variable of #333745 with a name of `dark-blue`
* Make it the bg of the body element

`_base.scss`

```
html {
  font-size: 62.5%
}
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
  background-color: $dark-blue;
}

h1 {
  font-size: 2.4rem;
}
```

* And update `_settings.scss`

```
// colors
$off-black: #20222b;
$off-white: #a5afd7;
$dark-blue: #333745; // add this line

// Spacing
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;
```

![add bg color](https://i.imgur.com/uu9KeDr.png)

## Tip
* Organize styles in alphabetical order by property
* Stylelint and [stylelint-order](https://github.com/hudochenkov/stylelint-order) can help automate this

`$ yarn add stylelint stylelint-order`

* Create `.stylelintrc`

```
{
    "plugins": [
        "stylelint-order"
    ],
    "rules": {
        "order/order": [
            "custom-properties",
            "declarations"
        ],
        "order/properties-alphabetical-order": true
    }
}
```


