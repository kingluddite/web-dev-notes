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

## Review
1. We created a new object
2. We created a new **type** called a `Mutation`
3. We have a function inside our Mutation
4. We defined Mutation in our schema (Resolution.graphql)
5. We should now be ready to go on the client side by using `createResolution`
6. Previously we had our App and we connected it with Graphql

## Create a new Form
* `imports/ui/ResolutionForm.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default class ResolutionForm extends Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}
```

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ResolutionForm from './ResolutionForm';

const App = ({ data }) => {
  if (data.loading) return null;
  return (
    <div>
      <h1>{data.hi}</h1>
      <ResolutionForm />
      <ul>
        {data.resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

* You should see an input appear in the browser

![input showing in app](https://i.imgur.com/U0IB5iz.png)

## Give form field a ref
`ResolutionForm.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default class ResolutionForm extends Component {
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.name = input)} />
      </div>
    );
  }
}
```

## What is a ref?
```
<input type="text" ref={input => (this.name = input)} />
```

* The function is taking input from this input field
* and then mapping it to `this.name`
* We could add a form if we want but we'll just use

`ResolutionForm.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default class ResolutionForm extends Component {
  handleSubmit = () => {
    console.log(this.name.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={input => (this.name = input)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

* Form works but we need to turn off default form behavior

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default class ResolutionForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.name.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={input => (this.name = input)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

## Create our graphql mutation
```
const createResolution = gql`
  mutation createResolution {
    createResolution {
      _id
    }
  }
`;
```

* The outer **createResolution** is the name of the string query
* The inner `createResolution` is the name of the mutation
* Inside the inner is actually what we are doing which is `createResolution`
    - Yes this is way too verbose
    - But it is the way it is
* For now we just want to return `_id` from query
* We change to a default export and use graphql HOC and pass it our query like this

`export default graphql(createResolution)(ResolutionForm);`

## Complete code
`ResolutionForm.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createResolution = gql`
  mutation createResolution {
    createResolution {
      _id
    }
  }
`;

class ResolutionForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.name.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={input => (this.name = input)} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default graphql(createResolution)(ResolutionForm);
```
 
* We view our app in react dev tools and we have a problem
* We only see `mutate` and not our name `createResolution`

![mutate](https://i.imgur.com/y7H50FT.png)

## Add our mutation name
* Just modify the last line and pass a second parameter for graphql that will hold an object with our mutation name

```
export default graphql(createResolution, {
  name: 'createResolution',
})(ResolutionForm);
```

* Now we get our mutation name

![createResolution name](https://i.imgur.com/EkcjMw2.png)

* So now we have access to `createResolution` via `this.props.createResolution`
* Let's pass it into our event handler like this:

```
// MORE CODE
class ResolutionForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.name.value);
    this.props.createResolution();
  };
  // MORE CODE
```

* Also update our `resolver` with a log so we know it works

`resolvers.js`

```
// MORE CODE
  Mutation: {
    createResolution() {
      console.log('hey it works!');
      // Resolutions.insert({
      //   name: 'Test Res',
      // });
    },
  },
};
```

## Take for test spin
* Enter `test` in form field and press enter to submit
* You will see `test` in client console because that is what you typed
* You will see `hey it works` in terminal because that is from the server

## Summary
* We created a new type that is a `Mutation`
* We created inside that type a function that will be run (think of it essentially as our API endpoint... the thing that is hitting on the server to modify our data)
* We defined what Mutation was inside our schema (Resolution.graphql)
* Defined a new Mutation inside of that called `createResolution` that is going to return a `Resolution`
* We created a ResolutionForm (just acts like any other react component the only difference is we wrote a query, named that query **createResolution**, we named that mutation **createResolution** and then inside that we said "use that createResolution mutation to return and `_id`")
* We passed that into React using the graphql HOC and gave it a name so we didn't have to use `this.props.mutate`
* Then inside our component we called it just as a normal function
  - What is cool about this:
    + We didn't hit an API
    + We didn't hit an action
    + We just called a function from props and this hit our server

## Houston we still have a problem before we get to the DB stuff
* How do we get `this.name.value` into `createResolution` into our server?

## Next - Pass data from the input, send data all the way to the server, get that logging out on the server, and then we'll figure out how to insert it into our DB
* This will give us a basic list creation
* But still won't have delete or update
* But what is cool and you should now understand is:
  - Whether we are using queries to get data
  - Or queries to mutate data
  - It is all sort of the same
  - And this is one of the greatest benefits of graphql
