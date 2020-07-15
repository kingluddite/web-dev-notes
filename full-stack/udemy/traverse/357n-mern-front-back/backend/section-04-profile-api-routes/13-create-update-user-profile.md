# Create and Update user profile
* We will add auth and validation
    - We'll pass this middleware in the 2nd argument as an array
    - We make sure they are not empty so we use `.not().isEmpty()`

```
// MORE CODE

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required')
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
})

module.exports = router;
```

## Postman
* Add POST request route is `localhost:4000/api/profile`
* Headers:
    - Content-Type: `application/json`
    - x-auth-token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVlM2JkMzAxZmM1Zjg3NDEyZWNiZWE3In0sImlhdCI6MTU5MTk4MzQwOCwiZXhwIjoxNTkyMzQzNDA4fQ.9AvsF47v7zhJz01RSbfmAnOky28Ww6yTOUvbMnQF_SM`
        + Grab token from register or login routes

### Press send
* You'll get a 400 error that says `Status is required` in body
* Add this to body -> raw > JSON

```
{
    "status": "Developer",
    "skills": "HTML, CSS,JavaScript,SQL"
}
```

* We want to turn skills into an array and spaces or no spaces should not matter
* If you Send, the validation passes but nothing is happening because we didn't send a response in our server side route

## Make life easier - Save token as a preset in Postman
1. Copy token
2. Under `Presets` > `Manage Presets` click `Add`
3. Give Name of Header Preset as `Phil's token`
4. Add `x-auth-token` Key
5. For `Value` paste in your token
6. For `Description` add `Phil's token`
7. Click `Add`

### To use preset token
* Delete the manual `x-auth-token` and then click `Presets` and then click your new preset `Phil's token` and it will automatically put it in
* Do same for `Content-Type`
* This will save you time!

### Work on route response
* We'll need to pull all the fields out (destructuring will save us lots of time)
* We then grab our skills and turn it into an array of skills and deal with spaces using JavaScript
* We Use `console.log()` to test that it is working as we expect
    - `[ 'HTML', 'CSS', 'JavaScript', 'SQL' ]`

```
// MORE CODE

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bid,
      status,
      github_username, // eslint-disable-line camelcase
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bid) profileFields.bid = bid;
    if (status) profileFields.status = status;
    if (github_username) profileFields.github_username = github_username; // eslint-disable-line camelcase
    if (skills) {
      // Go through String of skills
      // turn them into an array with split()
      // Use map to take each array item and trim any spaces
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // if (youtube) profileFields.youtube = youtube;
    // if (facebook) profileFields.facebook = facebook;
    // if (twitter) profileFields.twitter = twitter;
    // if (instagram) profileFields.instagram = instagram;
    // if (linkedin) profileFields.linkedin = linkedin;

    console.log(profileFields.skills);

    res.send('Hello');
  }
);

module.exports = router;
```

## Then we deal with our social fields
* Our model has social.youtube so we need to create an empty object to hold them all with

`profileFields.social = {}`

* Then we can do all our checks

```
// MORE CODE

    if (skills) {
      // Go through String of skills
      // turn them into an array with split()
      // Use map to take each array item and trim any spaces
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;


// MORE CODE
```

## Time to update our Profile model

`routes/api/profile.js`

```
// MORE CODE

    if (linkedin) profileFields.social.linkedin = linkedin;

    // now we're ready to update
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  
);

module.exports = router;
```

## Create a Profile
* Above will update a profile if it is found but if it is not found we'll need to create the profile

```
// MORE CODE

    // now we're ready to update
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create Profile
      profile = new Profile(profileFields);

      await Profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
```

## Test in Postman
* We'll add profile info
    - Education and others will use separate routes to update them

```
{
    "company": "Acme",
    "status": "Developer",
    "website" "http://example.com",
    "skills": "HTML, CSS,JavaScript,SQL",
    "location": "Sellersville, PA",
    "bio": "I am a developer and Instructor",
    "github_username": "kingluddite",
    "twitter": "https://twitter.com/example",
    "facebook": "https://facebook.com/example",
    "youtube": "https://youtube.com/example"
}
```

## Test in Postman
* Hit `Send` in Postman
* You will get this response

```
{
    "skills": [
        "HTML",
        "CSS",
        "JavaScript",
        "SQL"
    ],
    "_id": "5ee3d33420c5157720ce6063",
    "user": "5ee3bd301fc5f87412ecbea7",
    "company": "Acme",
    "website": "http://example.com",
    "location": "Sellersville, PA",
    "status": "Developer",
    "github_username": "kingluddite",
    "social": {
        "youtube": "https://youtube.com/example",
        "facebook": "https://facebook.com/example",
        "twitter": "https://twitter.com/example"
    },
    "experience": [],
    "education": [],
    "date": "2020-06-12T19:10:44.162Z",
    "__v": 0
}
```

* Notice the `user` id and the profile `_id` - Every collection has a unique `_id` but our profile that was created has a user `id` associated with it that is the user that is logged in - so that user is associated with this profile
* **Note** Education and Experience is empty
* Our social object is properly set up

## Check to see if our same route is updating info
* Just change (in Postman) the bio description and add 'SCSS' as a skill

```
{
    "company": "Acme",
    "status": "Developer",
    "website": "http://example.com",
    "skills": "HTML, CSS,JavaScript,SQL, SCSS",
    "location": "Sellersville, PA",
    "bio": "I am a senior developer and Instructor",
    "github_username": "kingluddite",
    "twitter": "https://twitter.com/example",
    "facebook": "https://facebook.com/example",
    "youtube": "https://youtube.com/example"
}
```

* And that updates our response:

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
    "_id": "5ee3d33420c5157720ce6063",
    "user": "5ee3bd301fc5f87412ecbea7",
    "company": "Acme",
    "website": "http://example.com",
    "location": "Sellersville, PA",
    "status": "Developer",
    "github_username": "kingluddite",
    "experience": [],
    "education": [],
    "date": "2020-06-12T19:10:44.162Z",
    "__v": 0
}
```

* **note** I misspelled `bio` as `bid` so the data was not properly entered. I changed to `bio` in my code and it was added to the response and the Database

## Check MongoDB to see that we saved the data properly in our Database

![here is Atlas Mongo](https://i.imgur.com/qkiSxLF.png)

## Next
* Create route for all profiles
* Create one for John Doe
* Create a route to get profile by `id`
    - We will (on frontend) to have a list of profiles and they will be links when clicked on will take to the individual user profile
