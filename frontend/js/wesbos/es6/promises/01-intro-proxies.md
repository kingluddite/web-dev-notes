# Intro to [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
Proxies allow you to overwrite the default behavior for many of an object's default operations

With an object you can get things, you can set things, you can check if it has an item or a certain property. There are a whole bunch of methods that come along with the default object

## What if you wanted to override these default objects?

We were using object getters and setters (not part of ES6)

`new Proxy(target - what object would you like to Proxy, handler - specify all the operations which you wish to rewrite)`

### traps
When you want to override a default operation with Proxies

```js
const person = { name: 'John', age: 100 };
const personProxy = new Proxy(person, {
  get(target, name) {
    console.log('someone is asking for ', target, name);
  }
});

personProxy.name = 'Johnnie';
```

In console type: `personProxy` and you will see a regular object returned

But if you type: `personProxy.name` you will get: `someone is asking for  Object {name: "John", age: 100} name`

But if you add a return from the Proxy

```js
const person = { name: 'John', age: 100 };
const personProxy = new Proxy(person, {
  get(target, name) {
    console.log('someone is asking for ', target, name);
    return 'Yo from the Proxy!';
  }
});

personProxy.name = 'Johnnie';
```

You will get `"Yo from the Proxy!"` returned

We jumped in the middle of that get, hijacked it, and returned our own

So what if we always wanted what was passed to be UpperCase?

```js
const person = { name: 'John', age: 100 };
const personProxy = new Proxy(person, {
  get(target, name) {
    // console.log('someone is asking for ', target, name);
    return target[name].toUpperCase();
  }
});

personProxy.name = 'Johnnie';
```

And when we type `personProxy.name` we will get `"JOHNNIE"`;

## Add a setter
```js
const person = { name: 'John', age: 100 };
const personProxy = new Proxy(person, {
  get(target, name) {
    // console.log('someone is asking for ', target, name);
    return target[name].toUpperCase();
  },
  set(target, name, value) {
      if(typeof value === 'string') {
        target[name] = value.trim().toUpperCase() + '✂️';
      }
    }
});

personProxy.name = 'Johnnie';
```

![person proxy](https://i.imgur.com/vhJeLK7.png)


