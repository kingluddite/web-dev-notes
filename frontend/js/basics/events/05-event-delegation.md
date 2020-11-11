# What is event delegation in JavaScript?
* A way you can add a listener once for multiple elements with support for adding extra children later on
* aka Event Propagation or Event Bubbling
* When the event `target` of some element is a `document` or a document `element`, the event itself doesn't stop at that object
    - After the event handlers registered on that target element are invoked (aka "called") most events "bubble up" the DOM tree to parents and grandparents (and those parents and grandparents can handle the same event - So handlers could be set up on those elements and those would be invoked as well)
    - This technique provides an alternative way to register handlers on a lot of different document elements
        + So instead of registering it on each individual element you could register a handler on a parent element and handle the events at that level
        + This could provide a way to solve a problem in a simpler fashion or help you to better manage your code

## Event Bubbling
![event bubbling](https://i.imgur.com/idaZg0E.png)

* Event bubbling means it will execute the most child event first and bubble up to the parent element and see if it has an event and execute that and then go to the parent element and execute that

### Example 1

`index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>What is Event Delgation?</h1>
    <p>
      A way you can add a listener once for multiple elements with support for
      adding extra children later on
    </p>

    <ul class="my-list">
      <li>Apple</li>
      <li>Bananas</li>
      <li>Tomato</li>
    </ul>

    <script></script>
  </body>
</html>
```

## Add an event listener to the `ul`
* But we will prove that we have access to each of the `li`s inside the `ul`

```
// MORE CODE
>
      <li>Apple</li>
      <li>Bananas</li>
      <li>Tomato</li>
    </ul>

    <script>
      // grab the UL
      const myListUlEl = document.querySelector(".my-list");
      // add event listener
      myListUlEl.addEventListener("click", function (e) {
        console.log(e);
      });
    </script>
```

* Click on any `li` and you will see the event is logged
* Search for `target` and you'll see it is `li`

## Click on the (invisible) ul
* Slightly above and to the left of the first `li`
* You may have to try several times but eventually when you click on the ul you will see the target is `target: ul.my-list`

## Add logic
* We want to see if the target is a `li` and if so, change it's bg color

```
// MORE CODE

    <script>
      // grab the UL
      const myListEl = document.querySelector(".my-list");
      // add event listener

      myListEl.addEventListener("click", function (e) {
        const target = e.target;
        // find if the target matches the selector
        // MDN docs - https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
        if (target.matches("li")) {
          // if LI make bg red
          target.style.backgroundColor = "red";
        } else if (target.matches("ul")) {
          // if UL make bg blue
          target.style.backgroundColor = "blue";
        }
      });
    </script>

// MORE CODE
```

## Add support for extra children
* If you add an additional `li` the event delegation will still work

```
// MORE CODE
          target.style.backgroundColor = "blue";
        }
      });

      // create a new LI
      const newLiEl = document.createElement("li");
      // give it some content
      newLiEl.textContent = "my new li";
      // append it to our UL
      myListEl.appendChild(newLiEl);
    </script>
  </body>
</html>
```

* Click on the new `li` and you will see the event delegation still works

## Takeaway
* You don't need to add an event listener to each child in your code

## Example 2

## More info about Event Propagation
* Document events or document elements events bubble up the DOM tree and trigger event handlers of parents and grandparents

### Events that don't "bubble up"
* focus
* blur
* scroll

### Stopping events from bubbling
* Use `event.stopPropagation()` to cancel event bubbling`

`event-delegation.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <header>
      <img
        src="https://i.imgur.com/s4hVjrb.png"
        alt="event delegation diagram"
      />
    </header>
    <div class="content">
      <h1>Event Propagation in Action</h1>
      <div class="bullets">
        <ul>
          <li class="b1">
            Document events or document element events bubble up the DOM tree
            and trigger event handlers of parents and grandparents
          </li>
          <li class="b2">
            Event bubbling provides an alternative way to handle events.
          </li>
          <li class="b3">
            The following document element events do not bubble up: focus, blur
            and scroll.
          </li>
          <li class="b4">
            Use <strong>event.stopPropatation()</strong> to cancel event
            bubbling.
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <h2>Recources</h2>
      <ul>
        <li>
          <a
            href="https://medium.com/better-programming/event-delegation-in-javascript-boost-your-app-performance-5f10f25cec96"
            target="_blank"
            >Event Delegation in JavaScript</a
          >
        </li>
      </ul>
    </footer>
  </body>
</html>
```

## Add some js

`assets/js/script.js`

* We add an event listener to each one of the `li`s

```
document.querySelector(".b1").addEventListener("click", (e) => {
  e.target.classList.toggle("red-text");
});

document.querySelector(".b2").addEventListener("click", (e) => {
  e.target.classList.toggle("red-text");
});

document.querySelector(".b3").addEventListener("click", (e) => {
  e.target.classList.toggle("red-text");
});

document.querySelector(".b4").addEventListener("click", (e) => {
  e.target.classList.toggle("red-text");
}
```

* Make sure to point to js file

`example-two-event-delegation.html`

```
// MORE CODE
      </ul>
    </footer>
    <script src="./assets/js/script.js"></script>
  </body>
</html>
```

* And add simple css

`assets/css/style.css`

```
.red-text {
  color: red;
}

```

* Point to it

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./assets/css/style.css" />

// MORE CODE
```

## Use event delegation to make our code so much more easy to handle
```
document.querySelector(".bullets").addEventListener("click", function (e) {
  e.target.classList.toggle("red-text");
});
// document.querySelector(".b1").addEventListener("click", (e) => {
//   e.target.classList.toggle("red-text");
// });
//
// document.querySelector(".b2").addEventListener("click", (e) => {
//   e.target.classList.toggle("red-text");
// });
//
// document.querySelector(".b3").addEventListener("click", (e) => {
//   e.target.classList.toggle("red-text");
// });
//
// document.querySelector(".b4").addEventListener("click", (e) => {
//   e.target.classList.toggle("red-text");
// });
```

## What if I want to handle the event on the LI and it's parent UL?
* Add to our CSS

```
// MORE CODE

.make-font-larger {
  font-size: 30px;
}

// MORE CODE
```

* Modify our js

```
document.querySelector(".bullets").addEventListener("click", function (e) {
  e.target.classList.toggle("red-text");
});
document.querySelector(".b4").addEventListener("click", function (e) {
  e.target.classList.toggle("make-font-larger");
});
```

* Now you'll see you click on 4th `li` and it will grow in font size (from the LI event) and turn red (from the parent UL event)

## stopPropagation of the event object
* We can stop the event from bubbling up and turning the font color red
* The other `li` still turn red because we did not turn the `stopPropagation()` on for them

```
document.querySelector(".bullets").addEventListener("click", function (e) {
  e.target.classList.toggle("red-text");
});
document.querySelector(".b4").addEventListener("click", function (e) {
  e.target.classList.toggle("make-font-larger");
  e.stopPropagation();
});
```

## How can you handle the event from an element that is higher up on the DOM tree
* But you still want to be specific as to which element you want to do something with

### Let's specify the red text only happens on the class of `b3`
```
document.querySelector(".bullets").addEventListener("click", function (e) {
  if (e.target.getAttribute("class") === "b3") {
    e.target.classList.toggle("red-text");
  }
});

```


### Additional Resources
* [Event Bubbling and Capturing in JavaScript (jquery)](https://www.youtube.com/watch?v=sfKDOOJgbSI)
* [The Deep Dive into Event Propagation (Zac Gordan)](https://www.youtube.com/watch?v=BtOrr7oTH_8)


