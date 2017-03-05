# Creating Single and PhotoGrid Components

`PhotoGrid`

```
import React from 'react';
import { Link } from 'react-router';

const PhotoGrid = React.createClass({
  render() {
    return (
      <div className="photo-grid">
        PhotoGrid
      </div>
    )
  }
});

export default PhotoGrid;
```

`Single.js`

```
import React from 'react';
import { Link } from 'react-router';

const Single = React.createClass({
  render() {
    return (
      <div className="single-photo">
       Single
      </div>
    )
  }
});

export default Single;
```

## Routing
We will always see `Main.js` (kind of like our parent component) 

So the child (`PhotoGrid.js` or `Single.js`) will be handle by ReactRouter

Inside `Main.js` we would do this:

```
import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Reduxstagram</Link>
        </h1>
        {this.props.children}
      </div>
    )
  }
});

export default Main;
```

**problem**

If we had a single component `<Single this.props />` we could pass down props to the child component but we can't do that when we use `this.props.children`

**solution**

`{React.cloneElement(this.props.children, this.props)}`

* This will take any `props` that are coming down from the parent component and they'll pass the `props` down to our child components (in our case the Single or PhotoGrid components)

## After saving Erro
`Cannot read property 'props of undefined`

* We get this because we have yet to pass our `React.cloneElement` any children

**note** If we made the following change (and added children to Main, the error would be gone)

`Main.js`

```
import React from 'react';

import { render } from 'react-dom';

// import css
import css from './styles/style.styl';

// import components
import Main from './components/Main';

render(<Main><p>yo</p></Main>, document.getElementById('root'));
```

After changing `Main.js` put it back the way it was before:

`render(<Main />, document.getElementById('root'));`
