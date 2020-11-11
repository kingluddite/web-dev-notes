# MDX Component example
## Next problem
* Our file will get too long with tons of logic
* We eventually need to modularize the logic and import it
* For now we'll separate it

`root-mdx.js`

```
// MORE CODE

const myH2 = props => {
  console.log(props)
  return <h2 {...props}>{props.children}</h2>
}

const components = {
  h2: myH2,
}

// MORE CODE
```

### Adding logic
* If we have a `title` make it larger font and red
* Otherwise style it as code

`root-mdx.js`

```
// MORE CODE

const myH2 = props => {
  if (props.title) {
    return (
      <h2 {...props} style={{ fontSize: '2rem', color: 'red' }}>
        {props.children}
      </h2>
    )
  }
  return (
    <h2 {...props} className="code">
      {props.children}
    </h2>
  )
}

// MORE CODE
```

## Modularize it!
* We'll take our code and externalize it and bring it in

`Complete/index.js`

* See how we bring in the Headings.js using `*`?
    - This does something cool in `Headings.js` we export multiple headings `myH2` and `myH4` and by using the wildcard `*` we have access to them all (without naming them all)
    - **note** This `*` technique is a React thing and not a Gatsby thing

`Components/index.js`

```
import Counter from './Counter'
import LikeButton from './LikeButton'
import { RegVideo, Video } from './Video'
import * as Headings from './Headings'
import Code from './Code'
import Blockquote from './Blockquote'
import PrismSetup from './PrismSetup'
export {
  Counter,
  LikeButton,
  RegVideo,
  Video,
  Headings,
  Code,
  Blockquote,
  PrismSetup,
}
```

`Complete/Headings.js`

* We have our logic and our Styled Components
* We destructure `children` and `title` off of **props**

```
import React from "react"
import styled from "styled-components"

const myH2 = ({ children, title }) => {
  if (title) {
    return (
      <HeadingTwo>
        <h2>{children}</h2>
        <div className="underline"></div>
      </HeadingTwo>
    )
  }
  return (
    <h2
      style={{
        margin: "2rem 0",
        color: "var(--clr-grey-5)",
      }}
    >
      {children}
    </h2>
  )
}
const HeadingTwo = styled.div`
  margin: 2rem 0;
  .underline {
    width: 5rem;
    height: 5px;
    background: var(--clr-primary-5);
  }
`
const myH4 = props => {
  return (
    <h3 style={{ margin: "2rem 0", color: "var(--clr-primary-5)" }}>
      {props.children}
    </h3>
  )
}

export { myH2, myH4 }
```

`root-mdx.js`

```
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Headings } from './src/components/Complete'

const components = {
  h2: Headings.myH2,
}

export const wrapMDX = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}
```

* **we are cheating a bit** Before we used the spread operator to spread out all the props and then we got the error where we needed to say `title="true"` but since we know we only need `children` and `title` we don't need the spread operator and we can just use `title` and we don't get the error
    - So we can do this and not get the warning/error we received before:

`pages/post.mdx`

```
// MORE CODE

<h2>regular heading</h2>
<h2 title>title heading</h2>

// MORE CODE
```

## Let's add h4
`pages/post.mdx`

```
// MORE CODE

<h2>regular heading</h2>
<h2 title>title heading</h2>
<h4>This is an h4 styled with MDX</h4>

// MORE CODE
```

* And we add this:

`root-mdx.js`

```
// MORE CODE

const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
}

// MORE CODE
```

### See what's happening behind the scenes
`components/Headings.js`

* To illustrate the point that you don't have to return an `h4` we show we actually take in a `h4` but spit out a `h3` (you are the king of the castle!)
* We show inline CSS here but you decide how you want to style it and what style library you want to use
* **VERY IMPORTANT** Now whenever you use a `h4` you will return the below code for every single `h4` (for page, for component, for anything)

```
// MORE CODE
const myH4 = props => {
  return (
    <h3 style={{ margin: "2rem 0", color: "var(--clr-primary-5)" }}>
      {props.children}
    </h3>
  )
}

export { myH2, myH4 }
```

## Incline code
* Let's do a code block (surrounded by backticks)
* You'll see it looks like code
* Inspect it

```
<p><code>console.log('hello world')</code></p>
```

* `docs` show you what components can be customized
* https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/

## Don't do this
* Watch out for this error

`root-mdx.js`

```
// MORE CODE

const Testing = ({ children }) => {
  return <div className="code">{children}</div>
}
const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  inlineCode: Testing,
}

// MORE CODE
```

* You will get **WARNING** `index.js:1 Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.`
* To fix we can return a `code`

```
// MORE CODE

const Testing = ({ children }) => {
  return <code className="code">{children}</code>
}

// MORE CODE
```

* And the warning goes away in the console

## Here's how we style code
`root-mdx.js`

```
// MORE CODE

import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Headings, Code } from './src/components/Complete'

// const Testing = ({ children }) => {
//   return <code className="code">{children}</code>
// }
const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  inlineCode: Code,
}

// MORE CODE
```

* And here is how we styled `Code.js`

```
import React from "react"
const Code = ({ children }) => {
  return (
    <code
      style={{
        background: "var(--clr-grey-10)",
        color: "var(--clr-grey-5)",
        padding: "1rem",
        borderRadius: "var(--radius)",
      }}
    >
      {children}
    </code>
  )
}

export default Code
```

## Setting up blockquote
`root-mdx.js`

```
// MORE CODE

const Testing = ({ children }) => {
  return <code className="code">{children}</code>
}

const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  blockquote: Testing,
}

// MORE CODE
```

* But we don't want to use `code` but a `div`

```
// MORE CODE

const Testing = ({ children }) => {
  return <div className="code">{children}</div>
}

// MORE CODE
```

* And now it looks like styling is happening because of the `code` class

## Make it look cool

```
// MORE CODE

import { Headings, Code, Blockquote } from './src/components/Complete'

const Testing = ({ children }) => {
  return <div className="code">{children}</div>
}

const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  blockquote: Blockquote,
}

// MORE CODE
```

![four different blockquotes](https://i.imgur.com/xo0Iipb.png)

`Blockquote.js`

```
import React from "react"
import { FiInfo } from "react-icons/fi"
import { TiWarningOutline } from "react-icons/ti"
import { GoQuote } from "react-icons/go"
import styled from "styled-components"

const Blockquote = ({ children, display }) => {
  if (display === "warning")
    return (
      <Wrapper>
        <div className="container warning">
          <TiWarningOutline className="icon" />
          {children}
        </div>
      </Wrapper>
    )
  if (display === "info")
    return (
      <Wrapper>
        <div className="container info">
          <FiInfo className="icon" />
          {children}
        </div>
      </Wrapper>
    )
  if (display === "default") {
    return (
      <Wrapper>
        <div className="container default">{children}</div>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <div className="quote">
          <GoQuote className="quote-icon" />
          {children}
        </div>
      </Wrapper>
    )
  }
}
const Wrapper = styled.blockquote`
  .container {
    padding: 2rem 1.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    color: var(--clr-grey-1);
    border-left: 3px solid var(--clr-grey-5);
    position: relative;
    margin: 2rem 0;
  }
  @media (min-width: 1170px) {
    .container {
      margin-left: -2rem;
      margin-right: -2rem;
    }
  }
  .icon {
    position: absolute;
    top: 0;
    left: -3px;
    background: var(--clr-white);
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid var(--clr-white);
  }
  .info {
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    border-color: var(--clr-primary-5);
    .icon {
      color: var(--clr-primary-5);
    }
  }
  .warning {
    background: #fffaeb;
    color: #513c06;
    border-color: #f7d070;
    .icon {
      color: #f7d070;
    }
  }
  .quote {
    @media (min-width: 576px) {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
    font-style: italic;
    color: var(--clr-grey-5);
    line-height: 1.8;
    word-spacing: 3px;
    font-size: 1.2rem;
    margin: 2rem 0;
    .quote-icon {
      font-size: 6rem;
      color: var(--clr-primary-5);
    }
  }
`
export default Blockquote
```
