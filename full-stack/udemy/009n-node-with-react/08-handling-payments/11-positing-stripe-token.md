# Positing the Stripe Token
* Now our `Action Creator` posts our token to the backend server
* We need to make sure it gets called whenever we get a token from the Stripe checkout form

`Payments.js`

```
import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux'; // add this
import * as actions from '../actions'; // add this

class Payments extends Component {
  render() {
    return (
      <ReactStripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </ReactStripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments); // modify this
```

* Now we need to make sure that after we get a token back from the Stripe API, we need to call our `Action Creator`
    - We'll replace the `console.log(token)` with our new code
    - We named our `Action Creator` `handleToken`
    - This means that the Payments Component has the `Action Creator` available on `this.props.handleToken`

```
class Payments extends Component {
  render() {
    return (
      <ReactStripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)} // we modify this line
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </ReactStripeCheckout>
    );
  }
}
```

## Test in browser
* We didn't create the routeHandler yet so most likely we'll see a 404 error
* Not a problem, we just want to test that the request is being created
* After those changes the browser should auto refresh
* Open Chrome dev tool in the Network tab
* Only select the XHR button (to show only Ajax requests)
* Clear all requests
* Click `Add Credits`
* Fill in form
* Submit form
* You will see the 404 from stripe
* So we know the request was made

## Done with Frontend Payment
* Our frontend is wired up now to handle payment info

## Next
* We'll change over to the server
* Create a routeHandler
* That will take this token that we want to push
* And exchange it for a charge through the Stripe API
