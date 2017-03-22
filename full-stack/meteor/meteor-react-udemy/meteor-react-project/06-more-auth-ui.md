# More Authentication UI
`client/components/Accounts.js`

```
componentDidMount() {
    // Render the Blaze accounts form then find the div
    // we just rendered in the 'render' method and place
    // the Blaze accounts form in that div
  }

  componentWillUnMount() {
    // Go find the forms we created and destroy them
    // We need to clean up those forms ourselves
    // if we manually adjusted the DOM
  }
```

### Add our imports
```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
```

* We need react-dom because we will need access to the `div` on this page
* Blaze is a library that can render templates provided by Meteor

###
We will now use the Blaze library to render an instance of the Login Buttons template to the `div` that we created down in the `render()` method of our Accounts component

Meteor ships with all the logic to show authentication login forms on the screen and we want to reuse all that logic

```
componentDidMount() {
    // Render the Blaze accounts form then find the div
    // we just rendered in the 'render' method and place
    // the Blaze accounts form in that div
    this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
  }
```

* `this.view` - whenever we render a blaze template it returns a reference to the template that was rendered
    - The only reason we are saving this reference is so that later on we can clean up that template that got rendered to the DOM
* Meteor ships with template forms. One of them is `Template.loginButtons`
    - We take this template and a reference to a DOM node and we call Blaze.render() with both of those arguments

### Update our div
Change to:

```
render() {
    return (
       <div ref="container"></div>
    );
  }
```

* Now we can use this:

`ReactDOM.findDOMNode(this.refs.container)`

And that will point to our Accounts `div` container

```
componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
  }
```

* Now when component first renders it will create a div with a `ref` of `container` and stick it into the DOM
* `componentDidMount()` will then fire
* Blaze will take the `loginButton`, find the DOMNode ref of `.container` and render that template into that `div`
* Lastly we save a reference of that code inside `this.view`

## Cleaning up view
When our component is about to unmount we need to clean up our view

```
componentWillUnMount() {
    Blaze.remove(this.view);
  }
```

* This is a little bit of 'garbage collection'
* This makes sure we have no stray DOM fragments in our DOM
* This will also clean up any events that were set up and event handlers

### Add Accounts to Header component
* We import Accounts

`import Accounts from './Accounts';`

And replace this code:

`<a href="#">Sign up</a>`

With this code:

`<Accounts />`

### Final code
```
import React, { Component } from 'react';
import Accounts from './Accounts';

class Header extends Component {
  render() {
    return (
       <nav className="nav navbar-default">
         <div className="navbar-header"><a href="" className="navbar-brand">Markbin</a>
         </div>
         <ul className="nav navbar-nav">
           <li>
             <Accounts />
           </li>
           <li>
             <a href="#">Create Bin</a>
           </li>
         </ul>
       </nav>
    );
  }
}

export default Header;
```

### View in browser

![Accounts in our app](https://i.imgur.com/gYbjRVH.png)

* It looks ugly but it is working
    - I can create an account
    - I can login
    - I can reset my password

### Create our first user
* Email of `test@example.com`
* Password of `password`

**note** What we are seeing is the default Blaze accounts UI

The Meteor application believes us now to be authenticated and it is a very secure method of authentication

### Adding a little style
`client/main.css`

```css
#login-buttons {
    margin: 18px;
    font-size: 14px;
}
```

Looks better now with:

![some style](https://i.imgur.com/nB9GKe0.png)


