# Custom `MongoDB` Aggregations - Part 2

## Sample search concepts
* **$match** things that start with `soccer` but **$limit** it to only `2`
* **$match** `10` things but **$skip** the first `10`

## $unwind
* Deconstructs an array field from the input documents to output a document for each element
* Each output document replaces the array with an element value
* For each input document, outputs n documents where `n` is the number of array elements and can be zero for an empty array

### What we need to do
* We will be grouping our items by the number of tags they have
* But BEFORE YOU CAN GROUP BY, you need to **$unwind** your stores so that for every single tag that exists for a store, there's going to be that many stores (_that sounds confusing... so let's go through an example to help clear things up_)

### Digging in
* You have to pass it an object for each pipeline operator

`Store.js`

```
// more code
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $ unwind: '$tags' },
  ]);
}

module.exports = mongoose.model('Store', storeSchema);
```

#### What does `'$tags'` mean?
* The dollar sign is saying **"This is a field on my document which I wish to unwind"**

##### Let's visualize what we are doing
`storeController.js`

```
// more code
exports.getStoresByTag = async (req, res) => {
  const stores = await Store.getTagsList();
  res.json(stores);
};
```

### View `http://localhost:7777/tags`
You will see ugly JSON

![ugly JSON](https://i.imgur.com/9Hb4Dyb.png)

#### Make JSON pretty
Add this extension to Chrome

![JSON Formatter Chrome extension](https://i.imgur.com/DVO1EKf.png)

Now your JSON is pretty

![JSON pretty](https://i.imgur.com/9WRhNHJ.png)

## What did unwinding do?
* If you comb through our JSON result set you will see we have a lot of duplicated data
* When we unwound, we created a document for every store and broke them up into individual documents for each of their tags
* Yes this is duplicate data but we are not finished yet

## What do we want to do next?
* We want to group them by `tags`
* We want to count them

### $group
Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group. Consumes all input documents and outputs one document per each distinct group. The output documents only contain the identifier field and, if specified, accumulated fields.

### $sum
* Returns a sum of numerical values
* Ignores non-numeric values.
* This is an **Accumulator**

`Store.js`

```
// more code
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } }}
  ]);
}
// more code
```

* We group by `$tags`
* We create a new field called `count` and we sum all the tag groups
    - Each time we group one of these items, the `count` will sum itself by `1`
    - **note** The term `$sum` is confusing here and it would be better if it were called **$add** but it is called **$sum** and there's nothing we can do about it `:(`

## View page again
![summed tags](https://i.imgur.com/tH91U9q.png)

We also want to sort by most popular

### $sort
* Reorders the document stream by a specified sort key
* Only the order changes; the documents remain unmodified
* For each input document, outputs one document

`Store.js`

```
// more code
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } }},
    { $sort: { count: -1 }},
  ]);
}
// more code
```

* We sort by the `count` field in descending order `-1`
    * Sort by ascending is `1`

### Strategies to make querying less complex
* Stackoverflow is a great resource
* Break it down into smaller pieces
    - First unwind it
    - Then group it
    - Then sort that
* This strategy will help you see the different **factories**
* You are `piping` data into one, out of the other and that is why it is called pipeline because you are constantly piping data in and out of all of these different operators

### Updating our Controller
`storeController.js`

```
exports.getStoresByTag = async (req, res) => {
  const tags = await Store.getTagsList();
  res.render('tags', { tags, title: 'Tags' });
};
```

* We rename our variable to `tags` because that is what it is holding
* We point it to a new pug template (we haven't created yet)
* We pass the template our tag object and give the page a title variable with a 'Tags' value

**note** I removed `pre= h.dump(locals.flashes)` from `layout.png` as we don't need it anymore

### Add our `tags` view
`tags.pug`

```
extends layout

block content
  .inner
    h2= title
```

### View in browser
![tags in browser](https://i.imgur.com/JMInl2T.png)

### Dump to see what is inside the `tags` object we passed to the `tags.pug`
`tags.pug`

```
extends layout

block content
  .inner
    h2= title
    pre= h.dump(tags)
```

And our output is:

![tags data dump in tags.pug](https://i.imgur.com/oCXZqI4.png)

### Loop over tags data
`tags.pug`

```
extends layout

block content
  .inner
    h2= title
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}`)
            span.tag__text= tag._id
            span.tag__count= tag.count
```

### View in browser
![tags in browser](https://i.imgur.com/T4ikK2s.png)

#### Pass data from current page into template
When you click on a grouped tag, make that selection visually `active`

`storeController.js`

```
exports.getStoresByTag = async (req, res) => {
  const tags = await Store.getTagsList();
  const tag = req.params.tag;
  res.render('tags', { tags, title: 'Tags', tag });
};
```

##### Update our template
`tags.pug`

```
extends layout

block content
  .inner
    //- update this next line
    h2 #{title} (#{tag})
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}`)
            span.tag__text= tag._id
            span.tag__count= tag.count
```

##### Add Conditional class
* Two ways to set a class
    - a.class-name
    - class=(logic and class-name)

`tags.pug`

```
extends layout

block content
  .inner
    h2 #{title} (#{tag})
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}` class=(tag._id === tag ? tag._id : tag._id))
          pre= h.dump(tag)
            span.tag__text= tag._id
            span.tag__count= tag.count
```

### Houston we have a problem - conficting variable names
We need to change our tag variable names
* Currently we have
    - `tag` which is holding our tag object
    - `tag` is the name of our current tag
    - We need to change one name as it is getting overwritten
    - We'll change the current page name to `tagName`

`storeController.js`

```
exports.getStoresByTag = async (req, res) => {
  const tags = await Store.getTagsList();
  const tagName = req.params.tag;
  res.render('tags', { tags, title: 'Tags', tagName });
};
```

`tags.pug`

```
extends layout

block content
  .inner
    h2 #{title} (#{tagName})
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}` class=(tag._id === tagName ? 'tag__link--active' : ''))
            span.tag__text= tag._id
            span.tag__count= tag.count
```

![on wifi tag page](https://i.imgur.com/yIYpAau.png)

![active page](https://i.imgur.com/isgqpzC.png)

### Default Tags if not on single tags page
`tags.pug`

```
extends layout

block content
  .inner
    h2 #{tagName || 'Tags'}
    ul.tags
      each tag in tags
        li.tag
          a.tag__link(href=`/tags/${tag._id}` class=(tag._id === tagName ? 'tag__link--active' : ''))
            span.tag__text= tag._id
            span.tag__count= tag.count
```
