## PubSub
aka - mediator, events bus, events system

terminology
pubsub (other way to name it - events)
pubsub.subscribe (events.subscribe)
pubsub.unsubscribe (events.unsubscribe)
pubsub.publish (events.publish)

or
events
events.on('peopleChanged', someHandler);
events.trigger('peopleChanged', 3);
or
events.emit('peopleChanged', 3); // angular used `emit` terminology

## how it works

```js
// events - a super-basic JavaScript (publish subscribe) pattern
events.on('peopleChanged', someHandler);
events.on('peopleChanged', someOtherHandler);

events.emit('peopleChanged', 3);

var events = {
  events: {
    peopleChanged: [someHandler(3), someOtherHandler(3)];
  },
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn ) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};
```

[http://codepen.io/anon/pen/LVXrao](code for pubsub)

```html
<!DOCTYPE html>
<html class="no-js" lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Modular JavaScript - Pubsub</title>
  <link rel="stylesheet" href="style.css">
</head>

<body data-gclp-initialize="true" data-gistbox-initialized="true">
  <div class="hero-unit" id="statsModule"></div>
  <script id="stats-template" type="text/template">
    <h2>Stats</h2>
    <strong>people: {{people}}</strong>
  </script>
  <!-- /.hero-unit -->
  <div id="peopleModule">
    <h1>People</h1>
    <input placeholder="name" type="text" />
    <button id="addPerson">Add Person</button>
    <ul id="people">
      <script id="people-template" type="text/template">
        {{#people}}
        <li>
          <span>{{.}}</span>
          <i class="del">X</i>
        </li>
        {{/people}}
      </script>
    </ul>
    <!-- /#people -->
  </div>
  <!-- /#peopleModule -->
  <!-- build:js scripts/vendor.js -->
  <!-- bower:js -->
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="bower_components/mustache.js/mustache.js"></script>
  <!-- endbower -->
  <!-- endbuild -->
  <!-- build:js{app,.tmp}} scripts/main.js -->
  <script src="pubsub.js"></script>
  <script src="stats.js"></script>
  <script src="people.js"></script>
  <!-- endbuild -->
  <script></script>
</body>

</html>
```

`pubsub.js`

```js
// events - a super-basic JavaScript (publish subscribe) pattern

var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn ) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};
```

`stats.js`

```js
var stats = (function() {
  var people = 0;

  //cache DOM
  var $stats = $('#statsModule');
  var template = $('#stats-template').html();

  _render();

  function _render() {
    $stats.html(Mustache.render(template, {people: people}));
  }

  function setPeople(newPeople) {
    people = newPeople;
    _render();
  }

  function destroy() {
    $stats.remove();
    events.off('peopleChanged', setPeople);
  }

  return {
    setPeople: setPeople
  };
})();
```

`people.js`

```js
var people = (function() {
  var people = ['Phil', 'Steve'];

  // cache DOM
  var $el = $('#peopleModule');
  var $button = $el.find('button');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = $el.find('#people-template').html();

  // bind events
  $button.on('click', addPerson);
  $ul.delegate('i.del', 'click', removePerson);

  _render();

  function _render() {
    $ul.html(Mustache.render(template, {people: people}));
    stats.setPeople(people.length);
  }

  function addPerson(value) {
    var name = (typeof value === 'string') ? value : $input.val();
    people.push(name);
    _render();
    $input.val('');
  }

  function removePerson(event) {
    var i;
    if (typeof event === 'number') {
      i = event;
      console.log(event);
    } else {
      var $remove = $(event.target).closest('li');
      var i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);

    _render();
  }

  return {
    addPerson: addPerson,
    removePerson: removePerson
  };
})();
```

`pubsub.css`

```css
body {
    background: #fafafa;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #333;
}

.hero-unit {
    margin: 20px auto 0 auto;
    width: 300px;
    font-size: 12px;
    font-weight: 200;
    line-height: 20px;
    background-color: #eee;
    border-radius: 6px;
    padding: 10px 20px;
}

.hero-unit h1 {
    font-size: 60px;
    line-height: 1;
    letter-spacing: -1px;
}

.browsehappy {
    margin: 0.2em 0;
    background: #ccc;
    color: #000;
    padding: 0.2em 0;
}

input {
    border: 1px solid #999;
    border-radius: 4px;
    padding: 10px;
}

button {
    zoom: 2;
    background-color: #999;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 1px 5px;
}

button.active {
    background-color: rgb(165, 227, 158);
}

#peopleModule {
    text-align: center;
}

#peopleModule ul {
    padding: 0;
}

#peopleModule li {
    display: inline-block;
    list-style-type: none;
    background: #98ec9b;
    border-radius: 5px;
    padding: 3px 8px;
    margin: 5px 0;
    width: 200px;
    opacity: 0.8;
    transition: opacity 0.3s;
}

#peopleModule li:hover {
    opacity: 1;
}

#peopleModule li span {
    display: inline-block;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
}

#peopleModule li i {
    cursor: pointer;
    font-weight: bold;
    float: right;
    font-style: normal;
    background: #666;
    padding: 2px 4px;
    font-size: 60%;
    color: white;
    border-radius: 20px;
    opacity: 0.7;
    transition: opacity 0.3s;
    margin-top: 3px;
}

#peopleModule li i:hover {
    opacity: 1;
}
```


## subscribe to an event

```js
var people = (function() {
  var people = ['Phil', 'Steve'];

  // cache DOM
  var $el = $('#peopleModule');
  var $button = $el.find('button');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = $el.find('#people-template').html();

  // bind events
  $button.on('click', addPerson);
  $ul.delegate('i.del', 'click', removePerson);

  _render();

  function _render() {
    $ul.html(Mustache.render(template, {people: people}));
    //stats.setPeople(people.length);
    events.emit('peopleChanged', people.length); // ADDED THIS LINE
  }

  function addPerson(value) {
    var name = (typeof value === 'string') ? value : $input.val();
    people.push(name);
    _render();
    $input.val('');
  }

  function removePerson(event) {
    var i;
    if (typeof event === 'number') {
      i = event;
      console.log(event);
    } else {
      var $remove = $(event.target).closest('li');
      var i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);

    _render();
  }

  return {
    addPerson: addPerson,
    removePerson: removePerson
  };
})();
```

then in console type this:

```js
events.on('peopleChanged', function(count) {
  console.log(count);
});
```
so now I just subscribed to an event (so now we should update console.log() whenever the count changes)

click to add and remove people and see how count is updating. this is because we used events.emit inside the people render method

we go into stats and remove the return so we are no longer exposing our method to an API.

we then bind it to a pubsub events instead of binding it to a DOM event

I can change `_render` to `render` because I have no more API

### Why this is great

#### stats
stats does not know where the 'peopleChanged' event comes from
there could be 20 other modules triggering this `peopleChanged` event and it doesn't matter

#### people
people doesnt' care about the stats modules
it doesn't care about any of the other modules
it just emits this event with this data
anybody else can listen to that

##### destroy added to our API
what if we created a destroy method for our API that will remove the stats module from our page

unbind and event

```js
// unbind an event
    events.off('peopleChanged', setPeople);
  }
```

so now you are no longer listening to that 'peopleChanged' event

view in browser. add remove names
type `stats.destroy()` in browser and the stats module disappears and it no longer listens to the 'peopleChanged' event

```js
var stats = (function() {
  var people = 0;

  //cache DOM
  var $stats = $('#statsModule');
  var template = $('#stats-template').html();

  // bind events
  events.on('peopleChanged', setPeople);

  render();

  function render() {
    $stats.html(Mustache.render(template, {people: people}));
  }

  function setPeople(newPeople) {
    people = newPeople;
    render();
  }

  function destroy() {
    // remove stats from jquery DOM
    $stats.remove();
    // unbind an event
    events.off('peopleChanged', setPeople);
  }

  // return {
  //   setPeople: setPeople
  // };

  return {
    destroy: destroy
  }
})();
```

so if the stats module is on the page or not, my app doesn't break, because I don't care if its there.

we are just emitting events and whether that's events there or not, everything is fine


