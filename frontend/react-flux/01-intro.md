# React Flux

react is not a framework
flux is not a framework, it is a pattern

![diagram of flux](https://i.imgur.com/dtsc4Ya.png)

## components
* fire off actions
  + they don't care what happens
  + example: add a new todo
* listen to stores
  + whenever the todo list store updates it receives an event for that and it updates itself with all the new todos
  + what is a `store` - a collection

## actions
* are of one thing only
  + they pipe an action to the dispatcher
  + they don't care what happens after that
  + action might create multiple actions

## dispatcher
* essentially a pubsub
  + what is a pubub?
    - a pattern of communicating events
* one major difference with a pubsub
  + pubsub - every module can subscribe to a specific event or a specific set of events and get notified when that event takes place
  + flux dispatcher - takes every single event that comes through and sends it to ever single subscriber
    - so if you have 4 stores that are registered to the dispatcher, those 4 stores get every single event
      * a store only reacts to an event it cares about
      * why is this a good idea with react?
        + react will give everybody the chance to change, rerender when anything changes about our application

## Constants
* some frameworks use and some don't
* just a way of storing action names

### What does an `Action` look like?

```js
Dispatcher.dispatch({
  type: 'CREATE_TODO',
  title: 'some title'
});

Dispatcher.dispatch({
  type: 'DELETE_TODO',
  id: 1234
});
// some people will use this
Dispatcher.dispatch({
  actionType: 'CREATE_TODO',
  title: 'some title'
});
```
## components need to be able to listen to events
easy to to:

`import {EventEmitter} from 'events'`
* comes with node.js

so we import the EventEmitter and then extend it

```js
class TodoStore extends EventEmitter {

}
```

https://www.youtube.com/watch?v=PEXcg8xu2y0



