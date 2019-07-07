# Setting up a Test Environment
* We will set up our automated test suite for our GraphQL application

## We will create a test environment
* We will have 3 environments

1. Development
2. Test
3. Production

## Why do we need a test environment And why will we also need a separate place in the Database for our test data?
* It is because our test suite (the automatic process that we set up) will interact with the Database a lot
    - We'll set up dummy test data so the code we run will get data back and we can assert that everything is working correctly
    - This will happen over and over again and we'll be manipulating the Database a ton
    - It is best to not interfere with our production or our development data

## Good news
* Deploying will be an easy process
* We'll make a new environment very similar to `confit/dev.env`

### test.env
* Create a new file `config/test.env`
* Copy the contents of `dev.env` and paste into `test.env`
    - Everything will be same except for the `endpoint`
    - **note** There are 2 things that an endpoint specifies (aside from the actual URL)
        1. Service
        2. Stage
    - By default both are `default`
        * That's why we saw `default$default` in our Database
            - That is the `default` service
            - And the `default`
        * We will override those values
            - Our current value is
                + `http://localhost:4466/default/default`
                    * is exact same as `http://localhost:4466`

## Our new config values
`config/dev.env`

```
PRISMA_ENDPOINT=http://localhost:4466/default/default
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cYiQH
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

`config/test.env`

```
PRISMA_ENDPOINT=http://localhost:4466/default/test
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cYiQH
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

* Now we have 2 separate places in our Database
    * One for development data
    * One for test data
+ This is a good thing!
+ That's the only change we need to make to our test environment
+ We are now ready to deploy our test environment to Prisma

## Deploy to test environment in Prisma
`$ cd prisma && prisma deploy -e ../config/test.env`

* Now you will see all of our tables are created again
* View inside pgAdmin schemas

![all new schemas](https://i.imgur.com/LIioHe0.png)

* We now have `default$test`
    - This is where we will have all of our test data
    - That data will be manipulated automatically via code

## Next - Create our test code
* We will configure the tool we will be using for our test suite 

