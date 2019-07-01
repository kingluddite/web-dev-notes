# Locking Down Individual Type Fields
* Focus on less than obvious ways to lock down data
* Currently there is a way for a person to obtain "draft" posts (unpublished) without being authenticated
    - And that is by just providing a selection set

```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* Now I get everything back `published` and `unpublished`

## Lock down data
* Close all loop holes in our authentication system

## We can also lock down individual fields 
* Terrible idea to expose all user's email addresses to the outside world
* We won't be making any changes to the user's Query
    - The problem is with how users are resolved
* Here I'm getting all comment published and unpublished

```
query {
  comments {
    id
    text
    author {
      id
      name
      email
      posts {
        id
        title
        published
      } 
    }
  }
}
```

## How can we address this and lock our data down better?
* We will go into `src/resolvers/User.js`

### Here's one way we could hide the email
`schema.graphql`

* Just remove the email

```
// MORE CODE

type User {
  id: ID!
  name: String!
  password: String!
  posts: [Post!]!
  comments: [Comment!]!
}

// MORE CODE
```

* When we create a user we could add an `email` but whenever it came to selecting a user you would never be able to pull that email value back

```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* Above fails with `"Cannot query field \"email\" on type \"User\"."` but if I remove email and run again it will work

## This is not the approach we want to take!
* This would also affect our `me` query which could be useful for generating our profile page
* So in reality I don't want to ALWAYS hide the email, I just want to hide the email if you are viewing a user other than yourself (the authenticated user)

## How can we do that?
* Bring email back but make it **nullible**
  - Change `email: String!` to `email: String`

`schema.graphl`

```
// MORE CODE

type User {
  id: ID!
  name: String!
  email: String
  password: String!
  posts: [Post!]!
  comments: [Comment!]!
}

// MORE CODE
```

* So when you are selecting an `email`
  - Sometimes you'll get a `String` (if you're logged in)
  - Other times you'll get `null` if you're trying to pull the `email` from **all users**

## Customize User.js
* We can customize what happens when the users `email` field is resolved
* Let's show how to get back `null` when we request an email from a user

`User.js`

```
// custom object resolver
const User = {
  email(parent, args, ctx, info) {
    return null;
  },
};

export { User as default };
```

## :4000 GraphQL Playground
```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* Now we get `null` for every email
* If I updated:

`User.js`

```
const User = {
  email(parent, args, ctx, info) {
    return 'iwannarock';
  },
};

export { User as default };
```

And ran :4000 GraphQL Playground

```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* I would get "Iwannarock" for every email returned
* We want to return null or the email and the way we can accomplish this is through `parent`

## parent
* Parent is the User Object
* We will:

1. Check if this user is authenticated
2. See if the user's authenticated `id` with the **parent.id**
    * If it does, then we know the user is trying to select their own email
    * If it doesn't match up we know that they are trying to select a different user's email and that is not good

## Let's see what parent looks like
```
import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, { prisma, request }, info) {
    // get id but don't require auth
    // if you are not authenticated you will get null back
    const userId = getUserId(request, false);

    console.log(JSON.stringify(parent, null, 2));
  },
};

export { User as default };
```

* Fire off a users query on :4000

```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* Output will look like:

```
{
  "id": "cjxjxyrze07ef07599zkdw4gv",
  "name": "Adam",
  "email": "adam@adam.com",
  "posts": [
    {
      "id": "cjxjy3y7s07fo07593p9hs57z",
      "title": "Post a",
      "published": true
    },
    {
      "id": "cjxjy420y07fu0759yrl6il99",
      "title": "Post b",
      "published": true
    },
    {
      "id": "cjxjy448707g00759s3fberye",
      "title": "Post c",
      "published": true
    },
    {
      "id": "cjxjy46vb07g60759lxmk8mfr",
      "title": "Post d",
      "published": true
    },
    {
      "id": "cjxjy4b2g07gc0759kvjipmno",
      "title": "Post e",
      "published": true
    }
  ]
}
```

`User.js`

```
import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, { prisma, request }, info) {
    // get id but don't require auth
    // if you are not authenticated you will get null back
    const userId = getUserId(request, false);

    // is there a userId
    // AND
    // does that userId === parent.id?
    if (userId && userId === parent.id) {
        // if true, send back the email that lives on `parent.email`
      return parent.email;
    } else {
        // there is not userId or they don't match
        return null;
    }
  },
};

export { User as default };
```

* So if I'm logged in as Adam, I will see his email
    - If I'm logged in as Adam and I fetch Eve, I won't see her email 

## Test this out
* :4000

```
query {
  users {
    id
    name
    email
    posts {
      id
      title
      published
    }
  }
}
```

* Adam and Eve emails are null

## But if I run the me Query in :4000 GraphQL Playground
```
query {
  me {
    id
    name
    email
  }
}
```

* And I provide Adam's auth token to GraphQL Playground
* I will see Adam's email

## Grab the auth token from me and move to users Query
* Run it and you will see adam's email in the user's query

## Summary
* We now have a way to hide fields whether or not you are logged in as that user

## Flaw with our code
* Edge case

```
query {
  users {
    id
    name
    email
  }
}
```

* We get what we expect

```
{
  "data": {
    "users": [
      {
        "id": "cjxjxyrze07ef07599zkdw4gv",
        "name": "Adam",
        "email": "adam@adam.com"
      },
      {
        "id": "cjxjxz94j07ek07592yapfmum",
        "name": "Eve",
        "email": null
      }
    ]
  }
}
```

* I get the email with who I'm logged in as (auth token) ---> Adam
* I don't get the email with someone I'm not logged in as ---> Eve

## What happens when this users query fires off?
1. It heads over to `Query.js` and runs the users method

```
// MORE CODE

  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },

// MORE CODE
```

* What does it return?
    - It returns for every user whatever information was selected

```
return prisma.query.users(opArgs, info);
```

* In our latest case we are returing `id`, `name` and `email`

```
query {
  users {
    id
    name
    email
  }
}
```

* Output

```
{
  "data": {
    "users": [
      {
        "id": "cjxjxyrze07ef07599zkdw4gv",
        "name": "Adam",
        "email": "adam@adam.com"
      },
      {
        "id": "cjxjxz94j07ek07592yapfmum",
        "name": "Eve",
        "email": null
      }
    ]
  }
}
```

* If we removed name, we would no longer be getting `name` back

```
query {
  users {
    id
    email
  }
}
```

* Output - no longer get `name` back

```
{
  "data": {
    "users": [
      {
        "id": "cjxjxyrze07ef07599zkdw4gv",
        "email": "adam@adam.com"
      },
      {
        "id": "cjxjxz94j07ek07592yapfmum",
        "email": null
      }
    ]
  }
}
```

## What happens after `users()` resolver runs?
* Then it runs the individual field resolvers if any are set up (`User.js` - is what would run next in this example)

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

* It would run email(parent, .......) and pass in as the value for parent, the individual items that came back
* This means the information on parent depends on the selection set on the client
    - And that's a problem because we are using things like `parent.id` - which are not guaranteed to exist
    - If we just ask for `id` and `email` everything goes well
    - But if I were to just ask for every user's email:
*

```
query {
  users {
    email
  }
}
```

* Now we no longer get adam's email:

```
{
  "data": {
    "users": [
      {
        "email": null
      },
      {
        "email": null
      }
    ]
  }
}
```

* This happens because we did not ask for the `id` and in User.js our logic `userId === parent.id` fails
* data for one field shouldn't change because another field is being selected or unselected (this is a problem we will address later)

## Next
* We'll fix this issue next when dealing with GraphQL fragments
