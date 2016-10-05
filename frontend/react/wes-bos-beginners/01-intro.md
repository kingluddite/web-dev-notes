# Getting Started
Need Node.js (download latest version)

Do I have node?
`$ node -v`

I did that and my version on 10/03/2016 was
`\v6.2.2`

After updating brew

You need React Developer tools
available for Chrome and Firefox

starter files
[react for beginners](https://github.com/wesbos/React-For-Beginners-Starter-Files)

[demo page](http://catchoftheday.wesbos.com/store/ugliest-unsightly-criteria)

[VIDEO - using Emmet with JSX and Sublime](https://www.youtube.com/watch?v=JTHM077EHbI)

Writing 
JSX and ES6
[using atom and babel ES6 syntax package](https://atom.io/packages/language-babel)

iTerm2
[hyperterm](https://hyperterm.org/#installation)

Windows [cmder.net](http://cmder.net)

quickly get to folder
open terminal
`$ cd ` - then drag drop finder folder into terminal and it will add the correct path

create-react-app


## Error
When returning from ES6 class
must be inside one parent element

In JSX must close self closing HTML tags `<img /> <br /> <input />`

## Comments in JSX
`{ /* comment here */ }`

```jsx
class StorePicker extends React.Component {
  render() {
    // test comment
    return (
      <form className="store-selector">
        { /* test comment */ }
       <h2>Please enter a store</h2>
         <input type="text" required placeholder="Store Name" />
         <button type="submit">Visit Store </button>
      </form>
    )
  }
}
```

convert from class to `Stateless Functions`

as a class

```
import React from 'react';

class Header extends React.Component {
  render() {
    console.log(this);
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline">{this.props.tagline}</h3>
      </header>
    )
  }
}

export default Header;
```

end

```
import React from 'react';

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

export default Header;
```

**note** if you are passing a number, variable or boolean you need to use the `{}` and strings use `""`

**note** ES6 classes DO NOT have commas after the methods inside the class

## Context Types

To access the router you need to use Context Types

```jsx
StorePicker.contextTypes = {
  router: React.PropTypes.object
}
```

## interpolation with JSX

* using `''` or back ticks `\`\` 

```js
goToStore(event) {
    event.preventDefault();
    console.log( 'you changed the URL' );
    // first grab the text from thez box
    const storeId = this.storeInput.value;
    console.log( `Going to ${storeId}` );
    // second we're going to transition from / to /store:/storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }
```


