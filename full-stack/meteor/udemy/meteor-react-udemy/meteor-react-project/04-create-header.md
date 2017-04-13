# Create Header Component

## Review Wireframe
![wireframe](https://i.imgur.com/Xoxn6pr.png)

`client/components/Header.js`

```
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
       <nav className="nav navbar-default">
         <div className="navbar-header"><a href="" className="navbar-brand">Markbin</a>
         </div>
         <ul className="nav navbar-nav">
           <li>
             <a href="#">Sign up</a>
           </li>
           <li>
             <a href="#">Create Bin</a>
           </li>
         </ul>
       </nav>
    );
  }
}

export default Header;
```

## Import Header into App

`client/components/App.js`

```
import React from 'react';

import Header from './Header';

export default () => {
  return (
     <div>
       <Header />
     </div>
  );
};
```

### View in Browser

You should see this:

![basic header in app](https://i.imgur.com/pvW518S.png)

## Install bootstrap
`$ meteor add twbs:bootstrap@3.3.6`

And now your Header looks like:

![header with bootstrap](https://i.imgur.com/hfXG04v.png)


