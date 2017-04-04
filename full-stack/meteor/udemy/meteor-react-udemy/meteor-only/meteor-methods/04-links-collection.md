# Links collection
Will be data held inside our mdb and it will hold link pairs

## link pairs will be
* long URL
    - The URL the user submits
* short URL
    - The shortened version of the long URL

## Create `imports/collections/links.js`

`links.js`

```
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');
```




