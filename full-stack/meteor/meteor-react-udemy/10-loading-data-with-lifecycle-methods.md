# Loading Data with Lifecycle methods
We just refactored our `App` functional component into a class based Component

**why we did this** - so our `App` component could be able to go out and fetch it's own data

We currently our making our **Ajax** request completely outside of our **React** application

`main.js`

```
// code
// Render the component to the screen
Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
  axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
      .then(response => console.log(response));
});
```

## Improving our Ajax placement
We need a really good place to stick our **Ajax** request inside our class component

### Lifecyle
#### componentWillMount()
This is a method that if we decide to define it, it will automatically be called by **React** whenever this component is about to be rendered to the **DOM**

`main.js`

```
// more code
class App extends Component {
  componentWillMount() {
    console.log('App is about to render');
  }
  render() {
    return (
      <div>
        <ImageList />
      </div>
    );
  }
}
// more code
```

### Test in browser
You'll see `App is about to render` - happens before component is about to render. This makes this a fantastic place to load data

Another reason this is a great place to load data is `componentWillMount()` will only be called exactly one time, inside any of our different components that we create

So once again, any code you place inside `componentWillMount()` you are guaranteed that it will only be called one time (_so long as you only use this component once_)

### Moving our Ajax call to inside `componentWillMount()`

`main.js`

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ImageList from './components/ImageList';
// Create a component
class App extends Component {
  componentWillMount() {
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
        .then(response => console.log(response));
  }
  render() {
    return (
      <div>
        <ImageList />
      </div>
    );
  }
}

// Render the component to the screen
Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
```

* Now we can pass our reponse into our `ImageList` as a prop

#### One Problem
When we make the **Ajax** request it could take 200, 500 milliseconds... to a whole second. No one knows because it is an asynchrounous request

So React will first call our `App'` component's `componentWillMount()` method and then the next micro second it will call the `render()` method and push some stuff to the **DOM**

So we need to use `componentWillMount()` to make our request and then we wait but not before our DOM reloads with the `render()` UI update. We need to somehow find a way to make the `App` component re-render and pass this newly fetched list of images down into `ImageList`

```
render() {
    return (
      <div>
        <ImageList />
      </div>
    );
  }
```

## Next Challenge
That is still a big challenge that we have to solve and we'll do exactly that in the next section


