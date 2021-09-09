# Adding Action Creators
* Our action creator `searchRepositories(term)` will make a request off to the NPM API
* Make sure `state` folder has
    - action-creators/ (create now)
    - action-types
    - actions
    - reducers

`src/state/action-creators/index.ts`

* We need redux thunk
    - In order to write out an asynchronous action creator because we do need to make a network request
* `dispatch`
    - This is how we (in redux) manually dispatch actions directly into the Redux store and get them all processed by a reducer

```
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const searchRepositories = (term: string) => {
  return async (dispatch: any) => {
    // we can write out as much async/await logic as we need
    // we we get a response or an error we can manually dispatch
    // some kind of action 
  }
}
```

* Inside our dispatch we will immediately dispatch and satisfy the interface `SearchRepositoriesAction`
    - Hopefully this will turn our loading flag to true and update our UI to say we are currently making a request

```
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const searchRepositories = (term: string) => {
  return async (dispatch: any) => {
    // we can write out as much async/await logic as we need
    // we we get a response or an error we can manually dispatch
    // some kind of action
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });
  };
};
```

## Let's handle our error
* All error object in JavaScript have a `message` property

```
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const searchRepositories = (term: string) => {
  return async (dispatch: any) => {
    // we can write out as much async/await logic as we need
    // we we get a response or an error we can manually dispatch
    // some kind of action
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
        // 
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};
```

## Logic for our try block
* Make sure you export the action creator

```
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
  return async (dispatch: any) => {
    // we can write out as much async/await logic as we need
    // we we get a response or an error we can manually dispatch
    // some kind of action
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      );

      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};
```

## Apply Typings to our Action Creator
* We expect our names to be an array of strings
* But our app doesn't care
* We could replace `names` with a number and it wouldn't care
    - I could put in a string or null or undefined - all with no errors
    - We need to get TS to tell us we want an array of strings only
    - So we need to get TS to understand how we are calling dispatch and do checking to make sure we are providing an appropriate action

## Let's provide a better Type annotation for the dispatch function
* Redux has a Type definition for the redux Dispatch function
* We created the `Action` union type and that type was all the different kinds of valid actions that exist inside of our project

```
import axios from 'axios';
import { Dispatch } from 'redux'; // redux Type definition
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
// MORE CODE
```

* `(dispatch: Dispatch<Action>)` is telling TS that we are going to get a function in `dispatch` that can only be called with some argument that matches this type of `Action`
* Now if you try to change the success payload with a string, null, anything but an array of strings and you'll get an error
* And if you change the error payload with anything other than a string and you'll get an error

## Next - Set up our Redux Store



