# Formspree
* Free plan
* Sign Up
* verify email
* name your project
* Name your form

## We need the `action` and `value` in generated form
* **important** Your id (inside the endpoint)

## How it works
* Add the action with the `id`
    - this will be used to send to your email
    - use the `name` attribute and it's corresponding email to capture what was sent in the email

## You can test locally
* This is a big perk

## Add the action
`contact.js`

```
import React from "react"
import Layout from "../components/Layout"

const contact = () => {
  return (
    <Layout>
      <section className="contact-page">
        <article className="contact-form">
          <h3>get in touch</h3>
          <form action="https://formspree.io/f/abcpeveg" method="POST">
            <div className="form-group">
              <input
                name="name"
                type="text"
                placeholder="name"
                className="form-control"
              />
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="message"
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn btn">
              submit here
            </button>
          </form>
        </article>
      </section>
    </Layout>
  )
}

export default contact
```

* Make sure each form field has a `name` attribute

## Test
1. Go to contact page
2. Fill in form
3. Submit
4. Check your email (the one used to create formspree account)
5. Click on formspree email to see a form filled out with values
6. Click submissions in formspree dashboard to see all submissions
