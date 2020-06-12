# Creating the Profile Model
* We will reference the User id field in this model so whenever a profile is created it will be associated with the `id` of the logged in user

`models/Profile.js`

```
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('profile', ProfileSchema);
```

## Best naming convention for mongodb
* [docs](https://stackoverflow.com/questions/9868323/is-there-a-convention-to-name-collection-in-mongodb)
    - Use lowercase
    - You want to use short names for all fields
    - Collections should be named in plural
    - No word separators is recommended but I think word separators make the code more readable
* Update `hashedPassword` to `hashed_password`

`routes/api/auth.js`

```
// MORE CODE

const user = await User.findById(req.user.id).select('-hashed_password');

// MORE CODE

// Check if the password matches
      const isMatch = await bcrypt.compare(password, user.hashed_password);

// MORE CODE
```

`routes/api/users.js`

```
// MORE CODE

user = new User({
        name,
        email,
        avatar,
        hashed_password: password,
      });

// MORE CODE

user.hashed_password = await bcrypt.hash(password, salt);

// MORE CODE
```

`models/Profile.js`

```
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  github_username: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      field_of_study: {
        type: String,
        required: true,
      },
    },
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
```

# Next
* We'll bring this Profile model in to our profile routes to query the Database and get profiles and use CRUD on the profile
