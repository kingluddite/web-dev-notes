# Query Variables
* We already have some random product info, now we need specific product info

## We know how to manually get the slug to change the info we need
```
query GetProducts {
  contentfulProduct(slug: {eq: "leather-sofa"}) {
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

* Will give us leather info like this:

```
{
  "data": {
    "contentfulProduct": {
      "title": "Leather Sofa",
      "price": 10.99,
      "image": {
        "fixed": {
          "src": "//images.ctfassets.net/833fz2zdr4ma/4CMAkpkw3I8uohwihrTWpS/7b6d105d8dc2dc96e96eb0f97f49555e/pexels-martin-pe__chy-1866149.jpg?w=400&q=50"
        }
      },
      "info": {
        "info": "Vice twee cronut, iPhone mlkshk humblebrag disrupt pickled. Distillery trust fund man braid vinyl hella 90's lomo paleo photo booth godard. Gochujang VHS hot chicken, schlitz quinoa skateboard dreamcatcher green juice scenester drinking vinegar. Fanny pack heirloom glossier roof party la croix. Direct trade chillwave craft beer banh mi normcore. PBR&B affogato blue bottle tumblr YOLO hammock pop-up fanny pack. Master cleanse waistcoat photo booth selfies pour-over, mixtape blog salvia tote bag glossier tumeric activated charcoal copper mug asymmetrical."
      }
    }
  }
}
```

## But how can we dynamically get the slug?
* That dynamic way is using `Query variables`
* **IMPORTANT** Name your query uniquely
* Make sure your variable name is the same as the field name used in your query

```
query GetSingleProduct($slug:String) {
  contentfulProduct(slug: {eq: $slug}) {
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

* In our project the above will happen automatically
* But in our sandbox we need a way of testing and passing in a value for our slug and we do that like this:

```
{
  "slug": "sectional-sofa"
}
```

* ![Here is a screenshot](https://i.imgur.com/wqCNhnx.png)

