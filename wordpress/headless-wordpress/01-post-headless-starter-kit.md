# Post Headless WordPress Starterkit
* [Link to github repo](https://github.com/postlight/headless-wp-starter)
* Need homebrew

## frontend
* nextjs install

## wordpress
* this is the wordpress install

`$ cd wordpress && yarn install`

* It uses homebrew to grab everything you need for your macos install
* It will ask for your machine password
* It will ask if you want to overwrite and existing wp (yes)
* It will ask if you have an existing db (no)

![questions it asks](https://i.imgur.com/yJOD3rU.png)

* It will say your server is running on localhost:8080/wp-admin
    - This is wrong as you didn't start your server yet
    - Start your server with `$ yarn start`
    - Remember your username and pwd: nedstark/winteriscoming

For those who used homebrew to install MySQL use the following commands below to start, stop, or restart MySQL

Brew start

```
$ /usr/local/bin/mysql.server start
```

Brew restart

```
$ /usr/local/bin/mysql.server restart
```

Brew stop

```
$ /usr/local/bin/mysql.server stop
```

## Troubleshooting
* If you are running MAMP and configured MAMP to work in zshrc, comment those instructions out
* Retry
* I also had to link wp-cli to brew following the instructions `$ brew reinstall wp-cli`
* Stop mysql if you see it was running `mysqld` with: `$ /usr/local/bin/mysql.server stop`

## Login to WP
Login using nedstart and winteriscoming (pwd) at `localhost:8080/wp-admin`

## Visit site in new tap
* http://localhost:8080/wp-json/
    - This shows you JSON!
    - This is the API for the site

## JSONView
* So you can see the WP API better

## API
* Get 1 post by id - `http://localhost:8080/wp-json/wp/v2/posts/10`
* Regex pattern to get post by id

![post by id regex](https://i.imgur.com/rQGWrku.png)

* Get pages via API - http://localhost:8080/wp-json/wp/v2/pages
* Get page via page id - http://localhost:8080/wp-json/wp/v2/pages/4
    - gives us an object of that individual page

## Setting up frontend with NextJS
* Open new iterm tab
* Change directories into `frontend` folder and `$ yarn install`
* `$ yarn start` ------> this will not work!!!!!

### You need to run with `$ yarn run dev`
* open localhost:3000
* You will see all code is server side rendered (great for SEO)
* You will see the links and they all work
* View the source and all is there and seen by search engines
* We didn't have to do anything to get this going
* http://localhost:3000/

## NextJS
routes are case sensative postIndex /postIndex is route vs post-index /post-index is route

* You can change bg color with #333 in styles.scss (sass right out of box!)

`pages/post-index.js`

```
import React, { Component } from "react";
import Layout from "../components/Layout";

export default class PostIndex extends Component {
  render() {
    return (
      <Layout>
        <h1>Post Index</h1>
      </Layout>
    );
  }
}
```

* We use layout to use our layout
* We need to do this with NextJS because we don't have access to the router like a normal React site

## We will use NextJS life cycles
* Only available int NextJS world

`post-index.js`

* Once again `getInitialProps()` is exclusive to NextJS and it enables to access props before the component is loaded
* If we were doing the same this in a React App (not NextJS) everything would be the same except we would use `ComponentDidMount()` React lifecycle method instead of `getInitialProps()`

```
import React, { Component } from "react";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import { Config } from "../config";

export default class PostIndex extends Component {
  static async getInitialProps() {
    const postsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/posts`);
    const posts = await postsRes.json();
    return {
      posts
    };
  }
  // MORE CODE
```

* View /post-index (refresh page) and you will see 2 posts in React dev tools (in chrome browser)


### Custom post
* Open nextjs server page `frontent/server.js`

```
// MORE CODE
server.get("/post/:slug", (req, res) => {
  const actualPage = "/post";
  const queryParams = { slug: req.params.slug, apiRoute: "post" };
  app.render(req, res, actualPage, queryParams);
});

// add the below code
server.get("/articles/:slug", (req, res) => {
     app.render(req, res, "/blogPost", { slug: req.params.slug });
   });
// MORE CODE
```

* You must restart the server
* the browse to `localhost:3000/articles/new-post` and you will see this code

`pages/blogPost.js`

```
import React, { Component } from "react";

export default class BlogPost extends Component {
  render() {
    return (
      <div>
        <h1>Blog Post</h1>
      </div>
    );
  }
}
```

* And browsing to `http://localhost:3000/articles/new-post` will show you this in the browser

![what you will see](https://i.imgur.com/0Kc3pTJ.png)

* Now can we see slug passed into that route?
* View element in elments of chrome and select it and switch to React tab and you will see BlogPost is highlighted
    - View the Props
    - Expand url > query > and you will see slug!
    - But we won't access it that way
    - We will access it instead through something called **context**

`blogPost.js`

```
import React, { Component } from "react";
import { Config } from "../config";
import fetch from "isomorphic-unfetch";

export default class BlogPost extends Component {
  static async getInitialProps(context) {
    console.log(context);
    const postsRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/posts`);
    const posts = await postsRes.json();
    return { posts };
  }
  // MORE CODE
```

* Make sure to import isomorphic `fetch`
* View terminal and you'll see we have access to `query` of **slug**
* ![query slug](https://i.imgur.com/Fcg7qjF.png)
* Refresh page with `console.log(context.query.slug` and you will `new-post` (or whatever slug it was of the post you were looking at)
* We can look up our posts by the slug

## /postlight/v1/post
* slug is required
* http://localhost:8080/wp-json/postlight/v1/post
    - Because you are missing slug you will get error of missing parameter (slug)
* Here is the correct endpoint
    - http://localhost:8080/wp-json/postlight/v1/post?slug=new-post
    - That will pull up that particular post via it's slug

## Update our code
```
import React, { Component } from "react";
import { Config } from "../config";
import fetch from "isomorphic-unfetch";

export default class BlogPost extends Component {
  static async getInitialProps(context) {
    const slug = context.query.slug;
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/postlight/v1/post?slug=${slug}`
    );
    const post = await postRes.json();
    return { post };
  }
  // MORE CODE
```

* View this route: `http://localhost:3000/articles/new-post`
* View BlogPost component in React dev tools of Chrome
* You will see **post** under Props and expand to see we have all the data inside that post object

## Output a post
```
// MORE CODE
 render() {
    const { post } = this.props;
    return (
      <div>
        <h1>{post.title.rendered}</h1>
        <p>{post.excerpt.rendered}</p>
      </div>
    );
  }
}
```

* Note how we are pulling in unrendered HTML with the excerpt. This is something we can fix

