# Saving Orders to the DB
## Convert CartItems to legitimate array of OrderItems
* Continuing from last lesson
* Here is what we need from our OrderItem

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

// MORE CODE
```

* We don't need id (that will be created)
* All this will come from Item
    - title
    - description
    - image
    - largeImage
    - price
* But these are not coming from Item
    - quantity
    - user

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
    });

// MORE CODE
```

* Now we need to take all the fields that are on the Item and take a copy/paste (not do a relationship)
    - We need to do a spread of all items inside cartItem

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
    });

// MORE CODE
```

#### Side example of how above works
* Do this in CDTC

```
const joe = { name: 'wes' }
const joe2 = joe;
joe2.name = 'Joey';
joe
```
* After you type joe, you will get `{name: "Joey"}`
* [in console example](https://i.imgur.com/VYB9qgl.png)

##### Problem and how "spreading with object spread" helps
* Our first variable held an object
* Our second object was assigned to the first object
* Then when we change the name property of the 2nd object, the first object name also changes
* Above is a reference to the actual object
* We just want a copy of all the fields
* So if we do this:

`const joe3 = {...joe}` will give you "Joey"

* And if I do this:

`joe3.name = 'joey two times'`

* And type:

`joe` I get `{name: joey}` and `joe3` returns `{name: 'joey two times}`

#### So by spreading its a cheap way to do a top level copy
* And that is what we did here:
`Mutation.js`

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
    });

// MORE CODE
```

### We need to delete the `id` from order item
* We don't want that `id` and we will have the `id` created when we insert the new row into the OrderItem table (id's are automatically created when rows are inserted into MySQL db tables)

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
    });

// MORE CODE
```

* Summary
    - We'll take a copy of all the fields
    - Add the quantity
    - Connect the user
    - delete the id
    - And return it
    - And we'll end up with an array of orderItems that have been disconnected from the original item

## Step 5 - Create the Order
* `charge` - Is amount we get back from Stripe
* `charge.id` - It the actual transacted 'id', if we ever need to pull back to stripe for any reason, we can use this `id` to reference the transaction
* `items` - Has a relationship to an array of OrderItems

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

* We'll do this: `items: { create: orderItem }`
    - This is great about prisma because look below

```
// MORE CODE

    // 5. Create the Order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
      }
    })

// MORE CODE
```

* We create one type here: `order`
    - And then a few lines further down we pass it an array of other items
    - And it will create for us
        + example: if we have 3 cartItems, it will convert all 3 over to orderItems for us (and it does it all in one fell swoop)
            * This totally is better than us having to create them, save them to the database, save the 'id's and then pass them to `items: HERE`
* We also need to connect the user 

```
// MORE CODE

    // 5. Create the Order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    })

// MORE CODE
```

## 6. Clean up the user's cart
```
// MORE CODE

    // 6. Clean up - Clear the user's cart, delete cartItems
    const cartItemIds = user.cart.map(cartItem => cartItem.id);

// MORE CODE
```

* Above will give us an array of all of the `id`s that are currently in the user's cart and we can use that to delete all of them

```
// MORE CODE

    // 6. Clean up - Clear the user's cart, delete cartItems
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds
      }
    });

// MORE CODE
```

* Above shows the beauty of prisma and that it gives us a very useful function
* We get all the items in the user's cart and then we delete it if the `id` is in the array of cartItemIds

### Lastly, return the order to the client
```
// MORE CODE

    // 7. Return the Order to the client
    return order;

// MORE CODE
```

### And here is the complete method:
`Mutation.js`

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
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token,
    });

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
      return orderItem;
    });

    // 5. Create the Order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    })

    // 6. Clean up - Clear the user's cart, delete cartItems
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds
      }
    });

    // 7. Return the Order to the client
    return order;
  },
};

module.exports = Mutations;
```

* We should console.log that `order` on the client side

`TakeMyMoney.js`

```
// MORE CODE

class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    console.log('onToken Called');
    console.log(res.id);
    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    console.log(order);
  };

// MORE CODE
```

* We set order to a variable
* We now use async await
* We log out the order

### Cause a bug
* Let's make a change in our code to see a bug

`Mutation.js`

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };

// MORE CODE
```

* And modify it to do this:

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem, // we modify this line
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };

// MORE CODE
```

### Test our code
* Click checkout and fill it out with our test transaction info
* We get an ugly error
  - If you don't want to show this error to the user

`Mutation.js`

* You could throw your own custom error based on what happened there

```
// MORE CODE

    // 5. Create the Order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    }).catch(); // add it here (incomplete)

// MORE CODE
```

* Remove the custom error as we'll just keep it simple

### Back to our ugly error
* You will see `Field value.items.create[0].title of required type String! was not provided`
  - So it's saying when we created the cart item we didn't give it a name
  - The reason is we only spread the cartItem and we should have spread the `cartItem.item`
* So update the code like this:

```
// MORE CODE

    // 4. Convert the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
      return orderItem;
    });

// MORE CODE
```

* The reason we need to do this is our CartItem has a relationship to Item

`datamodel.prisma`

```
// MORE CODE

type CartItem {
  id: ID! @unique
  quantity: Int! @default(value: 1)
  item: Item # relationship to Item
  user: User! # relationship to User
}

// MORE CODE
```

* And the Item is what actually has the:
  - title
  - description
  - image
  - largeImage
  - price
  - user

```
// MORE CODE

type Item {
  id: ID! @unique
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  user: User!
}

// MORE CODE
```

* So if we don't spread the cartItem but instead we spread the cartItem's related item

## Test again
* We get another error
* This time we forgot to query the largeImage

`Field value.items.create[0].largeImage of required type String! was not provided.`

`Mutation.js`

* Change this line:

`item { title price id description image }`

* To this line:

`item { title price id description image largeImage }`

## Test again
* It worked
* Check CDTC
  - It gives us:
    + charge
    + id
    + items
    + total

![working credit card test](https://i.imgur.com/2VQPxKY.png)

* Open orders in prisma
* You will see an array of items
* Grab one item id, copy
* View Order item and search page for the id (paste into search)
  - You will see the order item id is a match, with all the description, image, largeImage, price, quantity, title and user

* Code improvement

`TakeMyMoney.js`

```
// MORE CODE

                image={currentUser.cart.length && currentUser.cart[0].item && currentUser.cart[0].item.image}

// MORE CODE
```

* We check if there is a length to the cart (if empty the length will be 0)
* And then check if there is an image in the cart
* And then check if there is an image in the cart
* **note** there is something coming in JavaScript that will allow us to do this deep check so we don't have to keep checking every level deep

## One last issue
* When cart is empty we still have checkout button and then it will complain to us because we failed prop types because there is no image, no number and lots of things aren't being passed
  - And this is because we should not be rendering out this checkout button unless there is something in the cart

### Solution
* We check the length of our cart and if it is anything other than truthy, we won't show it

`Cart.js`

```
// MORE CODE

          <footer>
            <p>{formatMoney(calcTotalPrice(currentUser.cart))}</p>
            {currentUser.cart.length && (
              <TakeMyMoney>
                <SickButton>Checkout</SickButton>
              </TakeMyMoney>
            )}
          </footer>

// MORE CODE
```

* If you have no items in cart you will have no checkout button
* If you have items in cart you will have checkout button

## Next - Display single orders
* So as soon as someone has an order we need to display that order on the page
* And then we should have another page that shows us all the users orders
