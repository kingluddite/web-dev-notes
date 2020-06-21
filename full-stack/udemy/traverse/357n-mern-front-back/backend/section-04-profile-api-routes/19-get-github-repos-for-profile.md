# Get GitHub Repos for Profile
* We'll need to tap and access the GitHub API
* Education and Experience are in the profile collection but we will treat them as separate **resources**

## Up for debate
* We will add these resources as a `put` request
* You could make this a `post` request and it is up for debate
    - You could consider it adding a resource even though it is not it's own collection
    - It's an array within a document
    - You could make this a post request
    - But we are choosing to make this a `put` request because we are essentially updating "a part of a profile" and not creating something totally "new"

## Add our new route
* We use auth and validation so we store it inside an array

`routes/api/profile.js`

```
// MORE CODE

// @route.    PUT api/profile/experience
// @desc.     Add profile experience
// @access.   PRIVATE
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  // Create an object with the data the user submits
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id});

    if (!profile) {
      console.log('profile not found');
      return res.status(400).json({ msg: 'Profile not found'});
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
})
module.exports = router;
```

## Test this new experience route out
* First delete all profiles and users and re-create a user and a profile
* Copy the token
* Use the log in
* We are sending data so we need to:
    - Add Content-Type application/json (use preset)
    - Add `x-auth-token` and paste the token value in clipboard
    - Add this body to the Put Request:

```
{
    "title": "CEO",
    "company": "Bob Marley Smokes",
    "location": "Philadelphia, PA",
    "from": "8-10-2015",
    "current": true,
    "description": "Build fun stuff"
}
```

* Try the validation by first trying to send with no data in body then you'll see the required fields
* We'll use moment js to make the date formatted date nicer on the frontend with react
* Use this PUT route request `localhost:5000/api/profile/experience`

### And after a successful submit of this new PUT route
* Make sure to save this PUT route inside profiles as `Add experience`

```
{
    "social": {
        "youtube": "https://youtube.com/example",
        "facebook": "https://facebook.com/example",
        "twitter": "https://twitter.com/example"
    },
    "skills": [
        "HTML",
        "CSS",
        "JavaScript",
        "SQL",
        "SCSS"
    ],
    "_id": "5eea53812bdd526963de4159",
    "user": "5eea53612bdd526963de4158",
    "company": "Acme",
    "website": "http://example.com",
    "location": "Sellersville, PA",
    "bio": "I am a senior developer and Instructor",
    "status": "Developer",
    "github_username": "kingluddite",
    "experience": [
        {
            "current": true,
            "_id": "5eea553c1b19436a104ef1ad",
            "title": "CEO",
            "company": "Bob Marley Smokes",
            "location": "Philadelphia, PA",
            "from": "2015-08-10T04:00:00.000Z",
            "description": "Build fun stuff"
        },
        {
            "current": true,
            "_id": "5eea551c9b99d46a08da4db7",
            "title": "CEO",
            "company": "Bob Marley Smokes",
            "location": "Philadelphia, PA",
            "from": "2015-08-10T04:00:00.000Z",
            "description": "Build fun stuff"
        },
        {
            "current": true,
            "_id": "5eea550a2bdd526963de415b",
            "title": "CEO",
            "company": "Bob Marley Smokes",
            "location": "Philadelphia, PA",
            "from": "2015-08-10T04:00:00.000Z",
            "description": "Build fun stuff"
        },
        {
            "current": true,
            "_id": "5eea549f2bdd526963de415a",
            "title": "CEO",
            "company": "Bob Marley Smokes",
            "location": "Philadelphia, PA",
            "from": "2015-08-10T04:00:00.000Z",
            "description": "Build fun stuff"
        }
    ],
    "education": [],
    "date": "2020-06-17T17:31:45.946Z",
    "__v": 4
}
```

* Check out the experience array in profile and you will see that each experience has it's own 'id' which is great so that we can individually target that 'id'
    - So even though `experience` has it's own array, we can embed it's own 'id' for each new experience item which is very cool and useful
    - This is one of the great things about using this structure in a NoSQL db like MongoDB because we don't have to have a separate table for experience like we would in a relational Database like MySQL and we can just add id's inside of individual properties

## Next - Delete a Profile experience
