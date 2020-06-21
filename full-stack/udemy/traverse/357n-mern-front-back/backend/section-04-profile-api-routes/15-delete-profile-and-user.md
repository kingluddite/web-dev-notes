# Delete Profile and User
* Completely

`routes/api/profile.js`

```
// MORE CODE

// @route.    DELETE /api/profile
// @desc.     Delete profile, user and posts
// @access.   PRIVATE
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - Remove user's posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id});
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id});

    res.json({ msg: 'User deleted'})
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
```

## Test if the route works
1. Create a new user with new name and email
2. Copy the token to the clipboard
3. Create a new route request to DELETE `localhost:5000/api/profile` and you won't have the `id` in the URL for this reoute as you'll need to be authenticated to access this PRIVATE route so you add a `a-auth-token` Header and paste in the token as the value
4. Make sure you add the required fields in the body as `company, status and skills`
4. Then hit `Submit` and you'll delete both the user and the profile
5. You will see this response message with a 200 server status:

```
{
    "msg": "User deleted"
}
```

* Save this route in Profiles as `Delete user, profile and posts`

## Next - Add Experience into Profile

