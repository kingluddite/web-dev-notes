# Updating Items with Queries and Mutations
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## We will get into the U of CRUD
* Update

### We need to first update our backend interface
#### We need to do two things:
1. We'll need a query for a single item
    - This will enable us to click on an `Edit` button and pull the existing info about that item
2. We'll need to write a Mutation to handle the updating of the item
    - It will be similar to how CreateItem works

## Add our update schema
`schema.graphql`

```
// MORE CODE

updateItem(id: ID!, title: String, description: String, price: Int): Item!

// MORE CODE
```

* We only have ID as a required argument
    - We don't know what if anything the user will update so we leave off the requirements
    - But we do require an item be returned after we update
* We did not add `image` and `largeImage` but you can use that as a TODO when we finish with this app

### Query for 1 item
* We need to find an item where they have unique input
* We get this from the generated GraphQL

`prisma.graphql`

![single item GraphQL](https://i.imgur.com/qvCp8Wv.png)

```
// MORE CODE

type Query {
  items: [Item]!
  item(where: ItemWhereUniqueInput!): Item
}

// MORE CODE
```

* **note** `!` when call that a **bang**
* We do not require that an Item is returned becuase we could do a Query and get nothing back because nothing was found via the `where`
* We don't require it because if nothing is found we will get an error and we want to avoid that error 

### What is ItemWhereUniqueInput?
* We could easily have do this where we just pass an `id`

`item(id: ID!): Item`

* **tip** Where you can make it the same as GraphQL we should do that

## Create resolvers for updateItem and Item

`resolvers/Query.js`

```
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  // async items(parent, args, ctx, info) {
  //   console.log('getting items');
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
```

* We just make it singular and do the same thing we did for `items`
* We create an `item` query and forward it directly to the db
    - Because there is no extra logic
        + No permissions that need to happen
        + No logic between querying the item we can just forward it directly over to the db

## Let's test if it works
* Make sure you `$ npm run dev` in `backend` and `frontend`
* We are going to need an `id` so let's open playground and query all items to find an `id`

```
query allItems {
  items {
    id
    title
  }
}
```

* Hit play
* Copy one of the item `id`s and paste it in as the value of the `id`

```
query SINGLE_ITEM {
  item(where: { id: "cjnebc0w79xv00b94c9k5pdwm"})
}
```

* We get a subsection error because we need to return the fields we want

```
query SINGLE_ITEM {
  item(where: { id: "cjnebc0w79xv00b94c9k5pdwm"}) {
    id
    title
    description
  }
}
```

* That will give us the following output

```
{
  "data": {
    "item": {
      "id": "cjnebc0w79xv00b94c9k5pdwm",
      "title": "test",
      "description": "testing desc"
    }
```

### Write the resolver for our updateItem
`resolvers/Mutation.js`

```
// MORE CODE

  },

  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
```

* We always pass in our `(parents, args, ctx, info)`
* We take a copy of everything in the updates
    - We are not mutating it but making a copy of them and storing them inside `updates`
    - We then need to remove the `id` from the updates
    - In our copy we will have the `id` but we don't want to update the `id` as it is created by the database when we created the record so we want to leave it unchanged
        + `delete updates.id`
* Then we run the update method
    - `return ctx.db.mutation.updateItem`
        + **ctx** is the context in the request
        + **db** is how we expose the actual prisma db to ourselves
        + **mutation** Then we either have a `query` or a `mutation`
            * And we have access to all of the mutations in our generated `prisma.graphql`
                - Search for `Mutation` in the generated file and you will find:

```
updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
```

* Everything in that Mutation is our API and what we have access to
    - We look at this file to see what the `updateUser` arguments are
        + It takes in `data` and a `where`
            * `where` is how we tell it which item to update
            * `data` is what **data** we want to update

```
// MORE CODE

return ctx.db.mutation.updateItem(
  {
    data: updates,
    where: {
      id: args.id,
    },
  },
  info
);

// MORE CODE
```

* `data` will be the **updates**
* `where` will be where the `id` is equal to the `args.id`
    - That is why we didn't just delete the `id` directly and made a copy of the `args` object because we still needed to reference the `id` of the item that is being pulled in and updated
* We are returning `return ctx.db.mutation.updateItem()` Promise based function it will wait for that `update` to pass
* We also need to pass in a second argument which is `info` and that is how the `updateItem()` function knows what to return
    - If we look at our schema:

```
updateItem(id: ID!, title: String, description: String, price: Int): Item!
```

* The `updateItem` is expecting us to return an `Item`
    - So `info` will contain the query we send it from the `client side` to return that `Item`

## Whew! That's our backend - Let's jump to our frontend
* There will be many similarities between `CreateItem.js` and `UpdateItem.js` 
* So just duplicate CreateItem.js and rename it to be `UpdateItem.js`

### Make these changes
* Rename `CreateItem` to `UpdateItem`
* Remove uploadFile handler and the upload from the jsx form

`UpdateItems.js`

```
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Router from 'next/router';

// graphql
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// libs
import formatMoney from '../lib/formatMoney';

// custom components
import ErrorMessage from './ErrorMessage';

// custom styles
import Form from './styles/Form';

// GraphQL queries
export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int
  ) {
    updateItem(title: $title, description: $description, image: $image, largeImage: $largeImage, price: $price) {
      id
      title
      description
      image
      largeImage
      price
    }
  }
`;

class UpdateItem extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    title: 'Test Title',
    description: 'Test Description',
    image: 'test-image.jpg',
    largeImage: 'test-large-image.jpg',
    price: 1000,
  };

  handleChange = event => {
    const { name, type, value } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({
      [name]: val,
    });
  };

  handleSubmit = async (event, createItem) => {
    // stop the from from submitting
    event.preventDefault();
    // call the mutation
    const res = await createItem();
    // change them to the single item page
    console.log(res);
    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id },
    });
  };

  render() {
    const { title, description, image, largeImage, price } = this.state;
    return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
        {(updateItem, { loading, error }) => (
          <Form onSubmit={e => this.handleSubmit(e, updateItem)}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={description}
                  onChange={this.handleChange}
                />
              </label>
            </fieldset>
            <button type="submit">Update</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default UpdateItem;
```

## Create a new `update` page
`pages/update.js`

* Copy everything from `sell.js` and paste into `update.js`
* Make the obvious changes

```
import React, { Component } from 'react';

// custom components
import UpdateItem from '../components/UpdateItem';

class Update extends Component {
  render() {
    return (
      <div>
        <UpdateItem />
      </div>
    );
  }
}

export default Update;
```

* View `localhost:7777/update` in browser

### We need to give our UpdateItem component the `id` of the item we want to edit
* Problem
    - On the homepage if you click on the `Edit` button of one of the items we want to update it will take you to this kind of URL

`http://localhost:7777/update?id=cjnii0otl5lqb0b94u8anu23n`

* That `id` is ONLY available on the page and if you want it available at lower levels you have two choices

1. Export your component using `withRouter()` like this:

```
 // MORE CODE

export default withRouter(Update);
```

* And that will expose the URL to the component
* But since you have access to it on a page level because we did this:

`_app.js`

* The following exposes the query to every page that we have

```
// MORE CODE

// this exposes the query to the user
pageProps.query = ctx.query;
return { pageProps };

// MORE CODE
```

* So this means we can pass the `id` down to our `UpdateItem` component like this:

`pages/update.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom components
import UpdateItem from '../components/UpdateItem';

class Sell extends Component {
  static propTypes = {
    query: PropTypes.object,
  };

  render() {
    const { query } = this.props;
    return (
      <div>
        <UpdateItem id={query.id} />
      </div>
    );
  }
}

export default Sell;
```

* Test it out
  - View app in browser
  - Go to home page
  - Scroll to item that has an image
  - Click edit
  - Open React Dev Tools
  - Search for Sell
  - Select Sell and look under Props
  - You will see the query object
  - Expand the query object
  - You will see the item `id`
  - We pass the id as a prop to UpdateItem (above code)
  - Search for UpdateItem
  - You will see the `id` has been passed as a prop to UpdateItem

### Add to the query string
`http://localhost:7777/update?id=cjnii0otl5lqb0b94u8anu23n&awesome=true`

* We add `&awesome=true`
* Using React Dev Tools
  - You won't see awesome in UpdateItem because we didn't pass it as a prop
  - But if you search `Sell` and expand `query` under `Props`
    + You will awee both the `id` and `awesome` props

## SFC option
* If you made this a SFC (Stateless functional component) this is how it would look

```
import React, { Component } from 'react';

// custom components
import UpdateItem from '../components/UpdateItem';

const Sell = ({query}) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
)

export default Sell;

```

## More updates for UpdateItem.js
* We can get rid of initial `state`
  - We will only put things into `state` that have changed
  - So we'll make state an empty object

`UpdateItem.js`

```
// MORE CODE

class UpdateItem extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {};

// MORE CODE
```

## Get access to the item itself
* Currently we don't have access to the item
* But we do have the item `id` and we can use that to get access to our item

### We'll add a query for that specific item
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
