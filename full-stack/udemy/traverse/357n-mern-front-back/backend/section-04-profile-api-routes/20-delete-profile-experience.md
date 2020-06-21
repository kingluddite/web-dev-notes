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
* This could "technically" be a PUT request because we are updating the profile but we are deleting an experience by 'id' so I would rather use a DELETE request

`routes/api/profile.js`

```
// MORE CODE

// @route.    DELETE api/profile/experience/exp_id:
// @desc.     Delete an experience
// @access.   PRIVATE
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    // find the experience item and remove it
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
```



