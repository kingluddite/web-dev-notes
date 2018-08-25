# Add token to Local Storage
* We need to use the token we get back to authenticate our user

## Sign in first and analyze the `data` object returned
![data object returned](https://i.imgur.com/uTsytHW.png)

* You will see `data` > `data` > `signinUser` > `token`

## Destructure `data`
* This will make getting access to token a little easier to grab

`Signin.js`

```
// MORE CODE

signinUser().then(({ data }) => {
      console.log(data);
      this.clearState();
    });

// MORE CODE
```

Now look at `data` object returned

![data object returned](https://i.imgur.com/RumJ86v.png)

* easier access to our token with `data.signinUser.token`

## Add token to localStorage

```
// MORE CODE

signinUser().then(({ data }) => {
  console.log(data);
  localStorage.setItem('token', data.signinUser.token);
  this.clearState();
});

// MORE CODE
```

## Destructure even more
* Makes it even easier to access

```
// MORE CODE

signinUser().then(({ data: { signinUser } }) => {
  console.log(signinUser);
  localStorage.setItem('token', signinUser.token);
  this.clearState();
});

// MORE CODE
```

* Now view the console log

```
{token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…k5N30.IB90rAyATAGfM8nbsh8px8WJ3DIRGMn1yFXcVdd8Bjg", __typename: "Token"}
```

* Your token will obviously be different

## Update Signup component with same localStorage code
* We'll update the destructured variables

```
// MORE CODE

handleSubmit = (event, signupUser) => {
  event.preventDefault();
  // call our signupUser function
  // it is a promise so we can use `then()`
  // within `then()` we get our return `data`
  signupUser().then(({ data: { signupUser } }) => {
    console.log(signupUser);
    localStorage.setItem('token', signupUser.token);
    this.clearState();
  });
};

// MORE CODE
```

## Test
* Create a new user and make sure you see token created in console

## Check Application tab of console
* You will see key/value of token has been added to localStorage

![localStorage Application tab](https://i.imgur.com/qae7lid.png)

## Get item (token) from localStorage and we need to send it to the back end to authenticate our user

`client/src/index.js`

```
// MORE CODE

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);

      // check for certain server error codes
      //if (networkError.statusCode === 401) {
      // localStorage.setItem('token', '');
      // or remove item
      //  localStorage.removeItem('token');
      //}
    }
  },
});

// MORE CODE
```

## We just added token to authorization header
* Now we need to send authorization header over to our backend

### Backend to set up JWT authentication middleware 
`server.js`

* Right after where we used **cors**

```
// MORE CODE

app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization']
  console.log(token);
  next();
});

// MORE CODE
```

* Make sure you call next() to go to next middleware
    - Very important - if you forget this your app will "hang" aka - stop working
* For now let's just log token

#### Where do we get authorization from?
* We set that in our headers here:

`client/src/index.js`

```
// MORE CODE

request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },

  // MORE CODE
```

## Test
* If all goes well you should see token in Terminal because that means we sent it to the backend of our app

`http://localhost:3000/signin`

![server token](https://i.imgur.com/qa3OSjr.png)

