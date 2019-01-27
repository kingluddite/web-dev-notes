# Server Side Add To Cart
* We want to be able to add items to our Cart but before we do that we need to set up our data model
* Right now we have 2 types:
    - User
    - Item
    - (we also have an enum Permission)

## We now need to add a new type called CartItem
* Why?
    - You can just take an `item` and add it to the user's cart directly because we need to know the quantity of how many they want to have
    - And this new type will be related to both the Item and the User

`datamodel.prisma`

```
// MORE CODE

type CartItem {
  id: ID! @unique
  quantity: Int! @default(value: 1)
  item: Item! # relationship to Item
  user: User! # relationship to User
}
```

* We are establishing that there will be a reationship between CartItem and Item
* We are also establishing that there will be a relationship between CartItem and User
* Remember that in the bg we are using a MySQL db which deals with relationships through joins
* Prisma will help us write this complex SQL

## Now we have to add CartItem as an array to User
`datamodel.prisma`

```
type User {
  id: ID! @unique
  name: String!
  email: String! @unique
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission]
  cart: [CartItem!]!
}

// MORE CODE
```

* **note** The CartItem is required and the array is required

### Now we need to update our schema
* We do this because we want this to be available both server side and client side

`schema.graphql`

```
// MORE CODE

type User implements Node {
  id: ID!
  name: String!
  email: String!
  permissions: [Permission!]!
  cart: [CartItem!]!
}
```

## How can we add things to our cart?
* We will add a second Mutation
* We will also eventually need to add a removeFromCart Mutation as well

```
// MORE CODE

  addToCart(id: ID!): CartItem
}

type Query {

// MORE CODE
```

* The addToCart needs and `id` and it will return a CartItem when called

## We just changed our data model. What do we always do when we change our data model?
* Redeploy!!!!!!

## What do we do when we change our schema?
* You need to code a resolver that lines up with that schema addition

## How do we redeploy?
* Stop the server
* Navigate to the `backend` folder
* Run this:

`$ npm run deploy`

* I had to use `--force` to force deploy

## Check out the deploy output
```
Changes:

  User (Type)
  ~ Updated field `resetTokenExpiry`
  + Created field `cart` of type `[CartItem!]!`

  CartItem (Type)
  + Created type `CartItem`
  + Created field `id` of type `ID!`
  + Created field `quantity` of type `Int!`
  + Created field `item` of type `Item!`
  + Created field `user` of type `User!`
  + Created field `updatedAt` of type `DateTime!`
  + Created field `createdAt` of type `DateTime!`

  CartItemToUser (Relation)
  + Created relation between CartItem and CartItem

  CartItemToItem (Relation)
  + Created relation between CartItem and CartItem

Applying changes 1.3s

Your Prisma GraphQL database endpoint is live:

  HTTP:  https://us1.prisma.sh/XXXX
  WS:    wss://us1.prisma.sh/XXXX


post-deploy:
project prisma - Schema file was updated: src/generated/prisma.graphql
```

## Things to point out:
* `CartItem` Type was created with all its fields
* Check out the two relationships that were created!
* Our generated `prisma.graphql` was regenerated with the new stuff inside it

## Install the latest prisma
* Sometimes it gets outdated and you need to update it

`$ npm i -g prisma`

## Restart the server and client
* In backend `$ npm start`
* In frontend`$ npm run dev`

## Now let's add our Mutation resolver
### addToCart
* We need to make sure the user is signed in
* We need to query the users current cart
* We need to check if that item is already in their cart
    - There is a possibility that the item is already in the cart
    - And if it is, then just increment the quantity of that cart item
* Other we will create a "fresh" cart item

```
// MORE CODE

const [existingCartItem] = await ctx.db.query.cartItems({
 // code here  
})

// MORE CODE
```

* We want to query based on the userId and the itemId that they are trying to put in
    - This will let us know if this user put this item into their cart before
        + If they have not, then we will make a new item
        + If we were to use just the singular `cartItem()` instead of the plural `cartItems()` it wouldn't work
            * Why?
                - You will see the two in our generated `prisma.graphql`

### Her is the plural cartItems

```
// MORE CODE

type Query {
  cartItems(where: CartItemWhereInput, orderBy: CartItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CartItem]!

// MORE CODE
```

* This allows us to filter by `CartItemWhereInput`

### And the singular `cartItem`

```
// MORE CODE

  cartItem(where: CartItemWhereUniqueInput!): CartItem

// MORE CODE
```

* And if you look for `CartItemWhereUniqueInput` in this same file you will find this:

```
// MORE CODE

input CartItemWhereUniqueInput {
  id: ID
}

// MORE CODE
```

* It only takes an ID of the cart item
* In our case we don't know what the cart item ID is
* So we want to be able to query based on both the item ID and the user ID
* And if we search for `CartItemWhereInput` which is in **cartItems**
    - It offers 72 lines of code (lots more flexibility)

```
// MORE CODE

input CartItemWhereInput {
  """Logical AND on all given filters."""
  AND: [CartItemWhereInput!]

  """Logical OR on all given filters."""
  OR: [CartItemWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CartItemWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  quantity: Int

  """All values that are not equal to given value."""
  quantity_not: Int

  """All values that are contained in given list."""
  quantity_in: [Int!]

  """All values that are not contained in given list."""
  quantity_not_in: [Int!]

  """All values less than the given value."""
  quantity_lt: Int

  """All values less than or equal the given value."""
  quantity_lte: Int

  """All values greater than the given value."""
  quantity_gt: Int

  """All values greater than or equal the given value."""
  quantity_gte: Int
  item: ItemWhereInput
  user: UserWhereInput
}

// MORE CODE
```

### Query the users current cart
```
// MORE CODE

    // 2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId }, // ID of user we are passing
        item: { id: args.id }, // ID of item we will be passing
      },
    });

// MORE CODE
```

### Check if that item is already in their cart and increment it by 1 if it is
```
// MORE CODE

    // 3. Check if that item is already in their cart and increment by 1 if it is
    if(existingCartItem) {
      console.log('This item is already in your cart');
      return ctx.db.mutation.updateCartItem(WHATGOESINHERE????);
    }

// MORE CODE
```

* How can I answer **WHATGOESINHERE????**
    - Look in the generated prisma code for `updateCartItem()` and you will see what arguments it requires or options you can use

`prisma.graphql`

```
// MORE CODE

  updateCartItem(data: CartItemUpdateInput!, where: CartItemWhereUniqueInput!): CartItem

// MORE CODE
```

* In takes in some `data` as well as a `where` and that is what we will pass it

```
// MORE CODE

    // 3. Check if that item is already in their cart and increment by 1 if it is
    if (existingCartItem) {
      console.log('This item is already in your cart');
      return ctx.db.mutation.updateCartItem({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      }, info);
    }

// MORE CODE
```

## But if this is the first time we are adding a new item to our cart we want to create a new item
* A cart item is just a pointer of who has it and what item is it
* But we CAN NOT DO THE FOLLOWING!

```
// MORE CODE

// 4. If its not, create a fresh CartItem for that user!
return ctx.db.mutation.createCartItem({
  data: {
    user: userId
  }
})

// MORE CODE
```

* Because in prisma when dealing with relationships we have to structure our code like this:

```
// MORE CODE

    // 4. If its not, create a fresh CartItem for that user!
    return ctx.db.mutation.createCartItem({
      data: {
        user: {
          connect: { id: userId },
        },
        item: {
          connect: { id: args.id },
        },
      },
    }, info);

// MORE CODE
```

### And here is our full addToCart() resolver
```
// MORE CODE

  async addToCart(parent, args, ctx, info) {
    // 1. Make suer they are signed in
    const userId = ctx.request.userId;
    // same line above could be destructured like:
    // const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in');
    }
    // 2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      user: { id: userId }, // ID of user we are passing
      item: { id: args.id }, // ID of item we will be passing
    });
    // 3. Check if that item is already in their cart and increment by 1 if it is
    if (existingCartItem) {
      console.log('This item is already in your cart');
      return ctx.db.mutation.updateCartItem({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      }, info);
    }
    // 4. If its not, create a fresh CartItem for that user!
    return ctx.db.mutation.createCartItem({
      data: {
        user: {
          connect: { id: userId },
        },
        item: {
          connect: { id: args.id },
        },
      },
    }, info);
  },
};

module.exports = Mutations;
```

## Jump to the frontend
* We will add a new component called `AddToCart.js`

`AddToCart.js`

```
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

class AddToCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;

    return <button type="button">Add To Cart</button>;
  }
}

export default AddToCart;
```

## Swap out hard coded button in `Item.js` with our new button component
`Item.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// custom styles
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

// custom components
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

// MORE CODE
```

* And swap out for our new button

```
// MORE CODE

          <AddToCart />
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
```

* **note** I changed this so that the last line is exporting the class (_better for debugging in React Dev Toolbar_)

## Our new button doesn't do anything - Time to write a Mutation
* This will line up with the `Mutation` **resolver** we built on our server side

`Cart.js`

```
// MORE CODE

const ADD_TO_CART_MUTATION = gql`
 mutation ADD_TO_CART_MUTATION($id: ID!) {
   addToCart(id: $id) {
     id
     quantity
   }
 }
`
class AddToCart extends Component {

// MORE CODE
```

* Now we wrap our button with the `Mutation`

```
// MORE CODE

  render() {
    const { id } = this.props;

    return (
      <Mutation mutation={ADD_TO_CART_MUTATION}>
        {addToCart => (
          <button type="button" onClick={addToCart}>
            Add To Cart
          </button>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;

// MORE CODE
```

* But we never passed in the item `id` so let's do that now using the `variables` prop

### How can I troubleshoot if I need to use `await`?
* You need to use `await` when you are dealing with a **Promise**
* Make the following change:

`Mutation.js`

```
// MORE CODE

    // 2. Query the users current cart
    const [existingCartItem] = ctx.db.query.cartItems({
      where: {
        user: { id: userId }, // ID of user we are passing
        item: { id: args.id }, // ID of item we will be passing
      },
    });

// MORE CODE
```

* I removed the `await` before **ctx.db.query.cartItems()**
* Clear console of any errors
* Refresh page
* Click on `Add to Cart` button
* Click on `Network` tab of Chrome console
* Click on last `localhost` request and view the `Response` tab

![Response error](https://i.imgur.com/hkzLqYm.png)

* The error is telling you that you can't destructure `existingCartItem`
* So change this:

`const [existingCartItem] = ctx.db.query.cartItems({`

* To this:

`const existingCartItem = ctx.db.query.cartItems({`

* So the way we handle this type of bug is stick it just in a variable without the destructuring and then just log out that variable
* And then just `return` to see what is it actually getting

```
// MORE CODE

    // 2. Query the users current cart
    const existingCartItem = ctx.db.query.cartItems({
      where: {
        user: { id: userId }, // ID of user we are passing
        item: { id: args.id }, // ID of item we will be passing
      },
    });
    console.log(existingCartItem);
    return;

// MORE CODE
```

* And if you view the server you will see:

`Promise { <pending> }`

* This means we were dealing with a **Promise** (`cartItems` returns a **Promise**) so we need to use `await`

### Put the code back the way it was before
`Mutation.js`

```
// MORE CODE

    // 2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId }, // ID of user we are passing
        item: { id: args.id }, // ID of item we will be passing
      },
    });

// MORE CODE
```

* Refresh the browser
* Click `Add To Cart` button
* Nothing happens but if you click the same item again you will see `This item is already in your cart`

## Very useful debuggin tip here!!!!
### Check the data to make sure we are getting the data we expect in our cart
* **note** Get the `localhost` request/response in the Chrome dev tools is a bit tricky
* Click the `Network` tab, have `All` selected
* Make sure `filter` is on
* Clear **twice** and then click the `Add to Cart` button quickly
* You will see 2 `localhost` requests
* Click the 2nd localhost
* View the `Response` tab and you will see the data in the response

`{"data":{"addToCart":{"id":"cjqaj2ureqguw099166kdjzkg","quantity":8,"__typename":"CartItem"}}}`

![here is what our response looks like](https://i.imgur.com/Egjhaef.png)

* **note** Look at the `quantity` in the screenshot above (it is 9 - Because I clicked it 9 times... so the increment of the quantity is working!

## Check it out on `Prisma.io`
* You will see the user has a cart item attached to them

![CartItem is attached to user](https://i.imgur.com/Lxkf5ui.png)

* And if you click on the cart in the user you will see an array of 2 different items in the user cart

![two items in user CartItem](https://i.imgur.com/kQrplSK.png)

* They are only `id`s but when we do populate them with our GraphQL query we'll be able to get info about the cart item and then we'll further be able to get information about the item inside that cart

* **note** We also have CartItem, Item, and User

![3 Tables](https://i.imgur.com/j6GmuNL.png)

* And the CartItem table has the item, the quantity and the user who requested it!

![item, quantity and user](https://i.imgur.com/SaYtIwX.png)

## Next - We want to be able to display the items in real time as soon as we click Add To Cart




