# PureComponent
## What is a PureComponent?
* Only renders with a first level prop has been rendered or the state has changed
* A normal component does deep checking, the component will know when anything deeply nested in that component has changed
    - This is more "expensive" performance wise
* Most people just use normal components everywhere
* But with MovieList, it will only change when the state changes so this is a perfect time to use a PureComponent in place of a normal component
* Use with caution because if you use a PureComponent where you need deep checking you won't see your app nested components updating

## shouldComponentUpdate (life cycle method)

### 3 types of components in react
* functional stateless component (most common)
* class based component (2nd most popular)
* pure component
