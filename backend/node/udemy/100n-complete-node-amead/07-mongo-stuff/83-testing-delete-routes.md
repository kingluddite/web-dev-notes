# Testing /todos/:id
* Quick fix
* The other routes return an object `{todo}` vs `todo`
* To match the other routes:
    - Change:

```js
app.delete('/todos/:id', (req, res) => {
  // get the id
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send(todo);
    })
    .catch(err => {
      res.status(400).send();
    });
});
```

* Change `res.send(todo);` to `res.send({todo});`
* **note** Which in an abbreviation for `res.send({todo: todo});`
* We are sending the object in the response
* You need to comment out `it blocks` using `done` with nothing inside as they will time out after 2 seconds
