# SEO all pages
* Set up twitter card

## How to add SEO to every page
* Let's add to About

`pages/about.js`

```
import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Image from "gatsby-image"

const About = ({
  data: {
    about: { nodes },
  },
}) => {
  const { title, stack, image, info } = nodes[0]

  return (
    <Layout>
      <section className="about-page">
// MORE CODE
```

* Change to this:

`pages/about.js`

```
import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Image from "gatsby-image"
import SEO from "../components/SEO"

const About = ({
  data: {
    about: { nodes },
  },
}) => {
  const { title, stack, image, info } = nodes[0]

  return (
    <Layout>
      <SEO title="About" description="about portfolio" />
// MORE CODE
```

## Add SEO to templates
`templates/blog-templates.js`
