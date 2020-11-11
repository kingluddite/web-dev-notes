# Prisma and MDX
* We want to set up our code blocks

### prism-react-renderer

* [docs prisma-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)

```
npm install --save prism-react-renderer
```

1. our code - props.children.props.children.trim()
2. language -
   props.children.props.className
   className.replace(/language-/,'')
3. theme

## Create a new file `Example.js`
`Components/Example.js`

```
import React from 'react'

const Example = () => {
  return (
    <div>
      
    </div>
  )
}

export default Example
```

## Grab the highlight from the prisma-react-renderer docs

![grab Highlight](https://i.imgur.com/f45Fzz8.png)

## Add our theme
```
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'

const Example = () => {
  return (
    <Highlight {...defaultProps} code={exampleCode} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Example
```

## Add sample code from docs
```
// MORE CODE

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();
`

const Example = () => {

// MORE CODE
```

## Now add it to our index.js
`Components/Complete/index.js`

```
// MORE CODE
import PrismSetup from './PrismSetup'
import Example from './Example'
export {
  Counter,
  LikeButton,
  RegVideo,
  Video,
  Headings,
  Code,
  Blockquote,
  PrismSetup,
  Example,
}
```

## Add to our root-mdx
`root-mdx.js`

```
import { MDXProvider } from '@mdx-js/react'
import { Headings, Code, Blockquote, Example } from './src/components/Complete'

const Testing = ({ children }) => {
  return <div className="code">{children}</div>
}

const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  blockquote: Blockquote,
  pre: Example,
}

// MORE CODE
```

* Now our code fragment is styled in our post.mdx

![styled code with prisma](https://i.imgur.com/cfWRSRr.png)

## Add a code block of multiple coding languages

```
#### Javascript

```js
// comments
const name = "john"
const channel = "coding addict"

function featuredProducts(data) {
  return data.filter(item => {
    return item.featured === true
  })
}
featuredProducts()
```

#### JSX

```jsx
import React from "react"

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
```

#### HTML

```html
<h1>hello world</h1>
<p class="random">random text</p>
<section class="contact">
  <div class="title">
    <h1>contact us</h1>
  </div>
</section>
```

#### CSS

```css
max-width: 500px;
border-radius: var(--radius);
padding: 1rem 1.5rem;
background: var(--clr-grey-10);
text-align: center;
```

* Put that at the bottom of the post

## Review the code
* They all look the same

![code blocks](https://i.imgur.com/eHEWgUs.png)

## Prisma Config
### prism-react-renderer

* [docs](https://github.com/FormidableLabs/prism-react-renderer)

```
npm install --save prism-react-renderer
```

1. our code - `props.children.props.children.trim()`
2. language -
   `props.children.props.className
      className.replace(/language-/,'')`
3. theme

## Test with console.log()
* Run it an we'll get an object for every `pre` tag we have
* We only care about one so expand one
* It's pretty complex data structure

![pre from prism](https://i.imgur.com/7tirQKl.png)

* That is why this is the path:

`props.children.props.children.trim()`

### Don't forget the `trim()`
* Trims off the extra line
* You'll see it if you leave it off in this part
    - We replace the `code` prop with our path to the pre content we want to style with prism

```
// MORE CODE

const Example = props => {
  console.log(props.children.props.children.trim())

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language="jsx"

// MORE CODE
```

## Code is the same
* Now our code is pulled in and it looks decent (but they are the exact same)
* It is because `jsx` is hard coded for all of them
* We could change it to hard coded `html` and that would fix the html page but not the others (we need to make this value dynamic)

```
// MORE CODE

const Example = props => {
  // console.log(props.children.props.children)
  // console.log(props)
  const { className } = props.children.props
  // const language = className.substring(className.indexOf('-') + 1)
  // better way using regex
  const language = className.replace(/language-/, '')
  // console.log(className.substring(className.indexOf('-') + 1))
  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={language}
    >

// MORE CODE
```

* Now if you inspect each of the sections you'll see the `pre` tag has the appropriate language class (example: `<pre class="prism-code language-html`)

![language class](https://i.imgur.com/lVi2bG0.png)

## Add a cooler theme
```
// MORE CODE

import theme from 'prism-react-renderer/themes/vsDark'

// MORE CODE

const Example = props => {

    // MORE CODE

    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={language}
      theme={theme}
    >

// MORE CODE
```

* And now it looks much better

## Try other styles
* Just remove `vsDark` to see other choices from Intellisense dropdown

## Adding custom CSS to improve how the code looks
`root-mdx.js`

* We bring in a custom styled pre

```
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  Headings,
  Code,
  Blockquote,
  PrismSetup,
} from './src/components/Complete'

const Testing = ({ children }) => {
  return <div className="code">{children}</div>
}

const components = {
  h2: Headings.myH2,
  h4: Headings.myH4,
  blockquote: Blockquote,
  pre: PrismSetup,
}

export const wrapMDX = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>
}
```

* And here is the custom coded `pre`

```
import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/vsDark"
import styled from "styled-components"

const PrismWrapper = props => {
  const className = props.children.props.className
  const language = className.split("-")[1]

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <Container>
            <Pre className={className} style={style}>
              <div className="code-tab">{language}</div>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Pre>
          </Container>
        )
      }}
    </Highlight>
  )
}
// Styling Only
const Pre = styled.pre`
  background: #1e1e1e;
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  margin: 3rem 0;
  font-size: 0.9rem;
  font-family: "Courier New", Courier, monospace;
  overflow-x: scroll;
  .token-line {
    line-height: 1.5;
  }
  .code-tab {
    position: absolute;
    top: 0;
    right: 5%;
    color: rgb(156, 220, 254);
    font-size: 1rem;
    font-weight: 700;
    transform: translateY(-100%);
    text-transform: uppercase;
    padding: 0.05rem 0.85rem 0;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
    background: #1e1e1e;
  }
`
const Container = styled.article`
  position: relative;
`

export default PrismWrapper
```
