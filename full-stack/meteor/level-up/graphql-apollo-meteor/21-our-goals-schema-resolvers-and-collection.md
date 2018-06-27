# Our Goals schema resolvers and Collection
* Create 3 new files
* `imports/api/goals/`
    - Goal.graphql
    - goals.js
    - resolvers.js

`goals.js`

```
import { Mongo } from 'meteor/mongo';

const Goals = new Mongo.Collection('goals');

export default Goals;
```

`Goal.graphql`

```
type Goal {
  _id: String
  name: String
  completed: Boolean
}
```

`goals/resolvers.js`

```
import Goals from './goals';

export default {
  Mutation: {
    createGoal(obj, { name, resolutionId }) {
      const goalId = Goals.insert({
        name,
        resolutionId,
        completed: false,
      });
      return Goals.findOne(goalId);
    },
  },
};
```

`register-api.js`

```
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';
import GoalsSchema from '../../api/goals/Goal.graphql';
import GoalsResolvers from '../../api/goals/resolvers';

const typeDefs = [GoalsSchema, ResolutionsSchema, UsersSchema];

// update!!!!!

const resolvers = merge(GoalsResolvers, ResolutionResolvers, UsersResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
```

* Make sure to update your comment in the above file to fix the bug

## We will get an error
* It is because we did not define Mutation inside our graphql
* Since we already have a Mutation and can't have duplicates we also need to use the `extend` keyword

`goals/Goal.graphql`

```
type Goal {
  _id: String
  name: String
  completed: Boolean
}

extend type Mutation {
  createGoal(name: String!, resolutionId: String!): Goal 
}

```

`imports/ui/GoalForm.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;

class GoalForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props
      .createGoal({
        variables: {
          name: this.name.value,
          resolutionId: this.props.resolutionId,
        },
      })
      .then(({ data }) => {
        // this.props.refetch();
      })
      .catch(error => {
        console.log(error);
      });
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

export default graphql(createGoal, {
  name: 'createGoal',
})(GoalForm);
```

* Add our GoalForm to our App

`App`

```
 // MORE CODE
import GoalForm from './GoalForm';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const App = ({ loading, resolutions, client, user }) => {
  if (loading) return null;
  return (
    <div>

 // MORE CODE

    <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>
            {resolution.name}
            <GoalForm resolutionId={resolution._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

## Take it for a test drive
* Should be no errors
* Enter a Goal and submit
* Nothing happens
* Refresh browser
* Look at Network tab of chrome dev tool
* View XHR requests and look for a graphql post
* You should see createGoal passing a resolutionId
* But it is a 404 error page because the request failed

## Summary
1. We pass each individual resolutionId into GoalForm as a prop
2. Inside GoalForm we have a basic text input using a `ref` to assign the `name` value to **name**
3. We have a submit button
4. The submit button runs the submit handler
5. The handler will call the Mutation (this.props.createGoal())
6. and in that method we'll set the name and resolutionId to the name the person entered into the goal text field and the resolution id to what we passed to in in through props
7. That will trigger our Mutation `createGoal` which we defined as inserting into the DB
