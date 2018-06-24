# Intro to Mutations
`resolvers.js`

```
import Resolutions from './resolutions';

export default {
  Query: {
    resolutions() {
      return Resolutions.find({}).fetch();
    },
  },

  Mutation: {
    createResolution() {
      // Resolutions.insert({
      //   name: 'Test Res',
      // });
    },
  },
};
```

## Error - Houston we have a problem
* `Error: "Mutation" defined in resolvers, but not in schema`
* Why does this happen?
    - In graphql you have to define everything in your schema

`Resolutions.graphql`

```
type Resolution {
  _id: String!
  name: String!
}

type Mutatation {
  createResolution: Resolution
}
```

* Above should fix the code

## Error - Houston we still have a problem
* 
* The build system is not recognizing a change in the graphql files

### Fix
1. Stop meteor
2. Install a dev dependency module

`$ npm i -D babel-plugin-import-graphql`

3. Update `.babelrc`

```
"plugins": [
    "babel-plugin-inline-import",
    "import-graphql"
]
```

4. Start meteor

`$ meteor`

* Still errors

stop at 6:30 of vid
