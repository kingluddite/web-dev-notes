# Experimental Layout with CSS grid
## CSS
```
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background: #1fa2ff;
  background: linear-gradient(to right, #a6ffcb, #12d8fa, #1fa2ff);
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  display: grid;
}

.container > * {
  padding: 2rem;
  font-size: 1.4rem;
}

@media (min-width: 768px) {
  .container {
    grid-template-areas:
      'header header header header'
      'left nav nav nav'
      'left content content right'
      'left content content right'
      'footer footer footer right';
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 150px);
    grid-gap: 1rem;
  }

  .header {
    grid-area: header;
    background-color: green;
  }

  .left-content {
    grid-area: left;
    background-color: pink;
  }

  .main-nav {
    grid-area: nav;
    background-color: blue;
  }

  .main-content {
    grid-area: content;
    background-color: grey;
  }

  .right-content {
    grid-area: right;
    background-color: purple;
  }

  .footer {
    grid-area: footer;
    background-color: tomato;
  }
}

```

## html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Layout</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css"
    />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div class="container">
      <header class="header">header</header>

      <nav class="main-nav">main-nav</nav>

      <aside class="sidebar left-content">sidebar 1</aside>

      <main class="main-content">main</main>

      <aside class="sidebar right-content">sidebar 2</aside>

      <footer class="footer">footer</footer>
    </div>
  </body>
</html>

```

