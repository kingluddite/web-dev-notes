# One Component per file
* **best practice** One component per file
    - Keeps files small
    - Easier to search
    - Easier to scale
    - Easier to test 

## Delete these files
* person.js
* utils.js

## Working version of app.js
* We'll copy the content of `src/playground/app.js` and override all the code in `src/app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({
          options,
        }));
      }
    } catch (e) {
      // do nothing at all!
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount fired!');
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleDeleteOptions() {
    this.setState(() => ({
      options: [],
    }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option),
    }));
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter a valid value to add option';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists. Please enter another Item';
    }

    this.setState(prevState => ({
      options: prevState.options.concat([option]),
    }));
  }

  render() {
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
);

Header.defaultProps = {
  title: 'This is my default title!',
};

const Action = props => (
  <div>
    <button onClick={props.handlePick} disabled={!props.hasOptions}>
      What should I do?
    </button>
  </div>
);

const Option = props => (
  <div>
    {props.optionText}
    <button
      onClick={e => {
        props.handleDeleteOption(props.optionText);
      }}
    >
      Remove
    </button>
  </div>
);

const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    <p>Options Text</p>
    {props.options.length === 0 && (
      <p>Currently no options. Please add one to get started</p>
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

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      error: undefined,
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    this.setState(() => ({
      error,
    }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

## components directory
* Create `src/components/`

### When naming files for components
* Give it the same name as the component itself (common naming convention in React)

### Make sure to export the components
* After you create them make sure you give them `default` exports
  - We could use named exports but since we are just exporting one thing it makes sense to use a default export
* And make sure you import them into app.js
* Make sure you import the `react` 3rd party module at the top of every component

## AddOptions
```
import React from 'react';

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined,
    };
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
```

* **note** You can use export `default` like above for classes only
* You can't do this for SFCs

## Option
```
const Option = props => {
  return (
    <div>
      <p>
        {props.optionText}{' '}
        <button
          onClick={() => {
            props.handleDeleteOption(props.optionText);
          }}
        >
          remove
        </button>
      </p>
    </div>
  );
};

export default Option;
```

## Don't forget to import React
* **note** There is no visual sign that React was used above but you need to import React here or you will get an error
  - Why?
    + The reason is this file has JSX and we need react to convert it into JavaScript
* **notes**
  + In some modern frameworks like `Next` or `Gatsbyjs` you will see that this import is optional
  + Some of these frameworks also make using `semi-colons` optional

```
import React from 'react';

const Option = props => {
  return (
    <div>
      <p>
        {props.optionText}{' '}
        <button
          onClick={() => {
            props.handleDeleteOption(props.optionText);
          }}
        >
          remove
        </button>
      </p>
    </div>
  );
};

export default Option;
```

## Action
```
import React from 'react';

const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};

export default Action;
```

## Header
```
import React from 'react';

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecison',
};

export default Header;
```

## Options
```
import React from 'react';

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
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
};

export default Options;
```

## Test it out in the browser
* Your app should work just as it did before
* Remember you can't export `const` variables like this:

`export default const Option = (props) => {`

## Bad Anonymous Components
* This will be hard to test in React Dev tools as the the code is minified so you are just getting 1 letter components
  - **UPDATE** - With the new React dev tools this is no longer an issue both ways of exports (shortcut or long way) both show name of component

## React dev tools issue
* If you look at the component names they are just 1 letter and hard to know what they are, this is because of minification
* We will fix this when we learn about sourcemaps (very soon!)

## Houston we have a problem
* You get an error when you try to add an `option`
* The reason is `Option` needs to be imported inside Options because that's where it is used

## Options
```
import React from 'react';
import Option from './Option';

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
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
};

export default Options;
```

* Now you can successfully add options
* Noticed the path to the `Option` component changed

## App.js
`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

## IndecisionApp
```
import React from 'react';

import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // do nothing
      // fallback to empty array which is the default value
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      // convert our json object into a string
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('IndecisionApp Component did unmount');
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option),
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(option);
  }

  handleAddOption(option) {
    // only run if there is an empty string
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    // we have two returns above so we don't need to use an else
    // here
    this.setState(prevState => ({
      options: prevState.options.concat(option),
    }));
  }

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
      </div>
    );
  }
}
```

## app.js
* Should be a small file
* In charge of bootstrapping things

## Next - Adding source maps
* Let you know where your code is coming from
