# Install React Modal
* Make your `app.js` look like this:

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

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

* Rerun `$ yarn run dev-server`

## Create new component for this modal code
* Inside `components` directory
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

### Save some typing and use shortand syntax
* It's just returning JSX so why not

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => {
  <div>some text</div>;
};

export default OptionModal;
```

* Above will give you an error
* If you're doing a multi-line implicit return you must use parenthesis and not curly brackets
* So this is the proper code:

```
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => <div>some text</div>;

export default OptionModal;
```

* Also note if you do this you get an error because of the `;` after the `</div>`

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
import React from 'react';

// custom imports
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
// 3rd party imports
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
 // MORE CODE 

  render() {
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header subtitle={subtitle} />
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
        <OptionModal />
      </div>
    );
  }
}
```

* View and you should see `some text` in your UX
* It works

## Add Modal
* requires 2 props:
    - 1) `isOpen` - should the modal start open?
    - 2) `contentLabel` - accessibilty for users who have accessibility issues and we need to provide them text that will be intuitive to using this component
        * Does not show up in browser
        * Only shows up for user accessiblity enabled

```
// MORE CODE
  render() {
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header subtitle={subtitle} />
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

Modal.setAppElement('#app');

const OptionModal = () => (
  <Modal isOpen={true} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

* There were some bugs with this code and added the necessary props to fix it
* One problem with 3rd party apps is they update their API and you need to read the documenation if old code breaks
* You should see an open modal but there is now way to close it yet
* Change `isOpen={false}` inside OptionModal and the modal will disappear
    - But this is a static change
    - We need to make it dynamic and we can do this via `props`

```
const OptionModal = (props) => (
  <Modal isOpen={false} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);
```

## selectedOptions
* We are already checking `options`
* But we also need to check `selectedOption`

`IndecisionApp.js`

```
// MORE CODE
export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };
// MORE CODE
```

* The modal won't be selected by default so we set it to `undefined` at default

```
        <OptionModal
          ariaHideApp={false}
          selectedOption={this.state.selectedOption}
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

Modal.setAppElement('#app');

const OptionModal = props => (
  <Modal isOpen={props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
  </Modal>
);

export default OptionModal;
```

* now `props.selectedOption` will return `undefined` or a string and we can convert that to a **true boolean** using `!!`

### What does "true booleans" mean?
* It does not mean `true` or `false`
* `undefined` is not a boolean
* Or a string with "some text" is not a boolean
* Here is the input/output from the Chrome console
* 
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
* Currenlty, the Selected option does not get selected

#### Challenge
* You want to make the `What should I do button` make the Modal appear
* `handlePick()` is the method that shows a randomly selected option
* `selectedOption` is undefined and how can you change it to true if an option is selected?

#### Solution
`IndecisionApp.js`

```js
handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option,
    }));
    // console.log(this.state.selectedOption);
  };
```

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
* Create a new event handler in IndecisionApp that clears the selectedOption state (set it back to `undefined`)
* Pass that event handler function into OptionModal and call it on button click

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

* Now pass the function down into OptionModal

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

* Now add the onClick event to `OptionModal`

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const OptionModal = props => (
  <Modal isOpen={!!props.selectedOption} contentLabel="Selected Option">
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button handleClearSelectedOption={props.handleClearSelectedOption}>X</button>
  </Modal>
);

export default OptionModal;
```

## Test
* Click to open modal
* Show dynamic text
* Close modal
* If it all works you have a funcitioning modal

### Add feature
* When user clicks `esc` key or click outside modal that is a traditional way to close the modal
* We can piggy back those events onto our existing event handler using Modal's `onRequestClose` prop

```
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

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
