# Delete Profile Experience
* Add another experience so you can delete one

## To delete we'll need the `id` in the request
`routes/api/profile.js`

```
// MORE CODE

// @route.    DELETE api/profile/experience/exp_id:
// @desc.     Delete an experience
// @access.   PRIVATE
router.delete('/experience/:exp_id', auth, async (req, res) => {
  // use try catch to see if our code will work
  // if not we'll throw an error
  try {
    // Grab the user pofile
    // MAKE SURE TO USE await!
    // You'll need to get the user id from the request object
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    // we use map to create a new array
    // we look at each experience in array and
    //  grab it's id (this is the unique `_id` mongo was kind enough to create for us when we
    //  created an experience
    //  when we find the id in the URL (the last part will be the experience id and we can access that with :experience in our route))
    // if the item id matches the exp_id we will get the index of where that happened in the array
    // we store that index number inside removeIndex variable

    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // Make sure we find a match before we delete
    if (removeIndex !== -1) {
      // find the experience item and remove it
      profile.experience.splice(removeIndex, 1);
    } else {
      console.error('Experience not found');
      return res.status(500).send('Experience not found');
    }

    // don't forget to tell Mongoose to save this
    // in your Database
    await profile.save();

    // return the profile to the client
    // we can use this with react if we want
    // to give the end user some feedback
    // make sure to check and see that the experience
    // you deleted is gone from the experience array
    res.json(profile);
  } catch (err) {
    // if we have an error show it
    console.error(err.message);
    // always return a status in the response
    // we use 500 to show server error
    res.status(500).send('Server Error');
  }
});

// MORE CODE
```

## Test in Postman
* Grab an experience id using postman request and copy and paste the id to the end of this delete route
* Put a token value as a preset for `x-auth-token` so you can quickly reuse it
* Click send and you'll see an experience is gone
* Save in Postman collection `Delete profile experience`

## Next
* Same thing with Education (add and delete)
