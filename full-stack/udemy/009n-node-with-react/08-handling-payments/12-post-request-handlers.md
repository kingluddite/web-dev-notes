# Post Request Handlers
* We have `authRoutes.js` which handle everything authentication
* But billing is a different beast so let's create a new file called `billingRoutes.js`

`billingRoutes.js`

```js
class Payments extends Component {
  render() {
    return (
      <ReactStripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </ReactStripeCheckout>
    );
  }
}
```

* Add our new route

`index.js`

```js
// more code
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app); // add this line
// more code
```

* Strange syntax but...
* When we export billingRoutes they return a function
* So we pass that function `app`
* Totally valid JavaScript syntax

`billingRoutes.js`

```js
module.exports = app => {
  app.post('/api/stripe', (req, res) => {
     
  });
};

```
