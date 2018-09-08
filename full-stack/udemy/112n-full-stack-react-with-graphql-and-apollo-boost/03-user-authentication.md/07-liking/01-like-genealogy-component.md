# Create LikeGenealogy Component
* In Genealogy page we'll convert our Like button into a component
* So we cut out the button code and replace it with a `LikeGenealogy` component
* Also import that component we'll create in the next step

`GenealogyPage.js`

```
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

// components
import LikeGenealogy from '../Genealogy/LikeGenealogy'; // add this

// queries
import { GET_GENEALOGY } from '../../queries';

const GenealogyPage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (

    // MORE CODE
            <p>Created By: {data.getGenealogy.username}</p>
            <LikeGenealogy />
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(GenealogyPage);
```

## Create a class based component
* Because we need to use state in this component

`LikeGenealogy.js`

```
import React, { Component } from 'react';

export class LikeGenealogy extends Component {
  render() {
    return (
      <div>
        <button>Like</button>
      </div>
    );
  }
}

export default LikeGenealogy;
```

