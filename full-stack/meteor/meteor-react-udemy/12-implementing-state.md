# Implementing State

## Adding our contructor

```
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [] };
  }

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
```

* `constructor(props) {`
    - the `contructor()` method is a special method in a JavaScript class
    - whenever a `class` is instantiated (_in other words... whenever we make a copy of this class or make an object of this class or create an instance of this class_), the contructor() method is going to be automatically called
    - in a react component, the constructor will be automatically called with the `props` object
        + this `props` object is the exact same `props` that we passed down to the child components
    - the `Component` class that we are extending from, which is implemented by React, has its own special implementation and configuration that it does inside of it's own constructor
        + we call this parent `constructor()` by called `super(props)`
            super(props) is really just administrative boilerplate, and it is something we always put into every react component whenver we call the constructor() method but it is not something that we have to worry about too much
* `this.state = { images: [] };`
    - The purpose of this line it to initialize our `state` Object
    - Our `state` object is something that belongs to every React Component that we create and we intialize it by saying `this.state = { some-object: [] };`
    - Our state object can have multiple properties to it
        + In our example we only have one property that we are calling `images`
        + We always default our state properties to some reasonable value
            * In our example we expect that the response from our server (the API) is going to be an array of images and so we are initializing `this.state.images` to be an empty array `[]` (which is a similar type)
            * By default the array will start off as empty but when our request gets resolved, it is actually going to have some data inside of it
        + We only ever make reference to our state by saying `this.state` and then the property we want to reference
            * If we ever want to change our state, that is going to be a little more interesting case

## Making use of state inside or our application now!
**note** We have kept `this.render()` inside our componentWillMount()

```
componentWillMount() {
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
        .then(response => this.render());
  }
```

### Testing
```
render() {
    console.log(this.state.images);
    return (
      <div>
        <ImageList />
      </div>
    );
  }
```

#### View in browser
You see we get two seperate console.log's of the array. I get the first one and then a half second later we get the second one. this means that whenever our component hits the render method we are console.logging `this.state.images` and by default it is empty

### Update our state object
With a list of images that comes back from our API

```
componentWillMount() {
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
        .then(response => this.setState({ images: response.data.data }));
  }
```

* When we saw our return images from imgur, we saw in the console that the images we were interested in were inside the `data.data` property
* Yes it is weirdly named but we are just getting a list of images that is inside the response object
* `this.setState()`
    - this is the only way that we change our state over time
    - NEVER DO THIS-
        + this.state.images = [ {}, {} ];
        + we never, ever, ever, ever modify our state property directly with an equals sign
            * The only time we ever do an operation like this is when we intialize our state in the constructor
                - and that is the ONE SINGLE TIME we say `this.state = {something: something };`
            * The reason behind this is so that React can update our state in an intelligent fashion, and it can only do that by passing this change to our state object to the `setState()` method
                - Internally, React is going to take this object `{images: response.data.data }` (this update) and wait to see if we make any other updates, if we ever call `setState()` again, if we do, that it will make all of those updates at the same exact time (this is done for performance concerns)
                - save the file and check it out in the browser

### View in browser
You will first see an empty array `[]`
And then you'll see an array of objects

![array and array of objects](https://i.imgur.com/U95NurI.png)

**note** 
We can see by this is that our component is being rendered two times. The first time is when the component is being initially rendered to the screen. The second time is when we have called `setState()` with that new list of Objects 

* we know the `render()` method was called 2 times because we put the console.log() method inside our render() method

```
render() {
    console.log(this.state.images);
    return (
      <div>
        <ImageList />
      </div>
    );
  }
```

## Recap on state
state is the most confusing topics in the entire library of react

1. We realized that we needed to get access to state in this component
2. We realized this because we were using AJAX and an API but our request would be sent and we would not receive it until some unknown time later and we will want to re-render our component to the screen, with that new data 
3. The only way we trigger a re-render in a react component is by the `state` object, specifically by updating it
4. To make access of state or make use of state
    1. We defined our `constructor()` method at the top of our class
        * The contructor() method is a method that is automatically called when the react component is created and essentially it is our prime spot to some initialization for our application or for our specific component
        * Inside our constructor() we defaulted our state to an object with a property images `this.state = { images: [] };` (and images was an empty array)
            - We specifically chose an array here because we expected our list of images to be an array
5. Then we waited for our request to resolve and once it did, we called `this.setState()`
    * `setState()` is a special method in react that is automatically created for us when we extended our component from the component based class
        - `class App extends Component {`
    * `setState()` is the only way in which we modify state in a react component
        - whenever we call it, we pass in an object that has the update that we want to make to our `state` object
            + `this.setState({ images: response.data.data })`
        - whenever we call `setState()` it causes our component to automatically re-render and those changes end up on the screen visible to the user
+ We saw our console.log() get logged two times because we placed it inside our components `render()` method
    * The first time was when we intially rendered this component to the screen
        - `ReactDOM.render(<App />, document.querySelector('.container'));`
    * The second time we saw the console.log() fired was after we called `setState()` (and that was the proof to tell us that whenever we update state, the component will re-render)



