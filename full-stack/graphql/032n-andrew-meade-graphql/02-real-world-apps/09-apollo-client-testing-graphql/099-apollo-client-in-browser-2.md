# Apollo Client in the Browser (Part 2)
* We have our simple website set up

## How can we communicate with our GraphQL app from the browser
* To accomplish this we need to answer 3 questions

### 3 Questions
1. How do we define an operation in JavaScript?
2. How do we send that off to the server to fetch a response?
3. How do we access the response and do something meaningful with it?

#### Example
* If I fetch all of the published posts how can I render them to the screen so the user can see them?
* We can get all this done using Apollo Client

## Apollo
* [Apollo website](https://www.apollographql.com/)
* [Apollo Docs](https://www.apollographql.com/docs/)
    - The site has a `Server` tab and `Client` tab
* There are 2 sides to the Apollo echosystem
    - The server (we already have a server in place) and ours (GraphQL Yoga) actually uses the Apollo Server behind the scenes

## Apollo Client
* We will be focusing on Apollo Client
* There are lots of choices for the Apollo Client

![apollo client choices](https://i.imgur.com/wXXkSyc.png)

* We will use one of the many Apollo libraries called Apollo Boost to actually fire off requests from JavaScript code

### Apollo Boost
* [Apollo Boost migration docs](https://www.apollographql.com/docs/react/advanced/boost-migration/)

#### Install Apollo Boost
```
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});
```

1. We install a library `$ npm i apollo-boost`
2. We import the library
3. We create a new client providing the URL to our GraphQL backend
4. And from there we can use methods on clients
    * client.query()
    * client.mutate()
5. Now we can fire off queries and mutations!

#### Time to install Apollo Boost
* There are 2 things we need to install

1. `apollo-boost`
    * Will enable us to fire off those operations
2. `graphql`
    * Makes it possible to define GraphQL operations in JavaScript

`$ npm i apollo-boost graphql`

* Make sure to install these in the root of your apollo-client project folder

##### Stuff we need to use from Apollo Boost
* We need to import and grab the `ApolloBoost` constructor function (to initialize a client)
* Also we'll grab a little utility `gql` that makes it easy to define our operations in JavaScript

`src/index.js`

```
import ApolloBoost, { gql } from 'apollo-boost';

```

* Now we have everything we need to perform these 3 steps

1. How do we define an operation in JavaScript?
2. How do we send that off to the server to fetch a response?
3. How do we access the response and do something meaningful with it?

## Initialize an instance of ApolloBoost
`index.js`

```
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
});

```

* Now we can use `client.query()` and `client.mutate()` to perform operations on the backend
* The query property doesn't accept a string value but instead it expects an **abstract syntax tree**

## What is an abstract syntax tree?
* A very complex JavaScript object which represents a given GraphQL operation
    - They are not designed to be created by humans in code
    - Instead we get them generated by using utilties (in this case we'll be using `gql`)
* Long story short
    - We'll write strings
        + Those strings will be parsed
            * We'll pass that parsed string down to ApolloBoost

## Let's define the operation we want to perform
* Let's define a variable and using a template string
* We will use the "tagging" feature of template strings and `gql` is designed for that
* [More info on tagging template strings](https://wesbos.com/tagged-template-literals/)  

`src/index.js`

```
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

client.query({
  query: getUsers,
});

```

* Yes, the client.query() method returns a Promise and that Promise resolves when our data is available
* **note** If we were in an async function we could use `await` instead
* When the Promise resolves we have access to the `resolve`
    - There are many properties of `response` we don't care about
    - But the one that is very important and we use all the time is `response.data`

`index.js`

```
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then(response => {
    console.log(response.data);
  });

```

## Test it out
* Make sure that parcel is running

`$ npm start`

* You will see in the console an Object with all of your users!

![Object of all users pulled from GraphQL](https://i.imgur.com/72xx3yn.png)

* We have an object
    - Inside our object we a users property with an array of objects holding each of our users
        + id
        + name
        + __typename: "User" (we have access to the type)
* Those are the fields we fetched using our GraphQL query

## Congrats! We now have the data in the browser
* We can do anything with that data
    - We can render it to the user
    - We could save that data in localStorage

### Let's render a list of all users to the screen
* We are outputting users so let's update our html from an id of `posts` to `users`

`index.html`

```
// MORE CODE
  <body>
    <div id="users"></div>
    <script src="./index.js" type="application/javascript"></script>
  </body>
</html>
```

* Update our `index.js` to render user names to the screen

```
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then(response => {
    let html = '';

    response.data.users.forEach(user => {
      html += `
        <div>
         <h3>${user.name}</h3>
        </div>
      `;
    });

    document.getElementById('users').innerHTML = html;
  });

```

* You will see all the names rendered to the screen
* We successfully made a request to our GraphQL backend from browser-based JavaScript

## Challenge - Do the same to fetch all posts and render them
* Goal - Render all published posts to the browser

1. Define the operation using `gql`
2. Send off the query using client
3. Use the response data to render a list of post titles along with author names
4. Test your work

* Add another id to our `index.html` and name it `posts`

`index.html`

```
// MORE CODE

  <body>
    <div id="users"></div>
    <div id="posts"></div>
    <script src="./index.js" type="application/javascript"></script>
  </body>

// MORE CODE
```

`index.js`

```
// MORE CODE

const getPosts = gql`
  query {
    posts {
      title
      author {
        name
      }
    }
  }
`;

// MORE CODE

client
  .query({
    query: getPosts,
  })
  .then(response => {
    let html = '';

    response.data.posts.forEach(post => {
      html += `
     <div>
       <h3>${post.title}</h3>
       <p>${post.author.name}</p>
     </div>
    `;

    document.getElementById('posts').innerHTML = html;
  });

```

## Test it out
* The browser should show all published posts

### Update a post
* Login with user who has published posts
* Update a post
* Refresh the page and see the updated post in the browser

## Recap
* We have learned how to query data from JavaScript code
* This is important because
    - We need to do this if we are going to write test cases that interact with the GraphQL API
    - We need to do this is we are ever going to build out a client for our app