# Authentication UI
Great news. It's all written in Meteor already

* We just need to provide the UI to **sign up** and **sign in**
* Everything else will be done for us

## In Meteor how do we show UI to user
* Angular
* React
* Blaze (Meteor's default rendering package)
    - We could use this and Meteor would create our sign up and sign in UI for us
    - But we are not using Blaze, we are using React
    - How do we get Blaze to work with React?
        + They are two separate libraries and we want to use some of Blaze's UI logic that is already written

## accounts-ui accounts-password
Add two packages to handle Account system

* Both are Meteor packages
* `$ meteor add accounts-ui accounts-password`

Stop and restart Meteor
### Create `client/components/Accounts.js`

#### How to get React to work well with other third party rendering libraries
```
class Accounts extends Component {
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

  render() {
    return (
       <div></div>
    );
  }
}

export default Accounts;
```

* `componentDidMount()` - special method that a React component has that will automatically (exactly one time) be called whenever this component is rendered to the screen
* `componentWillUnmount()` - similar to previous method but this method will automatically be called when our component is just about to be removed from the screen

**note** The goal behind React is that it should be 100% in charge of the DOM and we should never manually dive into the DOM and start fiddling with something. By using this mound and unmount lifecycle process we are kind of circumventing that rule. This general approach is how we work with 3rd party libraries with React in general

We let the React component render as usual, and then after it gets rendered to the DOM, we are going to reach into the DOM and manipulate it in some fashion and after we're done with that and our component is going to unmount we need to go back in and clean up after ourselves

We could use this same approach for D3 or jquery or Backbone you can continue to use with React by taking this type of approach here


