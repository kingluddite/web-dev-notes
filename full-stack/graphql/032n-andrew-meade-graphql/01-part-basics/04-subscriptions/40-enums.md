# ENUMS
* Help us better model our application data

## Define ENUM
(ENUM is short for enumeration)
1. A special type that defines a set of constants
2. This type can then be used as the type for a field (similar to scalar and custom object types)
3. Values for the field must be one of the constants for the type

## Let's break this down with an example
1. Let's define a special type and a set of constants

* UserRole
    - List out all of the potential values
        + standard
        + editor
        + admin

2. When I was to go find the user I would then use that as the type for one of the fields

```
type User {
    role: UserRole!
}
```

3. Now we are essentially enforcing the value for role to be one of our 3 values (standard, editor or admin)
    * They can not be anything else!

## One more example
* We are using GraphQL to model a laptop
    - a field to represent if the laptop is powered up
        + laptop.isOn (true if it is on, false if it is off)
             * But boolean won't work with this because a laptop can also be in `sleep` mode
             * Boolean represents only 2 states, and ENUM can represent as many states as we need and we can enforce that it is one of those 
* A better way

```
laptop.powerStatus ----> on, off, sleep
```

## Couldn't we easily replace ENUM with a simple string?
* powerStatus ----> 'on', 'off', 'sleep' (3 different string values)
* Yes we could do this but with ENUMs we can enforce the values
    - So if someone tried to save a powerStatus with an ENUM other than the values we specified, it would fail
    - But if someone tried to save a powerStatus with a string not in our list of strings, it would NOT FAIL and this isn't good, ENUMs are better!

## This should look familar with:
* PostSubscriptionPayload
* CommentSubscriptionPayload

`schema.graphql`

```
// MORE CODE

type PostSubscriptionPayload {
  mutation: String!
  data: Post!
}

type CommentSubscriptionPayload {
  mutation: String!
  data: Comment!
}
```

* Both have a type String
* But in reality the values can be one of three Things
* We can use an ENUM to make sure it is one of 3 values (CREATED, UPDATED, DELETED)
    - In this case the value is always coming from the server to the client so it's not as important to use an ENUM
    - But when the data is coming from the client it is even more important to use an ENUM because we can actually enforce that it is one of the constant types

`schema.graphql`

```
// MORE CODE

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

type PostSubscriptionPayload {
  mutation: MutationType!
  data: Post!
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  data: Comment!
}
```

* Now the MutationType for this field MUST be one of these 3 values (CREATED, UPDATED, DELETED)
* Another advantage of using ENUMs it to catch typos and inconsistencies throughout your application

## Let's see ENUMs in action
* Make this change

`Mutation.js`

```
// MORE CODE

  createComment(parent, args, { db, pubsub }, info) {
    // MORE CODE

    db.comments.push(comment);
    pubsub.publish(`comment ${data.post}`, {
      comment: {
        mutation: 'CREATEEEEEED',
        data: comment,
      },
    });

    return comment;
  },

// MORE CODE
```

* We mispelled CREATED
* If we were just using strings this would be valid and would not throw an error but since we are using ENUMs try to create a comment and see what happens

```
subscription {
  comment(postId: "10") {
    mutation
    data {
      id
      text
    }
  }
}
```

* Create comment

```
mutation {
  createComment(data: { text: "three", author: "3", post: "10" }) {
    id
    text
    author {
      id
      name
    }
  }
}
```

* You will get this error in our subscription:

```
{
  "errors": [
    {
      "message": "Expected a value of type \"MutationType\" but received: \"CREATEEEEED\"",
      "locations": [
        {
          "line": 3,
          "column": 5
        }
      ],
      "path": [
        "comment",
        "mutation"
      ]
    }
  ],
  "data": null
}
```

* ENUM values are represented as strings so this works great with our published subscriptions
* The error let's us quickly fix our typo
* Fix the typo and try again and you should see that it works as expected and the event is fired

## Summary
* ENUMs are great for a list of values you know about ahead of time
* ENUMs would not be good for posts because you have no idea what your post titles will be
* With just 2 fixed values use Boolean
* With 3 or more fixed values use ENUMs
