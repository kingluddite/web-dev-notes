# Props, PropTypes and Prop Defaults
React `props` are a way to initial a Component with some information. The Component can then use that information when rendering itself and now we'll have a dynamic Component instead of a static one

* If every time you created A `TitleBar` Component you had to manually change the `title`, that would get old, quick
* Instead, when we initialize the Component we can pass some data in (_prop_)
* To pass data in as a prop we just have to specify a **key/value** pair
    - The `key` will always be a string (_i.e title, name or age..._) and the **value** can be whatever you like (_string, number, function... any JavaScript type_)

`client/main.js`

```
Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const jsx = (
      <div>
        <TitleBar title={title} /> {/* Add this line */}
        {renderPlayers(players)}
        <AddPlayer />
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```

### Properly using a `prop`
By adding the **key-value** pair inside the Component instance we can then open that Component and use it inside the Component

Currently, `TitleBar.js` has access to the prop but we don't use it so the Component output will not change

**note** When you initialize a Component with `props` those automatically get added to the instance (_this happens behind the scenes and it all is because we added on **React.Component**_)

### How to use props inside the Component's `render()` method
It's easy. There is an object available to you and that is `this.props` and it has all of the `key/value` pairs you passed to it and we can access our with `this.props.title` (_we can reference it above or inside our JSX_)

**TitleBar**

```
import React, { Component } from 'react';

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>{this.props.title}</h1>
       </div>
    );
  }
}

export default TitleBar;
```

* Building Components like this and passing in `props` gives us the ability to easily create and manage our Components

### PropTypes
Specify the type a prop should be

#### Typechecking With PropTypes
[documentation on typechecking](https://www.udemy.com/meteor-react/learn/v4/t/lecture/6083176?start=0)

**Examples**

```
optionalArray: PropTypes.array,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol,
```

### Make prop required
`requiredFunc: PropTypes.func.isRequired`

**TitleBar**

```
import React, { Component } from 'react';

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>{this.props.title}</h1>
       </div>
    );
  }
}

// Add these 3 lines
TitleBar.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default TitleBar;
```

* This now will throw warnings if a `prop` of string is not passed to the Component
* It will not crash the program
* It is currently not enforced by **React**
* It's purpose is to guide us making Components and it helps if we didn't create the Component so it can help us know what we should provide. Also if we built the Component we can guide the users of our Component what they should provide

### Test by removing the title prop
`client/main.js`

Change `<TitleBar title={title} />` to `<TitleBar />`

![propTypes warning](https://i.imgur.com/6wLwqhj.png)

### Fix error after upgrading to React v 15.5.0
You now need to install `prop-types` from **npm** with:

`$ npm i -S prop-types`

And import them when you need to use them:

`import PropTypes from 'prop-types';`

And then make sure you change:

```
TitleBar.propTypes = {
  title: React.PropTypes.string.isRequired
}
```

To this:

```
TitleBar.propTypes = {
  title: PropTypes.string.isRequired
}
```

[Info from Facebook on this change](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html)

# Here is our updated `TitleBar` Component
These changes will finally get rid of that warning

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>{this.props.title}</h1>
       </div>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default TitleBar;
```

### Set default values for props
If someone doesn't provide a `prop` value we can use some value as the `prop` default

```
TitleBar.defaultProps = {
  title: 'Default title'
};
```

With this we could change `TitleBar` to:

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>{this.props.title}</h1>
       </div>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string
}

TitleBar.defaultProps = {
  title: 'Default title'
};

export default TitleBar;
```

And then we could change in `client/main.js` from `<TitleBar title={title} />` to `<TitleBar />` and it will now show `Default title` without any errors

But let's make `PropTypes.string.isRequired` and comment out the default `prop` and just use for reference in case you ever want to add one

* Make sure `client/main.js` has `<TitleBar title={title} />`

### Exercise
* Add another prop called `slogan`
* It should be required
* It should be a string
* Pass into the Component instance the key value for the `slogan`. Make up your own `slogan`
* Inside the Component, code it so the `slogan` outputs to the screen. The `slogan` should be underneath the `title`

<details>
  <summary>Solution</summary>

`TitleBar`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>{this.props.title}</h1>
         <h2>{this.props.slogan}</h2>
       </div>
    );
  }
}

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired
}

// TitleBar.defaultProps = {
//   title: 'Default title'
// };

export default TitleBar;
```

`client/main.js`

```
Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const slogan = 'One contest at a time';
    const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar title={title} slogan={slogan} />
        {renderPlayers(players)}
        <AddPlayer />
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```
</details>

### Behind the scenes
What is actually happening when we have this code:

`<TitleBar title={title} slogan={slogan} />`

To dig into this let's use the **babel repl** [https://babeljs.io](https://babeljs.io)

We will create (_on the left hand side a very simple React Component_)

```
class TitleBar extends React.Component {
  
}
```

Check all the code generated on the right

### Now try this:

```
class TitleBar extends React.Component {
  render() {
    return <p>Test: {this.props.name}</p>;
  }
}
```

* Much of our code is making sure ES6 is available in older browsers
* On the bottom our Component is converted into ES5 function calls so it can be used in older browsers

But this is what we want to focus on:

We add this at the bottom:

`<div></div>` - Just a simple wrapper `div` and look at the output:

```
React.createElement("div", null);
```

And if we add this:

```
<div>
 <p>text</p>
</div>
```

We get a more complex statement using `React.createElement()`

```
React.createElement(
  "div",
  null,
  React.createElement(
    "p",
    null,
    "text"
  )
);
```

But if we add this:

```
<div>
 <p>text</p>
 <Test name="me" />
</div>
```

You'll see this:

```
React.createElement(
  "div",
  null,
  React.createElement(
    "p",
    null,
    "text"
  ),
  React.createElement(Test, { name: "me" })
);
```

* We just have another `React.createElement()` call
    - The first argument is the Component itself
    - The second argument is an object
        + This takes all of our `props` and it converts it into an object with our **key/value** pairs `{ name: "me" }`

## Takeaway
Whether you are rendering an HTML element `div` or a Component `TitleBar`, **React.createElement()** will get called behind the scenes
