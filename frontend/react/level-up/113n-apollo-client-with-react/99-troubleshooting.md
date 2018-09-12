# Troubleshooting
## Common problems
* Make sure you are logged into GraphCMS
    - You will automatically get logged out after a certain amount of time
* If you delete documents and are navigated in the browser to that deleted document you will get an error because the document no longer exists
* Apollo Dev Tools is glitchy and needs to be restarted to work sometimes

### Cannot read proprty `Query` of undefined
* Most likely you did this:

```
import Query from 'react-apollo';
```

* Instead of this:

```
import { Query } from 'react-apollo';
```

## Bug
* You will get this error when working with local state

`https://github.com/apollographql/apollo-link-state/issues/273`

### Solution to Bug
```
clientState: {
    defaults: defaultState,
    resolvers: {}
  }
```

* `resolvers` is required
