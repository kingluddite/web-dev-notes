# Adding Custom Models
* We have backend models
* We should have frontend models
* We can't access our backend models from our angular 2 app
* We will later reach around and fetch and store data but we are not able to use the properties of our model to validate our front end

## We will creat the same models on the front end
* It will be a blue print to work with
    - A user will have these fields
    - A message will have these fields
    - And the ability to add additional fields

### Create two new files
* `message.model.ts`
* `user.model.ts`

`message.model.ts`

```js
export class Message {
  content: string;
  username: string;
  messageId: string;
  userId: string;

  constructor(content: string, username: string, messageId: string, userId: string) {
    this.content = content;
    this.username = username;
    this.messageId = messageId;
    this.userId = userId;
  }
}
```

### Let's set up the user
* We can use a shortcut to achieve the same thing
* `public` lets us only type them once but will do the same output as before but with less typing
* `?` means the field is optional

`user.model.ts`

```js
export class User {
  constructor(public email: string,
              public password: string,
              public firstName?: string,
              public lastName?: string) {}
}
```

* Update `message.model.ts` to have optional fields designated

`message.model.ts`

```js
export class Message {
  content: string;
  username: string;
  messageId?: string;
  userId?: string;

  constructor(content: string, username: string, messageId?: string, userId?: string) {
    this.content = content;
    this.username = username;
    this.messageId = messageId;
    this.userId = userId;
  }
}
```
