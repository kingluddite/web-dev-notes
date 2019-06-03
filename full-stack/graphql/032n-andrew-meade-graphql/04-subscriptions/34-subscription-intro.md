# Subscription Intro
* Exploring the subscription operation
    - With Queries we can **fetch** data
    - With Mutations we can **change** data
    - With Subscriptions we can **subscribe** to data changes

## How they work
I use a query to fetch a post and get the `title` and the `body`

* What happens when those values change?
* I don't get those changed values
* I would have to manually query again for the changes

### But with a subscription!
* We can subscribe to data and get notified if there are any changes in real time
* How is this possible?
    - Subscriptions use **websockets** which allow for bi-directional real time communication between the server and the client

## How will subscriptions improve our app?
* We can add real time features to our app
    - So we can render real time posts for our app as they come in
    - We can show notifications if your favorite author publishes a new post

## Clean up code using destructuring for `args`
`Mutation.js`

```
import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const { data } = args;
    const emailTaken = db.users.some(user => user.email === data.email);

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
    db.users.push(user);

    // return the user
    // so the client can get values off of user
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const { id } = args;

    // check for a user
    const userIndex = db.users.findIndex(user => user.id === id);

    // check if no user was found
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== id);

    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;

    const user = db.users.find(user => {
      return user.id === id;
    });

    if (!user) {
      throw new Error('User Not Found');
    }

    if (typeof data.email === 'string') {
      // does email already exist?
      const emailTaken = db.users.some(use => user.email === data.email);

      // if email exists throw error
      if (emailTaken) {
        throw new Error('Sorry. That email is already taken');
      }

      // email not taken, update it
      user.email = data.email;

      if (typeof data.name === 'string') {
        user.name = data.name;
      }

      if (typeof data.age !== 'undefined') {
        user.age = data.age;
      }
    }

    return user;
  },
  createPost(parent, args, { db }, info) {
    const { data } = args;

    // make sure author id matches up with one of our users
    const userExists = db.users.some(user => user.id === data.author);

    if (!userExists) {
      throw new Error('User not found!');
    }

    const post = {
      id: uuidv4(),
      ...data,
    };

    db.posts.push(post);

    return post;
  },

  deletePost(parent, args, { db }, info) {
    const { id } = args;

    // check if post exists
    const postIndex = db.posts.findIndex(post => post.id === args.id);

    // if no post found throw error
    if (postIndex === -1) {
      throw new Error('No Post Found');
    }

    // capture the deleted post so you can return
    const deletedPosts = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== id);

    return deletedPosts[0];
  },

  updatePost(parent, args, { db }, info) {
    const { id, data } = args;

    const post = db.posts.find(post => {
      return post.id === id;
    });

    if (!post) {
      throw new Error('Post Not Found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    if (data.published === null) {
      throw new Error('Please let us know if this is published or not');
    }

    post.published = data.published;

    if (typeof data.professionalLeague === 'string') {
      post.professionalLeague = data.professionalLeague;
    }

    return post;
  },

  createComment(parent, args, { db }, info) {
    const { data } = args;
    const userExists = db.users.some(user => user.id === data.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const postExists = db.posts.some(post => {
      return post.id === data.post && post.published;
    });

    if (!postExists) {
      throw new Error('Post not found!');
    }

    const comment = {
      id: uuidv4(),
      ...data,
    };

    db.comments.push(comment);

    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const { id } = args;

    // check if the comment exists
    const commentIndex = db.comments.findIndex(comment => comment.id === id);

    // if no comment throw an error
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  },

  updateComment(parent, args, { db }, info) {
    const { id, data } = args;

    // search for comment
    const comment = db.comments.find(comment => {
      return comment.id === id;
    });

    // if no comment - throw error
    if (!comment) {
      throw new Error('Comment not found');
    }

    // make sure text is a string
    if (typeof data.text === 'string') {
      // update text
      comment.text = data.text;
    }

    // return required updated comment
    return comment;
  },
};

export { Mutation as default };
```

 
