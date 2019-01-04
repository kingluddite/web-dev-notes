# Credit Card Processing with Stripe Checkout
## Steps
1. Pop open credit card dialog
2. That will get us something like a token
3. We'll take that token on the server side
4. We'll charge the credit card with that token
5. We'll covert those items into order items
6. We'll create a new type called `Order` (to show receipts etc)

## We will be using Strip
* [Stripe web site](https://stripe.com/)
    - Credit card site Built for developers
    - Have tools that make credit card processing very easy

## Sign up for account on Stripe.com
* Make sure you are always on test

![test part of Stripe](https://i.imgur.com/KQSc5Ox.png)

* Flip it over to production if you are ready for production

## Get API keys under developers
* Make sure you are "Viewing test data"
    - `Publishable key` (goes client side - browser - totally fine if anyone if the world sees this key)
    - `Secret key` - This is the key you hide from everyone
        + We will use this on the server side to push through the transaction

### Copy the `Publishable key` to the clipboard
#### Frontend
* Create a new file called `components/TakeMyMoney.js`

`TakeMyMoney.js`

* nprogress - shows us loading red bar at top
* Here are our starting point

```
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

class TakeMyMoney extends Component {
  render() {
    return <User>{({ data: { currentUser } }) => <p>Checkout!</p>}</User>;
  }
}

export default TakeMyMoney;
```

## Add TakeMyMoney to the Cart
`Cart.js`

```
// MORE CODE

// custom components
import User from './User';
import CartItem from './CartItem';
import TakeMyMoney from './TakeMyMoney';

const Cart = () => (

    // MORE CODE

          <footer>
            <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
            <TakeMyMoney>
              <SickButton>Checkout</SickButton>
            </TakeMyMoney>
          </footer>
        </CartStyles>

// MORE CODE
```

* View the home page
* Click Cart button
* You will just see Checkout

## How do we get the `<SickButton>` to show up?
* Since SickButton is a child of TakeMyMoney you need to do this

`TakeMyMoney.js`

```
// MORE CODE

class TakeMyMoney extends Component {
  render() {
    return <User>{({ data: { currentUser } }) => <p>{this.props.children}</p>}</User>;
  }
}

// MORE CODE
```

* So now whatever gets passed as a child when we're using it (<SickButton>) will be rendered inside of it

```
// MORE CODE

            <TakeMyMoney>
              <SickButton>Checkout</SickButton>
            </TakeMyMoney>

// MORE CODE
```

* This is useful for things like this:

```
// MORE CODE

            <TakeMyMoney>
              <SickButton>Checkout</SickButton>
            </TakeMyMoney>
            <TakeMyMoney>
              <p>Yo this is different!</p>
              <SickButton>Checkout</SickButton>
            </TakeMyMoney>

// MORE CODE
```

* (You can remove the duplicate code above)
* Both will have checkout button but one also has some text

## How do we make the `Checkout` button open a Stripe checkout dialog?
* Replace the `<p>` with `<StripeCheckout>`

`TakeMyMoney.js`

```
// MORE CODE

    return <User>{({ data: { currentUser } }) => <StripeCheckout>{this.props.children}</StripeCheckout>}</User>;

// MORE CODE
```

* Click on Checkout and it will open the checkout dialog

## Configure Stripe Checkout
* [The Documentation](https://github.com/azmenak/react-stripe-checkout)
* There is a huge list of props we can pass to it

### Amount
`TakeMyMoney.js`

```
// MORE CODE

      <User>
        {({ data: { currentUser } }) => (
          <StripeCheckout amount={calcTotalPrice(currentUser.cart)}>{this.props.children}</StripeCheckout>
        )}
      </User>

// MORE CODE
```

* Make sure you are logged in
* You have items in your cart
* Click on checkout and you will see total amount
* **note** You must pass cents to Stripe
    - **tip** Always should work with cents any time you are dealing with money in JavaScript

### Add a function that counts amount of items
`Cart.js`

```
// MORE CODE

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {

// MORE CODE
```

* And then add:
    - Name
    - Description

```
// MORE CODE

          <StripeCheckout
            amount={calcTotalPrice(currentUser.cart)}
            name="Buy Stuff"
            description={`Order of ${totalItems(currentUser.cart)}`}
          >
            {this.props.children}
          </StripeCheckout>

// MORE CODE
```

## Show an image
* Make sure there is an image first to avoid errors

```
// MORE CODE

          <StripeCheckout
            amount={calcTotalPrice(currentUser.cart)}
            name="Buy Stuff"
            description={`Order of ${totalItems(currentUser.cart)} items`}
            image={currentUser.cart[0] && currentUser.cart[0].item.image}
          >
            {this.props.children}
          </StripeCheckout>

// MORE CODE
```

## stripeKey, currency and email
* You can put this in an environment variable if you want
* This is the public key that anyone can see
* Grab this from Stripe

`TakeMyMoney.js`

```
// MORE CODE

          <StripeCheckout
            amount={calcTotalPrice(currentUser.cart)}
            name="Buy Stuff"
            description={`Order of ${totalItems(currentUser.cart)} items`}
            image={currentUser.cart[0] && currentUser.cart[0].item.image}
            stripeKey="pk_test_CWdD9aYrDinoOBfGPNiMYbuZ"
            currency="USD"
            email={currentUser.email}
          >
            {this.props.children}
          </StripeCheckout>

// MORE CODE
```

![stripe checkout dialog](https://i.imgur.com/9N1pKpN.png)

## Payment
* You put in:
    - Your card number
    - Your expire date
    - Your CVC
* Click the Pay button
* At that point Stripe will generate a token
* Then we take that token to the server side and it at that point we charge the credit card
* We do this because we don't want to send our user's credit card details to our server
    - That is a ton of liability that we need no part of
* A better way is the way we are doing this
* We take that credit card number, we send that to Stripe, Stripe then gives us a token that is good for charging the credit card once and then we bring that token to our server and we totally avoid handling user sensative information

## What do we do when we get that token back from the user?
* We'll take the response from the token and we'll use a method we'll code is a bit that we'll call onToken and we'll pass the token to onToken

`TakeMyMoney.js`

```
// MORE CODE

    email={currentUser.email}
    token={res => this.onToken(res)}
  >
    {this.props.children}
  </StripeCheckout>

// MORE CODE
```

* We assign `token` an arrow function because we will also need to pass a mutation

## Let's see what the response looks like
### Stripe has dummy numbers to ](https://stripe.com/docs/testing#cards)
```
NUMBER  BRAND
4242424242424242    Visa
4000056655665556    Visa (debit)
5555555555554444    Mastercard
2223003122003222    Mastercard (2-series)
5200828282828210    Mastercard (debit)
5105105105105100    Mastercard (prepaid)
378282246310005 American Express
371449635398431 American Express
6011111111111117    Discover
6011000990139424    Discover
30569309025904  Diners Club
38520000023237  Diners Club
3566002020360505    JCB
6200000000000005    UnionPay
```

* You can test international numbers
* You can test for specific responses and errors
* We will test with VISA
* `4242424242424242` - (Create alfred snippet or text expander snippet as you'll type this a ton)
    - 02/22
    - 222

**Tip** You need to give the page a refresh, close and open checkout dialog
* The console shows you all the user card info
* We are interested in the card id
    - This is a one time use token
    - we need to take this to our server side and charge it 
    - We will use a stripe package on the server side
    - Think of the card id like a drink ticket where you bring it to the bar and say "I was told I can get a drink for this"
    - You give them the token and they will go and charge the card and then deposit the money into your bank account
    - We can grab all user info on the server side but we need the card id

**tip** use as much info on credit card to avoid card declines

```
// MORE CODE

class TakeMyMoney extends Component {
  onToken = res => {
    console.log('onToken Called');
    console.log(res.id);
  };

// MORE CODE
```

## Next - Send id to server side in order to charge the transaction




