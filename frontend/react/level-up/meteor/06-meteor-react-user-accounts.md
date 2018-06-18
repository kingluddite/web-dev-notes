# Meteor User Accounts

Add these two packages to the `.packages` file

```
accounts-ui
accounts-password
```

This example uses the Blaze Template User Accounts

Create a new file

`imports/us/components/AccountsUI.js`

```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class AccountsUI extends Component {

  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
        ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmound() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref="container" />
  }
}
```

Update the MainLayout component with:

```js
import React from 'react';
import ResolutionsWrapper from '../components/ResolutionsWrapper';
import AccountsUI from '../components/AccountsUI';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
       <h2>My Resolutions</h2>
       <nav>
         <a href="/">Resolutions</a>
         <a href="/about">About</a>
         <AccountsUI />
       </nav>
    </header>
    <main>
      <ResolutionsWrapper />
    </main>
  <footer>
    <p>&copy 2016</p>
  </footer>
  </div>
)
```

Now you can log in and create an account
After doing that type this in the console and you will see the currently logged in user's id

`Meteor.userId()`

So when you log in and create a Resolution we want that resolution attached to that user

update your addResolution method

```js
Meteor.methods({
  addResolution(resolution) {
    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },
  toggleResolution(id, status) {
    Resolutions.update(id, {
      $set: { complete: !status}
    });
  },
  deleteResolution(id) {
    Resolutions.remove(id);
  }
});
```

Notice we added 'user: Meteor.userId()'
* that is what ties the resolution to the user!

enter a record and use meteortoys to see how the user id is in the resolution document

meteor toys show us we now have a user collection populated with a user

![user in meteortoys](https://i.imgur.com/Ar4SDVG.png)

and we insert a new resolution and look at how the user id is now associated with that resolution

![user id in resolution](https://i.imgur.com/Ar4SDVG.png)

### stop users who are not logged in, from inserting resolutions

```js
Meteor.methods({
  addResolution(resolution) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }

    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date(),
      user: Meteor.userId()
    });
  },
  toggleResolution(id, status) {
    Resolutions.update(id, {
      $set: { complete: !status}
    });
  },
  deleteResolution(id) {
    Resolutions.remove(id);
  }
});
```

now when logged in enter a resolution. it enters no problem
open a new incognito window and try to enter a resolution and it won't let you (because you are not logged in)

## Hide all resolutions not created by current user to be visible

look at this
`return Resolutions.find({user: this.userId});`
why are we using `this.userId` and not Meteor.userId()?

everywhere in meteor except for published functions you will use `Meteor.userId()` but we user this.userId to get the current User's id

so this:

```js
Meteor.publish('userResolutions', function() {
  return Resolutions.find({user: this.userId});
});
```

we are looking for all resolutions where the user id equals the current user that is logged in

server/publish.js

```js
Resolutions = new Mongo.Collection('resolutions');

Meteor.publish('allResolutions', function() {
  // return Resolutions.find({complete: false});
  return Resolutions.find();
});

Meteor.publish('userResolutions', function() {
  return Resolutions.find({user: this.userId});
});
```

and make this adjustment to `imports/ui/components/ResolutionsWrapper.js`

```js
export default class ResolutionsWrapper extends TrackerReact(React.Component) {
 constructor() {
   super();

   this.state = {
     subscription: {
       resolutions: Meteor.subscribe('userResolutions')
     }
   }
 }
... more code here
```

and if you look at meteortoys you see you only have access to your own resolutions

now if you log out you will see resolutions that were created with no user id, so delete them

### have the current user update their own resolutions

### ResolutionSingle.js
Now we are passing our methods the entire resolution object
```js
toggleChecked() {
    // console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteResolution () {
    Meteor.call('deleteResolution', this.props.resolution);
  }
```

and on our server `server/methods.js` we update by passing in the resolution object

```js
toggleResolution(resolution) {
    Resolutions.update(resolution._id, {
      $set: { complete: !resoluton.complete}
    });
  },
  deleteResolution(resolution) {
    Resolutions.remove(resolution._id);
  }
```

why did we just do that?
to have access to the user

this is just an added layer of security, even if they had our user id they could not update or delete the resolution

```js
toggleResolution(resolution) {
    if(!Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not authorized');
    }
    Resolutions.update(resolution._id, {
      $set: { complete: !resoluton.complete}
    });
  },
  deleteResolution(resolution) {
    if(!Meteor.userId() !== resolution.user) {
      throw new Meteor.Error('not authorized');
    }
    Resolutions.remove(resolution._id);
  }
```

we make sure the right person has access to the right things

## Conditionals In JSX
[video #13](https://www.youtube.com/watch?v=4WoN8tuEegQ&list=PL6klK99EwGXj6IED7wO8V9nJJIj4_vpDh&index=13)

### ResolutionSingle.js
When you check the checkbox it will add a class and that class will make the font greyed out

```js
import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

  toggleChecked() {
    // console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteResolution () {
    Meteor.call('deleteResolution', this.props.resolution);
  }
  render() {
    const resolutionClass = this.props.resolution.complete ? 'checked' : '';

    return (
      <li className={resolutionClass}>
        <input type="checkbox"
          readOnly={true}
          checked={this.props.resolution.complete}
          onClick={this.toggleChecked.bind(this)} />
        {this.props.resolution.text}
        <button className="btn-cancel" onClick={this.deleteResolution.bind(this)}>&times;</button>
      </li>
    )
  }
}
```

make transition fade affect on text when resolution checked

(stylus)

```stylus (css)
li
        font-size 2em
        margin-bottom 8px
        trans()
        input
            margin-right 10px
        &.checked
            color #CCC
```

### Best Practice
Keep conditionals outside of return statement

`ResolutionSingle.js`

```js
import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

  toggleChecked() {
    // console.log(this);
    Meteor.call('toggleResolution', this.props.resolution);
  }

  deleteResolution () {
    Meteor.call('deleteResolution', this.props.resolution);
  }
  render() {
    const resolutionClass = this.props.resolution.complete ? 'checked' : '';
    const status = this.props.resolution.complete ? <span className="completed">Completed</span> : '';

    return (
      <li className={resolutionClass}>
        <input type="checkbox"
          readOnly={true}
          checked={status}
          onClick={this.toggleChecked.bind(this)} />
        {this.props.resolution.text}
        {status}
        <button className="btn-cancel" onClick={this.deleteResolution.bind(this)}>&times;</button>
      </li>
    )
  }
}
```

## Meteor Session Data
Creating our 2nd route and Meteor Session Variables

Our state we set in ResolutionWrapper is only available to that component

Our login is using a Session Variable
meteortoys show us

## What is JetSetter?
Shows us all of our Session variables

example
dropdownVisible = false
you can see it change to true if you click on login user name (and the drop down appears)

Session variables in Meteor are site wide
and last for the entire Session
If you refresh the page you will see the session variable goes away

Session variables are great way to handle menu toggles

You can create your own session variables in Meteor and access them with react

## Routes

```js
import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Navigation } from './Navigation';
import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';

Resolutions = new Mongo.Collection('resolutions');

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
 constructor() {
   super();

   this.state = {
     subscription: {
       resolutions: Meteor.subscribe('userResolutions')
     }
   }
 }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  resolutions() {
    // find all resolutions
    return Resolutions.find().fetch()
  }

  render() {
    let res = this.resolutions();
    console.log(this.props.children);

    return (
      <div>
        <h1>My Resolutions - {Session.get('test')}</h1>
        <Navigation />
        {this.props.children}
        <ResolutionsForm />
        <ul className="resolutions">
          {this.resolutions().map( (resolution)=>{
            return <ResolutionSingle key={resolution._id} resolution={resolution} />
          })}

        </ul>
      </div>
    )
  }
}
```

`About.js`

```js
import React, {Component} from 'react';

export default class About extends Component {

  setVar() {
    Session.set('test', 'Hello');
  }

  render() {
    return (
      <div>
        <h1>About Us</h1>
        <p>Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button onClick={this.setVar}>Click Me</button>
      </div>
    )
  }
}
```

## repaired router page

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Match, Miss } from 'react-router';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from '../../ui/layouts/MainLayout';
import About from '../../ui/pages/About';
import ResolutionsWrapper from '../../ui/components/ResolutionsWrapper';

import { Index } from '../../ui/components/Index';

import { One } from '../../ui/pages/One';
import { Two } from '../../ui/pages/Two';
import { Hello } from '../../ui/pages/Hello';
import { NotFound } from '../../ui/pages/NotFound';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ MainLayout }>
        <IndexRoute component={ ResolutionsWrapper } />
        <Route path="/index" component={ Index } />
        <Route path="/one" component={ One } />
        <Route path="/two" component={ Two } />
        <Route path="/about" component={ About } />
        <Route path="/hello/:name" component={ Hello } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'app' )
  );
});
```

Link is important in react to not have a page refresh

### MainLayout.js
I needed to add the Link elements to replace the A elements (anchor tags) and then make sure to import the Link module from react-router

```js
import React from 'react';
import {Link} from 'react-router';

import ResolutionsWrapper from '../components/ResolutionsWrapper';
import AccountsUI from '../components/AccountsUI';

class MainLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="main-layout">
          <header>
             <h2>My Resolutions</h2>
             <nav>
               <Link to="/">Resolutions</Link>
               <Link to="/about">About</Link>
               <AccountsUI />
             </nav>
          </header>
               <main>
                 {this.props.children}
               </main>
             <footer>
               <p>&copy; 2016</p>
             </footer>
        </div>
    )
  }
}

export default MainLayout;
```
No if you browse to the About page and click on the 'click me' button you will set a session called test with a value of Hello

use meteortoys to see this

Also if you click back to the Resolutions page, you will see the heading is now 'My Resolutions - Hello' because we are getting the global session variable we set on the About page (when we clicked the button)

### make login dropdown visible on button click

```js
import React, {Component} from 'react';

export default class About extends Component {

  setVar() {
    Session.set('Meteor.loginButtons.dropdownVisible', true);
  }

  render() {
    return (
      <div>
        <h1>About Us</h1>
        <p>Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button onClick={this.setVar}>Show Login</button>
      </div>
    )
  }
}
```
**when meteor updates** it doesn't do a hard refresh, so you need to hit `ctrl` + `r`

session variables are per user
so if you have a session varaible, the only person that will see it is the user using the site
juxtapose that with entering a document. all users will see that (if they have the permissions as the same time).

if you want something locked into your component, use state

if you want something global use sessions

#video #15
video [link](https://www.youtube.com/watch?v=0W1UiTRkIUQ&index=15&list=PL6klK99EwGXj6IED7wO8V9nJJIj4_vpDh)
Notifications & Improving Your User Experience

add this package `themeteorchef:bert`

currently this:

```js
if(!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }
```

does not show our Error
Bert will show our error in a nice stylized way

on client side, change this:

```js
Meteor.call('addResolution', text, ()=>{
      this.refs.resolution.value = '';
    });
```

to this:

Meteor.call('addResolution', text, ()=>{
      this.refs.resolution.value = '';
    });

[Bert documentation](https://github.com/themeteorchef/bert)

`ResolutionSingle.js`

```js
import React, {Component} from 'react';
// import { render } from 'react-dom';
export default class ResolutionsForm extends Component {
  addResolution(event) {
    event.preventDefault();
    let text = this.refs.resolution.value.trim();

    Meteor.call('addResolution', text, (error, data)=>{
      if(error) {
        Bert.alert('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        this.refs.resolution.value = '';
      }
    });

  }

  render() {

    return (
      <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
       <input
         type="text"
         ref="resolution"
         placeholder="Ride Bike"
       />
      </form>
    )
  }
}
```

now logged in user can enter resolutions, no problems
open incognito browser and you will get an pop up window if you try to enter a resolution

## problem - we can add blank resolutions

fix that with

```js
addResolution(event) {
    event.preventDefault();
    let text = this.refs.resolution.value.trim();
    if (text) {

      Meteor.call('addResolution', text, (error, data)=>{
        if(error) {
          Bert.alert('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o');
        } else {
          this.refs.resolution.value = '';
        }
      });
    }
  }
```

now you can not add empty resolutions

now we'll pass an ID into a route and it will give us a specific piece of data

