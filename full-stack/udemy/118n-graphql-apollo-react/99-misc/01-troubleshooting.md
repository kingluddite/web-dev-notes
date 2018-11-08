# Troubleshooting

## Node
* When working with async await you need a recent version of node
* Update node to latest version
  - You can install directly
  - I recommend on mac using Homebrew so update with:

`$ brew update node`

## Wrong module installed
* Delete `package.json` and `node_modules` and do a reinstall with `$ npm i`

## How to get rid of jwt error

`server.js`

```
// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log(token, typeof token);
  if (token !== 'null' && token !== '' && token !== undefined) {
    try {
      // add currentuser to the request object
      req.currentUser = await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});
```

* Inserting a price is a number but text fields are a string, how can we ensure a number is inserted into our mongodb cologne collection's scentPrice field?

## Use the right comments inside `schema.js`
* If you use JavaScript comments `//` or `/* */` you will get an error
* You must use `#`

## When cloning
* You need to install packages on server and client
* You need to recreate variables.env because that's not on github
  - MONGO_URI
  - SECRET

## If you change variables.env you need to restart the server
* You won't see changes unless you do
=======
## Graphql GUI not showing correct results
* You have data in your site
* You see it on the home page
* But if you want to use `getCologne` and in the GraphQL GUI you hit play and get null and there are no errors
* Most likely you did not save the file in your app

## Houston we MAY have a problem
* Error ` MissingSchemaError: Schema hasn't been registered for model "Colognes".`
* Did you get this error? I did when I first did this and it a was because I misspelled the Model name `Cologne`
  - Remember we always spell model names with a `singular` name
  - It is not required but [recommended when working with Mongoose](https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name)
    + You can override this default behavior of Mongoose but I believe it is mimicking the naming convention in Rails
      * The model is singular and Capitalized
      * The Collection is automatically named the plural of the model name
        - [Other article on this](https://samwize.com/2014/03/07/what-mongoose-never-explain-to-you-on-case-sentivity/)
          + Let’s assume the model I have is ‘Campaign’
            * mongodb collection name is case sensitive (‘Campaigns’ is different from ‘campaigns’)
            * mongodb best practices is to have all lower case for collection name (‘campaigns’ is preferred)
            * mongoose model name should be singular and upper case (‘Campaign’)
            * mongoose will lowercase and pluralize with an ‘s’ so that it can access the collection (‘Campaign’ » ‘campaigns’)
            * Knowing this is especially useful if you are dealing with existing collections

`resolvers.js`

```
// MORE CODE

getCurrentUser: async (root, args, { currentUser, User }) => {
  if (!currentUser) {
    return null;
  }
  const user = await User.findOne({
    username: currentUser.username,
  }).populate({
    path: 'favorites',
    model: 'Cologne', // fix this line
  });
  return user;
},

// MORE CODE
```

## Typing `$ npm start` instead of `$ npm run dev`
* Will only get the server running and not concurrently!
* Silly mistake but it happens :)

* When making a sfc using the snippet VS code library it uses curly braces instead of parenthesees

* Don't do this:
```
const NavbarAuth = () => {}
```

* Do this:

```
const NavbarAuth = () => ()
```

## Comments in GraphQL
* Use the hash

```
# this is a comment in GraphQL
```

## Quickly create a SFC
* `rfce` + tab

## Find processes running
* You might get an EADDRINUSER error so check to make sure you close stuff you don't need open
* Here's how to find a list of all running processes

`$ lsof -Pi | grep LISTEN`

## Kill process
`$  kill -9 24847` (replace number of process with the one you want to kill)

## Big problems with node
* View my node documents for how to work with the brew install of node and get rid of this freaking annoying window

![do you want node to accept incoming connections](https://i.imgur.com/aD13rnC.png)

## Make sure you know what environment you are working in
* Production or Development
* I thought I was working locally but my graphql was pointing to heroku. All my local changes to graphql were not being recognized and I wasted 1 hour until I figured that out.

## tip - brew --- keep node updated
```
$ brew doctor (5 minutes)
$ brew update node (10 minutes) (might be $ brew upgrade node)
```

## Apollo 2.0 fixes
* Remove `apollo-server-express` from `package.json` and re-install the latest version with `$ npm i apollo-server-express@latest`
* Remove `graphql-tools` from `package.json` and re-install the latest version with `$ npm i graphql-tools@latest`

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const PORT = process.env.PORT || 4444;

// bring in GraphQL middleware
const { ApolloServer } = require('apollo-server-express');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// models
const Genealogy = require('./models/Genealogy');
const User = require('./models/User');

// connect to db (add these lines)
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

// initialize your app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'null') {
    try {
      req.currentUser = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Genealogy, User, currentUser: req.currentUser }),
});
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

```

`resolvers.js`

```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ObjectID } = require('mongoose').mongo.ObjectID;

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  ObjectID: new GraphQLScalarType({
    name: 'ObjectID',
    description:
      'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.BSON) commonly used in `mongodb`',
    serialize(_id) {
      if (_id instanceof ObjectID) {
        return _id.toHexString();
      }
      if (typeof _id === 'string') {
        return _id;
      }
      throw new Error(
        `${Object.getPrototypeOf(_id).constructor.name} not convertible to `
      );
    },
    parseValue(_id) {
      if (typeof _id === 'string') {
        return ObjectID.createFromHexString(_id);
      }
      throw new Error(`${typeof _id} not convertible to ObjectID`);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ObjectID.createFromHexString(ast.value);
      }
      throw new Error(`${ast.kind} not convertible to ObjectID`);
    },
  }),

  Query: {
    no changes
  },

  Mutation: {
    no changes
  },
};
```

`schema.js`

```
const { gql } = require('apollo-server-express');

exports.typeDefs = `
  scalar ObjectID

  type Genealogy {
   _id: ObjectID
   // same code
  }

  type User {
    _id: ObjectID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Song]
  }

  type Query {
    // same code
  }

  type Token {
    token: String!
  }

  type Mutation {
    // same code
  }
`;
```

* The new UI for GraphQL can be found here: [http://localhost:4444/graphql](http://localhost:4444/graphql)

## Additional Resources
* [prisma](https://www.prisma.io/)
* [apollo client dev tools for chrome](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=en-US)
* [graphcms](https://graphcms.com/)

### Problems with concurrently
* `$ npm run dev` would only run Express server and not React server
  - I experiences this on 3 different computers
  - The fix is to revert to an older version of concurrently with `$ npm i concurrently@3.6.0` and then install the latest version with `$ npm i concurently@latest`. That seemed to jump start it to work again

#### As a good exercise 
* Stop concurrently from running 

`ctrl` + `c`

* Make sure you are in the root of your server and run the Express server with:

`$ nodemon server.js`

* Then open a new tab in your terminal
* In that tab change into the `client` folder of your app
* Run the React server with:

`$ npm start`

* Now you can see the same result but you have two servers running in separate tabs

### Record not inserted
`ApolloError.js:37 Uncaught (in promise) Error: Network error: Response not successful: Received status code 400`

### Solution
* Make fields consistent
* For now let's just ask for `firstName`, `lastName` and `description`

#### Make the following updates
##### Server
`schema.js` (**addCologne** Mutation)

```
// MORE CODE

type Mutation {
    addCologne(firstName: String!, lastName: String!, description: String, username: String): Cologne

    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }

// MORE CODE
```

`resolvers.js` (**addCologne** Mutation)

```
// MORE CODE

Mutation: {
    addCologne: async (
      root,
      { firstName, lastName, description, username },
      { Cologne }
    ) => {
      const newCologne = await new Cologne({
        firstName,
        lastName,
        description,
        username,
      }).save();
      return newCologne;
    },

// MORE CODE
```

`queries/index.js`

```
// MORE CODE

/* Cologne Mutations */

export const ADD_Cologne = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $description: String
    $username: String
  ) {
    addCologne(
      firstName: $firstName
      lastName: $lastName
      description: $description
      username: $username
    ) {
      firstName
      lastName
      description
    }
  }
`;

// MORE CODE
```

#### Add render props review

1. Import `Mutation` from `react-apollo` and your actual mutation from your GraphQL queries folder

```
import { Mutation } from 'react-apollo';
import { ADD_COLOGNE } from '../../queries';
```

2. Where is your mutation coming from? In this case we have a form that will be adding a cologne

* So wrap your form inside `MUTATION` tags with a `mutation` attribute set to the value of your mutatation `ADD_COLOGNE`

```
render() {
  const { scentName, scentPrice, description, username } = this.state;

  return (
    <div className="App">
      <h2 className="App">Add Cologne</h2>
      <Mutation
        mutation={ADD_COLOGNE}
        variables={{ scentName, scentPrice, description, username }}
      >
        <form>

         // MORE CODE
        </form>
      </Mutation>
    </div>
  );
}

```

3. Add **render props** function

```
// MORE CODE

<Mutation
  mutation={ADD_COLOGNE}
  variables={{ scentName, scentPrice, description, username }}
>
 {() => {

  }}
  <form>

   // MORE CODE
  </form>
</Mutation>

// MORE CODE
```

4. Pass in the arguments for the render prop and use them accordingly

```
<Mutation
  mutation={ADD_COLOGNE}
  variables={{ scentName, scentPrice, description }}
>
  {(addCologne, { data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    // console.log(data);

```

5. Add a return inside render props

```
// MORE CODE

<Mutation
  mutation={ADD_COLOGNE}
  variables={{ scentName, scentPrice, description }}
>
  {(addCologne, { data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    // console.log(data);

    return (
      <form
        className="form"
        onSubmit={event => this.handleSubmit(event, addCologne)}
      >

// MORE CODE
```

## Dealing with Session problems
### Troubleshooting techniques for this section
* Follow the below tips and you will save lots of time when you get errors
* When working with session you will need to refresh your browser at times to get the data you need
* You may at first see a browser error but before you do any troubleshooting, just refresh the browser and it should work
* Sometimes you may need to delete your browser token in the Application pane, and log in again
* Sometimes you may need to log out and log in
* You may need to browser to the home page, log in and then browse to the profile page to get the error to go away
* If you have old data in your mLab remote database it might be a good idea to delete all documents in the users collection and genealogies collection and create one user and add several genealogies so you know you have fresh data in the most current data structure

## jwt must be provided - JsonWebTokenError
* This pops up in the terminal, I am looking into figuring out how to remove it
* Found the answer:
  - I figured out how to get rid of the jwt is required error when logging out
  - I had to remove the entire token instead of just setting it to an empty string
  - I made my Signout a class based component (I only use class based components as I hate converting stateless functional components to class based components) and just removed the token completely from the localStorage upon Signing out

```
export class Signout extends Component {
 
handleSignout = (client, history) => {
    // clear token
    localStorage.removeItem('token'); // modified this line
    client.resetStore();
    // redirect using withRouter
    this.props.history.push('/');
  };
 
// more code
```

## If you update mac OS to mojave
* Upgrade node using Homebrew
* Uninstall bcrypt and install brcrypt-nodejs
* remove package-lock.json
* `$ npm rebuild`

* `$ npm i`

