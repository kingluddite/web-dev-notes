# Currently Logged in User with Middleware and Render Props
* How to display the currently logged in user

## Cookie Time
* We recently created a user and when we did that we added a cookie to our browser
    - It is a `token` with a `value`

![our cookie](https://i.imgur.com/RlgQff1.png)

* That value contains the actual `jwt`

```
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam52ODdiMzMyaXNwMDk5NXlsNGd0aXp6IiwiaWF0IjoxNTQwODczMzQxfQ.yf2h1tVdS2w0KFC6AHKRyhJ7T9H_EZsxWJRjxyc4wGw
```
    
## Test the jwt
* Copy the `jwt` in the browser
    - the token value
    - and paste it here:

`https://jwt.io/`

* Paste into the `encoded` part:
    - You can see that once you do that we can see that it is Decoded into
        + HEADER (Algorthym & token type)
        + PAYLOAD (Data)
        + VERIFY SIGNATURE

* The Payload will look like:

```
{
  "userId": "cjnv87b332isp0995yl4gtizz",
  "iat": 1540873341
}
```


![jwt.io](https://i.imgur.com/k3X9qri.png)

1. On every single request (`req`) this `token` will come along for the ride
2. We'll take that `token`, **decode** it with `jwt` on the **backend**
3. And then stick the `userId` onto every single request `req`

* This means that if we every need to know who the user is, we can quickly query the `db` since we know the `userId`

## Backend
### We need to decode the JWT so we can get the user `id` on every request
`backend/src/index.js`

```
// MORE CODE

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// Use express middleware to populate current user
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  console.log('Middleware is in da house!');
  next();
});

server.start(

// MORE CODE
```

* We create custom middleware
* Very simple as it will just log out every time we make a `req`
* Test it out in browser and Click on Home page and then Signup page and then Sell page
    - Each click and you'll see our `Middleware is in da house` console.log() with each request
    - **note** On the home page we have 4 requests so we get for logs in the backend terminal

## send() ==== this code doesn't work and is under repair
* We can also use this:

```
// MORE CODE

server.express.use((req, res, next) => {
  console.log('Middleware is in da house!');
  res.send('test');
  // next();
});

// MORE CODE
```

* ASK Wes Bos - TODO: Look at above - did not work
    - after commenting out `next()` we are supposed to be able to see
    - send() breaks it and that is the point of middleware is that it enables you to step in between requests or before a request and do a little of extra work
    - I was gets a CORS error

## next()
* We use `next()` to keep our server moving onto the "next" middleware
    - This is enables us to modify the request
    - And send the request going so our db and our yoga server will be able to pick it up with no problem

## How can we pull the `token` out of the `req`?
`index.js`

```
// MORE CODE

server.express.use((req, res, next) => {
  // grab our token from the cookie
  const { token } = req.cookies;
  console.log(token);
  next();
});

// MORE CODE
```

* After saving check the terminal
    - The **server** (terminal) should show you the logged `token`
    - Now the `token` comes along for the ride every time
        + This is the awesomeness of using `cookie-parser` because it enables us to access any cookies that come along with the `req` just by saying `req.cookies.token`

### Log out `req.cookies`
```
server.express.use((req, res, next) => {
  console.log(req.cookies);
  // grab our token from the cookie
  // const { token } = req.cookies;
  // console.log(token);
  next();
});
```

* WE log out cookies and if we go into the client Applications tab of Chrome console we can manually add a cookie and then we will now see it in the terminal
* **note** I had a hard time updating the cookie as the page kept refreshing before I could enter it in
* This is the benefit of using cookies is I did not have to manually send that along for the ride it just came with it
    - But with localStorage you have to explicitly send it over every single time
    - This isn't an issue if you just have a client side app
        + expecially with Apollo as you can just tell it to pull it from localhost and you don't have to manually do it every single time
    - But because this is a server side render (SSR), when we refresh this page or visit for the very first time, there is no way for me to send the localStorage along for the ride (and that is why we are using cookies for authentication)

## Now let's get back to decoding our token
* Make sure there is a token
    - There may not always be a token
    - We also add in the secret (it is optional) but it is good to also add in our SECRET to make sure know one has monkeyed with it and added in their own values to the `jwt` (because anyone can edit the cookies and say they are an administrator)

`index.js`

```
// MORE CODE

server.express.use((req, res, next) => {
  // grab our token from the cookie
  const { token } = req.cookies;
  // check if there is a token
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId
  }
  next();
});

// MORE CODE    
```

* Regardless of if there is a token or not a token
* We will call `next()` and that will pass along the `req`
* It will not send a `res` directly from this middleware, it will pass it along the line and later when we get into one of our resolvers (be that a query or a mutation resolver) we'll be able to easily access this `userId` without having to decode the `jwt` every single time

## Problem
* We are using `jwt` so we need to require it

`index.js`

```
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '.env' });

// MORE CODE
```

## Now we need to add in the Query for our currentUser
* We'll call this query `me`
    - When someone calls `me` it will return a User (optional)
        + optional because someone could query `me` and there it is null (no one is logged in)

`backend/src/schema.graphql`

```

type Query {
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!
  item(where: ItemWhereUniqueInput!): Item
  itemsConnection(where: ItemWhereInput): ItemConnection!
  currentUsr: User
}

// MORE CODE
```

* No arguments
* It just takes the `jwt` cookie and parse it for us
    - The id is already passed with every `req` so we already know it

## Update resolvers
`backend/src/resolvers/Query.js`

* We will not just be forwarding this to the db
* How do you access the `req`?
    - In `middleware` it is pretty easy
        + You get the `req`, the `res` and then `next`

`backend/src/index.js`

```
// MORE CODE

// Use express middleware to populate current user
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {

// MORE CODE
```

* But in `Query.js` there is a `req` and a `res` but how do we access it inside `Query.js`
    - We access it on the `ctx`
    - But know that on `ctx` getting the `req` is NOT THIS: `ctx.req`
        + Rather... it is this fully spelled out `ctx.request` 

`Query.js`

```
// MORE CODE

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  currentUser(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
  }

// MORE CODE
```

* We could have written this:

`Query.js`

```
// MORE CODE

currentUser(parent, args, ctx, info) {
  // check if there is a current user ID
  if (!ctx.request.userId) {
    throw Error('No User Found');
    return null;
  }
}

// MORE CODE
```

* But it is important that we return `null` in this case because we do want to have this query and for it to return nothing because someone might not be logged in

## And if there is a `userId`
`backend/src/generated/prisma.graphql`

```
// MORE CODE

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Item]!
  user(where: UserWhereUniqueInput!): User

// MORE CODE
```

* The last line above shows we have a user that need unique input
    - And we can pass it a `where`

```
currentUser(parent, args, ctx, info) {
  // check if there is a current user ID
  if (!ctx.request.userId) {
    throw Error('No User Found');
    return null;
  }
  return ctx.db.query.user({
    where: { id: ctx.request.userId },
  });
},
```

## `info` is very important
* It saves us time and bandwidth which makes our app more efficent and fast
* We also have to pass the `info`
    - `info` is the actual **query** that is coming from the client side

```
currentUser(parent, args, ctx, info) {
  // check if there is a current user ID
  if (!ctx.request.userId) {
    throw Error('No User Found');
    return null;
  }
  return ctx.db.query.user({
    where: { id: ctx.request.userId },
  }, info);
},
```

* That user is going to end of having:
    - A cart
    - And has permissions
    - And has a name
    - And an email address
    - Orders
    - All of this data associated with it
    - And our user query is going to get large
    - So we need to pass the actual query from the frontend so that when we just want to get the user's email address, we're not getting the whole cart at the exact same time

## Do we need for our `me` Query to resolve?
* No
    - Because we are returning a Promise we do not need to wait for it to resolve
    - It will return a Promise and resolve itself once it has finished and come back

## shorthand vs longer hand
* We used es6 function shorthand but we could have written it in "longer form" using this

```
currentUser: function(parent, args, ctx, info) {
  // check if there is a current user ID
  if (!ctx.request.userId) {
    return null;
  }
  return ctx.db.query.user({
    where: { id: ctx.request.userId },
  }, info);
},
```

* Here is the final `Query.js`

```
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  currentUser(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
```

### We are finished with the backend side

### Let's jump to the client side so we can query this:
* We need to build a react component that will query the backend for the data and display in some use case
    - This will be a lot of code
        + Why?
        + Because every single time we need to get the current user we have to write a query and we'll have to import the query component from react-apollo
        + And then we'll have to have a render prop for that

### Create our own render prop component
* This will allow us to "tuck" all of that complexity into its own component and this will make it a nice clean little user component that will provide to us a user if the user is logged in
* We could do this:

`frontend/components/User.js`

```
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// GraphQL
const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
    }
  }
`;

const User = props => (
 <Query query={CURRENT_USER_QUERY}>
   {({data} => <p>data.user.name</p>)} 
  </Query>
)

export default User;
```

* But let's focus on this chunk of code

```
const User = props => (
 <Query query={CURRENT_USER_QUERY}>
   {({data} => <p>data.user.name</p>)} 
  </Query>
)
```

* The child of our Query will just take the `payload` and pass it to the child functions
    - So this would be less typing and more concise

```
const User = props => (
 <Query query={CURRENT_USER_QUERY}>
   { payload => props.children(payload) }
  </Query>
)
```

* This enables us to do something like:

`<User>{payload => }</User>`

* Now we can take the `payload` and just pop it in
    - Without having to rewrite our CURRENT_USER_QUERY
    - Or pass it every single time
    - Which is very useful and a good time saving technique

## Pass our props down into our Query
```
const User = props => (
 <Query {...props} query={CURRENT_USER_QUERY}>
   { payload => props.children(payload) }
  </Query>
)
```

* So anytime we want to write a user component and we want to pass additional `props` to the Query component we can just pass it to our `User` component and they will automatically get passed down
* Make sure you export both the default component as well as the CURRENT_USER_QUERY so we can access this query from other places
    - We will access this query often

```
// MORE CODE

export default User;
export { CURRENT_USER_QUERY };
```

## Add prop-types for children
* This also shows you how to write prop-types for a SFC

```
User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
```

* When you use User you know you'll always have to have the `children` function

## Here is the full code
`User.js`

```
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// GraphQL
const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
```

## How do we use `User`?
* We'll put in in our `nav` so that we can use it in our navigation

`Nav.js`

```
// MORE CODE

// custom components
import User from './User';

class Nav extends Component {
  render() {
    return (
      <NavStyles>
        <User>
          {data => {
            console.log(data);
            return <p>User</p>;
          }}
        </User>

// MORE CODE
```

### Test in browser
* View the `/items` route
* Check the console and you'll see when you expand the `data` that we have access to `currentUser` that has all the logged in user info

![logged in user console data](https://i.imgur.com/byFSaWO.png)

## Destructure the data and show user info in UI
`Nav.js`

```
<User>
  {(data: { currentUser }) => {
    console.log(data);
    return <p>{currentUser.name}</p>;
  }}
</User>
```

* That will give an error
* The reason is the `payload` has data inside it
    - So it is like a two level destructure
    - So code it like this:

```
<User>
  {({ data: { currentUser } }) => {
    console.log(currentUser);
    return <p>{currentUser.name}</p>;
  }}
</User>
```

* The above is confusing and took a while for me to get my head around
* View the console and you see we have an object now that has all the currently logged in user's info

```
<User>
  {({ data: { currentUser } }) => {
    console.log(currentUser);
    if (currentUser) return <p>{currentUser.name}</p>;
    return null;
  }}
</User>
```

* View in browser
    - You will see your logged in user's `name`
* View in `incognito` tab and you won't see logged in user's `name`
    - copy URL and paste into igcognito window
    - Because no one is logged in incognito

## View cookie
* Open Chrome > Console > Application > Cookies
    - You should see token with `jwt`

### Next - Sign in and out
