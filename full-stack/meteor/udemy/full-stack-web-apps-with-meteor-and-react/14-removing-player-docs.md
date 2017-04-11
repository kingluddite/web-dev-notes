# Removing Player Documents
To Remove Players we need to know three things:

1. How do we remove a Document?
2. How do we target a specific Document?
    * We will also need this for updating a Document
    * How do we target a specific Player to update them?
3. How do we add a button with a click event?

## Open the Meteor Mongo console
`> meteor mongo`

Find all players with `> db.players.find()`

Inside `.find({})` we can provide an object that we can supply with key value pairs that can act as our query

## Examples: Find all players where name equals "Jack"

`> db.players.find({name: "Jack"})` will return any Documents for players named `Jack`

**note** It is case sensative

Query for all Documents with a score of `0`

`> db.players.find({score: 0})`

## db.players.remove(argument)
Must be privided an argument

If you wanted to remove all documents you could run this (_don't do it please as we want our documents around_)

`> db.players.remove({})` - We provide an empty object as our argument

We can remove a Document by providing an '_id' like this:

`> db.players.remove({_id: "KtBBYRK9AM274yy4i"})`

* Use the terminal to see [an _id you want to use](https://i.imgur.com/IfzfAGT.png)

**nRemoved** - After submitting that to meteor mongo it will remove just one Document and what we get back is an object with an `nRemoved` property (stands for 'number Removed') and we can see we just removed `1` Document. It our query removes more than `1` Document, we will see that number beside the `nRemoved` property

## Button time
Now we know how to remove a Document but we now need to create a button and add a click event to that button so that we can put our remove Document knowledge to use

### Complex JSX
We use parentheses when we write complex JSX because it lets us write our code on multiple lines before returning

```
const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
       </p>
     );
   });
}
```

Add alert click event

```
const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           alert('yo');
         }}>X</button>
       </p>
     );
   });
}
```

Click on X and you will see an alert with `yo`. Nothing spectacular here but we now have our **event listener** set up

## Collection.remove()
* Does take an object and that object takes a query?

### Exercise?
How can you add JavaScript to remove the clicked Player from the `client` and `server` databases from the client?

```
const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           Players.remove({_id: player._id})}
         }}>X</button>
       </p>
     );
   });
}
```

Now we can update this from a JavaScript **statements** Arrow function to a JavaScript **expressions** Arrow function

```
const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => Players.remove({_id: player._id})}>X</button>
       </p>
     );
   });
}
```

## Next Up
Increase and Decrease points which will cover updating existing Documents
