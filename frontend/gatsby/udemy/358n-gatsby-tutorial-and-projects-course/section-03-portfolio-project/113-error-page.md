# Error page

`404.js`

```
import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import SEO from "../components/SEO"

const Error = () => {
  return (
    <Layout>
      <main className="error-page">
        <div className="error-container">
          <h1>oops it's a dead end</h1>
          <Link to="/" className="btn">
            back home
          </Link>
        </div>
      </main>
    </Layout>
  )
}

export default Error
```

* You won't see this if you navigate to a bad URL
* But there is a link to see what the page looks like
* You will see this page in production (after you deploy)
* You could also see this with `$ gatsby build` and then `$ gatsby source`
