# Stripe Tokens
* We want to Add Payments when user is logged in
* We want to return the Logouts button and the Payments buttons too

```
<li>
  <a href="/api/logout">Logout</a>
</li>
```

* WE normally would wrap this inside another element like a `div` or a `ul`
    - You can not have two children inside one parent
    - But we are rending that block of code inside this:

```
<ul className="right">
  {this.renderContent()}
</ul>
```

* And semantically it doesn't make sense to place a ul or div inside a ul
* A better solution will be to return an array of Components

`Header.js`

```
// more code
class Header extends Component {
renderContent() {
  switch (this.props.auth) {
    case null:
      return; // return nothing - show nothing at all
    case false:
      return (
        <li>
          <a href="/auth/google">Login With Google</a>
        </li>
      );
    default:
      return [
        <li>
          <Payments />
        </li>,
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      ];
  }
}
// more code
```

* We use an array to add multiple elements
* This is a great work around the rule that the parent element can not have multiple child elements
    - An array is one element but it has multiple elements inside it
    - It is the best of both worlds

### Test in browser
* The browser pauses in execution at the point where our `debugger` statement resides
* When our app runs the `process.env.REACT_APP_STRIPE_KEY` doesn't exist but rather it gets replaced by the actual key

* In order to see `bundle.js` (_that is the rendered file_) but the code you are looking at is the source JavaScript which still will just show `process.env.REACT_APP_STRIPE_KEY` hardcoded environmental variable

1. IN the Chrome dev tool, click the show navigator button 
2. Then expand these folders `stactic` > `js`
3. And you will see `bundle.js`
4. Click it and use `cmd + f` to find `stripeKey`

* You will see the actual published key is in our concatenated JavaScript file
* **note** That it is a string

![stripeKey as string](https://i.imgur.com/55TR0AH.png)

* So it rips our out published stripe key and puts it into our client side JavaScript code
* When your app is built by `Create-react-app` you don't end up with any client side `process.env.REACT_APP_SOMENAME` environment variables

## Remove debugger statement
* Refresh page
* And you should see the `Pay with Card` (Button doesn't look good with our site - we'll fix that soon)

![stripe pay with card button](https://i.imgur.com/SAcgmIi.png)

* And after clicking `Pay With Card` button you'll see:

![card checkout form](https://i.imgur.com/uUcBG0n.png)

* It clearly lets us know we are running in "TEST MODE" of Stripe (so we can play around and not worry we are losing money :))

## Console warning about keys
* Since we are using an array
* React wants keys with unique values for all lists
* We'll deal with that in a moment

## Fill out form
* And see in our console what token we get back from Stripe
* You have to use the test special credit card number for Stripe which is:
    - `4242 4242 4242 4242`
* Make sure expiration data is sometime in the future
* Any 3 digits for the CVC

![checkout form filled out](https://i.imgur.com/2m0Ry9y.png)

* Click `Pay $5.00` button
    - Notice how the 500 cents (number we entered earlier) now is 5 dollars
* Here is the token I got back after submitting

![returned token](https://i.imgur.com/IjsjUem.png)

* Notice how it is not a stand alone token
    - It returns an object which represents the entire charge
    - The closest think to a token that exists inside this object is the `id` property
    - So that `id` is what we really care about
    - What that `id` we can make a follow up request from our API server over to Stripe and say, "Hey Stripe I want to actually bill this person for x dollars"
* Other items inside the object
    - The client_ip - used by fraud prevention reps
    - created - timestamp
    - livemode - false (We're in testmode)
    - type - cared (we paid with credit card)
    - There is also a `card` object
        * This is some properties about the card that was just entered
        * We get an address and the last 4 numbers of the card
        * We could use those last 4 digits if we wanted to at some point in time, ask the user to verify their identity inside our app
        * But we never have access to our touch the entire credit card number

## Next
* Make our button look nicer
* Do something with this token now that we got it from Stripe
* And fix the unique key warning
