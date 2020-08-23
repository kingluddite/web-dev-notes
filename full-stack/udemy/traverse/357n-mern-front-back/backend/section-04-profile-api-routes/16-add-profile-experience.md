# Add Profile Experience
`routes/api/v1/profiles.js`

## Up for debate
* We will add these resources as a `put` request
* You could make this a `post` request and it is up for debate
    - You could consider it adding a resource even though it is not it's own collection
    - It's an array within a document
    - You could make this a post request
    - But we are choosing to make this a `put` request because we are essentially updating "a part of a profile" and not creating something totally "new"

## Add our new route
* We use `auth` and `validation` so we store it inside an array

```
// MORE CODE

// @route.    PUT api/v1/profiles/experiences
// @desc.     Add profile experience
// @access.   PRIVATE
router.put(
  '/experiences',
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
    const { id } = req.user;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure our stuff off the request body
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
      const profile = await Profile.findOne({ user: id });

      if (!profile) {
        console.log('profile not found');
        return res.status(400).json({ msg: 'Profile not found' });
      }

      // if we got here we found the profile!

      // we use unshift() to add the new experience at the end of the array
      // rather than the beginning using push()
      profile.experience.unshift(newExp);

      // we added our new experience to the profile!
      // Now we need to save it to our Database using mongoose's save()
      await profile.save();

      // now we'll return the profile in the response
      // we'll use that in the frontend with react
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
`PUT http://localhost:5000/api/profiles/experiences`

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
    "current": true,
    "description": "Create projects and courses on web stuff"
}
```

* **note** No functionality to update these items will be built
    - TODO - build update functionality for experience
* Save in Postman
    - In collection as `Add experience`

## Next - Delete an Experience
