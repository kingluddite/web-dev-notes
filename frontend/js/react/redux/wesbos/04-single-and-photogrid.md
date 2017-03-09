# Creating Single and PhotoGrid Components

`PhotoGrid`

```
import React from 'react';

class PhotoGrid extends React.Component {
  render() {
    return (
      <div className="photo-grid">
        PhotoGrid
      </div>
    )
  }
}

export default PhotoGrid;
```

`Single.js`

```
import React from 'react';

class Single extends React.Component {
  render() {
    return (
      <div className="single-photo">
        Single
      </div>
    )
  }
}

export default Single;
```

## Routing
We will always see `Main.js` (_kind of like our parent Component_) 

So the child (`PhotoGrid.js` or `Single.js`) will be handle by **React Router**

`Main.js`

```
import React from 'react';
import { Link } from 'react-router';

class Main extends React.Component {
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
}

export default Main;
```

**problem**

If we had a single Component `<Single this.props />` we could pass down `props` to the **child Component** but we can't do that when we use `this.props.children`

**solution**

`{React.cloneElement(this.props.children, this.props)}`

* This will take any `props` that are coming down from the **parent Component** and they'll pass the `props` down to our **child Components** (_in our case the `Single` or `PhotoGrid` Components_)

## After saving Erro
`Cannot read property 'props of undefined`

* We get this because we have yet to pass our `React.cloneElement` any children

**note** If we made the following change (_and added children to `Main`, the error would be gone_)

`Main.js`

```
import React from 'react';

import { render } from 'react-dom';

// import css
import css from './styles/style.styl';

// import Components
import Main from './components/Main';

render(<Main><p>yo</p></Main>, document.getElementById('root'));
```

After changing `Main.js` put it back the way it was before:

`render(<Main />, document.getElementById('root'));`
