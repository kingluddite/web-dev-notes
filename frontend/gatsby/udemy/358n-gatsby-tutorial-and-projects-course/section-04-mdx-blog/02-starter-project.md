# Starter Project
* [link to starter files](https://github.com/john-smilga/starter-project-gatsby-mdx-blog-course-project)
* [link to finished files](https://gatsby-mdx-blog-course-project.netlify.app/)

`$ npm i`
`$ gatsby develop`

## homepage
`localhost:8000` ---> Home Page

* Ignore the warnings

`pages/index.js`

```
// MORE CODE

const IndexPage = () => {
  return <Layout></Layout>
}

export default IndexPage
// MORE CODE
```

* VS Code - navigate to Layout by clicking on Layout.js import and type `gf`

`Layout.js`

```
// MORE CODE

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {/* <Sidebar></Sidebar> */}
      <main>{children}</main>
      {/* <Footer></Footer> */}
    </>
  )
}
// MORE CODE
```

## Navbar
`Navbar.js`

```
import React from 'react'
import { Link } from 'gatsby'
import { FaBars } from 'react-icons/fa'
import logo from '../assets/logo.svg'
import Links from '../constants/links'
import SocialLinks from '../constants/socialLinks'
const Navbar = ({ toggle }) => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="mdx logo" />
          </Link>
          <button className="toggle-btn">
            <FaBars />
          </button>
        </div>
        <Links styleClass="nav-links" />
        <SocialLinks styleClass="nav-icons" />
      </div>
    </nav>
  )
}

export default Navbar
```

`constants/links.js`

* You can hard code your links if you want
* We pass in the `styleClass`
* **note** The use of `children` will be covered later

```
import React from "react"
import { Link } from "gatsby"
const Links = ({ styleClass, children }) => {
  return (
    <ul className={styleClass}>
      <li>
        <Link to="/" className="page-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/posts" className="page-link">
          Posts
        </Link>
        {children}
      </li>
      <li>
        <Link to="/newsletter" className="page-link">
          Newsletter
        </Link>
      </li>
      <li>
        <Link to="/post" className="page-link">
          Post
        </Link>
      </li>
    </ul>
  )
}

export default Links
```

`constants/socialLinks.js`

* Hard code like above
* But here we also gave social links their own distinctive colors

```
import React from "react"
import {
  FaFacebookSquare,
  FaDribbbleSquare,
  FaTwitterSquare,
} from "react-icons/fa"
const SocialLinks = ({ styleClass }) => {
  return (
    <ul className={styleClass}>
      <li>
        <a href="https://twitter.com">
          <FaFacebookSquare className="social-icon facebook-icon"></FaFacebookSquare>
        </a>
      </li>
      <li>
        <a href="https://twitter.com">
          <FaDribbbleSquare className="social-icon dribble-icon"></FaDribbbleSquare>
        </a>
      </li>
      <li>
        <a href="https://twitter.com">
          <FaTwitterSquare className="social-icon twitter-icon"></FaTwitterSquare>
        </a>
      </li>
    </ul>
  )
}
export default SocialLinks
```

## Navbar CSS
`main.css`

```
// MORE CODE

/*
===============
Navbar
===============
*/
.navbar {
  height: 5rem;
  display: flex;
  align-items: center;
  background: transparent;
}
.nav-center {
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
}
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-logo {
  display: block;
  height: 40px;
}
.nav-logo img {
  height: 100%;
}
.toggle-btn {
  font-size: 2rem;
  background: transparent;
  border-color: transparent;
  color: var(--clr-primary-5);
  cursor: pointer;
  transition: var(--transition);
}
.toggle-btn:hover {
  color: var(--clr-primary-3);
}
.nav-links {
  display: none;
}
.nav-icons {
  display: none;
}

.facebook-icon {
  color: #3b5998;
}
.twitter-icon {
  color: #00acee;
}
.dribble-icon {
  color: #ea4c89;
}
@media screen and (min-width: 800px) {
  .toggle-btn {
    display: none;
  }
  .nav-center {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 2rem;
    align-items: center;
  }
  .nav-links {
    display: flex;
    align-items: center;
  }
  .page-link {
    margin-right: 1rem;
  }
  .page-link {
    color: var(--clr-black);
    font-weight: bold;
    letter-spacing: var(--spacing);
    font-size: 1rem;
    transition: var(--transition);
    font-family: var(--ff-secondary);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  .page-link:hover {
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
  }
  .nav-icons {
    display: flex;
    justify-content: space-between;
  }
  .nav-icons .social-icon {
    font-size: 1.5rem;
    transition: var(--transition);
    margin-left: 0.5rem;
  }
  .nav-icons .social-icon:hover {
    color: var(--clr-primary-5);
    transform: translateY(-5px);
  }
}
// MORE CODE
```

## Sidebar
`Sidebar.js`

```
import React from 'react'
import Links from '../constants/links'
import Categories from '../components/Categories'
import { IoMdClose } from 'react-icons/io'
const Sidebar = () => {
  return (
    <aside className={`sidebar`}>
      <button className="close-btn">
        <IoMdClose />
      </button>
      <div className="sidebar-container">
        <Links styleClass="sidebar-links" />
      </div>
    </aside>
  )
}

export default Sidebar
```

* Make sure you can see the Sidebar component (we'll uncomment it)

`Layout.js`

```
// MORE CODE

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
// MORE CODE
```

* The we hardcode the `showSidebar` class name so we can see it

`Sidebar.js`

```
// MORE CODE

const Sidebar = () => {
  return (
    <aside className={`sidebar showSidebar`}>
// MORE CODE
```
