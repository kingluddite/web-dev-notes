# file field
* Once we install gatsby sourcefile-filesystem Plugin we also have access to a `file` field
    - `allFile` gets all files in a directory
    - `file` gets a specific file in a directory
        + The fields still represent whatever fields a file has
            * file had a birthTime, size etc

## Let's find one file size and relative path
```
{
  file{
    size
    relativePath
  }
}
```

* response

```
{
  "data": {
    "file": {
      "size": 4189949,
      "relativePath": "large-image.jpg"
    }
  }
}
```

## But how can I target a specific file?
* Use arguments
* We can target a relativePath that has `dog-two.jpg`

```
{
  file(relativePath: {eq: "dog-two.jpg"}) {
    size
    relativePath
  }
}

```

## Grab a file inside the `copy` folder
```
{
  file(relativePath: {eq: "copy/dog-three.jpg"}) {
    size
    relativePath
  }
}

```

## We will use the `file` field when we set up our pages programatically we will rely heavily on this field
* When we say `file` field we don't mean exact `file` field we mean "the system"

## takeaway
* We can get the whole list with `allFile`
* We can get a piece of the list with `file`
