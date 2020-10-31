# Toggle functionality for sidebar
* Same as previous project

`Layout.js`

```
// MORE CODE

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleSidebar = () => {
    console.log('test')
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}></Sidebar
// MORE CODE
```

`Navbar.js`

```
// MORE CODE

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="mdx logo" />
          </Link>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
// MORE CODE
```

`Sidebar.js`

```
// MORE CODE

const Sidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'showSidebar' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <IoMdClose />
      </button>
// MORE CODE
```


