# Get all profiles route and get profile by id route
## We have a deprecate warning
* [Mongoose Deprecate warning docs](https://mongoosejs.com/docs/deprecations.html)
* We are getting this warning:

```
(node:96129) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
```

### To fix uncomment this:

`config/db.js`

```
// MORE CODE

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      // useFindAndModify: false, // uncomment this
      useUnifiedTopology: true,
    });


// MORE CODE
```

* After uncommenting the deprecated warning is gone!

## Create a route to get all profiles

`routes/api/profile.js`

```
// MORE CODE

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

## House Keeping!
* In Postman make sure to save the Create and Update Profile inside the Profiles collection
* And save the `Get logged in User's profile` in the Profile collect as well

## Test in Postman
* `GET http://localhost:5000/api/profile` and hit `Send` and you will get all profiles
* Save in Profile Collection folder in Postman as `Get all user Profiles`
    - * Notice in the response you have the user with the name and avatar (because you used Mongoose's `populate`)

* Postman response

```
[
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
        "user": {
            "_id": "5ee3bd301fc5f87412ecbea7",
            "name": "John Doe",
            "avatar": "//www.gravatar.com/avatar/39bc26d9d735a3e215473f085cd22345?size=200&default=mm&rating=pg"
        },
        "company": "Acme",
        "website": "http://example.com",
        "location": "Sellersville, PA",
        "status": "Developer",
        "github_username": "kingluddite",
        "experience": [],
        "education": [],
        "date": "2020-06-12T19:10:44.162Z",
        "__v": 0,
        "bio": "I am a senior developer and Instructor"
    }
]
```

## Let's create a profile for `John Doe`
* Log in route in Postman
* Use john doe's email and password
* Get token (via log in route)
* Go to update create profile route in Postman and paste in John's token (into x-auth-token value of Header)

* Now we will change body of profile to this:

```
{
    "company": "Doe a Deer",
    "status": "Junior Developer",
    "website": "http://doeadeer.com",
    "skills": "HTML, CSS",
    "location": "Hermosa Beach, CA"
}
```

* They are all the **required** fields

## View all profiles route in Postman
* You should now see 2 user profiles

## Get profile by user id
* **note** Get the profile by the user id (not the profile id)
* Grab all profiles and get a user id of a user profile
* You want to use `err.kind` to make sure if checking for a user id that you return a profile not found and not server error
* Save `Find profile by user id` in Postman

`routes/api/profile.js`

```
// MORE CODE

// @route.    GET api/profile/user/:user_id
// @desc.     Get Profile by user id
// @access.   PUBLIC
router.get('/user/:user_id', async (req, res) => {
 try {
   const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar']);

   if (!profile) {
     return res.status(400).json({ msg: 'Profile not found'});
   }
    res.json(profile);
 } catch (err) {
   console.error(err.message);
   if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
   }
   res.status(500).send('Server Error');
 }
})

module.exports = router;
```


