# Using index file to save writing paths
* This is a "react thing"

## Inside a folder you have an `index.js` file
* This will will import all the other components and also export them

`components/Complete/index.js`

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

* This saves us from accessing a component with

`import Video from 'components/Complete/Video/Video`

* Instead we can just point to `Complete` like this:

`import Video from 'components/Complete`

* I can pick and choose what I need to bring in and this will save me from having to type lines of code

`import Video, Code, Blockquote, {RegVideo } from 'components/Complete`

* If I didn't use the above I would have to type

```
import { Video, RegVideo} from 'components/Complete/Video'
import Code from 'components/Complete/Code'
import Blockquote from 'components/Complete/Blockquote'
```

## We will now use styled components
* [gatsby docs](https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/)

### Install styled components
`$ npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components`

* Add this to `gatsby-config.js`

```
// MORE CODE

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
}
// MORE CODE
```

**note** styled components do not affect logic, they only apply style

### Benefits
* Never say it doesn't work because styled component doesn't work (has nothing to do with logic)
* Just put all you logic inbetween you styled components and it will be styled
* This will keep us from putting all the styles inside one large file
* We also can avoid adding a ton of classes to the JSX
* The style component will style the component locally (using the styled component)

### Here is an example of a component using styled components
`Complete/Counter.js`

```
import React from "react"
import styled from "styled-components"
const Counter = () => {
  const [count, setCount] = React.useState(0)
  return (
    <Wrapper>
      <h1>counter</h1>
      <span id="value">{count}</span>
      <div className="btn-container">
        <button className="btn dec-btn" onClick={() => setCount(count - 1)}>
          decrease
        </button>
        <button className="btn reset-btn" onClick={() => setCount(0)}>
          reset
        </button>
        <button className="btn inc-btn" onClick={() => setCount(count + 1)}>
          increase
        </button>
      </div>
    </Wrapper>
  )
}

// Styling Only

const Wrapper = styled.div`
  max-width: 500px;
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
  background: var(--clr-grey-10);
  text-align: center;
  #value {
    font-size: 6rem;
    font-weight: bold;
  }
  .btn {
    margin: 0.5rem;
  }
  .dec-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
  }
  .dec-btn:hover {
    background: var(--clr-red-light);
    color: var(--clr-red-dark);
  }
  .inc-btn {
    background: var(--clr-green-dark);
    color: var(--clr-white);
  }
  .inc-btn:hover {
    background: var(--clr-green-light);
    color: var(--clr-green-dark);
  }
  .reset-btn {
    background: var(--clr-black);
    color: var(--clr-white);
  }
  .reset-btn:hover {
    background: var(--clr-grey-5);
    color: var(--clr-white);
  }
`

export default Counter
```

## Counter and Like button
`pages/post.mdx`

```
// MORE CODE
</div>

<h2> React Components </h2>

<Counter />

``````jsx
import React from "react"
import styled from "styled-components"
import { AiOutlineLike } from "react-icons/ai"
const LikeButton = () => {
  const [value, setValue] = React.useState(0)
  return (
    <Wrapper>
      <div>
        <button onClick={() => setValue(value + 1)}>
          <AiOutlineLike />
        </button>
        <p>
          Liked the post?
          <br />
          Click thumbs up few times
        </p>
      </div>
      <span>+{value}</span>
    </Wrapper>
  )
}
``````

<LikeButton />

</section>
```



