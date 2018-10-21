# Items Creation and Prisma Yoga Flow - Query
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

`resolvers/Query.js`

```
const Query = {
  items(parent, args, ctx, info) {
    return ctx.db.query.item();
  },
};

module.exports = Query;
```

* Above returns a Promise
* It is fine to return a Promise from a resolver
* It is smart enough to know that if:
    - It gets data to send it immediately
    - If it gets a Promise to wait for that Promise to resolve

`resolvers/Query.js`

* But we will put it in a variable

```
const Query = {
  async items(parent, args, ctx, info) {
    const items = await ctx.db.query.item();
    return items;
  },
};

module.exports = Query;
```

## Write a Query
* We'll use our public Playground (_`localhost:4444`_)
* Refresh Playground to make sure you have latest data

```
query allItems {
    items()
}
```

* We give it a name so we can type a bunch of mutations and queries in same Playground tab
* Above doesn't have arguments so we don't need `()`

```
query allItems {
  items
}
```

* Make sure you are in `backend` folder
* Run app

`$ npm run dev`

```
query allItems {
  items {
    id
    title
  }
}
```

* It is not working when hit Playground Play

### Check for log errors
`resolvers/Query.js`

```
const Query = {
  async items(parent, args, ctx, info) {
    console.log('getting items');
    const items = await ctx.db.query.item();
    return items;
  },
};

module.exports = Query;
```

* Get this terminal error:

```
"message": "This anonymous operation must be the only defined operation."
```

* We need to give our anonomous function a name

```
mutation createGreatitem {
  createItem(
    title: "test"
    description: "testing desc"
    image: "test.jpg"
    largeImage: "testlarge.jpg"
    price: 1000
  ) {
    id
    title
  }
}

query allItems {
  items {
    id
    title
  }
}
```

* Run again
* Now we get this error

`Error: Field "item" argument "where" of type "ItemWhereUniqueInput!" is required but not provided`

* This is a mistake on my part

```
const items = await ctx.db.query.item();
```

* In the Prisma API if you use `item()` you need to provide a `where` to point to the specific item you are referring to
* But if you change it to `items()` the API will return an array of items

```
const Query = {
  async items(parent, args, ctx, info) {
    console.log('getting items');
    const items = await ctx.db.query.items();
    return items;
  },
};

module.exports = Query;
```

* Output - finally - it works

```
{
  "data": {
    "items": [
      {
        "id": "cjnebc0w79xv00b94c9k5pdwm",
        "title": "test"
      },
      {
        "id": "cjnebcrvz9xwk0b94b2rd04w0",
        "title": "test"
      },
      {
        "id": "cjnebcsxq9xwn0b94nkyfgza3",
        "title": "test"
      },
      {
        "id": "cjnf0w9h0crsu0b94zeauixr0",
        "title": "test"
      },
      {
        "id": "cjnf80udlrsxm0b94ki01zntr",
        "title": "test"
      }
    ]
  },
  "extensions": {}
}
```
### Better errors
* In Public Playground view console
* Switch to **Network** tab

`http://localhost:4444/`

## Query option
* To save typing
* If the Query is exactly the same (On your Prisma and on your Query) and this is common when using Yoga, then you can just forward that Query from Yoga to Prisma and it will handle it and you won't need to write all the code we wrote in our Query
    - You want to make a Query
    - But the Query is just pulling a list of items
        + There is not authentication
        + No filtering that needs to happen
        + No custom logic that needs to happen
        + 

### prisma-binding
* **remember** prisma-binding gives us the ability to query our database
    - `db.query.items()`

`resolvers/Query.js`

```
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  // async items(parent, args, ctx, info) {
  //   console.log('getting items');
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
```

* Above will allow us to use the exact same API on the server as well as on the client
* Helpful if you want to mock something up to quickly push and pull to and from your db
* You could do this for all your APIs and then come back and write them as you need to implement custom logic 

## Review
1. When you want to add a new type you add it to your datamodel.graphql
2. Then you run `$ prisma deploy` to push it up to the Prisma service
3. That in turn brings down a new copy of our prisma.graphql (which contains all of our queries and all of the possible filters you can use)
4. Then we go into our own schema.graphql (this is our public facing API) this is what our React app will interface with
    * We can create the ability to create new functions (like createItem() or create items)
5. Then to match up with these mutations and queries we go into our mutations and our queries and we write teh resolvers to go in and complete the logic that needs to happen
    * All the advanced logic (sending credit card) will go here

## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch
