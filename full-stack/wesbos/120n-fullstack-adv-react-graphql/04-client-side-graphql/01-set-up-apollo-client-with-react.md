# Setting Up Apollo Client with React
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## Note
* We have Prisma set up
* We have our GraphQL Yoga set up
* We have our React and NextJS set up
* WE have one missing piece
    - For React to talk to GraphQL Yoga and Prisma servers
    - And that can be done with Apollo Client

## Apollo Client
* Any time you are dealing with data in a React Application you end of doing 1 of 2 things:
    1. Store all your data in a component via `state` and then if you want that `state` to be accessible to other components you use regular `state` and you want that `state` data to be available to other components you either put it in **context** or pass it down via props
    2. Or you usually reach for Redux

## What is Redux
* It is a data store where you can define where your actions are and how those actions are handled and how the data goes in and out

## Apollo Client replaces the need for Redux
* **note** Redux was used under the hood for Apollo for version 1
* Now we don't need to use Redux in our app because Apollo does all the data mgt stuff that a Redux store will do as well as a ton of other stuff also
    - Apollo will also:
        + Do the fetching of the data from the server side
        + It will do the pushing of your data to your mutations
        + It will do all of the **caching**
            * If I request a resource twice from the same page, it will pull from the cache first, you don't need to worry whether you should pull that over the network or not
        + It will help us handle our local state (if you have data that is just stored in the browser)
        + Also gives you your `error` and `loading` states
            * This is great:
                - You never have to set a flag of `is loading true` and you never have to manually catch your errors becuase it does all that for you
* It is the **gold standard** for working with React and GraphQL
* There is a competitor named [**Relay**](https://facebook.github.io/relay/)

## We will be working in the frontend

## Additional Resources
[apollo vs relay](https://www.prisma.io/blog/relay-vs-apollo-comparing-graphql-clients-for-react-apps-b40af58c1534/)

`withData.js`

```
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
```

* We import ApolloClient from `apollo-boost`

### What is apollo boost?
* [documentation](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost)
* It is an official package put out by Apollo that has all the standard items you would need in an Apollo Client included
    - By default `apollo-client` comes as `apollo-client`
        + If you want to add
            * Ways to deal with caching `apollo-cache-inmemory` 
            * Handle ajax calls to your server side `apollo-link-http`
            * Handle errors `apollo-link-error`
            * Handle local state management `apollo-link-state`
        + Then you have to use what are called "links" and you can extend what apollo client does
* But in most cases people will want to use all of these things
* So that is why there is a package called `Apollo Boost` and it has all those things preconfigured and does them for you which is a huge time saver

#### What is `next-with-apollo`
* This will give us a High Order Component (HOC) that will expose our Apollo Client (think of Apollo Client like the db that's in the client) via a `prop`
    - React-Apollo comes with tools for doing this
    - But because we are using NextJS and **we want server side rendering** to work there is a little bit of extra work we need to do because of how server side rendering works (so the next-with-apollo does all that stuff for us which is great and a huge time save)

### We import our endpoint
* Our end point comes from here:

`config.js`

```
// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:4444`;
export const perPage = 4;
```

* That URL `localhost:4444` points to our local version of Playground
* This is our Yoga API here

### header
`withData.js`

```
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {

// MORE CODE
```

* WE take an argument that pulls in our `headers`
    - This will be a very important step when we deal with Authentication

```
// MORE CODE

return new ApolloClient({

// MORE CODE
```

* We return a new client from it

```
// MORE CODE

uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,

// MORE CODE
```

* We give it the URL of our endpoint
    - We use a ternary to use dev or production endpoints

```
// MORE CODE

  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
      headers,
    });
  },
});
```

* Then, on every single request
    - This of this like an express middleware
    - We include our credentials (_what this does is when we make a request, if we have any logged in cookies in the browser, then those cookies will come along for the ride - this will be important when we flip over to our backen_)

```
// MORE CODE

export default withApollo(createClient);
```

* We export using withApollo
* Then we will create a client within `App.js`

`App.js`

* Page is the highest level that we have so we will wrap that with `ApolloProvider` (so every page is wrapped by ApolloProvider)
* `ApolloProvider` needs a client which we can pass using the `client` attribute
* We have access to the client via `this.props.apollo`
    - Why is that available to us?
    - Because we'll do this:

```
export default withData(MyApp);
```

`_app.js`

```
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

// custom components
import withData from '../lib/withData';
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <ApolloProvider client={this.props.apollo}>
          <Page>
            <Component />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
```

* Very good to always destructure

`_app.js`

```
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

// custom components
import withData from '../lib/withData';
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
```

## We need a way to surface our page values
* Previous version of NextJS would automatically do this
* But now we have to explicitly do that

`_app.js`

```
// MORE CODE

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

// MORE CODE
```

* Now we have access to `pageProps` in our render
* How?
    - getInitialProps() is a **special NextJS LifeCycle Method** and it will run first before the first `render()` actually happens

`_app.js`

```
// MORE CODE

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

// MORE CODE
```

* And by returning `{ pageProps }` you expose it to the `render()` function
* This is very important because every single page that we have 

### Give our Component the pageProps
* Using the spread operator
* This will give all that info to the specific page

`_app.js`

```
// MORE CODE

render() {
  const { Component, apollo, pageProps } = this.props;

  return (
    <Container>
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </Container>
  );
}

// MORE CODE
```

## Take it for a test drive
* Be in the frontend

`$ npm run dev`

* All should be working

## Download Apollo Dev Tools
* For Chrome
* [documentation](https://www.apollographql.com/docs/react/features/developer-tooling.html)
* Will give us access to the entire store (aka cache)
* There will be nothing in here yet

## Next - Write some code
* Pull some data into our app so we can template it out with React


