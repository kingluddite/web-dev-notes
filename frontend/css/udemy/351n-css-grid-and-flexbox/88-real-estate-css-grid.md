# Real Estate CSS Grid
`index.html` (structure)

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <title>Real Estate</title>
</head>

<body>
    <header class="header">
        <div class="topbar container">
            <div class="site-name">
                <img src="./img/logo.png" class="logo" alt="site logo">
            </div>
            <nav class="menu"><a href="#">About Us</a><a href="#">Properties</a><a href="#">Contact Us</a></nav>
        </div>
    </header>

    <div class="search-form-container">
        <form action="#" class="search-form-content container"><input type="text"
                placeholder="Search by City or Name..." />
            <select>
                <option value="city" selected>City</option>
                <option value="second">Second City</option>
            </select>
            <select>
                <option selected>Rooms</option>
                <option>1</option>
                <option>2</option>
            </select>
            <input type="submit" class="button" value="Search" />
        </form>
    </div>
</body>

</html>
```

## Property list
`index.html` (structure - rest of page)

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <title>Real Estate</title>
</head>

<body>
    <header class="header">
        <div class="topbar container">
            <div class="site-name">
                <img src="./img/logo.png" class="logo" alt="site logo">
            </div>
            <nav class="menu"><a href="#">About Us</a><a href="#">Properties</a><a href="#">Contact Us</a></nav>
        </div>
    </header>

    <div class="search-form-container">
        <form action="#" class="search-form-content container"><input type="text"
                placeholder="Search by City or Name..." />
            <select>
                <option value="city" selected>City</option>
                <option value="second">Second City</option>
            </select>
            <select>
                <option selected>Rooms</option>
                <option>1</option>
                <option>2</option>
            </select>
            <input type="submit" class="button" value="Search" />
        </form>
    </div>

    <section class="container">
        <h2 class="text-center">Properties on Sale</h2>

        <div class="properties-list">
            <div class="property"><img src="./img/property1.jpg" alt="property image">
                <div class="card">
                    <h3 class="property-name">Property 1</h3>
                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium
                        nobis fugit reiciendis neque, autem culpa? Exercitationem dicta molestiae nostrum, saepe
                        consequuntur, tempore perspiciatis molestias officia maxime quibusdam quas non?</p>
                    <p class="price">
                        Price <span>$3,000,000</span>
                    </p>
                    <a href="#" class="button">Read More</a>

                </div> <!-- .card -->
            </div> <!-- .property-->
            <div class="property"><img src="./img/property2.jpg" alt="property image">
                <div class="card">
                    <h3 class="property-name">Property 2</h3>
                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium
                        nobis fugit reiciendis neque, autem culpa? Exercitationem dicta molestiae nostrum, saepe
                        consequuntur, tempore perspiciatis molestias officia maxime quibusdam quas non?</p>
                    <p class="price">
                        Price <span>$3,000,000</span>
                    </p>
                    <a href="#" class="button">Read More</a>

                </div> <!-- .card -->
            </div> <!-- .property-->
            <div class="property"><img src="./img/property3.jpg" alt="property image">
                <div class="card">
                    <h3 class="property-name">Property 3</h3>
                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium
                        nobis fugit reiciendis neque, autem culpa? Exercitationem dicta molestiae nostrum, saepe
                        consequuntur, tempore perspiciatis molestias officia maxime quibusdam quas non?</p>
                    <p class="price">
                        Price <span>$3,000,000</span>
                    </p>
                    <a href="#" class="button">Read More</a>

                </div> <!-- .card -->
            </div> <!-- .property-->
            <div class="property"><img src="./img/property4.jpg" alt="property image">
                <div class="card">
                    <h3 class="property-name">Property 4</h3>
                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium
                        nobis fugit reiciendis neque, autem culpa? Exercitationem dicta molestiae nostrum, saepe
                        consequuntur, tempore perspiciatis molestias officia maxime quibusdam quas non?</p>
                    <p class="price">
                        Price <span>$3,000,000</span>
                    </p>
                    <a href="#" class="button">Read More</a>

                </div> <!-- .card -->
            </div> <!-- .property-->
            <div class="property"><img src="./img/property5.jpg" alt="property image">
                <div class="card">
                    <h3 class="property-name">Property 5</h3>
                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium
                        nobis fugit reiciendis neque, autem culpa? Exercitationem dicta molestiae nostrum, saepe
                        consequuntur, tempore perspiciatis molestias officia maxime quibusdam quas non?</p>
                    <p class="price">
                        Price <span>$3,000,000</span>
                    </p>
                    <a href="#" class="button">Read More</a>

                </div> <!-- .card -->
            </div> <!-- .property-->
            <div class="property"><img src="./img/property3.jpg" alt="property image">
                <div class="card">
                    <h3 class="property-name">Property 6</h3>
                    <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium
                        nobis fugit reiciendis neque, autem culpa? Exercitationem dicta molestiae nostrum, saepe
                        consequuntur, tempore perspiciatis molestias officia maxime quibusdam quas non?</p>
                    <p class="price">
                        Price <span>$3,000,000</span>
                    </p>
                    <a href="#" class="button">Read More</a>

                </div> <!-- .card -->
            </div> <!-- .property-->
        </div> <!-- .propety-list-->
    </section>

    <div class="about-us container">
        <div class="image"><img src="./img/aboutus.jpg" class="image" alt="about us"></div>
        <div class="about-us-content">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis eius mollitia consequatur voluptatum
                aliquid perferendis itaque assumenda nemo illum ut temporibus vel similique necessitatibus, nulla id
                odio
                culpa alias accusamus.</p>
        </div>
    </div><!-- .about-us -->

    <footer class="footer">
        <div class="container">
            <div class="widget">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tempora obcaecati nulla vitae
                    dolorem ipsam reiciendis dolorum minus expedita distinctio?</p>
            </div>
            <div class="widget">
                <h3>Navigation</h3>
                <nav><a href="#">About Us</a><a href="#">Properties</a><a href="#">Contact Us</a></nav>
            </div>
            <div class="widget">
                <h3>Properties on Sale</h3>
            </div>
        </div>
    </footer>
</body>

</html>
```

## Add global css
`style.css`

```
:root {
  --primary: #7abe47;
  --light: #ffffff;
  --gray: #eeeeee;
  --dark: #333333;
  --padding: 1rem;
  --padding2: 2rem;
  --mainFont: 'PT Serif', serif;
}
/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-color: var(--gray);
  font-family: var(--mainFont);
}
/****** Global Styles ******/
img {
  max-width: 100%;
}
h1 {
  font-size: 2.4rem;
}
h2 {
  font-size: 2.2rem;
}
h3 {
  font-size: 2rem;
}
h1,
h2,
h3 {
  margin: 2rem 0;
}
p {
  line-height: 1.8;
  font-size: 1rem;
}

/****** classes ******/
.text-center {
  text-align: center;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  width: 90%; /* for devices that don't reach 1100px max-width */
}

```

## Use minmax for responsive design
```
:root {
  --primary: #7abe47;
  --light: #ffffff;
  --gray: #eeeeee;
  --dark: #333333;
  --padding: 1rem;
  --padding2: 2rem;
  --mainFont: 'PT Serif', serif;
}
p > span {
  font-weight: bold;
}

/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-color: var(--gray);
  font-family: var(--mainFont);
}
/****** Global Styles ******/
img {
  max-width: 100%;
}
h1 {
  font-size: 2.4rem;
}
h2 {
  font-size: 2.2rem;
}
h3 {
  font-size: 2rem;
}
h1,
h2,
h3 {
  margin: 2rem 0;
}
p {
  line-height: 1.8;
  font-size: 1rem;
}

/****** classes ******/
.text-center {
  text-align: center;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  width: 90%; /* for devices that don't reach 1100px max-width */
}
.header {
  padding: var(--padding);
  background-color: var(--dark);
}

.header .topbar {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 3rem;
}

.header .menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 1rem;
}
.header .menu a {
  color: #ffffff;
  text-decoration: none;
  text-align: center;
}

@media (min-width: 768px) {
  .header .topbar {
    grid-template-rows: unset;
    grid-row-gap: unset;
    grid-template-columns: repeat(2, 1fr);
  }
  .header .site-name {
    grid-column: 1 / 2;
  }
  .header .menu {
    grid-column: 2 / 3;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    align-items: center; /* align vertically */
  }
}

```

* **note** `align-items` and `align-content` is same effect
    - The main difference is you use `align-content` when you have multiple lines
        + Since we only have one line we use `align-items`

## Styling search form
* We altered the HTML slightly

```
// MORE CODE

    <div class="search-form-container">
      <form action="#" class="search-form container">

// MORE CODE
```

* And here are the styles for the form:

```
// MORE CODE

/* search */
.search-form-container {
  background-image: url(../img/property1.jpg);
  background-size: cover;
  background-position: center center;
  padding: 5rem 0;
}

.search-form {
  height: 15rem;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 1rem;
  align-items: center;
}
@media (min-width: 768px) {
  .search-form {
    grid-template-rows: unset;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
  }
}

.search-form input[type='text'],
.search-form select {
  padding: 1rem;
  /* we need to remove native styling to select we need  */
  /* docs - https://css-tricks.com/almanac/properties/a/appearance/ */
  /* what is this? - https://twitter.com/bocoup/status/1260698133111156736 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
}

// MORE CODE
```

## Buttons
```
:root {
  --primary: #7abe47;
  --light: #ffffff;
  --gray: #eeeeee;
  --dark: #333333;
  --padding: 1rem;
  --padding2: 2rem;
  --mainFont: 'PT Serif', serif;
}
p > span {
  font-weight: bold;
}

/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-color: var(--gray);
  font-family: var(--mainFont);
}
/****** Global Styles ******/
img {
  max-width: 100%;
}
h1 {
  font-size: 2.4rem;
}
h2 {
  font-size: 2.2rem;
}
h3 {
  font-size: 2rem;
}
h1,
h2,
h3 {
  margin: 2rem 0;
}
p {
  line-height: 1.8;
  font-size: 1rem;
}

/****** classes ******/
.button {
  background-color: var(--primary);
  padding: var(--padding);
  color: var(--light);
  border: 1px solid var(--primary);
  display: block; /* so it takes all the space */
  text-align: center;
  text-decoration: none; /* buttons will be used on a tags */
  transition: all 0.3s ease;
}
.button:hover {
  background-color: var(--light);
  color: var(--primary);
  cursor: pointer;
}

.text-center {
  text-align: center;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  width: 90%; /* for devices that don't reach 1100px max-width */
}
.header {
  padding: var(--padding);
  background-color: var(--dark);
}

.header .topbar {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 3rem;
}

.header .menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 1rem;
}
.header .menu a {
  color: #ffffff;
  text-decoration: none;
  text-align: center;
}

@media (min-width: 768px) {
  .header .topbar {
    grid-template-rows: unset;
    grid-row-gap: unset;
    grid-template-columns: repeat(2, 1fr);
  }
  .header .site-name {
    grid-column: 1 / 2;
  }
  .header .menu {
    grid-column: 2 / 3;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    align-items: center;
  }
}

/* search */
.search-form-container {
  background-image: url(../img/property1.jpg);
  background-size: cover;
  background-position: center center;
  padding: 5rem 0;
}

.search-form {
  height: 15rem;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 1rem;
  align-items: center;
}
@media (min-width: 768px) {
  .search-form {
    grid-template-rows: unset;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
  }
}

.search-form input[type='text'],
.search-form select {
  padding: var(--padding);
  /* we need to remove native styling to select we need  */
  /* docs - https://css-tricks.com/almanac/properties/a/appearance/ */
  /* what is this? - https://twitter.com/bocoup/status/1260698133111156736 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
}

```

## Property List
* We alter HTML with "featured" class

```
// MORE CODE

      <div class="properties-list">
        <div class="first property featured">
          <img src="./img/property1.jpg" alt="property image" />
          <div class="card">
            <h3 class="property-name">Property 1</h3>
            <p class="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              laudantium nobis fugit reiciendis neque, autem culpa?
              Exercitationem dicta molestiae nostrum, saepe consequuntur,
              tempore perspiciatis molestias officia maxime quibusdam quas non?
            </p>
            <p class="price">Price <span>$3,000,000</span></p>
            <a href="#" class="button">Read More</a>
          </div>
          <!-- .card -->
        </div>
        <!-- .property-->
        <div class="second property featured">
          <img src="./img/property2.jpg" alt="property image" />
          <div class="card">
            <h3 class="property-name">Property 2</h3>
            <p class="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              laudantium nobis fugit reiciendis neque, autem culpa?
              Exercitationem dicta molestiae nostrum, saepe consequuntur,
              tempore perspiciatis molestias officia maxime quibusdam quas non?
            </p>
            <p class="price">Price <span>$3,000,000</span></p>
            <a href="#" class="button">Read More</a>
          </div>
          <!-- .card -->
        </div>
        <!-- .property-->

// MORE CODE
```

* And the styles to make the property list look awesome and responsive

```
:root {
  --primary: #7abe47;
  --light: #ffffff;
  --gray: #eeeeee;
  --dark: #333333;
  --padding: 1rem;
  --padding2: 2rem;
  --mainFont: 'PT Serif', serif;
}
p > span {
  font-weight: bold;
}

/* apply a natural box layout model to all elements, but allowing components to change */
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-color: var(--gray);
  font-family: var(--mainFont);
}
/****** Global Styles ******/
img {
  max-width: 100%;
}
h1 {
  font-size: 2.4rem;
}
h2 {
  font-size: 2.2rem;
}
h3 {
  font-size: 2rem;
}
h1,
h2,
h3 {
  margin: 2rem 0;
}
p {
  line-height: 1.8;
  font-size: 1rem;
}

/****** classes ******/
.button {
  background-color: var(--primary);
  padding: var(--padding);
  color: var(--light);
  border: 1px solid var(--primary);
  display: block; /* so it takes all the space */
  text-align: center;
  text-decoration: none; /* buttons will be used on a tags */
  transition: all 0.3s ease;
}
.button:hover {
  background-color: var(--light);
  color: var(--primary);
  cursor: pointer;
}

.text-center {
  text-align: center;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  width: 90%; /* for devices that don't reach 1100px max-width */
}
.header {
  padding: var(--padding);
  background-color: var(--dark);
}

.header .topbar {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 3rem;
}

.header .menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 1rem;
}
.header .menu a {
  color: #ffffff;
  text-decoration: none;
  text-align: center;
}

@media (min-width: 768px) {
  .header .topbar {
    grid-template-rows: unset;
    grid-row-gap: unset;
    grid-template-columns: repeat(2, 1fr);
  }
  .header .site-name {
    grid-column: 1 / 2;
  }
  .header .menu {
    grid-column: 2 / 3;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    align-items: center;
  }
}

/* search */
.search-form-container {
  background-image: url(../img/property1.jpg);
  background-size: cover;
  background-position: center center;
  padding: 5rem 0;
}

.search-form {
  height: 15rem;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-row-gap: 1rem;
  align-items: center;
}
@media (min-width: 768px) {
  .search-form {
    grid-template-rows: unset;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
  }
}

.search-form input[type='text'],
.search-form select {
  padding: var(--padding);
  /* we need to remove native styling to select we need  */
  /* docs - https://css-tricks.com/almanac/properties/a/appearance/ */
  /* what is this? - https://twitter.com/bocoup/status/1260698133111156736 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
}

/* property list */
.properties-list {
  display: grid;
  grid-gap: var(--padding);
}

@media (min-width: 768px) {
  .properties-list {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
  }
  .featured {
    grid-row: 1 / 2;
  }
  .first {
    grid-column: 1 / 3;
  }
  .second {
    grid-column: 3 / 5;
  }
}

.properties-list img {
  /* this will make all the images take all the space that is available */
  width: 100%;
  display: block;
}

.card {
  background-color: var(--light);
  padding: var(--padding);
  border: 1px solid var(--gray);
}

.price span {
  color: var(--primary);
}

```

## About us section
```
/* about */
.about-us {
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .about-us {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: var(--padding2);
  }
}

.about-us-content {
  text-align: center;
}

@media (min-width: 768px) {
  .about-us-content {
    text-align: left;
  }
}

```

## Footer
```
// MORE CODE
/* footer */
.footer {
  background-color: var(--primary);
  padding-top: var(--padding);
  margin-top: 2rem;
  color: var(--light);
}

@media (min-width: 768px) {
  .footer .container {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-column-gap: var(--gridGap);
  }
}

.footer .navigation a {
  color: var(--light);
  display: block;
  text-decoration: none;
  margin-bottom: 1rem;
}
```

* We could also use `display-grid`

```
// MORE CODE

.footer .navigation {
  display: grid;
  grid-row-gap: var(--gridRowGap);
}

.footer .navigation a {
  color: var(--light);
  text-decoration: none;
}

// MORE CODE
```

### footer properties
* html

```
// MORE CODE

        <div class="widget">
          <h3>Properties on Sale</h3>
          <div class="properties-container">
            <div class="property-info">
              <div class="property-image">
                <img src="img/property2.jpg" />
              </div>
              <div class="info-text">
                <p>Property 2</p>
                <p>$2,000,000</p>
              </div>
            </div>
            <div class="property-info">
              <div class="property-image"><img src="img/property3.jpg" /></div>
              <div class="info-text">
                <p>Property 3</p>
                <p>$3,000,000</p>
              </div>
            </div>
            <div class="property-info">
              <div class="property-image"><img src="img/property4.jpg" /></div>
              <div class="info-text">
                <p>Property 4</p>
                <p>$4,000,000</p>
              </div>
            </div>
            <div class="property-info">
              <div class="property-image"><img src="img/property5.jpg" /></div>
              <div class="info-text">
                <p>Property 5</p>
                <p>$5,000,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="copyright">All Rights Reserved, 2019 &copy;</p>
    </footer>
  </body>
</html>

// MORE CODE
```

* CSS
```
// MORE CODE
/* footer properties */

.properties-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 1rem;
}

.properties-container .property-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

.properties-container .property-info p {
  margin: 0;
}
```

* When to use media queries?
    - When the content is displayed like the footer properties we don't need to use media queries
    - When the content is going to be different based on the screen size then we use media queries (it gives you more control of your layout)

### footer copyright
