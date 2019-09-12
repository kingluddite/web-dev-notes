# Props vs state

![props v state diagram](https://i.imgur.com/i7dve8z.png)
## Similarities
* Both are objects
* Both can be used when rendering Component
    - We have access to `props` when rendering
    - We have access to `state` when rendering
* If `state` changes to state cause the component to re-render
    - The component itself can change the data using `this.setState()`
* If `props`, changes (from above) cause re-renders
    - But a Component can NOT change its own 
    - `props` get passed down from the parent

## Differences
* `props` come from above
    - Whether it is a component
    - Or some JSX that gets passed into to `ReactDOM.render()`
* `state` is defined in the component itself
* `props` CAN NOT be changed by the component itself
* If you do want to track changing data you MUST use `state` because state can be changed by the component itself
