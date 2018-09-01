# Create Error Component
* Now whenever we submit form we get token returned in console

## Do something with our destructured values
`data, loading and error`

* If there is an error when executing our Mutation we get access to `error`

`Signup.js`

```
// MORE CODE

<button className="button-primary">Submit</button>
                {error && <p>{error.message}</p>}
              </form>

// MORE CODE
```

* Now enter a duplicate user and you will see the error is output
* We use coding logic to only show error if error exists, if it doesn't `error.message` will never be printed

![error being printed](https://i.imgur.com/IppFyD9.png)

## Dedicated Error Component
* This will help us organize our code and save us typing something we will use a lot, over and over again

## Create Error stateless functional Component
`components/Error.js`

```
import React from 'react';

const Error = ({ error }) => {
  return <p>{error.message}</p>;
};

export default Error;
```

`Signup.js`

```
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

// custom components
import Error from '../Error';

// MORE CODE

  <button className="button-primary">Submit</button>
  {error && <Error error={error} />}
</form>

// MORE CODE
```
