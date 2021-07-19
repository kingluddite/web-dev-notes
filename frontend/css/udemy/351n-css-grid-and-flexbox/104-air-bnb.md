# airbnb
## HTML
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>AirCSSGrid.com</title>
    <link
      rel="stylesheet"
      href="https://necolas.github.io/normalize.css/8.0.0/normalize.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Lato:400,700,900"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
    />
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <div class="hero">
      <header>
        <div class="logo">
          <img src="img/logo.png" alt="logo" />
        </div>
        <nav class="main-nav">
          <a href="#">Become a Host</a>
          <a href="#">Help</a>
          <a href="#">Sign Up</a>
          <a href="#">Log In</a>
        </nav>
      </header>

      <div class="container search-form-container">
        <div class="search-form">
          <h1>Book unique homes and experiences</h1>

          <form action="#">
            <div class="field">
              <label for="">Where</label
              ><input type="text" id="where" placeholder="City" />
            </div>
            <div class="field dates">
              <label for="check-in">Check in</label
              ><input id="check-in" type="date" />
              <label for="check-out">Check in</label
              ><input id="check-out" type="date" />
            </div>
            <div class="field">
              <label for="guests">Guests</label>
              <select id="guests">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div class="submit">
              <input type="submit" class="submit-btn" value="Search" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <script src="js/scripts.js"></script>
  </body>
</html>
```

### Top nav
#### HTML
```
// MORE CODE

<body>
  <div class="hero">
    <header class="header">
      <div class="logo">
        <img src="img/logo.png" alt="logo" />
      </div>
      <nav class="main-nav">
        <a href="#">Become a Host</a>
        <a href="#">Help</a>
        <a href="#">Sign Up</a>
        <a href="#">Log In</a>
      </nav>
    </header>
// MORE CODE
```

### CSS
* We hide the nav on smaller devices

```
.header {
  display: grid;
  grid-template-columns: 10% auto 30%;
  width: 100%;
  padding: 1rem;
  align-items: flex-start;
}

.main-nav {
  display: none;
}

@media (min-width: 768px) {
  .main-nav {
    display: grid;
    justify-content: flex-end;
    grid-column: 3 / 4;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .main-nav a {
    color: var(--light);
    text-decoration: none;
    font-size: 0.8rem;
    padding: 1rem 1rem 2rem 1rem;
    text-align: center;
  }

  .main-nav a:hover {
    border-bottom: 1px solid var(--light);
  }
}

```

## Make a container to hold our app
* It will be 1200px max wide
* We only have 90% of the width
* And we center the content

```
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
```

## Form
### HTML
```
// MORE CODE
 <div class="container search-form-container">
      <div class="search-form">
        <h1>Book unique homes and experiences</h1>

        <form action="#">
          <div class="field">
            <label for="">Where</label><input type="text" id="where" placeholder="City" />
          </div>
          <div class="field dates">
            <div class="date">
              <label for="check-in">Check in</label><input id="check-in" type="date" />
            </div>
            <div class="date">
              <label for="check-out">Check in</label><input id="check-out" type="date" />
            </div>

          </div>
          <div class="field">
            <label for="guests">Guests</label>
            <select id="guests">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div class="submit">
            <input type="submit" class="submit-btn" value="Search" />
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="js/scripts.js"></script>
</body>

</html>
```

### CSS
```
// MORE CODE
.search-form-container {
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .search-form-container {
    grid-template-columns: 1fr 2fr;
  }
}

.search-form {
  padding: 2rem;
  background-color: var(--light);
  border-radius: 5px;
}

.search-form h1 {
  margin: 0 0 1rem 0;
}

.search-form form {
  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

.search-form .field {
  /* Position the labels */
  display: grid;
  grid-template-rows: repeat(2, auto);

  /* Position from the parent element */
  grid-column: 1 / 3;
  grid-row-gap: 0.5rem;
}

.search-form .dates {
  display: grid;
  grid-row: 2 / 3;
}

.search-form .date {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 0.5rem;
}

.search-form .date:nth-child(1) {
  grid-column: 1 / 2;
}

.search-form .date:nth-child(2) {
  grid-column: 2 / 3;
}

.search-form label {
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.search-form input[type='text'],
.search-form input[type='date'],
.search-form select {
  padding: 0.8rem;
  margin-bottom: 1rem;
  background-color: var(--light);
  border: 1px solid #e1e1e1;
  appearance: none;
}

.submit {
  display: grid;
  grid-column: 2 / 3;
  justify-content: flex-end;
}

.submit-btn {
  padding: 1rem 2rem;
  color: var(--light);
  background-color: var(--primary);
  border: none;
  border-radius: 5px;
}
```

## Recommendation
### HTML
```
// MORE CODE
 <main class="content container">
    <section class="countries">
      <h2>Recommended for you</h2>
      <div class="cards-container">

        <div class="card"><img src="./img/recommended1.jpg" alt="country 1">
          <div class="info">
            <p class="title">Austria</p>
            <p class="price">$1200/night average</p>
          </div>
        </div>
        <!-- /.card -->
        <div class="card"><img src="./img/recommended2.jpg" alt="country 1">
          <div class="info">
            <p class="title">France</p>
            <p class="price">$1200/night average</p>
          </div>
        </div>
        <!-- /.card -->
        <div class="card"><img src="./img/recommended3.jpg" alt="country 1">
          <div class="info">
            <p class="title">Greece</p>
            <p class="price">$1200/night average</p>
          </div>
        </div>
        <div class="card"><img src="./img/recommended4.jpg" alt="country 1">
          <div class="info">
            <p class="title">England</p>
            <p class="price">$1200/night average</p>
          </div>
        </div>
        <div class="card"><img src="./img/recommended5.jpg" alt="country 1">
          <div class="info">
            <p class="title">Spain</p>
            <p class="price">$1200/night average</p>
          </div>
        </div>
        <!-- /.card -->
      </div>
      <!-- /.cards-container -->
    </section>
  </main>


  <script src="js/scripts.js"></script>
</body>

</html>
```

## CSS
```
// MORE CODE
main > section {
  margin-bottom: 2rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
}

.card img {
  width: 100%;
}

.countries .cards-container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.countries .card {
  position: relative;
}

.countries .info {
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  color: var(--light);
  text-align: center;
}

.countries .info .title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
}

.countries .info .price {
  font-size: 0.8rem;
}
```

## Explore
### HTML
```
// MORE CODE

<section class="explore">
      <h2>Explore Los Angeles</h2>
      <div class="cards-container">
        <div class="card">
          <img src="./img/explore1.jpg" alt="name">
          <div class="info">
            <p class="category concert">concert</p>
            <p class="title">Electronic Music Festival</p>
            <p class="price">$1,200 per person</p>
          </div>
        </div>
        <!-- /.card  -->
        <div class="card">
          <img src="./img/explore1.jpg" alt="name">
          <div class="info">
            <p class="category concert">concert</p>
            <p class="title">Electronic Music Festival</p>
            <p class="price">$1,200 per person</p>
          </div>
        </div>
        <!-- /.card  -->

        <div class="card">
          <img src="./img/explore2.jpg" alt="name">
          <div class="info">
            <p class="category concert">concert</p>
            <p class="title">Los Angeles Rock Festival</p>
            <p class="price">$300 per person</p>
          </div>
        </div>
        <!-- /.card  -->

        <div class="card">
          <img src="./img/explore3.jpg" alt="name">
          <div class="info">
            <p class="category concert">concert</p>
            <p class="title">Mexican Food for Beginners</p>
            <p class="price">$400 per person</p>
          </div>
        </div>
        <!-- /.card  -->

        <div class="card">
          <img src="./img/explore4.jpg" alt="name">
          <div class="info">
            <p class="category outdoor-activity">Bike Ride</p>
            <p class="title">Bike Ride on the Mountain</p>
            <p class="price">$900 per person</p>
          </div>
        </div>
        <!-- /.card  -->
      </div>
      <!-- /.cards-container -->
    </section>
  </main>


  <script src="js/scripts.js"></script>
</body>

</html>
```

### CSS
* Make sure you add the font weights as we'll use them:

```
// MORE CODE

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>AirCSSGrid.com</title>
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css" />
  <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900" rel="stylesheet" />
// MORE CODE
```

```
// MORE CODE
.card img {
  width: 100%;
}

.card .category {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
}

.card .title {
  font-size: 1.6rem;
  font-weight: 900;
}

.cart .price {
  font-size: 0.9rem;
}

.countries .cards-container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.countries .card {
  position: relative;
}

.countries .info {
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  color: var(--light);
  text-align: center;
}

.countries .title {
  margin: 0;
  font-size: 1.4rem;
}

.countries .price {
  font-size: 0.8rem;
}
```

## unique homes
### HTML
```
// MORE CODE
 <section class="hosting">
      <h2>Unique homes for your next trip</h2>
      <div class="cards-container">
        <div class="card">
          <img src="./img/lodgement1.jpg" alt="lodge">
          <div class="info">
            <p class="category lodgement">Beautiful House on the Beach</p>
            <p class="title">Beautiful House 2 Bedrooms</p>
            <p class="price">$3,200 per night</p>
          </div>
        </div>
        <!-- /.card -->

        <div class="card">
          <img src="./img/lodgement2.jpg" alt="lodge">
          <div class="info">
            <p class="category lodgement">1 Room By Los Angeles</p>
            <p class="title">1 Room, downtown LA</p>
            <p class="price">$2,200 per night</p>
          </div>
        </div>
        <!-- /.card -->

        <div class="card">
          <img src="./img/lodgement3.jpg" alt="lodge">
          <div class="info">
            <p class="category lodgement">Cottage in the woods</p>
            <p class="title">Cottage for 6 persons</p>
            <p class="price">$2,500 per night</p>
          </div>
        </div>
        <!-- /.card -->

      </div>
      <!-- /.cards-container -->
    </section>
  </main>


  <script src="js/scripts.js"></script>
</body>

</html>
```

* We don't have to do any CSS changes because our card is working nicely

## Top-Rated Experiences
### HTML
```
// MORE CODE
 <section class="explore">
      <h2>Top Rated Experiences</h2>
      <div class="cards-container">
        <div class="card">
          <img src="./img/newyork1.jpg" alt="name">
          <div class="info">
            <p class="category concert">cooking class</p>
            <p class="title">Japanese Cuisine for Beginners</p>
            <p class="price">$300 per person</p>
          </div>
        </div>
        <!-- /.card  -->

        <div class="card">
          <img src="./img/newyork2.jpg" alt="name">
          <div class="info">
            <p class="category concert">concert</p>
            <p class="title">Festival EDM 2018</p>
            <p class="price">$1,200 per person</p>
          </div>
        </div>
        <!-- /.card  -->

        <div class="card">
          <img src="./img/newyork3.jpg" alt="name">
          <div class="info">
            <p class="category class">cooking class</p>
            <p class="title">Spanish Cuisine</p>
            <p class="price">$200 per person</p>
          </div>
        </div>
        <!-- /.card  -->

        <div class="card">
          <img src="./img/newyork4.jpg" alt="name">
          <div class="info">
            <p class="category outdoor-activity">horse ride</p>
            <p class="title">Horse Ride in the Mountain</p>
            <p class="price">$100 per person</p>
          </div>
        </div>
        <!-- /.card  -->
      </div>
      <!-- /.cards-container -->
    </section>
  </main>


  <script src="js/scripts.js"></script>
</body>

</html>
```

* no changes to css needed because of cards

## Footer
### HTML
```
// MORE CODE
<footer id="footer" class="footer">
    <div class="container">
      <div class="nav-footer">
        <h3>AirCSSGrid</h3>
        <nav class="menu">
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Policies</a>
          <a href="#">Help</a>
        </nav>
      </div>
      <div class="nav-footer">
        <h3>Discover</h3>
        <nav class="menu">
          <a href="#">Trust & Safety</a>
          <a href="#">Travel Credit</a>
          <a href="#">Gift Cards</a>
          <a href="#">AirCSSGrid Citizen</a>
          <a href="#">Events <span class="new">New</span></a>
        </nav>
      </div>
      <div class="nav-footer">
        <h3>Hosting</h3>
        <nav class="menu">
          <a href="#">Why Host</a>
          <a href="#">Hospitality</a>
          <a href="#">Responsible Hosting</a>
          <a href="#">Community Center</a>
        </nav>
      </div>
      <div class="nav-footer">
        <nav class="social-nav">
          <a href="https://facebook.com"><span>Facebook</span></a>
          <a href="https://twitter.com"><span>Twitter</span></a>
          <a href="https://instagram.com"><span>Instagram</span></a>
        </nav>
        <nav class="menu">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Site map</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="js/scripts.js"></script>
</body>

</html>
```

### CSS
```
// MORE CODE
.footer {
  padding: 3rem 0;
  border-top: 1px solid #dbdbdb;
}

.footer .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}

.nav-footer h3 {
  font-size: 1.2rem;
}

.nav-footer .menu {
  display: grid;
  grid-template-rows: repeat(auto-fit, auto);
  grid-row-gap: 1rem;
}

.nav-footer .menu a {
  display: block;
  font-size: 0.9rem;
  color: var(--dark);
  text-decoration: none;
}

.nav-footer .menu a .new {
  padding: 0.2rem 0.4rem 0.4rem 0.4rem;
  margin-left: 0.5rem;
  color: var(--light);
  background-color: rgb(0, 110, 126);
  border-radius: 5px;
}
```

## Social Navigation in Footer
* We'll use Flexbox to show you can mix Flexbox with CSS Grid

### Fontawesome
* Facebook example:
* `https://fontawesome.com/v5.15/icons/facebook-f?style=brands`
* Copy unicode `f39e`

### CSS
* This will show you the F of Facebook

```
// MORE CODE
.social-nav a[href*='facebook.com']::before {
  content: '\f39e';
}
```

### using CSS Flex box
```
// MORE CODE
.social-nav {
  display: flex;
  justify-content: flex-end;
}

.social-nav a {
  margin-right: 1rem;
  text-decoration: none;
}

.social-nav a:last-of-type {
  margin-right: 0;
}

.social-nav a::before {
  font-family: 'Font Awesome 5 Brands';
  font-size: 1.8rem;
  color: var(--dark);
}

.social-nav a[href*='facebook.com']::before {
  content: '\f39e';
}

.social-nav a[href*='twitter.com']::before {
  content: '\f099';
}

.social-nav a[href*='instagram.com']::before {
  content: '\f16d';
}

.social-nav a span {
  display: none;
}
```

## Or do it with CSS Grid
* But Flexbox looks a little better so we'll use that

```
// MORE CODE
.social-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, 30px);
  grid-column-gap: 1rem;
  justify-content: flex-end;
}

.social-nav a {
  text-decoration: none;
}

.social-nav a:last-of-type {
  margin-right: 0;
}
```

## Add HTML to have a button

```
// MORE CODE

  <a href="#footer" class="footer-btn">Terms, Privacy, Currency & more</a>

  <script src="js/scripts.js"></script>
</body>

</html>
// MORE CODE
```


### CSS
```
// MORE CODE
.footer-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 0.5rem 2rem;
  color: var(--dark);
  text-decoration: none;
  background-color: var(--light);
}
```

## Add JavaScript to display footer
```
// select the floating button in the UI
const floatingBtn = document.querySelector('.footer-btn');

// attach an event listener
floatingBtn.addEventListener('click', () => {
  // select the footer
  const footer = document.querySelector('.footer');

  // check if the class exists (active) then remove
  if (footer.classList.contains('active')) {
    // remove the class
    footer.classList.remove('active');

    // return the original text
    floatingBtn.textContent = 'Terms, Privacy, Currency & more';
  } else {
    // we add the active class to the footer
    footer.classList.add('active');

    // add the close text
    floatingBtn.textContent = 'Close';
  }
});
```

* But if we want to use `this` we could try this
* **note** Difference between `innerText` and `textContent`

```
textContent gets the content of all elements, including <script> and <style> elements. In contrast, innerText only shows “human-readable” elements. textContent returns every element in the node. In contrast, innerText is aware of styling and won't return the text of “hidden” elements.
```

## Watch out for arrow functions and using this
* `this` inside and arrow function will not bind

```
// select the floating button in the UI
const floatingBtn = document.querySelector('.footer-btn');

// attach an event listener
floatingBtn.addEventListener('click', () => {
  // select the footer
  const footer = document.querySelector('.footer');

  // check if the class exists (active) then remove
  if (footer.classList.contains('active')) {
    // remove the class
    footer.classList.remove('active');

    // return the original text
    floatingBtn.textContent = 'Terms, Privacy, Currency & more';
  } else {
    // we add the active class to the footer
    footer.classList.add('active');

    // add the close text
    this.innerText = 'Close'; // this line will not work
  }
});
```

* To get around `this` issue with arrow functions use a normal function

```
// select the floating button in the UI
const floatingBtn = document.querySelector('.footer-btn');

// attach an event listener
floatingBtn.addEventListener('click', function () { // add regular function
  // select the footer
  const footer = document.querySelector('.footer');

  // check if the class exists (active) then remove
  if (footer.classList.contains('active')) {
    // remove the class
    footer.classList.remove('active');

    // return the original text
    floatingBtn.textContent = 'Terms, Privacy, Currency & more';
  } else {
    // we add the active class to the footer
    footer.classList.add('active');

    // add the close text
    this.innerText = 'Close';
  }
});
```

## Or you could pass an event and use the arrow function
```
// select the floating button in the UI
const floatingBtn = document.querySelector('.footer-btn');

// attach an event listener
floatingBtn.addEventListener('click', (e) => {
  // select the footer
  const footer = document.querySelector('.footer');

  // check if the class exists (active) then remove
  if (footer.classList.contains('active')) {
    // remove the class
    footer.classList.remove('active');

    // return the original text
    e.target.innerText = 'Terms, Privacy, Currency & more';
  } else {
    // we add the active class to the footer
    footer.classList.add('active');

    // add the close text
    e.target.innerText = 'Close';
  }
});
```

## Now add the CSS for our footer
```
// MORE CODE
.footer-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 0.5rem 2rem;
  color: var(--dark);
  text-decoration: none;
  background-color: var(--light);
}
```

* The footer won't be visible but if you use the inspector and increase the `-100%` value incrementally by clicking on the value and pressing the up arrow you will see the footer slide into view

## Animate the footer to slide open and closed
```
// MORE CODE
.footer-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 0.5rem 2rem;
  color: var(--dark);
  text-decoration: none;
  background-color: var(--light);
}

.footer {
  position: fixed;
  bottom: -100%;
  width: 100%;
  padding: 3rem 0;
  background-color: var(--light);
  border-top: 1px solid #dbdbdb;
  transition: bottom 0.3s ease-in-out;
}

.footer.active {
  bottom: 0;
}
```
