# Securing Our Mutations
* Only accept resolutions from logged in users
* How can we protect our API?

`resolutions/resolvers.js`

```
// MORE CODE
  Mutation: {
    createResolution(obj, { name }, { userId }) {
      const resolutionId = Resolutions.insert({
        name,
        userId,
      });
      return Resolutions.findOne(resolutionId);
    },
  },
};
```

* This is open to the public to create resolutions
* Modify it to this:

```
// MORE CODE
Mutation: {
  createResolution(obj, { name }, { userId }) {
    if (userId) {
      const resolutionId = Resolutions.insert({
        name,
        userId,
      });
      return Resolutions.findOne(resolutionId);
    }
    throw new Error("Unauthorized");
  },
},
// MORE CODE
```

* Now we check for a logged in user if they don't exist it will return `undefined`
* If the user doesn't exist we thrown an unauthorized error

## Take for a test drive
1. log out
2. Try to enter a resolution
3. The dev tool console will show the "Unauthorized" error
4. We also see the error in our server terminal

**note** We don't want to do this

* You can view the error
* ui/ResolutionError.js

```
// MORE CODE
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
// MORE CODE
```

* Above is how we see the error show up
* This is a good thing, as our error was swallowed up by our app and we can show it

`ResolutionForm.js`

```
// MORE CODE
class ResolutionForm extends Component {
  state = {
    error: null,
  };

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
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={input => (this.name = input)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

`goals/resolvers.js`

```
// MORE CODE
Mutation: {
  createGoal(obj, { name, resolutionId }, { userId }) {
    if (userId) {
      const goalId = Goals.insert({
        name,
        resolutionId,
        completed: false,
      });
      return Goals.findOne(goalId);
    }
    throw new Error('Unauthorized');
  },
  // MORE CODE
```

* You could also lock down the toggleGoal in a higher stake app
* **note** We have access to any logged in user from anywhere using Meteor accounts
