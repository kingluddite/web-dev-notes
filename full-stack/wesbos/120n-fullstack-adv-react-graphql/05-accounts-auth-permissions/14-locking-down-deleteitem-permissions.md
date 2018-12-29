# Locking Down DeleteItem Permissions
* Only allow delete of items if they are the owners of that item
* Or if they are an admin priv
* Or if they have an item delete priv

`Mutation.js`

```
// MORE CODE

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have permissions
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {

// MORE CODE
```

* If someone doesn't have the option to delete items we need to use the UI to alert them that they don't have permission to delete
    - We have a small button and not much space to display the error
    - We will catch the error and display it on the front end to populate the UI with an alert dialog

* We need to first code the `schema.graphl`

```
 // MORE CODE

type Mutation {
  createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
  updateItem(id: ID!, title: String, description: String, price: Int): Item!
  deleteItem(id: ID!): Item
  signup(email: String!, password: String!, name: String!): User!
  signin(email: String!, password: String!): User!
  signout: SuccessMessage

  // MORE CODE
```

## We will short circuit our deleteItem function to always throw an Error
* Try to delete an item and we see an error in the front end:
    - `You do not have permissions to delete this item`
    - How can we catch this error?
        + We could use a try/catch but that is verbose
        + A better way is `deleteItem()` is a Promise and if you ever want to catch errors that Promises have you simply tag on a `.catch()` on the end of the Promise like this:

`DeleteItem.js`

```
// MORE CODE

      <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: this.props.id }} update={this.update}>
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this item?')) {
                deleteItem().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>

// MORE CODE
```

* Now delete item and you'll see error code string in alert window

`Mutation.js`

```
// MORE CODE

  async deleteItem(parent, args, ctx, info) {
    // throw new Error('You do not have permissions to delete this item');
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    );
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },

// MORE CODE
```

## Sample in console
```
> ['DOG', 'CAT'].some(pet => ['BIRD', 'SNAKE'].includes(pet));
< false
```

* Above returns false
* But if there was also a CAT like this:

```
> ['DOG', 'CAT'].some(pet => ['BIRD', 'SNAKE', 'CAT'].includes(pet));
< true
```

```
// MORE CODE

  async deleteItem(parent, args, ctx, info) {
    // throw new Error('You do not have permissions to delete this item');
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    );

    if (ownsItem || hasPermissions) {
      // nothing
    } else {
      throw new Error("You don't have permission to do that");
    }
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },

// MORE CODE
```

* Above will work but it has a code smell since it has an empty if statement
* Let's refactor and clean up our code

```
// MORE CODE

  async deleteItem(parent, args, ctx, info) {
    // throw new Error('You do not have permissions to delete this item');
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. Check if they own that item, or have permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    );

    if (!ownsItem && !hasPermissions) {
      throw new Error("You don't have permission to do that");
    }

    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },

// MORE CODE
```

## We get this error
`GraphQL error: Cannot read property 'id' of undefined`

* We also need to pass the user `id` like this:

```
// MORE CODE

  async deleteItem(parent, args, ctx, info) {
    // throw new Error('You do not have permissions to delete this item');
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title user { id }}`);
    // 2. Check if they own that item, or have permissions

// MORE CODE
```

* Now try to delete and you will see that you can delete the item
