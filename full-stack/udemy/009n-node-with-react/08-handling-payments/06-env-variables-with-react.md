# Env variables with React
* There are a couple of problems when trying to get Environmental variables inside your `React` app and we talked about them last section
* **note** The client side only cares about the `Publishable key`
    - It doesn't care about the `Secret Key`
    - The Publishable key is for the outside world so feel free to show it to anyone
        + At your next party walk up to strangers and show them your Publishable keys
        + Everytime a user downloads our app they have access to our Publishable key
            * Which is essentially every time they visit our web site

## Create react app solution
*[read the create react app documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
    - Read the section `Adding Custom Environment Variables`
    - We are going to define the Stripe key as an Environment variable
    - These env variables work the same way as on the heroku side of our app
        + We set up some CONSTANT
        + We make use of it somewhere inside our project
        + At runtime create react app is going to figure out what set of keys it needs to use for us
* You must create custom environment variables beginning with `REACT_APP_`
    - And the reason for this is we don't want to expose a private key on our machine
    - Any other variables except `NODE_ENV` will be ignored
    - Changing any environment variables will require you to restart the development server if it is running

## How do I access client side environmental variables that Create React App creates?
* The exact same way we did on the server side
    - `process.env.REACT_APP_CODENAMEHERE`

## How to add Env Variables
* In your shell
    On Mac: `$ REACT_APP_SECRET_CODE=abcdef npm start`
    * These are custom
    * One time "set and forget"
        - They are not going to be available for all time
        - If you want to use true ENVironmental variables you have to define them inside your shell
        - Different on Windows, MacOS and Linux
        - We won't take that approach because who knows what op system you are running right now

## .env files
* This will be our solution
* Name it `something.env` and that is how you define a permanent environment variable in the root of our project
    - And then we can make a couple of different `.env` files
        + `.env` - Default
        + `.env.development` - holds dev keys
        + `.env.production` - holds production keys

## Commit these client side .env files to source control 
* Why would we commit these .env files to source control?
    - [reason](https://github.com/facebookincubator/create-react-app/issues/2403)

## Creating our `.env` files
* **important** These two files are created in the root of the `client` directory
    - Because these are `client side keys` we are setting up
* Create:
    - `.env.developmen`
    - `.env.production`

`.env.development`

```
REACT_APP_STRIPE_KEY=pk_test_CWdD9aYrDinoOBfGPNiMYbuZ
```


`.env.production`

```
REACT_APP_STRIPE_KEY=pk_test_CWdD9aYrDinoOBfGPNiMYbuZ
```

* We truncate the name to just STRIPE because PUBLISHABLE_KEY is too long
* It is not a string so don't need to wrap it in quotes

### Test to make sure we can get access to these variables
`client/src/index.js`

```
// more code

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
```

* You need to restart your server
* You should see something like this in your Chrome dev console

```
STRIPE KEY IS pk_test_CWdD9aYrDinoOBfGPNiMYbuZ
index.js:21 Environment is development
```

## Same Stripe keys for dev and prod (just an experimental site for fun - not real)
* We are using the same Stripe key on dev and prod because we just want to use the same test account on both
* Because truly activating our Stripe key requires add banking and other important info

## Mac OS hides `.files` by default
If you move files, in Finder, it won't move files that are hidden

## Clean up
* Remove the two console.logs() as we don't need them anymore

```
// delete these
console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);`
```

