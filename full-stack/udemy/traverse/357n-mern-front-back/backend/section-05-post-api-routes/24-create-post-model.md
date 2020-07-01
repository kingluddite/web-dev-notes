# Creating the Post Model
* add mongoose
* create variable to "destructure" Schema (cleaner code - not required)

## We need to reference a user to a post
We want post connected to user
    - So we make a reference to user from within the Post model
    - By doing this we can make it (we will add this later) so that a user can only delete their own posts
    - We can also show which user created it, we can put their Avatar

`models/Post.js`

```
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});
```

* Note we "destructure like this"

```
// MORE CODE

const mongoose = require('mongoose');

const { Schema } = mongoose;

// MORE CODE
```

### More fields for our post
* `text` of post
* `name` of author of post
* We want to have the ability to delete a user but not delete their posts
    - That is why we are adding `name` and `avatar` of user just in case they delete their account but we can keep their info (a bit redundant but this will help make sure when people delete their accounts they don't delete their content)

```
// MORE CODE
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  }
});
```

## Adding ability to like
* And unlike `but not dislike` (similar to facebook)
* But how can we tie a like to a specific user?
    - We can do that by assigning a like to a a user like this:
* Notice we have an array of all users who like this post
    - It will just be an array of all the users who like the post

```
// MORE CODE

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],

// MORE CODE
```

## Add comments to the post
* We'll need to tie to the users like we did before
* We structure so that it will be an array of comments
* We need the `text` of the comments
* We need the author of the comment `user`
* We need the `avatar` of the comment
* We need the date of the comment (we'll default to the current time)

```
// MORE CODE

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

// MORE CODE
```

* We add a date for the post and default to current date
* We export so we can use this model in other files

```
// MORE CODE

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
```

* Here is our complete Post model

`models/Post.js`

```
const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);
```

## Next - Work on `Posts` routes
