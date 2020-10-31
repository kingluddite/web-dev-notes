# Single Post component
* We will work with `Posts/Post.js`
* We use styled components to limit the CSS to make seeing what JSX is used more easy to see

## Let's see what is inside Post
* We use `props` to see what is inside there

```
import React from 'react'
import Post from './Post'
import Banner from '../Banner'
const Posts = ({ posts, title }) => {
  return (
    <section className="posts">
      <h3 className="posts-title">{title}</h3>
      <div className="posts-center">
        {/* posts column */}
        <article>
          {posts.map(post => {
            return <Post key={post.id} {...post} />
          })}
        </article>
        {/* banner column */}
        <article>
          <Banner />
        </article>
      </div>
    </section>
  )
}

export default Posts
```

* We see 3 posts in console
    - We see excerpt
    - frontmatter
    - id ( we don't need `id` but we used it in the parent and that's why it's there)
    - We won't use author (just added to show you that you can make your frontmatter whatever you want)
    - 

## Warning
* Don't randomly create a mdx file somewhere in your project or it will appear in the result
* I created a file with no frontmatter and it caused havoc because null values don't work well with mdx
* I was getting the following

![bogus file](https://i.imgur.com/ZhKprLq.png)

* Solution: Find it and delete it

## Final post page

`Posts/Post.js`

```
import React from 'react'
import Image from 'gatsby-image'
import { FaRegClock } from 'react-icons/fa'
import { IoMdArrowRoundForward } from 'react-icons/io'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Post = ({ frontmatter, excerpt }) => {
  const { category, date, image, readTime, slug, title } = frontmatter
  console.log(image)
  return (
    <Wrapper>
      <Image fluid={image.childImageSharp.fluid} className="img" />
      <div className="info">
        <span className="category">{category}</span>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <Link to={`/posts/${slug}`} className="link">
          Continue Reading <IoMdArrowRoundForward />
        </Link>
        <footer>
          <span className="date">
            <FaRegClock className="icon" />
            {date}
          </span>
          <span>{readTime} min read</span>
        </footer>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  margin-bottom: 3rem;
  .info {
    text-align: center;
  }
  .img {
    margin-bottom: 1rem;
    border-radius: var(--radius);
    height: 17rem;
  }
  .category {
    display: inline-block;
    margin-bottom: 1rem;
    background: var(--clr-grey-10);
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
  }
  h3 {
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: initial;
  }
  .underline {
    width: 5rem;
    height: 1px;
    background: var(--clr-grey-9);
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  p {
    color: var(--clr-grey-5);
    line-height: 1.8;
  }
  .link {
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    font-weight: 700;
    color: var(--clr-primary-5);
    padding-bottom: 0.1rem;
    display: flex;
    align-items: center;
    svg {
      margin-left: 0.25rem;
      font-size: 1.2rem;
    }
  }
  .link:hover {
    border-color: var(--clr-primary-8);
    color: var(--clr-primary-8);
  }
  footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--clr-grey-9);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--clr-grey-5);

    & .date {
      display: flex;
      align-items: center;
      & .icon {
        color: var(--clr-primary-5);
        margin-right: 0.5rem;
      }
    }
  }
  @media (min-width: 600px) {
    .img {
      height: 20rem;
    }
  }
  @media (min-width: 800px) {
    .img {
      height: 25rem;
    }
  }
  @media (min-width: 992px) {
    & {
      display: grid;
      grid-template-columns: 30rem 1fr;
      column-gap: 1.5rem;
      .info {
        text-align: left;
      }
      .img {
        height: 100%;
        max-height: 20rem;
      }
      .underline {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`

export default Post
```

