# Displaying Single Items
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## What happens when we click on an item on the home page?
* The route changes to something like:

`http://localhost:7777/item?id=cjnos3yvl0eu90a549dkndu71`

* The `id` comes along for the ride
* We get a 404 because we don't have an item page

## Add the item page
## Backend checklist
1. Do we have a query for the single item?
    * Yes
    * Here is our schema where we write our item query

`backend/src/schema.graphql`

```
// MORE CODE

type Query {

  // MORE CODE

  item(where: ItemWhereUniqueInput!): Item
}
```

* To make life easier we tap into Prisma generated queries
* `ItemWhereUniqueInput` comes from our generated:

`prisma.graphql`

```
// MORE CODE

input ItemWhereUniqueInput {
  id: ID
}

// MORE CODE
```

* Expects just an `id` to be passed to it
* That is exactly what we have

2. We need to doublecheck that we have our **resolver**

`backend/src/resolvers/Query.js`

```
const { forwardTo } = require('prisma-binding');

const Query = {

  // MORE CODE

  item: forwardTo('db'),
};

module.exports = Query;
```

* Above we see our single `item` is being forwarded to the `db`

## Our backend check is complete
* There is no extra backend stuff we need to make

## Jump to the frontend
### We need to make our Item page
* Easiest way is to duplicate `inedex.js` (which is the items page)

`frontent/pages/item.js`

```
import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div>
        <p>Single Item Here</p>
      </div>
    );
  }
}

export default Item;
```

## Test it in browser
* View single item page and now it will show up and the 404 is gone

## Create SingleItem component
`SingleItem.js`

```
import React, { Component } from 'react';

class SingleItem extends Component {
  render() {
    return (
      <div>
        <h1>Single Item</h1>
      </div>
    );
  }
}

export default SingleItem;
```

* Import that inside `item.js` page

`item.js`

```
import React, { Component } from 'react';

// custom component
import SingleItem from '../components/SingleItem';

class Item extends Component {
  render() {
    return (
      <div>
        <SingleItem />
      </div>
    );
  }
}

export default Item;
```

## Start off with Query
### Create the GraphQL client query "shell"
* Do we put the GCQ on the page or the component?
    - The component

`SingleItem.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';

// GraphQL queries
const SINGLE_ITEM_QUERY = gql`

`;

class SingleItem extends Component {

// MORE CODE
```

* We import the `graphql-tag` and write the shell for our GraphQL client side query

#### Jump into Playground to make sure your query works
* We make sure to name our query the same as our GraphQL client query "shell" (GCQS - just a name I came up with)
* Add this in Playground

```
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where: { id: $id }) {
    id
    title
    description
    largeImage
  }
}
```

* Add the variable
* Grab an `id` from the item page url:

`http://localhost:7777/item?id=cjnos3yvl0eu90a549dkndu71`

* Here is the `id`: `cjnos3yvl0eu90a549dkndu71` (Yours will be different)

```
{
  "id": "cjnos3yvl0eu90a549dkndu71"
}
```

* Execute the script and you will see output like:

```
{
  "data": {
    "item": {
      "id": "cjnos3yvl0eu90a549dkndu71",
      "title": "VW",
      "description": "Test Description",
      "largeImage": "https://res.cloudinary.com/piplearns/image/upload/c_scale,q_auto,w_1000/v1540483506/buystuff/jehjbtxzxlsgbaysvxsu.png"
    }
  }
}
```

## Wrap our component in a Query tag
* Import `Query` from `react-apollo`
* Check if we have access to the `id` in React Dev Tools
    - We see props is Empty for `SingleItem`
    - Search for Item
        + That has access to the `query` and inside it is `id`

`item.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom component
import SingleItem from '../components/SingleItem';

class Item extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
  };

  render() {
    const { query } = this.props;
    return (
      <div>
        <SingleItem id={query.id} />
      </div>
    );
  }
}

export default Item;
```

* We grab the `id` and pass it down as props to `SingleItem`
* We add PropTypes to make our code easier to debug

### Check of the `id` is availabe in SingleItem
`SingleItem.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

// GraphQL queries
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

class SingleItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;
    return (
      <div>
        <h1>Our Single Item id is {id}</h1>
      </div>
    );
  }
}

export default SingleItem;
```

* We know our item query works so we paste that into the GCQS

## Test in browser
* SingleItem should show you `Our Single Item id is cjnos3yvl0eu90a549dkndu71`

## Wrap our item in the Query
`SingleItems.js`

```
// MORE CODE

  render() {
    const { id } = this.props;
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        <h1>Our Single Item id is {id}</h1>
      </Query>
    );
  }
}

export default SingleItem;
```

* We pass our query and the **item** `id` that our query requires

## Add our Render Props
`SingleItem.js`

```
// MORE CODE
render() {
  const { id } = this.props;
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error {error.message}</p>;
        console.log(data)

        return <h1>Our Single Item id is {id}</h1>;
      }}
    </Query>
  );
}

// MORE CODE
```

## Test in browser
* It should be working
* We log out the data to make sure it is there

## Swap out Apollo error with custom error
`SingleItem.js`

```
// MORE CODE

// custom components
import Error from './ErrorMessage';

// MORE CODE

class SingleItem extends Component {

  // MORE CODE

  render() {
    const { id } = this.props;
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error)
              return (
                <Error error={error} />;
              );

// MORE CODE
```

* We have an issue
    - If you change the item id it still shows the old item
    - We can handle this one of two way
        1. server side
            * Do a custom resolver in `src/resolvers/Query.js` and say if there is now item found, we could throw an error on the server and then we would get an error to appear in `<Error error={error} />` and that would display whatever message we would throw
                - We will take this approach when we cover custom resolvers
        2. client side
            * We could check it like this:

`SingleItem.js`

```
// MORE CODE

<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
  {({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <Error error={error} />;
    if (!data.item) return <p>No Item Found for {id}</p>;

// MORE CODE
```

* Now change the `id` in the URL and you will see 

`No Item Found for djnos3yvl0eu90a549dkndu71`

## Now jump into templating out SingleItem
* We will use Styled Components

`SingleItem.js`

```
// MORE CODE

// custom components
import Error from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
`;

// MORE CODE

    const { item } = data;
    return (
      <SingleItemStyles>
        <img src={item.largeImage} alt={item.title} />
      </SingleItemStyles>
    );
  }}
</Query>

// MORE CODE
```

* View a single item and you will now see the distorted large image

### How can we change the title
* Write now it says this:

`Meta.js`

```
// MORE CODE
    <title>Code Stuff</title>
  </Head>
);

export default Meta;
```

* How can we update this?
    - Do we pass the item to the Meta?
    - Sometimes you update the Query on the component but you need to update something a little higher in the structure
    - Now we need to jump up into the `<head>` of our html
        + Doing this is called a `side effect`

### side effect
* A side effect in JavaScript where you reach outside of something to update
* Many times using side effect is not recommended but sometimes it is a necessity
    - We won't do this using the DOMs `document.querySelector`
    - Instead we will use something build into NextJS that will enable us to introduce **side effects**

## The NextJS `Head` tag
* Import it

`SingleItem.js`

```
// MORE CODE

import styled from 'styled-components';
import Head from 'next/head';

// MORE CODE
```

* We used `Head` before

`Meta.js`

```
import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
  </Head>

// MORE CODE
```

* You can use as many Head tags as you want in your app and it will collect them all and apply them to the head of the rendered out document

### Add a Head tag to SingleItem
* It looks strange because you are putting the `<Head>` not in the `<head>` location but NextJS will take care of grabbing it and putting it in the correct location when the component is rendered

`SingleItem.js`

```
// MORE CODE

<SingleItemStyles>
  <Head>
    <title>Code Stuff | {item.title}</title>
  </Head>
  <img src={item.largeImage} alt={item.title} />
</SingleItemStyles>

// MORE CODE
```

![new title](https://i.imgur.com/VBWucPM.png)

* You can use this technique to update any parts of `<head>`
    - You could introduce a unique favicon only in the single item

## Add rest of template
`SingleItem.js`

```
// MORE CODE

<SingleItemStyles>
  <Head>
    <title>Code Stuff | {item.title}</title>
  </Head>
  <img src={item.largeImage} alt={item.title} />
  <div className="details">
    <h2>Viewing {item.title}</h2>
    <p>{item.description}</p>
  </div>
</SingleItemStyles>

// MORE CODE
```

## Fix our image
* It looks terrible
* Let's add some CSS by updating our Styled Components

`SingleItem.js`

```
// MORE CODE

  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// GraphQL queries
const SINGLE_ITEM_QUERY = gql`

// MORE CODE
```

* What does `object-fit: contain` do?
    - If image is too wide and short or if too tall and wide, it doesn't matter as it will always fit it in
        + This is similar to background cover and background contain but `object-fit` is for actual image tags

## Additional Resources
* [object fit explained](https://css-tricks.com/almanac/properties/o/object-fit/)
