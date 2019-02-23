# Add Cologne Form

`AddCologne`

```
import React, { Component } from 'react';

class AddCologne extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="App">Add Cologne</h2>
        <form className="form">
          <label htmlFor="scentName">Scent Name</label>
          <input
            type="text"
            id="scentName"
            name="scentName"
            placeholder="Scent Name"
          />
          <label htmlFor="scentPrice">Scent Price</label>
          <input
            type="text"
            id="scentPrice"
            name="scentPrice"
            placeholder="Scent Price"
          />
          <label htmlFor="description">Scent Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Scent Description"
          />
          <button type="submit" className="button-primary">Add Cologne</button>
        </form>
      </div>
    );
  }
}

export default AddCologne;
```

## Test it out

`http://localhost:3000/Cologne/add`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add cologne form`

## Push to github
`$ git push origin auth`

## Next - Make AddCologne stateful

