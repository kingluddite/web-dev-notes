# Reducer Setup
## Create folder
`src/state/reducers/repositoriesReducer.ts`

```ts
const reducer = (state, action) => {};

export default reducer;
```

* We get TS errors that we did not provide state for `state` or `action`
    - We want `repositories` to return an object that has a data property, loading and error
    - We will define an interface to describe this argument

## Below code works!
* But we can use TS to make this more robust
* And help us troubleshoot

```
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}
const reducer = (state: RepositoriesState, action: any) => {
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
