# Optimistic Responses && Cache Updates with Apollo
* We will fix 2 problems
    1. When you delete something it doesn't get removed from the cart until you refresh
    2. When it does work it seems sluggish

## Optimistic Response
* This will speed up the actions of our site and make our site super fast with adding and deleting stuff

## refetch
* We did this before and we can do it again
* But we can also just reach into the cache and delete that item from the cache once the data comes back

## Why did we ask for the `id` to be returned from `removeFromCart`?
* We did this so we could remove the `item` from the `cache` 

`RemoveFromCart.js`

```
// MORE CODE

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

// MORE CODE
```

## Mutation `update` attribute
* We can use this attribute of Mutation to delete an item from the cache via its `id` we got back from our client side GraphQL
* If you just have one `update` function just name it `update`
* This `update` function gets called as soon as we get a response back from the server after a mutation has been performed

```
// MORE CODE

  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }} update={this.update}>
        {(removeFromCart, { loading, error }) => (

// MORE CODE
```

### Add the function inside our RemoveFromCart class

* **cache** - The Apollo cache and we can use this to read directly into the apollo cache
* **payload** - This is the actual dump of information returned from the server once it is done (in this case we will just get the `id` of the deleted cartItem - aka the Mutation result)

`RemoveFromCart.js`

```
// MORE CODE

  // This gets called as soon as we get a response back from the server after a mutation has been performed
  update = (cache, payload) => {
    // 1. first read the cache
    // 2. remove that item from the cart
    // 3. write it back to the cache
  };

  render() {

// MORE CODE
```

* We will need the `CURRENT_USER_QUERY` so let's grab that now

`RemoveFromCart.js`

```
// MORE CODE

// GraphQL
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`

// MORE CODE
```

### Read the CURRENT_USER_QUERY
```
// MORE CODE

// This gets called as soon as we get a response back from the server after a mutation has been performed
update = (cache, payload) => {
  console.log('Running remove from cart update fn');
  // 1. first read the cache
  const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  console.log(data);
  // 2. remove that item from the cart
  // 3. write it back to the cache
};

// MORE CODE
```

* I added an intro log to let me know what I'm doing
* I added a log to show the data returned
* Open CDTC
* Refresh browser
* Click to remove a `cartItem`

### Check out CDTC
* You will see ROOT_QUERY
    - currentUser (logged in)
        + cart
            * cartItems and quantiy

![cache read](https://i.imgur.com/R4FyTPA.png)

### Now we just need to remove the item from the cache 
* I want to see what the payload looks like

```
// MORE CODE

  update = (cache, payload) => {
    console.log('Running remove from cart update fn');
    // 1. first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    console.log(payload);
    // 2. remove that item from the cart
    // const cartItemId = payload.data.currentUser.cart.idgcc
    // 3. write it back to the cache
  };

// MORE CODE
```

* Refresh browser
* Delete cartItem
* View CDTC and you will see the structure to get the `id` of the cartItem we want to delete

![payload of id to delete](https://i.imgur.com/CdtW2Hs.png)

### Filter out the `id`
```
// MORE CODE

    const cartItemId = payload.data.removeFromCart.id;
    data.currentUser.cart = data.currentUser.cart.filter(cartItem => cartItem.id !== cartItemId);

// MORE CODE
```

* So we filter out if it has that `id` (if the cartItem.id !== cartItemId)
* This removes the item from the cart but now we need to write it back to the cache

### Write back to the cache
```
// MORE CODE

    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });

// MORE CODE
```

### The full `update` function
`RemoveFromCart.js`

```
// MORE CODE

  // This gets called as soon as we get a response back from the server after a mutation has been performed
  update = (cache, payload) => {
    console.log('Running remove from cart update fn');
    // 1. first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    // console.log(payload);
    // 2. remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.currentUser.cart = data.currentUser.cart.filter(cartItem => cartItem.id !== cartItemId);
    // const cartItemId = payload.data.currentUser.cart.idgcc
    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

// MORE CODE
```

### Try it in the browser
* We now can delete it but there is a sluggish delay before it disappears
* Why?
    - Because:
        + The request has to go back to the server
        + The server has to delete the item
        + Then the server has to return to us the `id`
* We can make this faster using an optimistic response
    - We still want to run this update function, but let's run it immediately, because we know it's probably going to work (hense the term optimistic) and we should be able to update the UI to make it look like it worked before it actually did
        + And then behind the scenes we'll actually do the deleting
        + The good news is this is simple to do
            * We just give our Mutation what we think the server is going to respond with
                * We need to provide type names
                    - We'll assume it will return a `__Mutation`
                    - We'll assume it will return a removeFromCart object
                        + And inside of that we'll assume it will return an `id` of the item that was removed

```
// MORE CODE

      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            id,
          },
        }}
      >

// MORE CODE
```

* Now what will happen is that when we actually delete the item, it will optimistically immediately reply with the above piece of information but also at the same time, in the background, it will go and actually remove the item from the cart

## Try again
* Clear CDTC
* Refresh page
* Add item to cart
* Delete it
* You will see it immediately removes the item from the cart (super fast!)
* You can tell it ran twice because we see our console logs has run twice
    - It immediately ran
    - And then it ran again

![optimistic](https://i.imgur.com/IS0tYwe.png)

* We also get a `Missing field __typename` warning
* Prisma is cool and will automatically add the `__typename` for us but since we are doing this on the client side we need to manually add it like this:

```
// MORE CODE

      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id }}
        update={this.update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id,
          },
        }}
      >

// MORE CODE
```

* After making the above slight modification refresh the browser, add another cartItem and delete it
* The cartItem should disappear immediately and no more `__typename` warning

### How would we make our addToCart optimistic too?
* You could manually or optimistically return all of the data
* We would have to pass to AddToCart component in Item.js:
    - The image
    - The title
    - The price
* Then we could optimistically reply with an object that had all that information and then you could add an update function that could manually add it
* TODO - try to make addToCart optimistic

## Next - Animate our Cart

