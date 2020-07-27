# allFile field in GraphQL
* Open sandbox
* Manually type

## edges vs nodes
* Old way edges
* New way nodes
* Both essentially represent all of the items
    - all the products
    - all the images
    - think of "collection of things"
        + Then when you "drill down" you'll work with that one specific thing
            * one specific image
            * one specific product

## edges
* `allFile > edges > node` (node represent one specific item/image)

## Picking and choosing what you need
* Don't be greedy and grab everything
* Prettify code

```
{
  allFile {
    edges {
      node {
        size
        birthTime
        absolutePath
      }
    }
  }
}
```

* Run query

```
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "size": 4729309,
            "birthTime": "2020-07-26T19:36:54.794Z",
            "absolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/030e-gatsby-stuff/udemy/358e-gatsby-projects-course/gatsby-starter-hello-world/src/images/dog-two.jpg"
          }
        },
        {
          "node": {
            "size": 4815051,
            "birthTime": "2020-07-26T19:37:31.466Z",
            "absolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/030e-gatsby-stuff/udemy/358e-gatsby-projects-course/gatsby-starter-hello-world/src/images/dog-three.jpg"
          }
        },
        {
          "node": {
            "size": 17152687,
            "birthTime": "2020-07-26T19:35:49.962Z",
            "absolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/030e-gatsby-stuff/udemy/358e-gatsby-projects-course/gatsby-starter-hello-world/src/images/dog-one.jpg"
          }
        }
      ]
    }
  }
}
```

## How many items
* We can use `totalCount` inside allFile to find out how many images we have access to (should be 3)

```
// MORE CODE

{
  "data": {
    "allFile": {
      "totalCount": 3, // We have 3
      "edges": [
        {
          "node": {
            "size": 4729309,
            "birthTime": "2020-07-26T19:36:54.794Z",
// MORE CODE
```

* Grab a large screenshot of your desktop
* We need to test a large image
* Drag screenshot into images folder and rename (accept that it is ok to rename to jpg) and call it large-image.jpg)
* Copy a dog image and rename as dog-four.jpg
* **NOTE** JPG and JPEG stand both for an image format proposed and supported by the Joint Photographic Experts Group. The two terms have the same meaning and are interchangeable.
* Run search again and you now see 5 images (or more accurately 5 files)

## edges vs nodes
* nodes is more modern
* Delete `edges`
* Now with nodes we have access to a bunch of things we had with edges but now I don't have to type edges

```
{
  allFile {
    totalCount
    nodes{
      size
      birthTime
      absolutePath
    }
  }
}
```

* `nodes` saves time/typing
* Just allFile > nodes > right away into the object properties
* rather than allFiles > edges > node > get into object properties


