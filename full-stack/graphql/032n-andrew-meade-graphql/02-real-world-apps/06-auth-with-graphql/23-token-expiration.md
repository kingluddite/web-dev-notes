# Token Expiration
* How to expire a jwt
* We have the option to set up a jwt to be valid for a specific period of time
    - 1 hour
    - 2 days
    - month
    - ...
* jwt library has built in support for token expiration
    - We just need to slighly alter how we are calling `jwt.sign()`

## jwt syntax
* We were only using 2 arguments

```
jwt.sign({PAYLOAD}, SECRET);

// example
return {
  user,
  token: jwt.sign({ userId: user.id }, 'mysecret'),
};
```

* But there is a 3rd argument, an Object and inside we can specify how long the token will last

```
jwt.sign({PAYLOAD}, "SECRET", {TOKEN_EXPIRATION})
```

* [jwt docs](https://www.npmjs.com/package/jsonwebtoken)
* pretty much the only option you will use is `expiresIn`
    - expiresIn - lets us set up a time for the token to expire (in a human readable way)
    - This is the [library to express time](https://github.com/zeit/ms)

## Expire a token in 1 second
`Mutation.js`

```
// MORE CODE

  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error('Password length must be at least 8 characters');
    }

    const hashedSaltedPassword = await bcryptjs.hash(args.data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedSaltedPassword,
      },
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'mysecret', {
        expiresIn: '1 second',
      }),
    };
  },

// MORE CODE
```

* This will let us see what happens when we try to use an expired token

### Also set the expiration for 1 second in login
```
// MORE CODE

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const userPassword = args.data.password;
    const hashedPassword = user.password;

    const isMatch = await bcryptjs.compare(userPassword, hashedPassword);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'mysecret', {
        expiresIn: '1 second',
      }),
    };
  },

// MORE CODE
```

## Test
1. Login - your token will expire in 1 second
2. Use the token in an authenticated query (me)

```
query {
  me {
    id
    name
    email
  }
}
```

* Add your 1 second token and run
* Response

```
{
  "data": null,
  "errors": [
    {
      "message": "jwt expired",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "me"
      ]
    }
  ]
}
```

* So all we need to do is set the time when we are creating the token

## More realistic
* We'll use 7 days

```
// MORE CODE

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'mysecret', {
        expiresIn: '7 days',
      }),
    };

// MORE CODE
```

* Add it to both instances where you set the token expiration

## Challenge time
* Create a new utility function for generating authentication tokens
* We are using this in 2 places

```
jwt.sign({ userId: user.id }, 'mysecret', {
  expiresIn: '7 days',
}),
```

* Place the above in a utility function and call it twice in your code
* Make sure to export and import it

`src/utils/generateToken.js`

```
import jwt from 'jsonwebtoken';

const generateToken = userId =>
  jwt.sign({ userId }, 'mysecret', {
    expiresIn: '7 days',
  });

export { generateToken as default };

```

`Mutation.js`

```
import bcryptjs from 'bcryptjs';
import getUserId from '../utils/getUserId';
// we can remove the jwt import as we no longer use it inside this file
import generateToken from '../utils/generateToken'; // add this

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error('Password length must be at least 8 characters');
    }

    const hashedSaltedPassword = await bcryptjs.hash(args.data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedSaltedPassword,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },

  // MORE CODE

  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const userPassword = args.data.password;
    const hashedPassword = user.password;

    const isMatch = await bcryptjs.compare(userPassword, hashedPassword);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: generateToken(user.id),
    };
  },

  // MORE CODE

};

export { Mutation as default };
```

* Now we have a single source of truth when it comes to generating tokens
* We have one place to look and update if we need to make changes

## Test
* Login to get your token
* Paste in your token in me query and make sure it still works
