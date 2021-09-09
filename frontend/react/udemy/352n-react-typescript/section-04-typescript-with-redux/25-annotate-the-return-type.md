# Annotate the Return Type
* Let's tell our reducer that no matter what our reducer will return an interface of RepositoriesState

```
// MORE CODE

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}
const reducer = (state: RepositoriesState, action: any): RepositoriesState => {
// MORE CODE
```

* Now with that change I can only assign an empty array or an array of strings to data

## Typing an Action
* Currently we have `any` as our type so TS won't help us out at all here
* **note** In TS every action is always going to be an object that must have a `type` property and optionally it can also have a payload
* When you see the `?` it means it is "optional"

### We type our action below
* Now we make sure `type` and `payload` are always spelled correctly
```
interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}

interface Action {
  type: string;
  payload?: any;
}
const reducer = (
  state: RepositoriesState,
  action: Action
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

## We can still refactor
* Because we are still using a type of `any` for our payload
