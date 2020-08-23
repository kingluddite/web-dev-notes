# Slug Query
* The second thing we need is a query that gets all our data and from each and every product gets one unique field
* Before we were getting lots of field but now we just want one unique field
    - And I want to use that field for my slug

## What we need
* Set up a Page query that gets all my product data and then gets one unique field from the product (not all the fields but just that one unique field)

## Now change the query just to get the slug
```
query MyQuery {
  allContentfulProduct {
    nodes {
      slug
    }
  }
}
```

* And the data response

```
{
  "data": {
    "allContentfulProduct": {
      "nodes": [
        {
          "slug": "black-mattress"
        },
        {
          "slug": "leather-sofa"
        },
        {
          "slug": "sectional-sofa"
        }
      ]
    }
  }
}
```


