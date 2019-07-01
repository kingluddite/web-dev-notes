# Fragments
## Quick checklist
* Is your Docker container running?
* Is pgAdmin running?
* Is your local Node.js running (`$ npm start`)

## Fix an issue
* We still have one issue we need to fix
* If we don't ask for an `id` inside `:4000` GraphQL Playground

```
query {
  users {
    id
    email
  }
}
```

`User.js`

```
import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    if (userId && userId === parent.id) {
      return parent.email;
    }
    return null;
  },
};

export { User as default };
```

* If we don't ask for the id inside our query our code can't run as expected because we are using `parent.id`

## Let's talk about Fragments
1. We'll start playing with them in GraphQL Playground
2. Then we'll integrate them into our Prisma app and solve the problem we are experiencing here

### Common complaint for GraphQL devs
* It is a pain to constantly list out every item you want to return by selecting it
* Fragment save us from having to do this

### What does a Fragment do for us?
* A Fragment enables us to create a reusable selection set so we can define what we want once and use it often

### Our first Fragment
* This will select all the scaler fields for a user
    - id
    - name
    - email

```
query {
  users {
    id
    email
  }
}

fragment userFields on User {
  id
  name
  email
}
```

* Each fragment has to be associated with a specific type
* The field you select must be in the specific type or you will get an error

### fragment syntax

```
fragment nameOfYourFragment on SPECIFIC_TYPE {
    all_fields_in_your_selection
}
```

### How to use the fragment
```
query {
  users {
    ...userFields
  }
}

fragment userFields on User {
  id
  name
  email
}
```

* In essence we are creating a variable here whenever we want to grab these fields off of a User:

```
fragment userFields on User {
  id
  name
  email
}
```

## We can use a combination with fragments
```
query {
  users {
    ...userFields
    email
  }
}

fragment userFields on User {
  id
  name
}
```

## We can also ask for related data inside our fragments
```
query {
  users {
    ...userFields
    email
  }
}

fragment userFields on User {
  id
  name
  posts {
    id
  }
}
```

* Benefit of fragments
    - We now can avoid having to type up the same old selection sets every time
* Con of fragments
    - We can't share fragments inside GraphQL Playground

## Integrate fragments into our app
`User.js`

```
import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    if (userId && userId === parent.id) {
      return parent.email;
    }
    return null;
  },
};

export { User as default };
```

* When we provide our resolvers for fields like `email` we can also choose to provide a **fragment**
    - And this will make sure that Prisma fetches certain data about the User when a specific resolver runs
    - So for our resolver above when we need the `id` and with a fragment we can force Prisma to get the `id` from the Database **even if the client didn't request it!**

## A few small structural changes
* We'll convert email to an Object from a Function

`User.js`

```
import getUserId from '../utils/getUserId';

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }
      return null;
    },
  },
};

export { User as default };
```

* We could ask for other fields if we were using `parent.title` or whatever but here we only need `parent.id`
    - Why not also grab the emails (because of `parent.email`)?
        + Because this resolver will only run if the client asks for the email so there is no need for us to ask for it

## Refactor a little now
* Prisma does support fragments in this way
* But Prisma does requires a tiny bit of configuration

### We will need to make configuration changes on how we are setting up the server to add support for fragments
* This is a must have as it is an essential feature to locking down your data

### extractFragmentReplacements
* We will focus on these 2 files
    - index.js
    - prisma.js
* We need to grab a single function from `prisma-binding` called **extractFragmentReplacements** and it gets called with our resolvers
    - What it gives us back is something that we will pass into our prisma constructor function here:

```
// MORE CODE

import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
});

// MORE CODE
```

* And our GraphQLServer function here:

`index.js`

```
// MORE CODE

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
});

// MORE CODE
```

* Making these changes will enable the syntax we just used over in `User.js`

## Restructure
* Our current app architecture doesn't make this possible
* The function we need to get needs to be called with our resolvers
    - They live here:

![resolvers live here](https://i.imgur.com/26aFGon.png)

* But it also has to get passed into this constructor function

```
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
});
```

## Circular dependency is bad!
* But since we create things in index.js, export them and import them into index.js
    - But then this will be a **circular dependency** where prisma is importing index and index is importing prisma

`prisma.js`

```
import { Prisma } from 'prisma-binding';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
});
```

`index.js`

```
import { GraphQLServer, PubSub } from 'graphql-yoga';

// custom
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import prisma from './prisma';

// MORE CODE
```

## src/resolvers/index.js 
* We can solve this problem with a small refactoring
* We will create a separate file where our resolvers get defined
* We can then load that in where necessary
* We will create a new file `src/resolvers/index.js`
    - This file will be in charge of getting that resolver object built
    - (It is the exact same object we have in src/index.js)
    - We will be able to re-purpose almost all of the code for getting that done
* We will import all the resolver and update their paths
* Create a new variable that will hold the object of all resolvers
* And then export the object

`src/resolvers/index.js`

```
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';
import Post from './Post';
import Comment from './Comment';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

export { resolvers };
```

* Import that new named export `resolvers`

```
import { GraphQLServer, PubSub } from 'graphql-yoga';

// custom
import db from './db';
import { resolvers } from './resolvers/index';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});

```

* We refactored but haven't changed any of the functionality of our app
* Currently, fragments will still not work

## using extractFragmentReplacements
`src/resolvers/index.js`

```
import { extractFragmentReplacements } from 'prisma-binding'; // add this line
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';

// MORE CODE
```

* Now we will call this function and pass in the resolvers
* And add it to our export list

```
import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';
import Post from './Post';
import Comment from './Comment';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };

```

* And then because of our new architecture structure we can import this named export into both our `prisma.js` file and `src/index.js` file

## What is fragmentReplacements?
* Nothing more than a list of all of the GraphQL fragment definitions (and in our case we have just one (User.js))
    - so `extractFragmentReplacements` takes in all of our resolvers (goes through all of our resolvers (Query, Mutation, Subscription, User, Post, Comment)) and it will extract all of those fragments and it returns them to `fragmentReplacements`
        + This allows us to specify the fields that are required for the resolver function to run correctly (in our case the email resolver function requires the `id` from the `user`)

## import and consume into prisma.js
```
import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'donottellanyonethatthisismysecret',
  fragmentReplacements,
});
;

// MORE CODE
```

## import and consume into src/index.js
```
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { fragmentReplacements, resolvers } from './resolvers/index';

// custom
import db from './db';

import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

// MORE CODE
```

* Now our server and Prisma are both configured to use the fragment we setup in User.js

## Time to test to see if our fragment is working
GraphQL Playground :4000

```
query {
  users {
    id
    email
  }
}
```

* This still works
    - The owner we see our email
    - The person not logged we see null for email
* The problem before was when we removed the `id` we returned `null` for both emails
* Remove the `id` and run

```
query {
  users {
    email
  }
}
```

* And we should successfully see our logged in user's email

```
{
  "data": {
    "users": [
      {
        "email": "adam@adam.com"
      },
      {
        "email": null
      }
    ]
  }
}
```

## Challenge
* Need to set up another field resolver for User (alongside of User email)
* This field resolver will be for posts
    - This will limit what posts you can fetch from a given user
    - We don't want you to be able to fetch draft posts, only public ones

```
query {
  users {
    email
    posts {
      id
      title
      published
    }
  }
}
```

* If you run the above on GraphQL Playground :4000 you will see drafts of posts you do not own
* This is the problem you need to fix
* The only query to fetch draft posts is myPosts

### Goal: Limit User.posts to showing just published posts
1. Set up a field resolver for User posts
2. Set up a fragment to ensure you have the users `id`
3. Use prisma to fetch published posts where the `user` is the `author`

```
import getUserId from '../utils/getUserId';

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma, request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }
      return null;
    },
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma }, info) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id,
          },
        },
      });
    },
  },
};

export { User as default };

```

* Test

```
query {
  users {
    email
    posts {
      id
      title
      published
    }
  }
}
```

* You should not see drafts of posts for all of the users
