# Sidebar animation
* It is not working correctly
* We need a way to delay the animation happening until `isOpen` is on the page

`Sidebar.js`

```
import React from "react"
import Links from "../constants/links"
import SocialLinks from "../constants/socialLinks"
import { FaTimes } from "react-icons/fa"
const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "show-sidebar" : ""} `}>
      <button className="close-btn" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <div className="side-container">
        <Links styleClass={`${isOpen ? "sidebar-links" : ""}`} />
        <SocialLinks styleClass={`${isOpen ? "sidebar-icons" : ""} `} />
      </div>
    </aside>
  )
}

export default Sidebar
```

* This works because we are now delaying the animation instead of running it right away
