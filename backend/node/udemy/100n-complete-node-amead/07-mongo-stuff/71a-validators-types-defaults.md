# Validators types defaults
```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const otherTodo = new Todo({
  text: ''
});

otherTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
  console.log('Unable to save', err);
});
```

`$ node server/server.js`

```json
{        
  "__v": 0,
  "text": "123",
  "_id": "5a2a055e818315123a01bc3f",
  "completedAt": null,
  "completed": false
}
```

* Now we have a nice default document using requirement and other schema goodies

## Houston we have a problem
* If we try to create a new Todo using a text field value of an Object, I'll get an error
* But if we use a Number or a Boolean we won't get an error because Mongoose will cast them both as a Sting
