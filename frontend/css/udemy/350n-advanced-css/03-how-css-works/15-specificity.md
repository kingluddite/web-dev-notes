# Specificity in Practice
* codepen.io
* login
* create a new pen

`HTML`

```
// MORE CODE

<nav id="nav">
  <div class="pull-right"><a href="link.html" class="button button-danger">Don't click here!</a></div>
</nav>
// MORE CODE
```

`CSS`

```
body {
  padding: 50px;
}

.button {
  font-size: 20px;
  color: white;
  background-color: blue
}

a {
  background-color: purple;
}

#nav div.pull-right a.button {
  background-color: orangered;
}

#nav a.button:hover {
  background-color:yellow;
}
```

* The link will be orange

## Add an !important

`CSS`

```
body {
  padding: 50px;
}

.button {
  font-size: 20px;
  color: white;
  background-color: blue
}

a {
  background-color: purple !important;
}

#nav div.pull-right a.button {
  background-color: orangered;
}

#nav a.button:hover {
  background-color:yellow;
}
```

* link is purple

## Why doesn't it turn to yellow when we hover?
* Because pseudo classes also count when it comes to specificity

## Make green hover work
```
// MORE CODE

body {
  padding: 50px;
}

.button {
  font-size: 20px;
  color: white;
  background-color: blue
}

a {
  background-color: purple;
}

#nav div.pull-right a.button {
  background-color: orangered;
}

#nav div.pull-right a.button:hover {
  background-color: green;
}

#nav a.button:hover {
  background-color:yellow;
}
// MORE CODE
```

* [Link for code pen](https://codepen.io/kingluddite/pen/yLYJEGy)
