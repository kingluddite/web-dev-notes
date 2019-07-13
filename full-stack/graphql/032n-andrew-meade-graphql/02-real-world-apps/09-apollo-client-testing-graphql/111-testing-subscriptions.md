# Testing Subscriptions
1. We will use `client.subscribe()`
2. We will then subscribe to changes
3. We will make a change to the Database
4. We will ensure that the subscription got notified

## Our current subscriptions
* comment()
    - write a test to check that we are notified on changes to comments that belong to a post
* post()
    - write a test to check that we are notified on changes to posts (challenge) 
* myPost()

## In order to accomplish this we must use Apollo to fire off a subscription
* As of right now we are only using it for mutations and queries

### Houston we have a problem!
* Apollo as of 7/12/2019, does not currently support subscriptions
    - [docs](https://www.apollographql.com/docs/react/advanced/subscriptions/)
    - "This is an advanced feature that Apollo Boost does not support. Learn how to set Apollo Client up manually in our Apollo Boost [migration guide](https://www.apollographql.com/docs/react/advanced/boost-migration/)."
* This is not good as we want to set up and test subscriptions
* ApolloBoost is just a collection of libraries under the Apollo echosystem
    - It is a zero-configuration to get started with Apollo
    - All you have to do is provide that object with the URI property and you're done

`getClient.js`

```
// MORE CODE

import ApolloBoost from 'apollo-boost';

const getClient = jwt =>
  new ApolloBoost({
    uri: 'http://localhost:4000',

// MORE CODE
```

* **note** The other tools though can be used to create a more complex client that supports subscriptions
    - ApolloBoost developers plan on adding subscription support to the library

## Temporary Solution - We will use a temporary workaround
* We will create a new version of the `getClient.js` file
* Instead of relying on ApolloBoost that version uses all of the libraries that ApolloBoost uses behind the scenes
    - It gives us what we already get from ApolloBoost but it will also give us subscription support
    - [link to file](https://gist.github.com/andrewjmead/acdd7bc29d853f8d7a8962d6a1d9ae5a)

`getClient.js`

```
// First up, install the modules necessary with the following command
// npm install apollo-client@2.4.2 apollo-cache-inmemory@1.2.10 apollo-link-http@1.5.5 apollo-link-error@1.1.1 apollo-link@1.2.3 apollo-link-ws@1.0.9 apollo-utilities@1.0.21 subscriptions-transport-ws@0.9.15 @babel/polyfill@7.0.0 graphql@0.13.2

import '@babel/polyfill/noConflict'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from 'apollo-utilities'

const getClient = (jwt, httpURL = 'http://localhost:4000', websocketURL = 'ws://localhost:4000') => {
    // Setup the authorization header for the http client
    const request = async (operation) => {
        if (jwt) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        }
    }

    // Setup the request handlers for the http clients
    const requestLink = new ApolloLink((operation, forward) => {
        return new Observable((observer) => {
            let handle
            Promise.resolve(operation)
                .then((oper) => {
                    request(oper)
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    })
                })
                .catch(observer.error.bind(observer))

            return () => {
                if (handle) {
                    handle.unsubscribe()
                }
            }
        })
    })

    // Web socket link for subscriptions
    const wsLink = ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                )
            }
                
            if (networkError) {
                console.log(`[Network error]: ${networkError}`)
            }
        }),
        requestLink,
        new WebSocketLink({
            uri: websocketURL,
            options: {
                reconnect: true,
                connectionParams: () => {
                    if (jwt) {
                        return {
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                }
            }
        })
    ])

    // HTTP link for queries and mutations
    const httpLink = ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                )
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`)
            }
        }),
        requestLink,
        new HttpLink({
            uri: httpURL,
            credentials: 'same-origin'
        })
    ])

    // Link to direct ws and http traffic to the correct place
    const link = ApolloLink.split(
        // Pick which links get the data based on the operation kind
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query)
            return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLink,
    )


    return new ApolloClient({
        link,
        cache: new InMemoryCache()
    })
}

export { getClient as default }
```

* We have to import some new modules
* Many of the imports ApolloBoost already uses behind the scenes
    - `apollo-link-ws` is not one that ApolloBoost uses and this is what sets up websocket support and that is the protocol that allows us to have real time communication with our subscriptions
    - We have to manually set up `apollo-link-ws` as ApolloBoost does not support websockets
    - In the above file we have lots of configuration (everything that ApolloBoost does plus a little bit more to add support for websockets)
        + The file still exports a `getClient()` function that exports a jwt argument (as our old getClient() function did)
        + We will be able to swap out our files without having to change any of our test case code
            * Both getClient() functions return a client and those clients are identical besides the fact that the new `getClient()` function supports subscriptions
* The file has all the code to set up the code manually (lots of boring configuration)

## Install necessary modules
```
$ npm install apollo-client@2.4.2 apollo-cache-inmemory@1.2.10 apollo-link-http@1.5.5 apollo-link-error@1.1.1 apollo-link@1.2.3 apollo-link-ws@1.0.9 apollo-utilities@1.0.21 subscriptions-transport-ws@0.9.15 @babel/polyfill@7.0.0 graphql@0.13.2
```

* Duplicate `getClient.js` 
* Rename `getClient.js` to `getClientWithoutSubs.js`
* Delete all code inside `getClient.js` and replace with code from above (that has support for subscriptions)
* As soon as ApolloBoost supports subscriptions you can delete the new file and use the original file (a lot less code!)

## Test the Test
* Run the test again and make sure that our change still works as it did before
* All 12 should pass

## Let's start testing our subscriptions
* We will make sure that we get notified of comments from a particular post
* We will do this in the comment test suite
    - It could also be placed in the post test suite (both are fine as long as at the end of the day you are consistent)

### How can we test a subscription?
`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  //
});
```

* We are going to be firing off a subscription
    - We have 3 subscriptions available to us
        + comment()
            * We'll start with this comment
        + post()
        + myPost()
* View docs localhost:4466
    - https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod
    - Look at `comment` subscription Schema and you'll see it requires a `postId: ID!`  argument
        + We will monitor our first test post (which is published)

`comment-operations.js`

```
// MORE CODE

const subscribeToComments = gql`
  subscription($postId: ID!) {
    comment(postId: $postId) {
      //
    }
  }
`;

// MORE CODE
```

* Using the docs we can see the payload for our subscriptions is `CommentSubscriptionPayload!`

```
type CommentSubscriptionPayload {
    mutation: MutationType!
    node: Comment
}
```

* Has `mutation` which lets us know what happened (Did a comment get deleted, updated or added)
* `node` - which contains the individual comment fields
* We also export `subscribeToComments`

`comment-operations.js`

```
// MORE CODE

const subscribeToComments = gql`
  subscription($postId: ID!) {
    comment(postId: $postId) {
      mutation
      node {
        id
        text
      }
    }
  }
`;
export {
  canDeleteOwnComment,
  canNotDeleteOtherUserComment,
  subscribeToComments,
};


// MORE CODE
```

* We will need two things to import
    - The subscribeToComments we just wrote
    - We also need to a post id to monitor so we will also import `postOne`

`comment.test.js`

```
// MORE CODE

import seedDatabase, {
  // MORE CODE

  postOne,
  
  // MORE CODE
} from './utils/seedDatabase';
import {
  // MORE CODE

  subscribeToComments
} from './utils/comment-operations';

// MORE CODE
```

## Use our new imports to set up the test suite
* We will use a new method on client called `subscribe` that will setup the subscription
* The subscribe method takes in an options object (like query and mutate did) and we provide 2 properties
    - query - where we list out the subscription we want to use (and we just imported that)
    - variables we want to use

##
`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id,
  };

  client.subscribe({
    query: subscribeToComments,
    variables,
  });
});
```

* With queries and mutations the data comes back a single time
    - We will never get new data back without sending off the query again
* But with our subscription we will get data back any time a comment for this post changes
    - This means we CAN NOT user a Promise because Promises can resolve or reject a single time with a single value
    - So in this case we will set up a callback function that fires every time the subscription gets new data

## To do this we do the following:

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        //
      },
    });
});
```

* Set up a callback function that fires every time the subscription gets new data
* We append by chaining on the method calls `.subscribe()`
    - And we set this up with an object argument with a single property `next()` (a function)
        + And `next()` gets called with the `response` **next(response)**
        + And next will fire as many times as it needs to (every single time a comment changes)
            * This `response` is similar to what we get back from a query or a mutation (we have access to `response.data` to get information about the comment that was altered)

## What are we going to do to trigger this function?
* We will set up some assertions making sure things went well

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
      },
    });
});
```

* But in order for `next()` to fire we have to change a comment

`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
      },
    });

  // Change a comment
});
```

* So we need to change a comment in order to trigger next()
* And we need next() to run so we can assert the subscription is working as expected
    - We can use any of our prisma mutations to change one of the comments for that post
        + We'll use the `deleteComment` mutation to delete one of the two comments

`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
      },
    });

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
```

* At this point The next() function should be triggered a single time

## Now we can focus on our assertions
* Let's set up a dummy assertion

`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async () => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
        expect(1).toBe(2);
      },
    });

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
```

## Houston we have a problem!
* The dummy test `expect(1).toBe(2);` should fail but it does not!

### Why is it not failing?
* Our assertion is not being taken into account when jest determines whether or not this test should fail or pass
* The problem is Jest runs our function and as soon as the function finishes it goes ahead and says the test is done and determines whether or not an error was thrown

![jest runs our function](https://i.imgur.com/fQdgg4N.png)

* Right after `deleteComment()` is done that is when the function finishes
* It will actually finish before the asynchronous process can notify our subscription that the new event has been fired in which case `next()` would run

![finish before async process can notify our subscription that the new event has been fired](https://i.imgur.com/NhEEx58.png)

* So the code `expect(1).toBe(2);` does run but it runs after this function completes and by the time it runs jest has already determined whether the test has passed or failed

![outer function](https://i.imgur.com/hRU3Q7g.png)

## Solution - The Jest `done` argument
* Jest supports a `done` argument

`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async (done) => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
        expect(1).toBe(2);
      },
    });

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
```

* When we configure `done` like this the test case won't be considered finished until the test case is called
* And all we have to do is call `done` like this:

`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async done => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
        expect(1).toBe(2);
        done();
      },
    });

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
```

* Run test and we will fail 1 test
* Expected 2 and received 1
* We just proved that this function is indeed running so we know that when we delete a comment the subscription is indeed getting notified

## Let's talk about what we should actually assert
```
// MORE CODE
test('Should subscribe to comments for a post', async done => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
        done();
      },
    });

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
```

* Our current test case does a good job in asserting that things go well
* The next() insures that the function does indeed get called - meaning that our subscription does indeed get notified
    - If it didn't the next() function would never get called, done() would never fire and after a certain amount of time, jest just considers the test a failure if done() never runs
    - So we know that next() is at least executing
* We don't need to assert something that the comment has indeed been removed because the subscription is not what is removing the comment, its just getting notified
    - If we were to assert that the comment is indeed removed we are essentially testing the prisma library itself making sure it works and that doesn't make too much sense
    - In this case we will assert that we are getting notified about a deletion

`comment.test.js`

```
// MORE CODE
test('Should subscribe to comments for a post', async done => {
  const variables = {
    postId: postOne.post.id,
  };

  client
    .subscribe({
      query: subscribeToComments,
      variables,
    })
    .subscribe({
      next(response) {
        // Assertions
        expect(response.data.comment.mutation).toBe('DELETED');
        done();
      },
    });

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
```

* Now we are confirming 2 things:

1. We're confirming that we are being notified because something's been deleted
2. We're confirming that we are actually getting notified off of the fact that done() is set up

* That should give us 13 passing tests

## Challenge - Goal: Add a test case for the post subscription
1. Setup the post subscription operation
2. Setup the subscription using the new operation
3. Fire off a prisma mutation that would trigger the subscription such as deleting a published post
4. Assert the mutation is correct
5. Test your work

### Challenge Solution
1. Setup the post subscription operation

`post-operations.js`

```
// MORE CODE
const subscribeToPosts = gql`
  subscription {
    post {
      mutation
      node {
        title
        body
        published
      }
    }
  }
`;

export {
  getPosts,
  getMyPosts,
  updatePost,
  createPost,
  deletePost,
  subscribeToPosts,
};
```

2. Setup the subscription using the new operation


3. Fire off a prisma mutation that would trigger the subscription such as deleting a published post
4. Assert the mutation is correct
5. Test your work

## Final post subscription test code
`post.test.js`

```
// MORE CODE

import {

    // MORE CODE

  subscribeToPosts,
} from './utils/post-operations';

// MORE CODE

test('Should subscribe to post', async done => {
  client
    .subscribe({
      query: subscribeToPosts,
    })
    .subscribe({
      next(response) {
        expect(response.data.post.mutation).toBe('DELETED');
        done();
      },
    });

  await prisma.mutation.deletePost({
    where: {
      id: postOne.post.id,
    },
  });
});

```

* We are using prisma in the above tests for a specific reason rather than just firing off one of our own operations
    - We want to isolate our tests
    - If we are using our own subscription and our own delete mutation it would be hard to pinpoint as to why a test is failing if it failed
        + In this case Prisma does it's own testing so we can assume that it is going to work as expected and we are just testing the subscription related features

## Summary
* You now know how to use queries, mutations and subscriptions from clients
    - Whether that is the browser or a test suite
