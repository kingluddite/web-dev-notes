# Displaying Single Orders
* Right now when you create an order your order will be empty
* We want to transition the user to a page that is their actual order

## Create the page that shows the order
* We'll make a page
* Call it `order.js`
    - Just copy sell.js and rename it to order.js
* With NextJS you don't need to import React
* We converted it to a SFC (Stateless Functional Component)

`pages/order.js`

```
import PleaseSignIn from '../components/PleaseSignIn';

const Order = props => (
  <div>
    <PleaseSignIn>
      <p>This is a single Order</p>
    </PleaseSignIn>
  </div>
);

export default Order;
```

`TakeMyMoney.js`

* When we create our ourder we want to redirect to a new page
* We'll use NextJS' Router to do this

### How do we push over to the order id?
```
query: { id: order.data.createOrder.id },
```

* We will use NProgress
* As soon as we click checkout > open dialog
    - As soon as we hit submit, it will go over to stripe, come back with a stripe token, the dialog will close
    - But we have another step where we need to take that token, send it to the server side and then come back with that result
    - And so now there is a dead area inbetween and we are not updating the UI to the the user know of any changes
    - We solve this by calling `NProgress.start()`

`TakeMyMoney.js`

```
// MORE CODE

class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    console.log('onToken Called');
    console.log(res.id);
    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };

// MORE CODE
```

## Test it out
* Have an item in your cart
* Checkout
* You get green check
* You'll see the red progress bar start loading
* Then it takes you to new order page with this in the URL (id is there)

`http://localhost:7777/order?id=cjqk0839t8c460a61j4sg6f1s`

## Double check we can access our order id inside our order UI
`order.js`

```
// custom components
import PleaseSignIn from '../components/PleaseSignIn';

const Order = props => (
  <div>
    <PleaseSignIn>
      <p>This is a single Order: id is {props.query.id}</p>
    </PleaseSignIn>
  </div>
);

export default Order;
```

* You know see our order `id`
* We'll take this `id` and pass it down to some other component and do the query for that specific order

`components/Order.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;
    return (
      <div>
        <p>This is the order id: {id}</p>
      </div>
    );
  }
}

export default Order;
```

## Import Order.js
`Order.js`

### Error - duplicate declaration "Order"
* Fix: Just rename the page to OrderPage
* See how we destructure a SFC?
* Fixed broken path pointing to `Order.js`

```
// custom components
import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import Order from '../components/Order';

const OrderPage = ({ query }) => (
  <div>
    <PleaseSignIn>
      <Order id={query.id} />
    </PleaseSignIn>
  </div>
);

OrderPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default OrderPage;
```

## Back to updating our Order component
* We'll need to use the Query from react-apollo
* We'll use a data library `date-fns`
    - Similar to moment but does extra stuff you'll want
        + tree shaking
        + It is functional
* We need to change the title so we'll use `next/head`
* We'll format money, use GraphQL and Error component

`Order.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

// MORE CODE
```

## Backend
### We need to update our schema
* This will be a Query
* We'll create a order GraphQL method that will take in an `id` and return an Order
    - **note** the Order returned is not required because it is possible that there is no order found

`schema.graphql`

```
// MORE CODE

type Query {
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!
  item(where: ItemWhereUniqueInput!): Item
  itemsConnection(where: ItemWhereInput): ItemConnection!
  currentUser: User
  users: [User]!
  order(id: ID!): Order
}

// MORE CODE
```

## Now we need to write the matching resolver (to the `order` schema we just created)

`backend/src/resolvers/Query.js`

```
// MORE CODE

  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    // 2. Query the current order
    // 3. Check if they have the permissions to see this order
    // 4. Return the order
  },
};

module.exports = Query;
```

### Make sure they are logged in
```
// MORE CODE

  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You aren\'t logged in!');
    }
    // 2. Query the current order
    // 3. Check if they have the permissions to see this order
    // 4. Return the order
  },

// MORE CODE
```

### Query the current order
* Make sure we are using async await (check code to be sure)
* Make sure to use `info` because that will define what fields we are pulling (that's coming from the client side)

```
// MORE CODE

    // 2. Query the current order
    const order = await ctx.db.query.order({
      where: { id: args.id },
    }, info);

// MORE CODE
```

### Check if they have the permission to see this order

* We'll make it look nice by importing our OrderStyles

```
// MORE CODE

  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error("You aren't logged in!");
    }
    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    // 3. Check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermssionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder || !hasPermission) {
      throw new Error('You can not see this');
    }
    // 4. Return the order
    return order;
  },

// MORE CODE
```

## Now flip back to frontend (client side) and write GraphQL query
`Order.js`

```
// MORE CODE

import Error from './ErrorMessage';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends Component {

// MORE CODE
```

## To be safe add these two fields
`datamodel.prisma`

```
// MORE CODE

type Order {
  id: ID! @unique
  items: [OrderItem!]!
  total: Int!
  user: User!
  charge: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

// MORE CODE
```

* Make sure to re-deploy

`$ npm run deploy`

* But it did not create these new fields as there were already there
* So you don't need to include them as they are already created by Prisma

`datamodel.prisma`

```
// MORE CODE

type Order {
  id: ID! @unique
  items: [OrderItem!]!
  total: Int!
  user: User!
  charge: String!
}
```

### Check to make sure the data is showing up
* We'll add a log to show our `data` from GraphQL

`Order.js`

```
// MORE CODE

  render() {
    const { id } = this.props;
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          console.log(data);

// MORE CODE
```

* Start backend server again
* You should see the full order in the console
    - You will see createdAt, charge, id, items (and inside it) user (and inside it), total

## Now we work on our template
`Order.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const { order } = data;

          return (
            <div>
              <p>
                <span>Order ID:</span>
                <span>{id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
              </p>
              <p>
                <span>Order Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Qty: {item.quantity}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Order;
```

## Make it pretty with styles
`OrderStyles.js`

```
import styled from 'styled-components';

const OrderStyles = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
  border-top: 10px solid red;
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.offWhite};
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }
  .order-item {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export default OrderStyles;
```

* Add it to the page

`Order.js`

```
// MORE CODE

import Error from './ErrorMessage';

// custom styles
import OrderStyles from './styles/OrderStyles';

// MORE CODE

class Order extends Component {

 // MORE CODE

    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const { order } = data;

          return (
            <OrderStyles>

            // MORE CODE

            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
```

## Change the Order Page title using Head
* Next gives us the Head component and here is how we use it

`Order.js`

```
// MORE CODE

            <OrderStyles>
              <Head>
                <title>Buy Stuff = Order {order.id}</title>
              </Head>
              <p>

// MORE CODE
```

* View the Order page and you'll see we change the title

## Next - Code the Orders page
* This will have every single thing that we have ordered
* And then we can click items on that page and it will give us information about each order
