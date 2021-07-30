# Filterning the data on Pagination
* **note** Any context that gets passed via createPage is automatically available inside your GraphQL query
    - As long as you specify it when writing your query
    - `skip` won't be required (you can just browse to slicemasters on its own)
        + skip will be an Integer (Int in GraphQL)
        + skip will have a default valueof 0 `skip = 0`
        + As a backup well also pass a pageSize default of 4 `pageSize: Int = 4`
           + We do this in the case that undefined is ever passed and it is a good backup

## Here is how we set up our page query to accept variables
* **tip** Using GraphQL Playground will save you time!
    - Use that first than when getting the data you expect
    - Copy and paste it into your page query

`src/pages/slicemasters.js`

* It will rerun automatically and you will see only 2 slicemasters per page

```
// MORE CODE
export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
```

## Test it out
* slicemasters route shows 4 slicemasters (because we used a default of 4)
    - Change pageSize default from 4 to 2

`slicemasters.js`

```
// MORE CODE

export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 2) {

// MORE CODE
```

* Each page you go to shows 2 slicemasters
    - http://localhost:8000/slicemasters/1
    - http://localhost:8000/slicemasters/2
    - http://localhost:8000/slicemasters/3
    - http://localhost:8000/slicemasters/4
    - http://localhost:8000/slicemasters/5
    - http://localhost:8000/slicemasters/6

## Next - Get links of next and previous working
