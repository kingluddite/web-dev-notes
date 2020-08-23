# Get & Delete Post Route
* We could make posts public but we want people to sign in to get the benefit of developer chatter so we'll make it private
* Add `auth` middleware to this route
* Use the preset to add a valid token

`routes/api/v1/posts.js`

```
// MORE CODE
// @route.    GET api/v1/posts
// @desc.     Get all posts
// @access.   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

## But we want to sort our posts by date in descending order
```
// MORE CODE

// @route.    GET api/v1/posts
// @desc.     Get all posts
// @access.   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ data: -1 }); // modify this line
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// MORE CODE
```

* Save this request route as `Get all posts` in the Postman's Posts collection folder

## Get a single post
`routes/api/v1/posts.js`

```
// MORE CODE

// @route.    GET api/v1/posts/:post_id
// @desc.     Get a single post
// @access.   Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    // I destructure and rename
    const { post_id: postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'No post found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

### Test in Postman
* Here's the request route - 

`http://localhost:5000/api/posts/5ef800f757296e7a95e3326d`

* You will get one post
* Change the URL id to the other post and you'll see the other single post
* Save the route in Postman as `Get post by id` in the Posts folder
* This path is private so add `x-auth-token` in the `Headers` and tie it to a fresh token

## We also want to check if the `id` is valid that is sent in URL
* We used this before with `kind`

```
// MORE CODE

// @route.    GET api/v1/posts/:id
// @desc.     Get post by ID
// @access.   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'No post found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    // if err.kind equals 'ObjectId' then it is not a valid object id'
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No post found' });
    }
    res.status(500).send('Server Error');
  }
});

// MORE CODE
```

* Now if you enter a valid but wrong post ID you get `No post found`
* And if you enter an invalid post ID you also get `No post found`

## Delete a post
* We will have a post `id` on the URL for the request route
* We first find the post by `ID`
* We need to make sure the user who own the post deletes it (_only post owner can delete that post_)
    - You want to make sure it is not possible for a non post owner to delete a post on the frontend or backend so you need to do this check
    - Check if the `post.user` !== `req.user.id` then they can't delete the post
        + Problem
            * `post.user` is an **objectId** and `req.user.id` is a String
            * To make this work we need to convert the `post.user` into a string with `post.user.toString()`
            * If a non-owner user tries to delete a post we will send back to the client a 401 error (not authorized)
* If we know the owner of the post is deleting it, we then can remove the post (delete it) with `post.remove()` (don't forget to `await` it)
* We send back a message letting the user know the user was removed

```
// MORE CODE

// @route.    DELETE api/posts/:id
// @desc.     Delete post by ID
// @access.   Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    // get the post id off of the URL
    const { post_id: postId } = req.params;
    // get the user id from the user object authentication gives us
    const { id: userId } = req.user;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'No post found' });
    }

    // Check user is owner of post
    // post.user is an ObjectId type
    // req.user.id is a string
    if (post.user.toString() !== userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // we know it's the owner
    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'No post found' });
    }

    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

## Test in Postman
* Enter a valid but wrong post id --> `Error No post found`
* Enter an invalid post id --> `Error No post found`
* Enter a valid post `id` but with a token from a user that does not own the post and you will get this error

```
{
    "msg": "User not authorized"
}
```

* Enter valid post `id` --> `200 success`

```
{
    "msg": "Post removed"
}
```

* Check all posts and you'll see the post that was owned by the logged in user was successfully removed

## Next
* Adding and removing likes
