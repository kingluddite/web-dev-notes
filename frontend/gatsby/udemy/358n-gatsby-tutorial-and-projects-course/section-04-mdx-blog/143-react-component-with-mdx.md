# First React component with MDX
`pages/post.mdx`

```
import { Link } from 'gatsby'

<section className="mdx-page">

## my first mdx file

**Lorem ipsum dolor sit amet**, consectetur adipisicing elit, 
*sed* do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

# my heading 1

<h1 className="special">This is JSX h1</h1>
<div className="code">

``````js
const firstName = 'john'
const lastName= 'doe'
``````

</div>

<Link to="/posts" className="btn center-btn">all posts</Link>

</section>
```

* That will style the button

## Nice text
```
// MORE CODE

<div className="nice-text">

<h3>nice text</h3>

<FiInfo className="nice-text-icon"></FiInfo>

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

</div>

</section>

// MORE CODE
```

* Make sure you add the line breaks or you will get errors

## More JSX with MDX
* Our custom post

```
---
title: test
slug: test
image: ./images/js-3.png
date: 2020-05-10
author: test
category: test
readTime: 11
---

import { Link } from 'gatsby'
import { FiInfo } from 'react-icons/fi'
import { Counter, LikeButton } from '../../components/Complete'

## my first mdx file

<div className="code">

``````js
const firstName = 'john'
const lastName = 'doe'
``````

</div>

<div className="nice-text">

<h3>nice text</h3>

<FiInfo className="nice-text-icon"></FiInfo>

<blockquote>
  I'm baby tumblr fanny pack tousled seitan. Man bun shaman yr, bushwick fam
  hammock williamsburg kombucha keytar VHS. Chambray street art authentic,
</blockquote>

<blockquote display="info">
  I'm baby tumblr fanny pack tousled seitan. Man bun shaman yr, bushwick fam
  hammock williamsburg kombucha keytar VHS. Chambray street art authentic,
</blockquote>

``````jsx
import React from 'react'

const Counter = () => {
  const [count, setCount] = React.useState(0)
  return (
    <section className="counter">
      <h4>show some love to MDX</h4>
      <h4>likes {count}</h4>
      <button className="btn btn-danger" onClick={() => setCount(count + 1)}>
        i like mdx
      </button>
    </section>
  )
}
export default Counter
``````

<LikeButton />

![nice image](./images/js-3.png)

<Link to="/posts" className="btn center-btn">
  all posts
</Link>

```

* We comment out our single `gatsby-plugin-mdx` and use this one

`gatsby-config.js`

```
// MORE CODE

module.exports = {
  plugins: [
    // `gatsby-plugin-mdx`,

    // MORE CODE

    `gatsby-remark-images`,

    // MORE CODE
   
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [{ resolve: 'gatsby-remark-images' }],
      },
    },

// MORE CODE
```

## Stop and restart the server
`$ gatsby develop`

## Page MDX
`pages/post.mdx`

```
import { Link } from 'gatsby'
import {FiInfo} from 'react-icons/fi'
import { Counter, LikeButton } from '../components/Complete'

<section className="mdx-page">

![nice image](../assets/gatsby-1.png)

## my first mdx file (this is a mdx page!)

**some text in bold
is here
** this is a test

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

<div className="code">

``````js
const firstName = 'jane'
``````

</div>

</section>

```

* Browse to that page

`http://localhost:8000/post`

* And the image appears

## The gotcha is with styling this image
* We have a class of `mdx-page` but a `p` is a child and then there is a span with `gatsby-resp-image-link` class and an image class of `gatsby-resp-image-image` class

`main.css`

```
// MORE CODE

.mdx-page {
  width: 90vw;
  max-width: var(--fixed-width);
  margin: 4rem auto;
}
.mdx-img p {
  width: 20rem;
}
.mdx-img .gatsby-resp-image-image,
.mdx-img .gatsby-resp-image-background-image {
  border-radius: 50px;
  height: 20rem;
  object-fit: cover;
}

// MORE CODE
```

## We need to add a class of `mdx-img` to a div we wrap around our image
`pages/post.mdx`

```
// MORE CODE

<section className="mdx-page">

<div className="mdx-img">

![nice image](../assets/gatsby-1.png)

</div>

## my first mdx file (this is a mdx page!)

// MORE CODE
```

### More Gotchas
* Watch out for spacing
* Sometimes need to run `$ gatsby clean` to get a fresh copy
