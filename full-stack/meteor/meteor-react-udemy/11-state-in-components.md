# state in components

![timeline of sequence of events](https://i.imgur.com/bt9uatE.png)

Once we get our data we need to re-render our component

could we just do this?

```
componentWillMount() {
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
        .then(response => this.render());
  }
```

No. Because React components don't work like that. If we do that it will just call the `render()` immediately and then just return some JSX

## state
Instead in order to get our component to re-render we need to work with something called `state`

state is a major concept in the react world

state is a property that every class-based component that we create has access to

state is a JavaScript object that we can make changes to and whenever we change this object (in any way, shape or form) the component will automatically re-render

![diagram of state](https://i.imgur.com/Zd4ZXVA.png)

We will use state in our app
* Whenever we fetch our list of images, we are going to modify our state (which is just a plain JavaScript object)
* And because we are updating that object, it will cause `App` to re-render and all it's children (ImageList and ImageDetail) will all re-render

This is a fantasic feature in React to propogate change or make changes in your components over time

Any changes we make, in our app, setting state or changing state is the number one tool that we have for making some change occur inside of our application


