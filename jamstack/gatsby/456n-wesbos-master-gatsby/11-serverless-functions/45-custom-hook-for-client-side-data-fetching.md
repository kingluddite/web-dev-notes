# Custom Hook for Client Side Data Fetching
<!-- MarkdownTOC -->

- [Data changing fast - client side data fetching](#data-changing-fast---client-side-data-fetching)
  - [**FOLLOW UP** Wes thinks in the future](#follow-up-wes-thinks-in-the-future)
- [Instead we are going to build this entirely client side](#instead-we-are-going-to-build-this-entirely-client-side)
- [Our gatsby home page](#our-gatsby-home-page)
  - [View the home page in :8888 in browser](#view-the-home-page-in-8888-in-browser)
- [Now we'll fetch the data](#now-well-fetch-the-data)
  - [What is the URL of my Sanity endpoint?](#what-is-the-url-of-my-sanity-endpoint)
  - [Wes ran over the butterfly net with the lawnmower :(](#wes-ran-over-the-butterfly-net-with-the-lawnmower-)
  - [Click on your Sanity GraphQL URL](#click-on-your-sanity-graphql-url)
- [Create a custom react hook](#create-a-custom-react-hook)
  - [Make sure you are inside your gatsby folder](#make-sure-you-are-inside-your-gatsby-folder)
- [Now we need to go off and fetch the data](#now-we-need-to-go-off-and-fetch-the-data)
- [Enter this in GraphQL Playground](#enter-this-in-graphql-playground)
- [Now let's show why this is faster doing it in the browser](#now-lets-show-why-this-is-faster-doing-it-in-the-browser)
  - [Now let's fetch our GraphQL data](#now-lets-fetch-our-graphql-data)
  - [Let's make our GraphQL endpoint a variable](#lets-make-our-graphql-endpoint-a-variable)
- [Let's review what is happening](#lets-review-what-is-happening)
  - [Don't forget to export this hook](#dont-forget-to-export-this-hook)
  - [And don't forget to return in an object the state we will use](#and-dont-forget-to-return-in-an-object-the-state-we-will-use)
- [Review what will happen](#review-what-will-happen)
- [NOTE - If you change your .env you must restart gatsby!](#note---if-you-change-your-env-you-must-restart-gatsby)
- [You will get a CORS error](#you-will-get-a-cors-error)
- [Do these steps](#do-these-steps)
- [When you log into sanity.io make sure you are in the correct project \(if you have multiple\)](#when-you-log-into-sanityio-make-sure-you-are-in-the-correct-project-if-you-have-multiple)
- [Refresh home page](#refresh-home-page)
- [Now we set the data to state](#now-we-set-the-data-to-state)
- [Test and see if we log our state](#test-and-see-if-we-log-our-state)
- [It is working as it should - Here's the play-by-play](#it-is-working-as-it-should---heres-the-play-by-play)
- [You could fix this](#you-could-fix-this)
- [Take our data and pass it into each of the components](#take-our-data-and-pass-it-into-each-of-the-components)
  - [First we'll destructure](#first-well-destructure)
- [Test in RDTs](#test-in-rdts)

<!-- /MarkdownTOC -->

* We'll pull in the list of
    - current employees
    - current available pizzas
* And pull them into the home page

## Data changing fast - client side data fetching
* Limitation of gatsby because gatsby requires a build and it may be 15 minutes before the site updates
* Time sensitive data not meant to go through the Gatsby GraphQL
* You could rebuild everything every time there is a change but for time sensitive data it makes more sense to fetch that data client side rather than fetch that data at build time
* Currently gatsby does not have an API
    - There is only a Gatsby API at build time
    - And when you launch your website there is not GraphQL API that we can hit
        + So we have to go directly to the source of the data from the client side (aka - from the browser)

### **FOLLOW UP** Wes thinks in the future
* Gatsby will roll out some hosted GraphQL where you can use a GraphQL query with some sort of tags that you can add to it to refetch on client
    - Meaning you do it at build time and when it hits the frontend you can refetch that data
    - Currently Gatsby's docs has instructions on how to fetch it at build time as well as how to fetch it on GraphQL (but if that's the case you are write a Gatsby GraphQL query and a Sanity GraphQL query - which aren't the same thing and this is not a great way? --- need to talk about this topic more)

## Instead we are going to build this entirely client side
* This means when you load the page it will go and fetch it
* View it on gatsby pizza home page
    - https://gatsby.pizza
    - You'll see the slicemasters working and what pizza is available load but nothing is there, you fetch clientside and then they pop in

## Our gatsby home page
`gatsby/src/pages/index.js`

```js
// MORE CODE

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}

function HotSlices() {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="center">
      <h1>The best pizza downdown!</h1>
      <p>Open 11am to 11pm every day</p>
      <div>
        <CurrentlySlicing />
        <HotSlices />
      </div>
    </div>
  );
}
```

* You could add inputs to your Home page on Sanity for both of the things we are hardcoding and pull them in
    - **TODO**
    - You could also pull this data from your `gatsby-config.js` so data could live in a couple different places

### View the home page in :8888 in browser
* You see your homepage with two hard coded components

## Now we'll fetch the data
* Where will we get the data from?
    - If we can't get it from our GraphQL we'll have to get it straight from Sanity

### What is the URL of my Sanity endpoint?
1. Go to your Sanity folder
2. Quit process if necessary
3. Run `$ sanity graphql list`

* That will list all of the different domains that you have
* It will give you a URL to your GraphQL database
    - There is a slight difference between your Sanity GraphQL and your Gatsby GraphQL
        + So your queries will not be identical
        + one example: instead of `sanityAllPizza` it will just be `allPizza`

### Wes ran over the butterfly net with the lawnmower :(

### Click on your Sanity GraphQL URL
* You have a playground that looks different than GraphiQL (Gatsby GraphQL)

## Create a custom react hook
* This will go and fetch the data that we want
* And it will store it inside of "there" (where is there?) TODO

### Make sure you are inside your gatsby folder
`gatsby/src/utils/useLatestData.js`

* **note** You could make two separate hooks but for simplicity we'll consolidate them both into one custom hook
* `useEffect()` is a React hook that when the component mounts it will run the code inside our our useEffect()
    - And it will also re-run it if any of the data changes
    - In our case there is no data, so we pass in an empty array as the useEffect second argument
        + But if there was stuff you wanted to rerun on change, drop them inside that useEffect second argument

`src/utils/useLatestData.js`

```js
import { useEffect, useState } from 'react';

function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    // when the component loads (aka mounts), fetch the data
  }, []);
}
```

## Now we need to go off and fetch the data
* **note** Do you see StoreSettings inside your Sanity GraphQL Playground?
    - Probably not
    - Why?
        + You need to redeploy your GraphQL API for Sanity
            * **note** Make sure you are inside your sanity folder

`$ sanity graphql deploy production`

* When it asks you `Do you want to enable a GraphQL playground?` Select "Yes"
    - It will be the same URL from before so you can refresh the Sanity endpoint in the browser
* View the SCHEMA sidebar and you should now see StoreSettings under `QUERIES`

![StoreSettings](https://i.imgur.com/bCsx4Ei.png)

## Enter this in GraphQL Playground
```js
query {
  StoreSettings(id: "downtown") {
    name
  }
}
```

* And your data will be:

```js
{
  "data": {
    "StoreSettings": {
      "name": "Uptown store"
    }
  }
}
```

* And our full query

```js
query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      name
    }
    hotSlices {
      name
    }
  }
}
```

## Now let's show why this is faster doing it in the browser
* Delete one pizza in Sanity Backend dashboard and publish change
* Switch to Sanity Playground and click Play and you will see our data is updated instantly and we are not waiting on a build

### Now let's fetch our GraphQL data
* Do we need any special libraries to fetch GraphQL data?
    - No
    - Why?
        + Because at the end of the day it is just JSON and you are just sending it off

### Let's make our GraphQL endpoint a variable
* This is a Sanity endpoint
    - So we'll preface it with `GATSBY_` and then append `SANITY_GRAPHQL_ENDPOINT`
    - So the full environment variable name will be `GATSBY_SANITY_GRAPHQL_ENDPOINT`

`gatsby/.env`

```js
// MORE CODE
GATSBY_SERVERLESS_BASE=http://localhost:8888/.netlify/functions
GATSBY_SANITY_GRAPHQL_ENDPOINT=https://dbdsf0i.api.sanity.io/v1/graphql/production/default
```

* **notes**
    - You must POST the data to them GraphQL - you can't GET GraphQL in the case of Sanity
    - The headers will send JSON
    - the body get sent an object
        + The data that is posted to the back needs to be a string not an object
        + **note** You can't just send an object over the wire
        + Here is what we have so far:

`useLatestData.js`

* There will be no syntax highlighting
* The paste looks strange
* We will fix both in a bit but first let's get it working

```js
import { useEffect, useState } from 'react';

function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    // when the component loads (aka mounts), fetch the data
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      name
    }
    hotSlices {
      name
    }
  }
}
        `,
      }),
    });
  }, []);
}
```

## Let's review what is happening
1. When the useLatestData hook runs
2. We will create two pieces of state
3. Run fetch and hit our Sanity GraphQL endpoint
4. When that is done, we want to set the data to JSON

* This is a great usecase for NOT USING async/await
    - Because if you make the callback function inside useEffect() async, react will yell at you
    - So rather than doing another function inside of that we'll just use a regular `.then()` syntax
* Find the end of the fetch() and add a then to it

```js
import { useEffect, useState } from 'react';

function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    // when the component loads (aka mounts), fetch the data
    fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      name
    }
    hotSlices {
      name
    }
  }
}
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        console.log(res.data);
      });
  }, []);
}
```

### Don't forget to export this hook
```js
// MORE CODE

import { useEffect, useState } from 'react';

export default function useLatestData() {

// MORE CODE
```

### And don't forget to return in an object the state we will use
`useLatestData.js`

```js
// MORE CODE

s) => res.json())
      .then((res) => {
        // TODO: check for errors
        console.log(res.data);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
```

* Now let's log out our result from the home page

`gatsby/src/pages/index.js`

```js
// MORE CODE

export default function HomePage() {
  const result = useLatestData();
  console.log(result);

  return (

// MORE CODE
```

## Review what will happen
1. We use the useLatestData hook
2. When the home page renders out it will run the useLatestData hook ONCE
3. That hook will in turn run the "use effect" hook which will run the fetch to hit our Sanity GraphQL endpoint
4. Then that response comes back as JSON
5. Then we turn it into an object
6. Then we console log the response data returned

## NOTE - If you change your .env you must restart gatsby!

## You will get a CORS error
* In the Network CDT tab for Fetch/XHR
* This is happening because in order to fetch that GraphQL endpoint (from our :8888) we have to allow that :8888 URL in our Sanity

## Do these steps
1. Go to sanity.io
2. Login
3. Find your project (make sure you look at the PROJECT ID!)
4. Go to Settings
5. Go to API
6. You will see that localhost:3333 is good
7. Add http://localhost:8888 and http://localhost:8000
8. Click `Allow credentials`
9. Click `ADD NEW ORIGIN`

**tip** Just add `http://localhost:*` and it will run on all localhost ports
    - **CAUTION** Do not use this `*` carelessly as you don't want all sites to run on Sanity

## When you log into sanity.io make sure you are in the correct project (if you have multiple)
* If you click on the URL to the Sanity studio you will see it is different that your Sanity localhost:3333 (we added the Home Page in our :3333)
* Open your `sanity/sanity.json` file and look at this:

```js
// MORE CODE

  "api": {
    "projectId": "abcbuf0i",
    "dataset": "production"
  },

// MORE CODE
```

* That is the project id you should be looking at in sanity.io dashboard

![new UI for sanity.io API](https://i.imgur.com/Iu1kz9S.png)

## Refresh home page
* You will see the error goes away
* And we log out our slicers and slices

![slices and slicers](https://i.imgur.com/hL152QM.png)

## Now we set the data to state
* Remove the log

 `useLatestData.js`

```js
// MORE CODE
 )
       .then((res) => {
         // TODO: check for errors
         // console.log(res.data);
         setHotSlices(res.data.StoreSettings.hotSlices);
         setSlicemasters(res.data.StoreSettings.slicemaster);
       });
   }, []);

   return {
     hotSlices,
     slicemasters,
   };
 }
```

## Test and see if we log our state
![our state is working](https://i.imgur.com/qqGFJ2t.png)

* Why 3 logs?
    - Is it running multiple times?

`useLatestData.js`

```js
// MORE CODE

  const [slicemasters, setSlicemasters] = useState();
  // fetch the data from the GraphQL endpoint
  useEffect(function () {
    console.log('FETCHING DATA');

// MORE CODE
```

* You will see FETCHING DATA only once in the CDTs

## It is working as it should - Here's the play-by-play

1. The app runs
2. It immediately returns the empty state (the first log)
3. Then when the fetch comes back it `setHotSlices()` state first (that updates it) and that is the 2nd log
4. Then it runs the setSlicemasters() state (that updates it for the 3rd log)

## You could fix this
* Where it only runs once undefined and once with both pieces of data
* You will not have any perf (aka performance) issues
* Lots of people talk about these scary things with React but you don't need to work about it with gatsby

## Take our data and pass it into each of the components

### First we'll destructure
* And pass the props into our comonents on the home page

`pages/index.js`

```js
// MORE CODE

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The best pizza downdown!</h1>
      <p>Open 11am to 11pm every day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
```

## Test in RDTs
* Make sure you see the props in each component

![RDTs looking good](https://i.imgur.com/OoN3wMT.png)
