# Limitations of Subdocument Collections
![no dupes diagram](https://i.imgur.com/wPNcn0R.png)

## What are subdocuments?
![subdocument visual](https://i.imgur.com/65cXK2z.png)

### Why do we even want to use subdocuments?
* We use them when we want to make a VERY CLEAR ASSOCIATION between two documents
* Each Recipient with an email and a clicked property only ever will belong to its parent survey
    - And this Recipient has no use in the context of any other survey inside the surveys collection
    - In other words, the Recipient is only useful as a child of this Survey
    - So we use subdocuments when we want to make some ownership relationship very clear

### Why make a separate collection for Surveys, but not for recipients?
![user and survey collection diagram](https://i.imgur.com/F0eop6x.png)

* Why does a User have references to these other Surveys they created?
* And why does the User not have Surveys listed as a subdocument collection?

![surveys as a subdocument](https://i.imgur.com/M99bM7I.png)

* Above shows we have a User Model
    - And it has a subdocument of Survey
        + And it has a subdocument of Recipient

## There is a practical reason why we don't deeply nest subdocuments in Mongo
* In the `MongoDB` world we refer to each record inside a collection as a Document
* And the Survey and it's nested Recipient are each considered a Document

![one document as a survey](https://i.imgur.com/eRbvCoV.png)

### Mongo has a limit for a single record ---> 4mb
![mongo limit](https://i.imgur.com/cr3QTj8.png)

* Each document can only have 4mb into a single document

#### Do the math
* [byte-counter](https://mothereff.in/byte-counter)
* Enter your email and find out how many bytes it is
    - My email is 20 bytes
    - If you take that number and multiple by 200,000, that is approx 4mb
        + A single Survey can only store 200,000 surveys
            * So that is ok, we would top off at around 200,000 emails for a given survey
* So if we nest Subdocuments we quickly use up that 4mb of storage
* And worse our User would be limited to the total number of emails they can send out due to this size restriction

## Takeaway
* We don't nest subdocuments deeply due to the physical limitations of `MongoDB`
