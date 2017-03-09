# Deeper into React Router
## React Router 4 API
### [Redirect](https://reacttraining.com/react-router/#redirect)

### What is the declarative route?
Everything you want to do is done via a Component

**React Router 4** uses declarative routes

**note** You can also use the imperative API from the router on context if you want

We won't use the `<Redirect>` Component. We will use the imperative API

### How do I access the router?
Because `<BrowserRouter>` is the root Component of our App we can access it from any Component nested inside it

Open TeamPicker in React tab and see if you can see the Router. You can't. How can we access the router. Through `context`

#### What is context?
React has `props` and `state`. 99% of time you'll use `state` to hold your data or you will be using `props` to pass data from one Component (a parent) down to another Component (a child)

But there is also a third thing you will use called `context`

Context allows you to declare something at the top level and it will be made available to anybody at a lower level.

#### Context Sounds Awesome
Why not put everything at the top level so every child can access everything. This would be against the React philosophy. They want you to not pollute the global scope and rather use tiny Components that are self contained

That being said there are exceptions to the rule. Some items need to be top level and passed down to every child Component and Routers are one of those exceptions

React makes accessing `context` hard.

### Adding context to TeamPicker

```
TeamPicker.contextTypes = {
  router: React.PropTypes.object
}
```

`src/components/TeamPicker.js`

```
import React from 'react';
import { getFunName } from '../helpers';

class TeamPicker extends React.Component {
  constructor() {
    super();
    this.goToTeam = this.goToTeam.bind(this);
  }
  goToTeam(e) {
    e.preventDefault();
    // first grab text from text field
    console.log(this.teamInput.value );
    // second change URL from / to /team/:teamId
  }

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        {/* Look here */}
        <h2>Please Enter a Team</h2>
        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} ref={(input) => { this.teamInput = input }} />

        <button type="submit">Visit Team</button>
      </form>
    )
  }
}

TeamPicker.contextTypes = {
  router: React.PropTypes.object
}

export default TeamPicker;
```

### View in browser
In React tab search for TeamPicker and you will see it now has a Context of `router`

![router context](https://i.imgur.com/Xu3rNMu.png)

Inside the router you will see the `transitionTo()` method

To access our router we can use `this.context.router` and to access the transitionTo() method inside router we can use `this.context.router.transitionTo()`. Then we just pass `transtionTo()` where we want to transition to, so we pass it the Team Name (since we captured it in the above line of code). That will change our URL to `/team/OUR Team Name`

#### Update our `goToTeam()` method
```
goToTeam(e) {
    e.preventDefault();
    // first grab text from text field
    // console.log(this.teamInput.value );
    const teamId = this.teamInput.value;
    console.log(`Going to ${teamId}`);
    // second change URL from / to /team/:teamId
    this.context.router.transitionTo(`/team/${teamId}`)
}
```

### No more warning!
Once we add this line:

``this.context.router.transitionTo(`/team/${teamId})``

We finally get rid of of the `TeamPicker` Component not being used because now our router is using either App or TeamPicker depending on the URL

## View in browser
Click button and the **URL** will change to Team Name in our text field and our **Router** will take that **URL** and route us from the `TeamPicker` Component to the `App` Component

## HTML5 push state
React is all client side and it uses HTML5 push state. This will change the URL but it will not refresh the page and that is why it is so fast switching from one URL to another becuase all the HTML, CSS and JavaScript is already loaded on the page

