# Code Serverless Function
1. Will validate the function
2. Send off email

## Update our placeOrder serverless functions
1. validate the data coming in is correct
2. send the email
3. send the success or error message
4. test send and email

`placeOrder.js`

* We'll loop over each and if we are missing
    - We'll send an error back

```
// MORE CODE

  const requiredFields = ['email', 'name', 'order'];

// MORE CODE
```

* Normally for arrays would use a `forEach` loop to do this
    - But because we need to return from this function:
        + **FOLLOW UP** Using a forEach would return another scope and **IMPORTANT** you can return from an inner scope of an outer scope
            * So to avoid this we'll use a `for of` loop

```
// MORE CODE

exports.handler = async (event, context) => {
  // 1. validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

// MORE CODE
```

## Add a for of loop
```
// MORE CODE

exports.handler = async (event, context) => {
  // 1. validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
  }

// MORE CODE
```

## Troubleshooting
* **WEST PRACTICE** Anytime you have an issue in gatsby your first troubleshooting access should ALWAYS be just to restart and rebuild
* **tip** I logged out the GATSBY environment variable to see it was undefined
* I had an issue because I did not follow instructions
    - I did not have `/functions` at the end of my Gatsby environment variable
    - It gave me a 404 because the endpoint was never getting hit
    - Silly mistake :(
    - **note** You must restart netlify after making changes to `.env`

`GATSBY_SERVERLESS_BASE=http://localhost:8888/.netlify/functions`

## Testing in browser
* Add pizzas in form but no name or email and submit
* The browser will error out but in the terminal you will see
    - Checking that email is good
    - Checking that name is good
    - Checking that order is good

## Check that our data was being sent
* From our usePizza hook
* And we can accept it from inside our handler in our `placeOrder` serverless function
* To do this we'll log out the body to show us what is being sent over

`placeOrder.js`

```
// MORE CODE

exports.handler = async (event, context) => {
  console.log(event.body); // add this!

// MORE CODE
```

## Test in browser
* Make sure to restart netlify
* Add a couple pizzas and submit
* You will see in the terminal `[Object Object]`
    - **note** Whenever you see `[Object Object]` it means that means that your object was turned to a string without properly being stringified

### Huge Lightbulb
* Since we were working on serverless functions I was using `:8000` instead of `:8888` and in 03:24 of video #41 Wes sees the network tab and it shows a CORS error and he tells us that we must be using the :8888 endpoint
* Network > Clear it out > add pizzas and submit form while on `http://localhost:8000/orders` and you will see this error:

![CORS error](http://localhost:8000/orders)

* Now change to this endpoint

`http://localhost:8888/orders` (I ran `$ npm run netlify` again, refresh the page, filled the form out and it worked)
* No errors in browser
* I see the order logged as a string to the terminal

![success on order log in server](https://i.imgur.com/TF6UGFy.png)

* So the `event.body` is coming into our serverless function but it is a string and not an object
    - We need to turn it into an object

`placeOrder.js`

* **note** We also see name, email and total too!

```
// MORE CODE

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

// MORE CODE
  total: '$84.95',
  name: 'asdf',
  email: 'pip@pip.com'
}

// MORE CODE
```

* We run again in `:8888`, fill form out and submit and we get this in the terminal:

```
// MORE CODE

{
  order: [
    {
      id: '-0c86f18e-7e0c-5842-9f54-89e0424ab188',
      size: 'L',
      name: 'The Pear Necessities',
      thumbnail: 'https://cdn.sanity.io/images/dcfbuf0i/production/65fa2d78cf5837fdab395d3bd69b696b49dda894-1024x1024.jpg?w=800&h=800&fit=crop',
      price: '$18.20'
    },
    {

// MORE CODE
```

## WEST Practice
* Always validate on client and server

`placeOrder.js`

```
// MORE CODE

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

  // 1. validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

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

// MORE CODE
```

## Test
* Don't enter and name or email and add a pizza and submit
* You will see errors but if you select `Network` tab in CDTs and have Fetch/XHR selected you will see an error like:

![400 fetch error](https://i.imgur.com/TVwwBcl.png)

* Click on that error
* Then click on Response and you'll see:

![email missing error](https://i.imgur.com/jb5eybk.png)

* **note** We still didn't handle this response but we see our error so our validation is working as we expect

## Next - Send a "templated" email
* But we will need to create a function that will generate the entire order email
    - Since we are not in React so we can's use it here
    - There are whole frameworks to use React for email
    - But we can just use regular HTML templating
        + Since it is not React the syntax will be different

### Our generatorOrderEmail function
```
// MORE CODE

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
    <ul>
      ${order.map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="{$item.name}" />
      ${item.size} ${item.name} - ${item.price}
      </li>`
      )}
    </ul>
    <p>Your total is $${total} due at pickup</p>
    </div>`;
}
// MORE CODE
```

## Now we'll send the email with our new template
* Old

```
// MORE CODE

  const info = await transporter.sendMail({
    from: 'ZA ZA Gabore Pizza! <zaza@example.com>',
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza is here!</p>`,
  });

// MORE CODE
```

* And update it to:

```
// MORE CODE

  const info = await transporter.sendMail({
    from: 'ZA ZA Gabore Pizza! <zaza@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

// MORE CODE
```

* And we update what we return from:

```
// MORE CODE

  console.log(info);

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

// MORE CODE
```

* To this:

```
// MORE CODE

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };

// MORE CODE
```

## Let's add minimal styles
```
// MORE CODE

    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
    </div>`;
}

// MORE CODE
```

## Test it out
* Fill form out and submit and check in your email tester app (ethereal.email)
* You will see the order and pizzas and total
* **TODO** Why are my pizzas huge? (fix!)
    - I need to add this in my GraphQL for orders.js

`order.js`

```
// MORE CODE

image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
// MORE CODE
```

![woops large pizzas!](https://i.imgur.com/gkRrCii.png)

## Removing the commas
* The comma appears when you loop over things using `map` it automatically joins them using a comma
* Fix it with:

```
// MORE CODE

    <ul>
      ${order
        .map(
          (item) => `<li>
      <img src="${item.thumbnail}" alt="{$item.name}" />
      ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>

// MORE CODE
```

## Next
* We need to have a loading screen waiting for the message and if anything goes wrong we should display the errors to the user
