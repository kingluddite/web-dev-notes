# Better Structure
* src
    - movies
        + actions.js
        + Movie.js
        + MovieDetail.js
        + reducer.js
    - toggle
        + actions.js
        + reducer.js
        + Toggle.js

`src/movies/actions.js`

```
export const GET_MOVIES = 'GET_MOVIES';

export function getMovies() {
  return async function (dispatch) {
    const res = await fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=6bed0f87158ec0aba138db3ce714fbdd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
    );
    const movies = await res.json();
    return dispatch({
      type: 'GET_MOVIES',
      data: movies.results,
    });
  };
}
```

`src/movies/reducer.js`

```
import { GET_MOVIES } from './actions';

const initialState = {
  movies: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: data,
      };
    default:
      return state;
  }
}
```

`src/toggle/actions.js`

```
export const TOGGLE_MESSAGE = 'TOGGLE_MESSAGE';

export function toggleMessage() {
  return {
    type: 'TOGGLE_MESSAGE',
  };
}
```

`src/toggle/reducer.js`

```
import { TOGGLE_MESSAGE } from './actions';

const initialState = {
  messageVisibility: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_MESSAGE:
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      };
    default:
      return state;
  }
}
```

`src/toggle/Toggle.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleMessage } from './actions';
import { getMovies } from '../movies/actions';
// MORE CODE
```

`rootReducer.js`

```
import { combineReducers } from 'redux';

import toggle from './toggle/reducer';
import movies from './movies/reducer';

const rootReducer = combineReducers({
  toggle,
  movies,
});

export default rootReducer;
```

`App.js`

```
// MORE CODE
import MoviesList from './movies/MoviesList';
import MovieDetail from './movies/MovieDetail';
import Toggle from './toggle/Toggle';
// MORE CODE
```

https://ironcovesolutions.com/case-studies/office-365-migration-okta (no content)
https://ironcovesolutions.com/technology/skype-for-business
https://ironcovesolutions.com/technology/plans/proofpoint/standard(latin)
https://ironcovesolutions.com/technology/plans/proofpoint/business (latin)
https://ironcovesolutions.com/technology/plans/proofpoint/enterprise(latin)
https://ironcovesolutions.com/technology/plans/dropbox/standard(latin)
https://ironcovesolutions.com/technology/plans/dropbox/advanced(latin)
https://ironcovesolutions.com/technology/plans/dropbox/enterprise(latin)
https://ironcovesolutions.com/technology/plan/gsuite/standard(latin)
https://ironcovesolutions.com/technology/plan/gsuite/business(latin)
https://ironcovesolutions.com/technology/plans/microsoft/office-365-e1(latin)
https://ironcovesolutions.com/technology/plans/microsoft/office-365-e3(latin)
https://ironcovesolutions.com/technology/plans/microsoft/office-365-e5(latin)
https://ironcovesolutions.com/technology/plans/microsoft/office-365-plan-1(latin)
https://ironcovesolutions.com/technology/plans/okta/advanced(latin)
https://ironcovesolutions.com/technology/plans/okta/enterprise(latin)
https://ironcovesolutions.com/technology/plans/voltage/standard(latin)
https://ironcovesolutions.com/technology/plans/auth0/standard(latin)
https://ironcovesolutions.com/expertise/file-server-migration (video)
https://ironcovesolutions.com/expertise/cloud-migration (latin)
https://ironcovesolutions.com/expertise/developer (spell check)
https://ironcovesolutions.com/success (better text)

