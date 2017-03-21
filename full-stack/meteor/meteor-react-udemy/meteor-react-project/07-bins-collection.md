# Bins Collection
`imports/collections/bins.js`

```
import { Mongo } from 'meteor/mongo';

export const Bins = new Mongo.Collection('bins');
```

## Different properties a bin should have
A collection is an array of objects where each object contains a variety of properties that describe that particular bin

### Time to plan collection properties
Same concept as designing your components but you should know the data you will store inside your collections

#### Bin Model
![Bin Model diagram](https://i.imgur.com/dLpKa9Y.png)

* createdAt (timestamp)
    - MySQL offers this out of the box, not MongoDB
        + We have to manually add this capability with MongoDB
* content (raw markdown - just a raw string)
* ownerId
    - When you sign in as a user to our app, the authentication system automatically generates a `user id` for us
    - This `user id` is a random string of characters which uniquely identifies us as a user
    - By storing the `user id` of the user on the bin we'll have a very clear idea of which bin is owned by which user
        + In other words, whenever a user creates a bin we'll immediately mark it as being owned by the user who just created it
            * And we'll do that by storing their `user id` as `owner id`
* sharedWith (array of emails of people who have access to this bucket)
