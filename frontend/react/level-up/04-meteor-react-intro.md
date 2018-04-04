metsol (alias)
howley.phil@gmail.com and 123456 (login)
[all 20 videos here](https://www.youtube.com/watch?v=ootKAwnQiP4&list=PL6klK99EwGXj6IED7wO8V9nJJIj4_vpDh)



# Meteor and React

[install Meteor](https://www.meteor.com/install)

$ cmd + k (clears terminal)

## create a project
`$ meteor create myResolutions`

## update meteor
`$ meteor update`

**meteor 1.3** allows for use of npm packages

remove js and css file and make html look like this:

```html
<head>
  <title>my resolutions</title>
</head>

<body>

</body>
```

`$ npm install --save react`

rename `main.html` to `index.html`
capitalize react Components

`$ npm install --save react-dom`

## React Router and Meteor
meteor 1.3 makes this so much more fun

`$ npm i --save react react-dom react-router`

App.js

```js
import React from 'react';
import { render } from 'react-dom';
import { Navigation } from '../components/Navigation';

Resolutions = new Mongo.Collection('resolutions');

export default class App extends React.Component {

  addResolution(event) {
    event.preventDefault();
    const text = this.refs.resolution.value.trim();

    Resolutions.insert({
      text: text,
      complete: false,
      createdAt: new Date()
    });

    this.refs.resolution.value = '';
  }

  render() {

    return (
      <div>
        <Navigation />
        {this.props.children}
        <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
         <input
           type="text"
           ref="resolution"
           placeholder="Ride Bike"
         />
        </form>
      </div>
    )
  }
}
```

## display resolutions on screen (video #5)

TrackerReact (another solution TrackerComposer)
add package to .packages
`ultimatejs:tracker-react`

[github tracker-react](https://github.com/ultimatejs/tracker-react)

note: 1.0.2 has a bug, don't use it

if you needed to update to a specific version in meteor
`ultimatejs:tracker-react@=1.0.0`

you can open the .versions file to see what version of which package you are using

### Tracker React
makes it so you can use Meteor's reactive abilities directly in react with no extra hassle

How do I import a package into my component and that package is from Meteor itself?

`import TrackerReact from 'meteor/ultimatejs:tracker-react';`

test that it works by looking in browser, if it complains that it can't find it, it did not work

**note**
If you are using Tracker 1.05 don't get the 'Tracker engaged' message in your console, don't worry, it's there but the message has been removed in newer releases.

wrap TrackerReact like this

original
`export default class App extends React.Component {`

new
`export default class App extends TrackerReact(React.Component) {`

**note**
`return Resolutions.find().fetch()`
* this query returns an object

`return Resolutions.find()`
* this query returns a cursor

You only need to use TrackerReact(React.Component) when you are pulling in data

#### Create a reusable Component
`imports/ui/components/ResolutionsForm.js`

```js
import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Navigation } from '../components/Navigation';
import ResolutionsForm from '../components/ResolutionsForm';

Resolutions = new Mongo.Collection('resolutions');

export default class App extends TrackerReact(React.Component) {

  resolutions() {
    // find all resolutions
    return Resolutions.find().fetch()
  }

  render() {
    let res = this.resolutions();
    if(res.length < 1) {
      return (<div>Loading</div>)
    }
    return (
      <div>
        <h1>My Resolutions</h1>
        <Navigation />
        {this.props.children}
        <ResolutionsForm />
        <div>
          {res[0].text}
        </div>
      </div>
    )
  }
}
```

imports/ui/layouts/App.js

```js
import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Navigation } from '../components/Navigation';
import ResolutionsForm from '../components/ResolutionsForm';

Resolutions = new Mongo.Collection('resolutions');

export default class App extends TrackerReact(React.Component) {

  resolutions() {
    // find all resolutions
    return Resolutions.find().fetch()
  }

  render() {
    let res = this.resolutions();
    if(res.length < 1) {
      return (<div>Loading</div>)
    }
    return (
      <div>
        <h1>My Resolutions</h1>
        <Navigation />
        {this.props.children}
        <ResolutionsForm />
        <div>
          {res[0].text}
        </div>
      </div>
    )
  }
}
```

we don't need to use Tracker-react for this single component
because we are not grabbing data
we are grabbing the data in the parent and just passing that data into the single component

add this `.packages`
`stolinski:stylus-multi`

add css
`client/styles.styl`

[pastebin link for stylus code](http://pastebin.com/raw/Gkw4HQYP)

error, meteor didn't shut down properly
have two instances trying to run on same port
find what is running
`$ lsof -Pi | grep LISTEN`
kill the node process with extreme prejudice
`$ kill -9 $PID`
**note** $PID is the number in the second column when you run `$ lsof -Pi | grep LISTEN`

had major problems when messing with collections
where should they be stored?
what should they be named?
how to access mongo in meteor?
`$ meteor mongo`
show collections
`> show collections`

remove a collection
`> db.resolutions.drop()`

first item in collection on client is undefined, this was the huge problem

the fix was this code in App.js

```js
let res = this.resolutions();
    if(res.length < 1) {
      return (<div>Loading</div>)
    }
```

spent an hour trying to figure that one out

lesson learned from problem
don't name collection same as class, will call the class before the collection

