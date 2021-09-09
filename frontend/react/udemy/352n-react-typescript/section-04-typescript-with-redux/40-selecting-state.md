# Selecting State
* We need to get access to some state that is stored inside of a redux store inside of our RespositoriesList component
    - To accomplish this we'll use another hook from the react-redux library

## useSelector hook
* Similar to nature to the mapStateToProps function you used in react class based components

`RepositoriesList.tsx`

```
// MORE CODE

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const state = useSelector((state) => state);
  console.log(state);
// MORE CODE
```

* View UI and you will see a log of all of the state inside our store

![store state](https://i.imgur.com/3mQQWwl.png)

* Do a search and you'll see your data has an array of 20 packages

## But we don't want all of the store
* We just want to select pieces of our state
* That is what the useSelector hooks allows us to accomplish

```
// MORE CODE

useSelector((state) => state)
// MORE CODE
```

* useSelector gets all of our state object out of redux, then whatever we return from here is eventually what we are going to get out on the other side
    - We only care about state.responsitories

`const state = useSelector((state) => state.repositories);`

* We get an error
* Let's use `any`

`const state = useSelector((state: any) => state.repositories);`

* Refresh and now we only get `repositories` piece of state
    - loading
    - error
    - data
* Destructure

```
 const { data, loading, error } = useSelector(
    (state: any) => state.repositories
  );
```

* Why are we getting an error message whenever we try to reference repositories?
    - We remove `any` to see the error again
    - The error says `respositories` does not exist on type `DefaultRootState`
        + This is a gotcha when using `useSelector` because it has not idea what type of data is inside your Redux store
        + No information is being communicated from TypeScript from the Redux side of things over to the React-Redux side of things
            * We need to write additional code to help React-Redux understand what type the state argument is

![state](https://i.imgur.com/8yZgMwx.png)

`reducers/index.ts`

```
import { combineReducers } from 'redux';
import repositoriesReducer from './respositoriesReducer';

const reducers = combineReducers({
  repositories: repositoriesReducer,
});

export default reducers;

// add this line
export type RootState = ReturnType<typeof reducers>;
```

* Then to add to our simplified way to export everything in one file

`src/state/index.ts`

```
export * from './store';
export * as actionCreators from './action-creators';
export * from './reducers'; // add this line
```

## Part 2: Created a Typed Selector
`src/hooks/useTypedSelector.ts`

```
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../state';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
```

`RepositoriesList.tsx`

```
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories
  );
// MORE CODE
```

* Now hover over state and it correctly describes (or is annotated) as the type of state inside of our Redux store
* If you hover over data, loading, error they all have the correct types on them

## Let's take care of data, error and loading
```
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data}
    </div>
  );
};

export default RepositoriesList;
```

## test
* search for react you'll briefly see `Loading...`
* Then the list of 20 terms

### Test for error
* In Network tab of CDTs(Chrome Dev Tools), choose `Offline` from dropdown
    - Change text to something else, you will get in UI "Network Error"
    - You will see red text in request for the error
    - Change dropdown back to "No Throttling"

#### map better
```
// MORE CODE
return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;
```

![list of packages in UI](https://i.imgur.com/AWh5HqG.png)
