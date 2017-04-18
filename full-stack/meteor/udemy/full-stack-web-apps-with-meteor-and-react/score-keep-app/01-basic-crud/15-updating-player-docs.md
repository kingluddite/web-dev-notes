# Updating Player Documents
* We need to target the Documents we want to update
* How do we say what we want to change?

## Updating Documents in Meteor Mongo
Check what's in our db collection

`> db.players.find()`

### Goal - Update the score
```
db.collection.update(target the documents you want to update, specify the updates about the Document)
```

#### Example

```
db.players.update({_id: "Lgxp2YYiQky38KHEN"}, {name: "John"})
```

![Result from update query](https://i.imgur.com/6dAlJCg.png)

Then check out your collection with `> db.players.find()`

### Something Strange Happened???
The result set is:

```
{
  "_id": "i6fLDdC4x8iH3xrfT",
  "name": "Manny",
  "score": 0
}
{
  "_id": "vk43eouEQTT3Xb3BS",
  "name": "Moe",
  "score": 0
}
{
  "_id": "Lgxp2YYiQky38KHEN",
  "name": "John"
}
```

When we updated the Name to "John" it didn't just overwrite the value of the name key, but instead it overwrote the Document with just the new name. We lost the score key

Obviously, this is NOT WHAT WE WANT TO DO

You usually update Documents with a set of MongoDB operators and these operators let you update a Document in a way that is far more useful

[MongoDB update documentation](https://docs.mongodb.com/manual/reference/operator/update/)

### Field Operators
Some important ones

Name | Description
|--- | ---
| $inc | Increments the value of the field by the specified amount
| $set | Sets the value of a field in a document

Now let's try this with `> meteor mongo`

`> db.players.update({_id: "Lgxp2YYiQky38KHEN"}, {$set: {score: 10}})`

And if you view all players with: `> db.players.find()` you will see that we have updated our Document but just the key value of the Document and we didn't overwrite the entire Document like we did previously

### $inc
`> db.players.update({_id: "Lgxp2YYiQky38KHEN"}, {$inc: {score: THIS IS THE VALUE YOU WANT TO INCREASE BY}})`

**note** If you use a negative number, it will decrease the current score by that amount

Example:

`> db.players.update({_id: "Lgxp2YYiQky38KHEN"}, {$inc: {score: 1}})`

View all players to see the value of that Document. Then cycle back and rerun both commands and you will see that every time you run the command, the score will increment by 1.

### Decrease a number
`> db.players.update({_id: "Lgxp2YYiQky38KHEN"}, {$inc: {score: -1}})`

### Increase and Decrease points
`client/main.js`

```
const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           Players.update( {_id: player._id }, { $inc: { score: 1} } );
         }}>+1</button>
         <button onClick={() => {
           Players.update( {_id: player._id }, { $inc: { score: -1} } );
         }}>-1</button>
         <button onClick={() => Players.remove({_id: player._id})}>X</button>
       </p>
     );
   });
}
```

## View in browser
You can now increase and decrease points

## Shortcut
Instead of this:

```
<button onClick={() => {
  Players.update( {_id: player._id }, { $inc: { score: -1} } );
}}>-1</button>
```

You can type this:

```
<button onClick={() => {
  Players.update( player._id, { $inc: { score: -1} } );
}}>-1</button>
```

* We can just provide the `id` as the entire first argument so `{_id: player._id }` becomes `player._id`
* So instead of providing a query object we just provide the string of the _id value

### Update our code
```
const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: 1} } );
         }}>+1</button>
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: -1} } );
         }}>-1</button>
         <button onClick={() => Players.remove(player._id)}>X</button>
       </p>
     );
   });
}
```

