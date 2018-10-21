# Visualizing Route Changes
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

* With React we run into a problem vs traditional web apps
* In a traditional web app the bottom left will let the user know something is happening

## Solution
* [nprogress github](https://github.com/rstacruz/nprogress)
* [nprogress demo](http://ricostacruz.com/nprogress/)

### Router events
* We will hook into the router events of NextJS

### How does NextJS work
* It doesn't generate all pages at once
* It generates them on demand

#### Test it out
* Start and stop your nextjs server
* Start at home page and you will see it is built in terminal
* Then click on sell page
* See how that page is built in terminal
* But when we go to production it will pre-build all those pages
* We can also have the ability to attach a `prefetch` to our `Link` tag which will also go out and fetch the data needed for those pages
* This means when you click on pages, you will instantly see the page

### How do we implement nprogress
* We need to import the Router from NextJS
    - Doesn't matter which page you are doing it in
    - [NextJS docs](https://nextjs.org/docs/#imperatively)
        + Routes
            * Imperative
                - You click a link but after you do you can use `Router.push('/about')` to push the user to a different page

#### We want to listen to events on our route
* onRouteChangeStart
* onRouteChangeComplete
* onRouteChangeError

`Header.js`

```
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
// custom components
import Nav from './Nav';

Router.onRouteChangeStart = () => {
  console.log('onRouteChangeStart Triggered');
};
Router.onRouteChangeComplete = () => {
  console.log('onRouteChangeComplete Triggered');
};
Router.onRouteChangeError = () => {
  console.log('onRouteChangeError Triggered');
};

// MORE CODE
```

* Visit home and sell routes and view console and you will see the `onchangeRouteStart` and `onRouteChangeComplete` route events trigger for both routes

## start nprogress
`Header.js`

```
// MORE CODE

import Nav from './Nav';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

// MORE CODE
```

* Visit a route and you will see the nprogress bar
* The external styles that is required are provided in `Meta.js`

`Meta.js`

```
// MORE CODE

    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
  </Head>
);

export default Meta;
```

### Add the nprogress done
`Header.js`

```
// MORE CODE

import Nav from './Nav';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

// MORE CODE
```

## Test it out
* Browse to `/` or `/sell` and watch how our nprogress works

## Next - Problem when we refresh
* Anytime we refresh the CSS goes away briefly and then loads
* We will get rid of that flicker
    - That is happening because style components by default do not work on the server
    - When you visit a page with NextJS it will render on the server and then the client side will pick it up and then it will start rerendering it on the client
        + So we have react on the server and we have react on the client
        + But we need a little more config to render the CSS on the client side

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

