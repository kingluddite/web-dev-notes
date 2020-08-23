# Delete Profile Experience
* Add another experience so you can delete one

## To delete we'll need the `id` in the request
`routes/api/v1/profiles.js`

```
// MORE CODE

// @route.    DELETE api/v1/profiles/experiences/exp_id:
// @desc.     Delete an experience
// @access.   PRIVATE
router.delete('/experiences/:exp_id', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const { exp_id } = req.params; // eslint-disable-line camelcase
    const profile = await Profile.findOne({ user: id });
    // create a new array using map()
    // grab each experience id
    // we find the id in the URL and if the item.id matches the exp_id we
    // get the index of where that happened in the array
    // and we store that index number inside our removeIndex variable
    const removeIndex = profile.experience.map(item => item.id).indexOf(exp_id);

    // make sure we find a match before we delete experience item
    // removeIndex would be -1 if we didn't find a match
    if (removeIndex !== -1) {
      // find experience and remove it
      profile.experience.splice(removeIndex, 1);
    } else {
      console.error('Experience not found');
      return res.status(500).send('Experience not found');
    }

    // save in Database
    await profile.save();

    // return the profile to the client to use in frontend with react
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

* **note** ake sure to check and see that the experience you deleted is gone from the experience array

## Test in Postman
1. Grab an experience `id` using postman request and copy and paste the id to the end of this delete route
2. Put a token value as a preset for `x-auth-token` so you can quickly reuse it
3. Click send and you'll see an experience is gone
4. Save in Postman collection `Delete profile experience`

## Next
* Same thing with Education (add and delete)
