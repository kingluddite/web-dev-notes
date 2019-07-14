# Using Boilerplate
* We don't want to modify the boilerplate-graphql directly because we want to keep that around as an easy starting point
* Duplicate as `okta-apps`

`$ cp -R 911-graphql-boilerplate okta-apps`

## Work with our config
`config/dev.env`

* We can no longer use `default/default` as it is already taken

```
PRISMA_ENDPOINT=http://localhost:4466/okta/dev
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cYiQH
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

`config/test.env`

```
PRISMA_ENDPOINT=http://localhost:4466/okta/test
PRISMA_SECRET=9onYgi2qGslmPymd9myB0aaaH9EarBXW
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

## Deploy both of those to test and dev environments
### dev
`$ cd prisma && prisma deploy -e ../config/dev.env`
