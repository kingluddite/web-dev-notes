# Testing and Mocking Apollo Queries
* Writing tests for our single item
* This will set the precedent for how we will write tests for components that have queries inside them

`SingleItem.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

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
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for {this.props.id}</p>;
          const item = data.item;
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {item.title}</title>
              </Head>
              <img src={item.largeImage} alt={item.title} />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
```

* This is a component that has a single item
* But in order for the Single Item to work it has a Query
    - That is passed the `id` of the item
    - It will hit the DB and come back with that item
    - And then we'll be able to either:
        1. render out the error
        2. loading
        3. render out no item found
        4. or finally, render out the single item
    - We need to write tests to make sure that all 4 of these things are going to be working

## We will be "mocking"
* We will not be mocking a function like we did before
* We will be mocking an apollo store and feeding it dummy data that it should resolve to
    - It will not reach outside to the actual DB

## Create a new file `SingleItem.test.js`
* We will `mount` these
* If we were just to Shallow Render SingleItem.js we would only render

```
// MORE CODE

      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id,
        }}
      >

// MORE CODE
```

* And the actual important stuff (styles, Head, img, div) won't be shown but we need it to be shown and that is why we need to `mount`
* **note** We forgot to export the Query from this page so we can use it in our test

`SingleItem.js`

```
// MORE CODE

      </Query>
    );
  }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };
```

## Let's explain testUtils.js
* We have a fakeItem
* A fakeUser, fake orderItems, fake order, fake items, fake 
* It is using a package called `casual` (which is just a dummy data generator)
    - We use casual to "seed" the data
    - We use a consistent number (777) so that we consistently get the same random name and id from casual (otherwise every time we run this testUtil.js it will give us a random name and that is not good for our consistency of tests)

### LocalStorageMock
* We also have a fake LocalStorageMock (use if you ever need to fake localStorage)
    - We need this because we are not running it in an actual browser environment, we're running it in node and localStorage is just a browser API so LocalStorageMock is just mocking that

`frontend/lib/testUtils.js`

```
import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  __typename: 'Item',
  id: 'abc123',
  price: 5000,
  user: null,
  image: 'dog-small.jpg',
  title: 'dogs are best',
  description: 'dogs',
  largeImage: 'dog.jpg',
});

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
});

const fakeOrderItem = () => ({
  __typename: 'OrderItem',
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2018-04 - 06T19: 24: 16.000Z',
  user: fakeUser(),
});

const fakeCartItem = overrides => ({
  __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
};
```

## Write our test and show all our imports
`__tests__/SingleItem.test.js`

```
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
// import wait from 'waiit';
import { MockedProvider } from 'react-apollo/test-utils';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { fakeItem } from '../lib/testUtils';

```

* Now let's try our first test

```
// MORE CODE

describe('<SingleItem />', () => {
  it('renders with proper data', async () => {
    const wrapper = mount(<SingleItem id="123" />);
  });
});

// MORE CODE
```

* It will fail with

```
<SingleItem /> › renders with proper data

Error: Uncaught [Invariant Violation: Could not find "client" in the context or passed in as a prop. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via props.]
```

* It is assuming that you are always going to render the singleItem inside of a Provider

`_app.js`

* We are always wrapping our entire application inside an ApolloProvider

```
// MORE CODE

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );

// MORE CODE
```

* But in our test we are taking it outside of our context of our application and when a SingleItem tries to query something it looks to its parents and looks in `context` for ApolloClient to query against and if there is no ApolloClient that it can query against it will break and that is exactly what is happening here
* We won't hook it up to our real DB because that would make our test very brittle
    - Instead we will mock the entire provider
    - The way we do that is to use a MockedProvider
        + And we need to provide "mocks" to the MockedProvider so that when we run it the data will resolve to it  

```
describe('<SingleItem />', () => {
  it('renders with proper data', async () => {
    const mocks = [
      {
        // when someone makes a request with this query and variable combo
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        // return this fake data (mocked data)
        result: {
          data: {
            item: fakeItem(),
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider>
        <SingleItem id="123" mocks={mocks} />
      </MockedProvider>
    );
    console.log(wrapper.debug());
  });
});
```

* And we log out our test
* You will see it just says, on the first render you will see `loading` because it is currently querying the DB

```
// MORE CODE
console.log __tests__/SingleItem.test.js:28
      <MockedProvider addTypename={true}>
        <ApolloProvider client={{...}}>
          <SingleItem id="123" mocks={{...}}>
            <Query query={{...}} variables={{...}}>
              <p>
                Loading...
              </p>
            </Query>
          </SingleItem>
        </ApolloProvider>
      </MockedProvider>
// MORE CODE
```

* So let's expect the wrapper to contain `Loading...`

```
// MORE CODE

    const wrapper = mount(
      <MockedProvider>
        <SingleItem id="123" mocks={mocks} />
      </MockedProvider>
    );
    // console.log(wrapper.debug());
    expect(wrapper.text()).toContain('Loading...');
  });
});
```

* And that test passes

## How can we wait?
* We need to wait 55 milliseconds
* You could do this:

```
// MORE CODE

describe('<SingleItem />', () => {
  it('renders with proper data', async () => {
    const mocks = [
      {
        // when someone makes a request with this query and variable combo
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        // return this fake data (mocked data)
        delay: 55,
        result: {
          data: {
            item: fakeItem(),
          },
        },
      },
    ];

// MORE CODE
```

* But this will introduce waiting into your test
* I don't like to introduce any sort of waiting into a test (slows testing down)
* If you were to wait for 1 tick
* The way JavaScript events work is you introduce a 0 second timeout, the next line of code will be put on the end of the callstack in JavaScript
* So by waiting 0 milliseconds, it will wait until the next render has actually happened because we put this at the end of the callstack and then we know that our SingleItem will be rendered

## npm waait
* Wes Bos made this package
* [waiit on npm](https://www.npmjs.com/package/waait)

### Sample use of code
[link to apollo sample testing final state](https://www.apollographql.com/docs/react/recipes/testing.html#Testing-final-state)

```
const wait = require('waait');

it('should render dog', async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: 'Buck' },
    },
    result: {
      data: { dog: { id: 1, name: 'Buck', breed: 'poodle' } },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>,
  );

  await wait(0); // wait for response

  const p = component.root.findByType('p');
  expect(p.children).toContain('Buck is a poodle');
});
```

* If you were to look at the code on [github](https://github.com/wesbos/waait)
* It is just this:

`index.js`

* It is a function that returns a Promise that resolves after a set amount of time (by default it will resolve after 0 milliseconds)
* Just a weird thing about JavaScript if you wait for 0 seconds it will put it on the end of the callstack

```
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

module.exports = wait;
```




