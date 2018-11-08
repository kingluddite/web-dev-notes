

# Data Relationships
* Permissions part of course
* Owner can do things depending on if they are an administrator/custom permissions/etc

## We need a relationship between our user and our item
* Right now when someone creates something... we don't know who created that item
* We need a way of tying the item to the user that created it

`backend/datamodel.prisma`

```
// MORE CODE

type Item {
  id: ID! @unique
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  # createdAt: DateTime!
  # updatedAt: DateTime!
  # user: User!
}
```

* To this:

```
type Item {
  id: ID! @unique
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  user: User!
}
```

* We just added `user: User!` and that is a relationship between the User and the Item
    - Whenever we create an Item we'll add the user `id` into that item
    - And that will allow us to populate the user and any other information that is assocated with that item

## We just changed our datamodel
* REMEMBER! - Anytime we change our datamodel we have to re-deploy that to prisma

### Stop the server
`$ npm run deploy`

#### Houston we have a problem
* We get this error

```
Item
    ✖ You are creating a required relation, but there are already nodes that would violate that constraint.
```

* Why the error?
    - We told Prisma that all Items require a User
    - Two choices
        + Force (not good as it leads to other errors)
        + Run your server
            * Delete 4 entries
            * Refresh and we see the pagination problem
              - Very soon in Apollo every time we delete one, it should refetch page 1 and pop in the newest one (Fix coming soon!)
            * Delete all records `0 items total`
            * Stop server
* Now run deploy again

`$ npm run deploy`

* Now we no longer get an error

## Open Mutation resolver when we create an item
`backend/src/resolvers/Mutation.js`

```
// MORE CODE

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    console.log(item);

    return item;
  },

// MORE CODE
```

* We need to check if the user is logged in

`Mutation.js`

```
// MORE CODE

async createItem(parent, args, ctx, info) {
  // Check if they are logged in
  if (!ctx.request.userId) {
    throw new Error('You must be logged in to do that');
  }

// MORE CODE
```

## Test it out
* Run server in `backend`

`$ npm run dev`

* Signout
* Manually visit the `/sell` route

`http://localhost:7777/sell`

* You can still see the `sell` even though we are logged out
* We need to fix this with a wrapper component that checks if you are logged in (in a bit)
* Try to upload an image
* When you hit submit you will get a validation error

`Shoot!You must be logged in to do that`

* Best Practice
  - Two levels of validation
    + client
      * makes a better UX
    + server
      * secure part

## Add the user to when the item is created
* We are spreading all of the fields into `data`

`Mutation.js`

```
// MORE CODE

const item = await ctx.db.mutation.createItem(
  {
    data: {
      ...args,
    },
  },
  info
);

// MORE CODE
```

* How will we add a user?
* How will we make a relationship in Prisma?
* Do the following to achieve both:

`Mutation.js`

```
// MORE CODE

const item = await ctx.db.mutation.createItem(
  {
    data: {
      // this is how we create a relationship between the Item and the User
      user: {
        connect: {
          id: ctx.request.userId,
        },
      },
      ...args,
    },
  },
  info
);

// MORE CODE
```

## Test to see if this works
* We need to see if the user `id` is added to the item when we create it
* Sign in
* Create an item to sell
* Open Prism.io db and view item you added
* You will see a `user` field with a link icon (that means the field is linked to another Model)
* copy the id into the clipboard
* Switch to the User table and search for the `id` you just copied and you will find a match
  - So we see that the user that created the item has an `id` and that `id` is in the `item` record he just created

## That is a relationship
* It is very simple to create relationships

## Next - Advanced Permission work
