# Separate Interfaces for Actions
* We need to get rid of the `any` type for payload in our Action

## Repositories Reducer
* Our app has 3 kinds of actions that we expect to receive

### SearchRespositories Action
```
{
    type: 'search_repositories'
}
```

### SearchRespositoriesSuccess Action
```
{
    type: 'search_repositories_success',
    payload: ['react', 'react-dom']
}
```

### SearchRespositoriesError Action
```
{
    type: 'search_repositories_error',
    error: 'Request Failed'
}
```

### We will create a separate interface for each Action
```
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

interface SearchRepositoriesAction {
  type: 'search_repositories';
}

interface SearchRepositoriesSuccessAction {
  type: 'search_repositories_success';
  payload: string[];
}

interface SearchRepositoriesErrorAction {
  type: 'search_repositories_error';
  payload: string;
}

const reducer = (
  state: RepositoriesState,
  action:
    | SearchRepositoriesAction
    | SearchRepositoriesSuccessAction
    | SearchRepositoriesErrorAction
): RepositoriesState => {
  // below is a "type guard"
  if (action.type === 'search_repositories_success') {
    // 100% certainty that 'action' satisfies the
    // SeachRepositoriesSuccessAction interface
    action.payload
  }

  switch (action.type) {
    case 'search_repositories':
      return {
        // we are searching so we need this true
        loading: true,
        // get rid of past errors
        error: null,
        // clear out past data
        data: [],
      };
    case 'search_repositories_success':
      return {
        // no longer loading
        loading: false,
        // we don't have an error so null
        error: null,
        // we are success so load data from payload
        data: action.payload,
      };
    case 'search_repositories_error':
      return {
        // we have an error so no longer loading
        loading: false,
        // we have an error so get it from the payload
        error: action.payload,
        // An error so clear out data
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
```

* But we don't have to write out the type guard statement because `switch` statements function as "type guards" in TS as well
* So TS is 100% aware that if you go into the switch statement and the action.type is equal to "search_repositories_success", then inside that case we are 100% that 'action' is SearchRepositoriesSuccessAction
    - Which means our action has a payload property that is an array of strings

## Below is hard to understand
```
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

interface SearchRepositoriesAction {
  type: 'search_repositories';
}

interface SearchRepositoriesSuccessAction {
  type: 'search_repositories_success';
  payload: string[];
}

interface SearchRepositoriesErrorAction {
  type: 'search_repositories_error';
  payload: string;
}

const reducer = (
  state: RepositoriesState,
  action:
    | SearchRepositoriesAction
    | SearchRepositoriesSuccessAction
    | SearchRepositoriesErrorAction
): RepositoriesState => {
  switch (action.type) {
    case 'search_repositories':
      return {
        // we are searching so we need this true
        loading: true,
        // get rid of past errors
        error: null,
        // clear out past data
        data: [],
      };
    case 'search_repositories_success':
      return {
        // no longer loading
        loading: false,
        // we don't have an error so null
        error: null,
        // we are success so load data from payload
        data: action.payload,
      };
    case 'search_repositories_error':
      return {
        // we have an error so no longer loading
        loading: false,
        // we have an error so get it from the payload
        error: action.payload,
        // An error so clear out data
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;

```

* The above code helps us make sure our redux is written correctly

## Our Code is too long so we can make is shorter
* **note** This is called a "type union"

```
| SearchRepositoriesAction
    | SearchRepositoriesSuccessAction
    | SearchRepositoriesErrorAction
```

* And we can refactor our code like:

```
// MORE CODE

type Action =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;

const reducer = (
  state: RepositoriesState,
  action: Action
): RepositoriesState => {
// MORE CODE
```

## We have lots of repeated strings
* We can reduce this using enum
    - What is an `enum`?
        + It's similar to an object
        + It sets up a variety of different properties that all have a very closely related definition/meaning
* **NAMING CONVENTION** It's traditional to use ALL UPPPERCASE (very Reduxy way to write)

### Add our enum
```
enum ActionType {
  SEARCH_REPOSITORIES = 'search_repositories',
  SEARCH_REPOSITORIES_SUCCESS = 'search_repositories_success',
  SEARCH_REPOSITORIES_ERROR = 'search_repositories_error',
}
```

#### How to access an enum
* Like this:

`ActionType.SEARCH_REPOSITORIES`

* Now we can add our enums
    - This helps us prevent misspelling

## And our code now looks like:
```
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES;
}

interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

type Action =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;

enum ActionType {
  SEARCH_REPOSITORIES = 'search_repositories',
  SEARCH_REPOSITORIES_SUCCESS = 'search_repositories_success',
  SEARCH_REPOSITORIES_ERROR = 'search_repositories_error',
}
const reducer = (
  state: RepositoriesState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return {
        // we are searching so we need this true
        loading: true,
        // get rid of past errors
        error: null,
        // clear out past data
        data: [],
      };
    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return {
        // no longer loading
        loading: false,
        // we don't have an error so null
        error: null,
        // we are success so load data from payload
        data: action.payload,
      };
    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return {
        // we have an error so no longer loading
        loading: false,
        // we have an error so get it from the payload
        error: action.payload,
        // An error so clear out data
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
```

## We can refactor our enum by abstracting it
`src/actions/index.ts`

```
import { ActionType } from '../action-types';

interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES;
}

interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

export type Action =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;
```

`src/action-types/index.ts`

```
export enum ActionType {
  SEARCH_REPOSITORIES = 'search_repositories',
  SEARCH_REPOSITORIES_SUCCESS = 'search_repositories_success',
  SEARCH_REPOSITORIES_ERROR = 'search_repositories_error',
}
```

`src/reducers/repositoriesReducer.ts`

```
import { ActionType } from '../../action-types';
import { Action } from '../../actions';

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const reducer = (
  state: RepositoriesState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return {
        // we are searching so we need this true
        loading: true,
        // get rid of past errors
        error: null,
        // clear out past data
        data: [],
      };
    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return {
        // no longer loading
        loading: false,
        // we don't have an error so null
        error: null,
        // we are success so load data from payload
        data: action.payload,
      };
    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return {
        // we have an error so no longer loading
        loading: false,
        // we have an error so get it from the payload
        error: action.payload,
        // An error so clear out data
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
```

