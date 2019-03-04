# Add authentication to your apps with Okta
## Aaron Parecki (Okta developer Advocate)
Teacher: Aaron Parecki (https://twitter.com/aaronpk)

## Two parts of Okta House
* Famous Part - IT, Enterprise SSO
    - You get your one account for your business and then you can log into all your companies internal apps using Okta
    - Which is way better than having passwords for each individual one
* Developer Side
    - https://developer.okta.com/
    - This is the other side of Okta, and completelys separate from the SSO part
    - This is a tool that helps you manage authentication in your own applications
        + That would cover:
            * If you need to build a sign up form
            * Or you have your users log into stuff and you don't want to deal with it as dealing with passwords is not fun/and sometimes dangerous and this is why you would let someone like Okta deal with it for you
    - Cost
        + Developer account is free forever for up to 1000 active users a month
        + Makes app dev a lot faster
        + Good for any size company
        + no time tier
        + If > 1000 users are logging in per month it will cost money

## What is Gatsby
* Web app framework that follows the static site generator
* We'll build a series of React files that we will build ahead of time
* All the data that we can will get loaded early and get put into the template but with authentication we would not want to do that
    - We would not want to put user information into these templates and publish those somewhere because then anyone who knew the pathname would be able to theoretically get them
    - Because Gatsby is built with React we are able to

## Install Gatsby
`$ npx gatsby new okta-gatsby-auth https://github.com/gatsbyjs/gatsby-starter-hello-world`

* We'll use the gatsby-starter-hello-world
* This is the default from Gatsby and all code was developed by Gatsby developers

## Build a home page that gives us access to a dashboard
* We won't build any backends where the authenticated content would be today
* But we will set up the protected dashboard

`components/layout.js`

```
import React from 'react'

const Layout = ({ children }) => (
  <>
    <header
      style={{
        background: '#333399',
        color: 'white',
        padding: '1rem 5%',
      }}
    >
      My Sweet App
    </header>
    <main
      style={{
        margin: '5rem auto',
        width: '90%',
        maxWidth: 600,
      }}
    >
      {children}
    </main>
  </>
)

export default Layout

```

`pages/index.js`

```
import React from 'react'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <div>Hello world!</div>
  </Layout>
)
```

## Add links
`layout.js`

```
import React from 'react'
import { Link } from 'gatsby'

const Layout = ({ children }) => (
  <>
    <header
      style={{
        background: '#333399',
        color: 'white',
        padding: '1rem 5%',
      }}
    >
      <Link style={{ color: 'white', marginRight: '1rem' }} to="/">
        My App
      </Link>
      <Link style={{ color: 'white' }} to="/dashboard">
        Dashboard
      </Link>
    </header>
    <main
      style={{
        margin: '5rem auto',
        width: '90%',
        maxWidth: 600,
      }}
    >
      {children}
    </main>
  </>
)

export default Layout

```

## Add client only route
* What is a client only route?
* One route takes us home
* One route takes us to dashboard

### We could do this
`pages/dashboard.js`

```
import React from 'react'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <div>Dashboard</div>
  </Layout>
)
```

* Above will route and show the dashboard page but this is not what we want because this page will be built to static HTML so we're not protecting anything

## We could do this a couple of ways
1. We could just authenticate the component that gets passed through to Dashboard
2. Client only routes
    * This lets us say "I only want Anything that is under `/app` I want to be passed to a custom react router"
    * This would be if your dashboard had:
        - an accounts section
        - and a settings section
        - analytics
        - whatever you want on your private dashboard that would be user data
        - [This would be the way](https://www.gatsbyjs.org/docs/building-apps-with-gatsby/) you would solve that problem so anything that is under `/app` will be routed by react route and it will not be server rendered
            + so we can protect that content
            + we are never saying here is user data so put this into a static file that someone can touch

```
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}
```


`dashbaord.js`

```
import React from 'react'
import Layout from '../components/layout'

export default () => (
  <Layout>
    <div>TODO: require authentication to see this</div>
  </Layout>
)
```

## What is an OpenID Connect Client
* This is an open standard that deals with authentication and that is what Okta is based on
* OpenID Connect is a way for the OpenID Server to provide for to log people in and provide a token that the app can use to verify that the user did indeed log in
* The job of the Gatsby app is going to be to request one of these tokens, start the flow and then verify at the end so that it knows that the user did log in and knows who they are

## Than in Okta
* Add new App
* Single-Page App
    - name: Okta + Gatsby Auth
    - Change port to 8000 (gatsby uses this by default)
* Login redirect URIs
    - This is where you want to redirect back to after we are logged in
    - http://localhost:8000/callback
    - We'll create a page called `callback.js`
        + We can make a route called callback or do it on the index page
* Click `Done`
* Now that you created the app and enabled OpenID Connect
* We now need to plugin the `Client ID` to the app which will identify our app to the whole system
* Copy the Client ID
* [react quick start for Okta](https://developer.okta.com/quickstart/#/react/nodejs/express)
* Also have your Org URL

### What this workflow looks like
* Why does the redirect exist? What does it do?
    - When you have a login link in Gatsby it's going to send the user over to the Okta login page and then the user is going to type in their password there, create the account, type in the password and that will all happen outside of our application, that will happen "off domain" on something that Okta manages and then after the user logs in okta is going to send the user back to the Gatsby app and it has to send them somewhere that is ready to cat
    - It has to send them somewhere that is ready to catch that token and somewhere that will be able to verify the token and remember it and sign them in
* Does it send as a post or a get? Or what comes back?
    - Yes it will actually redirect the user's browser to that URL if we are doing the normal OpenID Connect flow


#### The Normal OpenID Connect flow using Gatsby
1. The user will be on Gatsby
2. Then the user will end up on Okta (the address in the browser will be Okta)
3. After the user finishes logging in, Okta sends them back to Gatsby with just a GET request to that callback URL

* Need to double check is whether the clicks that we are going through for react is going to do that or is it going to do it built-in where it all just kind of happens silently on the Gatsby site in the frontend code where that whole exchange happens behind the scenes
* Okta can do it either way

`$ npm install @okta/okta-react --save`

## Configuring the Okta SDK
* [scroll to Configuration heading](https://developer.okta.com/quickstart/#/react/nodejs/express)
* It will need this for everything
* This will need to be available for all components
* It should be in the intitiation of the app

<div id=""></div> Wrap the 
