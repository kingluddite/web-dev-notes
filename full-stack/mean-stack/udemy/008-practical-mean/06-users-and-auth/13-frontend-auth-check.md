# Frontend authorization check
`message.service.ts`

* Here is our current code

```js
// more code
getMessages() {
  return this.http.get('http://localhost:3000/message')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => Observable.throw(error.json()));
}
// more code
```

* It is slightly different with `addMessage()`

`message.service.ts`

```js
addMessage(message: Message) {
  const body = JSON.stringify(message);
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // this will automatically set up my query string I want to append to my URL
  const token = localStorage.getItem('token')
    ? `?token=${localStorage.getItem('token')}`
    : '';
  return this.http
    .post(`http://localhost:3000/message${token}`, body, { headers: headers })
    .map((response: Response) => {
      const result = response.json();
      const message = new Message(
        result.obj.content,
        result.obj.user.firstName,
        result.obj._id,
        result.obj.user._id
      );
      this.messages.push(message);
      return message;
    })
    .catch((error: Response) => Observable.throw(error.json()));
}
```

* No need to do the same this with addMessage because the result I send back to the frontend from the `.post()` route already has the expanded `user` object inside of it
  - I find the user by id and then add it to the message

`message.js`

```js
// more code
router.post('/', function(req, res, next) {
  // I don't check the validity of the token (like above)
  // I just decode the token
  // This is ok because we check the validity before reaching this route
  // NEVER USE jwt.decode() if you don't use jwt.veryify() first!
  const decoded = jwt.decode(req.query.token); // I now have the decoded token
  // find the user
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    const message = new Message({
      content: req.body.content,
      user: user
    });
message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      // push the new message on the stack of messages
      user.messages.push(result);
      // then save it to the Database
      user.save();
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});
```

* So now I can use this to get the user firstName and _id

`message.service.ts`

```
.map((response: Response) => {
  const result = response.json();
  const message = new Message(
    result.obj.content,
    result.obj.user.firstName,
    result.obj._id,
    result.obj.user._id
  );
```

* Restart the backend server
* View in browser and you should now see the correct username with each message

![correct username](https://i.imgur.com/O8L1g5x.png)

### Fix edit and delete to show only when user is `owner` of message
* We are already checking this on the backend but we are adding this to provide a better user experience
* **note** A malicious user can manipulate our frontend so we can't really protect against this but this will provide a better UX for the users with good intentions
* The important validation happens on the backend

`message.component.ts`

```js
// more code
  onDelete() {
    this.messageService
      .deleteMessage(this.message)
      .subscribe(result => console.log(result));
  }
  // add this method
  belongsToUser() {
    return localStorage.getItem('userId') === this.message.userId;
  }
}
```

* And now we add it to our template

`message.component.html`

```html
<article class="panel panel-default">
  <div class="panel-body">
    {{ message.content }}
  </div><!-- /.panel-body -->
  <div class="panel-footer">
    <div class="author">
      {{ message.username }}
    </div><!-- /.author -->
    <div class="config" *ngIf="belongsToUser()">
      <a (click)="onEdit()">Edit</a>
      <a (click)="onDelete()">Delete</a>
    </div><!-- /.config -->
  </div><!-- /.panel-footer -->
</article><!-- /.panel panel-default -->
```

* Check it in the browser and now you should only see edit/delete buttons if you are the owner of that message

![show/hide owner](https://i.imgur.com/KNC5UEK.png)

### Next
* Better ways to inform the user that an error has happened
* This improves the UX of your app
