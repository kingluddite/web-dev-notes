# Sidebar
* Sidebar is using position: fixed
    - So it doesn't matter if you position it above or below the navbar


`main.css`

```
// MORE CODE

.sidebar {
  background: var(--clr-grey-10);
  position: fixed; /* position is fixed! */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: grid;
  place-items: center;
  opacity: 0;
  transition: var(--transition);
  transform: translateX(-100%);
}
// MORE CODE
```

`Sidebar.js`

```
import React from "react"
import Links from "../constants/links"
import SocialLinks from "../constants/socialLinks"
import { FaTimes } from "react-icons/fa"
const Sidebar = () => {
  return (
    <aside className={`sidebar show-sidebar`}>
      <button className="close-btn">
        <FaTimes />
      </button>
      <div className="side-container">
        <Links styleClass="sidebar-links" />
        <SocialLinks styleClass="sidebar-icons" />
      </div>
    </aside>
  )
}

export default Sidebar
```

* If `show-sidebar` is removed we don't see sidebar
    - This is temporarily hard coded

## Hard code a ternary operator
`Sidebar.js`

```
// MORE CODE

const Sidebar = () => {
  const isOpen = false
  return (
    <aside className={`sidebar ${isOpen ? "show-sidebar" : ""} `}>
// MORE CODE
```

* But now our Sidebar will never appear
* How can we change `isOpen` to false?
