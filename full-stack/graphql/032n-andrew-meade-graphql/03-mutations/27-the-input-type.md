# The Input Type
* Our Mutations have lots of arguments and they are starting to go off the screen
* We can come up with a better way to structure these
    - With Query we didn't run into a problem with our structure because we only had at most one argument
    - We are not changing the applications functionality
    - This is just a new feature of GraphQL that allows us to create more complex applications without more complex code
    - Currently all of our arguments are of a scalar type
    - We can also set up operation argument who's values are objects but it will require us to learn one more new thing **the Input Type**

## The Input Type
* Let's say we don't want to pass in 3 arguments to createUser

```
// MORE CODE

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!

// MORE CODE
```

* We just want to pass in one object, and object called 'User' that has all of these (name: String!, email: String! and age: Int) as properties
    * We can't do this:

```
createUser(user: { name:String, email: String!, age: Int})
```

* Instead we'll create an input type like this:
    - Then we need to use an generic name that we use for these inputs
    - `CreateUserInput`
        + This is a common naming convention for inputs
            * `action.actual_object_we_are_working_on.input`
            * .input lets us know that we are working on the input type

```
// MORE CODE

  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(title: String!, body: String!, published: Boolean! author: ID!): Post! 
    createComment(text: String, author: ID!, post: ID!): Comment!
  }

  input CreateUserInput {
    name: String!,
    email: String!,
    age: Int
  }

// MORE CODE
```

* We replace all our arguments with a single input that will be CreateUserInput
* You can call it whatever you like but let's call it `data`
* **note** if you want to reference a type inside the Mutation you have to reference an input type only, it can not be a custom object types like User or Post or Comment, those can not be referenced in an arguments list
    - And the reason for this is your Input types can only have scalar values!
    - Input types can not have another custom Object type nested inside like User, Posts or Comments custom object types do

### Now we also have to update our Mutation resolvers
* Since we now are using the `data` to name our input types make this change

`index.js`

```
// MORE CODE

  Mutation: {
    createUser(parent, args, ctx, info) {
        // CHANGE to args.data.email
      const emailTaken = users.some(user => user.email === args.data.email);
      // if email exists, throw error back to client
      if (emailTaken) {
        throw new Error('Email taken!');
      }

      // if email is not taken
      // create new user
      const user = {
        id: uuidv4(),
        ...args.data, // CHANGE THIS
      };

// MORE CODE
```

* Not a lot of value yet gained from this change yet... but we will get more value as we start to update other mutations
* This is nothing special we are adding other than helping us organize our applications a little better

## Test first
* We will do the same thing for Post and Comments but we test first to make sure we didn't break anything
* Try to create a new user in Playground
* Refresh GraphQL Playground

```
mutation {
  createUser(name: "John2", email: "john@doe.com") {
    id
  }
}
```

* Run and you will get an error because we now are using `data` instead of our scalar values

```
mutation {
  createUser(data: {
    name: "Mike",
    email: "mike@mike.com",
    age: 22
  }) {
    id
  }
}
```

* Run GraphQL Playground and you will get:

```
{
  "data": {
    "createUser": {
      "id": "5008d1f6-d8f6-49ba-ba97-68e77f3eba6f"
    }
  }
}
```

* Query all users

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

* You will see your newly created user at end of list

## Challenge
1. Create an input type for `createPost` with the same fields. Use "data" or "post" as arg name

`index.js`

```
type Mutation {
  createUser(data: CreateUserInput!): User!
  createPost(data: CreatePostInput!): Post! 
  createComment(text: String, author: ID!, post: ID!): Comment!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}
```

* **Note**: The argument is always required when the Mutation is executed

2. Update `createPost` resolver to use this new object

```
// MORE CODE

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email);
      // if email exists, throw error back to client
      if (emailTaken) {
        throw new Error('Email taken!');
      }

      // if email is not taken
      // create new user
      const user = {
        id: uuidv4(),
        // name: args.name,
        // email: args.email,
        // age: args.age,
        ...args.data,
      };

      // save the user (add to array)
      users.push(user);

      // return the user
      // so the client can get values off of user
      return user;
    },

    createPost(parent, args, ctx, info) {
      // make sure author id matches up with one of our users

      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found!');
      }

      const post = {
        id: uuidv4(),
        ...args,
      };

      posts.push(post);

      return post;
    },

// MORE CODE
```

* **Note** There is a mistake in the above code and if you try to run it in GraphQL Playground you will get an error `Cannot return null for non-nullable field Post.title.`
* Analyze the code and see if you can find the mistake
* Here is the fix

```
createPost(parent, args, ctx, info) {
  // make sure author id matches up with one of our users

  const userExists = users.some(user => user.id === args.data.author);

  if (!userExists) {
    throw new Error('User not found!');
  }

  const post = {
    id: uuidv4(),
    ...args.data,
  };

  posts.push(post);

  return post;
},
```

* We forgot to update `...args` with the new `...args.data`

3. Verify application still works by creating a post and then fetching it

GraphQL Playground

* First run this to get a user id
```
mutation {
  createUser(data: {
    name: "Mike",
    email: "mike4@mike.com",
    age: 22
  }) {
    id
  }
}
```

* That will give you output like:

```
{
  "data": {
    "createUser": {
      "id": "8c514609-84aa-4e98-821f-480b02303b78"
    }
  }
}
```

* Take that `id` and paste it into your new `createPost`

```
mutation {
  createPost(
    data: {
      title: "First Post"
      body: "Great first Post"
      published: true
      author: "8c514609-84aa-4e98-821f-480b02303b78"
    }
  ) {
    id
    title
    body
    published
  }
}
```

* And that will give you the following output

```
{
  "data": {
    "createPost": {
      "id": "8428a7d3-8b91-4215-a255-dd93ed3f9241",
      "title": "First Post",
      "body": "Great first Post",
      "published": true
    }
  }
}
```

4. Create an input type for `createComment` with the same fields. Use "data" or "comment" as arg name.

```
// MORE CODE

  type Mutation {
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post! 
    createComment(data: CreateCommentInput!): Comment!
  }

// MORE CODE

  input CreateCommentInput {
    text: String
    author: ID!
    post: ID!
  }

// MORE CODE
```

5. Update `createComment` resolver to user this new object

```
// MORE CODE

    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const postExists = posts.some(post => {
        return post.id === args.data.post && post.published;
      });

      if (!postExists) {
        throw new Error('Post not found!');
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },

// MORE CODE
```

6. Verify application still works by creating a comment and then fetching it

* You will need to generate a new user to get the **author** `id`
* You will also need to generate a new post to get the **post** `id`
* Paste the author and post id into the createComment to generate a new comment
* Run the mutation

```
mutation {
  createComment(data: {
    text: "Loved this post!", 
    author: "e4225b5b-b970-4665-b3e9-8a952a35c9cc", 
    post: "87b693bd-2bbb-41dc-a8ba-7c4c80b762de"
  }
    
  ) {
    id
    text
  }
}
```

* Response

```
{
  "data": {
    "createComment": {
      "id": "0f0ea13f-95bc-4d62-8440-25e8a20287ee",
      "text": "Loved this post!"
    }
  }
}
```

## Next
* Focus on Mutations that delete data
  - delete
    + users
    + posts
    + comments
