# Custom MongoDB Aggregations - Part 1
## Working on the `tags` page
* Tags page is different
    - Two pieces of data need to be pulled in for each of these pages
        1. A list of all possible tags
            * Each tag needs to know how many stores are in that tag
        2. When we go to a tag
            * It will filter through all of the stores that have that tag

## How do we make an aggregation of all of the tags?
1. Query every single store
2. Loop over every single store
3. Loop over every single store's tags
4. Count instances of each tag

* That will get slow when you have lots of pieces of content
* If you have 1000 stores, it doesn't make sense to query 1000 stores, have that data come back and then to loop over each and every one of them
* When you start to get into large data sets, following those steps will greatly slow down your site
    - You can run into problems with your server running out of memory
    - 10,000 Documents with 15 fields on them will eat up your memory quickly

## How can we offload the heavy lifting off of `nodejs` and onto our database?
Why?
Because that's what Databases are good at:
* Complex data queries and aggregations
* They are able to look at the data and filter it for specific stuff that it needs
* We just want to write some code in node.js and pass it off to mongodb because mongodb is better at it

## What is Aggregation?
* The ability to do a complex query
* Multiple stepped query, with filters, groups

* Aggregation is an array where you can pass it multiple commands. You can first look for matches and then group them together
* Similar to a `reduce()` function in JavaScript
    - Take the raw data and process it into any format you want
    - We are going to take all of the stores and group the data
[documentation link](https://docs.mongodb.com/manual/aggregation/)

![diagram of aggregation](https://i.imgur.com/DgMVkfc.png)

## View the tags page
We get a 404

`routesindex.js`

```
// more code
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
```

**note**

You could create one route for two routes like this:

`router.get('/tags/:tag*?', catchErrors(storeController.getStoresByTag));`

* And that will mean `:tag` (:tag*? - is a RegEx route) is optional but two routes is more readible and explicit and that is what is recommended

`storeController.js`

```
exports.getStoresByTag = async (req, res) => {
  res.send('it works');
};
```

Test the route in the browser and see if you get the controller result of `it works`

## Get a list of all of the stores
* We can create our own static methods that live on our Store model
* We can name these static methods whatever we want
    - We will use `Store.getTagsList()`

```
exports.getStoresByTag = async (req, res) => {
  const stores = await Store.getTagsList();
};
```

## Add a method onto our schema
`models/Store.js`

```
storeSchema.statics.getTagsList = function() {

}
```

* Important to use proper function here because we need to access `this` inside it
* And this function will be bound to our Model
* All of the static methods are bound to the model
* If you use an arrow function you can not use `this` inside of it
* `aggregate()` is a standard method
    - It takes an array of what we are looking for
    
### Aggregation Pipeline Operators
* [documentation link](https://docs.mongodb.com/manual/reference/operator/aggregation/)
* The `pipeline` is this array:

```
return this.aggregate([
    
]);
```

* They all start with a `$`

**note** - You'll need to preview this markdown in the browser to get the benefit of the following HTML table

<table border="1" class="docutils">
<colgroup>
<col width="27%">
<col width="73%">
</colgroup>
<thead valign="bottom">
<tr class="row-odd"><th class="head">Name</th>
<th class="head">Description</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even"><td><a class="reference internal" href="collStats/#pipe._S_collStats" title="$collStats"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$collStats</span></code></a></td>
<td>Returns statistics regarding a collection or view.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="project/#pipe._S_project" title="$project"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$project</span></code></a></td>
<td>Reshapes each document in the stream, such as by adding new fields or
removing existing fields. For each input document, outputs one
document.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="match/#pipe._S_match" title="$match"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$match</span></code></a></td>
<td>Filters the document stream to allow only matching documents
to pass unmodified into the next pipeline stage. <a class="reference internal" href="match/#pipe._S_match" title="$match"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$match</span></code></a>
uses standard MongoDB queries. For each input document, outputs
either one document (a match) or zero documents (no match).</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="redact/#pipe._S_redact" title="$redact"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$redact</span></code></a></td>
<td>Reshapes each document in the stream by restricting the content for
each document based on information stored in the documents
themselves. Incorporates the functionality of <a class="reference internal" href="project/#pipe._S_project" title="$project"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$project</span></code></a>
and <a class="reference internal" href="match/#pipe._S_match" title="$match"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$match</span></code></a>. Can be used to implement field level
redaction. For each input document, outputs either one or zero
documents.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="limit/#pipe._S_limit" title="$limit"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$limit</span></code></a></td>
<td>Passes the first <em>n</em> documents unmodified to the pipeline
where <em>n</em> is the specified limit. For each input document, outputs
either one document (for the first <em>n</em> documents) or zero documents
(after the first <em>n</em> documents).</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="skip/#pipe._S_skip" title="$skip"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$skip</span></code></a></td>
<td>Skips the first <em>n</em> documents where <em>n</em> is the specified skip number
and passes the remaining documents unmodified to the pipeline. For
each input document, outputs either zero documents (for the first <em>n</em>
documents) or one document (if after the first <em>n</em> documents).</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="unwind/#pipe._S_unwind" title="$unwind"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$unwind</span></code></a></td>
<td>Deconstructs an array field from the input documents to output a
document for <em>each</em> element. Each output document replaces the array
with an element value. For each input document, outputs <em>n</em> documents
where <em>n</em> is the number of array elements and can be zero for an
empty array.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="group/#pipe._S_group" title="$group"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$group</span></code></a></td>
<td>Groups input documents by a specified identifier expression and
applies the accumulator expression(s), if specified, to each group.
Consumes all input documents and outputs one document per each
distinct group. The output documents only contain the identifier
field and, if specified, accumulated fields.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="sample/#pipe._S_sample" title="$sample"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$sample</span></code></a></td>
<td>Randomly selects the specified number of documents from its input.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="sort/#pipe._S_sort" title="$sort"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$sort</span></code></a></td>
<td>Reorders the document stream by a specified sort key. Only the order
changes; the documents remain unmodified. For each input document,
outputs one document.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="geoNear/#pipe._S_geoNear" title="$geoNear"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$geoNear</span></code></a></td>
<td>Returns an ordered stream of documents based on the proximity to a
geospatial point. Incorporates the functionality of
<a class="reference internal" href="match/#pipe._S_match" title="$match"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$match</span></code></a>,
<a class="reference internal" href="sort/#pipe._S_sort" title="$sort"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$sort</span></code></a>, and <a class="reference internal" href="limit/#pipe._S_limit" title="$limit"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$limit</span></code></a> for geospatial data. The
output documents include an additional distance field and can
include a location identifier field.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="lookup/#pipe._S_lookup" title="$lookup"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$lookup</span></code></a></td>
<td>Performs a left outer join to another collection in the <em>same</em>
database to filter in documents from the “joined” collection for
processing.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="out/#pipe._S_out" title="$out"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$out</span></code></a></td>
<td>Writes the resulting documents of the aggregation pipeline to a
collection. To use the <a class="reference internal" href="out/#pipe._S_out" title="$out"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$out</span></code></a> stage, it must be the last
stage in the pipeline.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="indexStats/#pipe._S_indexStats" title="$indexStats"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$indexStats</span></code></a></td>
<td>Returns statistics regarding the use of each index for the
collection.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="facet/#pipe._S_facet" title="$facet"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$facet</span></code></a></td>
<td>Processes multiple <a class="reference internal" href="../../../core/aggregation-pipeline/#id1"><span class="std std-ref">aggregation pipelines</span></a> within a single stage on the same set of
input documents. Enables the creation of multi-faceted
aggregations capable of characterizing data across multiple
dimensions, or facets, in a single stage.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="bucket/#pipe._S_bucket" title="$bucket"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$bucket</span></code></a></td>
<td>Categorizes incoming documents into groups, called buckets, based on
a specified expression and bucket boundaries.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="bucketAuto/#pipe._S_bucketAuto" title="$bucketAuto"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$bucketAuto</span></code></a></td>
<td>Categorizes incoming documents into a specific number of groups,
called buckets, based on a specified expression. Bucket
boundaries are automatically determined in an attempt to evenly
distribute the documents into the specified number of buckets.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="sortByCount/#pipe._S_sortByCount" title="$sortByCount"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$sortByCount</span></code></a></td>
<td>Groups incoming documents based on the value of a specified
expression, then computes the count of documents in each distinct
group.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="addFields/#pipe._S_addFields" title="$addFields"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$addFields</span></code></a></td>
<td>Adds new fields to documents. Outputs documents that
contain all existing fields from the input documents and newly
added fields.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="replaceRoot/#pipe._S_replaceRoot" title="$replaceRoot"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$replaceRoot</span></code></a></td>
<td>Replaces a document with the specified embedded document. The
operation replaces all existing fields in the input document,
including the <code class="docutils literal"><span class="pre">_id</span></code> field. Specify a document embedded in the
input document to promote the embedded document to the top level.</td>
</tr>
<tr class="row-even"><td><a class="reference internal" href="count/#pipe._S_count" title="$count"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$count</span></code></a></td>
<td>Returns a count of the number of documents at this stage of the
aggregation pipeline.</td>
</tr>
<tr class="row-odd"><td><a class="reference internal" href="graphLookup/#pipe._S_graphLookup" title="$graphLookup"><code class="xref mongodb mongodb-pipeline docutils literal"><span class="pre">$graphLookup</span></code></a></td>
<td>Performs a recursive search on a collection. To each output document,
adds a new array field that contains the traversal results of the
recursive search for that document.</td>
</tr>
</tbody>
</table>

* These are the tools that you will use to solve any complex data query


