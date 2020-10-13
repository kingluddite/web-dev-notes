# Prop Types
* Prop types add an extra layer of validation on the frontend
* We are using required which helps us but if we didn't make them required in Strapi we would not add data we need for our components, prop-types help ensure we add what is required and if we don't it will remind us we need it or our app will break with errors of what prop-types are missing

## Install prop-types
`$ npm i prop-types`

## Import prop-types
`components/Project.js`

```
import React from "react"
import PropTypes from "prop-types"
// MORE CODE
```

* All components have a property `propTypes`

```
// MORE CODE

Project.propTypes = {}

// MORE CODE
```

## ES6 snippets
* Prop types keyboard shortcut
    - `ptsr` --> PropTypes.string.isRequired
    - `ptar` --> PropTypes.array.isRequired
    - `ptor` --> PropTypes.array.isRequired
* If we have an array of objects (which we do in stack) we use:

`stack: PropTypes.arrayOf(PropTypes.object).isRequired,`

`Project.js`

```
// MORE CODE
Project.propTypes = {
  title: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  stack: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Project
```

### Showing how propTypes works
* Go in and make a required field not required and save
* Restart gatsby and view in browser
* I made title not required
* You will see this error on projects page

```
index.js:2177 Warning: Failed prop type: The prop `title` is marked as required in `Project`, but its value is `null`
```

* It let's you know you are missing `title`

## Default value
![default title](https://i.imgur.com/2kmPwI1.png)

* Make sure to turn required back on and restart server
## Log out to see which project title is null
`Project.js`

```
// MORE CODE

const Project = ({ description, title, github, stack, image, index }) => {
  console.log({ title })
// MORE CODE
```

![see which title is null](https://i.imgur.com/jYr2izO.png)

## How to use snippets to also setup proptypes
`rafcp`

`components/example.js`

```
import React from 'react'
import PropTypes from 'prop-types'

const example = props => {
  return (
    <div>
      
    </div>
  )
}

example.propTypes = {

}

export default example
```

## BEST PRACTICE - Create all components with prop types

## Images make this so important
* If you don't require an image you are trying to get a child object off a null parent object and Gatsby will break
* Requiring all images in strapi prevent this problem
* Adding prop-types help validate that you don't forget an image in a component that requires it
* But to prevent the app from breaking you can use && "and" logic to say show the image if it exists otherwise show "Required Image is missing"

`Blog.js`

```
import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import { Link } from "gatsby"
const Blog = ({ id, title, image, date, category, slug, desc }) => {
  console.log(title, image)
  return (
    <Link to={`/blogs/${slug}`} className="blog" key={id}>
      <article>
        {image && (
          <Image fluid={image.childImageSharp.fluid} className="blog-img" />
        )}
        <div className="blog-card">
          <h4>{title}</h4>
          <p>{desc}</p>
          <div className="blog-footer">
            <p>{category}</p>
            <p>{date}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

Blog.propTypes = {
  id: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default Blog

```

`Project.js`

```
import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import { FaGithubSquare, FaShareSquare } from "react-icons/fa"
const Project = ({ description, title, github, stack, image, index }) => {
  console.log({ description, title, github, image })
  return (
    <article className="project">
      {image && (
        <Image fluid={image.childImageSharp.fluid} className="project-img" />
      )}

      <div className="project-info">
        <span className="project-number">0{index}.</span>
        <h3>{title || "default title"}</h3>
        <p className="project-desc">{description}</p>
        <div className="project-stack">
          {stack.map(item => {
            return <span key={item.id}>{item.title}ddd</span>
          })}
        </div>
        <div className="project-links">
          <a href={github}>
            <FaGithubSquare className="project-icon" />
          </a>
          <a href={github}>
            <FaShareSquare className="project-icon" />
          </a>
        </div>
      </div>
    </article>
  )
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  stack: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Project
```

## If you 1000 images and one is missing
* Without the above code your app breaks and you will have a nightmare trying ot find which image is missing
