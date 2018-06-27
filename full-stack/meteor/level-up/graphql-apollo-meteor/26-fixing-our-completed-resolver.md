# Fixing Our "Completed" Resolver
* All resolutions that have no goals is crossed out
    - We should fix this

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
    }).fetch();
    return !goals.length;
  },
},
// MORE CODE
```

* We remove `completed: false`
* That makes 2 DB calls and DB calls aren't "cheap"
* Now we have an array of goals regardless of whether they are completed or not

## Now we want to filter out the completed goals
* We will have all of our goals in `goals`
* We will have all of our completed `goals` inside `completedGoals`

`resolution/resolvers.js`

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
    }).fetch();
    const completedGoals = goals.filter(goal => goal.completed);
    return !goals.length;
  },
},
// MORE CODE
```

* Now compare if all of our goals is equal to all of our completed goals

`resolution/resolvers.js`

```
// MORE CODE
    const completedGoals = goals.filter(goal => goal.completed);

    return goals.length === completedGoals.length;
  },
},
// MORE CODE
```

* Now if we have a bunch of goals and check them the parent will be checked (same as before)
* But we still can't check the parent if all child boxes are checked

`resolution/resolvers.js`

```
// MORE CODE
    if (goals.length === 0) return false
    const completedGoals = goals.filter(goal => goal.completed);

    return goals.length === completedGoals.length;
  },
},
// MORE CODE
```

* Now if nothing is in the array than we return **false** otherwise we return **true**
* Give page a refresh to rerun queries
* And now our parent is crossed out if all goals are checked off
* But if is has not goals the parent item will not be checked off

## Next - Security
* Protect our API with server/side and client side code
