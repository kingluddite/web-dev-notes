# Ouput getGenealogy data to GenealogyPage
`GenealogyPage`

```
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_GENEALOGY } from './../../queries';

const GenealogyPage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_GENEALOGY} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <div className="App">
            <h2>
              {data.getGenealogy.firstName} {data.getGenealogy.lastName}
            </h2>
            <p>
              Created Date:
              {data.getGenealogy.createdDate}
            </p>
            <p>Description: {data.getGenealogy.description}</p>
            <p>
              Date Of Birth:
              {data.getGenealogy.dateOfBirth}
            </p>
            <p>Likes: {data.getGenealogy.likes}</p>
            <p>Created By: {data.getGenealogy.username}</p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
```

* View the UI and you'll see all fields populated
* Except Created By field is not populated

## Associate the name of the user that created the genealogy by adding it to the form that creates genealogies
