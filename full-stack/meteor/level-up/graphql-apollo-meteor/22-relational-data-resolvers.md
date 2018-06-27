# Relational Data Resolvers
* We never made a query to check for goals in graphql
* We don't need to as we'll only use our goals in context to our resolutions

`Resolutions.graphql`

```
type Resolution {
  _id: String!
  name: String!
  goals: [Goal]
}

type Query {
  resolutions: [Resolution]
}

type Mutation {
  createResolution(name: String): Resolution
}
```

* **note** make sure to update bug comment (busts the cache on graphl files)

`resolutions/resolvers.js`

```
import Resolutions from './resolutions';

export default {
  Query: {
    resolutions(obj, args, { userId }) {
      return Resolutions.find({
        userId,
      }).fetch();
    },
  },

  Resolution: {
    goals: resolution => {
      console.log(`res id ${resolution._id}`);
    },
  },

  // MORE CODE
```

## Refresh graphiql
```
{
  resolutions {
    _id
    name
    goals {
      _id
      name
      completed
    }
  }
  user {
    _id
    email
  }
}
```

* Click play
* goals will be null because we haven't returned anything yet

```
{
  "data": {
    "resolutions": [
      {
        "_id": "tq5LGAdCYfyxeEwRs",
        "name": "test",
        "goals": null
      }
    ],
    "user": {
      "_id": "6QTF3zNtssELKMbdu",
      "email": "me@you.com"
    }
  }
}
```

* After clicking play you will see server terminal showing id `res id tq5LGAdCYfyxeEwRs` (obviously your id will be different)

## Remember
* We already assigned a resolutionId to an individual goal

`goals/resolvers.js`

```
import Goals from './goals';

export default {
  Mutation: {
    createGoal(obj, { name, resolutionId }) {
      const goalId = Goals.insert({
        name,
        resolutionId,
        completed: false,
      });
      return Goals.findOne(goalId);
    },
  },
};
```

* This means we should be able to query the DB with a resolutionId

## Find all goals that have a resolutionId of the resolutionId we pass

`resolutions/resolvers.js`

```
// MORE CODE
Resolution: {
  goals: resolution => {
    console.log(`res id ${resolution._id}`);
    return Goals.find({
      resolutionId: resolution._id,
    }).fetch();
  },
},

Mutation: {
// MORE CODE
```

* Click play and we see an empty array for goals
* Enter a goal (hope you are logged in) click play on graphiQL again
* And now you will see your goal!

**graphiQL output**

```
{
  "data": {
    "resolutions": [
      {
        "_id": "tq5LGAdCYfyxeEwRs",
        "name": "test",
        "goals": [
          {
            "_id": "fz5SJLeFfYc2KmriW",
            "name": "test2",
            "completed": false
          }
        ]
      }
    ],
    "user": {
      "_id": "6QTF3zNtssELKMbdu",
      "email": "me@you.com"
    }
  }
}
```

## This is cool
* Goals isn't even part of resolutions
* Resolutions isn't even storing goal ids
* This saves us from worrying how the data is stored in the DB and just focus on how to grab it out of the DB
    - **note** You need to add index in production app for best performance but we are not introducing that complex topic here
    - Anything you are finding on in mongo you need to make sure it is indexed

