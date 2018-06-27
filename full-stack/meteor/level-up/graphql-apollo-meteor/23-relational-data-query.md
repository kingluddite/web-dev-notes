# Relational Data Query
## Let's see all our different goals

`imports/ui/resolutions/Goal.js`

* Create a list of checkboxes

```
import React, { Component } from 'react'

export default class Goal extends Component {
  render() {
    return (
      <li>
        <input type="checkbox"/>
        {this.props.goal.name}
      </li>
    )
  }
}
```

## Take for test drive
### Error - Houston we have a problem
* "can not read property 'map' of undefined"
    - This makes us want to check if we don't have any goals
    - Let's show this
        + comment out our goals list
        + Add a new resolution and have no goals
        + Even though we don't have any goals graphql is smart enough to return an empty array because now we can map over an empty array it just won't output anything
        + **tip** always important to check your states of data - if there are no goals what is it going to come in as, will it give us any errors?

## Remove logs
`users/resolvers.js`

```
export default {
  Query: {
    user(obj, args, { user }) {
      return user || {};
    },
  },
  User: {
    email: user => {
      return user.emails[0].address;
    },
  },
};
```

`resolutions/resolvers.js`

```
 // MORE CODE
Resolution: {
  goals: resolution => {
    return Goals.find({
      resolutionId: resolution._id,
    }).fetch();
  },
},

Mutation: {
 // MORE CODE
```

## Add our query
* We need to query for goals and get the `_id` and `name`

* In order to fix a bug I put my imports in alphatical order?

`register-api.js`

```
import GoalsSchema from '../../api/goals/Goal.graphql';
import GoalsResolvers from '../../api/goals/resolvers';
import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';
 // MORE CODE
```

## Something is not working
* We enter a goal and it doesn't show up until we refresh
* Why?
    - In `ResolutionForm` we added the refetch option

```
// MORE CODE
export default graphql(createResolution, {
  name: 'createResolution',
  options: {
    refetchQueries: ['Resolutions'],
  },
})(ResolutionForm);
```

* This requeries the db and might not be the most efficient solution every time

## Add this code to `GoalForm.js`

```
// MORE CODE
export default graphql(createGoal, {
  name: 'createGoal',
  options: {
    refetchQueries: ['Resolutions'],
  },
})(GoalForm);
```

* But now everytime we add a goal or resolution we will refetch all data every time
* But now it adds goals without a refresh

## Clear input after it was successfully entered
* Good UX design

`GoalForm.js`

```
// MORE CODE
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
      .then(() => {
        this.name.value = '';
      })
      .catch(error => {
        console.log(error);
      });
  };
  // MORE CODE
```

* That sets our `reference` to an empty string

## Do same for resolution form

`ResolutionForm.js`

```
 // MORE CODE
class ResolutionForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props
      .createResolution({
        variables: {
          name: this.name.value,
        },
      })
      .then(({ data }) => {
        // this.props.refetch();
        // clear form field after successful entry
        this.name.value = '';
      })
      .catch(error => {
        console.log(error);
      });
  };
 // MORE CODE
```

## Wire up our checkbox mutations
* When people toggle it the task is completed and if it is not checked it is not
* Update the UI from the checked state
