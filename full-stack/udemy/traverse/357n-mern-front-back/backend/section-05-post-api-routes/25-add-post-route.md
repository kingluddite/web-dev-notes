# Add Post Route

`routes/api/posts.js`

```
// 3rd party dependencies
const express = require('express');
const { check, validationResult } = require('express-validator');

// custom
// authentication
const auth = require('../../middleware/auth');

// Bring in our models
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// We are going to place our routes in their own 'routes' folder
const router = express.Router();

// @route    POST api/posts
// @desc     Create a post
// @access   Public
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Post content is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // error checking
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-hashed_password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
```

## Test it in Postman
* Try the new route `PUT http://localhost:5000/api/posts`
* Click `Send`
* You will get this error

```
{
    "msg": "No token, authorization denied"
}
```

* Why the error?
    - This is an auth route
    - We need a token in our Header `x-auth-token`
        + Add Presets
            * Content-Type
            * x-auth-token

## You may get another error "Token is not valid"
```
{
    "msg": "Token is not valid"
}
```

* This means the token expired and you need to login again and update the preset with your newly generated (fresh) token
* Then use that fresh token in this request route
* Then try post to posts with Send
* You get validation errors

```
{
    "errors": [
        {
            "msg": "Post content is required",
            "param": "text",
            "location": "body"
        }
    ]
}
```

* You hit the validate error from your Post model

`routes/api/posts.js`

```
// MORE CODE

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Post content is required')
        .not()
        .isEmpty(),
    ],
  ],

// MORE CODE
```

* So we need to add body content as JSON to this Postman request rout
* Grab some lorem ipsum from any site and paste into Postman request body

```
{
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ex eu nulla auctor imperdiet in at ante. Vestibulum nisl augue, imperdiet ac tempus pellentesque, sagittis ac leo. Nullam interdum, libero luctus convallis pharetra, ante lacus sagittis ante, ac sagittis tortor ex a ipsum. In hac habitasse platea dictumst. Suspendisse viverra felis ut erat congue bibendum. Duis posuere a justo sit amet tincidunt. Nunc sed blandit metus. Donec accumsan scelerisque vehicula. Vestibulum vel lobortis sapien. Curabitur rutrum nec nulla in tempus. Suspendisse dapibus massa magna, quis finibus massa ullamcorper eget. Nulla luctus eget odio sit amet rhoncus. Quisque et consequat turpis. Morbi ut dui vestibulum, ullamcorper sapien in, dictum diam. Morbi at ullamcorper ligula."
}
```

* Here is the output
    - We have a unique post `_id` from mongodb
    - We populate the post with:
        + Our logged in user name
        + Our logged in user avatar
        + Our user `id`
* This all comes from our token pointing to our current logged in user
    - And this populates that info:

```
{
    "_id": "5ef78513a605b57e311a3097",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ex eu nulla auctor imperdiet in at ante. Vestibulum nisl augue, imperdiet ac tempus pellentesque, sagittis ac leo. Nullam interdum, libero luctus convallis pharetra, ante lacus sagittis ante, ac sagittis tortor ex a ipsum. In hac habitasse platea dictumst. Suspendisse viverra felis ut erat congue bibendum. Duis posuere a justo sit amet tincidunt. Nunc sed blandit metus. Donec accumsan scelerisque vehicula. Vestibulum vel lobortis sapien. Curabitur rutrum nec nulla in tempus. Suspendisse dapibus massa magna, quis finibus massa ullamcorper eget. Nulla luctus eget odio sit amet rhoncus. Quisque et consequat turpis. Morbi ut dui vestibulum, ullamcorper sapien in, dictum diam. Morbi at ullamcorper ligula.",
    "name": "John Doe",
    "avatar": "//www.gravatar.com/avatar/39bc26d9d735a3e215473f085cd22100?size=200&default=mm&rating=pg",
    "user": "5ef0f06f78e08a86e3718e63",
    "likes": [],
    "comments": [],
    "data": "2020-06-27T17:42:43.079Z",
    "__v": 0
}
```

`routes/api/posts.js`

```
// MORE CODE

try {
      const user = await User.findById(req.user.id).select('-hashed_password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
// MORE CODE
```

## Save `Add Post` request route in Postman in the Posts collection

## Add a post as a different user
* Log in and get token for another user.
* Make sure the posts are in mongodb
    - You should see the user info is owned by new user `Jane Doe`
    - `avatar` and `user` id for logged in user

## Next - Get and delete posts
