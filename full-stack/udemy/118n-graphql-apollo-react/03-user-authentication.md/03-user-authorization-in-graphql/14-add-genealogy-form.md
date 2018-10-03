# Add Genealogy Form

`AddGenealogy`

```
import React from 'react';

const AddGenealogy = () => (
  <div className="App">
    <h2 className="App">Add Genealogy</h2>
    <form className="form">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={this.handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={this.handleChange}
      />
      <textarea
        name="description"
        placeholder="Add Description"
        onChange={this.handleChange}
      />
      <button type="submit" className="button-primary">
        Submit
      </button>
    </form>
  </div>
);

export default AddGenealogy;
```

## Test it out
`http://localhost:3000/genealogy/add`

