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
