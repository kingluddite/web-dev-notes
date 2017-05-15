# React Router with Codesplitting

```
<Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={ArtistMain} />
        <Route path="artists/new" component={ArtistCreate} />
        <Route path="artists/:id" component={ArtistDetail} />
        <Route path="artists/:id/edit" component={ArtistEdit} />
      </Route>
    </Router>
```

* `bundle.js` will be for `Home` and `ArtistMain`
* As user navigates around the site, we'll dynamically split up code for `ArtistCreate`, `ArtistDetail` and `ArtistEdit`
* In React Router you can organize all your different navigation or all your different routes using JSX
    - But in order to use codesplitting we'll move away from JSX and just use `plain routes`
    - We will transform the above JSX into a plain JavaScript object
        + fyi (React Router is doing this anyway with the JSX we use for creating routes in React Router)

```
import React from 'react';
import { Router, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistCreate')
          .then(module => cb(null, module.default));
      },
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default));
      },
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default));
      },
    },
  ],
};

const Routes = () => <Router history={hashHistory} routes={componentRoutes}/>;

export default Routes;
```

* We remove the imports to the Components because they are now being dynamically loaded
* We keep Home and ArtistMain because they are show as soon at the user comes to the root route of our Application

`$ npm run build`

`$ npm run serve`

* Home page shows

![home page js](https://i.imgur.com/bRKuYoP.png)

* ArtistDetail (_click play button to right of artist_) shows

![artist detail](https://i.imgur.com/NFCnNw5.png)

* CreateArtist (_click 'Create Artist' button_)

![create artist](https://i.imgur.com/tnquhl9.png)

* EditArtist (_click Edit button_)
![edit artist](https://i.imgur.com/xLVuPAl.png)

### When do you need to use codesplitting?
If you have a small app with a few pages, you don't need codespitting

* The code does look repititive but we can't really create a helper because webpack doesn't have the ability to handle much string concatenation or interplation becuase it is very static analysic (_literally just reading over your code_)




