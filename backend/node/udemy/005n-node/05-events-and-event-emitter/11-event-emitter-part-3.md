# EventEmitter Part 3
* Here's our code from last time:

```js
const EventEmitter = require('events');
const util = require('util');

function Greetr() {
  EventEmitter.call(this);
  this.greeting = 'Hello world';
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function(data) {
  console.log(`${this.greeting}: ${data}`);
  this.emit('greet', data);
}

const greeter1 = new Greetr();

greeter1.on('greet', function(data) {
  console.log(`Someone greeted!: ${data}`);
});

greeter1.greet('John');
```

## Let's update this using ES6 classes
* Note you don't do this with classes:

```js
class Greetr {
  constructor() {
    EventEmitter.call(this);
    this.greeting = 'Hello world';
  }
}
```

* Instead you do this:

```js
class Greetr {
  constructor() {
    super(this);
    this.greeting = 'Hello world';
  }
}
```

* But with `super()` you have to say what you are inheriting from using the `extends` keyword

```js
class Greetr extends EventEmitter {
  constructor() {
    super(this);
    this.greeting = 'Hello world';
  }
}
```

* So I no longer need this line: 

`util.inherits(Greetr, EventEmitter);`

* And since we are not using `util` anywhere else we can remove that line entirely

`const util = require('util');`

## Finished converted to ES6 classes code
```js
'use strict';

const EventEmitter = require('events');

class Greetr extends EventEmitter {
  constructor() {
    super(this);
    this.greeting = 'Hello world';
  }

  greet(data) {
    console.log(`${this.greeting}: ${data}`);
    this.emit('greet', data);
  }
}

const greeter1 = new Greetr();

greeter1.on('greet', function(data) {
  console.log(`Someone greeted!: ${data}`);
});

greeter1.greet('John');
```

## This is node so can I use this in a module?
Yes

`Greetr.js`

```js
'use strict';

const EventEmitter = require('events');

module.exports = class Greetr extends EventEmitter {
  constructor() {
    super();
    this.greeting = 'Hello world';
  }

  greet(data) {
    console.log(`${this.greeting}: ${data}`);
    this.emit('greet', data);
  }
}
```

* Now we export the module and use a **class expression**

`app.js`

```js
'use strict';

const Greetr = require('./Greetr');

const greeter1 = new Greetr();

greeter1.on('greet', function(data) {
  console.log(`Someone greeted!: ${data}`);
});

greeter1.greet('John');
```

* Run it with `$ node app.js`
* It should work just like before:

![output es6 class](https://i.imgur.com/BeLTEW3.png)


