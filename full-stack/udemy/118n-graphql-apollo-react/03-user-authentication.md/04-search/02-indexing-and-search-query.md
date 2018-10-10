# Indexing and performing search query on input change event
## Add an index

`models/Cologne.js`

```
// MORE CODE

CologneSchema.index({
  '$**': 'text',
});

module.exports = mongoose.model('Cologne', CologneSchema);
```

* We do this in our `models`
* We specify which field we will be indexing
* We want to search on every field in the Cologne `$**` and set it to `text`
* Then we find everything based on `text` provided inside the input
* Then we'll add a meta field and we'll use that to sort the search results
    - This will help us find the most appropriate term we are searching for

`resolvers.js`

* Before we spent time working on if there was no `searchTerm`
* Now we'll focus on if we have a `searchTerm`

```
// MORE CODE

getCologne: async (root, { _id }, { Cologne }) => {
  const cologne = await Cologne.findOne({ _id });
  return cologne;
},

searchColognes: async (root, { searchTerm }, { Cologne }) => {
  // do we have a searchTerm?
  if (searchTerm) {
    // do the search
    const searchResults = await Cologne.find(
      {
        $text: { $search: searchTerm },
      },
      {
        score: { $meta: 'textScore' },
      }
    ).sort({
      score: { $meta: 'textScore' },
    });
    return searchResults;
  } else {
    // no searchTerm so just return all the colognes
    const colognes = await Cologne.find().sort({
      likes: 'desc',
      createdDate: 'desc',
    });

    return colognes;
  }
},


// MORE CODE
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add indexing and search query`

## Push to github
`$ git push origin search`
