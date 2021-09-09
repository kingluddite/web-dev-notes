# Wiring up React
`src/index.tsx`

```
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.querySelector('#root'));
```

`components/App.tsx`

```
import { Provider } from 'react-redux';
import { store } from '../state';
import RepositoriesList from './RepositoriesList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Search for a Package</h1>
        <RepositoriesList />
      </div>
    </Provider>
  );
};

export default App;
```

`components/RepositoriesList.tsx`

```
const RepositoriesList: React.FC = () => {
  return (
    <div>
      <form>
        <input />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepositoriesList;
```

## Test in browser
* Error
    - Reducer "repositories" returned undefined during initialization
    - We forgot to initialize our state argument the very first time our reducer runs

`src/state/reducers/repositoriesReducer.ts`

```
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

// this is what we forgot
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RepositoriesState = initialState,

// MORE CODE
```

## Test again and our app is able to be viewed in the browser
* No errors in console

### RepositoriesList
* We need to add in a piece of state that will track whatever the user types into the input
* We need to detect form submission
    - Whenever the user submits the form we then want to call the actionCreator that will make a request off to the NPM API for us
* After we call the actionCreator we then need to get our redux state into this component and render our list of bound packages inside of it

```
import { useState } from 'react';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepositoriesList;
```

## Call the Action Creator
* Use the `term` to call our Action Creator of `searchRepositories`
* We'll start with just straight up JavaScript
* Then we'll refactor with TS
* We use `useDispatch` hook from the react-redux library that gives us access to `dispatch` directly inside the React component
    - We can use `useDispatch` function to manually dispatch an action creator
        + **note** But just importing `useDispatch` hook is not enough
            * We also have to import our Action Creator
            * **remember** We already exported all our different action creators in the state/index.ts file
                - We exported `actionCreators` so we can import `actionCreators` into RepositoriesList and that will give us access to all the different action creators we have created
    * **note** This is the same kind of `dispatch` function we have access to inside of redux-thunk functions, so we can call dispatch and have access to whatever action creator we want to invoke
    
## Here is our working code
```
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../state';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(actionCreators.searchRepositories(term));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default RepositoriesList;
```

* UI test and enter `react` term and press Search
* Open Network tab and select Fetch/XHR tab
* Select link and Headers tab
    - You will see the Request URL in NPM
    - Click Response tab
        + Click preview and you'll see a response with all npm packages inside it

## This line is long
* We can refactor it:
    - It's way too long just to dispatch one single action

`dispatch(actionCreators.searchRepositories(term));`

### How can we refactor it to make it shorter?
* We'll create a hook that will automatically give us access to all the different action creators inside of our components

`src/hooks/useActions.ts`

```
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
  // { searchRepositories: dispatch(searchRepositories)}
};
```

* Now we consume this hook

`src/components/RepositoriesList.tsx`

* But using this hook we made our code easier to read (and type!)
* Test in UI and see by searching `react` as term we get same response as before

```
import { useState } from 'react';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();

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
    </div>
  );
};

export default RepositoriesList;
```

## Next
1. Reach into our store
2. Get some piece of state
3. Then iterate over all the fetch packages we found
4. And print out a line for each of them inside our JSX
