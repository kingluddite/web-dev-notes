## React Meetings GraphQL
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## Remember to run your frontend and backend app
`$ npm run dev` in both `backend` and `frontend`

* Now we start using React
    - Query to pull down items
    - Mutation to update items, add items, delete items
    - Full CRUD of our items

## New page - items.js
`pages/items.js`

```
import Items from './index.js';

export default Items;
```

## Create a new component
`components/items.js`

* **tip** Use VS code react snippets with `rcc` + tab to generate a default class

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';

export default class Items extends Component {
  render() {
    return <div>Items</div>;
  }
}
```

## Add to `pages/index.js`

```
import React, { Component } from 'react';

// custom components
import Items from '../components/Items';

class Home extends Component {
  render() {
    return (
      <div>
        <Items />
      </div>
    );
  }
}

export default Home;
```

## Take for a test drive
`http://localhost:7777/items`

* Items is showing up
* View in React Dev Tools just to be sure

## Get some data on the page
* We'll figure out how to query stuff from our Apollo store

### Write a query
* We do this using the GraphQL tag
    - import gql from 'graphql-tag'

#### Two ways to write your queries
* Write and store them in a separate file and leave them in a queries file and then import them into that file as you need them
* Or (**and recommended from Apollo devs**) locate the queries in the files where you are going to be doing the query and if you need to access that query in multiple files then you can just export it from one of those files and import it to the rest
    - Wes recommends putting them in one file until it becomes a problem and when that happens, refactor it out
* **BEST_PRACTICE** - Put all your queries IN_ALL_CAPS

##### gql works similar to styled components
* You write your queries in a string (similar to how styled components work ) and tag it with a `gql`

##### **BEST_PRACTICES**
* Name all your queries
* Name them the same thing as the variable it lives in
    - This will keep you sane
    - You are going to have names of queries
    - You will also have the name of query/mutation that's on the client side
    - It can get confusing real quick
* Write the query first in the playground

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

* And test that it works by hitting the playground play button
    - Remember in GraphQL you only pull down exactly what you need
    - If you don't want it, leave it off your query
* Then copy the playground query/mutation and paste inside your client side GraphQL query
* List all the fields that you want to return

`Items.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
export default class Items extends Component {
  render() {
    return <div>Items</div>;
  }
}
```

### How do we use this query?
* Via a render prop
* We imported `Query`

```
import { Query } from 'react-apollo';
```

* And that is a component in itself
* Previously HOC (Higher Order Components) were used
    - Here is an example:

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

class Items extends Component {
  render() {
    return <div>Items</div>;
  }
}

export default withItems(Items);
```

* withItems would be a HOC
* You would wrap your component with that HOC

`withItems(Items)`

* And that would expose a list of items via a `prop`
    - And if you had multiple you could compose multiple
    - That is how Redux works

### Render Props are more popular
* Using Render Props help you avoid using HOCs
* You just put a component inside of `<p>Items</p>` that is a Query and then the child of that component is going to be a function that gives you `loading` state, `error` or the actual list of items
* One downside is it gets a bit confusing with all the curly braces
* Apollo recommends you use render props
* You don't get `loading` and `error` states with HOCs

#### Write our first render prop in steps
1. Add the Query component and pass the query prop and give it the name of your query as the value

`Items.js`

```
// MORE CODE

class Items extends Component {
  render() {
    return (
      <div>
        <p>Items</p>;
        <Query query={ALL_ITEMS_QUERY}>

        </Query>
      </div>
    )
  }
}

export default Items;
```

* **rule** The only child of a Query component MUST be a function

```
// MORE CODE

class Items extends Component {
  render() {
    return (
      <div>
        <p>Items</p>;
        <Query query={ALL_ITEMS_QUERY}>
          {}
        </Query>
      </div>
    )
  }
}

// MORE CODE
```

* We need to write some JavaScript so we start by adding curly braces `{}`

## Add the payload
```
// MORE CODE

class Items extends Component {
  render() {
    return (
      <div>
        <p>Items</p>
        <Query query={ALL_ITEMS_QUERY}>
          {(payload) => {
            console.log(payload);
            return <p>I am the child of query!</p>
          }}
        </Query>
      </div>
    )
  }
}

// MORE CODE
```

* If you only have one argument (like we do with `payload`) prettier will remove the parentheses

## Take it for a test drive in the browser
* You may at times get an error and not know why

### Page Refresh is the first defense when troubleshooting
* Sometimes the hot reloading of webpack where it catches an error and is not able to recover itself and a refresh of the browser is a good first step in troubleshooting this issue

#### Payload!
* View the console and you will see an object returned with at ton of stuff inside
    - Stuff like:
        + Methods for `refetching`ing that query
        + Methods for `polling` every **n** seconds (to get semi-realtime data)
            * Apollo also has the ability to do real time data as well
        + You have access to the Apollo client itself (that is where all the data is stored)
    - We are interested in 3 things
        1. `data` (contains an array of the returned data from our db - we asked for items and that was what was returned)
        2. `loading` - either `true` (still loading) or `false` (loaded)
            * In most cases this will always be false because we are server side rendering so it will wait until that is `true`
            * But we will use this a lot on the **client side**
        3. `error` - returns an object to let us know if something went wrong

##### Best Practice
* We don't want to write `payload.data`, `payload.loading` and `payload.error`
* A better way is to destructure the values like this:

```
// MORE CODE

<Query query={ALL_ITEMS_QUERY}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error {error.message}</div>;
    console.log(data);

    return (
      <p>
        I found <strong>{data.items.length}</strong> items
      </p>
    );
  }}
</Query>


// MORE CODE ----- will output to page "I found 5 items" (Or however many items you have in your items array)
```

* **Best Practice** Always check for `loading` and `error` first because if it is still loading or there is an error, you won't have any items
    - You'll get bad errors because you don't have data like:
        + `can not read properties of undefined`
        + or
        + `can not read property length of undefined`

## Let's get some data rendered on our page
* Yes we want to show data in our UI

## Center our data
* We'll use styled-components

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

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

const Center = styled.div`
  text-align: center;
`;

class Items extends Component {
  render() {
    return (
      <Center>
        <p>Items</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error {error.message}</div>;

            console.log(data);
            return (
              <p>
                I found <strong>{data.items.length}</strong> items
              </p>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
```

* Refresh browser and your content will be centered

## Add css grid

```
// MORE CODE

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <Center>

        <Query query={ALL_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error {error.message}</div>;

            return (
              <ItemsList>
                {data.items.map(item => (
                  <p key={item.id}>{item.title}</p>
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
```

* Refresh browser
* You will see all titles styled beside each other in your items array inside the UI
* We use `id` to get rid of unique `key` warning
    - **remember** Anytime you are looping over and spitting out multiple elements as siblings and they are the same component you must also give it a `key` prop

### Item or Items
* We pulled in all our items inside Items
* Now we'll make a singular Item component that will do all the heavy lifting to get the data for each `item`

#### Create `Item` component
* **tip** Use `rccp` will create a class and use VS Code's react snippet package to quickly generate a Class Based Component (CBC) and build it with Prop Types
* We will use prop types basic setup but you should use them with shapes like this:

`Items.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  };

  render() {
    return <div />;
  }
}
```

* Add basic prop types and styles

`Items.js`

```
// MORE CODE

// custom components
import Item from './Item';

// MORE CODE

class Items extends Component {
  render() {

    // MORE CODE

            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}

    // MORE CODE
}

export default Items;
```

`Item.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Title>{item.title}</Title>
      </ItemStyles>
    );
  }
}
```

* View in React Dev tools
* Search for `Items`
    - Items
        + Items__Center
            * div
                - Query
                    + Items__ItemsList
                        * div
                            - Item

* Check props on `Item`
    - Expand `item` prop and you'll see all fields we passed in our GraphQL

![all fields in props](https://i.imgur.com/mDmoE5p.png)

* We also have __typename: 'Item'
    - Apollo auto-generates this for us
    - We didn't query that in:
    - The name is the type of thing we are querying (in this case it is an Item but it could be an Order, User or any specific type that we have)

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

* Add links pointing to single page

`Items.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// custom styles
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Title>
          <Link href={`item/${item.id}`}>
            <a>{item.title}</a>
          </Link>
        </Title>
      </ItemStyles>
    );
  }
}
```

* But we can also pass the query string like this (I think it is more readable):

```
// MORE CODE

<ItemStyles>
  <Title>
    <Link
      href={{
        pathname: '/item',
        query: { id: item.id },
      }}
    >
      <a>{item.title}</a>
    </Link>
  </Title>
</ItemStyles>

// MORE CODE
```

## Take it for a test drive
* You can click on the different items and the URL will change and append the query item with something like:

`http://localhost:7777/items?id=cjnebcrvz9xwk0b94b2rd04w0`

### Pretty URLs
* The above URL isn't nice
* A pretty url could look like `localhost:7777/item/shoes`
* There are 3 or 4 external packages that can make NextJS have pretty URLs and that requires you to get into custom servers
    - It is most likely that NextJS will add a way to use pretty URLs out of the box

`Item.js`

```
// MORE CODE

<ItemStyles>
  <Title>
    <Link
      href={{
        pathname: '/item',
        query: { id: item.id },
      }}
    >
      <a>{item.title}</a>
    </Link>
  </Title>
  <PriceTag>{item.price}</PriceTag>
</ItemStyles>

// MORE CODE
```

* View and see that our prices are not formatted nicely

## Format money
* The lib folder is a great place to store all your utilities
* They are small and placed here if we can use them instead of a separate npm package and they are reused throughout our app

`lib/formatMoney.js`

```js
export default function(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}
```
* Let's format our money and use the above function

`Item.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// lib
import formatMoney from '../lib/formatMoney';

// MORE CODE

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Title>

        // MORE CODE

        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
      </ItemStyles>
    );
  }
}
```

* View and you'll see our money is nicely formatted into US dollars (1000 turned into $10)

![formatted money](https://i.imgur.com/gwmcikv.png)

`Item.js`

```
<ItemStyles>
  <Title>
    <Link
      href={{
        pathname: '/item',
        query: { id: item.id },
      }}
    >
      <a>{item.title}</a>
    </Link>
  </Title>
  <PriceTag>{formatMoney(item.price)}</PriceTag>
  <p>{item.description}</p>

  <div className="buttonList">
    <Link
      href={{
        pathname: 'update',
        query: { id: item.id },
      }}
    >
      <a>Edit</a>
    </Link>
    <button type="button">Add to Cart</button>
    <button type="button">Delete</button>
  </div>
</ItemStyles>
```

* Test it out

![basic item](https://i.imgur.com/fAw3rmX.png)

## Add images
### The two ways to do if statements inside JSX

`Item.js`

```
// MORE CODE

<ItemStyles>
  {item.image && <img src={item.image} alt={item.title} />}
  <Title>

// MORE CODE
```

* Or you could do the same thing with the **ternary operator**

```
// MORE CODE

<ItemStyles>
  {item.image ? <img src={item.image} alt={item.title} /> : null}
  <Title>

// MORE CODE
```

* But the cool way of not returning `null` like above is to use the first choice with the `&&`

## Here are the styles we used:

`components/styles/Title.js`

```
import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
```

`components/styles/ItemStyles.js`

```
import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default Item;
```

`components/styles/PriceTag.js`

```
import styled from 'styled-components';

const PriceTag = styled.span`
  background: ${props => props.theme.red};
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export default PriceTag;
```

## Next - The Sell Page
* Have a form
* Upload photos
* Submit our content
* Have that mutation push itself to the backend

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

## Additional Resources
* [Server Side Support for Clean/Pretty URLs](https://nextjs.org/learn/basics/server-side-support-for-clean-urls) 
