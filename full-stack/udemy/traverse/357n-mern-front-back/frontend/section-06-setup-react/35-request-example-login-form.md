# Request Example & Login Form
* In the future we will add a Redux action to make a request to the backend

## But First...
* We'll do it in our file first without implementing Redux just to test it out

## Import axios
* We are using `async/await` so we need to mark our onSubmit function as asynchronous
* In our else we'll create an object with our formData and we'll call it `newUser`
* We'll use a `try/catch`
* Since we are sending data we want to add a `config` object that has a `headers` object
* **note** `axios` returns a `Promise` so we need to `await` it and the route we are hitting is 

`routes/api/users.js`

* We are sending on this route `name`, `email` and `password`
* It will encrypt the password add the user to the Database and return a `token` to us

```
// MORE CODE

// @route    POST api/users
// @desc     Register User
// @access    Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If our errors array is not empty
    if (!errors.isEmpty()) {
      // return server error and errors
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        size: '200',
        default: 'mm',
        rating: 'pg',
      });

      user = new User({
        name,
        email,
        avatar,
        hashed_password: password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.hashed_password = await bcrypt.hash(password, salt);

      await user.save();

      // return jwt (jsonwebtoken)
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// MORE CODE
```

## proxy to the rescue
* Because we added a proxy inside our React `package.json` (client/package.json) we can point our axios path to just `/api/users'` instead of `http://localhost:5000/api/users`

`client/package.json`

```
// MORE CODE
    "mongoose": "^5.9.17"
  },
  "proxy": "http://localhost:5000"
}
```

`Register.js`

```
import React, { useState } from 'react';
import axios from 'axios'; // Remember to add axios

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name,
        email,
        password
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          };
        }

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        // log back the response (which is the token)
        console.log(res.data);
      } catch(err) {
        console.error(err.response.data);
      }
    }
  };

  return (

// MORE CODE
```

## Test it out
* Register a user via the UI
* Enter name, email, password and confirm password
* The client console should show you (if validation passes) a token has been returned
* **tip** Make sure your proxy is inside your `client` package.json and not the server (and make sure the port is correct and the spelling is correct)

![token response](https://i.imgur.com/uIWXxUa.png)

## Why do we need this token?
* We can use the token to access protected routes (auth)

## Make sure your user you just added is inside mongodb Database
![new user in Database](https://i.imgur.com/AbSZQxK.png)

* Password gets hashed in the backend
* We get the gravatar
* It is the exact same thing that we did for Postman when we were accessing that route but now we are using React and a UI form

### We are going to remove this code
* We want this action to happen inside a Redux action (we don't want this to happen within the components)
* This was just used to give an example of making a simple request

### We'll convert Register code to just log 'SUCCESS'
`Register.js`

* We can also remove the `axios` import

```
import React, { useState } from 'react';
// import axios from 'axios'; Delete this line

// MORE CODE

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
    } else {
      console.log('SUCCESS'); // Remove chunk of code and replace with this
    }
  };

// MORE CODE
```

## Login
* This will be very similar to Register so copy and paste into Login and update code
* **note** You need to convert links in both files to `<Link>`

`Login.js`

```
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login  = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('SUCCESS');
  };

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => onChange(e)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
```

* And update `Register.js`

```
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// MORE CODE

      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default Register;
```

## Next - Redux
* We will implement Redux because we need the "app level state" to hold our:
    - user data
    - profile
    - alerts and other similar items


