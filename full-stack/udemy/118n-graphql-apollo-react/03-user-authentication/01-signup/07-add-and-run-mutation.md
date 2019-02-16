# Two things we need to do
1. Add onSubmit to Signup form
2. Run signup mutation on Client

* In order to execute the `SIGNUP_USER` function we need to pass it the necessary variables

`Signup.js`

```
// MORE CODE

<Mutation
  mutation={SIGNUP_USER}
  variables={{ username, email, password }}
>
  {({ data, loading, error }) => {

// MORE CODE
```

* We can use `username`, `email`, `password` because of destructuring above
* We get access to `data`, `loading` and `error` whenever using a **Query** or **Mutation**
* **note** With `Mutation` components we get access to **one additional thing** --- access to the `Signup` user itself (_The function itself whenever we are executing a Mutation... as the first argument_)

```
// MORE CODE

<Mutation
   mutation={SIGNUP_USER}
   variables={{ username, email, password }}
>
  {(signupUser, { data, loading, error }) => {

// MORE CODE
```

* This gives us control of whenever we want to call the `SIGNUP_USER` function
* In this case we want to call `SIGNUP_USER` **whenever our form submits**

`Signup.js`

```
// MORE CODE

{({ data, loading, error }) => {
  return (
    <form className="form" onSubmit={this.handleSubmit}>

// MORE CODE
```

* We will also pass down the `signupUser` function

```
// MORE CODE
{(signupUser, { data, loading, error }) => {
  return (
    <form
      className="form"
      onSubmit={event => this.handleSubmit(event, signupUser)}
    >

// MORE CODE
```

## Arrow functions save the day!
* **note** In order to prevent `this.handleSubmit()` from being called whenever our `Signup` user component is loaded we need to make `handleSubmit` and arrow function

`Signup.js`

```
// MORE CODE

  handleSubmit = (event, signupUser) => {
      event.preventDefault();
      // call our signupUser function
      // it is a promise so we can use `then()`
      // within `then()` we get our return `data`
      signupUser().then(({ data: { signupUser } }) => {
        console.log(signupUser);
      });
    };

    render() {

// MORE CODE
```

* Let's look at destructuring and nested destructuring

```
handleSubmit = (event, signupUser) => {
  event.preventDefault();
  signupUser().then(data => {
    console.log(data);
  });
};
```

* Above we just pull out `data`
* Before we nested destructuring by pulling signupUser out of data
* Below we just use destructuring

```
handleSubmit = (event, signupUser) => {
  event.preventDefault();
  signupUser().then(({ data }) => {
    console.log(data);
  });
};
```

* Console.log() each different patch of code and observe the different results
* Bottom line, destructuring is a way to "pluck" off the data you want

# Test
`http://localhost:3000/signup`

* Fill out form
* If enter duplicate email will get console error: "User already exists"
* If enter valid data will get data object in console

![sample data object](https://i.imgur.com/RXy5jY0.png)

* This has the token returned

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add and run mutation`

## Push to github
`$ git push origin signup`

## Next - Create Error Component
