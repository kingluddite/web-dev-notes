# Navbar categories
* We want to add Categories under the mobile Posts menu in the Navbar

## "children" in react
`Layout.js`

```
// MORE CODE

const Layout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleSidebar = () => {
    console.log('test')
    setIsOpen(!isOpen)
  }

    return (
      <>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main>{children}</main>
        <Footer />
      </>
    )
  }

// MORE CODE
```

* We have a `children` prop and since we are wrapping each and every page, whatever I have as the contents of that page, I just place it in the `children`
* So `children` is essentially the **contents** of the page
* We can do the same thing with our links

`src/constants/links.js`

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

// MORE CODE
```

* The `styleClass` adds a style to my unordered list
* But we also have the `children`
    - This means whatever I place within the links, I can specifically say where I want to render that
        + So if there are children, place it right after the `Posts` Link

## We'll add those categories in our sidebar
`components/Sidebar.js`

```
import React from 'react'
import Links from '../constants/links'
import Categories from '../components/Categories'
import { IoMdClose } from 'react-icons/io'
const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'showSidebar' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <IoMdClose />
      </button>
      <div className="sidebar-container">
        <Links styleClass="sidebar-links" />
        {/* CODE HERE */}
      </div>
    </aside>
  )
}

export default Sidebar
```

* We just drop our Categories component inside (as children) of our `Links` component

`Sidebar.js` (this is for mobile)

```
// MORE CODE

const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'showSidebar' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <IoMdClose />
      </button>
      <div className="sidebar-container">
        <Links styleClass="sidebar-links">
          <Categories />
        </Links>
      </div>
    </aside>
  )
}

// MORE CODE
```

![categories as children](https://i.imgur.com/sAubfLB.png)
