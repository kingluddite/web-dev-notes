# Orders Page
* Fairly Straight forward page
* Make the page
* Make the OrderList component that's got to have a query to the backend
    - You have to write the Query and resolver on the backend
    - You have to loop through and display it on the page

`pages/orders.js`

* It doesn't need any props passed to it because it will query the currently logged in user in order to get that

```
// custom components
import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

export default OrdersPage;
```

### Make a new component OrderList
#### Some styles
`OrderItemStyles.js`

```
import styled from 'styled-components';

const OrderItemStyles = styled.li`
  box-shadow: ${props => props.theme.bs};
  list-style: none;
  padding: 2rem;
  border: 1px solid ${props => props.theme.offWhite};
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
  }
  .order-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export default OrderItemStyles;
```

`OrderList.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';

// custom styles
import OrderItemStyles from '../styles/OrderItemStyles';

// custom components
import Error from './ErrorMessage';

class OrderList extends Component {
  render() {
    return <div>this is OrderList</div>;
  }
}

export default OrderList;
```

### Backend!
#### Update our schema with `orders`
* Open generated code and search for orders and paste it all in like this:

`schema.graphql`

```
// MORE CODE

type Query {
  // MORE CODE

  order(id: ID!): Order
  orders(orderBy: OrderOrderByInput): [Order]!
}

// MORE CODE
```

* We won't use any except orderBy so modify it like this:

`schema.graphql`

```
// MORE CODE

  orders(orderBy: OrderOrderByInput): [Order]!

// MORE CODE
```

## Now we need to write our resolver to match up with our schema
`Query.js`

```
// MORE CODE

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in');
    }
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info
    );
  },
};

module.exports = Query;
```

## Client side
`OrderList.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';

// custom styles
// import OrderItemStyles from '../styles/OrderItemStyles';

// custom components
import Error from './ErrorMessage';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          console.log(orders);
          return <p>You have {orders.length}</p>;
        }}
      </Query>
    );
  }
}

export default OrderList;
```

* Click on Orders page
* You will see how many orders you have

## Now we just need to loop over all our data
* The reduce will tell me how many items are in each order
* `formatDistance()` will tell you how long ago something happened

`OrderList.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';

// libs
import formatMoney from '../lib/formatMoney';

// custom styles
import OrderItemStyles from './styles/OrderItemStyles';

// custom components
import Error from './ErrorMessage';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          console.log(orders);
          return (
            <div>
              <h2>You have {orders.length} orders</h2>
              {orders.map(order => (
                <OrderItemStyles key={order.id}>
                  <Link
                    href={{
                      pathname: '/order',
                      query: { id: order.id },
                    }}
                  >
                    <a>
                      <div className="order-meta">
                        <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                        <p>{order.items.length} Products</p>
                        <p>{formatDistance(order.createdAt, new Date())}</p>
                        <p>{formatMoney(order.total)}</p>
                      </div>
                      <div>
                        {order.items.map(item => (
                          <img key={item.id} src={item.image} alt={item.title} />
                        ))}
                      </div>
                    </a>
                  </Link>
                </OrderItemStyles>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;
```

## Next - We move onto testing our code
