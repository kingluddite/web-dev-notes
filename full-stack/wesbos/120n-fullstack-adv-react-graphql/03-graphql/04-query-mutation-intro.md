# Query and Mutation Intro
* We will write:
    - Our first custom type
    - Our first Query
    - Our first Mutation
* We will temporarily take Prisma out of the equation just to not confuse us with what is doing what
* We will write our queries and mutations just on the Yoga layer and we will not be interfacing with the DB layer
    - This lets you know that you can use Yoga without Prisma

## Download the App playground
* [Playground desktop app](https://github.com/prisma/graphql-playground/releases)
* Download, extract and drag to Applications
* Open Your GraphQL Desktop App (search Alfred App for `Playground`)
* Add an endpoint pointing to `http://localhost:4444`

### Write our first Query
`schema.graphql`

```
// MORE CODE

type Query {
    cars: ???
}
```

* In JavaScript we could say that it would return an array of object and each object will have a name of a car and/or some other information about the car
* But because GraphQL is typed if you want to return a **shape** of something you have to go and make that into its own **type**

```
type Car {
  name: String!
}

type Query {
    cars: [Car]!
}
```

* In in `Car` we describe what the car looks like
* And when we query we say we will return an array of Dog that is required
* If I did this

```
type Query {
    cars: [Car!]!
}
```

* That means I always have to return an array
* Dog! means we can't return `null` for any item
    - So `[{name: 'Ford'}]` is valid
    - But `[{name: 'Ford'}, null] is not`

## Now set up a resolver
* Whenever you create a Query you then need to set up a resolver
    - **remember** A resolver answers the question "Where does this data come from?" or "How do we get this data to the end user?"
* We set this up earlier:

```
// MORE CODE

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },

// MORE CODE
```

* This shows us that our `schema.graphql` has been lined up with our Query and Mutation resolvers

`resolvers/Query.js`

```
const Query = {};

module.exports = Query;
```

* So we need to make sure that in Query.js we need to make sure we have a method on every single query that lines up with the different queries that we have
* Each time you have a request coming in it is going to give you the signature of 4 different variables
    - `cars(parent, args, context/ctx, info) {}`
        + `parent` - Just the parent schema that we have in GraphQL
        + `args` - Arguments that have been passed to the query
        + `ctx` - The context
        + `info` - Gives us lots of info on the GraphQL query
#### More on context
`createServer.js`

```
// MORE CODE

    context: req => ({ ...req, db }),
  });
}

module.exports = createServer;
```

* In the `context` above, we have givin ourselves access to the DB, this is just a way for us to **surface** the DB
* `context` will also give us the rest of the `req` (request)
    - So if we need any information about the incoming request (whether that is `headers`, or `cookies`, or anything that is coming in that will be available on the `context` request)

### Return something
`Query.js`

```
const Query = {
  cars: function(parent, args, ctx, info) {
    return [{ name: 'Ford' }, { name: 'BMW' }];
  },
};

module.exports = Query;
```

* Open GraphQL GUI
* Click `refresh` icon
* View documentation inside the SCHEMA button
* You will see `cars:[Car]!`
* Click on that and you will see:

```
type Car {
    name: String!
}
```

### Open you GraphQL GUI
```
query {
  cars {
    name
  }
}
```

* View the output

```
{
  "data": {
    "cars": [
      {
        "name": "Ford"
      },
      {
        "name": "BMW"
      }
    ]
  }
}
```

* Now we currently are not interfacing with a DB
* We are just sending back raw text to the user
* This data could come from anywhere
    - You could hit an external REST API and then return the data here
    - Or you could open up a CSV file and parse it and return those values
    - You could pull those values from memory
    - In our case and most cases you will be pulling those values from a DB
    - This is where your DB calls will go regardless of what type of DB you are using on the backend
        + In our case we will be using Prisma

## Write a Mutation
* We will create a car
* We take one argument `name` that is required and will be a String
* It will return a Dog (so we are making an instance of our Dog type)

`schema.graphql`

```
type Car {
  name: String!
}

type Mutation {
  createCar(name: String!): Car
}

type Query {
  cars: [Car]!
}
```

* **remember** Any time you put a Mutation in resolvers it has to be mirrored in your schema or you will get an error in your terminal like `defined in resolvers but not in schema`

`Mutation.js`

```
const Mutations = {
  createCar(parent, args, ctx, info) {
    // create a car
    console.log(args);
  },
};

module.exports = Mutations;
```

* Open your GraphQL GUI

```
query {
  cars {
    name
  }
}

mutation {
  createCar(name: "VW") {
    name
  }
}
```

* But if you hover over `play` button you will see `<Unnamed>` and `<Unnamed>`
* So if you have more than one query in a tab you need to give each a name

```
query getAllCars {
  cars {
    name
  }
}

mutation createADog {
  createCar(name: "VW") {
    name
  }
}
```

* Hover over `play` button again
* You will see names now of `getAllCars` and `createADog`

## Select and play `createADog`
* It will error out and return `null`

```
{
  "data": {
    "createCar": null
  }
}
```

* This errors out because we haven't created a dog in the backend
* But we did console.log(args) and if you look in the terminal you will see:

`{ name: 'VW' }`

* If I console.log(parent) I get undefined in the Terminal
* If I console.log(ctx) I get the entire request object in the Terminal
* If I console.log(info) I get all the info about the GraphQL

## Global scope
* Just as an experiment we will put things in memory on the global scope
* You should not do this in practice because when our server restarts we lose everything
* You should never pollute the global scope
* This is simple example of storing something in the `window` object in the browser

`Mutation.js`

```
const Mutations = {
  createCar(parent, args, ctx, info) {
    // create a cars variable on global scope
    // at first set it to an empty array
    global.cars = global.cars || [];
    // create a car and pass it what was passed in args
    const newCar = { name: args.name };
    // push the new car into our array
    global.cars.push(newCar);
    // return our new car
    return newCar;
  },
};

module.exports = Mutations;
```

### Now we need to update our Query
`Query.js`

```
const Query = {
  cars: function(parent, args, ctx, info) {
    global.cars = global.cars || [];
    return global.cars;
  },
};

module.exports = Query;

```

### Use GraphQL GUI
* Run createADog again
* Mutation this time is (Run the same mutation 3 times)

```
mutation createACar {
  createCar(name: "BMW") {
    name
  }
}
```

* Output is:

```
{
  "data": {
    "cars": [
      {
        "name": "BMW"
      },
      {
        "name": "BMW"
      },
      {
        "name": "BMW"
      }
    ]
  }
}
```

* Why did we do this in Query.js?

`global.cars = global.cars || [];`

* We did that because in our `schema.graphql` we said even if there are no Cars, return us an empty array

```
// MORE CODE

type Query {
  cars: [Car]!
}
```

* Stop the server
* Change `Query.js` to look like this:

```
const Query = {
  cars: function(parent, args, ctx, info) {
    // global.cars = global.cars || [];
    return global.cars;
  },
};

module.exports = Query;
```

* Start the server
* This is the playground error you would get if your server was not running

```
{
  "error": "Failed to fetch. Please check your connection"
}
```

`$ npm run dev`

* Now if you just run this in your GraphQL GUI

```
query getAllCars {
  cars {
    name
  }
}
```

* You will get this error in the terminal:

`Error: Cannot return null for non-nullable field Query.cars.`

* That is because we said we require an array of cars and we can not have a null value for our array
* That is why we set the array to either the array of cars or an empty array
* So we just used the memory on our computer as a temporary DB and that is exactly how Query and Mutations work
    - You take in the data
    - You put it somewhere
    - And then you return whatever it is your are expecting
    - We are returning a car but it could also just as easily been a success message telling us it worked
* Then you can also access that data whether it is in memory or a DB and return those to the user

## Next - We will interface with the DB
* So are data will be persistent and not lost after we restart the server
* And other people on other computers will be able to access that data
