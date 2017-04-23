# Short Ids
[npm short id](https://www.npmjs.com/package/shortid)
`ShortId` creates amazingly short non-sequential url-friendly unique ids. Perfect for url shorteners, MongoDB and Redis ids, and any other id users might see

## Examples
dogPzIz8
nYrnfYEv
a4vhAoFG
hwX6aOr7

We will use these for our links

## Install shortId
`$ npm i shortid -S`

**note** When you insert into Mongo it creates an `_id` for you

`links.js`

```
Links.insert({
      url,
      userId: this.userId
    });
```

But you can override that _id with:

`links.js`

```
Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId
    });
```

1. Log in
2. Create a new link
3. Check MiniMongo and MongoDB if the shortid was added

After testing you should see the old `_id` and then the new `_id` using our new npm package shortid

![shortid](https://i.imgur.com/KpLm7Qk.png)

Now test in URL `http://localhost:3000/HyyL0ywRx` and whether you are logged in or not, the link should work!
