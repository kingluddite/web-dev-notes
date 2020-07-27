# Render Intro
* StaticQuery
* PageQuery
* useStaticQuery - (**note** most of the time you will be using this) This was added by Gatsby team when the React hooks came out (this just provides a more straight up way of setting up the StaticQuery)
* **note** We'll review the traditional StaticQuery for legacy code

## Examples setup
* Create a new folder called `examples`
* Create a new page called `examples.js`

`pages/examples.js`

```
import React from 'react';

const examples = () => {
  return (
    <div>
      <h1>Hello from examples page</h1>
    </div>
  );
};

export default examples;
```

* And add to `Navbar`

```
// MORE CODE

 <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/examples">Examples</Link>
        </li>
      </ul>
// MORE CODE
```

