# Setting Error, Loading and Success States
<!-- MarkdownTOC -->

- [Let's test our loading state](#lets-test-our-loading-state)
- [West Practice](#west-practice)
- [Take wait function off \(comment out\)](#take-wait-function-off-comment-out)
- [Now we'll test success](#now-well-test-success)
  - [But we shouldn't be able to submit empty pizza orders](#but-we-shouldnt-be-able-to-submit-empty-pizza-orders)

<!-- /MarkdownTOC -->

## Let's test our loading state
* We'll write a test function to make the function take a few more seconds

`placeOrder.js`

```js
// MORE CODE

// test loading by waiting some time
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // we'll wait 5 seconds
  await wait(5000);

// MORE CODE
```

* Comment out this message

`usePizza.js`

```js
// MORE CODE

  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);
    setError(null);
    // setMessage('Go eat'); // this!

// MORE CODE
```

1. When someone submits the order
2. We set the loading to true

```js
// MORE CODE

  // this is the function that is run when user submits the form
  async function submitOrder(event) {
    event.preventDefault();
    console.log(event);
    setLoading(true);

// MORE CODE
```

3. When the order is successfully done
4. Then we turn the loading off

```js
// MORE CODE

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false); // we turn loading off on success
      setMessage('Success! Come on down for your pizza');
    }

// MORE CODE
```

* Test, after 5 seconds you will see "Oops" appear in UI
* So loading is working as we expect

## West Practice
* Disable on loading
* Do it on fieldsets and you won't be able to type in fields while loading

`order.js`

* Put `disabled` on all fieldsets

```js
// MORE CODE

        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} id="name" onChange={updateValues} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
        </fieldset>

// MORE CODE
```

* All fieldsets with disabled

```js
// MORE CODE

  return (
    <>
      <SEO />
      <OrderStyles onSubmit={(e) => submitOrder(e)}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} id="name" onChange={updateValues} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );

// MORE CODE
```

## Take wait function off (comment out)
## Now we'll test success
* Success works

### But we shouldn't be able to submit empty pizza orders
![empty order](https://i.imgur.com/WbRvwnE.png)

* **tip** When you are doing an API your validation should always be done server side before it goes in any type of database
* We'll check for an array with no length (no pizzas ordered)

`placeOrder.js`

```js
// MORE CODE

for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // validate that a pizza order actually has at least one pizza
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Houston we have a problem. No pizzas were in your pizza order Duh!`,
      }),
    };
  }
// MORE CODE
```

* Test and try to place an order with no pizzas
* You will get a UI message alerting you of your mistake
