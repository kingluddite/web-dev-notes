# Creating Charges
* We will add a npm module that will facilitate the process of working with the Stripe API on the server side of our app
    - We have one stripe module on the frontend `react-stripe-checkout`
        + That just shows a form to our users
    - On the backend we will use a completely separate stripe library that's all about taking the token we got from the front end and exchanging it for an actual charge to the user's credit card

## npm module `stripe`
[link](https://www.npmjs.com/package/stripe)

* This is a module for working with Stripe inside node applications
* [full documenation link](https://stripe.com/docs/api/node#intro)
* We want to find documentation for charging or debiting a user's credit or debit card
* `Core Resources` > `Charges`
    - [link](https://stripe.com/docs/api/node#charges)
        + We want to create a charge object
        + When you use the Stripe API it will return to us a charge object
        + But what do we have to provide to them before we get that charge object?
    - Scroll further down to the `Create a Charge` section
    - [link Create a Charge](https://stripe.com/docs/api/node#create_charge)
    - When we create a charge, we create a charge object
    - Which will be this block of code

![create a charge code](https://i.imgur.com/edJQmO6.png)

* When we create a charge it needs a `source` (that is the token we got back from the checkout library

## Install npm for stripe
* Kill server
* Make sure you are in the server folder
* `$ yarn add stripe`
