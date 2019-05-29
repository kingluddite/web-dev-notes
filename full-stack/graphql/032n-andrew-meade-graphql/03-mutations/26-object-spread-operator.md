# The Object Spread Operator with Node.js
* We need to set up our project to support the object spread operator
* This will need a module and we will need to alter our babel config to make this work
* This will make our life easy and make it easier to copy one object's properties to another

## npm package page
* [object spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)

`$ npm install --save-dev babel-plugin-transform-object-rest-spread`

## Tell babel about our change
* When we install a plugin we have to tell babel to use it
* We set up the plugins that babel should use by adding a new root property to our babelrc config "plugins" (it will be an array of strings)
* Leave off the babel-plugin prefix inside the babelrc config file

`.babelrc`

```
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-object-rest-spread"
  ]
}
```

* That's it, babel is now ready to use the spread operator syntax

## What the heck is a preset again?
* Nothing more than a collection of plugins all grouped together to provide some sort of cohesive behavior
* We want an individual plugin and that is why we have both `presets` and `plugins` listed

## Start our app up again
`$ npm run start`

## Time to use our new object spread operator syntax
* This is what we have now in our Mutations

`index.js`

```
 // MORE CODE

Mutation: {
  createUser(parent, args, ctx, info) {
    // const emailTaken = users.some((user) => {
    //   return user.email === args.email
    // })
    const emailTaken = users.some(user => user.email === args.email);
    // if email exists, throw error back to client
    if (emailTaken) {
      throw new Error('Email taken!');
    }

    // if email is not taken
    // create new user
    const user = {
      id: uuidv4(),
      name: args.name,
      email: args.email,
      age: args.age,
    };

    // save the user (add to array)
    users.push(user);

    // return the user
    // so the client can get values off of user
    return user;
  },

  createPost(parent, args, ctx, info) {
    // make sure author id matches up with one of our users

    const userExists = users.some(user => user.id === args.author);

    if (!userExists) {
      throw new Error('User not found!');
    }

    const post = {
      id: uuidv4(),
      title: args.title,
      body: args.body,
      published: args.published,
      author: args.author,
    };

    posts.push(post);

    return post;
  },

  createComment(parent, args, ctx, info) {
    const userExists = users.some(user => user.id === args.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const postExists = posts.some(post => {
      return post.id === args.post && post.published;
    });

    if (!postExists) {
      throw new Error('Post not found!');
    }

    const comment = {
      id: uuidv4(),
      text: args.text,
      author: args.author,
      post: args.post,
    };

    comments.push(comment);

    return comment;
  },
},

Post: {
  author(parent, args, ctx, info) {
    return users.find(user => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, ctx, info) {
    return comments.filter(comment => {
      return comment.post === parent.id;
    });
  },
},
User: {
  posts(parent, args, ctx, info) {
    return posts.filter(post => {
      return post.author === parent.id;
    });
  },
  comments(parent, args, ctx, info) {
    return comments.filter(comment => {
      return comment.author === parent.id;
    });
  },
},
Comment: {
  author(parent, args, ctx, info) {
    return users.find(user => {
      return user.id === parent.author;
    });
  },
  post(parent, args, ctx, info) {
    return posts.find(post => {
      return post.id === parent.post;
    });
  },
},

// MORE CODE
```

* Look at our args argument and how many times we use it inside our Mutations to copy properties like this:

```
// MORE CODE

const comment = {
  id: uuidv4(),
  text: args.text,
  author: args.author,
  post: args.post,
};

// MORE CODE
```

## Before we dive in, let's show how object spread operator works
```
const one = {
  name: "John",
  age: 22,
  height: 6
}

const two = {
  job: 'farmer',
  ...one
}
```

* I have 2 objects but I want to take all the properties in one object and copy them over to the other
* So this spread operator does this effectively:

```
const two = {
  job: 'farmer',
  name: 'John',
  age: 22,
  height: 6
}
```

* We could use args to do this but that takes up a lot of lines

## Now lets dive in and use it in our code
`index.js`

```
// MORE CODE

    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email);
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
        ...args
      };

      // save the user (add to array)
      users.push(user);

      // return the user
      // so the client can get values off of user
      return user;
    },

    createPost(parent, args, ctx, info) {
      // make sure author id matches up with one of our users

      const userExists = users.some(user => user.id === args.author);

      if (!userExists) {
        throw new Error('User not found!');
      }

      const post = {
        id: uuidv4(),
        ...args
      };

      posts.push(post);

      return post;
    },

    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const postExists = posts.some(post => {
        return post.id === args.post && post.published;
      });

      if (!postExists) {
        throw new Error('Post not found!');
      }

      const comment = {
        id: uuidv4(),
        ...args
      };

      comments.push(comment);

      return comment;
    },
  },

// MORE CODE
```

* Check your terminal. Any errors?
    - If no errors you set up the object spread operator correctly
    - If you didn't fix it by making sure you installed the module correctly and your `.babelrc` config file is set up correctly

## Test in Playground
* If all is working as expected you should be able to `createUser`, `createPost` and `createComment` mutations as we have before

`http://localhost:4000`

* If you can generate a user, post and comment (remember to create them and pass in the auth and post values generated when required) and then you'll know that your object spread operator is working

## Next
* Come up with a better way to structure our arguments
