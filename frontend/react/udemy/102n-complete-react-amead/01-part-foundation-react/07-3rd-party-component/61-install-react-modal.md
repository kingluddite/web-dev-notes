# Install React Modal

* Run dev server with `$ yarn run dev-server`
* Open `http://localhost:8080`

## Install ReactModal
* [documentation](https://github.com/reactjs/react-modal)
* Sample documentation

```
<Modal
  isOpen={bool}
  onAfterOpen={afterOpenFn}
  onRequestClose={requestCloseFn}
  closeTimeoutMS={n}
  style={customStyle}
  contentLabel="Modal"
>
  <h1>Modal Content</h1>
  <p>Etc.</p>
</Modal>
```

* Notice the nested JSX
* We saw this in our Layout example
    - But instead of <Layout></Layout> (which we wrote) will be <Modal></Modal> which we did not write

## Install Modal locally
`$ yarn add react-modal`

`$ npm i react-modal`

* Rerun `$ yarn run dev-server` or `$ npm run dev-server`

## Where will we put modal code?
* No good place to put it yet
* We need the data from IndecisionApp
  - We could put it directly inside IndecisionApp's render() method
    + But this is not the best idea
    + We will have other components concerned with the presentation and IndecisionApp should focus on the data (and that's what we'll do)

## Create new component for this modal code
* Inside `components` directory create `OptionModal.js`
* `$ touch OptionModal.js`

### default or named import?
* Sometimes the docs aren't helpful
* Best to find code sample in docs page and search for `import` and that usually shows you how to import
* But keep in mind many times this could be a guessing game

`import Modal from 'react-modal'`

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => {
  return {
    <div>
     some text
    </div>
  }
};

export default OptionModal;
```

### Save some typing and use shorthand syntax
* It's just returning JSX so why not? 

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => {
  <div>some text</div>;
}

export default OptionModal;
```

* Above will give you an error
* **note** If you're doing a multi-line implicit return you must use parenthesis and not curly braces
* So this is the proper code:

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => <div>some text</div>;

export default OptionModal;
```

* Also note if you do this you get an error because of the `;` after the `</div>;`
* **note** If you are using eslint the shorthand code is completed automatically which saves you time

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => ( 
  <div>some text</div>;
);

export default OptionModal;
```

## Use the modal
`IndecisionApp.js`

```
// MORE CODE

// custom imports

// MORE CODE
import AddOption from './AddOption';
// 3rd party imports
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
 // MORE CODE 

  render() {
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        // MORE CODE
 
        <AddOption handleAddOption={this.handleAddOption} />
        <OptionModal />
      </div>
    );
  }
}
```

## Test in browser
* View and you should see `some text` in your UX
* It works

## Add Modal
* We want to create a modal that hides and shows values
* **note** requires 2 props:
    - 1) `isOpen` - should the modal start open?
    - 2) `contentLabel` - accessibility for users who have accessibility issues and we need to provide them text that will be intuitive to using this component
        * Does not show up in browser
        * Only shows up for user accessibility enabled

```
// MORE CODE
  render() {
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        // MORE CODE

        <AddOption handleAddOption={this.handleAddOption} />
        <OptionModal
          ariaHideApp={false}
        />
      </div>
    );
  }
}
```

`OptionModal.js`

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => (
  <Modal isOpen={true} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

## Houston we have a problem - we get an error in the browser
* Ugh... bugs!
* Here is the error

```
warning.js?d96e:34 Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`. This is needed so screen readers don't see main content when modal is opened. It is not recommended, but you can opt-out by setting `ariaHideApp={false}`.
```

* There were some bugs with this code and added the necessary props to fix it
* One problem with 3rd party apps is they update their API and you need to read the documentation if old code breaks
* You should see an open modal 

`OptionModal.js`

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OptionModal = () => (
  <Modal isOpen={true} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

## Houston we have another problem!
* It works and the Modal window is open... but there is now way to close it yet!

### Quick fix
* Change `isOpen={false}` inside `OptionModal` and the modal will disappear
    - But this is a static change

#
```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OptionModal = () => (
  <Modal isOpen={false} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

## We need to make it dynamic and we can do this via `props`
* Instead of using the static `true` or `false` we want to get access to a prop via `props`
* That prop value will determine if the Modal should stay open or not
* We will need to keep track of one more piece of `state`
* Currently IndecisionApp only tracks the list of options
* We also want to track the selectedOption
  - It will be set to undefined as the default since the Modal won't be showing right away

`IndecisionApp.js`

```
// MORE CODE

import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

// MORE CODE
```

## Now we'll pass it down into our OptionModal

* The modal won't be selected by default so we set it to `undefined` at default

```
        <OptionModal
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}
```

`OptionModal.js`

* Now we grab that prop like this (in component it was passed down to)

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OptionModal = props => (
  <Modal isOpen={props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

## We need to look at the value of props.selectedOption
* `props.selectedOption` will return `undefined` or a string and we can convert that to a **true boolean** using `!!`

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OptionModal = props => (
  <Modal isOpen={!!props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

### What does "true booleans" mean?
* It does not mean `true` or `false`
  - `undefined` is not a **boolean**
  - Or a string with "some text" is not a **boolean**

#### Let's dive deep to see true boolean values
* Here is the input/output from the Chrome console
* [good read explaining it](https://www.bennadel.com/blog/1784-using-double-not-operator-for-boolean-type-casting.htm)
  - Using Double Not-Operator (!!) For Boolean Type Casting
  - Use of the double not-operator (!!) to convert truthy / falsey values into strict Boolean data types
  - **Great explanation** The not-operator (`!`) takes true values and makes them false or false values and makes them true
  - When you apply this operator to a piece of data, Javascript must type-cast that piece of data to a Boolean value before it can "not" it
  - By using the double not-operator, you allow the first one to make the data-type cast and not-conversion; and then, you use the second not-operator to flip the resultant Boolean back to the appropriate value


```
> undefined
< undefined
> "text"
< "text"
> !!"text"
< true
> !!""
< false
> !!undefined
< false
> !!null
< false
> !!1
< true
> !!0
< false
```

```
// MORE CODE
const OptionModal = props => (
  <Modal isOpen={!!props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

### Test it out
* Add an option
* Click on `What should I do?` button
* Currently, the selectedOption does not get selected

#### Challenge
* You want to make the `What should I do button` make the Modal appear
* `handlePick()` is the method that shows a randomly selected option in an alert window
* `selectedOption` is `undefined` and how can you change it to true if an option is selected?
* You want to set the state in handlePick() and remove the alert call

#### Solution
`IndecisionApp.js`

```
handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
    }));
    // console.log(this.state.selectedOption);
  };
```

## View in browser
* Click `What should I do` and the modal appears

## How can we render the OptionModal text?
* We'll use the `&&` to make this possible
* We want to show the randomly selected option text inside the modal

`OptionModal.js`

```
const OptionModal = props => (
  <Modal isOpen={!!props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
  </Modal>
);
```

## How can we close the button?
### Challenge
* Create a new event handler in `IndecisionApp` that clears the `selectedOption` **state** (set it back to `undefined`)
* Pass that event handler function into `OptionModal` and call it on button click

#### Solution
```
// MORE CODE
export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };
// MORE CODE
```

* Now pass the function down into `OptionModal`

```
// MORE CODE
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

* Now add the `onClick` event to `OptionModal`

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OptionModal = props => (
  <Modal isOpen={!!props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearSelectedOption}>Okay</button>
  </Modal>
);

export default OptionModal;
```

## Test
* Click to open modal
* Show dynamic text
* Close modal
* If it all works you have a functioning Modal

### Add useful feature that people will expect of modals
* When user clicks `esc` key or click outside modal that is a traditional way to close the modal
* We can piggy back those events onto our existing event handler using Modal's `onRequestClose` prop

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearSelectedOption}>X</button>
  </Modal>
);

export default OptionModal;
```

* That is an improvement in UX
