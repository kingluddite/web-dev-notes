# Relational Data (Basics)
* How do we set up a relationship between User and Post in GraphQL?

![diagram of Custom Types and Fields](https://i.imgur.com/POXOfCw.png)

## Relationship between a User and a Post
* Post has an author property which gives us access to the user so we can access whatever fields we need
* User will have a posts property which will link to all the posts that user created

### We did this already
* Ask for a post and show all their id's and titles

![just list posts](https://i.imgur.com/9QTow7X.png)

### What we didn't do yet
* Ask for the posts and the author's name

![post and author's name](https://i.imgur.com/urkIwhz.png)

* **remember** In GraphQL it is up to the client to request what data they need
    - * We could also request comments too

![also comments](https://i.imgur.com/pzk0UVQ.png)

## review demo GraphQL Playground
`https://graphql-demo.mead.io/`

* Open up `Schema` tab and analyze `post`
    - You will see

```
author: User!
comments: [Comment!]
```

* We will be setting up these two
* Click on `author`
    - You will see the User definition

### What we want to do
* Get all **posts** (`id`, `title` and `author`)
* For **author** just want (`id` and `name`)

* Playground

```
query {
  posts {
    id
    title
    author {
      id
      name
    }
  }
}
```

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "b7d13e18-c0d8-491b-8e35-2a0b2cdb994d",
        "title": "GraphQL 101",
        "author": {
          "id": "679fa072-52a3-4caf-97d2-36c0a8b914dd",
          "name": "Andrew"
        }
      },
      {
        "id": "7f6067fd-38ca-44da-b710-d995396461c3",
        "title": "GraphQL 201",
        "author": {
          "id": "679fa072-52a3-4caf-97d2-36c0a8b914dd",
          "name": "Andrew"
        }
      },
      {
        "id": "2c155c19-3670-4d83-9014-afc8640212b1",
        "title": "Programming Music",
        "author": {
          "id": "3db918bc-f5ff-4a67-8291-e39cb29290a6",
          "name": "Sarah"
        }
      }
    ]
  }
}
```

## Let's set up our GraphQL API with relational fields
* We need to alter our Post custom type to have a new field called `author` that will have a non nullible field called User

`index.js`

```
// MORE CODE

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    professionalLeague: String!
    author: User!
  }
`;

const resolvers = {

// MORE CODE
```

## Alter our fake data to have an author field pointing to the id of one of the Users

`index.js`

```
import { GraphQLServer } from 'graphql-yoga';

const users = [
  {
    id: '1',
    name: 'Manny',
    email: 'manny@pepboys.com',
  },
  {
    id: '2',
    name: 'Mo',
    email: 'mo@pepboys.com',
    age: 100,
  },
  {
    id: '3',
    name: 'Jack',
    email: 'jack@pepboys.com',
  },
];

const posts = [
  {
    id: '1',
    title: 'soccer',
    body: '11 players',
    published: true,
    professionalLeague: 'MLS',
    author: '1',
  },
  {
    id: '2',
    title: 'basketball',
    body: '5 players',
    published: false,
    professionalLeague: 'NBA',
    author: '1',
  },
  {
    id: '3',
    title: 'tennis',
    body: '2 players',
    published: true,
    professionalLeague: 'MLT',
    author: '2',
  },
];

// MORE CODE
```

## We have our data, how do we make the relationship work?
* We look at our resolver and see our posts method will return an array of objects where each object matches up with the Post schema
* We have all of the data already from Our Post schema but we do not have the auther user object
    - When we are setting up a field who's value is another one of our custom types we have to define a function that tells GraphQL how to get the author if we had the post
        + We can do that by defining a new root property on `resolvers`
        + So alongside of Query (NOT INSIDE OF QUERY)

```
// MORE CODE

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isProfessionalLeagueMatch = post.professionalLeague
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch || isProfessionalLeagueMatch;
      });
    },

    // MORE CODE

    post() {
      return {
        id: '123',
        title: 'Great Movies',
        body: 'Jaws made me afraid of the water',
        published: '1/1/2019',
      };
    },
  },
  Post: {
    author(parent, args, ctx, info) {

    }
  }
};

// MORE CODE

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* The goal is to return the correct author with the post
* How do we do that?
* We need some info from the Post object, the author property which contains the `id`
    - The good news is the `post` information lives in `parent` argument
    - So we can use that to determine which User object to return

## Try Playground
```
query {
  posts {
    id
    title
    body
    published
    professionalLeague
    author {
      name
    }
  }
}
```

* We get this error when we run it

```
{
  "data": null,
  "errors": [
    {
      "message": "Cannot return null for non-nullable field User.name.",
      "locations": [
        {
          "line": 9,
          "column": 7
        }
      ],
      "path": [
        "posts",
        0,
        "author",
        "name"
      ]
    }
  ]
}
```

* Why the error?
* The first thing GraphQL will do is run the resolver query
* This would run

```
// MORE CODE

const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isProfessionalLeagueMatch = post.professionalLeague
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch || isProfessionalLeagueMatch;
      });
    },

// MORE CODE
```

* Since we are passing no args all posts are returned
* If we just had scalar types than all would be good because all of the scalar types exist on the array of posts
    - But we also asked for `author` and `author` DOES NOT live on there and GraphQL because author doesn't live there will then call this function for each post

```
author(parent, args, ctx, info) {

}
```

```
// MORE CODE

  Post: {
    author(parent, args, ctx, info) {

    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* GraphQL will call it with the post object as the `parent` argument
    - For the first post it will call this method where parent is the first post object
    - For the second post it will call it again where parent is the second post object
    - And it will do it for the third post again
        + This means we could do this
            * parent.id
            * parent.title
            * parent.body
            * parent.published
            * parent.professionalLeague
            * BUT WE CAN ALSO ACCESS `author` (which is what we want)

## Add to our resolver
`index.js`

```
// MORE CODE

  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('This graphql-yoga server is running');
});
```

* Try it out in Playground

```
query {
  posts {
    id
    title
    body
    published
    professionalLeague
    author {
      name
    }
  }
}
```

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "1",
        "title": "soccer",
        "body": "11 players",
        "published": true,
        "professionalLeague": "MLS",
        "author": {
          "name": "Manny"
        }
      },
      {
        "id": "2",
        "title": "basketball",
        "body": "5 players",
        "published": false,
        "professionalLeague": "NBA",
        "author": {
          "name": "Manny"
        }
      },
      {
        "id": "3",
        "title": "tennis",
        "body": "2 players",
        "published": true,
        "professionalLeague": "MLT",
        "author": {
          "name": "Mo"
        }
      }
    ]
  }
}
```

* Notice how magically we are getting the author's name
* How?

`index.js`

```
// MORE CODE

  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
  },

// MORE CODE
```

* `find()` is similar to `filter()` although it will match an individual array item, so in this case it will match the first one that returns true and it will give us back an individual user object
* We set up our callback function and it gets called one time for each user until we find a match
* We set up a conditional if the user.id equals the parent.author, then we know we found a match
    - If they are not equal we will continue looking through the user's array

## Currently our relational data only goes in a single direction
`index.js`

```
// MORE CODE

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    professionalLeague: String!
    author: User!
  }

// MORE CODE
```

* The Post type has a link to the User type via that `author` property
* **Important** But the User type DOES NOT have a link to the Post type
    - We are going to set that up via the posts property
        + So if I do have a user I can access all of their posts
        + That would be useful if I am showing the author's home page on a site and I want to show just the posts written by them

## Next
* Set up a relationship between the User and the Post via a new posts field on User
