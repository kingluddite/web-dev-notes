# Add Profile Experience
`routes/api/profile.js`

```
// MORE CODE

// @route.    PUT api/profile/experience
// @desc.     Add profile experience
// @access.   PRIVATE
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    // Create an object with the data the user submits
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        console.log('profile not found');
        return res.status(400).json({ msg: 'Profile not found' });
      }
      // we use unshift to add the new experience at the end of the array (rather than beginning with push() array method)
      profile.experience.unshift(newExp);
      // console.log(profile.experience);
      // We found the profile
      // We added our new experience to the profile
      // Now we need to save it to our DB using Mongoose `save()`
      await profile.save();

      // We return the profile in the response that we'll use in the frontend (React) later on
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// MORE CODE
```

## Test in Postman
`PUT http://localhost:5000/api/profile/experience`

### Headers
* We're sending data so we want our `Content-Type` as `application/json`
    - Use preset
* Add `x-auth-token` and add a fresh token as the value
* **note** Make sure they are checked to make the Headers active

### raw JSON (application/json)
```
{
    "title": "Instructor",
    "company": "AT&T",
    "location": "Philadelphia, PA",
    "from": "8-10-2010",
    "current": true
    "description": "Create projects and courses on web stuff"
}
```

* **note** No functionality to update these items will be built
    - TODO - build update functionality for experience
* Save in Postman
    - In collection as `Add experience`
## Next - Delete an Experience
