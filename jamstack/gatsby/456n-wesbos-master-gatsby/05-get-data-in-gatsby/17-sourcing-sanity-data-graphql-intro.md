# Sourcing Sanity Data GraphQL intro
## Gatsby plugins
* Make working with other packages/libraries/services easy in Gatsby

## How do we specify the plugins we want?
* We do this inside our `gatsby-config.js`

### Two ways to use plugins in Gatsby
1. Just specify the name of the plugin (and accept all default options)
  * We are going to be using a `styled-component` plugin that services the CSS to gatsby (and this is why gatsby able to serve the critical css first)
* Make sure you have your sanity server running `localhost:3333`

`gatsby-config.js`

```
export default {
  siteMetadata: {
    title: `Pizza Slices`,
    siteURL: `http://example.com`,
    description: `Really good za`,
  },
  plugins: [`gatsby-plugin-eslint`, `gatsby-plugin-styled-components`, `@danbruegge/gatsby-plugin-stylelint`],
};
```

2. The other way to specify a plugin, if there are settings that need to be set on that plugin, you pass in an object, and you have a `resolve` property on that object that is the name of the plugin and that you are adding
  * We will add a plugin that will help us source our sanity data
  * **note** You name the plugins in this file but you also have to install them via npm
  * The Gatsby plugin documents are excellent and easy to search
  * You will also have an `options` property that you'll pass in an object
    - Inside that you'll need to use the `projectId`
    - Open sanity dashboard, find your project and copy the idea and paste it into the `options`
      + Log into Sanity, click on project, click icon to copy `PROJECT ID`

## Grab your project id
1. Visit `manage.sandity.io`
2. Click your project
3. Copy your project `id` to the clipboard

`gatsby-config.js`

### `watchmode` is cool
* What does `watchmode do`?
  - It rebuilds when you are in development and make a change to your sanity CMS
it will automatically be updated inside of your gatsby (you don't have to rebuild the entire thing (like you have to do in Contentful) this gives you a real time editing experience when you are in development mode (which is fantastic!)

## You also need your token for sanity
### How to get sanity token
1. Sanity.io login
2. Settings > API > Add New Token

#### Old Settings
* You just want a token to `Read`
* We will not be writing data to Sanity (that's what our Sanity Studio is for)
* We also won't be deploying to Sanity Studio
#### New Settings
* First option is Deploy Studio (token only) - no
* Editor -> read and write access to all datasets (no)
* **choose this** Viewer (read access to all datasets) YES
  - **name token** Give it a string defining name like `Gatsby Pizza Shop`
  - Click `Save`
    + You will see a long string (this is the token)
    + You only get this token once so save it in a temp secure spot
      * But don't put it directly in your code (you need to keep it safe)

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
        projectId: `111f93d3`, 
        dataset: `production`, // you can have multiple if you want
        watchMode: true, // very cool, rebuilds when you are in 
                         // development and make a change to your sanity CMS
                         // it will automatically be updated inside of your
                         //  gatsby (you don't have to rebuild the entire thing like in Contentful)
                         //  this gives you a real time editing experience when you are in development mode (which is fantastic!)
        token: `skAbcciTHuKqHs4GFqlZWlOJkFi1gWj7JDJPWZGFtfeqyZIPSX3EyAVZJzPX7AtC4JqhTTsqUuWG5mlOwpzq4xWtNwXeLjzzs6Ht0vhJNTT80mO8GSyyEzyAy84ntCDckyIlDC4QqryPkxD9eQRC1hJFMnXG0fHJuOjODxf9SMcTyX8Q9EpF` // go to settings > API > add a new token (we will just Read and not Write (no need to write data to our Sanity because that is what our Sanity studio is for)) - and we are also not Deploying to Sanity studio,
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
* **note** We DO NOT NEED to do this for `localhost:8000`
  - Why?
  - Because the browser will not be talking directly to sanity.io (it actually will be happening at build time on the node server
    + And because of that CORS does not apply)

### What is CORS?
* Cross Origin Resource Sharing (cross domain)
    - **Later** we will use this when we pull images live from sanity
    - Late we will be adding it and on the [live home page](https://gatsby.pizza/) you'll see that images are loading but are not immediately available on page load, and that is because they are live pulled from sanity (and not done at build time - so that will use CORS and we'll cover that later)
    - So for now no changes on CORS

## Protect our API keys/secrets
* **note** You don't want to put sensative information
  - Even in your `gatsby.config` and even though this file will not be "surfaced" via your website
  - But since this file does go in your version control, (aka it will be checked into Git)
  - **BEST PRACTICE** You don't put secrets (which are equivalents to passwords)
    + Anyone that has this secret can use it to get all of your data

## What is the solutions
* Put the sensative info inside a `.env` file
* Create a `.env` in the root of your project 

`.env`

```
SANITY_TOKEN=skAccTHuKqHs4GFqlZWlOJkFi1gWj7JDJPWZGFtfeqyZIPSX3EyAVZJzPX7AtC4JqhTTsqUuWG5mlOwpzq4xWtNwXeLjzzs6Ht0vhJNTT80mO8GSyyEzyAy84ntCDckyIlDC4QqryPkxD9eQRC1hJFMnXG0fHJuOjODxf9SMcTyX8Q9EpF
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

## Use dotenv
`gatsby-config.js`

* This is the default pointing to a `.env` in the root of your project
* You can leave the default setting off but it is a good practice to be explicit

```
import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); // good to add even though this is the default

export default {

// MORE CODE
```

* Point to a `.dotenv` in your environment
    - This is a cool config

`gatsby-config.js`

* My file is `.env.development`
* But in production it would be `.env.production`

```
import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// MORE CODE
```

## How can you know if your environment variable is working?
* Log it
* **caution** You want to remove that log because if you have a log in your production server this would be output to that log and others could see your secret

`gatsby-config.js`

```
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log(process.env.SANITY_TOKEN);

// MORE CODE
```

### CAUTION!
* Logging environment variables on a server can be very dangerous
    - That server can have a log and it will capture your secret which is obviously not a good thing to do
    
### Error
```
Error: GraphQL API not deployed - see https://github.com/sanity-io/gatsby-source-sanity#graphql-api for more info
```

* **note** On second time through this tutorial I did not get the above error
* You need to deploy your API to production

## Deploy your Sanity dataset to production?
* Stop the sanity server
* You have to type this in your `Sanity` folder
  - Move to your Sanity
  - Kill the server
  - [These are the Sanity GraphQL docs](https://www.sanity.io/docs/graphql)

`$ sanity graphql deploy NAME_OF_YOUR_DATASET_HERE`

`$ sanity graphql deploy production` (production is the name of our dataset)

* (Y) Agree to enable a GraphQL playground (Y/n)
* (Y) Do you want to enable a GraphQL playground? (Y/n)
* It will Generate GraphQL schema
* It will Validate GraphQL API
* It will deploy GraphQL API

* Will look something like:

![screenshot from terminal](https://i.imgur.com/6Tw9ca9.png)

## GraphQL Playground
* It will give you a URL to that Playground (This is where the GraphQL API is deployed to - click on the link they give you)
* The Green `SCHEME` button shows you our schema
* This GUI GraphQL is similar to GraphiQL

## Test out a query
```
query {
  allPizza {
    name
  }
}
```

* Output of our data on GraphQL Playground

```
{
  "data": {
    "allPizza": [
      {
        "name": "leaning tower of pizza"
      },
      {
        "name": "Veggie Delight"
      },
      {
        "name": "Veggie Delight"
      }
    ]
  }
}
```

* **note** Above is not our gatsby API
  - It is actually our sanity API
  - We won't yet work directly with this API
  - We just want to get the data out of the Sanity API and into the gatsby API

## How to we get the Sanity API into our Gatsby API
* By restarting our gatsby API, it should suck in all our Sanity API data and stick it into our gatsby GraphQL API
* Start the sanity server 

`$ npm start`

* You should see the logged environment variable
* **note** When you change the config you should need to restart gatsby

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

## Just to summarize
* I found Wes instructions a bit unclear and confusing so I wanted to summarize the steps as follows:

1. Make sure you run the sanity API GraphQL using

`$ sanity graphql deploy production`

* Answer the questions as mentioned above click on the URL to see the sanity GraphQL Playground

2. Start sanity (in sanity folder)

`$ npm start` (that will run the `localhost:3333`)

3. Start gatsby (in gatsby folder)

[You will see gatsby fetch remote GraphQL schmea](`$ sanity graphql deploy production`)

* You will see [sanity] Tranforming to Gatsby-compatible GraphQL SDL

![more sanity GraphQL info](https://i.imgur.com/YXRsvY0.png)

4. Then you refresh your GraphiQL Explorer

* You will see Sanity queryies (from the Sanity API)
  - The queries on GraphiQL will be slightly different than Sanity GraphQL
  - This is just a Gatsby query vs Sanity query difference

## Do you see new queries? (you should)
* We want to get all the pizzas by name and price
* Like allSanityPizza?
    - If not kill build and rebuild with `$ npm start`

## Grab all pizzas with their name and price
* Use `allSanityPizza`
    - Select the `nodes`
        + Check `name` and `price`

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
        + key (not useful we can remove)
        + _type (not useful we can remove)
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

## One perk of GraphQL - Query Multiple data sets (at same time!)
* You can query multiple data sets
* **very cool** This is possible because there is only one endpoint in GraphQL and you can grab anything you want

## Troubleshooting
* My first problem - I accidentilly pointed to the wrong project id (I had 2 and connected to my old one)
  - I could tell this because the data I was getting in my queries was not the data I had in my project
  - After fixing this (inside `gatsby-config.js` projectId) I got the Session error
  - This was because the token I set up was on other project
  - So I need to create a new read token in the correct project, delete the old token in `.env` and put in the new one
  - Start Gatsby up again `$ npm start` and now my data was correct

```
query MyQuery {
  allSanityPerson {
    nodes {
      name
    }
  }
  allSanityPizza {
    nodes {
      name
      price
    }
  }
}

```

## Data
```
{
  "data": {
    "allSanityPerson": {
      "nodes": [
        {
          "name": "Slick"
        },
        {
          "name": "joe"
        }
      ]
    },
    "allSanityPizza": {
      "nodes": [
        {
          "name": "leaning tower of pizza",
          "price": 1034
        },
        {
          "name": "Veggie Delight",
          "price": 3333
        }
      ]
    }
  },
  "extensions": {}
}
```

## Another cool feature - Nested data types
### Grabbing nested data types
* We have pizzas that have toppings
* **super cool** So in gatsby we can loop over all this data and display it

```
query MyQuery {
  allSanityPerson {
    nodes {
      name
    }
  }
  allSanityPizza {
    nodes {
      name
      price
      slug {
        current
      }
      toppings {
        name
      }
    }
  }
}
```

* And now we can see the toppings

```
{
  "data": {
    "allSanityPerson": {
      "nodes": [
        {
          "name": "Slick"
        },
        {
          "name": "joe"
        }
      ]
    },
    "allSanityPizza": {
      "nodes": [
        {
          "name": "leaning tower of pizza",
          "price": 1034,
          "slug": {
            "current": "leaning-tower-of-pizza"
          },
          "toppings": [
            {
              "name": "Bacon"
            },
            {
              "name": "Onions"
            },
            {
              "name": "Mushrooms"
            },
            {
              "name": "Peperroni"
            }
          ]
        },
        {
          "name": "Veggie Delight",
          "price": 3333,
          "slug": {
            "current": "veggie-delight"
          },
          "toppings": [
            {
              "name": "Mushrooms"
            },
            {
              "name": "Onions"
            }
          ]
        }
      ]
    }
  },
  "extensions": {}
}
```

* **IMPORTANT NOTE** in GraphQL - MUST USE DOUBLE QUOTES!

## Grab a single pizza
* We'll use the `id`
* Use allSanityPizza query to get id's and pick one to seach by it in
* **note** Had problem copying id - a bit glitchy

### Search all pizzas and grab one by id
```
query {
  sanityPizza(id: {eq: "-3776d14e-f9d1-5be6-93b3-f703ed5e0220"}) {
    name
  }
}
```

### Search for pizzas that have the regex of "Veg"
* `i` is case insensative search in RegEx

```
query MyQuery {
  sanityPizza(name: {regex: "/veg/i"}) {
      name
      toppings {
        name
        vegetarian
      }
    }
}
```

## And the data
```
{
  "data": {
    "sanityPizza": {
      "name": "Veggie Delight",
      "toppings": [
        {
          "name": "Mushrooms",
          "vegetarian": true
        },
        {
          "name": "Onions",
          "vegetarian": true
        }
      ]
    }
  },
  "extensions": {}
}
```

## Next
* Pull the data out of GraphQL and into our Gatsby react components
