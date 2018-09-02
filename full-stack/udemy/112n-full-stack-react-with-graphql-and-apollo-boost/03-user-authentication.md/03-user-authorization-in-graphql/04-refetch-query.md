# Refetch Query
* [render props properties](https://www.apollographql.com/docs/react/essentials/queries.html)

## Add  `refetch`
* We can destructure `refetch`
* We already destructured `loading` and `data`

`withSession.js`

```
// MORE CODE

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data);

      return <Component {...props} />;
    }}
  </Query>
);

// MORE CODE
```

### Now we can pass things down through our components

```
// MORE CODE

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data);

      return <Component {...props} refetch={refetch} />;
    }}
  </Query>
);

// MORE CODE
```

### How do we pass things down via HOCs?
* How do we pass props down through our routes?

1. Go to component that's been wrapped
2. Restructure our `props` (will get our refetch property)
3. Now we can pass them down to whatever components we want to
    * In this case we'll pass it down to `Signup` and `Signin`
    * But to pass individual props into a specific route is that we'll change the component prop with render and this will enable us to call our component with an arrow function (this will give us space to provide properties)

`index.js`

```
// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

// MORE CODE
```

## Make async await to refetch
* In `Signin` we'll use the now available `refetch`
* We'll perform refetch before we clear the `state`

`Signin.js`

```
// MORE CODE

handleSubmit = (event, signinUser) => {
  event.preventDefault();
  // call our signupUser function
  // it is a promise so we can use `then()`
  // within `then()` we get our return `data`
  signinUser().then(async ({ data: { signinUser } }) => {
    console.log(signinUser);
    localStorage.setItem('token', signinUser.token);
    await this.props.refetch(); // add this
    this.clearState();
    this.props.history.push('/');
  });
};

// MORE CODE
```

## Test
* Remove token in client
* Login again
* You will see the current user token is available because the refetch is now working
    - We are getting the fresh value of 

## Next - Add a navbar
* Let's make navigating our app a lot easier
