# Delete Profile Experience
* TODO - Add notes for Updating Profile Experience
* Add non-current experience

```
{
    "title": "caddy",
    "company": "Caddyshack",
    "location": "Hermosa Beach, CA",
    "from": "8-10-2015",
    "to": "9-20-2016",
    "description": "Build fun stuff"
}
```

## Now we will delete one experience
* This could "technically" be a PUT request because we are updating the profile but we are deleting an experience by 'id' so I would rather use a `DELETE` request

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

    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

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
})

module.exports = router;
```

## Test it out Postman
`http://localhost:5000/api/profile/experience/5ef0f0cd78e08a86e3718e66`

* That is a DELETE request route in 
* We added an in to make sure we find an experience match before we delete otherwise we'll just delete all experiences regardless of their id
    - Delete an Experience inside the Profiles collections folder

### Save new HTTP request to Postman

## Next - Add and Delete an Experience
