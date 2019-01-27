# Pagination
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## Add 9 items
* Look at home page and you may not see all the items you added and that is because your items are in the cache and the (client) cache is not updating with the items on the server
    - The cache is caching all of the items and when we go back to the home page it is saying, oh I already have that query so it doesn't update with fresh content
    - We need to figure out how do invalidate that query
        + There are a couple of options we can choose to do this

## Create Pagination Component
`Pagination`

```
import React, { Component } from 'react';
import PaginationStyles from './styles/PaginationStyles';

class Pagination extends Component {
  render() {
    return (
      <PaginationStyles>
        <p>Oh Boy... It's Pagination!</p>
      </PaginationStyles>
    );
  }
}

export default Pagination;
```

`Items.js`

```
// MORE CODE

// custom components
import Item from './Item';
import Pagination from './Pagination';

// MORE CODE

class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination />
        <Query query={ALL_ITEMS_QUERY}>

         // MORE CODE

        </Query>
        <Pagination />
      </Center>
    );
  }
}

// MORE CODE
```

* View Home page and you'll see we have our Pagination at the top and bottom

### Get our Pagination working
* We need to know the total number of items in our db
* How many items are on the current page
* How many items are we displaying per page
* But what if we have 1000 items?
    - We don't want a query to fetch all 1000 items as it would be too large and slow down our app and use up too many resources
    - This is where `Prisma Connections`

#### Prisma Connections
* Seach generated `prisma.graphql` for **Connection**
    - We have Users and Items
    - And we also have `userConnection` and `itemConnection`
        + These will return aggregate data about the actual data itself
        + And this is what we will use to know how many items are available to us
        + We will do this inside our `schema.graphql`

`prisma.graphql`

```
// MORE CODE

usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
itemsConnection(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ItemConnection!

// MORE CODE
```

`schema.graphql`

```
// MORE CODE

type Query {
  items: [Item]!
  item(where: ItemWhereUniqueInput!): Item
  itemsConnection(where: ItemWhereInput): ItemConnection!
}
```

* We could also pass `itemsConnection` **orderBy**, **first**, **last** and **skip**

### Jump into our resolvers
`backend/src/resolvers/Query.js`

`Query.js`

```
// MORE CODE

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),

// MORE CODE
```

* Now we can test if this worked
    - Open our local API and try to connect to it

`http://localhost:4444/`

```
query PAGINATION_QUERY {
  itemsConnection {
    edges
    pageInfo
    aggregate
  }
}
```

* edges and pageInfo
    - Used for when you are using infinite scroll
    - We are doing traditional pagination and not using infinite scroll
* aggregate
    - This is what we will use for our Pagination
        + And we will query this for `count`

```
query PAGINATION_QUERY {
  itemsConnection {
    aggregate {
      count
    }
  }
}
```

* Output

```
{
  "data": {
    "itemsConnection": {
      "aggregate": {
        "count": 8
      }
    }
  }
}
```

* Filter
    - Where title contains 'Eagles'

```
query PAGINATION_QUERY {
  itemsConnection(where: {
    title_contains: "eagles"
  }) {
    aggregate {
      count
    }
  }
}
```

* This technique would be great if you want to paginate by categories

## Frontend Pagination
### Let's tackle the linking of pagination first
* Import `graphql-tag`
* Copy our playground query and paste into our GCQS

`Pagination.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// styles
import PaginationStyles from './styles/PaginationStyles';

// GraphQL
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

class Pagination extends Component {
  render() {
    return (
      <PaginationStyles>
        <Query query={PAGINATION_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error {error.message}</div>;

            return <p>The total count of items is {data.itemsConnection.aggregate.count}</p>;
          }}
        </Query>
      </PaginationStyles>
    );
  }
}

export default Pagination;
```

* Now we need to know how many pages there will be:

`config.js`

```
// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:4444`;
export const perPage = 4;
```

* Good to put this here so that if we need to change Pagination it will change that setting globally

`Pagination.js`

```
// MORE CODE
<Query query={PAGINATION_QUERY}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error {error.message}</div>;
    const { count } = data.itemsConnection.aggregate;
    const pages = Math.ceil(count / perPage);

    return <p>Page 1 of {pages}</p>;
  }}
</Query>

// MORE CODE
```

* We only want whole numbers so we round up using `Math.ceil()`
* Will give you something like:

![page of count](https://i.imgur.com/VfoXLqA.png)

### How do we get the current page?
* Our URL will look like this when we list all our items

`http://localhost:7777/items?page=2`

* `page=2` will be coming in via the `Items` page via a `prop`

`index.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// custom components
import Items from '../components/Items';

class Home extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
  };

  render() {
    const { query } = this.props;
    return (
      <div>
        <Items page={query.page} />
      </div>
    );
  }
}

export default Home;
```

* So we need to pass it down
* It will be in our Home page `index.js`
* View home page in React Dev Tools and search for Home
    - You will see `query` prop and it is currently empty
    - Manually change URL to:

`http://localhost:7777/items?page=2`

* View React Dev tools again and now Props has query with `page: 2`
* We need to get this value into Pagination
    - We passed query to `Items`
    - Open Items and pass it down to `Pagination`

`Items.js`

```
// MORE CODE

import PropTypes from 'prop-types';

// custom components
import Item from './Item';
import Pagination from './Pagination';

// MORE CODE

class Items extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
  };

  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page} />
        <Query query={ALL_ITEMS_QUERY}>

         // MORE CODE

        </Query>
        <Pagination page={page} />
      </Center>
    );
  }
}

// MORE CODE
```

`Pagination.js`

```
// MORE CODE

import PropTypes from 'prop-types';

// MORE CODE

class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
  };

  render() {
    const { page } = this.props;
    return (

         // MORE CODE

            return (
              <p>
                Page {page} of {pages}
              </p>
            );
          }}
        </Query>
      </PaginationStyles>
    );
  }
}

export default Pagination;
```

### Houston we have a problem
* Look closely and you'll see our page is showing up as a **string**
* Look at React Dev Tools and if your URL is:

`http://localhost:7777/items?page=3`

* And you Search React Dev Tools for `Pagination` you will see this under Props

`page: "3"`

* We need our page to be a number
* So we need to coerce our string to a number

`index.js`

```
// MORE CODE

<div>
  <Items page={parseFloat(query.page)} />
</div>

// MORE CODE
```

* Use React Dev Tools again and now our page is a number
* **note** Make sure you require a proptype of number instead of string for Items and Pagination components

`page: 3`

## Houston we have a problem
* When we visit

`http://localhost:7777/items`

* We get `Page NaN of 2`
* NaN - Not a Number
* We can fix this but using log in `index.js` that says pass the `page` prop a value for the page or if none if provided pass `1`

`index.js`

```
// MORE CODE

<Items page={parseFloat(query.page) || 1} />

// MORE CODE
```

* We only want to style our Pagination when it is show so we move our Pagination tags in side the Query return:

`Pagination.js`

```
// MORE CODE

          return (
            <PaginationStyles>
              <p>
                Page {page} of {pages}
              </p>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;
```

* Update the title of our Pagination
    - This will show our pagination in the title bar!

`Pagination.js`

```
// MORE CODE

import PropTypes from 'prop-types';
import Head from 'next/head';

// MORE CODE

class Pagination extends Component {

    // MORE CODE

          return (
            <PaginationStyles>
              <Head>
                <title>
                  Code Stuff | Page {page} of {pages}
                </title>
              </Head>
              <p>
                Page {page} of {pages}
              </p>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;
```

### Add links
`Pagination.js`

```
// MORE CODE

import Head from 'next/head';
import Link from 'next/link';

// MORE CODE

class Pagination extends Component {

  // MORE CODE

          return (
            <PaginationStyles>
              <Head>
                <title>
                  Code Stuff | Page {page} of {pages}
                </title>
              </Head>
              <Link
                href={{
                  pathname: 'items',
                  query: { page: page - 1 },
                }}
              >
                <a>Prev</a>
              </Link>
              <p>
                Page {page} of {pages}
              </p>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;
```

## Add prefect
`Pagination.js`

```
// MORE CODE

<Link
  prefetch
  href={{
    pathname: 'items',
    query: { page: page - 1 },
  }}
>
  <a>Prev</a>
</Link>

// MORE CODE
```

* `prefetch` is very nifty
    - It will go and pre-render the previous and forward pages for quicker UX
    - **note** prefetch doesn't work in development mode but always will work in production mode
    - Place `prefecth` on any link and it adds a great performance boost

## Don't show previous page if we are on it
* We will use `aria` for this

`Pagination.js`

```
// MORE CODE

<a className="prev" aria-disabled={page <= 1}>
  Prev
</a>

// MORE CODE
```

* Test it out:

`http://localhost:7777/items?page=2`

* Prev works as it should
* Click on `Prev` link and it will change the URL to:

`http://localhost:7777/items?page=1`

* And now `Prev` is disabled

## And let's add the rest of the links:

`Pagination.js`

```
// MORE CODE

return (
  <PaginationStyles>
    <Head>
      <title>
        Code Stuff | Page {page} of {pages}
      </title>
    </Head>
    <Link
      prefetch
      href={{
        pathname: 'items',
        query: { page: page - 1 },
      }}
    >
      <a className="prev" aria-disabled={page <= 1}>
        ↤ Prev
      </a>
    </Link>
    <p>
      Page {page} of {pages}
    </p>
    <p>{count} Items Total</p>
    <Link
      prefetch
      href={{
        pathname: 'items',
        query: { page: page + 1 },
      }}
    >
      <a className="prev" aria-disabled={page >= pages}>
        Next ↦
      </a>
    </Link>
  </PaginationStyles>
);

// MORE CODE
```

* Test it out
* The Pagination links do function correctly but we are not updating the items

## Next
* Update the Items to be in sync with the Pagination navigation

## Additional Resources
* [prefetch](https://github.com/zeit/next.js/#routing)
