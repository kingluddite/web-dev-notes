# ENV VARIABLES
* Now we'll start talking about deploying project on line

## Create new file in root
`.env.development`

```
KEY=VALUE
KEY2=VALUE2
KEY3=VALUE3
```

## Add to .gitignore
`.gitignore`

* This means all our `.env` files will be ignored

```
// MORE CODE

# dotenv environment variable files
.env*

// MORE CODE
```

## dotenv
* `dotenv` comes preinstalled with Gatsby
* It is a node file so we use `require`

`gatsby-config.js`

```
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {

// MORE CODE
```

* Then access access token in your file

`gatsby-config.js`

```
// MORE CODE
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `833fz2zdr4ma`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
```

## Test
* Stop and restart server
* `$ gatsby develop` to make sure dotenv works

## Push to Github
* Add and commit and push
* You should see that your .env.development is not on Github (.gitignore is working!)
