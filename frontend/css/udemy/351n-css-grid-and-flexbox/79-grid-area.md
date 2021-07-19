# Grid Area
* Use grid area to create a common layout with header main sidebar and footer

`styles.css`

```
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  margin: 0;
}
img {
  width: 100%;
}

.container {
  height: 100vh;
  width: 900px;
  margin: 0 auto;

  display: grid;
  /* rows / columns  */
  grid: 100px auto 100px / repeat(4, 1fr);
  grid-template-areas:
    'header header header sidebar'
    'main main main sidebar'
    'footer footer footer sidebar';
}

.header {
  background-color: coral;
  color: white;
  text-align: center;

  grid-area: header;
}

.main-content {
  background-color: darkred;

  grid-area: main;
}
.sidebar {
  background-color: olive;
  grid-area: sidebar;
}
.footer {
  background-color: navy;
  grid-area: footer;
}

.media-container {
  margin: 0 auto;
  max-width: 800px;
}

.site-title {
}
.tagline {
}

.image {
}
.info {
}
.entry {
}


```

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Auto Flow</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
        <div class="container">
                <header class="header">
                    <h1>Site Name</h1>
                </header>
            
                <main class="main-content">
                </main> 
            
                <aside class="sidebar">
            
                </aside>
            
                <footer class="footer">
            
                </footer>
        </div>

</body>
</html>

```

## Add a grid gap
```
// MORE CODE

.container {
  height: 100vh;
  width: 900px;
  margin: 0 auto;

  display: grid;
  /* rows / columns  */
  grid: 100px auto 100px / repeat(4, 1fr);
  grid-template-areas:
    'header header header sidebar'
    'main main main sidebar'
    'footer footer footer sidebar';

  grid-gap: 1rem;
}

// MORE CODE
```

## Example using grid-template-area to mimic the old floats
```
// MORE CODE

.media-container {
  margin: 0 auto;
  max-width: 800px;

  display: grid;
  grid-template-areas:
    'title title title title'
    'image desc desc desc';
  grid-gap: 1rem;
}

.site-title {
  grid-area: title;
}
.image {
  grid-area: image;
}
.description {
  grid-area: desc;
  text-align: center;
}

// MORE CODE
```

`index2.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Auto Flow</title>
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
        <div class="media-container">
            <h1 class="site-title">Cart Name</h1>
            <img src="../img/01.jpg" class="image">
            <p class="description"> Vestibulum sodales ultricies nibh, quis dictum mauris eleifend et. Fusce eu interdum dui. Sed congue suscipit dignissim. In hac habitasse platea dictumst. Etiam at ligula eget magna varius luctus. Nullam ut quam mauris.</p>
        </div>

</body>
</html>
```

## change the order of elements
* Without changing the HTML

`css`

```
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  margin: 0;
}
img {
  width: 100%;
}

.container {
  height: 100vh;
  width: 900px;
  margin: 0 auto;

  display: grid;
  /* rows / columns  */
  grid: 100px auto 100px / repeat(4, 1fr);
  grid-template-areas:
    'header header header sidebar'
    'main main main sidebar'
    'footer footer footer sidebar';

  grid-gap: 1rem;
}

.header {
  background-color: coral;
  color: white;
  text-align: center;

  grid-area: header;
}

.main-content {
  background-color: darkred;

  grid-area: main;
}
.sidebar {
  background-color: olive;
  grid-area: sidebar;
}
.footer {
  background-color: navy;
  grid-area: footer;
}

.media-container {
  margin: 0 auto;
  width: 100%;
  display: grid;

  grid-template-areas:
    'title'
    'tagline'
    'info'
    'image'
    'entry';
}

@media (min-width: 480px) {
  .media-container {
    max-width: 800px;
    margin: 0 auto;
    grid-template-areas:
      'title title'
      'image tagline'
      'image info'
      'entry entry';
  }
}

.site-title {
  grid-area: title;
}
.image {
  grid-area: image;
}
.description {
}

.tagline {
  grid-area: tagline;
}

.info {
  grid-area: info;
}
.entry {
  grid-area: entry;
}

```

* And the html

```
      <h1 class="site-title">Cart Name</h1>
      <img src="../img/01.jpg" class="image" />

      <div class="info">
        <p>Written By: Admin</p>

        <p>22th December 2019</p>
      </div>

      <blockquote class="tagline">"Best Car Models for 2019"</blockquote>

      <div class="entry">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat diam est, mollis
          porta mauris fermentum non. Sed ultrices feugiat nisl et ornare. Phasellus porta enim in
          mauris malesuada, sit amet interdum mi ullamcorper. Phasellus bibendum ante eget nulla
          dictum porta. Donec varius, enim et varius aliquam, leo mauris cursus erat, quis placerat
          lacus ligula non lorem. Donec porta nunc enim, a consequat urna aliquam vitae. Duis
          volutpat arcu iaculis massa viverra dignissim. Curabitur vel eros nulla. Nunc sed metus
          erat.
        </p>

        <p>
          Nam ullamcorper sapien a justo rhoncus tempus. Aenean non placerat orci. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut id
          dignissim mauris, sed vehicula purus. Vestibulum auctor tellus augue, non sodales metus
          tempus id. Quisque quis dapibus tellus. Nulla posuere lobortis arcu id varius. In eu
          congue est. Sed vitae nisl nisi. Suspendisse potenti. Aenean in ipsum eget ex aliquet
          feugiat congue a lorem. Vivamus varius finibus lorem, eu gravida justo commodo vitae.
          Integer ullamcorper tortor at lorem auctor, sit amet sodales turpis molestie. Donec
          efficitur nulla ac massa aliquam, id porttitor orci sollicitudin.
        </p>
      </div>
    </div>
  </body>
</html>


```


