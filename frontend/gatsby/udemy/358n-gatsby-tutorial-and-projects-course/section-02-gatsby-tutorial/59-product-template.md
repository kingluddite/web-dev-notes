# Product Template
* In order to set up pages programmatically in gatsby you'll need 4 things

1. Some kind of template
2. You'll need a query that gets all the products
3. You'll need to set up a Gatsby node file (just taps into node APIs)
4. Then you need to set up a query that uses the variables

## Page Query vs Static Query
* The difference between them is that in Page Query you can use variables (and this is the use case where we will set up a page query that well have a variable
    - And then for each and every page we'll get specific info about that product

### Let's start with the template
* The page setup is the same but the info differs

### Create a `templates` directory inside of `src`
`src/templates/product-template.js`

* Use VSC snippet but you need to change name because you can't have "dashes" in component names in React
* So change this:

```
import React from 'react'

const product-template = () => {
  return (
    <div>
      
    </div>
  )
}

export default product-template
```

* To this (camelCase)

`product-template.js`

* This will serve as a base for all our single pages
    - The only difference is we'll have a query (Page Query) that uses the variable
        + And then for each and every page that we'll create (ie for each product) we'll just grab that specific data for that product and then add it in our template

```
import React from 'react';

const productTemplate = () => {
  return <div>test</div>;
};

export default productTemplate;
```


