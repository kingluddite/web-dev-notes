# Custom Resolvers for Useful Data
## Add a strikethrough
`Goal.js`

```
// MORE CODE
render() {
  const { goal } = this.props;

  return (
    <li>
      <input
        type="checkbox"
        onChange={this.toggleGoal}
        checked={goal.completed}
      />
      <span
        style={{
          textDecoration: goal.completed ? 'line-through' : 'none',
        }}
      >
        {goal.name}
      </span>
    </li>
  );
}

// MORE CODE
```

## Test drive
* You will see checked items look like this:

![checked item](https://i.imgur.com/YZb0QjG.png)

### If all goals are checked main resolution should be marked as completed
* If you add a new goal it will be set as incomplete

## Add a new property to our Resolution schema called `completed`
`Resolutions.graphql`

```
type Resolution {
  _id: String!
  name: String!
  goals: [Goal]
  completed: Boolean
}

// MORE CODE
```

* We add `completed: Boolean`

### Update register-api.js (just update comment to fix bug)
* Open graphiql

```
{
  resolutions {
    _id
    name
    completed
    goals {
      _id
      name
      completed
    }
  }
  user {
    _id
    email
  }
}
```

* The output shows a bunch of `"completed": null`

![completed](https://i.imgur.com/mj8F5rL.png)

## Open our resolutions/resolvers
* Do we need to store this state in our DB?
* No

`resolutions/resolvers.js`

```
// MORE CODE
Resolution: {
  goals: resolution =>
    Goals.find({
      resolutionId: resolution._id,
    }).fetch(),
  completed: resolution => {
    const goals = Goals.find({
      resolutionId: resolution._id,
      completed: false,
    }).fetch();
    return !goals.length;
  },
},

Mutation: {
    // MORE CODE
```

* Uncheck all and you will see all **false** from completed
* Check all and you will see sub items are true and parent resolution is true as well

```
{
  "data": {
    "resolutions": [
      {
        "_id": "tq5LGAdCYfyxeEwRs",
        "name": "test",
        "completed": true,
        "goals": [
          {
            "_id": "fz5SJLeFfYc2KmriW",
            "name": "test2",
            "completed": true
          },
          {
            "_id": "KvERPD6fGSLpztRGq",
            "name": "run a mile in under 4 minutes",
            "completed": true
          },
          {
            "_id": "Digq43wYitE4C7MrL",
            "name": "aaa",
            "completed": true
          }
        ]
      },
```

`App.js`

* Add this new `completed` field we are checking for to our resolutionQuery

```
// MORE CODE
const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
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
```

`App.js`

```
// MORE CODE
<ul>
  {resolutions.map(resolution => (
    <li key={resolution._id}>
      <span
        style={{
          textDecoration: resolution.completed ? 'line-through' : 'none',
        }}
      >
        {resolution.name}
      </span>
      <ul>
        {resolution.goals.map(goal => (
          <Goal goal={goal} key={goal._id} />
        ))}
      </ul>
      <GoalForm resolutionId={resolution._id} />
    </li>
  ))}
</ul>
// MORE CODE
```

* Check all child checkboxes and the parent resolution will also have a strike through to mark it as completed
* But if you add a new sub goal the parent will automatically uncheck
* This is an instance of the database not having to match the API
    - The API is just information we want to access and we want to be available in the application
    - The DB is just what needs to be stored
    - completed does not need to be stored and if we did store it in the DB it woudl add a ton of complexity



