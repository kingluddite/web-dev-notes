# Add CSS
* Use skeleton
* [cdnjs.com](https://cdnjs.com/)
* Search for `skeleton`
* Copy this URL `https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css` (you get from this site)

`public/index.html`

```html
<!-- MORE CODE -->

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
  <title>React App</title>
</head>

<!-- MORE CODE -->
```

## Test in browser
* New styles are added (skeleton)

## Add CSS 
`App.css`

```
.App {
  text-align: center;
}

nav {
  text-align: center;
  margin-bottom: 1em;
  padding-bottom: 0.2em;
  padding-top: 2em;
  background-color: #efefef;
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

p,
li {
  font-size: 2rem;
}

ul {
  list-style: none;
}

input,
select,
textarea {
  padding: 0.4em 0.2em;
  font-size: 1.2rem;
}

.active {
  font-weight: bold;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.delete-button {
  color: red;
  cursor: pointer;
}
```

## Test
* No visual change but we now have lots of styles baked into our app


