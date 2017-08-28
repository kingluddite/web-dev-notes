# Exploring the Stripe API
* Sign in for [Stripe](https://stripe.com/) Account
* Log in
* You will see `test` everywhere
    - When you first sign up for Stripe you are in `Test` mode
    - Test Mode allows you to accept fake credit card numbers
    - You can click `activate your account` to make your account live

## API
![api button](https://i.imgur.com/41z2Uaq.png)

* Click the API button
* It gives you a `Publishable key` and a `Secret key`
    - The Pub key id's our app to Strip and we will use that on our frontend of our app
    - The Secret key is very secret. We don't want to share it with anyone
* We store all our keys inside the server `config` folder
    - We can't do that on the front end
    - We'll add the Pub key to the front end
    - We'll add the secret key to our config folder on server

## Install Checkout for stripe
[Link](https://stripe.com/checkout)

* But we will use a variation of this called [react-stripe-checkout](https://github.com/azmenak/react-stripe-checkout)
* Using this Library makes working with React and Strip much easier

### Install npm module of react-stripe-checkout
`$ yarn add react-stripe-checkout`

* **note** When I first installed this I was in the server directory and not the client directory
    - This is a big problem
    - I need to make sure I install this on the client because when I push to production, my stripe client side won't work because it was installed in the wrong `package.json`
* First change into the `client` directory `$ cd client`
* Then install with `yarn add react-stripe-checkout` 
