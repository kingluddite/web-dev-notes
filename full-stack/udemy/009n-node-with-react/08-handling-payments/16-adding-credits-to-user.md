# Adding Credits to User
![credits property on User Model](https://i.imgur.com/VzFJxsn.png)

* We will add the `credits` property to our User Model class
    - This credits will have a default value of `0`
* Current our User Model just has a googleId property

`User.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

// Create a Mongo Model class
// And tell mongoose that it needs to be aware that this new collection
// needs to be created
mongoose.model('User', userSchema);
```

* Whenever you define a scheme you can just assign a data type like String or if you have multiple properties you want to assign, then create an object and store them inside it (like we are doing below)

`User.js`

```js
// more code
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});
// more code
```

* We make the type Number and we add a default value of `0`
* When a user is created their credits will be `0`
* Lots of other options available
    - View [mongoose documentation](http://mongoosejs.com/docs/2.7.x/docs/schematypes.html) for more info on "Additional options"

## Now add credits to user who bought something
* How do we get a reference to the user that just made a transaction?
* When we use Passport and a user signs into our app we can access the current User Model as `req.user`
    - This is set up automatically by Passport
    - We wired this up in `index.js` using:

```js
app.use(passport.initialize());
app.use(passport.session());
```

* **remember** Any time we want to respond to a user's request we type `res.send()`
    - And we send back the data we want to communicate back to the browser

`billingRoutes.js`

```js
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
```

* We add 5 credits to the user
  - We use Passport to add it to the user logged in
* We use async await to save the credits to the user Database
* We send the user back to the browser in the response
## Test it out
* Make sure your server is running `$ npm run dev`
* View the Terminal and make sure there are no errors
