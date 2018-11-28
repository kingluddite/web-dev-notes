# Creating Pages
* Gastby has an automatic page creation

## uppercase vs lowercase naming conventions
* Pages will be lowercase
* Components will be uppercase

`pages/about.js`

```
import React from 'react';

const About = () => (
  <div>
    <h1>About Us</h1>
    <p>
      <div>
        Ipsum qui porro dolore eaque odit Dolorem alias assumenda delectus unde
        assumenda Nemo error assumenda totam et fugit nisi exercitationem
        debitis Quae omnis ad sequi saepe pariatur. Eum voluptatem sapiente.
      </div>
    </p>
  </div>
);

export default About;
```

## View in browser
`/about`

## We need to wrap all our pages inside our `Layout` component

`about.js`

```
import React from 'react';

// custom components
import Layout from '../components/layout';

const About = () => (
  <Layout>
    <h1>About Us</h1>
    <p>
      <div>
        Ipsum qui porro dolore eaque odit Dolorem alias assumenda delectus unde
        assumenda Nemo error assumenda totam et fugit nisi exercitationem
        debitis Quae omnis ad sequi saepe pariatur. Eum voluptatem sapiente.
      </div>
    </p>
  </Layout>
);

export default About;
```

## Nested routes
* Create a new file `/pages/company/team.js`

`team.js`

```
import React from 'react';

// custom components
import Layout from '../../components/layout';

const Team = () => (
  <Layout>
    <h1>Team</h1>
    <p>
      <div>
        Ipsum qui porro dolore eaque odit Dolorem alias assumenda delectus unde
        assumenda Nemo error assumenda totam et fugit nisi exercitationem
        debitis Quae omnis ad sequi saepe pariatur. Eum voluptatem sapiente.
      </div>
    </p>
  </Layout>
);

export default Team;
```

* View in browser

`http://localhost:8000/company/team`

## More about routing
* It is happening automatically
* Under the hood Gatsby is using [Reach Router](https://github.com/reach/router)

## Next - Working with assets in Gatsby
