# Current User API
## Styling tip
* Not documented on Materialize
* But Materialize requires one root element inside your app with a class of `container`

`App.js`

```
const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

* Our root element now has a `className` (no class remember why?) of `<div className="container">`

![centered container materialize](https://i.imgur.com/YpaNxWm.png)

## Header shows correct content
* Whether you are logged in or not

### How do we determine if the current user is logged in?
* We already built the mechanism in our API

`authRoutes.js`

```js
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});
```

* When we visit this route we know if the user is logged in or not
* Whenever our app boots up, we'll make a request to this route if it responds back with the user model, the user is logged in, if it responds back with `undefined` or `null` or an empty response, they are not

## Reminder how we fetch data inside a React app
![react app fetches data diagram](https://i.imgur.com/YxDTEqn.png)

* We set up a React Component
* To make sure that it calls an Action Creator
    - This `Action Creator` will be responsible for making some sore of API request
* Once we get a response back it will return or dispatch an Action
* That Action will be sent to all of our different reducers of which one is our `authReducer`
* That authReducer will watch for an action that says "Hey here's a request that figures out if a user is logged in or not"
* The reducer will then return some value that specifies whether or not the user has signed in
* That will update all the `state` inside the Redux store
* And that Redux store and the state inside it will be sent back down to all the React Components
    - When state updates, all the Components will rerender

## Next
* We'll make an Action Creator that will make an Ajax request over to our API (the routeHander on our server)

`authRoutes.js`

```js
// more code
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});
// more code
```

* This is super important
* It is our first exposure to how we do communication between the React and server side of our Application 
