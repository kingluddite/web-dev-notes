# Post Like & Unlike Routes
* We have an array inside of our Post model for `likes`

## Goal
* When the user clicks the `like` button it should add them to the array
* **Note** This will be a `PUT` request because we are technically updating a post
* The endpoint will be PUT `api/posts/like/:id`
    - We will need to know the id of the post being like

### Steps to like a post
1. Find a post by `id`
2. Check if the post has already been liked

* We'll use a Higher order array function `filter()`
* We need to convert the user to a string

```
if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

}
```

* Here is the route

```
// MORE CODE

// @route.    PUT api/posts/likes/:post_id
// @desc.     Like a post
// @access.   Private
router.put('/likes/:post_id', auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { post_id: postId } = req.params;
    const post = await Post.findById(postId);

    // check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === userId).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: userId });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

## Like a post using Postman
1. Log in as a jane doe
2. And like john doe's post
* **note** Make sure to grab John Doe's post `id` and paste into URL

`http://localhost:5000/api/v1/posts/likes/5ef800f757296e7a95e3326d`

3. **Remember** Make sure to past Jane's token as `x-auth-token`
4. Send in Postman and you'll get 

```
[
    {
        "_id": "5ef829f50aa041547267ca34",
        "user": "5ef0f06f78e08a86e3718e63"
    }
]
```

* That is the likes (an array of objects (with like `id` and user **id**))

5. If you send again you should get an error `Post already liked`
6. View all posts and you'll see John's post has a like with a like `id` and user `id`

```
// MORE CODE

{
        "_id": "5ef78513a605b57e311a3097",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ex eu nulla auctor imperdiet in at ante. Vestibulum nisl augue, imperdiet ac tempus pellentesque, sagittis ac leo. Nullam interdum, libero luctus convallis pharetra, ante lacus sagittis ante, ac sagittis tortor ex a ipsum. In hac habitasse platea dictumst. Suspendisse viverra felis ut erat congue bibendum. Duis posuere a justo sit amet tincidunt. Nunc sed blandit metus. Donec accumsan scelerisque vehicula. Vestibulum vel lobortis sapien. Curabitur rutrum nec nulla in tempus. Suspendisse dapibus massa magna, quis finibus massa ullamcorper eget. Nulla luctus eget odio sit amet rhoncus. Quisque et consequat turpis. Morbi ut dui vestibulum, ullamcorper sapien in, dictum diam. Morbi at ullamcorper ligula.",
        "name": "John Doe",
        "avatar": "//www.gravatar.com/avatar/39bc26d9d735a3e215473f085cd22345?size=200&default=mm&rating=pg",
        "user": "5ef0f06f78e08a86e3718e63",
        "likes": [
            {
                "_id": "5ef82b0a0aa041547267ca35",
                "user": "5ef0f06f78e08a86e3718e63"
            }
        ],
        "comments": [],
        "data": "2020-06-27T17:42:43.079Z",
        "__v": 1
    }
]
// MORE CODE
```

## Unlike a post
1. Duplicate like post request and change `likes` to `unlikes` in route
2. We check if the length of the match from filter equals zero if it does the post has yet to be liked
3. We use map to loop through the likes to find the index of the match (like `id` matches the `id` in the URL)
4. We store that index in `removeIndex` so we can use it to remove the like using `splice()`

```
// MORE CODE

// @route.    PUT api/v1/posts/unlikes/:post_id
// @desc.     Unlike a post
// @access.   Private
router.put('/unlikes/:post_id', auth, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { post_id: postId } = req.params;
    const post = await Post.findById(postId);

    // check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === userId).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(userId);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

```

## Test in Postman
### First test unlike 
1. (duplicate like route and rename as `Unlike a Post`)
2. Make sure the request has `x-auth-token` (a "fresh" one) in the Headers of the request
3. Click send and you'll see an empty array (the like has been unliked)
4. Click again and you'll trigger the error `Post has not yet been liked`
5. Click like request and you'll see the post has been liked
6. Log in as another user and you'll see the array of likes now has 2 likes

```
[
    {
        "_id": "5ef8b70625385d6a140353c1",
        "user": "5ef800a657296e7a95e3326b"
    },
    {
        "_id": "5ef8b6e625385d6a140353c0",
        "user": "5ef0f06f78e08a86e3718e63"
    }
]
```

## Next - Add and remove comments
