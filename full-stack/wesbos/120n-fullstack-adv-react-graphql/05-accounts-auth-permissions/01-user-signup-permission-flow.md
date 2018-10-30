# User Signup and Permission Flow
## We'll start on the backend
## Update our user model
`backend/datamodel.prisma`

```
type User {
  id: ID! @unique
  name: String!
  email: String! @unique
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission]
}

// MORE CODE
```

* Permissions is an `enum`

## What is an enum used for?
* In GraphQL enum's come in handy when you want to have a preset list of options for a `type`
    - We are going to have several types
        + admin
        + user
        + many others
* This is great because we will not maintain a list of permissions elsewhere; we will do it directly in GraphQL

`datamodel.prisma`

```
enum Permission {
  ADMIN
  USER
  ITEMCREATE
  ITEMUPDATE
  ITEMDELETE
  PERMISSIONUPDATE
}

type User {

// MORE CODE
```

* PERMISSIONUPDATE
    - Will be kind of circular
    - Only if you are an ADMIN or if you have the PERMISSIONUPDATE permission will you be able to update that

```
permissions: [Permission]
```

* This says the permissions of the user will be `one` or `many` of all the options inside `enum` and they are the only possible options
    - This prevents someone from creating a `SUPERADMIN` or any variation and what we have here is there only selection to choose from

## We just updated our datamodel
* Any time you update the datamodel you need our Prisma db to know about this to regenerate the generated schema and pull it down into our app

### Deploy again
* We need to deploy again to get Prisma to regenerate our schema
* Navigate to the `backend` in the terminal

`$ npm run deploy`

#### We get an error
* Our User is giving us this error `You are creating a required field but there are already nodes present that would violate that constraint.`
    - This just means you need to go into your Prisma console and delete the two users we created earlier
        + Double click each user and click `Delete Node`

`$ npm run deploy`

* That will recreate the schema

![output of deploy](https://i.imgur.com/EjoChxk.png)

## Congrats
* We just successfully modified our data model

`schema.graphql`

```
// MORE CODE

  signup(email: String!, password: String!, name: String!): User!
}

type Query {

// MORE CODE
```

* We return a type of User
    - Even though `User` is not in this file it is in the generated file
        + And we import that generated file into this file so we have access to the User type

## Let's open our generated file to see our newly modified User
`prisma.graphql`

```
// MORE CODE

type User implements Node {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
}

// MORE CODE
```

## Time to code our resolver
* Anytime you add something to your schema that is a Mutation or a Query you need to go and code the corresponding resolver

### Why we will use cookies instead of localStorage
* We need to modify our Yoga server to allow us to work with cookies
    - Why are we using cookies?
    - When we create a user we are going to set a cookie with the currently logged in user
        + And every single time that someone requests a page the cookie is going to send along a JWT (json web token)
            * It is similar to working with sessions
            * This token will validate that the user is a user and see who's logged in
            * We will be using cookies (you could also use localStorage instead of cookies)
                - Every single time you have a request you can pull the localStorage `jwt` out of localStorage and send it along for the ride and that way your backend will be able to authenticate the user before they do anything like delete or modify data
                - Why are we using cookies and not localStorage?
                    + We want to be able to do server side rendering of the logged in parts and the downside to localStorage is that localStorage doesn't automatically send that token along
                    + So If we were on the second pagination page of our items and hit the refresh button that it wouldn't server render any of the logged in parts (maybe I have a cart that needs to be rendered on the server) and that will cause a 1 to 2 second glitch of rendering the logged out view because it has no concept of someone being logged in and then it will re-render on the server because it realized that you have a localStorage jwt
                    + But by putting the jwt in our cookie, it will send along the data for every single request and it will be able to server render the authenticated user which is what we need

## Middleware and index.js
* We are using Express as our server
* The E in MERN

### cookier-parser npm package
* Helper function for working with cookies
* Import it:

`index.js`

```
const cookieParser = require('cookie-parser'); // add this line
require('dotenv').config({ path: '.env' });

// MORE CODE
```

### Use middleware - A brief intro
* `server.express.use()`
    - A middle is a function that will run in the middle between your `req` and `res`
        * aka **request** and **response**

#### How a server works
1. The server gets a `req`
    * A `req` example: `teams.html`
2. The server sends out a `res`
    * A `res` example could be it will return an array of teams ['ManU', 'Chelsea', 'Liverpoo']

##### Inbetween req and res
* In between the `req` for `team.html` and the array of teams `res` you may need to do stuff (some kind of work)
    - Stuff like:
        + Authenticate the user
        + Transform the teams
        + Local translate the team names
        + Anything you want to do between the initial server `req` and the final server `res` to the user in the browser that is what **middleware** does

## How we will use middleware in this part of the app
1. We will accept the server `req`
2. Then we will parsing any cookies that came along with the server `req`
    * So that we can parse that `jwt`
    * And authenticate the user

`backend/src/index.js`

```
// MORE CODE

const server = createServer();

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// MORE CODE
```

* Make sure you add parentheses to `cookieParser()`
    - The `()` enable us to run the `cookieParser` function
    - `cookieParser()` will enable us to access all of the cookies in a nice formatted object
        + Rather than just a cookie string that it normally comes in as a header

## Write resolver for that Mutation
* Name of resolver MUST match up with name of our schema
* Make sure all emails are lowercase
* Store the password as a `one way hash`
    - turn a password of `123` to `hash(123)` and that turns into something like `asdfsdfweeiop33;jsdfjsdfjsdfpsd;fkj;fjioiopel;`
    - Then when you sign in you will put in `123`
    - We hash that again `hash(123)` and we will check if that is equal to what we intially stored
        + if had in db === hash what they typed in... they we let the user log in
        + A wrong password will give a total different hash and we won't log that user in
        + Why is it one way hash?
            * If any has hash they can not turn the hash back into the original password

## bcryptjs
* Node standard for hashing passwords

`Mutation.js`

```
const bcrypt = require('bcryptjs');

const Mutations = {

// MORE CODE
```

## Hash and SALT password
* You can pass a SALT or a length of a SALT (We'll use a length of a SALT as we don't have to type out a SALT and they will generate it for us)
    - What does a SALT do?
        + It makes your hash generation unique
            * Other hash algos out there like `md5('123')` will always output the same hash
            * If another password uses md5 and your password is `123` it will have the exact same hash
            * SALT makes your hashed password always unique

`Mutation.js`

```
// MORE CODE

  async signup(parent, args, ctx, info) {
    // make sure all emails are lowercase
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
  },
};

module.exports = Mutations;
```

## Create the user
`Mutation.js`

```
// MORE CODE

  async signup(parent, args, ctx, info) {
    // make sure all emails are lowercase
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
```

* Why are we using `createUser`?
    - Check our generated Prisma file
* Make sure you pass `info` as the 2nd argument so it knows what data to return to the client

`prisma.graphql`

```
// MORE CODE

type Mutation {
  createUser(data: UserCreateInput!): User!

// MORE CODE
```

* This is the API we will be using
* It takes in some data and returns a user

## Use spread operator to save typing
* And we need to overwrite the password passed (and in `args.password`) with the hashed password

`Mutation.js`

```
// MORE CODE

  async signup(parent, args, ctx, info) {
    // make sure all emails are lowercase
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password 
        },
      },
      info
    );
  },
};

module.exports = Mutations;
```

## We also need to set permissions

`Mutation.js`

```
// MORE CODE

async signup(parent, args, ctx, info) {
  // make sure all emails are lowercase
  args.email = args.email.toLowerCase();
  // hash their password
  const password = await bcrypt.hash(args.password, 10);
  // create the user in the db
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: ['USER']
      },
    },
    info
  );
},

// MORE CODE
```

* The above will not work because we are using an `enum` type (Permissions is not just a string field and it is reaching out to an external enum and that means we need to set it)

`Mutation.js`

```
// MORE CODE

  async signup(parent, args, ctx, info) {
    // make sure all emails are lowercase
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
  },
};

module.exports = Mutations;
```

* This means everyone that signs up we set them all as a `USER` permission and we can then alter than later depending on what permissions we want to give them

## jwt
* After we get to this point we have created a user but we now need to generated a JSON web token (jwt)
* Once you sign up you are now signed in
* When you register for a web site you just gave it your password so it knows the info it needs to log you in
    - Registering and then logging in is a bad UX
* To make sure we log them in as soon as they register we will create their `jwt` token after we create the user
* We need to install and import `jsonwebtoken` to work with `jwt`

`Mutation.js`

```
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {

// MORE CODE
```

## Create the jwt
* It will need a USER, we also need to pass the SECRET (it is in our `.env`)

`.env`

```
// MORE CODE

APP_SECRET="jwtsecret123"

// MORE CODE
```

* httpOnly
    - Makes sure we can not access this token via JavaScript
        + This would give you 3rd party JavaScript on your website
        + Or you could get a rogue Chrome extension
        + Anything that has access to the JavaScript on your page
        + You do not want your JavaScript to be able to access your cookies in this specific case
        + We set it equal to last for a year `1000 * 60 * 60 * 24 * 365 `

`Mutation.js`

```
// MORE CODE

  async signup(parent, args, ctx, info) {
    // make sure all emails are lowercase
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // We did it! Now return the user to the browser!
    return user;
  },
};

module.exports = Mutations;
```

## Test it out
* Make sure your backend server is running (Express)

`$ npm run dev`

* Open Playground

`http://localhost:4444/`

* Check Schema for new `signup` Mutation

* Write a hardcoded Mutation

```
mutation SIGNUP_USER_MUTATION {
  signup(email:"bob@bob.com", name: "bob", password:"123") {
    name
    email
    password
  }
}
```

* And the output would look similar to:

```
{
  "data": {
    "signup": {
      "name": "bob",
      "email": "bob@bob.com",
      "password": "$2a$10$ZyD8sdvi46gb6qmuZe.ffejpKgU5rkWGmylqgGWtZ68Mp3CuvswJ2",
      "permissions": [
        "USER"
      ]
    }
  }
}
```

* After running it run it again and you will get an error because the email already exists (we said it had to be `@unique`)
* View it on prisma console and you will see we now have a user with a hashed password in our db

![our first user in db](https://i.imgur.com/58ULhXh.png)

## Additional Resources
### Tip
* Adding this in your `package.json` is another way to add npm packages

`package.json`

```
// MORE CODE

"cookie-parser": "latest",

// MORE CODE
```

* [5 easy steps to understanding JSON Web Tokens (JWT)](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)
    - JWT (token) is composed of:
        + header
        + a payload
            * data stored inside jwt (aka "claims" of the JWT)
        + a signature
    - A jwt looks like `header.payload.signature` (It is just a simple string)
    - How does JWT protect our data?
        + It is important to understand that the purpose of using JWT is NOT to hide or obscure data in any way
        + The reason why JWT are used is to prove that the sent data was actually created by an authentic source
        + Since JWT are signed and encoded only, and since JWT are not encrypted, JWT do not guarantee any security for sensitive data
        + It should also be noted that JWT should be sent over HTTPS connections (not HTTP)
        + Having HTTPS helps prevents unauthorized users from stealing the sent JWT by making it so that the communication between the servers and the user cannot be intercepted
        + Also, having an expiration in your JWT payload, a short one in particular, is important so that if old JWT ever get compromised, they will be considered invalid and can no longer be used
* If you run `$ npm i` it will install the latest version of `cookie-parser`
* [cookie-parser and Express-session](https://www.youtube.com/watch?v=pyN9qEbXN0s)
* [What is a cookie](https://www.youtube.com/watch?v=I01XMRo2ESg)
    - Invented to store pieces of information about user
    - Think settings like choosing a language to view site in
        + You click the language
        + The website saves that setting to a cookie on your computer
        + The next time you visit the website it will read the cookie and remember your choice and give you a better user experience
        + cookies can contain any type of information
            * time you visit a website
            * items you add to your shopping cart
            * contain all the links you click on a website 
            * cookies are limited in size
            * but what is saved on a website is up to the creator of the website
            * limits to who can read your cookies
                - If you go to another website that other website won't be able to read your cookie and know you chose english as a language (only same website can access the cookie where it was created)
            * The use of cookies exploded on the Internet
                - The size limitation became a problem
                - They came up with a workaround
                    + They store the user as a unique `id` in the cookie
                    + Then they could store unlimited info about that user on their own computer (the cookie is just serving as a unique identifier for your computer by which a website could recognize you and look up your data in its own system)
                        * This led to 3rd party cookies
                        * Only the same website that saved data to a cookie can access it later but one website can contain bits of another website
                            + These bits and pieces of other websites embedded in the website you are visiting are able to access cookies they saved to your computer earlier
                                - You visit cnn.com
                                - These news sites contain ads
                                - Most of the time these ads are bits of other websites embedded into the news website
                                - Cnn may not save any cookies to your computer and know nothing about you
                                - But where do the ads come from?
                                - You could see ads from cnn could be same adds you see from another site you visited earlier. You may visit dozens of websites with ads that are all embedded from the same website
                                - This means because they track you on multiple websites they can tailor ads to you based on your surfing behavior 
* [cookies vs localStorage vs sessionStorage](https://www.youtube.com/watch?v=AwicscsvGLg)
    - They are all ways to store data in the browser for use later
    - cookies 
        + are stored on browser and server
        + sent with every request
        + best used with authentication that you regularly send back and forth
    - localStorage/Session storage
        + Do not get sent to server
        + Most use cases you will use both of these (as long as all users have HTML5)

![comparison chart](https://i.imgur.com/KAByFnC.png)


