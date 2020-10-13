# Contact Page
`pages/contact.js`

```
import React from "react"
import Layout from "../components/Layout"

const contact = () => {
  return (
    <Layout>
      <section className="contact-page">
        <article className="contact-form">
          <h3>get in touch</h3>
          <form action="https://formspree.io/f/moqpeveg" method="POST">
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
