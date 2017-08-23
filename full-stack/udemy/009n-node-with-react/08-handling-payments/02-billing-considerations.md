# Billing Considerations
![credit card form mockup](https://i.imgur.com/dWXBSc0.png)

* When user adds credits they should see some credit card form
    - Name
    - Card
    - Submit
    - Collect their money

## Rules of Billing
* We are bad at security
    - Never accept raw credit card numbers
    - Never store credit card numbers
    - Always use an outside payment processor

## Billing is hard
* Possible to avoid monthly payments/mutiple plans?
    - [Recurly](https://recurly.com/) is built on top of strip and helps make montly subscription payment plans less painful
* Fraud and chargebacks are a pain

## Stripe
* We are going to use Stripe as our 3rd party payment processor
* [stripe](https://stripe.com/)
* Stripe takes care of all the security items
* As Dev, you can sign up for free and use their sandbox
