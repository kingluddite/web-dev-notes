# Freelancer website CSS Grid
* Fully responsive without media queries

## HTML
`index.html`

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" />
  <link href="https://fonts.googleapis.com/css?family=Staatliches" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
  <title>Freelancer - CSS Grid</title>
</head>

<body>
  <header class="hero">
    <div class="container">
      <h1 class="sitename ">Web Design & Development Freelancer</h1>
      <p class="tagline">Design, Develop & E-Commerce</p>
    </div>
  </header>

  <main class="services container">
    <div class="service">
      <h2>Web Design</h2>
      <i class="fas fa-pencil-alt"></i>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi doloremque quae architecto animi impedit
      </p>
    </div>
    <div class="service">
      <h2>Web Development</h2>
      <i class="fas fa-code"></i>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi doloremque quae architecto animi impedit
      </p>
    </div>
    <div class="service">
      <h2>E-Commerce</h2>
      <i class="fas fa-shopping-bag"></i>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi doloremque quae architecto animi impedit
      </p>
    </div>
  </main>

  <section class="portfolio-container container">
    <h2>My Portfolio</h2>
    <div id="portfolio" class="portfolio"></div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="widget">
        <h3>Contact Me</h3>
        <p>Tel: 215-123-1111</p>
        <p>Address Here</p>
        <p>Utah</p>
      </div>
    </div>

    <div class="widget">
      <h3>About Me</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, quia possimus
    </div>
  </footer>
  <script src="js/app.js"></script>
</body>

</html>
```

## Center item vertical centered with grid
### HTML fragment
```
// MORE CODE

<body>
  <header class="hero">
    <div class="container">
      <h1 class="sitename ">Web Design & Development Freelancer</h1>
      <p class="tagline">Design, Develop & E-Commerce</p>
    </div>
  </header>

// MORE CODE
```

### CSS
```
// MORE CODE

.hero {
  display: grid;
  align-content: center;

  /* justify-content: center; -- uncomment if you want on two lines*/
  height: 100vh;
  color: var(--light);
  text-align: center;
}

// MORE CODE
```

## hero

```
// MORE CODE
.hero {
  height: 100vh;
  color: var(--light);
  background-image: url('../img/bg.jpg');
  background-size: cover;

  /* justify-content: center; */
}

.hero .container {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 0.5rem;
  align-content: center;
  height: 100vh;
  text-align: center;
}
```

## Services
### CSS
```
// MORE CODE
.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 3rem;
}

.service {
  margin-top: 3rem;
  text-align: center;
}

/* add bottom underline */

.service h2::after {
  display: block;
  width: 7rem;
  height: 0.5rem;
  margin: 1rem auto 0 auto;
  content: '';
  background-color: var(--primary);
}

.service i {
  font-size: 3rem;
  color: var(--secondary);
}
```

### HTML
```
// MORE CODE

    <main class="services container">
      <div class="service">
        <h2>Web Design</h2>
        <i class="fas fa-pencil-alt"></i>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
          doloremque quae architecto animi impedit
        </p>
      </div>
      <div class="service">
        <h2>Web Development</h2>
        <i class="fas fa-code"></i>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
          doloremque quae architecto animi impedit
        </p>
      </div>
      <div class="service">
        <h2>E-Commerce</h2>
        <i class="fas fa-shopping-bag"></i>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
          doloremque quae architecto animi impedit
        </p>
      </div>
    </main>

// MORE CODE
```

## Footer
* Had a mistake in the structure and here is the fix

### html
```
// MORE CODE
    <footer class="footer">
      <div class="container">
        <div class="widget">
          <h3>Contact Me</h3>
          <p>Tel: 215-123-1111</p>
          <p>Address Here</p>
          <p>Utah</p>
        </div>

        <div class="widget">
          <h3>About Me</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, quia
            possimus
          </p>
        </div>
      </div>
    </footer>
```

### css
```
// MORE CODE
/* footer */

.footer {
  padding: 2rem 0;
  margin-top: 3rem;
  color: var(--light);
  background-image: url('../img/contact.jpg');
  background-size: cover; /* take up available space */
}

.footer .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

## Fetch and JSON with JavaScript
 
