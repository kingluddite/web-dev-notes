# Update Testimonial

## YML file
* You need to update the YML config file

`static/admin/config.yml`

```
backend:
  name: github
  repo: kingluddite/vlad-cgi

media_folder: static/assets/images
public_folder: /assets/images

collections:
  - name: blog
    label: Blog
    folder: blog
    create: true
    fields:
      - { name: path, label: Path }
      - { name: date, label: Date, widget: date }
      - { name: title, label: Title }
      - { name: body, label: Body, widget: markdown }

  - name: "pages"
    label: "Pages"
    files:
      - file: "src/pages/reel/index.md"
        label: "Reel Page"
        name: "reel"
        fields:
          - {label: "Template Key", name: "templateKey", widget: "hidden", default: "reel-page"}
          - {label: Title, name: title, widget: string}
          - {label: Heading, name: heading, widget: string}
          - {label: Description, name: description, widget: string}
          - {label: Testimonials, name: testimonials, widget: list, fields: [{label: Quote, name: quote, widget: string}, {label: Author, name: author, widget: string}]} 
      - file: "src/pages/resume/index.md"
        label: "Resume Page"
        name: "resume"
        fields:
          - {label: "Template Key", name: "templateKey", widget: "hidden", default: "reel-page"}
          - {label: Title, name: title, widget: string}
          - {label: Heading, name: heading, widget: string}
          - {label: Description, name: description, widget: string}
          - {label: MyName, name: my_name, widget: string}
          - {label: MySkills, name: my_skills, widget: string}
          - {label: Statement, name: statement, widget: string}
```

* Add a reel page template

`src/templates/reel-page.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Testimonials from '../components/Testimonials';

// import logo from '../assets/images/cgvlad-logo.png';

export const ReelPageTemplate = ({
  title,
  heading,
  description,
  testimonials
}) => (
  <>
    <Helmet title={`${title} | `} />
    <div id="main" className="alt-colors">
      <section id="section-one">
        <div className="inner">
          <h2>{title}</h2>
        </div>
      </section>
      <section id="section-two">
        <div className="inner">
          <div className="grid-wrapper">
            <div className="col-4">{description}</div>
          </div>
        </div>
      </section>
      <Testimonials testimonials={testimonials} />
    </div>
  </>
);

ReelPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  testimonials: PropTypes.array
};

const ReelPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ReelPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        testimonials={frontmatter.testimonials}
      />
    </Layout>
  );
};

ReelPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default ReelPage;

export const ReelQuery = graphql`
  query ReelPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        heading
        description
        testimonials {
          author
          quote
        }
      }
    }
  }
`;
```

* Look at all the stuff we are doing with Testimonials

`<Testimonials testimonials={testimonials} />`

* Make sure you pass the Testimonial component with the data returned from the GraphQL

## Add a reel markdown page

`src/pages/reel/index.md`

```
---
templateKey: reel-page
title: Reel
heading: Reel
description: >-
  Adipisicing quos nobis quidem magni commodi consequatur porro, distinctio!
  Repellat architecto atque sit eos omnis Accusantium tempore sed harum eius
  aliquid Enim error reiciendis esse autem quasi? Repellat error tempore
testimonials:
  - author: Elisabeth Kaurismäki
    quote: >-
      The first time I tried Kaldi’s coffee, I couldn’t even believe that was
      the same thing I’ve been drinking every morning.
  - author: Philipp Trommler
    quote: >-
      Kaldi is the place to go if you want the best quality coffee. I love their
      stance on empowering farmers and transparency.
  - author: Spock
    quote: Live Long and Prosper
---
```

## The Testimonials component
`src/components/Testimonials.js`

```
import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

// custom components
import Slider from './Slider/Slider';

const Testimonials = ({ testimonials }) => (
  <div>
    <Slider />
    {testimonials.map(testimonial => (
      <article key={v4()} className="message">
        <div className="message-body">
          {testimonial.quote}
          <br />
          <cite> – {testimonial.author}</cite>
        </div>
      </article>
    ))}
  </div>
);

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
};

export default Testimonials;
```

## Adding new testimonials
* If you log in to the admin

`http://localhost:8000/admin/#/`

![netlify cms login](https://i.imgur.com/qBgiRkp.png)

## Let users log in with Google
`![add oauth to your app with netlify on your gatsby app](https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-identity-widget/`

## Adding content locally
* When you are working locally you can add content in the local admin but you will not see it because it gets added to the markdown files on github
* You need to then `$ git pull origin master` to get the latest updates from the remote markdown files
* If you are making the changes on the live remote site you need to remember to pull those changes locally when working locally

`$ git pull origin master` should be the first thing you do when working locally to ensure you have the lasted markdown updates





