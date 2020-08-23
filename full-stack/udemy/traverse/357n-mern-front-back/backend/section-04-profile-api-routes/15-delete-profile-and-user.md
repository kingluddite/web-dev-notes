# Delete Profile and User
* Completely

`routes/api/v1/profiles.js`

```
// MORE CODE

// @route.    DELETE /api/v1/profiles
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
4. Use the Create and Update Profile to create a new profile for this user
5. Create a new route request to DELETE `localhost:5000/api/v1/profiles`
  * **note** You won't have the `id` in the URL for this route as you'll need to be authenticated to access this PRIVATE route
  * This means you need to add a `x-auth-token` Header and paste in the token as the value
6. Make sure you add the required fields in the body as `company, status and skills`
7. Then hit `Submit` and you'll delete both the user and the profile
8. You will see this response message with a 200 server status:

```
{
    "msg": "User deleted"
}
```

9. Save this route in Profiles as `Delete user, profile and posts`

## Next - Add Experience into Profile

