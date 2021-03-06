# Refactor Other Stateless Functional Components
* Action
* Header
* Option
* Options

## eslint
* Since we are using eslint we won't have to make this change but if you were not, please update the following

`Action.js`

```
import React from 'react';

const Action = props => (
  <div>
    <button onClick={props.handlePick} disabled={!props.hasOptions}>
      What should I do?
    </button>
  </div>
);

export default Action;
```

`Header.js`

```
import React from 'react';

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
);

Header.defaultProps = {
  title: 'Indecison',
};

export default Header;
```

`Option`

```
import React from 'react';

const Option = props => (
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

export default Option;
```

`Options`

```
import React from 'react';
import Option from './Option';

const Options = props => (
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

export default Options;
```

