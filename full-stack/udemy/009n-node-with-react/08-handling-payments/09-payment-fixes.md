# Payment Fixes
![diagram of where we are](https://i.imgur.com/SwVv8vP.png)

* We got our token from Stripe
* We need to send that token to our API
* Our API will then do a follow up request over to Stripe
* And then we'll add credits to user's account

## User's Account?
* We really don't have a "User's Account"
* We have a User model that has a unique id for every user and that is the User Account
    - So "adding credits to user's account" really means "we are going to add some amount of credits to that user model"

## Fix key warning
```
default:
  return [
    <li>
      <Payments />
    </li>,
    <li>
      <a href="/api/logout">Logout</a>
    </li>
  ];
```

* We just need to add to unique numbers
* This is an easy fix

```
default:
  return [
    <li key="1">
      <Payments />
    </li>,
    <li key="2">
      <a href="/api/logout">Logout</a>
    </li>
  ];
```

* Check and warning is console is gone

## Fix the button
* Let's add some useful info for the user to know what they are paying for

```
// more code
class Payments extends Component {
  render() {
    return (
      <ReactStripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      />
    );
  }
}
// more code
```

![new improved form](https://i.imgur.com/IER26My.png)

### Make the Stripe button fit our design
* Simple - make the Stripe Component have an open and closed tag
    - Nest our custom Component inside it

```
// more code
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
// more code
```

* It looks a little different than our Logout
* We want it to, as it is asking for money
* And usually in UI you want buttons that have an important functionality to have some form of `pizazz` added to it

![pizzazz def](https://i.imgur.com/FEHafpb.png)

## Next - Send token to our backend API

