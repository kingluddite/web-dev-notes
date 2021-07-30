# Create a Honey Pot to defend against bots
* Stop bots from spamming your form
* Best way is adding a captcha to prove you are not a robot
    - [syntax.fm on honeypots](https://syntax.fm/show/263/hasty-treat-forms-captchas-honeypots-dealing-with-malicious-users-and-the-sad-state-of-contact-forms)
* If you don't want captcha use a honeypot and that should work great

## What is a honeypot?
* It is a field in your contact form that the user is not supposed to fill out
* If a bot fills that out than you know it's a bot
    - **West Practice** Never use the word "honey" in your honeypot field
        + Bots are smart enough to look for that word
        + I'll call it `blackhole`

`orders.js`

```
// MORE CODE

  const { values, updateValues } = useForm({
    name: '',
    email: '',
    blackhole: '',
  });

// MORE CODE

  <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
  <input type="blackhole" name="blackhole" id="blackhole" value={values.blackhole} onChange={updateValues} />
</fieldset>

// MORE CODE
```

* Then in `userPizza.js` where we send the data to our server we add our new honeypot field

`usePizza.js`

* This will send the value of this input box to our server

```
// MORE CODE

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      blackhole: values.blackhole,
    };

// MORE CODE
```

* The we'll go server side (placeOrder.js) to see if they submitted
    **West Practice** - Give an error number with honeypot message so if a user tells you that error number you know you need to fix your honeypot

```
// MORE CODE

  // check if they have filled out the honeypot
  if (body.blackhole) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Black holes are the seductive dragons of the universe. ERROR_ID: VH0U812',
      }),
    };
  }

// MORE CODE
```

## Test it out
* Currently we see the honeypot field (but we will soon hide it)
* But we'll fit out and and see if we get our alert in the UI

![honeypot error showing up!](https://i.imgur.com/ZNQsboC.png)

## Hide our input
* We can't just use `hidden` attribute on `input` as bots are smart enough to work around that

### solution -hide with css display: none
* Add a class name

`orders.js`

```
// MORE CODE

          <input
            className="blackhole" // add this!
            type="blackhole"
            name="blackhole"
            id="blackhole"
            value={values.blackhole}
            onChange={updateValues}
          />
        </fieldset>

// MORE CODE
```

`styles/OrderStyles.js`

* Bots can't be smart enough to figure out this is css or not (this has been verified by dozens of people who use this in production)
* Other ways to hide it
    - scale it to zero
    - scale it to 1px
    - use z-index
    - text-indent to -10000px
    - **caution** Lots of ways to hide things on the internet but make sure you are not throwing off screenreaders

```
// MORE CODE

  .blackhole {
     display: none;
  }
`;

export default OrderStyles;
```

## Test again
* You won't see the honeypot
* fill out form with name, email and a pizza and make sure it submits
