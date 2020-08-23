# Add & Delete Profile Education
* This is the same as adding experience
* We can copy and paste the PUT and DELETE of experience and paste them below in `routes/api/profile.js` and use a find/replace to change all experience to `education` and `:exp_id` to `:edu_id`

`routes/api/v1/profiles.js`

```
// MORE CODE
// @route.    PUT api/profiles/educations
// @desc.     Add profile education
// @access.   PRIVATE
router.put('/educations', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('field_of_study', 'Field of Study is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  const {
    school,
    degree,
    field_of_study // eslint-disable-line camelcase
  } = req.body;

  // Create an object with the data the user submits
  const newEdu = {
    school,
    degree,
    field_of_study
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id});

    if (!profile) {
      console.log('profile not found');
      return res.status(400).json({ msg: 'Profile not found'});
    }
    // we use unshift to add the new education at the end of the array (rather than beginning with push() array method)
    profile.education.unshift(newEdu);
    // console.log(profile.education);
    // We found the profile
    // We added our new education to the profile
    // Now we need to save it to our DB using Mongoose `save()`
    await profile.save();

    // We return the profile in the response that we'll use in the frontend (React) later on
    res.json(profile);
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Error');
  }
});

// @route.    DELETE api/v1/profiles/educations/edu_id:
// @desc.     Delete an education
// @access.   PRIVATE
router.delete('/educations/:edu_id', auth, async (req, res) => {
  // use try catch to see if our code will work
  // if not we'll throw an error
  try {

    // Grab the user profile
    // MAKE SURE TO USE await!
    // You'll need to get the user id from the request object
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    // we use map to create a new array
    // we look at each education in array and
    //  grab it's id (this is the unique `_id` mongo was kind enough to create for us when we
    //  created an education
    //  when we find the id in the URL (the last part will be the education id and we can access that with :education in our route))
    // if the item id matches the exp_id we will get the index of where that happened in the array
    // we store that index number inside removeIndex variable

    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    // Make sure we find a match before we delete
    if (removeIndex !== -1) {
      // find the education item and remove it
      profile.education.splice(removeIndex, 1);
    } else {
      console.error('Education not found');
      return res.status(500).send('education not found');
    }

    // don't forget to tell Mongoose to save this
    // in your Database
    await profile.save();

    // return the profile to the client
    // we can use this with react if we want
    // to give the end user some feedback
    // make sure to check and see that the education
    // you deleted is gone from the education array
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

### Test in Postman
`PUT` with `http://localhost:5000/api/v1/profiles/educations`

* Add Headers `Content-Type` and `x-auth-token` with Postman Presets
* Try to submit with no body data and you'll see the server side validation kicking in

```
{
    "errors": [
        {
            "msg": "School is required",
            "param": "school",
            "location": "body"
        },
        {
            "msg": "Degree is required",
            "param": "degree",
            "location": "body"
        },
        {
            "msg": "Field of Study is required",
            "param": "field_of_study",
            "location": "body"
        }
    ]
}
```

#### And if you add this body data:
```
{
    "school": "UCLA",
    "degree": "BS",
    "field_of_study": "Business"
}
```

* Will show you this in the profile response

```
// MORE CODE
"experience": [
        {
            "current": true,
            "_id": "5ef0f5d9838a50accc92f4ae",
            "title": "VP",
            "company": "USA",
            "location": "Washington DC",
            "from": "2015-08-10T04:00:00.000Z",
            "description": "Build fun stuff"
        }
    ],
    "education": [
        {
            "_id": "5ef2d508eb3e462f0e8df856",
            "school": "UCLA",
            "degree": "BS",
            "field_of_study": "Business"
        }
    ],
    "date": "2020-06-22T17:55:29.012Z",
    "__v": 15
}
```

* Save the PUT request with `Add Education` in Postman Profile Collection:

### And add this request route to see if we can delete an education
* Add another education

```
{
    "school": "USC",
    "degree": "Associate",
    "field_of_study": "Poetry"
}
```

* And this will be the response

```
// MORE CODE

"education": [
        {
            "_id": "5ef2d709eb3e462f0e8df857",
            "school": "USC",
            "degree": "Associate",
            "field_of_study": "Poetry"
        },
        {
            "_id": "5ef2d508eb3e462f0e8df856",
            "school": "UCLA",
            "degree": "BS",
            "field_of_study": "Business"
        }
    ],
// MORE CODE
```

* And we now will delete UCLA so we'll grab the `_id` and add it to the URL of the DELETE request route

DELETE `http://localhost:5000/api/v1/profiles/educations/5ef2d508eb3e462f0e8df856`

* Don't forget to add the `x-auth-token`
* Hit Submit button
* You will see one education is deleted and this is left:

```
// MORE CODE

"education": [
        {
            "_id": "5ef2d709eb3e462f0e8df857",
            "school": "USC",
            "degree": "Associate",
            "field_of_study": "Poetry"
        }
    ],
// MORE CODE
```

* **Try** to submit again and you'll get the error `education not found`
* Save the Request route as `Delete Education` in **Profiles** collections folder





