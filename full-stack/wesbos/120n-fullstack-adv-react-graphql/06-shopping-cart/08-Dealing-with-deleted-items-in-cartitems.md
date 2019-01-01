# Dealing with Deleted Items in CartItems
* We have 2 problems

## 1. Problem - Can't delete
* Try to delete an item from the home page
* We get this error: `GraphQL error: The change you are trying to make would violate the required relation 'CartItemToItem' between CartItem and Item`

## 2. What happens if we can delete item but it is in someone's cart?
* We need to show that that item has been removed
* Or we need to remove from their cart entirely

### Let's tackle problem 1 first
```
// MORE CODE

type CartItem {
  id: ID! @unique
  quantity: Int! @default(value: 1)
  item: Item! # relationship to Item
  user: User! # relationship to User
}

// MORE CODE
```

* This says the Item is required
    - We need to change this because it is possible for the cart to have an item where the item has been deleted and therefor doesn't exist

## Remove the required
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

### Redeploy it
* Stop server

`$ npm run deploy`

* You should see

```
CartItem (Type)
  ~ Updated field `item`. It is not required anymore.
```

* Start server again
* (in backend)

`$ npm start`

* Try to delete an item
* You can
* No errors
* Cart has not updated by removing the non-existant item
* Refresh page and we get an error because it is trying to show an item that no longer exists
    - You won't get an error if you delete an item not in the shopping cart (after the page refresh)
    - But if your item is in the shopping cart it will give you an error

`Cannot read property 'image' of null`

### Here is the fix
```
// MORE CODE

const CartItem = ({ cartItem }) => {
  // first check if that item exists
  if (!cartItem.item)
    return (
      <CartItemStyles>
        <p>This Item has been removed</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img width="100" height="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

// MORE CODE
```

* You can now delete items
* If they are in the shopping cart, refresh browser and you will see that the item no longer exists
* You can also delete that item that no longer exists
* But it does not remove itself automatically

## Todo
* Do a refetch of the current user's cart

## Next
* Clean up our nested render props mess
* 
