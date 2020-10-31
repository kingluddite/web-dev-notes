# Newsletter
1. We'll first set up a return (form)
2. We'll focus on values we need to use

## Add eslint
* https://reactsensei.com/add-eslint/


## We use `Layout` for pages
`pages/newsletter.js`

```
import React from 'react'
import Layout from '../components/Layout'

const NewsLetterPage = () => {
  return (
    <Layout>
      <section className="newsletter-page">
        <div className="page-center">
          <h2>Get the latest stories to your inbox</h2>
          <h4>Will send important</h4>
          <form className="contact-form" action="">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your name"
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your email"
            />
            <button type="submit" className="btn form-control">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

export default NewsLetterPage
```

## Form will be submitted to Netlify
* The user will enter their name and email and submit and get redirected to our success page

### Have a git repo
* Blog up the existing git and create a new git repo `$ rm -rf .git`
* `$ git init`
* `$ hub create` to create a remote git repo on github
* Add commit and push
* Search for git repo on Netlify and add
* Make subdomain on Netlify more user friendly
* Click on Forms page

## Add netlify code to gatsby react code

`pages/newsletters.js`

```
// MORE CODE

          <form className="contact-form"
            name="testing-contact"
            method="post"
            netlify-honeypot="bot-field"
            data-netlify="true"
            action="/success">
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="testing-contact" />
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your name"
            />

// MORE CODE
```

`pages/success.js`

```
import React from 'react'
import Layout from '../components/Layout'
import {Link} from 'gatsby'
const SuccessPage = () => {
  return <Layout>
    <section className="success-page">
      <div className="page-center">
        <h2>your submission was received !</h2>
        <Link to="/" className="btn">back home</Link>
      </div>
    </section>
  </Layout>
}

export default SuccessPage
```

## build
`$ gatsby clean && gatsby build`

* Drag/drop public into Netlify
* Choose how you'll be notified (email)
* Submit form

### Look under forms
* You'll see the information added
