# Charging Cards on the Server Side
* We need to charge that token we got from the client on the server side
* We need to convert the cart items into an order item
* We also need to create a new type called Order which will contain all the items that are in that order

## Backend
* We need to do some lifting in our schema and data model

`datamodel.prisma`

```
// MORE CODE

type CartItem {
  id: ID! @unique
  quantity: Int! @default(value: 1)
  item: Item # relationship to Item
  user: User! # relationship to User
}

type OrderItem {

}
```

* OrderItem will be different that CartItem
* CartItem has a relationshipt to an Item
* But OrderItem can't have a direct relationship to an Item because it is possible that that item can get deleted and then you'll be in a situation where somebody has bought something and the item has been deleted
    - Or even worse if you had a relationship to a given item, the price could change but we then don't want to change the invoice on how much they paid
    - We need to cement everything about the item
        + All the images, all the descriptions and we'll take a copy of all the fields of the item at the time of the transaction and move it to the OrderItem
        + That way if the Item were ever to change in the future the actual details of what that person bought at the time would not change

## Adding OrderItem
* We always want to know who is the user and owner of the Item (great info to have if you ever need it)

`datamodel.prisma`

```
// MORE CODE

type OrderItem {
  id: ID! @unique
  title: String!
  description: String!
  image: String!
  largeImage: String!
  price: Int!
  quantity: Int! @default(value: 1)
  user: User
}
```

### Also add a type of Order
* This will contain many order items

`datamodel.prisma`

```
// MORE CODE

type Order {
  id: ID! @unique
  items: [OrderItem!]!
  total: Int!
  user: User!
  charge: String!
}
```

## We just edited our datamodel.prisma so we need to run deploy again
* To generate the file we use to tap into the wonders of prisma
* Make sure you are in the `backend` folder

`$ npm run deploy`

* Stuff this does

## Order
```
Order (Type)
  + Created type `Order`
  + Created field `id` of type `GraphQLID!`
  + Created field `items` of type `[Relation!]!`
  + Created field `total` of type `Int!`
  + Created field `user` of type `Relation!`
  + Created field `charge` of type `String!`
  + Created field `updatedAt` of type `DateTime!`
  + Created field `createdAt` of type `DateTime!`
```

## OrderItem
```
OrderItem (Type)
  + Created type `OrderItem`
  + Created field `id` of type `GraphQLID!`
  + Created field `title` of type `String!`
  + Created field `description` of type `String!`
  + Created field `image` of type `String!`
  + Created field `largeImage` of type `String!`
  + Created field `price` of type `Int!`
  + Created field `quantity` of type `Int!`
  + Created field `user` of type `Relation`
  + Created field `updatedAt` of type `DateTime!`
  + Created field `createdAt` of type `DateTime!`
```

## Relationships created
```
OrderItemToUser (Relation)
  + Created relation between OrderItem and User

  OrderToOrderItem (Relation)
  + Created relation between Order and OrderItem

  OrderToUser (Relation)
  + Created relation between Order and User
```

## Run server again (backend)
`$ npm run dev`

## Update our schema
* We want to create an Order that takes a token (string) and returns an Order

`schema.graphql`

```
// MORE CODE

  createOrder(token: String!): Order!
}

type Query {

// MORE CODE
```

## Create the Resolver!
* We just create a Mutation so now we need to create a resolver for that mutation
* **important** Recalculate the total for the price
    - If you just do this on the client side smart javascripters can change the total price from $100 to $0.01 so you need to check the total price on the server
    - They don't have to match up - so if someone tries to trick it on the client side, the price will always be recalculated on the server side

`Mutation.js`

```
// MORE CODE

  async createOrder(parent, args, ctx, info) {
    // 1. Query the current user and make sure they are signed in
    // 2. Recalculate the total for the price
    // 3. Create the stripe charge
    // 4. Convert the CartItems to OrderItems
    // 5. Create the Order
    // 6. Clean up - Clear the user's cart, delete cartItems
    // 7. Return the Order to the client
  }
};

module.exports = Mutations;
```

## Query current user and make sure they are signed in
```
// MORE CODE

  async createOrder(parent, args, ctx, info) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) throw new Error('You must be signed in to complete this order.');
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `
      id
      name
      email
      cart {
       id
       quantity
       item { title price id description image }
      }
      `
    );
    // 2. Recalculate the total for the price
    // 3. Create the stripe charge
    // 4. Convert the CartItems to OrderItems
    // 5. Create the Order
    // 6. Clean up - Clear the user's cart, delete cartItems
    // 7. Return the Order to the client
  },

// MORE CODE
```

## Recalcuate the total for the price
* We are not reaching into the frontend codebase because sharing code from two different codebases is complicated so we will duplicate code here

```
// MORE CODE

  async createOrder(parent, args, ctx, info) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) throw new Error('You must be signed in to complete this order.');
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
      id
      name
      email
      cart {
       id
       quantity
       item { title price id description image }
      }}`
    );
    // 2. Recalculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );
    console.log(`Going to charge for a total of ${amount}`);
    // 3. Create the stripe charge
    // 4. Convert the CartItems to OrderItems
    // 5. Create the Order
    // 6. Clean up - Clear the user's cart, delete cartItems
    // 7. Return the Order to the client
  },

// MORE CODE
```

* We log this because we don't want to write our whole function out and then test
* If we test is small checkpoints of progress it will be easier to spot and fix bugs

## So we'll jump back to the frontend and write our client side Mutation
`TakeMyMoney.js`

```
// MORE CODE

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {

// MORE CODE
```

* Now wrap a Mutation around our StripeCheckout

```
// MORE CODE

  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(currentUser.cart)}
                name="Buy Stuff"
                description={`Order of ${totalItems(currentUser.cart)} items`}
                image={currentUser.cart[0] && currentUser.cart[0].item.image}
                stripeKey="pk_test_CWdD9aYrDinoOBfGPNiMYbuZ"
                currency="USD"
                email={currentUser.email}
                token={res => this.onToken(res)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;

// MORE CODE
```

* We have a Mutation called createOrder
* Question: how do we get createOrder up to `onToken` and the problem is we can not call createOrder until the token is resturned to us in the server response (res.id ---> inside onToken() )
    - And this is why we did this arrow function

```
token={res => this.onToken(res)}
```

* We can pass the `createOrder` function as a secondary argument to our onToken

```
token={res => this.onToken(res, createOrder)}
```

* And then we can accept it like this:

```
// MORE CODE

class TakeMyMoney extends Component {
  onToken = (res, createOrder) => {
    console.log('onToken Called');
    console.log(res.id);
  };

// MORE CODE
```

* And once we have the Stripe token we can manually call the mutation

`TakeMyMoney.js`

```
// MORE CODE

class TakeMyMoney extends Component {
  onToken = (res, createOrder) => {
    console.log('onToken Called');
    console.log(res.id);
    createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
  };

// MORE CODE
```

* If that works what should happen:
    - We'll fill out the credit card dialog form
    - We'll get our token
    - Then we'll call our Mutation on the server side
    - That will then query the currentUser
    - Tally up the cart
    - And console log it (that's where we stopped coding on the backend)

## Take it for a test drive
* It won't work and after we enter card details and submit we'll get this error:

`[GraphQL error]: Message: Cannot return null for non-nullable field Mutation.createOrder., Location: [object Object], Path: createOrder`

* But if you look at the server console you will see the total price and that is what we wanted to see
* Something like: `Going to charge for a total of 12000`

### Back to backend
#### Create the stripe charge (turn token into `'$$$`)
* Good to do this in a separate file because then you can import that file into any of my files and not have to reconfigure it with that secret token

### backend/src/stripe.js
```
module.exports = require('stripe')(process.env.STRIPE_SECRET);
```

* We require stripe and run it by passing it the Stripe Secret (the file you want to hide from everyone)

* We could write it like this to be more readable

`backend/src/stripe.js`

```
const stripe = require('stripe');
const config = stripe(process.env.STRIPE_SECRET);
module.exports = config;
```

* Paste your top secret Stripe secret into your .env

## Add Stripe to Mutation
`Mutation.js`

```
// MORE CODE

const { hasPermission } = require('../utils');
const stripe = require('../stripe'); // add this line

const setCookieWithToken = (ctx, token) => {

// MORE CODE
```

* Now stripe has all of the methods inside of it for doing anything
    - For doing things like:
        + Charging
        + Pulling data
        + Making refunds
        + Pulling receipts
        + Lots more

```
// MORE CODE

    console.log(`Going to charge for a total of ${amount}`);
    // 3. Create the stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token
    })

// MORE CODE
```

* Test again and you should still get an error but you should see fake cash in your Stripe test account

![transaction success!](https://i.imgur.com/9OrIaN9.png)

* You could pass a description for the transation - just read docs for that and more
* We pass it a token from args.token because that is what our schema expects

`schema.graphql`

```
// MORE CODE

  createOrder(token: String!): Order!
}

// MORE CODE
```

### Next - Finish off our createOrder server side function




