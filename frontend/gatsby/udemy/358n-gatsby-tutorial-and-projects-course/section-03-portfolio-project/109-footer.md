# Footer
* Add it to Layout

`Layout.js`

```
import React from "react"
// import "../css/main.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
```

`Footer.js`

```
import React from "react"
import SocialLinks from "../constants/socialLinks"
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <SocialLinks styleClass="footer-links"></SocialLinks>
        <h4>
          copyright&copy;{new Date().getFullYear()}
          <span>WebDev</span> all rights reserved
        </h4>
      </div>
    </footer>
  )
}

export default Footer
```

