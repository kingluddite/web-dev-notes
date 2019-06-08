# Delete Data with Mutations (Part 1)
* We will create a delete Mutation that deletes a user

## What are we trying to delete?
* When deleting data it is important to be mindful of not just what you are trying to delete but also the associated data

### What if we delete a user?
* We delete the user
    - But we also need to delete:
        + All posts created by that user
        + All comments created by that user
    - Why do we need to worry about associated data not getting deleted?
        + Otherwise we will have invalid data
        + If a post tries to reference an author that no longer exists?

## Time to delete a user with a Mutation
* We will return the deleted User
* The only thing we need to delete a user is the User's `id`
    - That `id` has to be provided in order for us to delete the user

`index.js`

```
// MORE CODE

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post! 
    createComment(data: CreateCommentInput!): Comment!
  }

// MORE CODE
```

## Create the `deleteUser` resolver
* First check to make sure there is a user to delete
    - If there is no user then we will have no user to return when we delete a user
    - To do this we will use the `findIndex()` method
        + This method is identical to the `find()` method but `find()` returns the actual element in the array
        + And `findIndex()` returns the `index` of the array
        + [findIndex docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

### Example of findIndex()
* Tries to find the first number greater than 13 in the array
* It will check each number in the array and ask if it is > 13
* The first value that is true, that number's array index will be returned

```
var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 13;
}

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

```
// MORE CODE

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => {
        return (user.id === args.id);
      });
    },

// MORE CODE
```

* Shorthand is:

```
// MORE CODE

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => (user.id === args.id));
    },

// MORE CODE
```

* If there is a match
    - It will return `true`
* If there is NOT A MATCH
    - It will return `-1`

* Very similar to the `indexOf()` method we can use on a string

## Now we need to check if we didn't find a user and throw an error
```
// MORE CODE

    deleteUser(parent, args, ctx, info) {
      // check for a user
      const userIndex = users.findIndex(user => (user.id ==== args.id));

      // check if no user was found
      if (userIndex === -1) {
        throw new Error('User not found');
      }
    },

// MORE CODE
```

* Now we'll add the code that will only run if we found a user to delete
* To remove the user from the array we could easily use the `filter()` array method but we will use the `splice()` array method
    - We'll use splice since we already have the **index**

### splice()
* Google "mdn splice"
* [splice docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

#### splice() example
* You call it on the array and you pass it 2 arguments
    - The first argument is the index where you want to start removing items
    - The second argument is the number of items you want to remove
* All of the items removed come back in an `array` as the returned value

```
// add new element
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

// replace element
months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
```

`index.js`

```
// MORE CODE

    deleteUser(parent, args, ctx, info) {
      // checki for a user
      const userIndex = users.findIndex(user => (user.id === args.id));

      // check if no user was found
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = users.splice(userIndex, 1);
    },

// MORE CODE
```

* We use the `splice()` method on `users` and pass the first argument as `userIndex` and that will be the value we get back of the user we choose to delete (the index of the array of users)
* The second argument is the number of elements we want to remove and we only want to remove 1
* `slice()` will return an array with all the deleted elements
* We will store our array with the deleted elements (will just be 1 user) in a variable `deletedUsers` that we will return
    - Remember deletedUsers will hold 1 element but it will be inside an array
    - We are returning a user because in our `typeDefs` we do require to get a user back

### We need to remove other stuff too
* All associated posts and all associated comments 

```
// MORE CODE

    deleteUser(parent, args, ctx, info) {
      // checki for a user
      const userIndex = users.findIndex(user => user.id === args.id);

      // check if no user was found
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = users.splice(userIndex, 1);

      return deletedUsers[0];
    },

// MORE CODE
```

* Now let's see what happens if we only delete the user and not the associated data
* **Note** deletedUsers is an array with only 1 element so we use `deletedUsers[0]` to get our deleted user returned

GraphQL Playground

```
mutation {
  deleteUser(id: "1") {
    id
  }
}
```

GraphQL Playground Response

```
{
  "data": {
    "deleteUser": {
      "id": "1"
    }
  }
}
```

* Query for users and you will see the user was removed

```
query {
  users {
    id
    name
    posts {
      id
      title
    }
  }
}
```

* But if you query for posts you will get an error

```
query {
  posts {
    id
    title
    author {
      name
    }
  }
}
```

* The error will be

```
{
  "data": null,
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Post.author.",
      "locations": [
        {
          "line": 5,
          "column": 5
        }
      ],
      "path": [
        "posts",
        0,
        "author"
      ]
    }
  ]
}
```

* What that error is saying is that it tried to find the author for that post but it couldn't 
 
### And this is a BIG PROBLEM
* Because in the type definitions we said that author is a non-nullable field
* We could take the easy way out and make it a `nullible` field but we don't want to do that
* The better solution is to remove associated data

## Remove associated records with deleted users from comments and posts
* We will be re-assigned posts and comments so we'll switch from using `const` to `let`

```
// MORE CODE

let users = [
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

let posts = [
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

let comments = [
  {
    id: '1',
    text: 'Better than cats!',
    author: '1',
    post: '1',
  },
  {
    id: '2',
    text: 'Not better than cats',
    author: '1',
    post: '1',
  },
  {
    id: '3',
    text: 'Was this about cats?',
    author: '3',
    post: '3',
  },
  {
    id: '4',
    text: 'I am not a cat lover',
    author: '2',
    post: '3',
  },
];

// MORE CODE
```

* Now we'll use the filter method to filter out deleted user records in posts
* We will reassign posts (we can do that now because we used `let` instead of `const`)
    - We can't use the simple filter
    - It will be more complex
    - We also want to delete comments
    - Our code is getting a bit complex (we'll address this and make our code easier to scale later)
    - We want to return `true` when we DID NOT find a match (the opposite of match ----> !match)
        + We want to return true when we did not find a match - keeping that post
        + We want to return false when we did find a match - removing a post

```
// MORE CODE

deleteUser(parent, args, ctx, info) {
  // check for a user
  const userIndex = users.findIndex(user => user.id === args.id);

  // check if no user was found
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const deletedUsers = users.splice(userIndex, 1);

  posts = posts.filter(post => {
    const match = post.author === args.id;

    if (match) {
      comments = comments.filter(comment => {
        return comment.post !== post.id;
      });
    }
  });
  return deletedUsers[0];
},


// MORE CODE
```

1. Determine if post was a match (was this post created by the user that we just deleted)

```
const match = post.author === args.id
```

* If it does equal, match will be true
* But we want to return true when we DID NOT FIND A MATCH
* But return false when we did find a match (making sure the post is filtered out)
* Then we also have to check that if the post is a match and it is about to get deleted, and if it is then we have to delete all of its comments

```
// MORE CODE

if (match) {
  comments = comments.filter(comment => {
    return comment.post !== post.id;
  });
}

// MORE CODE
```

* When the comment.post is not equal to the post.id field
* If we are looking at a comment and that comment doesn't belong to the post that we are deleting, then it can stay
    - But if it does belong to that post it has to be deleted

* The short form of our logical expression

```
if (match) {
  comments = comments.filter(comment => comment.post !== post.id);
}
```

* Our last line will involve us removing all comments that this user created
    - whether it is on its own post, in which case it has already been cleaned up
    - Or it is on other posts by other users which aren't getting deleted

```
// MORE CODE

    deleteUser(parent, args, ctx, info) {
      // check for a user
      const userIndex = users.findIndex(user => user.id === args.id);

      // check if no user was found
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },

// MORE CODE
```

* Now everything is in place
* Yes this is very complex handling all the edge cases
* We will look at a better way to handle this relational data later so we can avoid all this manual cleaning up of data
* And that new way will vastly simplify our code and clean it up

## Test
* Delete a user and see if it gets cleaned up successfully
* Analyze your data
* Look what happens when you delete the first user. The new code should delete the user, all the users posts and comments

### Update your data
* Just to make it clear what we are deleting

`index.js`

```
let users = [
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

let posts = [
  {
    id: '10',
    title: 'soccer',
    body: '11 players',
    published: true,
    professionalLeague: 'MLS',
    author: '1',
  },
  {
    id: '11',
    title: 'basketball',
    body: '5 players',
    published: false,
    professionalLeague: 'NBA',
    author: '1',
  },
  {
    id: '12',
    title: 'tennis',
    body: '2 players',
    published: true,
    professionalLeague: 'MLT',
    author: '2',
  },
];
```

* We will delete the first user with an id of 1
* The user should get deleted
* But the posts he created should also get removed
    - This means the first 2 posts should be deleted also because their author value is `1`
* We should expect the comments for the posts they created and the comments they created on other posts to also be deleted
* Since the posts 10 and 11 were both created by author 1, they both will be deleted
    - We change up our last comment and make it a post not written by the author id 1 but a comment by author id 1
    - This comment will still be removed but for a different reason, because it is a comment by that user not because it is a comment on a post that the user wrote
    - This will allow us to test both situation in our code
        + The first 3 comments are getting deleted because they belong to posts that are getting deleted
        + The last comment should be deleted because it was created by a user getting deleted
        + This difference is important for testing the code that we wrote

## Back to testing
1. Delete user with id of 1 in GraphQL Playground
2. Verify it was deleted
3. Check list of users and one should be missing (the user with an id of 1)
4. If you query posts you will just get back a post id of '12' (this was not written by author id of 1)
5. If you run comments query you will get no comments written by author id '1'

```
query {
  comments {
    author {
      id
    }
    text
  }
}
```


