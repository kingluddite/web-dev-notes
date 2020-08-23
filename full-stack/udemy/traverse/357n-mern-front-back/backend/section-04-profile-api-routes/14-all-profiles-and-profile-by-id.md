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

`routes/api/v1/profiles.js`

```
// MORE CODE

// @route    GET api/v1/profiles
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
* In Postman make sure to save the `Create and Update Profile` inside the Profiles collection
  - So you need to create a new `Profiles` collection folder
  - Make sure you save it inside your parent `Collection folder`

![collection folders structure](https://i.imgur.com/1pT17Xh.png)

* And save the `Get logged in User's profile` in the `Profiles` collection as well

## Test in Postman
* `GET http://localhost:5000/api/v1/profiles` and hit `Send` and you will get all profiles
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
1. Use Log in route in Postman
2. Use john doe's email and password
3. Get token (via log in route)
4. Go to update create profile route in Postman and paste in John's token (into x-auth-token value of Header)
5. Change `body` of **profile** to this:

```
{
    "company": "Doe a Deer",
    "status": "Junior Developer",
    "website": "http://doeadeer.com",
    "skills": "HTML, CSS",
    "location": "Hermosa Beach, CA"
}
```

* **note** They are all the **required** fields

## View all profiles route in Postman
* You should now see 2 user profiles

## Get profile by user id
* **note** Get the profile by the user `id` (not the profile id)
* Grab all profiles and get a user id of a user profile
* You want to use `err.kind` to make sure if checking for a user id that you return a profile not found and not server error
* Save `Find profile by user id` in Postman
* Don't want to send catch error of `Server Error` if someone doesn't have a valid user id in URL, we still want to provide No profile for this user found, that is why we add the `if` conditional with a check for `err.kind` (_this is a security improvement_)

`routes/api/v1/profiles.js`

```
// MORE CODE

// @route. GET api/v1/profiles/users/:user_id
// @desc. Get profile by user id
// @access. Public
router.get('/users/:user_id', async (req, res) => {
  const { user_id } = req.params; // eslint-disable-line camelcase

  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(500).send('Server Error');
  }
});

module.exports = router;
```

* Save in Profile `Get profile by user id` with this GET route request `localhost:5000/api/v1/profiles/users/5ee3dbe3fb1e137843569e0b`
  - **tip** Use the users route below to quickly find user id's
  - **note** You will obviously need to swap out the user `id` in the URL with the user profile you wish to see
  - Note if we make this request `localhost:5000/api/v1/profiles/users/1` we will get this error in our terminal:
    + `Cast to ObjectId failed for value "1" at path "user" for model "profile"`
    + We get that error if we don't use our err.kind check and the response would be a `Server Error`

## Get all users
* To see users quickly (**note**: we remove password on response)

`routes/api/v1/users.js`

```
// @route.    GET api/v1/users
// @desc.     Get all users
// @access.   PUBLIC
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-hashed_password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

```


## Next - Delete profile and user
* At the same time with one route (and when we add posts later on this delete should delete any posts from that user)
