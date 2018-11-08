# Create Error Component
* Now whenever we submit form we get `token` returned in console

## Do something with our destructured values
`data`, `loading` and `error`

* If there is an error when executing our **Mutation** we get access to `error`

`Signup.js`

```
// MORE CODE

<button className="button-primary">Submit</button>
  {error && <p>{error.message}</p>}
</form>

// MORE CODE
```

## Test it out and see if we get an error displayed in the UI
* Now enter a duplicate user and you will see the error is output

## Adding in some useful logic
* We use coding logic to only show error if error exists, if it doesn't `error.message` will never be printed

![error being printed](https://i.imgur.com/IppFyD9.png)

## Dedicated Error Component
* This will help us organize our code and save us typing something we will use over and over again

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

## Test
* Enter another duplicate user and we get the same UI error output
* It works just like it did before but now our code is better structured and resuable - aka.... DRY!

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add Error Component`

## Push to github
`$ git push origin signup`
