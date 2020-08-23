# Add & Remove Comment Routes
* How we add a comment to a post will be similar to adding a post "The POST request to api/posts"
* Copy add a post route and paste at bottom
* The new post request will be `POST /api/v1/posts/comments/:post_id`
  - **Remember** comments is a property on the Post model
    + It has an array of objects inside it with:
      * user (referencing the user object)
      * text (required)
      * avatar
      * date (I accidentally spelled date as `date` for models - need to fix that in past notes)

```
// MORE CODE

      data: { // wrong!
        type: Date,
        default: Date.now,
      },
    },
  ],
  data: { // wrong!
    type: Date,
    default: Date.now,
  },
});


// MORE CODE
```

* Fixing with:

```
// MORE CODE

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

// MORE CODE
```

# New Post request for Adding comment
* Posted clipboard at bottom of `routes/api/v1/posts.js`

```
// MORE CODE

// @route    POST api/v1/posts/comments/:post_id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comments/:post_id',
  [
    auth,
    [
      check('text', 'Please add text')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const { post_id: postIdUrl } = req.params;
    const { id: userIdReq } = req.user;
    // error checking
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get the user
      const user = await User.findById(userIdReq).select('-hashed_password');
      // Get a post (that we are commenting on)
      const post = await Post.findById(postIdUrl);

      // note: comments are not a new collection in the Database
      // so we don't need to create a new comment (like we did with post)
      // instead we just create a newComment object
      // destructure
      const { text } = req.body;
      const { name, avatar } = user;
      const newComment = {
        text,
        name,
        avatar,
        user: userIdReq,
      };

      // We need to add this new comment onto the post comments array
      // We wan to place the comment not at the end but at the beginning of the array
      // So we unshift() (rather than push())
      post.comments.unshift(newComment);

      // No need to save the post in a variable
      // but we do need to save it to our Database
      await post.save();

      // Send back all the comments to the client (react)
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// MORE CODE
```

## Do our comments also have likes and unlikes?
* Comments are identical to Posts except they don't have `likes`
  - If you want to implement likes into them, it will be the identical steps to liking posts

## Test in Postman
1. Make sure to find all posts to capture a post `id` (like below)
2. Create a new request `PUT http://localhost:5000/api/v1/posts/comments/ID_OF_POST_HERE`

```
// MORE CODE

[
    {
        "_id": "5ef800f757296e7a95e3326d",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ex eu nulla auctor imperdiet in at ante. Vestibulum nisl augue, imperdiet ac tempus pellentesque, sagittis ac leo. Nullam interdum, libero luctus convallis pharetra, ante lacus sagittis ante, ac sagittis tortor ex a ipsum. In hac habitasse platea dictumst. Suspendisse viverra felis ut erat congue  Jane doe wrote this",
        "name": "Jane Doe",
        "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
        "user": "5ef800a657296e7a95e3326b",
        "likes": [
            {
                "_id": "5ef829f50aa041547267ca34",
                "user": "5ef0f06f78e08a86e3718e63"
            }
        ],
        "comments": [],
        "data": "2020-06-28T02:31:19.969Z",
        "__v": 1,
        "date": "2020-06-28T16:00:49.821Z"
    },
// MORE CODE
```

3. Add in `Headers`
  a. `x-auth-token` with token from log in request
  b. Add `Content-Type` with `application/json`
4. Add `body` comment
  a. Change body from none > raw > JSON

```
{
    "text": "My first comment"
}
```

* The response will be:

```
[
    {
        "_id": "5ef8bf8df1fd502fda48ddeb",
        "text": "My first comment",
        "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
        "user": "5ef800a657296e7a95e3326b",
        "date": "2020-06-28T16:04:29.280Z"
    }
]
```

* Add another comment

```
{
    "text": "Delete this comment"
}
```

* The response will now be:
  - **note** All the comments are returned to client

```
[
    {
        "_id": "5ef8bfbcf1fd502fda48ddec",
        "text": "Delete this comment",
        "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
        "user": "5ef800a657296e7a95e3326b",
        "date": "2020-06-28T16:05:16.354Z"
    },
    {
        "date": "2020-06-28T16:04:29.280Z",
        "_id": "5ef8bf8df1fd502fda48ddeb",
        "text": "My first comment",
        "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
        "user": "5ef800a657296e7a95e3326b"
    }
]
```

* Get all posts and you'll now see the comments are added and they each have their own unique id

```
[
    {
        "_id": "5ef800f757296e7a95e3326d",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ex eu nulla auctor imperdiet in at ante. Vestibulum nisl augue, imperdiet ac tempus pellentesque, sagittis ac leo. Nullam interdum, libero luctus convallis pharetra, ante lacus sagittis ante, ac sagittis tortor ex a ipsum. In hac habitasse platea dictumst. Suspendisse viverra felis ut erat congue  Jane doe wrote this",
        "name": "Jane Doe",
        "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
        "user": "5ef800a657296e7a95e3326b",
        "likes": [
            {
                "_id": "5ef829f50aa041547267ca34",
                "user": "5ef0f06f78e08a86e3718e63"
            }
        ],
        "comments": [
            {
                "date": "2020-06-28T16:05:16.354Z",
                "_id": "5ef8bfbcf1fd502fda48ddec",
                "text": "Delete this comment",
                "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
                "user": "5ef800a657296e7a95e3326b"
            },
            {
                "date": "2020-06-28T16:04:29.280Z",
                "_id": "5ef8bf8df1fd502fda48ddeb",
                "text": "My first comment",
                "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
                "user": "5ef800a657296e7a95e3326b"
            }
        ],
        "data": "2020-06-28T02:31:19.969Z",
        "__v": 3,
        "date": "2020-06-28T16:04:29.277Z"
    },
// MORE CODE
```

## Delete a comment

`routes/api/v1/posts.js`

```
// MORE CODE

// @route.    DELETE api/v1/posts/comments/:post_id/:comment_id
// @desc.     Delete a comment
// @access.   Private
router.delete('/comments/:post_id/:comment_id', auth, async (req, res) => {
  try {
    // Get the post
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      item => item.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user to see if they are the owner of comment or not
    // post.comments.user is an ObjectId
    // req.user.id is a String
    // To make this work we need to convert the ObjectId to a string with
    //   post.user.toString()
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(item => item.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);

    // res.json({ msg: 'comment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No post found' });
    }
    res.status(500).send('Server Error');
  }
});

// MORE CODE
```

## Test in Postman
1.Grab a post `id` and a comment `id` from that post
  * **note** Your post needs a comment to delete so make sure both `id`'s exist and if they don't create a comment to delete
2. Search all posts to get both `id's`
3. The route will resemble:

`DELETE http://localhost:5000/posts/comments/5ef800f757296e7a95e3326d/5ef8bfbcf1fd502fda48ddec`

**note** This is a Private route so add `x-auth-token` with the user logged in that made the comment
      * If you try to delete a comment you don't own you will get 'You are not authorized' error
      * If you delete a comment you'll get:

```
[
    {
        "date": "2020-06-28T16:04:29.280Z",
        "_id": "5ef8bf8df1fd502fda48ddeb",
        "text": "My first comment",
        "avatar": "//www.gravatar.com/avatar/1df66fbb427ff7e64ac46af29cc74b71?size=200&default=mm&rating=pg",
        "user": "5ef800a657296e7a95e3326b"
    }
]
```

* If you try to delete a comment that doesn't exist you'll get:

```
{
    "msg": "Comment does not exist"
}
```

## Todo - Update a comment
* Add this functionality on your own
* **tip** 

1. Find the post
2. Then map through the comments and return the new text for that comment
3. Then save the post

* **note** You won't be able to use `Post.findOneAndUpdate()` with a change to the Post model
* So you'll need the `post id` and you would need a `unique id for each comment` to be able to find and update it, which currently we don't have in the Post model

## Our Backend is complete
* We have 21 routes in our API
  - 3 in Users and Auth
  - 10 in Profiles
  - 8 in Posts

## Next - Frontend
* We need to add our route responses to our frontend

### Create React


