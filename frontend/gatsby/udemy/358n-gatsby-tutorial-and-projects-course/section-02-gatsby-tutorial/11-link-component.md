# Link Component
* Typing the URL to get the pages isn't good enough
* We need a navbar

## External link and internal link
* `a` refreshes page
* Gatsby is using the Reach router under the hood
* React is a SPA (Single Page app)

`pages/index.js`

```
import React from 'react';
import { Link } from 'gatsby';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <a href="https://cnn.com">CNN</a>
      </div>
      <Link to="/blog">Blog</Link>
    </div>
  );
}
```

`pages/blog.js`

```
import React from 'react';
import { Link } from 'gatsby';

const blog = () => {
  return (
    <div>
      <h1>Blog</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default blog;
```

* With Link we can link internally
* `Link` is a named export
* We use the `to` prop and pass it the relative path
* `a` tags are for external links (i.e http://cnn.com)
