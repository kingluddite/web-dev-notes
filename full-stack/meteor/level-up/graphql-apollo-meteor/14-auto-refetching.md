# Auto Refetching & Query Prop Assignment 
`ResolutionForm`

```
// MORE CODE
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
    })
    .catch(error => {
      console.log(error);
    });
};
// MORE CODE
```

* We comment out the `refetch()` and now only a page refresh shows us new tasks added

## Name our query
`App.js`

```
// MORE CODE
const hiQuery = gql`
  {
    hi
    resolutions {
      _id
      name
    }
  }
`;
// MORE CODE
```

* It looks like we gave it a name but that is just the name of our string
* Here we add a `Resolutions` name

```
// MORE CODE
const hiQuery = gql`
  query Resolutions {
    hi
    resolutions {
      _id
      name
    }
  }
`;
// MORE CODE
```

## Use that query name ad pass it as an option
`ResolutionForm.js`

```
// MORE CODE
export default graphql(createResolution, {
  name: 'createResolution',
  options: {
    refetchQueries: ['Resolutions'],
  },
})(ResolutionForm);
```

* Open Network tab of chrome dev tools
* Enter and submit a new task
* Make sure `All` is selected, Headers and select the last graphql and you will see this:

![Resolutions](https://i.imgur.com/GjF9wDb.png)

* Now we get the refetch to run automatically using that option
* Submit a task and it refetches automatically

## Remove refetch prop
* We don't need it anymore

`ResolutionsForm`

```
// MORE CODE
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

* And remove the then()

`ResolutionForm`

```
// MORE CODE
handleSubmit = e => {
  e.preventDefault();

  this.props
    .createResolution({
      variables: {
        name: this.name.value,
      },
    })
    // .then(({ data }) => {
      // this.props.refetch();
    // })
    .catch(error => {
      console.log(error);
    });
};
// MORE CODE
```

* I comment it out but we don't need it
* graphql (more specifically give you ability to refetch automatically or you can do it manually)

## Let's rename hiQuery
* This was a terrible name

`App.js`

```
// MORE CODE
const resolutionsQuery = gql`
  query Resolutions {
    hi
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(resolutionsQuery)(App);
```

### Remove {data.hi}
```
// MORE CODE
<div>
  <h1>{data.hi}</h1>
  <ResolutionForm />
  // MORE CODE
```

* We don't need it

## Less typing === good

`App.js`

```
// MORE CODE
export default graphql(resolutionsQuery, {
  props: ({ data }) => ({
    resolutions: data.resolutions,
  }),
})(App);
```

* And just add what you want and now you can just type `resolutions` instead of `data.resolutions`

### Even better way (even less typing)

```
// MORE CODE
export default graphql(resolutionsQuery, {
  props: ({ data }) => ({
   ...data 
  }),
})(App);
```

* Now this:

```
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
```

* Becomes this:

```
// MORE CODE
const App = ({ loading, resolutions }) => {
  if (loading) return null;
  return (
    <div>
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

## Houston we have a problem
* Our login is not aware of graphql and graphql is not aware of our login

## Next
* Make Apollo aware of meteor
* Make Meteor aware of meteor on the server so we can add security and attach todos to users automatically and pulling in user todos automatically too
