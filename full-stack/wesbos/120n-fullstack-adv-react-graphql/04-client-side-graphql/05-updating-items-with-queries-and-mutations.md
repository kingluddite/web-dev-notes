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
#### Test in Playground
* We write a query that will get one item

```
query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
```

* We give it a name that we'll match with our local GraphQL query
* We need to pass it a value for `id`
  - We get the `id` from running this in Playground

```
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
```

* From the output we copy an `id` to the clipboard

### Pass the variable
* In the QUERY VARIABLES section of Playground we add:

```
{
  "id": "cjnebc0w79xv00b94c9k5pdwm"
}
```

* Run and test it and you'll see one item
`UpdateItem.js`

## Local GraphQL query shell
Import `Query` and create our local GraphQL query shell:

```
// MORE CODE

import { Mutation, Query } from 'react-apollo';

// MORE CODE

// GraphQL queries
export const SINGLE_ITEM_QUERY = gql`
  // our Playground query will go here
`;

export const UPDATE_ITEM_MUTATION = gql`

// MORE CODE
```

* We know our Playground query works so we paste it from the clipboard like this:

```
// MORE CODE

// GraphQL queries
export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`

// MORE CODE
```

### Aside - Add Prop Types
`UpdateItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MORE CODE

class UpdateItem extends Component {
  static propTypes = {
    id: PropTypes.string,
  };

// MORE CODE
```

## Now use the Query
* We are going to nest a Mutation inside a Query, it will get very `nesty` with indentation and could get a bit unruly
  - To keep it simply we'll write the basic Query first

```
// MORE CODE

<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
  {({ data, loading, error }) => (

    })
</Query>
<Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>

// MORE CODE
```

* Add our open and close Query
* Add the `query` attribute and set it equal to our query `SINGLE_ITEM_QUERY`
* Pass the variables that query needs `id`
  - We have that available in props

## Wrap the Query around the Mutation

`UpdateItem.js`

```
<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
  {({ data, loading, error }) => (
    <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
      {(updateItem, { loading, error }) => (
        <Form onSubmit={e => this.handleSubmit(e, updateItem)}>
          
        </Form>
      )}
    </Mutation>
  )}
</Query
// MORE CODE
```

* We need to query for the one item and then return the mutation
  - By nesting we can expose multiple Queries and Mutations to it
  - The indentation is way to crazy... we'll fix that in a bit

## Prettier just hurt us... Ouch!
* Prettier turned our `{}` to `()`
* We need to run an `if` statement and we need to use `{}` so we'll have block scope and not `()` with an implicit return
  - If we don't use block scope we'll get an error
  - Here is our fix:
    + Switch `()` to `{}`
    + Add `return()` inside our `{}`

`UpdateItem.js`

```
// MORE CODE

<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error {error.message}</div>;
    return (
      <Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
        {(updateItem, { loading, error }) => (
          <Form onSubmit={e => this.handleSubmit(e, updateItem)}>

            // MORE CODE

          </Form>
        )}
      </Mutation>
    );
  }}
</Query>

// MORE CODE
```

* If Prettier formats code correctly you are all good
* This is a huge area where people make mistakes as it is very hard to discern the proper positioning of all the braces and brackets
  - We can improve on this

## Before we improve let's export differently
* We'll place the named export at the bottom instead
* We'll remove the exports here:

`UpdateItem.js`

```
// MORE CODE

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

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

// MORE CODE
```

* And here we place our named exports at the bottom
  - I like this way better as the exports are all together now and it is easier to see what your exporting

`UpdateItem.js`

```
// MORE CODE

export default UpdateItem;
export { SINGLE_ITEM_QUERY, UPDATE_ITEM_MUTATION };
```

### Summary so far
* We have our `Query`
  - Then we have a render prop function
    + Then we check if it is loading or not
      * If not loading we return a Mutation
        - Which will render out the <form>
          + And that exposes both the `data` of the `item`
          + As well as the updateItem function

## Fill our form with values
* Take the data that was returned from our single item query and put it into the value of our input boxes
* But we don't want to tie it to `state` directly
  - We want to show the user what they have and if they change anything, that's when I want to put it into `state`
  - To do this we'll use `defaultValue`

## defaultValue
* We will change our form field's `value` attribute to `defaultValue`
  - In React we can use `defaultValue` which enables us to set a input box to some text without actually tying it to `state` and we do this because we will be mirroring the form fields value to `state` only when they change it
    + We'll change `value={title}` to `defaultValue={data.item.title}`

`UpdateItem.js`

```
// MORE CODE

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

// MORE CODE
```

* We'll update that to this:

```
// MORE CODE

<label htmlFor="title">
  Title
  <input
    type="text"
    id="title"
    name="title"
    placeholder="Title"
    required
    defaultValue={data.item.title}
    onChange={this.handleChange}
  />
</label>

// MORE CODE
```

## Take it for a test drive in the browser
* View the home page
* Click on the edit button of an item
* You will see a URL similar to this:

`http://localhost:7777/update?id=cjnii0otl5lqb0b94u8anu23n`

* The `title` field is prepopulated with the `data.item.title`
* Open React Dev Tools and search for UpdateItem
* Select that component in React Dev Tools
* Note that there is no `state`
* Change the value in the form to something else and observe how `state` updates with that value
* Change the other form fields to do the same:

`UpdateItem.js`

```
// MORE CODE

<label htmlFor="price">
  Price
  <input
    type="number"
    id="price"
    name="price"
    placeholder="Price"
    required
    defaultValue={data.item.price}
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
    defaultValue={data.item.description}
    onChange={this.handleChange}
  />
</label>

// MORE CODE
```

* Test in browser and the other fields should mimic what is happening in the `title` form
* View in React Dev Tools where the changes to the form field are all being reflected into `state`

### Update our UPDATE_ITEM_MUTATION
* We will remove image and large image (you can update these on your own time)

`UpdateItem.js`

```
// MORE CODE

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int
  ) {
    updateItem(title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {

// MORE CODE
```

`UpdateItem.js`

* Make sure you named the Mutation `updateItem`

```
// MORE CODE
<Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
  {(updateItem, { loading, error }) => (

// MORE CODE
```

## Add an inline function call
* I'd rather make them all their separate functions but just in case you want to use inline functions this is how you would go about it:

`UpdateItem.js`

```
// MORE CODE

<Form
  onSubmit={async e => {
    // stop the form from submitting
    e.preventDefault();
    // call the mutation
    const res = await updateItem();
    console.log(res);
  }}
>

// MORE CODE
```

* You can use `e` or `event` or `evt` for **event**

### Test in browser
* Make changes to fields
* Click Update
* You will get an error

`Field "updateItem" argument "id" of type "ID!" is required but not provided.`

* You need to pass an `id` variable
  - And we can't do this:

```
// MORE CODE

const res = await updateItem({
  variables: id
});

// MORE CODE
```

* Because `id` isn't in `state`
* So we need to set variables equal to an object and inside that object we'll add `id: id` (we get the `id` from `const { id } = this.props;`) and then we need to add all the other changes that are in `state` using the ES6 spread operator `...`

```
const { id } = this.props;

// MORE CODE

variables: {
  id,
  ...this.state
}

// MORE CODE
```

* We still get an error for a missing `id`
* The reason is we need to update our local GraphQL queries
* We did pass the `id` in the `updateItem` function but we didn't tell the GraphQL query to expect it and that is the error we are seeing
* We also remove all the required fields because the only field required in our `updateItem` is `id`

```
// MORE CODE

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!,  $title: String, $description: String, $price: Int) {
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

* Test and the update should now work

### Now Let's take the inline and make it a method
* I don't like using inline functions

#### Since we have `updateItem()` function inside a render prop
* How do we access it outside of your render component?
  - The answer it you pass it to a function when it is submitted

```
// MORE CODE

<Mutation mutation={UPDATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
  {(updateItem, { loading, error }) => (
    <Form onSubmit={event => this.updateItem(event, updateItem)}>

// MORE CODE
```

## Add our `updateItem` method
```
// MORE CODE

updateItem = (event, updateItemMutation) => {
  console.log('Updating Item!!')
  console.log(this.state);
}

render() {

// MORE CODE
```

## Test it in browser
* We name it `updateItemMutation` so it doesn't conflict with `updateItem` function
* We see our form is submitting when we hit submit
* We need to turn that off

```
updateItem = (event, updateItemMutation) => {
  event.preventDefault(); // add this line
  console.log('Updating Item!!')
  console.log(this.state);
}
```

* Test and update the form fields
* Whatever you update you will see in state
* And we log it so we see it is working
* Change the fields and update again and see how state changes

```
// MORE CODE

updateItem = async (event, updateItemMutation) => {
  const { id } = this.props;
  event.preventDefault();
  const res = await updateItemMutation({
    variables: {
      id,
      ...this.state,
    },
  });
  console.log('Updated!');
};

// MORE CODE
```

* Test and it works as before

## No title
* What if we passed a bogus `id` like: 

`http://localhost:7777/update?id=notreal`

* We would get a TypeError of **Cannot read property 'title' of null
* The solution to this problem is to check if there is no item and if there isn't let the user know with a friendly notification

```
// MORE CODE

<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (!data.item) return <p>No Item Found for ID {id}</p>;
    // if (error) return <div>Error {error.message}</div>;

// MORE CODE
```

* Now we don't get an error for not sending a valid `id`
* We comment out the `error` because of the custom error handling in place

## Save or Saving
* You can dynamically change the word based on the state of the form

```
// MORE CODE

  <button type="submit">
    Updat
    {loading ? 'ing' : 'e'}
  </button>
</Form>

// MORE CODE
```

* This is a benefit of Apollo becuase it gives you `loading` that developers can use to vastly improve the UX of forms


updateItemMutation
pass query of `notreal` like `update?id=notreal` we'll get a TypeError: Cannot read property `title` of null
  to fix that add this conditiotional
    `if (!data.item) return <p>No Item Found for ID {id}`

## Next - Deleting (The D of CRUD)

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
