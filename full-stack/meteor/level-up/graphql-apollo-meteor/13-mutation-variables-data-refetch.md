# Mutation Variables and Data Refetch
* Want to send data from form to server
    - So when we hit submit we don't just want to see it hit on client (the console of the browser)
* But we want to see it hitting our server (output in terminal)

## We want to grab `this.name.value`
* How do we get properties from our Mutation onto the server?
    - We have to do it through the query language

### Parameters inside the query language
* Let's talk about parameters as they relate to Mutations
* Same idea works for Query types
    - sorting
    - limiting
    - passing information that goes to server (you are filtering based on a parameter in a URL)

#### Steps to get data from our client side form to our server (Mutation)
1. We need to set parameters on our Mutation with what types of values are coming in

```
const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;
```

* $name: String! - 1st define what types of values are coming in
    - ! - means that `name` is required
* Now we need to pass the info into the mutation itself
        + `createResolution(name: $name)`
        + The name will come in from this function

```
handleSubmit = e => {
  e.preventDefault();
  console.log(this.name.value);
  this.props.createResolution();
};
```

* It will make sure it is a string
* Then it will assign $name into our actual Mutation
* **recap** We first define what type of data we are accepting and then we create variables to determine what goes into our Mutation

## Next - Pass our data into our Mutation
```
// MORE CODE
handleSubmit = e => {
  e.preventDefault();

  this.props.createResolution({
    variables: {
      name: this.name.value,
    },
  });
};
// MORE CODE
```

* We pass the data into our Mutation via our function `createResolution()`
* We then pass an object into our createResolution() function that accepts a property called `variables`
* Then we pass all our stuff into variables
    - this is we need name and set it to what was typed into the form field

## Recap
* we now pass a variable into our Mutation
* Then our graphql will handle it
    - make sure it is a string
    - And then it will pass it along to the mutation itself

## Houston we have a problem
* We defined our Mutation as `createResolution`

`Resolutions.graphql`

```
// MORE CODE
type Mutation {
    createResolution: Resolution
}
```

* But we didn't give it any definition that it can accept props
* Since your schema is your public API
* So far we have one function called `createResolution` that you can run and that's it
* So now we need to tell our API that this function accepts a name property and it `name` needs to be a stringa

```
// MORE CODE
type Mutation {
  createResolution(name: String!): Resolution
}
```

* and we add the exclamation mark because it is required
* No sense in having a resolution without a name, right?

### Houston we have a problem
* There is a bug in that we have to update our comment on `register-api.js`
* This is a pain but in order to update our graphql on the server this is what we need to do
* Add the comment and refresh the browser
* Fill out the form
* Now you will see it just updates on the server

## Get data out of our resolver and modify our database
`resolvers.js`

```
// MORE CODE
  Mutation: {
    createResolution(obj, args, context) {
      console.log(args);
      // Resolutions.insert({
      //   name: 'Test Res',
      // });
    },
  },
};
```

* first is `obj`
* second arg is `args` (holds all our arguments)
* third is `context`

## Take for a test drive
* Enter a task and submit form
* `args` shows us `{ name: 'joe' }` and we can see this in the terminal

### Destructure
```
Mutation: {
  createResolution(obj, { name }, context) {
    console.log(name);
    // Resolutions.insert({
    //   name: 'Test Res',
    // });
  },
},
```

* Submit another task and now we just get the name of the task

## Now use this to insert the name of the task into our `Resolutions` collection

```
// MORE CODE
  Mutation: {
    createResolution(obj, { name }, context) {
      console.log(name);
      Resolutions.insert({
        name,
      });
    },
  },
};
```

* Now we insert a Resolution
* And we return it by using the resolutionId
* We are not doing anything with the returning information but graphql expects a return so we do this to satisfy it's needs
* Now enter tasks and press submit... nothing
* But refresh and you'll see the tasks were added!

## Houston we have a problem
* Why are the tasks only appearing on refresh?
* We need to use a Promise and `data.refetch` to refetch the data and pull it so that we don't have to refresh the browser to see our new task

![refetch](https://i.imgur.com/rNoB89Q.png)

* refetch comes from the query itself `hiQuery`

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

export default graphql(hiQuery)(App);
```

* Give our ResolutionForm access to refetch by passing it down as a prop to that component

`App.js`

```
// MORE CODE
const App = ({ data }) => {
  if (data.loading) return null;
  return (
    <div>
      <h1>{data.hi}</h1>
      <ResolutionForm refetch={data.refetch} />
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
        this.props.refetch();
      })
      .catch(error => {
        console.log(error);
      });
  };
// MORE CODE
```

## Take it for a test drive - no more page refreshes!
* Enter a task and submit
* It updates without a page refresh!

