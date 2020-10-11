# Blog template
## Problem with markdown

`blog-template.js`

```
// MORE CODE

const ComponentName = ({ data }) => {
  const { content } = data.blog
  return (
    <Layout>
      <section className="blog-template">
        <div className="section-center">
          <article className="blog-content">{content}</article>
        </div>
      </section>
    </Layout>
  )
}
// MORE CODE
```

* But that will render ugly (not formatted as markdown) code

```
# JavaScript Hard Parts ## Subtitle - first - second - third > Hoodie tumblr pour-over chartreuse lo-fi wayfarers. Flexitarian selfies photo booth forage glossier migas woke occupy pickled shaman adaptogen. ``` export const query = graphql` { allStrapiProjects { nodes { id description github title stack { id title } url image { childImageSharp { fluid { src } } } } } } ` ```
```

## Solution
* We'll use `ReactMarkdown` npm module

`$ npm i Reactmarkdown`

* Import it and consume it, and pass it our markdown `content` like:

```
// MORE CODE

import ReactMarkdown from "react-markdown"

const ComponentName = ({ data }) => {
  const { content } = data.blog
  return (
    <Layout>
      <section className="blog-template">
        <div className="section-center">
          <article className="blog-content">
            <ReactMarkdown source={content} />
          </article>
        </div>
      </section>
    </Layout>
  )
}
// MORE CODE
```

* And that will render markdown

## How are we styling this?
* We use markdown and this add CSS to style it

`main.css`

```
// MORE CODE

/*
===============
Blog Template
===============
*/
.blog-template {
  padding: 5rem 0;
}

.blog-template h1,
.blog-template h2 {
  text-align: center;
}
.blog-template ul {
  margin-top: 2rem;
  display: inline-block;
}
.blog-template ul li {
  background: var(--clr-grey-9);
  color: var(--clr-grey-5);
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  text-transform: uppercase;
}

.blog-template blockquote {
  background: var(--clr-primary-9);
  border-radius: var(--radius);
  padding: 1rem;
  line-height: 2;
  color: var(--clr-primary-5);
  margin: 2rem 0;
}
.blog-template pre {
  background: #222;
  color: yellow;
  overflow-x: scroll;
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
}
.blog-template img {
  width: 15rem;
  height: 15rem;
  margin: 3rem 0;
}
// MORE CODE
```
