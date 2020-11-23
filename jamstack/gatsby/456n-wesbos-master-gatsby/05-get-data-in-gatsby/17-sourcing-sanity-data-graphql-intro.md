# Sourcing Sanity Data GraphQL intro
* Make sure you have your sanity server running `localhost:3333`

## Grab your project id
1. Visit `manage.sandity.io`
2. Click your project
3. Copy your project id to the clipboard

`gatsby-config.js`

```
export default {
  siteMetadata: {
    title: `Pizza Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza ever`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      // this is the name of the plugin
      resolve: `gatsby-source-sanity`,
      // grab values from manage.sanity.io
      options: {
        projectId: `odqf93d3`, 
        dataset: `production`, // you can have multiple if you want
        watchMode: true, // very cool, rebuilds when you are in 
                         // development and make a change to your sanity CMS
                         // it will automatically be updated inside of your
                         //  gatsby (you don't have to rebuild the entire thing like in Contentful)
                         //  this gives you a real time editing experience when you are in development mode (which is fantastic!)
        token: `skBabciTHuKqHs4GFqlZWlOJkFi1gWj7JDJPWZGFtfeqyZIPSX3EyAVZJzPX7AtC4JqhTTsqUuWG5mlOwpzq4xWtNwXeLjzzs6Ht0vhJNTT80mO8GSyyEzyAy84ntCDckyIlDC4QqryPkxD9eQRC1hJFMnXG0fHJuOjODxf9SMcTyX8Q9EpF` // go to settings > API > add a new token (we will just Read and not Write (no need to write data to our Sanity because that is what our Sanity studio is for)) - and we are also not Deploying to Sanity studio,
        give it some label describing it 'Gatsby Pizza'
        // save the token somewhere else for now and also paste it in your
        // gatsby-config.js (this token is shown only once, if you lose it you'll have to generate a new one)
      },
    },
  ],
};
```

### Add a CORS Origin
* You have to do this if you are accessing it straight from the browser
    - We DO NOT NEED to do this for `localhost:8000` because the browser will not be talking directly to sanity.io (it actually will be happening at build time on the node server - and because of that CORS does not apply)

### What is CORS?
* Cross Origin Resource Sharing (cross domain)
    - **Later** we will use this when we pull images live from sanity

## Protect our API keys/secrets
* Create a `.env` in the root of your project 

`.env`

```
SANITY_TOKEN=skBnabcTHuKqHs4GFqlZWlOJkFi1gWj7JDJPWZGFtfeqyZIPSX3EyAVZJzPX7AtC4JqhTTsqUuWG5mlOwpzq4xWtNwXeLjzzs6Ht0vhJNTT80mO8GSyyEzyAy84ntCDckyIlDC4QqryPkxD9eQRC1hJFMnXG0fHJuOjODxf9SMcTyX8Q9EpF
```

* In the `NAME=VALUE`
* **note** We don't surround the token with quotes

### Access our environment variable
`gatsby-config.js`

```
// MORE CODE
 plugins: [
    `gatsby-plugin-styled-components`,
    {
      // this is the name of the plugin
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `odqf93d6`,
        dataset: `production`,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
```

* Install dotenv

`$ npm i dotenv`

* **note** By default Sanity will surface tokens that start with `GATSBY_anything_you_type` to your front end
    - But SANITY WILL NOT surface any tokens that do not start with `GATSBY_`
    - This is because tokens that are sensitive and in the browser should not be in the browser (aka surfaced)

## Use dotevn
`gatsby-config.js`

```
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {

// MORE CODE
```

* This is the default pointing to a `.env` in the root of your project
* Point to a `.dotenv` in your environment
    - This is a cool config

#
`gatsby-config.js`

* My file is `.env.development` (but in production it would be `.env.production`)

```
import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// MORE CODE
```

## How can you know if your environment variable is working?
* Log it

`gatsby-config.js`

```
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log(process.env.SANITY_TOKEN);

// MORE CODE
```

### Error
```
Error: GraphQL API not deployed - see https://github.com/sanity-io/gatsby-source-sanity#graphql-api for more info
```

* You need to deploy your API to production

## Deploy your Sanity dataset to production?
* Stop the sanity server
* You have to type this in your `Sanity` folder

`$ sanity graphql deploy production`

* Agree to enable a GraphQL playground
* It will give you a URL to that Playground
* Start the sanity server `$ npm start`
* I added these instructions to get API error removed and santity and gatsby working

```
Yes. I had the same error and didn't deploy it because I thought Wes said not to (but I probably misunderstood him)
I stopped both sanity and gatsby
I ran $ sanity graphql deploy production
As it deployed it asked if I wanted a GraphQL playground and after it deployed it gave me a live URL to that GraphQL playground (it is not GraphiQL but a Prisma variation of this tool)
Inside sanity I ran $ npm start
I switch to gatsby and ran
$ npm start
It started up and I saw that my environment variable token was working as shown in the video (edited) 
```

* You should see the logged environment variable
* **note** When you change the config you should need to restart gatsby

## Do you see new queries?
* Like allSanityPizza?
    - If not kill build and rebuild with `$ npm start`

### CAUTION!
* Logging environment variables on a server can be very dangerous
    - That server can have a log and it will capture your secret which is obviously not a good thing to do

### Now you get the API not deployed error
* By default sanity has a GROC API
    - But if you want a GraphQL API (which is actually build with [GROQ](https://www.sanity.io/docs/how-queries-work))

## Use this link
* https://github.com/sanity-io/gatsby-source-sanity#graphql-api
* Click on the link `deploying a GraphQL API`

### GraphQL API
* By deploying a GraphQL API for your dataset, we are able to introspect and figure out which `schema` **types** and **fields** are available and make informed choices based on this information
* Previous versions did not require this, but often lead to very confusing and unpredictable behavior, which is why we have now made it a requirement
    - Takes you to this link: https://www.sanity.io/docs/graphql

`$ sanity graphql deploy`

* Say yes to having GraphQL playground
* But we want to get the data out of sanity API and into the Gatsby API
* After deploying GraphQL API and restarting sanity you will then see the sanity data inside the Gatsby GraphQL API (open GraphiQL to see for yourself)

## Note
* The queries are named slightly different in Gatsby then in Sanity

## Grab all pizzas with their name and price
* Use allSanityPizza
    - Select the nodes
        + Check name and price

#
```
query MyQuery {
  allSanityPizza {
    nodes {
      name
      price
    }
  }
}

```

* And the result in `data` object

```
{
  "data": {
    "allSanityPizza": {
      "nodes": [
        {
          "name": "Veggie",
          "price": 1000
        },
        {
          "name": "Meat",
          "price": 2000
        }
      ]
    }
  },
  "extensions": {}
}
```

* You can grab the slug
    - Has three things in sanity
        + key
        + _type
        + current

```
query MyQuery {
  allSanityPizza {
    nodes {
      name
      price
      slug {
        _key
        _type
        current
      }
    }
  }
}

```

### Results in data object
```
{
  "data": {
    "allSanityPizza": {
      "nodes": [
        {
          "name": "Veggie",
          "price": 1000,
          "slug": {
            "_key": null,
            "_type": "slug",
            "current": "veggie"
          }
        },
        {
          "name": "Meat",
          "price": 2000,
          "slug": {
            "_key": null,
            "_type": "slug",
            "current": "meat"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

* We don't need `_key` and `_type` so delete them

## One perk of GraphQL
* You can query multiple data sets
* This is possible because there is only 1 endpoint in GraphQL and you can grab anything you want

## Grabbing nested data types
* We have pizzas that have toppings

#
```
query MyQuery {
  allSanityPizza {
    nodes {
      name
      price
      slug {
        _key
        _type
        current
      }
      toppings {
        name
        vegetarian
      }
    }
  }
}

```

* And now we can see the toppings

```
{
  "data": {
    "allSanityPizza": {
      "nodes": [
        {
          "name": "Veggie",
          "price": 1000,
          "slug": {
            "_key": null,
            "_type": "slug",
            "current": "veggie"
          },
          "toppings": [
            {
              "name": "junk",
              "vegetarian": true
            }
          ]
        },
        {
          "name": "Meat",
          "price": 2000,
          "slug": {
            "_key": null,
            "_type": "slug",
            "current": "meat"
          },
          "toppings": [
            {
              "name": "Grizzy",
              "vegetarian": null
            },
            {
              "name": "junk",
              "vegetarian": true
            }
          ]
        }
      ]
    }
  },
  "extensions": {}
}
```

## Note in GraphQL - MUST USE DOUBLE QUOTES!
* Grab a single pizza
* We'll use the `id`

### Search all pizzas and grab one by id
```
query MyQuery {
  sanityPizza(id: {eq: "-1c553866-bc16-5161-b2cc-4354719a3df9"}) {
    name
    price
  }
}
```

### Search for pizzas that have the regex of "Veg"
* `i` is case insensative search in RegEx

```
query MyQuery {
  sanityPizza(name: {regex: "/veg/i"}) {
    name
    price
  }
}
```

## Next
* Pull the data out of GraphQL and into our Gatsby react components
