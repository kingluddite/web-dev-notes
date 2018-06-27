# Writing Toggle Mutation
* Add to our Goals Mutation

`goals/resolvers.js`

* Add toggleGoal()

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
    toggleGoal(obj, { _id }) {
      const goal = Goals.findOne(_id);
      Goals.update(_id, {
        $set: {
          completed: !goal.completed,
        },
      });
      return Goals.findOne(_id);
    },
  },
};
```

`goals/Goal.graphql`

* Refresh browser and you get an error (bug)

`Error: Mutation.toggleGoal defined in resolvers, but not in schema`

* Just refresh comment in `register-api.js`
* Refresh browser
    - mutation defined in Goal 
    - mutation defined in resolver

## Use our mutation
`ui/resolutions/Goal.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag'; // add this import
import { graphql } from 'react-apollo'; // add this import

class Goal extends Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id,
      },
    });
  };

  render() {
    return (
      <li>
        <input type="checkbox" onClick={this.toggleGoal} />
        {this.props.goal.name}
      </li>
    );
  }
}

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`;

export default graphql(toggleGoal, {
  name: 'toggleGoal',
  options: {
    refetchQueries: ['Resolutions'],
  },
})(Goal);
```

* View graphiql and see all completed are **false**

## Test
* Check box in sub task
* Click play in graphiql
* You will see true values for all checked checkboxes
* It works!

## Problem
* We refresh and the checked boxes are no longer checked
    - Fix
        + Go to initial query and add `completed` to query

`Goal.js`

```
// MORE CODE
render() {
  return (
    <li>
      <input
        type="checkbox"
        onChange={this.toggleGoal}
        checked={this.props.goal.completed}
      />
      {this.props.goal.name}
    </li>
  );
}
// MORE CODE
```

`App.js`

```
 // MORE CODE
const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`;
 // MORE CODE
```

## Get rid of error by changing onClick to onChange
`Goal.js`

```
render() {
  return (
    <li>
      <input type="checkbox" onChange={this.toggleGoal} />
      {this.props.goal.name}
    </li>
  );
}
```

# When all goals are completed resolution should be removed
* Add another resolve to see if all goals were completed

