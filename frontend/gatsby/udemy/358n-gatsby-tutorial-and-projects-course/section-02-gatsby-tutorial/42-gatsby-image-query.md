# gatsby-image-query
* Set up one query for the fixed image
    - Image that will have the fixed width
* Set up one query for the fluid image
    - This will be the responsive image
* **note** We can set up two fields in the same query

## sandbox
* We have access to `childImageSharp` because we installed that plugin

### Houston we have a problem
* Sandbox doesn't understand Gatsby fragments

```
{
  file(relativePath:{eq: "dog-one.jpg"}) {
    childImageSharp {
      ...GatsbyImageSharpFixed
    }
  }
}
```

* Will give you an error `Unknown fragment "GatsbyImageSharpFixed`

## Dummy value
* To get around sandbox not understanding fragments we need to use a "dummy" value to make sure at least the query is working

```
{
  file(relativePath:{eq: "dog-one.jpg"}) {
    childImageSharp {
      fixed {
        src
      }
    }
  }
}
```

* Will give us a response

```
{
  "data": {
    "file": {
      "childImageSharp": {
        "fixed": {
          "src": "/static/1885fbe74daea21c7fc3c48101a571ac/2244e/dog-one.jpg"
        }
      }
    }
  }
}
```

## Two in one - fixed and fluid
* We'll use an alias as we have to querys

## Avoid errors
* Add new query after last query ends

## Fluid
* Use a large image for this one

```
{
  fixed: file(relativePath: {eq: "dog-one.jpg"}) {
    childImageSharp {
      fixed {
        src
      }
    }
  }
  fluid: file(relativePath: {eq: "large-image.jpg"}) {
    childImageSharp {
      fluid {
        src
      }
    }
  }
}
```

* Result

```
{
  "data": {
    "fixed": {
      "childImageSharp": {
        "fixed": {
          "src": "/static/1885fbe74daea21c7fc3c48101a571ac/2244e/dog-one.jpg"
        }
      }
    },
    "fluid": {
      "childImageSharp": {
        "fluid": {
          "src": "/static/96a5b843cac0d1330bb4c91b888dbdd3/14b42/large-image.jpg"
        }
      }
    }
  }
}
```

* You can add dimensions in for fixed

```
// MORE CODE

 fixed: file(relativePath: {eq: "dog-one.jpg"}) {
    childImageSharp {
      fixed(width: 300, height: 400) {
        src
      }
    }
  }
// MORE CODE
```
