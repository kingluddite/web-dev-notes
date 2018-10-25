# Deleting Items
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## What we will do
* We have a delete button on all our items
* When you click it, a window will prompt you for delete confirmation
* You except it will delete
* You deny it will not
* We also will soon be dealing with pagination so when we delete we will need to keep pagination in mind

## We will make the delete button it's own component
* We do this to make our app follow DRY principles
* So we can use this one delete button in multiple places in our app
* We will abstract away the logic

`components/DeleteItem.js`

```
import React, { Component, Fragment } from 'react';

class DeleteItem extends Component {
  handleDelete = () => {
    console.log('delete clicked');
  };

  render() {
    return (
      <Fragment>
        <button type="button" onClick={() => this.handleDelete()}>
          Delete
        </button>
      </Fragment>
    );
  }
}

export default DeleteItem;
```

* Update the Item.js

`Item.js`

```
// MORE CODE

// custom components 
import DeleteItem from './DeleteItem';

export default class Item extends Component {
 
 // MORE CODE 

      <ItemStyles>

      // MORE CODE

          <button type="button">Add to Cart</button>
          <DeleteItem />
        </div>
      </ItemStyles>
    );
  }
}
```

* Go to home page
* Click delete button and view the log in the console

### Using `this.props.children`
* We can save time using this.props.children

`Item.js`

```
// MORE CODE

    <button type="button">Add to Cart</button>
    <DeleteItem>Delete Item</DeleteItem>
  </div>
</ItemStyles>

// MORE CODE
```

`DeleteItem.js`

```
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class DeleteItem extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  handleDelete = () => {
    console.log('delete clicked');
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <button type="button" onClick={() => this.handleDelete()}>
          {children}
        </button>
      </Fragment>
    );
  }
}

export default DeleteItem;
```

* Destructured `this.props.children`
* Add prop types

## Jump to the backend
* We need to write our `schema`

`backend/src/schema.graphql`

```
// MORE CODE

type Mutation {
  createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
  updateItem(id: ID!, title: String, description: String, price: Int): Item!
  deleteItem(id: ID!): Item
}

// MORE CODE
```
 
* **tip** You could also create a new type called `SuccessMessage` and return that with a String with a message (food for thought for after we finish)

## Code a resolver for our delete Mutation
* We make a `where` variable because we plan to use this more than once
* We will add authentication in a bit

`const where = { id: args.id };`

`src/resolvers/Muations.js`

```
// MORE CODE

  },

  deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    // 2. Check if they own that item or have the permissions
    // 3. Delete it!
  },
};

module.exports = Mutations;
```

* Why do we want to find the item before we delete it?
  - Because we will be querying it first to check if the person deleting it either:
    + Owns it
    + Or the person deleting it has permissions to delete any item (Like a Super Admin on the site)

```
// MORE CODE

deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };
  // 1. find the item
  const item = ctx.db.query.item({ where });
  // 2. Check if they own that item or have the permissions
  // 3. Delete it!
},

// MORE CODE
```

* Test in browser
* Go to home page
* Delete an item and you will get an error `Cannot read property 'id' of null`
* Refresh browser and item is not deleted

# JavaScript waits for no man
* Let's add `async/await`

```
// MORE CODE

async deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };
  // 1. find the item
  const item = await ctx.db.query.item({ where });
  // 2. Check if they own that item or have the permissions
  // 3. Delete it!
},

// MORE CODE
```

## We usually pass in info
```
// MORE CODE

const item = await ctx.db.query.item({ where }, info);

// MORE CODE
```

* When we pass in `info` it will pass in data from the frontend
* Let's look at `UPDATE_ITEM_MUTATION`

`UpdateItem.js`

```
// MORE CODE

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

// MORE CODE
```

* It will take in the query and request that these fields: (id, title, description, price) come back
* But sometimes when we have an intermediary and we have to perform a second query, the `info` won't get passed but instead we will manually pass a GraphQL query ourselves

```
// MORE CODE

const item = await ctx.db.query.item({ where }, `{ id title }`);

// MORE CODE
```

* Above is just raw GraphQL that we passed in and it will parse it for us
  - Later on we will come back and add to this like:

```
// MORE CODE

const item = await ctx.db.query.item({ where }, `{ id title user {id} }`);

// MORE CODE
```

* But currently we don't have users so we can't use that yet

## Delete the item with ctx
```
// MORE CODE

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // 2. Check if they own that item or have the permissions
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;
```

* Our schema and resolver are now set up

## Playground time
* Open playground and you should now see `deleteItem` in our Schema API
* We need to find an `id` of one of our **items** so we can use the Playground to find that
  - Open Playground SCHEMA to find `items` query API

```
query {
  items {
    id
  }
}
```

* If you have any items in your db that will list them and output their `id`
* Copy an `id` to the clipboard
  - I copied `cjno0we2z798v0b19k41n7gut`
* You are going to use that in your `deleteItem` Mutation

## Create your Playground query
```
mutation DELETE_ITEM_MUTATION($id:ID!) {
  deleteItem(id: $id) {
    id
  }
}
```

## Add your Query VARIABLES that will paste in the `id` you copied to the clipboard

```
{
  "id": "cjno0we2z798v0b19k41n7gut"
}
```

* Click Play button in Playground to execute the delete action
  - You will see this output

```
{
  "data": {
    "deleteItem": {
      "id": "cjno0we2z798v0b19k41n7gut"
    }
  }
}
```

* Refresh the browser and you will see that `item` has been deleted
* Now we tested our deleteItem and we know it works

## Jump to the frontend
`DeleteItem.js`

```
// MORE CODE

// GraphQL
import { Mutation } from 'react-apollo'; // add this line
import gql from 'graphql-tag'; // add this line

// MORE CODE

const DELETE_ITEM_MUTATION = gql`
  // paste your Playground GraphQL here
`;

// MORE CODE
```

* We import the `react-apollo` Mutation component and the `graphql-tag`
* Then we create our Mutation shell that will house our GraphQL
  - Just paste it inside the GraphQL shell like this:

```
// MORE CODE

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {

// MORE CODE
```

## What are we adding the Mutation to?
* We need to add the Mutation to the button so we surround the button with Mutation tags

```
// MORE CODE

<Mutation>
    <button type="button">
      {children}
    </button>
  )}
</Mutation>

// MORE CODE
```

* We need to pass our Mutation the delete mutation we created and imported

```
// MORE CODE

<Mutation mutation={DELETE_ITEM_MUTATION}>
    <button type="button">
      {children}
    </button>
  )}
</Mutation>

// MORE CODE
```

* We need to add an `id` variable
* The `DeleteItem` component currently doesn't have access to the `id` but we can pass it down from the containing component `Item`

`Item.js`

```
// MORE CODE

          <DeleteItem id={item.id}>Delete</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}
```

* Now we can use it and pass it to our Mutation

```
// MORE CODE

render() {
  const { children, id } = this.props;
  return (
    <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }}>

// MORE CODE
```

### Add render props

```
// MORE CODE

<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }}>
  {() => {}}
    <button
  }

// MORE CODE
```

* Just add the basic code for render props like:

```
// MORE CODE

<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }}>
  {() => {}}

// MORE CODE
```

* `DELETE_ITEM_MUTATION` give us access to `deleteItem`
* Mutation gives us access to `{ error }` so we can detect any errors
  - We will fire and error to alert users who don't own the item that that can't delete it
* We will use an implicit JavaScript return and turn our `{}` to `()`
* We will also put our `button` inside the Mutation

```
// MORE CODE

<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.update}>
  {(deleteItem, { error }) => (
    <button type="button">
      {children}
    </button>
  )}
</Mutation>

// MORE CODE
```

* Add a confirmation `Are you sure you want to delete this item?`

```
// MORE CODE

<Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.update}>
  {(deleteItem, { error }) => (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItem();
        }
      }}
    >
      {children}
    </button>
  )}
</Mutation>

// MORE CODE
```

* So we have an inline event that will prompt for confirmation of delete
  - Yes... and we call the delete() method (that was passed in via our Mutation)
  - No and we don't delete the item and close the prompt

## Prop Types
* We get an unexpected use of `confirm` but we will ignore it
  - I'll leave a better delete confirmation up to you for homework
* We add prop types for `id` and `children`

`DeleteItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MORE CODE

class DeleteItem extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

```

## Test in browser
* Click delete button on item and it doesn't delete
* Refresh browser and the item is gone

### What just happened?
* This is where we get into interface updates in Apollo
* The item is deleted but it is deleted on the `backend`
* But it will not be deleted on the cache in the `frontend`
* So although the item was really deleted we can't see the effect of the delete unless we refresh the page

## How do we update the cache?
* If you want to update the cache and remove it from the page and you'll have to manually do that youself
  - But we have 2 options
    1. We could refetch this entire query on the home page and that will manually hit the backend for a list of items and come back with an updated version (not a bad option)
    2. But sometimes you just want to remove one of those items from the page and that is what we want to do here and we can do this via an `update` function

```
// MORE CODE

<Mutation 
  mutation={DELETE_ITEM_MUTATION} 
  variables={{ id }} 
  update={this.update}
>

// MORE CODE
```

* So we'll create a separate function for update

```
// MORE CODE

update = (cache, payload) => {
  
};

render() {

// MORE CODE
```

* Apollo will give you two things when the update happens:
  1. cache
    + What is the cache?
      * Open Apollo Chrome Dev Tool to see the cache in action
      * These are all the items it currently has

![apollo cache](https://i.imgur.com/hgELGar.png)

  2. payload
    * This is the `data` that has come back from the item that got deleted

## Steps for Optimisic UI

```
// MORE CODE

update = (cache, payload) => {
  // manually update the cache on the client
  //  so it matches the server
  // 1. Read the cache for the times we want
  // 2. Filter the deleted item out of the page
  // 3. Put the items back!
};

render() {

// MORE CODE
```

### 1. Read the cache for the times we want
* You can't just go into the cache and delete items
* You need to use a GraphQL query to read the items from the cache
  - `cache.readQuery()`
  - We need to ask ourselves an important question and that is in this particular case: 

**Question:** `What was the query to get these items on the page in the first place?`

**Answer**:
`Items.js`

```
// MORE CODE

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
      price
    }
  }
`;

// MORE CODE
```

* Remember we exported the named export of `ALL_ITEMS_QUERY` and we did that so we could use that GraphQL query elsewhere

```
// MORE CODE

export default Items;
export { ALL_ITEMS_QUERY };

// MORE CODE
```

* Now we'll import `All_ITEMS_QUERY` into `DeleteItems.js`

`Delete`

```
// MORE CODE

// GraphQL
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './Items'; // add this line

// MORE CODE
```

### cache.readQuery()
```
// MORE CODE

update = (cache, payload) => {
  // manually update the cache on the client
  //  so it matches the server
  // 1. Read the cache for the times we want
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  console.log(data);
};

// MORE CODE
```

* Add a couple new items
* Go to home page and open Chrome console
* Delete one item
* Confirm deletion
* View the console and see that it lests all items in an array
  - So `ALL_ITEMS_QUERY` gives us access to all the items that are on the page for that cache

## Now we need to filter the deleted item out of the page
* We will use the ES6 filter function to accomplish this task

```
// MORE CODE

// 2. Filter the deleted item out of the page
data.items = data.items.filter(item => WHAT GOES HERE???) 

// MORE CODE
```

* We want to loop over every single item and only include it if it doesn't match the deleted one
* `data.items` is what gets returned by cache.readQuery() and that holds all the items

```
// MORE CODE

// 2. Filter the deleted item out of the page
data.items = data.items.filter(item => item.id !== ???) 

// MORE CODE
```

* How can we find what the name is of the deleted item?
  - Let's log to see for ourselves

```
// MORE CODE

update = (cache, payload) => {
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  console.log(data, payload);
  // 2. Filter the deleted item out of the page
};

// MORE CODE
```

* Test in browser and delete an item
  - Then check what is inside `payload`
  - It will be second
      + first item `data`
      + second item `payload`

![payload](https://i.imgur.com/rbqPAP9.png)

* That will show you we can get the `id` of the deleted item with this path:

`payload.data.deleteItem.id`

* So let's try it out:

```
// MORE CODE

update = (cache, payload) => {
  // manually update the cache on the client
  //  so it matches the server
  // 1. Read the cache for the times we want
  const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  // 2. Filter the deleted item out of the page
  data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
};

// MORE CODE
```

* We check the item for a match between the `item.id` and the `id` of the item that was deleted
* **warning** If you try to delete an item that was already deleted on server but you didn't see that it was deleted on client, you will get an error

## The update function
* Mutation has `mutation`, `variables` and `update` attributes

## Now we need to put the items back using `cache.writeQuery()`
* We will write to the `ALL_ITEMS_QUERY`
  - Second arg will be `data: data` (which can be reduced to just `data`)

### Test it out
* Delete an item
* Now once it comes back from the db it gets removed from the page

## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch
