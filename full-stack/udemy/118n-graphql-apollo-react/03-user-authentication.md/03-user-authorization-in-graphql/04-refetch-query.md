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
2. Restructure our `props` (will get our `refetch` property)
3. Now we can pass them down to whatever components we want to
    * In this case we'll pass it down to `Signup` and `Signin`
    * But to pass individual props into a specific route is that we'll change the component `prop` with render and this will enable us to call our component with an arrow function (_this will give us space to provide properties_)

#### Using `render` inside our routes
* This is how we pass individual props into a specific route
* We remove the `component` property and instead use the `render` property and pass it an arrow funtioning returning the component for that route and inside that component we can pass down the refetch prop and pass it our destructured `refetch`

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
  // call our signinUser function
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

## Do this in Signup as well
`Signup.js`

```
// MORE CODE

handleSubmit = (event, signupUser) => {
  event.preventDefault();
  // call our signupUser function
  signupUser().then(async ({ data: { signupUser} }) => {
    console.log(data);
    localStorage.setItem('token', signupUser.token);
    await this.props.refetch();
    this.clearState();
    this.props.history.push('/');
  });
};

// MORE CODE
```

## Test
1. Remove token in `client`
2. Login again
3. You will see the `currentUser` `token` is available because the `refetch` is now working
    - We are getting the fresh value of

## Troubleshooting if you did not get this to work
* Make sure your `withSession.js` looks like this:

`withSession.js`

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

export default withSession;

// MORE CODE
```

* The log of `data` is important because that will show you `getCurrentUser`
* When you remove the token and refresh the page `getCurrentUser` will be `null`
* Loggin in before we make the above changes means that you get redirected but getCurrentUser is still null until you refresh the browser
* We need to do a refetch to grab the fresh data
* So after you make the changes above to Signin and Signup you will see that now only are we redirected to the home page but a refetch is performed and we get the latest, fresh data for currentUser
* After logging in, you will be redirected to the home page and your console should log something similar to the following:

![logging refetch fresh data](https://i.imgur.com/KBzOrBr.png)

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add refetch query`

## Push to github
`$ git push origin auth`

## Next - Add a navbar
* Let's make navigating our app a lot easier
