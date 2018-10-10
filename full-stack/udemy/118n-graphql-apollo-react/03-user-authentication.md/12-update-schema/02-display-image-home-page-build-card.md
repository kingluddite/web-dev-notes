# Display Genealogy Image on Home page and Build Card
* We could add a URL to our image file UI form but it won't show an image on the home page

## Jump into our queries
`queries/index.js`

* Make sure we are returning our `imageUrl` field and `description` fields

```
// MORE CODE

/* Genealogy Queries */
export const GET_ALL_GENEALOGIES = gql`
  query {
    getAllGenealogies {
      ...CompleteGenealogy
    }
  }
`;

// MORE CODE
```

* We added a fragment here so look in the fragment and make sure the fields have been added

## Log it to test
`App.js`

* We will `comment in` our log to see the values we are getting in the client
* We are checking to make sure imageUrl and description have been added

```
// MORE CODE

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_GENEALOGIES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

// MORE CODE
```

### View home page
* Refresh
* You will see something like this
* **note** we now have a `imageUrl` and `category` fields available

![imageUrl and category available](https://i.imgur.com/4tVOLkg.png)

* You should also see `description`

## GenealogyItem
* You'll see in `App.js` that we are passing down all `genealogy` fields to `GenealogyItem` component using `{...genealogy}`
* Then inside `GenealogyItem` we destructure `imageUrl` and `category`
* We'll set the `imageUrl` as the background for `<li>`

`GenealogyItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const GenealogyItem = ({ _id, firstName, lastName, imageUrl, category }) => {
  return (
    <li
      style={{
        background: `url(${imageUrl}) center center / cover no-repeat`,
      }}
      className="card"
    >
      <span className={category}>{category}</span>
      <div className="card-text">
        <Link to={`/genealogy/${_id}`}>
          <h4>
            Name: {firstName} {lastName}
          </h4>
        </Link>
      </div>
    </li>
  );
};

export default GenealogyItem;
```

* **note** We are using a `dynamic` class name

`App.js`

* Add a simple class name

```
// MORE CODE

return (
          <ul className="cards">

// MORE CODE
```

## Test it out
* Delete the last genealogy and create a new one with a valid `imageUrl` (live link working)

### Add css
* We need to add CSS for the `category` we selected
* You would need to add a class for each `category`
* But let's add one for historic

`App.css`

```
// MORE CODE

.Historic {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  color: white;
  background: linear-gradient(to right, #b24592, #f15f79);
  border-radius: 50px 120px 120px;
}

// MORE CODE
```

* Test and the `card` will look nice and it changes when you hover over it
* We do that animation using CSS

## Make `title` better on home page
`App.js`

```
// MORE CODE

const App = () => (
  <div className="App">
    <h1 className="main-title">
      Find Genealogies you <strong>Love</strong>
    </h1>

// MORE CODE
```

## Add a few genealogies
* You'll see we also have a responsive page

## Make our single page `GenealogyPage` look better using CSS
* Are we getting the `imageUrl` field on `GenealogyPage`?

`GenealogyPage.js`

```
// MORE CODE

const GenealogyPage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_GENEALOGY} variables={{ _id }}>

// MORE CODE
```

* We need to look at `queries/index.js` to see if we are pulling in the `imageUrl` field

`index.js`

* Looks like we need to check in `fragments.js`

```
// MORE CODE

export const GET_GENEALOGY = gql`
  query($_id: ID!) {
    getGenealogy(_id: $_id) {
      ...CompleteGenealogy
    }
  }
  ${genealogyFragments.genealogy}
`;

// MORE CODE
```

`fragments.js`

```
// MORE CODE

export const genealogyFragments = {
  genealogy: gql`
    fragment CompleteGenealogy on Genealogy {
      _id
      firstName
      lastName
      imageUrl
      category

// MORE CODE
```

* Yes we are pulling that `imageUrl` field in

## Add emoji's on you mac
* [add emoji to your mac tips](https://www.imore.com/how-to-use-emoji-on-your-mac)
* Open Mac OS `System Preferences`
* Select Keyboard
* Check `Show keyboard and emoji viewer in Menu Bar`

![show emoji](https://i.imgur.com/XJeaLqc.png)

![emoji dropdown](https://i.imgur.com/Zg3dAgx.png)

![choose the heart](https://i.imgur.com/ndsJqnr.png)

## Final GenealogyPage

```
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

// components
import LikeGenealogy from '../Genealogy/LikeGenealogy';

// queries
import { GET_GENEALOGY } from '../../queries';

const GenealogyPage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_GENEALOGY} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        // console.log(data);

        return (
          <div className="App">
            <div
              style={{
                background: `url(${
                  data.getGenealogy.imageUrl
                }) center center / cover no-repeat`,
              }}
              className="genealogy-image"
            />

            <div className="genealogy">
              <div className="genealogy-header">
                <h2 className="genealogy-name">
                  <strong>
                    {data.getGenealogy.firstName} {data.getGenealogy.lastName}
                  </strong>
                </h2>
                <h5>
                  <strong>{data.getGenealogy.category}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getGenealogy.username}</strong>
                </p>
                <p>
                  {data.getGenealogy.likes}{' '}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote className="analogy-description">
                {data.getGenealogy.description}
              </blockquote>
              <LikeGenealogy _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
```

* We add `role="img" aria-label="heart"` so React doesn't throw errors at us

## Test in browser
* You now have a styled `GenealogyPage`

## Style the Like button and align it to the right of the page

`LikeGenealogy.js`

```
// MORE CODE

<button
                  onClick={() =>
                    this.handleClick(likeGenealogy, unlikeGenealogy)
                  }
                  className="like-button"
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>

// MORE CODE
```

![like button styled](https://i.imgur.com/MQqwS0b.png)
