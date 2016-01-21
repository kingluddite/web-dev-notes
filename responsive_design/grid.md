# Grids

**How many columns?**
12

**How wide will each column be?**
65px

**columns have margins (aka - gutters)**
all columns will have 20px left gutter
11 20px left margins (gutters)

## Convert Pixel to Percentage
Formula
```
target / context = result
```
Where does 1000 come from?
Add all columns (65 * 12)
Add all gutters (20 * 11)
Add them together = 1000
**Column 1**
65px / 1000px = .065
6.5% - this is for column 1
* gutters not included in target

**Column 2**
65 + 65 + 20(gutter) = 150
150 / 1000 = .15 -> 15%

**Column 3**
65 + 65 + 20 + 65 + 20 = 235
235 / 1000 = 23.5 -> 23.5%

**Column 4**
65 + 65 + 20 + 65 + 20 + 65 + 20 = 320
320 / 1000 = .32 -> 32%

Rinse and repeat for the rest of the columns

### Here is our grid
```
/* Global */
.grid-container {
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
}
img {
  width: 100%;
}

/* Media Queries */

@media (min-width: 768px) {

  /* Columns */
  .grid-container > [class^="grid-"] {
    float: left;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 2%; /* (20 / 1000) */
  }
  .grid-container > [class^="grid-"]:first-child {
    margin-left: 0; /* first column has no gutter */
  }
  .grid-container > [class^="grid-"]:last-child {
    float: right; /* so last column is flush against right side */
  }
  /* Columns are 65px wide, with 20px gutters */
  .grid-1 {
    width: 6.5%;
  }
  .grid-2 {
    width: 15%;
  }
  .grid-3 {
    width: 23.5%;
  }
  .grid-4 {
    width: 32%;
  }
  .grid-5 {
    width: 40.5%;
  }
  .grid-6 {
    width: 49%;
  }
  .grid-7 {
    width: 57.5%;
  }
  .grid-8 {
    width: 66%;
  }
  .grid-9 {
    width: 74.5%;
  }
  .grid-10 {
    width: 83%;
  }
  .grid-11 {
    width: 91.5%;
  }
  .grid-12 {
    width: 100%;
  }
  /* Clearfix */
   /* keeps grid container from collapsing from using floats */
  .group:after,
  .grid-container:after {
    content: " ";
    display: table;
    clear: both;
  }
}
```

## Complete HTML
```
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>CSS Layout Techniques</title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="bower_components/normalize-css/normalize.css">
    <link rel="stylesheet" href="css/grid.css">
    <link rel="stylesheet" href="css/style-grid.css">
    <script src="js/modernizr-custom.js"></script>
  </head>

  <body>

    <div class="container">
      <header class="main-header group">
        <div class="grid-container">
          <h1 class="grid-2 main-logo"><a href="#">Logo</a><h1>
          <ul class="grid-8 main-nav">
            <li><a href="#" data-icon="&#xe901;">Link 1</a></li>
            <li><a href="#" data-icon="&#xe971;">Link 2</a></li>
            <li><a href="#" data-icon="&#xe96d;">Link 3</a></li>
            <li><a href="#" data-icon="&#xe945;">Link 4</a></li>
          </ul>
        </div><!-- END .grid-container -->
      </header>
      <div class="main-banner hide-mobile">
        <h1>Our Main Heading</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <!-- END .main-banner -->
      <div class="grid-container">
        <div class="grid-8">
          <h2>Primary Content</h2>
          <img class="feat-img" src="http://lorempixel.com/400/300/sports/" alt="sports">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dignissimos quo quis explicabo fuga eius sit sequi, non hic iste obcaecati sapiente soluta vero vitae veniam eligendi nemo temporibus harum!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ea alias quis et perferendis vero delectus unde, aperiam fugiat doloremque quia reprehenderit dolore dicta in magnam, quidem dolores tempore ad.</p>
        </div>
        <!-- END .primary-content -->
        <div class="grid-4">
          <h3>Secondary Content</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus officia excepturi explicabo unde nisi possimus, qui voluptate quos nesciunt laudantium sed. Culpa, aperiam quisquam ex blanditiis placeat error quos exercitationem?</p>
          <hr>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptates, cum rerum aspernatur tempora porro? A numquam repellat, nobis perferendis enim ratione tenetur ipsum fuga inventore eligendi deserunt, ullam temporibus.</p>
        </div>
        <!-- END .secondary-content -->
      </div>
              <div class="grid-container hide-mobile">
          <div class="grid-4">
            <h2>Content "Below the fold"</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat sit praesentium reiciendis, culpa a? Eveniet qui totam in culpa molestias nostrum itaque optio, fuga!</p>
          </div>
          <div class="grid-4">
            <h2>Some Text</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis eius cumque modi tempore consequuntur atque error aliquid. Laboriosam nemo quas, perspiciatis sapiente maiores impedit ducimus, ut facere nobis porro autem!</p>
          </div>
          <div class="grid-4">
            <h3>Extra stuff</h3>
            <hr>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, quia?</p>
          </div>
        </div>
      <div class="main-footer">
        <p>&copy; 2016</p>
      </div>
      <!-- END .main-footer -->
    </div>
    <!-- END .container -->
  </body>

</html>
```

## Complete Grid
```
/* Global */
.grid-container {
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
}
img {
  width: 100%;
}

/* Media Queries */
@media (min-width: 1px) and (max-width: 767px) {
  .grid-container > [class^="grid-"] {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .hide-mobile {
    display: none;
  }
}
@media (min-width: 768px) {

  /* Columns */
  .grid-container > [class^="grid-"] {
    float: left;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 2%; /* (20 / 1000) */
  }
  .grid-container > [class^="grid-"]:first-child {
    margin-left: 0; /* first column has no gutter */
  }
  .grid-container > [class^="grid-"]:last-child {
    float: right; /* so last column is flush against right side */
  }
  /* Columns are 65px wide, with 20px gutters */
  .grid-1 {
    width: 6.5%;
  }
  .grid-2 {
    width: 15%;
  }
  .grid-3 {
    width: 23.5%;
  }
  .grid-4 {
    width: 32%;
  }
  .grid-5 {
    width: 40.5%;
  }
  .grid-6 {
    width: 49%;
  }
  .grid-7 {
    width: 57.5%;
  }
  .grid-8 {
    width: 66%;
  }
  .grid-9 {
    width: 74.5%;
  }
  .grid-10 {
    width: 83%;
  }
  .grid-11 {
    width: 91.5%;
  }
  .grid-12 {
    width: 100%;
  }
  /* Clearfix */
   /* keeps grid container from collapsing from using floats */
  .group:after,
  .grid-container:after {
    content: " ";
    display: table;
    clear: both;
  }
}
@media (min-width: 1200px) {
  .grid-container {
    max-width: 1100px;
  }
}

```

Complete style.css

```
/* Page Styles */
* {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  font: normal 1em/1.5 sans-serif;
  color; #222;
  background-color: #edeff0;
}
img {
  border: solid 1px;
  padding: 5px;
}

/* Main Layout Styles */
.main-header {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #384047;
}

.main-logo {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.5em;
}
.main-logo a,
.main-nav a {
  display: block;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
}
.main-logo a {
  background-color: #5fcf80;
}
.main-nav a {
  background-color: #3f8abf;
}
.main-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #b7c0c7;
}

@media (min-width: 768px) {
  /* Main Layout Styles */
  body {
    padding-top: 75px;
  }
  .main-header {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .main-nav {
    text-align: right;
  }

  .main-nav li {
    margin-top: 6px;
    margin-left: 10px;
    display: inline-block;
  }
  .main-banner {
    background: #dfe2e4;
    text-align: center;
    padding: 50px 15px;
    margin-bottom: 20px;
  }

  /* Imagery */
  .feat-img {
    width: 45%;
    float: left;
    margin: 10px 25px 10px 0;
    border: 1px solid black;
    padding: 5px;

  }

}
```




