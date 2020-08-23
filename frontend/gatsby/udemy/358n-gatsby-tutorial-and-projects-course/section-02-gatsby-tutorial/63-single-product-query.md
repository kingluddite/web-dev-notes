# Single Product Query
* Set up a query that gets info about one product

```
query GetProducts {
  contentfulProduct {
    title
    price
    image {
      fixed {
        src
      }
    }
    info {
      info
    }
  }
}
```

* data result

```
{
  "data": {
    "contentfulProduct": {
      "title": "black mattress",
      "price": 15.99,
      "image": {
        "fixed": {
          "src": "//images.ctfassets.net/833fz2zdr4ma/4wKEhdkihqA86mQylhiAV2/ad0f8701909d2e2bc83f7bc38702fbe2/pexels-patryk-kamenczak-775219.jpg?w=400&q=50"
        }
      },
      "info": {
        "info": "I'm baby cronut microdosing fashion axe, bespoke +1 hexagon helvetica enamel pin photo booth wayfarers pinterest. Meggings palo santo messenger bag fam artisan schlitz stumptown leggings art party godard vegan +1 flexitarian fashion axe sriracha. Cred vape selfies jean shorts occupy w"
      }
    }
  }
}
```

## Houston we have a problem! - We are just getting some random product
* We need a setup where I can get a specific product for the specific page that is being created using `gatsby-node.js`

 
