# Query arguments
* Arguments can be used in all queries
* They allow you to be more specific about the data you are getting back
* You can combine arguments to get even more specific

## arguments
* filter
* limit
* skip
* sort

### limit
* limit my response to 2 items

```
{
  allFile(limit: 2) {
    totalCount
    nodes{
      size
      birthTime
      absolutePath
    }
  }
}
```

* But the response will be 2 documents because of my limit
* But the totalCount is still 5 because I am still looking for my `images` folder

## skip
* Let's use this to skip the first item

```
{
  allFile(skip: 1) {
    totalCount
    nodes{
      size
      birthTime
      absolutePath
    }
  }
}
```

* You'll see a total of 5
* But only 4 images returned and the first image is skipped

## sort
* sort our response based on something
* Let's base our response based on the size of our files
* You need to use `allFile(sort: { fields: size })` or `allFile(sort: {order})`

## sort by field (size)
```
{
  allFile(sort: {fields: size}) {
    totalCount
    nodes {
      size
      birthTime
      absolutePath
    }
  }
}
```

* There is a default sort order but I can specify with a second argument `order` and either **ASC** or **DESC**

```
{
  allFile(sort: {fields: size, order:DESC}) {
    totalCount
    nodes {
      size
      birthTime
      absolutePath
    }
  }
}
```

## filter
* Limit our response based on that specific field
* We used limit to filter results based on a number
* With filter I will use a specific field and limit my response based on that field
* Create a new subfolder in images called `copy` and drag 2 images inside it
    - We'll use `allFile(filter: {relativeDirectory: {eq: "copy"}})`
    - This will point to the relative directory we just created inside `images` named `copy`
    - **note** The total will change to the total number of files inside the `copy` folder

```
{
  allFile(filter: {relativeDirectory: {eq: "copy"}}) {
    totalCount
    nodes {
      size
      birthTime
      absolutePath
    }
  }
}
```

* And the result will be the two files inside the `copy` folder
    - Also note the total count is not 2 because we changed the path to inside our `copy` folder

```
{
  "data": {
    "allFile": {
      "totalCount": 2,
      "nodes": [
        {
          "size": 4815051,
          "birthTime": "2020-07-26T19:37:31.466Z",
          "absolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/030e-gatsby-stuff/udemy/358e-gatsby-projects-course/gatsby-starter-hello-world/src/images/copy/dog-three.jpg"
        },
        {
          "size": 17152687,
          "birthTime": "2020-07-26T19:35:49.962Z",
          "absolutePath": "/Users/philiphowley/Documents/dev/gatsby-stuff/030e-gatsby-stuff/udemy/358e-gatsby-projects-course/gatsby-starter-hello-world/src/images/copy/dog-four copy.jpg"
        }
      ]
    }
  }
}
```

## Run with Explorer
* Faster
* Clear everything
* Click on Explorer to expand it
* Click on allFile to set up a normal query without any kind of arguments
* Expand `nodes`
* Click `absolutePath`, `birthTime` and `size` checkboxes under nodes
* Run and you'll get our first response

### Add arguments
* Choose limit and a number of 3

### Combine arguments
* skip and limit
    - skip of 2 limit 4
* And that will show the last 3 files
