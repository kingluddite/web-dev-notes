# Add refetch to `addcologne` Mutation
* When we add a `cologne` and click on `profile` page it is not refreshed on it
* **note** When refetching queries remember to add any variables if there are any
* You will see that `GET_USER_COLOGNES` has a username variable

`UserColognes.js`

```
// MORE CODE

render() {
  const { username } = this.props;

  return (
    <Query query={GET_USER_COLOGNES} variables={{ username }}>

  // MORE CODE
```

`AddCologne.js`

```
// MORE CODE

// GraphQL
import { Mutation } from 'react-apollo';
import {
  ADD_COLOGNE,
  GET_ALL_COLOGNES,
  GET_USER_COLOGNES, // add this
} from '../../queries';

// MORE CODE

class AddCologne extends Component {

  // MORE CODE

    return (
      <div className="App">
        <h2 className="App">Add Cologne</h2>
        <Mutation
          mutation={ADD_COLOGNE}
          variables={{
            scentName,
            scentBrand,
            scentPrice,
            description,
            username,
          }}
          refetchQueries={() => [
            {
              query: GET_USER_COLOGNES,
              variables: { username },
            },
          ]}
          update={this.updateCache}
        >

        // MORE CODE

        </Mutation>

// MORE CODE
```

## Test
* Add a new cologne
* Go to profile page and it will show fresh data

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add refetch to AddCologne`

## Push to github
`$ git push origin delete-user-colognes`

## Next - Add Default Text
