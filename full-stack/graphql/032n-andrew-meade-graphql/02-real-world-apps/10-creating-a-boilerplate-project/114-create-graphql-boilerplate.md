# Create Graphql Boilerplate
* Duplicate `graphql-prisma` and name the duplicate `graphql-boilerplate`

## This will be our Graphql Boilerplate
* This project will be our starting point for all future Graphql projects

### Review folders
#### `config/`
* We keep `config` folder (as it has nothing specific to the blogging app)

#### Delete `dist/` and `node_modules/`
* `dist` and `node_modules` both generated directories and no need to have them in our boilerplate
    - We generate them by running our npm scripts

#### prisma
* `docker-compose.yml` - can keep it exactly the same
* `prisma.yml` - can keep it exactly the same
* `datamodel.prisma` - We will change this
    - It currently contains stuff specific to our blogging app (Post and Comment - so delete them both)
    - Inside User we will remove `posts` and `comments` can be removed 

`datamodel.prisma`

```
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  password: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
```

#### prisma-review-website
* Already in another project
* Won't be part of our boilerplate
* Delete it

#### src
* The `generated` folder can stay put and we can regenerate a new `prisma.graphql` file anytime using the npm script

#### resolvers
* We'll delete Post.js and Comment.js
* We'll keep the other files in place
* Shut down test server for now - we'll test that it is still working later
* `index.js` Get rid of Post and Comment mentions

`index.js`

```
import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
```

* `Mutation.js` - We'll get rid of the 6 Mutations dealing with posts and comments

`Mutation.js`

```
import bcryptjs from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import validateHashPassword from '../utils/validateHashPassword';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const hashedSaltedPassword = await validateHashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedSaltedPassword,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof args.data.password === 'string') {
      args.data.password = await validateHashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        // data: args.data,
        data: {
          ...args.data,
        },
        where: {
          id: userId,
        },
      },
      info
    );
  },

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const userPassword = args.data.password;
    const hashedPassword = user.password;

    const isMatch = await bcryptjs.compare(userPassword, hashedPassword);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

      return {
      user,
      token: generateToken(user.id),
    };
  },
}

export { Mutation as default };
```

`Query.js`

* Delete all post and comment stuff

```
import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },

  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
};

export { Query as default };
```

* `Subscription.js` - We'll delete all comment and post stuff but keep the empty shell in case we use subscriptions later

```
import getUserId from '../utils/getUserId';

const Subscription = {
  // Add your subscriptions here!
};

export { Subscription as default };
```

* `User.js` - Delete the post method

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

### utils
* All good to keep as it deals with authentication and users

### db.js
* We used this before we were working with prisma so delete it

### index.js
* Very generic and can remain as is

### prisma.js
* All stays the same but remove all comments

`prisma.js`

```
import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

// create the connection
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

export { prisma as default };
```

`schema.graphql`

* Remove `PostOrderByInput` and `CommentOrderByInput`
* Remove all `post` and `comment` stuff

```
# import UserOrderByInput from './generated/prisma.graphql'

type Query {
  users(query: String, first: Int, skip: Int, after: String, orderBy: UserOrderByInput): [User!]!
  me: User!
}

type Mutation {
  createUser(data: CreateUserInput!): AuthPayload!
  deleteUser: User!
  updateUser(data: UpdateUserInput!): User!
  login(data: LoginUserInput!): AuthPayload!
}

# type Subscription {

# }


input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

input LoginUserInput {
  email: String!
  password: String!
}

input UpdateUserInput {
  name: String
  email: String
  password: String
}

type User {
  id: ID!
  name: String!
  email: String
  password: String!
  updatedAt: String!
  createdAt: String!
}

type AuthPayload {
  token: String!
  user: User!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}
```

* We comment `Subscription` type out because it is empty and invalid but we keep it in case we need to use it
* We also need to comment out the `Subscription` inside our resolvers inside `index.js`

```
import { extractFragmentReplacements } from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation';
// import Subscription from './Subscription'; // comment this out

// MORE CODE

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
};

// MORE CODE
```

### `server.js`
* Remove import of `db.js`

```
import { GraphQLServer, PubSub } from 'graphql-yoga';
import { fragmentReplacements, resolvers } from './resolvers/index';
import prisma from './prisma';

const pubsub = new PubSub();

// define our server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

export { server as default };
```

### jest
* Delete `comment` and `post` stuff for operations

`tests/utils/user-operations.js`

```
import { gql } from 'apollo-boost';

const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export { createUser, getUsers, login, getProfile };
```

`tests/utils/seedDatabase.js`

```
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'John',
    email: 'john@acme.com',
    password: bcryptjs.hashSync('123Password!'),
  },
  user: undefined,
  jwt: undefined,
};

const userTwo = {
  input: {
    name: 'Jane',
    email: 'jane@acme.com',
    password: bcryptjs.hashSync('PassForJane'),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  jest.setTimeout(10000);
  // Delete test data
  await prisma.mutation.deleteManyUsers();

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };

```

`tests/user.test.js`

```
import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import {
  createUser,
  getUsers,
  login,
  getProfile,
} from './utils/user-operations';

let client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Earth',
      email: 'earth@quake.com',
      password: '123password',
    },
  };

  const response = await client.mutate({
    mutation: createUser,
    variables,
  });

  const isUser = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(isUser).toBe(true);
});

test('Should expose public author profiles', async () => {
  const response = await client.query({
    query: getUsers,
  });

  expect(response.data.users).toHaveLength(2);
  expect(response.data.users[0].email).toBeNull();
  expect(response.data.users[0].name).toBe('John');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: { email: 'bad@bad.com', password: 'badpassword' },
  };
  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('Should not sign up with short password', async () => {
  const variables = {
    data: {
      name: 'John',
      email: 'john@acme.com',
      password: '123',
    },
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  client = getClient(userOne.jwt);

  // fire off an operation - me Query (requires authentication)
  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
```

## blow up git
* In root directory of `graphql-boilerplate`

`$ rm -rf .git`

`$ git init`

`$ git add .`

`$ git commit -m 'Init commit`

* Check to make sure all is as you expect

## Next - use the boilerplate
