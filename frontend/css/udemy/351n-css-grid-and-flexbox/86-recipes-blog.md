# Recipes Blog
## Add main grid areas
## Navigation
`html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.0/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,900" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <title>Blog Recipe</title>
</head>
<body>

        <header class="header container">
            <img src="img/logo.jpg" class="logo">
        </header>

        <div class="main-nav">
            <nav class="container">
                <a href="#">Recipes</a>
                <a href="#">Products</a>
                <a href="#">Tutorials</a>
                <a href="#">Store</a>
            </nav>
        </div>

        <div class="featured-image container">
            <img src="img/featured-image.jpg">
        </div>

        <main class="container main-content">

        
                <h1 class="entry-title">Homemade Pizza Recipe</h1>

                <div class="entry">
                        <p>Sed neque sapien, rutrum vel elit at, consequat maximus libero. In molestie est odio, eget laoreet dui aliquet sit amet. Proin in hendrerit enim. Etiam blandit quis enim sed facilisis. Cras euismod, sem vel cursus feugiat, metus felis fermentum metus, in vulputate ex enim eget risus. Ut vitae cursus tortor. Aenean ante tellus, venenatis in semper sit amet, iaculis vitae lorem. Proin et aliquet enim. In tempus a lorem vel pretium. Aenean nec laoreet sapien. In placerat odio sit amet convallis rhoncus. Donec varius mollis nisl id pretium. Aenean ac nunc vitae nunc bibendum pharetra. Cras a nulla tellus. Suspendisse et elit sodales, aliquet enim bibendum, venenatis urna. Donec laoreet, elit non imperdiet luctus, nunc nisl commodo quam, ac vulputate leo felis quis metus.</p>

                        <p>Nulla facilisi. Nullam sed leo leo. Proin ipsum lacus, pharetra non est non, tincidunt elementum orci. Sed volutpat neque id lectus dictum, malesuada ullamcorper urna cursus. Aenean at pellentesque orci, sed tristique sapien. Quisque et nunc pellentesque, cursus quam ut, sollicitudin lorem. Ut egestas mi ante, sit amet consectetur velit fringilla eu. Praesent rhoncus nunc eget ornare tincidunt. Nunc posuere ipsum quis tortor mattis porttitor. Praesent commodo purus vitae fringilla pellentesque. Donec interdum facilisis faucibus. Vestibulum a ex lorem. Duis neque nibh, gravida in euismod non, ullamcorper eget leo. Donec at quam faucibus, accumsan nisl sed, congue purus. Nam at bibendum dui, sollicitudin tempor nisi.</p>
                        <blockquote>
                            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus musmontes, nascetur ridiculus mus.
                        </blockquote>
                        
                        <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eleifend, augue dapibus pharetra facilisis, ligula nunc fringilla nunc, non convallis purus lectus sit amet augue. Nunc luctus sagittis sapien, eu sodales dolor mollis in. Sed sollicitudin maximus ex, ullamcorper tincidunt ligula viverra vel. Donec a aliquet est. Proin at neque nec turpis vulputate eleifend. Sed mollis pharetra aliquet. In eget tempus erat. Nulla facilisi. Quisque iaculis, est id varius sodales, ligula enim lacinia nunc, et pulvinar nisi mi sed diam. Aenean ut enim at odio tristique gravida. Nullam in finibus augue. Cras ac odio at nibh placerat aliquet fermentum sit amet sem. Vivamus condimentum tortor non mi gravida, non volutpat augue consectetur. Quisque vitae mollis risus. Donec eu egestas ipsum, vel rhoncus lorem.</p> 
                </div>

                <div class="extra-info">
                        <p>30 Minutes</p>
                        <p>4 People</p>
                        <p>$25</p>
                    </div>
                    <div class="image1">
                        <img src="img/mini1.jpg">
                    </div>
        
                    <div class="image2">
                        <img src="img/mini2.jpg">
                    </div>
                </div>
            </main>

            <footer class="footer">
                <div class="container">
                        <div class="widget">
                            <h3>Recipes</h3>
                            <nav class="menu">
                                <a href="#">Mexican Food</a>
                                <a href="#">Pizzas</a>
                                <a href="#">Desserts</a>
                                <a href="#">Asian cuisine </a>
                                <a href="#">Fast Food</a>
                            </nav>
                        </div>
                        <div class="widget">
                            <h3>Recipes</h3>
                            <nav class="menu">
                                <a href="#">Mexican Food</a>
                                <a href="#">Pizzas</a>
                                <a href="#">Desserts</a>
                                <a href="#">Asian cuisine </a>
                                <a href="#">Fast Food</a>
                            </nav>
                        </div>
                        <div class="widget">
                            <h3>Recipes</h3>
                            <nav class="menu">
                                <a href="#">Mexican Food</a>
                                <a href="#">Pizzas</a>
                                <a href="#">Desserts</a>
                                <a href="#">Asian cuisine </a>
                                <a href="#">Fast Food</a>
                            </nav>
                        </div>
                        <div class="widget">
                            <h3>Recipes</h3>
                            <nav class="menu">
                                <a href="#">Mexican Food</a>
                                <a href="#">Pizzas</a>
                                <a href="#">Desserts</a>
                                <a href="#">Asian cuisine </a>
                                <a href="#">Fast Food</a>
                            </nav>
                        </div>
                </div>

                <p class="copyright">2018 Blog Recipe</p>
            </footer>
    
</body>
</html>

```

* starting css

```
// MORE CODE

html {
    box-sizing: border-box;
}
body {
    font-family: Arial, Helvetica, sans-serif;
}
*, *:before, *:after {
    box-sizing: inherit;
}

h1 {
    font-family: 'Raleway', sans-serif;
    font-weight: 900;
}

.container {
    width: 90%;
    max-width:1100px;
    margin: 0 auto;
}
.entry-title {
    text-align: center;
}
.header {
    padding-top: 3rem;
}
.main-nav {
    background-color: black;
    margin: 3rem 0;
}

.main-nav a {
    padding: 1rem;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
}
.main-nav a:hover {
    background-color: #c9c84a;
    color: black;
}
img {
    max-width: 100%;
}
.featured-image img {
    width: 100%;
}
.entry p {
    text-align: justify;
}

.extra-info {
    background-color: #c9c84a;
    color: white;
    font-size: 1.4rem;
}
.extra-info p {
    margin: 0 0 .5rem 0;
    padding: 1rem;
    text-align: center;
}
.image1,
.image2 {
    text-align: center;
}
blockquote {
    font-size: 1.4rem;
    text-align: center;
    font-style: italic;
    color: #525252;
}
.footer {
    background-color: #c9c84a;
    padding-top: 3rem;
    text-align: center;
}
.footer a {
    display: block;
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    color: #525252;
    margin-bottom: .5rem;
}
.copyright {
    color: white;
    background-color: #282828;
    margin: 3rem 0 0 0;
    padding: 1rem;
    text-align: center;
}

/** Grid here**/

// MORE CODE
```

## Jump into the navbar
```
// MORE CODE

        <div class="main-nav">
            <nav class="container">
                <a href="#">Recipes</a>
                <a href="#">Products</a>
                <a href="#">Tutorials</a>
                <a href="#">Store</a>
            </nav>
        </div>

// MORE CODE
```

* We want the nav to be horozontal (so we'll use grid-template-columns)
* We want the minimum size for each nav item to be 200px and then the max is 1fr
* We'll use repeat(auto-fit, minmax(200px, 1fr))

```
// MORE CODE

/** Grid here**/
.main-nav nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

// MORE CODE
```

* Now thanks to `minmax()` our navbar is full responsive without using media queries


